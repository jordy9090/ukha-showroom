"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Show = {
  year: string;
  title: string;
  note?: string;
  // aspect = width / height; side-by-side photos get widths in proportion to it.
  photos: { src: string; alt: string; aspect: number }[];
};

// Listed top to bottom in this order; add new shows at the end so they appear at the bottom.
const shows: Show[] = [
  {
    year: "2026",
    title: "Milano Jewelry Week",
    note: "Gallery Award",
    photos: [
      {
        src: "/images/ukha/archive-milano-jewelry-week-2026.jpg",
        alt: "2026 Milano Jewelry Week Gallery Award",
        aspect: 4 / 3,
      },
    ],
  },
  {
    year: "2026",
    title: "Seoul pop-up",
    photos: [
      { src: "/images/ukha/archive-seoul-popup-2026-01.jpg", alt: "2026 Seoul pop-up view 1", aspect: 4 / 3 },
      { src: "/images/ukha/archive-seoul-popup-2026-02.jpg", alt: "2026 Seoul pop-up view 2", aspect: 3 / 4 },
    ],
  },
];

// Scroll distances in % of the screen height: a short run on the plain list before the first
// show opens, then one stage per show.
const INTRO_SCROLL = 15;
const STAGE_SCROLL = 45;
const TOTAL_SCROLL = INTRO_SCROLL + shows.length * STAGE_SCROLL;

// How small the other titles get while one is enlarged.
const SMALL = 0.6;

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function ArchiveStory() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  // Index of the show on screen, or -1 for the plain list.
  const [step, setStep] = useState(-1);
  const [wide, setWide] = useState(false);
  // Each title's unscaled size: an enlarged title never runs off the screen, and its
  // neighbours step aside by just as much as it grows.
  const [sizes, setSizes] = useState<{ width: number; height: number }[]>([]);
  const titleRefs = useRef<(HTMLLIElement | null)[]>([]);
  // Inner width of the title column, the most an enlarged title may take.
  const [columnWidth, setColumnWidth] = useState(0);
  const columnRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const distance = p * TOTAL_SCROLL;
    setStep(
      distance < INTRO_SCROLL
        ? -1
        : Math.min(Math.floor((distance - INTRO_SCROLL) / STAGE_SCROLL), shows.length - 1),
    );
  });

  useEffect(() => {
    const query = window.matchMedia("(min-width: 640px)");
    const update = () => setWide(query.matches);
    const measure = () => {
      setSizes(
        titleRefs.current.map((el) => ({ width: el?.offsetWidth ?? 0, height: el?.offsetHeight ?? 0 })),
      );
      const column = columnRef.current;
      if (column) {
        const style = getComputedStyle(column);
        setColumnWidth(column.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight));
      }
    };
    update();
    measure();
    query.addEventListener("change", update);
    window.addEventListener("resize", measure);
    return () => {
      query.removeEventListener("change", update);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const enlarged = (index: number) => {
    const target = wide ? 1.6 : 1.35;
    const width = sizes[index]?.width;
    // Grows from its left edge and stays inside the title column.
    return width && columnWidth ? Math.min(target, columnWidth / width) : 1;
  };

  const activeShow = step >= 0 ? step : null;
  const duration = reduceMotion ? 0 : 1;

  // Clicking a title scrolls to the middle of that show's stage.
  const goTo = (showIndex: number) => {
    const section = ref.current;
    if (!section) return;
    const unit = (section.offsetHeight - window.innerHeight) / TOTAL_SCROLL;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const offset = (INTRO_SCROLL + (showIndex + 0.5) * STAGE_SCROLL) * unit;
    window.scrollTo({ top: top + offset, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section ref={ref} style={{ height: `${100 + TOTAL_SCROLL}svh` }} className="relative -mx-6 sm:-mx-10">
      {/* Split 3:7 so titles and photos never overlap: titles left and photos right on wider
          screens; on phones titles on top and photos below. */}
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden bg-black sm:flex-row">
        <ol
          ref={columnRef}
          className="relative flex basis-[30%] flex-col items-start sm:min-w-[15rem] justify-end gap-4 px-6 pb-2 text-left text-white sm:justify-center sm:gap-6 sm:pb-0 sm:pl-10 sm:pr-6"
        >
          {shows.map((show, index) => {
            const isActive = activeShow === index;
            const side = activeShow === null || isActive ? 0 : index < activeShow ? -1 : 1;
            // Neighbours move out by half of the active title's growth, less half of their own shrink.
            const growth =
              activeShow === null ? 0 : (enlarged(activeShow) - 1) * (sizes[activeShow]?.height ?? 0);
            const shrink = (1 - SMALL) * (sizes[index]?.height ?? 0);
            const push = (growth - shrink) / 2;
            return (
              <motion.li
                key={show.title}
                ref={(el) => {
                  titleRefs.current[index] = el;
                }}
                initial={false}
                animate={{
                  scale: isActive ? enlarged(index) : activeShow === null ? 1 : SMALL,
                  y: side * Math.max(push, 0),
                  filter: side === 0 ? "blur(0px)" : "blur(2.5px)",
                }}
                transition={{ duration, ease }}
                className="relative origin-left"
              >
                <button
                  type="button"
                  onClick={() => goTo(index)}
                  className="cursor-pointer text-left text-balance text-[clamp(0.8rem,3.6vw,1rem)] font-normal uppercase leading-[1.4] tracking-[0.16em] outline-none sm:text-[clamp(0.8rem,1.3vw,1.25rem)]"
                >
                  {/* Year, title and note run on together, wrapping only to fit the column. */}
                  {show.year} {show.title}
                  {show.note ? ` — ${show.note}` : null}
                </button>
              </motion.li>
            );
          })}
        </ol>

        {/* The active show's photos in a row; swipe, trackpad or drag to see the rest. */}
        <div className="relative basis-[70%]">
          {shows.map((show, index) => {
            const active = index === step;
            return (
              <motion.div
                key={show.title}
                initial={false}
                animate={{
                  opacity: active ? 1 : 0,
                  scale: active ? 1 : 1.06,
                  filter: active ? "blur(0px)" : "blur(14px)",
                }}
                transition={{ duration: duration * 1.1, ease }}
                className={`absolute inset-0 flex items-center ${active ? "" : "pointer-events-none"}`}
              >
                <PhotoRow show={show} eager={index === 0} />
              </motion.div>
            );
          })}
        </div>

        <motion.p
          aria-hidden="true"
          initial={false}
          animate={{ opacity: step === -1 ? 1 : 0 }}
          transition={{ duration: duration * 0.5 }}
          className="ukha-note absolute inset-x-0 bottom-10 text-center text-[9px]! tracking-[0.18em]! text-white/60!"
        >
          scroll ↓
        </motion.p>
      </div>
    </section>
  );
}

// A sideways-scrolling row of one show's photos at a fixed height. Touch and trackpads scroll
// it natively; with a mouse it can also be dragged.
function PhotoRow({ show, eager }: { show: Show; eager: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);

  return (
    <div
      ref={rowRef}
      className="ukha-horizontal-gallery h-full w-full cursor-grab snap-x snap-mandatory overflow-x-auto overflow-y-hidden active:cursor-grabbing"
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse" || !rowRef.current) return;
        drag.current = { x: event.clientX, left: rowRef.current.scrollLeft };
      }}
      onPointerMove={(event) => {
        if (!drag.current || !rowRef.current) return;
        rowRef.current.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
      }}
      onPointerUp={() => {
        drag.current = null;
      }}
      onPointerLeave={() => {
        drag.current = null;
      }}
    >
      {/* min-w-full + justify-center keeps a short row centred; a long one starts at the left edge. */}
      <div className="flex h-full w-max min-w-full items-center justify-center gap-3 px-6 sm:gap-5 sm:pl-0 sm:pr-10">
        {show.photos.map((photo, photoIndex) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            width={Math.round(1600 * photo.aspect)}
            height={1600}
            sizes="(max-width: 640px) 80vw, 55vw"
            priority={eager && photoIndex === 0}
            // Load every photo up front: the browser's lazy loading can skip a photo that sits
            // in a hidden or sideways-scrolled row, leaving a blank gap when the show opens.
            loading="eager"
            draggable={false}
            // Every photo in a row shares one height. The vw cap keeps a 4:3 photo narrower than
            // the photo area, so each still fits whole and snaps into place when swiped.
            className="h-[min(40svh,58vw)] w-auto flex-none snap-center select-none object-contain sm:h-[min(58svh,40vw)]"
          />
        ))}
      </div>
    </div>
  );
}

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
    const measure = () =>
      setSizes(
        titleRefs.current.map((el) => ({ width: el?.offsetWidth ?? 0, height: el?.offsetHeight ?? 0 })),
      );
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
    const target = wide ? 2 : 1.45;
    const width = sizes[index]?.width;
    return width ? Math.min(target, (window.innerWidth * 0.9) / width) : target;
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
      <div className="sticky top-0 h-svh overflow-hidden bg-black">
        {/* The active show's photos in a row across the middle; swipe, trackpad or drag to see the rest. */}
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

        <ol
          className={`pointer-events-none relative flex h-full flex-col items-center justify-center gap-6 px-6 text-center text-white sm:gap-8 ${step >= 0 ? "[&_button]:pointer-events-none!" : ""}`}
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
                className="relative"
              >
                <button
                  type="button"
                  onClick={() => goTo(index)}
                  className="pointer-events-auto max-w-[88vw] cursor-pointer text-balance text-[clamp(1rem,2.6vw,2rem)] font-normal uppercase leading-[1.35] tracking-[0.18em] outline-none sm:max-w-none sm:whitespace-nowrap"
                >
                  {/* Year, title and note run on one line. */}
                  {show.year} {show.title}
                  {show.note ? ` — ${show.note}` : null}
                </button>
              </motion.li>
            );
          })}
        </ol>

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
      className="ukha-horizontal-gallery h-[52svh] w-full cursor-grab snap-x snap-mandatory overflow-x-auto overflow-y-hidden active:cursor-grabbing sm:h-[58svh]"
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
      <div className="flex h-full w-max min-w-full items-center justify-center gap-3 px-6 sm:gap-5 sm:px-10">
        {show.photos.map((photo, photoIndex) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            width={Math.round(1600 * photo.aspect)}
            height={1600}
            sizes="(max-width: 640px) 80vw, 50vw"
            priority={eager && photoIndex === 0}
            draggable={false}
            // Each photo fits whole on screen (never cut at the edge) and snaps into place when
            // swiped; phones get a smaller row.
            className="h-auto max-h-[40svh] w-auto max-w-[78vw] flex-none snap-center select-none object-contain sm:max-h-full"
          />
        ))}
      </div>
    </div>
  );
}

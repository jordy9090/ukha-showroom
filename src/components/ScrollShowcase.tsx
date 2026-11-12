"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type ShowcasePhoto = {
  src: string;
  alt: string;
  // width / height; every photo in a row shares one height, so widths follow this.
  aspect: number;
  // Optional page the photo opens when clicked.
  href?: string;
};

// One row of photos, optionally with a small caption (e.g. a piece title) that links somewhere.
export type ShowcaseRow = {
  key: string;
  label?: string;
  href?: string;
  photos: ShowcasePhoto[];
};

export type ShowcaseEntry = {
  key: string;
  // Shown as one line, e.g. "2026 Milano Jewelry Week — Gallery Award".
  label: string;
} & (
  // A single row, centred in the photo area…
  | { photos: ShowcasePhoto[]; rows?: never }
  // …or several rows stacked top to bottom (e.g. the pieces of a collection). The stack
  // scrolls on its own; once it reaches the end, scrolling carries on to the next entry.
  | { rows: ShowcaseRow[]; photos?: never }
);

// Scroll distances in % of the screen height: a short run on the plain list before the first
// entry opens, then one stage per entry.
const INTRO_SCROLL = 20;
const STAGE_SCROLL = 60;

// How small the other titles get while one is enlarged.
const SMALL = 0.6;

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

// A pinned black screen split 3:7: a list of entries on the left (on top on phones) and the
// open entry's photos on the right (below on phones). Each scroll step opens the next entry:
// its title grows, the others shrink and blur, and its photos come up beside it.
export function ScrollShowcase({
  entries,
  heading,
}: {
  entries: ShowcaseEntry[];
  // Optional element above the titles in the left column (e.g. a handwritten page title).
  heading?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  // Index of the entry on screen, or -1 for the plain list.
  const [step, setStep] = useState(-1);
  const [wide, setWide] = useState(false);
  // Each title's unscaled size: an enlarged title never runs out of its column, and its
  // neighbours step aside by just as much as it grows.
  const [sizes, setSizes] = useState<{ width: number; height: number }[]>([]);
  const titleRefs = useRef<(HTMLLIElement | null)[]>([]);
  // Inner width of the title column, the most an enlarged title may take.
  const [columnWidth, setColumnWidth] = useState(0);
  const columnRef = useRef<HTMLDivElement>(null);
  const totalScroll = INTRO_SCROLL + entries.length * STAGE_SCROLL;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const distance = p * totalScroll;
    setStep(
      distance < INTRO_SCROLL
        ? -1
        : Math.min(Math.floor((distance - INTRO_SCROLL) / STAGE_SCROLL), entries.length - 1),
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

  const activeEntry = step >= 0 ? step : null;
  const duration = reduceMotion ? 0 : 1;

  // An entry with stacked rows always opens at its first row.
  const stackRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (step >= 0) stackRefs.current[step]?.scrollTo({ top: 0 });
  }, [step]);

  // Clicking a title scrolls to the middle of that entry's stage.
  const goTo = (index: number) => {
    const section = ref.current;
    if (!section) return;
    const unit = (section.offsetHeight - window.innerHeight) / totalScroll;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const offset = (INTRO_SCROLL + (index + 0.5) * STAGE_SCROLL) * unit;
    window.scrollTo({ top: top + offset, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section ref={ref} style={{ height: `${100 + totalScroll}svh` }} className="relative -mx-6 sm:-mx-10">
      {/* Split 3:7 so titles and photos never overlap: titles left and photos right on wider
          screens; on phones titles on top and photos below. */}
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden bg-black sm:flex-row">
        <div
          ref={columnRef}
          className="flex basis-[30%] flex-col items-start justify-end px-6 pb-2 text-white sm:min-w-[15rem] sm:justify-center sm:pb-0 sm:pl-10 sm:pr-6"
        >
          {/* The column is left unpositioned so a heading can centre itself on the whole pinned screen. */}
          {heading}
          <ol className="flex flex-col items-start gap-4 text-left sm:gap-6">
            {entries.map((entry, index) => {
              const isActive = activeEntry === index;
              const side = activeEntry === null || isActive ? 0 : index < activeEntry ? -1 : 1;
              // Neighbours move out by half of the active title's growth, less half of their own shrink.
              const growth =
                activeEntry === null ? 0 : (enlarged(activeEntry) - 1) * (sizes[activeEntry]?.height ?? 0);
              const shrink = (1 - SMALL) * (sizes[index]?.height ?? 0);
              const push = (growth - shrink) / 2;
              return (
                <motion.li
                  key={entry.key}
                  ref={(el) => {
                    titleRefs.current[index] = el;
                  }}
                  initial={false}
                  animate={{
                    scale: isActive ? enlarged(index) : activeEntry === null ? 1 : SMALL,
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
                    {entry.label}
                  </button>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* The open entry's photos: one row, or a stack of rows; swipe, trackpad or drag sideways. */}
        <div className="relative basis-[70%] overflow-hidden">
          {entries.map((entry, index) => {
            const active = index === step;
            return (
              <motion.div
                key={entry.key}
                initial={false}
                animate={{
                  opacity: active ? 1 : 0,
                  scale: active ? 1 : 1.06,
                  filter: active ? "blur(0px)" : "blur(14px)",
                }}
                transition={{ duration: duration * 1.1, ease }}
                className={`absolute inset-0 flex items-center ${active ? "" : "pointer-events-none"}`}
              >
                {entry.rows ? (
                  <div
                    ref={(el) => {
                      stackRefs.current[index] = el;
                    }}
                    className="ukha-horizontal-gallery h-full w-full overflow-y-auto py-10 sm:py-[14svh]"
                  >
                    <div className="flex flex-col gap-10 sm:gap-14">
                      {entry.rows.map((row, rowIndex) => (
                        <div key={row.key}>
                          {row.label ? (
                            <p className="ukha-note mb-3 px-6 tracking-[0.18em]! text-white/60! sm:pl-0">
                              {row.href ? <Link href={row.href}>{row.label}</Link> : row.label}
                            </p>
                          ) : null}
                          <PhotoRow photos={row.photos} eager={index === 0 && rowIndex === 0} compact />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <PhotoRow photos={entry.photos} eager={index === 0} />
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.p
          aria-hidden="true"
          initial={false}
          animate={{ opacity: step === -1 ? 1 : 0 }}
          transition={{ duration: duration * 0.5 }}
          className="ukha-note pointer-events-none absolute inset-x-0 bottom-10 text-center text-[9px]! tracking-[0.18em]! text-white/60!"
        >
          scroll ↓
        </motion.p>
      </div>
    </section>
  );
}

// A sideways-scrolling row of photos at one shared height. Touch and trackpads scroll it
// natively; with a mouse it can also be dragged (a drag never counts as a click on a photo).
// A compact row is shorter and left-aligned, for stacking several on top of each other.
function PhotoRow({
  photos,
  eager,
  compact = false,
}: {
  photos: ShowcasePhoto[];
  eager: boolean;
  compact?: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const dragged = useRef(false);

  return (
    <div
      ref={rowRef}
      className={`ukha-horizontal-gallery w-full cursor-grab snap-x snap-mandatory overflow-x-auto overflow-y-hidden active:cursor-grabbing ${compact ? "" : "h-full"}`}
      onPointerDown={(event) => {
        dragged.current = false;
        if (event.pointerType !== "mouse" || !rowRef.current) return;
        drag.current = { x: event.clientX, left: rowRef.current.scrollLeft, moved: false };
      }}
      onPointerMove={(event) => {
        if (!drag.current || !rowRef.current) return;
        const dx = event.clientX - drag.current.x;
        if (Math.abs(dx) > 5) dragged.current = true;
        rowRef.current.scrollLeft = drag.current.left - dx;
      }}
      onPointerUp={() => {
        drag.current = null;
      }}
      onPointerLeave={() => {
        drag.current = null;
      }}
      onClickCapture={(event) => {
        if (dragged.current) event.preventDefault();
      }}
    >
      {/* min-w-full + justify-center keeps a short single row centred; a long one starts at the left edge. */}
      <div
        className={`flex h-full w-max min-w-full items-center gap-3 px-6 sm:gap-5 sm:pl-0 sm:pr-10 ${compact ? "justify-start" : "justify-center"}`}
      >
        {photos.map((photo, photoIndex) => {
          const image = (
            <Image
              src={photo.src}
              alt={photo.alt}
              width={Math.round(1600 * photo.aspect)}
              height={1600}
              sizes="(max-width: 640px) 80vw, 55vw"
              priority={eager && photoIndex === 0}
              // A single row loads up front; stacked rows load as they scroll into view.
              loading={compact && !eager ? "lazy" : "eager"}
              draggable={false}
              // Every photo in a row shares one height, portrait or landscape. The vw caps keep a
              // 4:3 photo narrower than the photo area, so it fits whole and snaps into place.
              className={`w-auto flex-none select-none object-contain ${
                compact
                  ? "h-[min(42svh,64vw)] sm:h-[min(54svh,38vw)]"
                  : "h-[min(40svh,58vw)] sm:h-[min(58svh,40vw)]"
              }`}
            />
          );
          return photo.href ? (
            <Link key={`${photoIndex}-${photo.src}`} href={photo.href} draggable={false} className="flex-none snap-center">
              {image}
            </Link>
          ) : (
            <div key={`${photoIndex}-${photo.src}`} className="flex-none snap-center">
              {image}
            </div>
          );
        })}
      </div>
    </div>
  );
}

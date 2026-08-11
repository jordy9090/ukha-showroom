"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArtworkFrame } from "@/components/ArtworkFrame";
import type { Piece } from "@/data/collections";

type PanopticonDesktopGalleryProps = {
  pieces: Piece[];
  preservePortraitRatio?: boolean;
};

export function PanopticonDesktopGallery({
  pieces,
  preservePortraitRatio = false,
}: PanopticonDesktopGalleryProps) {
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveItem = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;

        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(itemCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    const handleViewportChange = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateActiveItem);
    };

    updateActiveItem();
    window.addEventListener("scroll", handleViewportChange, { passive: true });
    window.addEventListener("resize", handleViewportChange);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
    };
  }, []);

  return (
    <section className="panopticon-desktop-gallery mx-auto mb-24 flex w-full max-w-6xl flex-col items-center gap-[12vh] py-8">
      {pieces.map((piece, index) => {
        const keepsPortraitRatio = preservePortraitRatio && [3, 5, 6].includes(index);
        const positionClass = [
          "self-center",
          "self-start sm:ml-[7%]",
          "self-end sm:mr-[8%]",
          "ml-[8%] self-center sm:ml-[16%]",
        ][index % 4];

        return (
          <Link
            ref={(item) => {
              itemRefs.current[index] = item;
            }}
            key={piece.id}
            href={`/piece/${piece.id}`}
            className={`panopticon-desktop-item group relative z-10 ${keepsPortraitRatio ? "w-[64vw] max-w-[270px] sm:w-[34%]" : "w-[72vw] max-w-[300px] sm:w-[38%]"} transition-[z-index] focus-visible:z-30 sm:max-w-none ${positionClass}`}
          >
            <div className={`panopticon-desktop-visual ${activeIndex === index ? "is-active" : "is-muted"}`}>
              <ArtworkFrame
                src={piece.images[0]}
                alt={piece.title}
                label={`${piece.title} image placeholder`}
                className={`${keepsPortraitRatio ? "aspect-[3/4]" : "aspect-[4/3]"} w-full`}
                fit={preservePortraitRatio ? "cover" : "contain"}
                sizes="(min-width: 640px) 38vw, 72vw"
                priority={index === 0}
                framed={false}
              />
              <span className="mt-2 block text-center text-[9px] tracking-[0.18em] text-[var(--muted)]">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

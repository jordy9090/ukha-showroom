"use client";

import Link from "next/link";
import { ArtworkFrame } from "@/components/ArtworkFrame";
import type { Piece } from "@/data/collections";

type PanopticonDesktopGalleryProps = {
  pieces: Piece[];
};

export function PanopticonDesktopGallery({ pieces }: PanopticonDesktopGalleryProps) {
  return (
    <section className="panopticon-desktop-gallery mx-auto mb-24 flex w-full max-w-6xl flex-col items-center gap-[12vh] py-8">
      {pieces.map((piece, index) => {
        const positionClass = [
          "self-center",
          "self-start sm:ml-[7%]",
          "self-end sm:mr-[8%]",
          "ml-[8%] self-center sm:ml-[16%]",
        ][index % 4];

        return (
          <Link
            key={piece.id}
            href={`/piece/${piece.id}`}
            className={`panopticon-desktop-item group relative z-10 w-[72vw] max-w-[300px] transition-[z-index] focus-visible:z-30 sm:w-[38%] sm:max-w-none ${positionClass}`}
          >
            <div className="panopticon-desktop-visual">
              <ArtworkFrame
                src={piece.images[0]}
                alt={piece.title}
                label={`${piece.title} image placeholder`}
                className="aspect-[4/3] w-full"
                fit="contain"
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

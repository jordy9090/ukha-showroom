"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArtworkFrame } from "@/components/ArtworkFrame";
import type { Piece } from "@/data/collections";

type PanopticonDesktopGalleryProps = {
  pieces: Piece[];
};

export function PanopticonDesktopGallery({ pieces }: PanopticonDesktopGalleryProps) {
  const [activePieceId, setActivePieceId] = useState<string | null>(pieces[0]?.id ?? null);
  const itemRefs = useRef(new Map<string, HTMLAnchorElement>());

  useEffect(() => {
    let animationFrame = 0;

    const updateActivePiece = () => {
      const viewportCenter = window.innerHeight / 2;
      let nearestPieceId: string | null = null;
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (const [pieceId, element] of itemRefs.current) {
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestPieceId = pieceId;
        }
      }

      setActivePieceId(nearestPieceId);
    };

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateActivePiece);
    };

    updateActivePiece();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="panopticon-desktop-gallery mx-auto mb-24 hidden w-full max-w-6xl flex-col items-center gap-[12vh] py-8 sm:flex">
      {pieces.map((piece, index) => {
        const isActive = activePieceId === piece.id;
        const isMuted = activePieceId !== null && !isActive;

        return (
          <Link
            key={piece.id}
            ref={(element) => {
              if (element) {
                itemRefs.current.set(piece.id, element);
              } else {
                itemRefs.current.delete(piece.id);
              }
            }}
            href={`/piece/${piece.id}`}
            className="panopticon-desktop-item group relative z-10 w-[38%] transition-[z-index] focus-visible:z-30"
            onFocus={() => setActivePieceId(piece.id)}
          >
            <div
              className={`panopticon-desktop-visual${isActive ? " is-active" : ""}${isMuted ? " is-muted" : ""}`}
            >
              <ArtworkFrame
                src={piece.images[0]}
                alt={piece.title}
                label={`${piece.title} image placeholder`}
                className="aspect-[4/3] w-full"
                fit="contain"
                sizes="(min-width: 1024px) 430px, 38vw"
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

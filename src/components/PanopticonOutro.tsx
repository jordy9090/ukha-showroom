"use client";

import { useEffect, useRef, useState } from "react";

type PanopticonOutroProps = {
  title: string;
  description: string;
};

export function PanopticonOutro({ title, description }: PanopticonOutroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame = 0;

    const updateProgress = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const sectionTop = section.getBoundingClientRect().top;
      const fadeDistance = window.innerHeight * 0.85;
      const nextProgress = Math.min(
        1,
        Math.max(0, (window.innerHeight * 0.95 - sectionTop) / fadeDistance),
      );

      setProgress(nextProgress);
    };

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const titleOpacity = Math.max(0, Math.min(1, (progress - 0.3) / 0.45));
  const descriptionOpacity = Math.max(0, Math.min(1, (progress - 0.58) / 0.42));

  return (
    <section ref={sectionRef} className="relative min-h-[115vh]" aria-label="Collection statement">
      <div
        className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center px-8"
        style={{
          opacity: progress,
          backgroundColor: "#0c0c0b",
          backdropFilter: `blur(${18 * progress}px)`,
          WebkitBackdropFilter: `blur(${18 * progress}px)`,
        }}
      >
        <div className="flex max-w-xl flex-col items-center gap-8 text-center sm:gap-10">
          <h2
            className="text-[17px] font-normal tracking-[0.28em] text-white sm:text-[21px]"
            style={{ opacity: titleOpacity }}
          >
            {title}
          </h2>
          <p
            className="text-[13px] font-normal leading-[2] tracking-[0.045em] text-[#f0ede6] sm:text-[14px]"
            style={{ opacity: descriptionOpacity }}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

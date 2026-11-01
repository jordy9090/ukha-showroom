import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { SwipeHint } from "@/components/SwipeHint";

export default function ArchiveNotePage() {
  return (
    <main className="ukha-page min-h-screen px-6 py-28 sm:px-10 sm:py-0">
      <ShowroomHeader />
      <FadeIn className="mx-auto max-w-7xl sm:max-w-none">
        <section className="relative z-20 pb-8 pt-10 sm:absolute sm:left-10 sm:top-24 sm:z-40 sm:p-0">
          <Image
            src="/images/ukha/nav-archive.png"
            alt="archive"
            width={1470}
            height={201}
            sizes="(max-width: 640px) 42vw, 150px"
            className="h-auto w-[min(42vw,150px)] opacity-[0.72] mix-blend-multiply"
            priority
          />
        </section>

        <section className="flex flex-col items-center pb-12 pt-4 text-center sm:min-h-screen sm:justify-center sm:pb-16 sm:pt-28">
          <h1 className="mb-8 text-[11px] font-normal tracking-[0.18em] text-[var(--muted)] sm:mb-10 sm:text-xs">
            2026 Seoul pop-up
          </h1>
          {/* Phones: one large photo at a time with the next one peeking in; desktop: side by side. */}
          <div className="ukha-horizontal-gallery -mx-6 flex w-[calc(100%+3rem)] snap-x snap-mandatory items-center gap-3 overflow-x-auto px-6 sm:mx-0 sm:w-auto sm:justify-center sm:gap-6 sm:overflow-visible sm:px-0">
            <Image
              src="/images/ukha/archive-seoul-popup-2026-01.jpg"
              alt="2026 Seoul pop-up view 1"
              width={2400}
              height={1800}
              sizes="(max-width: 640px) 85vw, 720px"
              className="h-[64vw] w-auto flex-none snap-center object-contain sm:h-[min(44vw,540px)]"
              priority
            />
            <Image
              src="/images/ukha/archive-seoul-popup-2026-02.jpg"
              alt="2026 Seoul pop-up view 2"
              width={1800}
              height={2400}
              sizes="(max-width: 640px) 48vw, 405px"
              className="h-[64vw] w-auto flex-none snap-center object-contain sm:h-[min(44vw,540px)]"
              priority
            />
          </div>
          <SwipeHint />
        </section>

        <section className="flex flex-col items-center mt-16 pb-24 pt-0 text-center sm:mt-0 sm:pb-32 sm:pt-3">
          <h1 className="mb-8 text-[11px] font-normal tracking-[0.18em] text-[var(--muted)] sm:mb-10 sm:text-xs">
            2026 Milano Jewelry Week - Gallery Award
          </h1>
          <Image
            src="/images/ukha/archive-milano-jewelry-week-2026.jpg"
            alt="2026 Milano Jewelry Week Gallery Award"
            width={2000}
            height={1500}
            sizes="(max-width: 640px) 85vw, 720px"
            className="h-[64vw] w-auto object-contain sm:h-[min(44vw,540px)]"
          />
        </section>

      </FadeIn>
    </main>
  );
}

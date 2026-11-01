import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { ShowroomHeader } from "@/components/ShowroomHeader";

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

        <section className="flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center pb-12 pt-8 text-center sm:min-h-screen sm:pb-16 sm:pt-28">
          <h1 className="mb-8 text-[11px] font-normal tracking-[0.18em] text-[var(--muted)] sm:mb-10 sm:text-xs">
            2026 Seoul pop-up
          </h1>
          <div className="flex items-center justify-center gap-3 sm:gap-6">
            <Image
              src="/images/ukha/archive-seoul-popup-2026-01.jpg"
              alt="2026 Seoul pop-up view 1"
              width={2400}
              height={1800}
              sizes="(max-width: 640px) 58vw, 720px"
              className="h-[min(44vw,540px)] w-auto object-contain"
              priority
            />
            <Image
              src="/images/ukha/archive-seoul-popup-2026-02.jpg"
              alt="2026 Seoul pop-up view 2"
              width={1800}
              height={2400}
              sizes="(max-width: 640px) 33vw, 405px"
              className="h-[min(44vw,540px)] w-auto object-contain"
              priority
            />
          </div>
        </section>

        <section className="flex flex-col items-center -mt-10 pb-24 pt-0 text-center sm:mt-0 sm:pb-32 sm:pt-3">
          <h1 className="mb-8 text-[11px] font-normal tracking-[0.18em] text-[var(--muted)] sm:mb-10 sm:text-xs">
            2026 Milano Jewelry Week - Gallery Award
          </h1>
          <Image
            src="/images/ukha/archive-milano-jewelry-week-2026.jpg"
            alt="2026 Milano Jewelry Week Gallery Award"
            width={2000}
            height={1500}
            sizes="(max-width: 640px) 58vw, 720px"
            className="h-[min(44vw,540px)] w-auto object-contain"
          />
        </section>

      </FadeIn>
    </main>
  );
}

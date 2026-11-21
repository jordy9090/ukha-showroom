import { CopyEmail } from "@/components/CopyEmail";
import { FadeIn } from "@/components/FadeIn";
import { ScrollShowcase, type ShowcaseEntry } from "@/components/ScrollShowcase";
import { ShowroomHeader } from "@/components/ShowroomHeader";

// Listed top to bottom in this order; add new shows at the end so they appear at the bottom.
const shows: ShowcaseEntry[] = [
  {
    key: "milano-jewelry-week-2026",
    label: "2026 Milano Jewelry Week — Gallery Award",
    photos: [
      {
        src: "/images/ukha/archive-milano-jewelry-week-2026.jpg",
        alt: "2026 Milano Jewelry Week Gallery Award",
        aspect: 4 / 3,
      },
      {
        src: "/images/ukha/archive-milano-jewelry-week-2026-02.jpg",
        alt: "Artistar Jewels Network Award, Milano Jewelry Week 2026",
        aspect: 3 / 4,
      },
    ],
  },
  {
    key: "seoul-pop-up-2026",
    label: "2026 Seoul pop-up",
    photos: [
      { src: "/images/ukha/archive-seoul-popup-2026-01.jpg", alt: "2026 Seoul pop-up view 1", aspect: 4 / 3 },
      { src: "/images/ukha/archive-seoul-popup-2026-02.jpg", alt: "2026 Seoul pop-up view 2", aspect: 3 / 4 },
    ],
  },
];

export default function ArchiveNotePage() {
  return (
    <main className="min-h-screen bg-black px-6 sm:px-10">
      <ShowroomHeader tone="white" />
      <FadeIn className="mx-auto max-w-7xl sm:max-w-none">
        {/* All shows listed on the left; each scroll step enlarges one and brings its photos up beside it. */}
        <ScrollShowcase entries={shows} />

        <section className="ukha-note ukha-contact flex justify-center py-24 text-white/70! sm:py-32">
          <CopyEmail className="cursor-pointer text-inherit" />
        </section>
      </FadeIn>
    </main>
  );
}

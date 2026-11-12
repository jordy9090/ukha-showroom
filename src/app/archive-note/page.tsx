import { ArchiveStory } from "@/components/ArchiveStory";
import { CopyEmail } from "@/components/CopyEmail";
import { FadeIn } from "@/components/FadeIn";
import { ShowroomHeader } from "@/components/ShowroomHeader";

export default function ArchiveNotePage() {
  return (
    <main className="min-h-screen bg-black px-6 sm:px-10">
      <ShowroomHeader tone="white" />
      <FadeIn className="mx-auto max-w-7xl sm:max-w-none">
        {/* All shows listed in the middle; each scroll step enlarges one and brings its photo up behind. */}
        <ArchiveStory />

        <section className="ukha-note ukha-contact flex justify-center py-24 text-white/70! sm:py-32">
          <CopyEmail className="cursor-pointer text-inherit" />
        </section>
      </FadeIn>
    </main>
  );
}

import Image from "next/image";
import { ArtworkFrame } from "@/components/ArtworkFrame";
import { FadeIn } from "@/components/FadeIn";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { archiveNotes } from "@/data/collections";

export default function ArchiveNotePage() {
  return (
    <main className="ukha-page min-h-screen px-6 py-28 sm:px-10">
      <ShowroomHeader />
      <FadeIn className="mx-auto max-w-6xl">
        <section className="pb-12 pt-10">
          <Image
            src="/images/ukha/nav-archive.png"
            alt="archive"
            width={1470}
            height={201}
            sizes="(max-width: 640px) 42vw, 260px"
            className="h-auto w-[min(42vw,260px)] opacity-[0.72] mix-blend-multiply"
            priority
          />
        </section>

        <section className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {archiveNotes.map((note, index) => (
            <div key={note.id} className="mb-5 break-inside-avoid">
              <ArtworkFrame
                src={note.src}
                alt={note.title}
                label={`${note.title} placeholder`}
                className={
                  note.aspect === "portrait" ? "aspect-[4/5]" : "aspect-[5/4]"
                }
                fit="contain"
                priority={index === 0}
              />
            </div>
          ))}
        </section>
      </FadeIn>
    </main>
  );
}

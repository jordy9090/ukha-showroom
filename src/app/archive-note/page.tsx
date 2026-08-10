import Image from "next/image";
import { ArtworkFrame } from "@/components/ArtworkFrame";
import { FadeIn } from "@/components/FadeIn";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { archiveNotes } from "@/data/collections";

const archivePlacements = [
  "w-[90%] self-start sm:w-[58%]",
  "w-[72%] self-end sm:w-[38%]",
  "w-[94%] self-center sm:w-[68%]",
  "ml-[4%] w-[72%] self-start sm:ml-[9%] sm:w-[42%]",
  "w-[88%] self-end sm:w-[56%]",
  "w-full self-start sm:w-[74%]",
];

export default function ArchiveNotePage() {
  const visibleArchiveNotes = archiveNotes.filter((note) => note.src);

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

        <section className="flex flex-col gap-20 pb-20 sm:gap-32">
          {visibleArchiveNotes.map((note, index) => (
            <div
              key={note.id}
              className={archivePlacements[index % archivePlacements.length]}
            >
              <ArtworkFrame
                src={note.src}
                alt={note.title}
                label={`${note.title} placeholder`}
                className={
                  note.aspect === "portrait" ? "aspect-[4/5]" : "aspect-[5/4]"
                }
                fit="contain"
                framed={false}
                priority={index === 0}
              />
            </div>
          ))}
        </section>
      </FadeIn>
    </main>
  );
}

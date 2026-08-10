import Image from "next/image";
import { ArtworkFrame } from "@/components/ArtworkFrame";
import { FadeIn } from "@/components/FadeIn";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { archiveNotes } from "@/data/collections";

const archivePlacements = [
  "col-span-2 w-[88%] justify-self-start sm:left-[1%] sm:top-[2%] sm:z-10 sm:h-[310px] sm:w-[43%]",
  "col-span-1 w-full sm:left-[37%] sm:top-[7%] sm:z-30 sm:h-[230px] sm:w-[21%]",
  "col-span-1 w-full sm:right-[2%] sm:top-[1%] sm:z-20 sm:h-[290px] sm:w-[31%]",
  "col-span-1 w-full sm:left-[8%] sm:top-[25%] sm:z-20 sm:h-[410px] sm:w-[28%]",
  "col-span-1 w-full sm:left-[30%] sm:top-[21%] sm:z-10 sm:h-[350px] sm:w-[43%]",
  "col-span-2 w-[86%] justify-self-end sm:right-[1%] sm:top-[34%] sm:z-30 sm:h-[360px] sm:w-[32%]",
  "col-span-2 w-[78%] justify-self-start sm:left-[1%] sm:top-[54%] sm:z-10 sm:h-[350px] sm:w-[42%]",
  "col-span-1 w-full sm:left-[35%] sm:top-[61%] sm:z-30 sm:h-[300px] sm:w-[27%]",
  "col-span-1 w-full sm:right-[2%] sm:top-[67%] sm:z-20 sm:h-[410px] sm:w-[39%]",
];

export default function ArchiveNotePage() {
  const visibleArchiveNotes = archiveNotes.filter((note) => note.src);

  return (
    <main className="ukha-page min-h-screen px-6 py-28 sm:px-10">
      <ShowroomHeader />
      <FadeIn className="mx-auto max-w-7xl">
        <section className="pb-8 pt-10 sm:pb-4">
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

        <section className="relative grid grid-cols-2 gap-x-4 gap-y-10 pb-20 sm:block sm:h-[1720px] sm:pb-0 lg:h-[1900px]">
          {visibleArchiveNotes.map((note, index) => (
            <div
              key={note.id}
              className={`relative sm:absolute ${archivePlacements[index % archivePlacements.length]}`}
            >
              <ArtworkFrame
                src={note.src}
                alt={note.title}
                label={`${note.title} placeholder`}
                className={
                  note.aspect === "portrait"
                    ? "aspect-[4/5] sm:h-full sm:aspect-auto"
                    : "aspect-[5/4] sm:h-full sm:aspect-auto"
                }
                fit="cover"
                framed={false}
                priority={index === 0}
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 48vw, 92vw"
              />
            </div>
          ))}
        </section>
      </FadeIn>
    </main>
  );
}

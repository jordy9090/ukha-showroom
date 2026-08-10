import Image from "next/image";
import { ArtworkFrame } from "@/components/ArtworkFrame";
import { FadeIn } from "@/components/FadeIn";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { archiveNotes } from "@/data/collections";

const archivePlacements = [
  "w-[68vw] opacity-90 sm:left-[4%] sm:top-[14%] sm:z-10 sm:h-[225px] sm:w-[25%]",
  "w-[48vw] opacity-100 sm:left-[31%] sm:top-[1%] sm:z-30 sm:h-[185px] sm:w-[14%]",
  "w-[58vw] opacity-80 sm:right-[6%] sm:top-[5%] sm:z-20 sm:h-[175px] sm:w-[20%]",
  "w-[52vw] opacity-100 sm:left-[12%] sm:top-[35%] sm:z-30 sm:h-[300px] sm:w-[22%]",
  "w-[64vw] opacity-75 sm:left-[2%] sm:top-[65%] sm:z-10 sm:h-[285px] sm:w-[28%]",
  "w-[72vw] opacity-[0.85] sm:left-[30%] sm:top-[24%] sm:z-10 sm:h-[330px] sm:w-[42%]",
  "w-[56vw] opacity-90 sm:right-[3%] sm:top-[28%] sm:z-20 sm:h-[250px] sm:w-[30%]",
  "w-[50vw] opacity-100 sm:left-[35%] sm:top-[61%] sm:z-30 sm:h-[225px] sm:w-[24%]",
  "w-[70vw] opacity-80 sm:right-[2%] sm:top-[60%] sm:z-20 sm:h-[330px] sm:w-[37%]",
];

export default function ArchiveNotePage() {
  const visibleArchiveNotes = archiveNotes.filter((note) => note.src);

  return (
    <main className="ukha-page min-h-screen px-6 py-28 sm:px-10">
      <ShowroomHeader />
      <FadeIn className="mx-auto max-w-7xl">
        <section className="pb-8 pt-10 sm:absolute sm:left-10 sm:top-24 sm:z-40 sm:p-0">
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

        <section className="ukha-horizontal-gallery -mx-6 flex h-[34svh] snap-x snap-mandatory items-center gap-5 overflow-x-auto px-6 pb-6 sm:relative sm:mx-0 sm:block sm:h-[1040px] sm:overflow-visible sm:px-0 sm:pb-0 lg:h-[1120px]">
          {visibleArchiveNotes.map((note, index) => (
            <div
              key={note.id}
              className={`relative shrink-0 snap-center sm:absolute ${archivePlacements[index % archivePlacements.length]}`}
            >
              <ArtworkFrame
                src={note.src}
                alt={note.title}
                label={`${note.title} placeholder`}
                className="archive-grain h-[27svh] sm:h-full sm:aspect-auto"
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

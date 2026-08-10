import Image from "next/image";
import { ArtworkFrame } from "@/components/ArtworkFrame";
import { FadeIn } from "@/components/FadeIn";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { archiveNotes } from "@/data/collections";

const archivePlacements = [
  "left-[4%] top-[14%] z-10 h-[30%] w-[25%] opacity-[0.65]",
  "left-[31%] top-[1%] z-30 h-[25%] w-[14%] opacity-90",
  "right-[6%] top-[5%] z-20 h-[24%] w-[20%] opacity-75",
  "left-[12%] top-[36%] z-30 h-[41%] w-[22%] opacity-90",
  "left-[2%] top-[66%] z-10 h-[32%] w-[28%] opacity-[0.65]",
  "left-[30%] top-[24%] z-10 h-[45%] w-[42%] opacity-70",
  "right-[3%] top-[29%] z-20 h-[34%] w-[30%] opacity-80",
  "left-[35%] top-[64%] z-30 h-[30%] w-[24%] opacity-90",
  "right-[2%] top-[61%] z-20 h-[38%] w-[37%] opacity-[0.72]",
];

const archiveOpacities = [
  "opacity-[0.65]",
  "opacity-90",
  "opacity-75",
  "opacity-90",
  "opacity-[0.65]",
  "opacity-70",
  "opacity-80",
  "opacity-90",
  "opacity-[0.72]",
];

export default function ArchiveNotePage() {
  const visibleArchiveNotes = archiveNotes.filter((note) => note.src).reverse();
  const archivePages = Array.from(
    { length: Math.ceil(visibleArchiveNotes.length / archivePlacements.length) },
    (_, pageIndex) =>
      visibleArchiveNotes.slice(
        pageIndex * archivePlacements.length,
        (pageIndex + 1) * archivePlacements.length,
      ),
  );

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

        <section className="ukha-horizontal-gallery absolute inset-x-0 top-0 flex h-svh snap-x snap-mandatory scroll-px-[16vw] items-center gap-5 overflow-x-auto px-[16vw] sm:hidden">
          {visibleArchiveNotes.map((note, index) => (
            <div
              key={note.id}
              className={`relative shrink-0 snap-center ${archiveOpacities[index % archiveOpacities.length]} ${note.aspect === "portrait" ? "w-[21.6svh]" : "w-[36svh]"}`}
            >
              <ArtworkFrame
                src={note.src}
                alt={note.title}
                label={`${note.title} placeholder`}
                className="archive-grain h-[27svh]"
                fit="cover"
                framed={false}
                priority={index === 0}
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 48vw, 92vw"
              />
            </div>
          ))}
        </section>

        <section className="ukha-horizontal-gallery -mx-10 mt-[11svh] hidden h-[78svh] snap-x snap-mandatory overflow-x-auto px-10 sm:flex">
          {archivePages.map((page, pageIndex) => (
            <div
              key={`archive-page-${pageIndex}`}
              className="relative h-full w-[calc(100vw-5rem)] shrink-0 snap-start"
            >
              {page.map((note, index) => (
                <div
                  key={note.id}
                  className={`absolute ${archivePlacements[index]}`}
                >
                  <ArtworkFrame
                    src={note.src}
                    alt={note.title}
                    label={`${note.title} placeholder`}
                    className="archive-grain h-full"
                    fit="cover"
                    framed={false}
                    priority={pageIndex === 0 && index === 0}
                    sizes="(min-width: 1024px) 42vw, 48vw"
                  />
                </div>
              ))}
            </div>
          ))}
        </section>
      </FadeIn>
    </main>
  );
}

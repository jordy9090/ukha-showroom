import { ArtworkFrame } from "@/components/ArtworkFrame";
import { FadeIn } from "@/components/FadeIn";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { archiveNotes } from "@/data/collections";

export default function ArchiveNotePage() {
  return (
    <main className="ukha-page min-h-screen px-6 py-28 sm:px-10">
      <ShowroomHeader />
      <FadeIn className="mx-auto max-w-6xl">
        <section className="pb-16 pt-10">
          <p className="mb-5 text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
            archive note
          </p>
          <h1 className="max-w-3xl font-serif text-5xl leading-tight tracking-[0.04em] sm:text-7xl">
            sketches, process, and records
          </h1>
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
                priority={index === 0}
              />
              <p className="mt-3 text-xs lowercase tracking-[0.06em] text-[var(--muted)]">
                {note.category} / {note.title}
              </p>
            </div>
          ))}
        </section>
      </FadeIn>
    </main>
  );
}

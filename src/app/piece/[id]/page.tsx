import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtworkFrame } from "@/components/ArtworkFrame";
import { FadeIn } from "@/components/FadeIn";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { collections, getCollection, getPiece } from "@/data/collections";

export function generateStaticParams() {
  return collections.flatMap((collection) =>
    collection.pieces.map((piece) => ({ id: piece.id })),
  );
}

export default async function PieceDetailPage(props: PageProps<"/piece/[id]">) {
  const { id } = await props.params;
  const piece = getPiece(id);

  if (!piece) {
    notFound();
  }

  const collection = getCollection(piece.collectionSlug);
  const images = piece.images.length > 0 ? piece.images : [undefined, undefined];

  return (
    <main className="ukha-page min-h-screen px-6 py-28 sm:px-10">
      <ShowroomHeader />
      <FadeIn className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <section className="grid gap-5">
          {images.map((src, index) => (
            <ArtworkFrame
              key={`${piece.id}-${index}`}
              src={src}
              alt={`${piece.title} image ${index + 1}`}
              label={`${piece.title} detail image ${index + 1} placeholder`}
              className={index === 0 ? "aspect-[4/5]" : "aspect-[5/4]"}
              priority={index === 0}
            />
          ))}
        </section>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Link
            href={`/collection/${piece.collectionSlug}`}
            className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            {collection?.title ?? "collection"}
          </Link>
          <h1 className="mt-8 font-serif text-4xl tracking-[0.04em] sm:text-6xl">
            {piece.title}
          </h1>
          <p className="mt-3 text-sm text-[var(--muted)]">{piece.subtitle}</p>

          <div className="mt-12 space-y-8 border-t border-[var(--line)] pt-8 text-sm leading-7">
            <section>
              <h2 className="mb-2 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                work description
              </h2>
              <p>{piece.description}</p>
            </section>
            <section>
              <h2 className="mb-2 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                material
              </h2>
              <p>{piece.material}</p>
            </section>
            <section>
              <h2 className="mb-2 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                price
              </h2>
              <p>{piece.price}</p>
            </section>
          </div>

          <a
            href="mailto:hello@ukha.kr?subject=UKHA%20piece%20inquiry"
            className="mt-12 inline-flex border-b border-[var(--foreground)] pb-1 text-[11px] uppercase tracking-[0.28em] transition hover:text-[var(--muted)]"
          >
            inquiry
          </a>
        </aside>
      </FadeIn>
    </main>
  );
}

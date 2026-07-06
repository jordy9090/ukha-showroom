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
            className="ukha-caption transition hover:text-[var(--foreground)]"
          >
            {collection?.title ?? "collection"}
          </Link>
          <h1 className="ukha-display mt-8">
            {piece.title}
          </h1>
          <p className="ukha-caption mt-3">{piece.subtitle}</p>

          <div className="ukha-copy mt-12 space-y-8 border-t border-[var(--line)] pt-8">
            <section>
              <h2 className="ukha-caption mb-2">
                work description
              </h2>
              <p>{piece.description}</p>
            </section>
            <section>
              <h2 className="ukha-caption mb-2">
                material
              </h2>
              <p>{piece.material}</p>
            </section>
            <section>
              <h2 className="ukha-caption mb-2">
                price
              </h2>
              <p>{piece.price}</p>
            </section>
          </div>

          <a
            href="mailto:hello@ukha.kr?subject=UKHA%20piece%20inquiry"
            className="ukha-caption mt-12 inline-flex border-b border-[var(--foreground)] pb-1 transition hover:text-[var(--muted)]"
          >
            inquiry
          </a>
        </aside>
      </FadeIn>
    </main>
  );
}

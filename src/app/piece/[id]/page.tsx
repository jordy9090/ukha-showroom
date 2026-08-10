import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/FadeIn";
import { HorizontalArtworkGallery } from "@/components/HorizontalArtworkGallery";
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
  const isPanopticon = piece.collectionSlug === "collection-02";
  const images = piece.images.length > 0 ? piece.images : [undefined, undefined];
  const hasDetails = Boolean(
    piece.subtitle || piece.description || piece.material || piece.price,
  );

  return (
    <main className="ukha-page min-h-screen px-6 py-28 sm:px-10">
      <ShowroomHeader />
      <FadeIn
        className={
          hasDetails
            ? "mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20"
            : "mx-auto max-w-4xl"
        }
      >
        <HorizontalArtworkGallery
          images={images}
          title={piece.title}
          landscape={piece.collectionSlug === "collection-02"}
          unframed={piece.collectionSlug === "collection-02"}
        />

        {isPanopticon ? (
          <h1 className="ukha-piece-title mt-6 text-center">
            {piece.title}
          </h1>
        ) : null}

        {hasDetails ? <aside className="lg:sticky lg:top-28 lg:self-start">
          <Link
            href={`/collection/${piece.collectionSlug}`}
            className="ukha-caption transition hover:text-[var(--foreground)]"
          >
            {collection?.title ?? "collection"}
          </Link>
          <h1 className="ukha-piece-title mt-8">
            {piece.title}
          </h1>
          <p className="ukha-caption mt-3">{piece.subtitle}</p>

          <div className="mt-10 space-y-7 border-t border-[var(--line)] pt-7">
            <section>
              <h2 className="ukha-caption mb-2">
                work description
              </h2>
              <p className="ukha-note">{piece.description}</p>
            </section>
            <section>
              <h2 className="ukha-caption mb-2">
                material
              </h2>
              <p className="ukha-note">{piece.material}</p>
            </section>
            <section>
              <h2 className="ukha-caption mb-2">
                price
              </h2>
              <p className="ukha-note">{piece.price}</p>
            </section>
          </div>

          <a
            href="mailto:hello@ukha.kr?subject=UKHA%20piece%20inquiry"
            className="ukha-caption mt-12 inline-flex border-b border-[var(--foreground)] pb-1 transition hover:text-[var(--muted)]"
          >
            inquiry
          </a>
        </aside> : null}
      </FadeIn>
    </main>
  );
}

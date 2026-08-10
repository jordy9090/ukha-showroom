import { notFound } from "next/navigation";
import { FadeIn } from "@/components/FadeIn";
import { HorizontalArtworkGallery } from "@/components/HorizontalArtworkGallery";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { collections, getPiece } from "@/data/collections";

function sentenceCase(value: string) {
  const lowercaseValue = value.toLowerCase();
  return lowercaseValue.charAt(0).toUpperCase() + lowercaseValue.slice(1);
}

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

  const images = piece.images.length > 0 ? piece.images : [undefined, undefined];
  const displayedDescription = piece.description
    ? sentenceCase(piece.description)
    : "—";
  const displayedMaterial = piece.material
    ? sentenceCase(piece.material)
    : "—";
  const displayedPrice =
    piece.price && piece.price.toLowerCase() !== "price on inquiry"
      ? piece.price.toLowerCase()
      : "on request";

  return (
    <main className="ukha-page min-h-screen px-6 py-28 sm:px-10">
      <ShowroomHeader />
      <FadeIn className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <HorizontalArtworkGallery
          images={images}
          title={piece.title}
          landscape={piece.collectionSlug === "collection-02"}
          unframed={piece.collectionSlug === "collection-02"}
        />

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <h1 className="ukha-piece-title">
            {piece.title}
          </h1>

          <div className="mt-10 space-y-7 border-t border-[var(--line)] pt-7">
            <section>
              <p className="ukha-note">{displayedDescription}</p>
            </section>
            <section>
              <p className="ukha-note">{displayedMaterial}</p>
            </section>
            <section>
              <p className="ukha-note">Price: {displayedPrice}</p>
            </section>
          </div>

          <details className="group mt-12">
            <summary className="ukha-caption inline-flex cursor-pointer list-none border-b border-[var(--foreground)] pb-1 transition hover:text-[var(--muted)] [&::-webkit-details-marker]:hidden">
              INQUIRY
            </summary>
            <div className="ukha-note mt-5 flex flex-col items-start gap-2">
              <a href="mailto:ukhastudio@gmail.com?subject=UKHA%20piece%20inquiry">
                ukhastudio@gmail.com
              </a>
              <a
                href="https://www.instagram.com/ukha_studio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
              >
                @ukha_studio ↗
              </a>
            </div>
          </details>
        </aside>
      </FadeIn>
    </main>
  );
}

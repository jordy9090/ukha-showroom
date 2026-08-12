import { notFound } from "next/navigation";
import { FadeIn } from "@/components/FadeIn";
import { HorizontalArtworkGallery } from "@/components/HorizontalArtworkGallery";
import { CopyEmail } from "@/components/CopyEmail";
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
    : "";
  const displayedMaterial = piece.material
    ? sentenceCase(piece.material)
    : "—";
  const displayedPrice =
    piece.price && piece.price.toLowerCase() !== "price on inquiry"
      ? piece.price.toLowerCase()
      : "on request";

  return (
    <main className="ukha-page min-h-screen overflow-x-hidden px-6 py-28 sm:px-10">
      <ShowroomHeader />
      <FadeIn className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <HorizontalArtworkGallery
          images={images}
          title={piece.title}
        />

        <aside className="ukha-piece-details min-w-0 lg:sticky lg:top-28 lg:self-start">
          <h1 className="ukha-piece-title">
            {piece.title}
          </h1>

          <div className="ukha-piece-metadata mt-10 pt-7">
            {displayedDescription ? (
              <section>
                <p className="ukha-note ukha-piece-description">{displayedDescription}</p>
              </section>
            ) : null}
            <section>
              <p className="ukha-note">{displayedMaterial}</p>
            </section>
            <section>
              <p className="ukha-note">Price: {displayedPrice}</p>
            </section>
          </div>

          <details className="group mt-7">
            <summary className="ukha-note inline-flex cursor-pointer list-none border-b border-[var(--foreground)] pb-1 !text-[10px] transition hover:text-[var(--muted)] sm:!text-[11px] [&::-webkit-details-marker]:hidden">
              INQUIRY
            </summary>
            <div className="ukha-note mt-5 flex flex-col items-start gap-2">
              <CopyEmail className="cursor-pointer text-inherit" />
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

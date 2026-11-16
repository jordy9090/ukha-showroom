import { CollectionHeading } from "@/components/CollectionHeading";
import { FadeIn } from "@/components/FadeIn";
import { ScrollShowcase, type ShowcaseEntry } from "@/components/ScrollShowcase";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { collections } from "@/data/collections";
import { imageAspect } from "@/lib/imageAspect";

// Same layout as the archive: collections listed on the left (newest first). Each scroll step
// opens one, with its pieces stacked top to bottom and each piece's photos side by side.
export default function CollectionPage() {
  const entries: ShowcaseEntry[] = [...collections].reverse().map((collection) => ({
    key: collection.slug,
    label: `${collection.year} ${collection.title}`,
    intro: collection.description,
    rows: collection.pieces
      .filter((piece) => piece.images.length > 0)
      .map((piece) => ({
        key: piece.id,
        label: piece.title,
        href: `/piece/${piece.id}`,
        photos: piece.images.map((src, imageIndex) => ({
          src,
          alt: `${piece.title} image ${imageIndex + 1}`,
          aspect: imageAspect(src),
          href: `/piece/${piece.id}`,
        })),
      })),
  }));

  return (
    <main className="min-h-screen bg-black px-6 sm:px-10">
      <ShowroomHeader tone="white" />
      <FadeIn className="mx-auto max-w-7xl sm:max-w-none">
        <ScrollShowcase entries={entries} heading={<CollectionHeading key="collection-heading" />} />
        <div className="h-24 sm:h-32" />
      </FadeIn>
    </main>
  );
}

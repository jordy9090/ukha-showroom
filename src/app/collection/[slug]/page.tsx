import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtworkFrame } from "@/components/ArtworkFrame";
import { FadeIn } from "@/components/FadeIn";
import { PanopticonDesktopGallery } from "@/components/PanopticonDesktopGallery";
import { PanopticonOutro } from "@/components/PanopticonOutro";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { collections, getCollection } from "@/data/collections";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export default async function CollectionDetailPage(props: PageProps<"/collection/[slug]">) {
  const { slug } = await props.params;
  const collection = getCollection(slug);

  if (!collection) {
    notFound();
  }

  const isEditorialCollection = collection.slug === "collection-02";

  return (
    <main className={`${isEditorialCollection ? "panopticon-page" : "ukha-page"} min-h-screen px-6 py-28 sm:px-10`}>
      <ShowroomHeader />
      <FadeIn className="relative z-10 mx-auto max-w-7xl">
        {isEditorialCollection ? (
          <>
            <section className="ukha-horizontal-gallery -mx-6 flex snap-x snap-mandatory gap-7 overflow-x-auto px-6 pb-20 pt-2 sm:hidden">
              {collection.pieces.map((piece, index) => (
                <Link
                  key={piece.id}
                  href={`/piece/${piece.id}`}
                  className="w-[72vw] max-w-[300px] shrink-0 snap-center"
                >
                  <ArtworkFrame
                    src={piece.images[0]}
                    alt={piece.title}
                    label={`${piece.title} image placeholder`}
                    className="aspect-[4/5] w-full"
                    fit="contain"
                    sizes="72vw"
                    priority={index === 0}
                    framed={false}
                  />
                  <span className="mt-3 block text-center text-[9px] tracking-[0.18em] text-[var(--muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              ))}
            </section>

            <PanopticonDesktopGallery pieces={collection.pieces} />

            <PanopticonOutro title={collection.title} description={collection.description} />
          </>
        ) : (
          <section className="mx-auto flex max-w-4xl flex-col gap-20 pt-10 sm:gap-24">
            {collection.pieces.map((piece, index) => (
              <Link key={piece.id} href={`/piece/${piece.id}`} className="group block">
                <ArtworkFrame
                  src={piece.images[0]}
                  alt={piece.title}
                  label={`${piece.title} image placeholder`}
                  className="aspect-[4/5] w-full"
                  fit="contain"
                  sizes="(min-width: 1024px) 896px, 92vw"
                  priority={index === 0}
                />
              </Link>
            ))}
          </section>
        )}
      </FadeIn>
    </main>
  );
}

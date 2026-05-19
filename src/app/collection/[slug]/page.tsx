import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtworkFrame } from "@/components/ArtworkFrame";
import { CollectionTitle } from "@/components/CollectionTitle";
import { FadeIn } from "@/components/FadeIn";
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

  return (
    <main className="ukha-page min-h-screen px-6 py-28 sm:px-10">
      <ShowroomHeader />
      <FadeIn className="mx-auto max-w-6xl">
        <section className="grid gap-10 pb-20 pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <CollectionTitle
              title={collection.title}
              handwrittenTitleImage={collection.handwrittenTitleImage}
            />
          </div>
          <p className="max-w-xl text-sm leading-8 text-[var(--muted)] sm:text-base">
            {collection.description}
          </p>
        </section>

        <section className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {collection.pieces.map((piece, index) => (
            <Link
              key={piece.id}
              href={`/piece/${piece.id}`}
              className="group block"
            >
              <ArtworkFrame
                src={piece.images[0]}
                alt={piece.title}
                label={`${piece.title} image placeholder`}
                className={`aspect-[4/5] ${
                  index % 3 === 1 ? "sm:mt-16" : ""
                }`}
                priority={index === 0}
              />
              <h2 className="mt-4 font-serif text-xl tracking-[0.04em] transition group-hover:text-[var(--muted)]">
                {piece.title}
              </h2>
            </Link>
          ))}
        </section>
      </FadeIn>
    </main>
  );
}

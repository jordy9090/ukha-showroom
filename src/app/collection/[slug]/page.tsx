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
          <p className="ukha-copy max-w-xl">
            {collection.description}
          </p>
        </section>

        <section className="mx-auto flex max-w-4xl flex-col gap-20 sm:gap-24">
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
                className="aspect-[4/5] w-full"
                fit="contain"
                sizes="(min-width: 1024px) 896px, 92vw"
                priority={index === 0}
              />
              <div className="mt-5 flex items-center justify-between gap-6">
                <h2 className="ukha-caption">
                  {piece.title}
                </h2>
                <span className="ukha-caption opacity-50">view</span>
              </div>
            </Link>
          ))}
        </section>
      </FadeIn>
    </main>
  );
}

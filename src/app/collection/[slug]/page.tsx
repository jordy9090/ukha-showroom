import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtworkFrame } from "@/components/ArtworkFrame";
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

  const isEditorialCollection = collection.slug === "collection-02";
  const editorialWidths = [
    "w-[86%] sm:w-[72%]",
    "w-[84%] sm:w-[70%]",
    "w-[86%] sm:w-[72%]",
  ];

  return (
    <main className="ukha-page min-h-screen px-6 py-28 sm:px-10">
      <ShowroomHeader />
      <FadeIn className="mx-auto max-w-7xl">
        <section
          className={
            isEditorialCollection
              ? "mx-auto flex flex-col gap-24 pt-14 sm:gap-36 sm:pt-20"
              : "mx-auto flex max-w-4xl flex-col gap-20 pt-10 sm:gap-24"
          }
        >
          {collection.pieces.map((piece, index) => (
            <Link
              key={piece.id}
              href={`/piece/${piece.id}`}
              className={
                isEditorialCollection
                  ? `group flex w-full ${index % 2 === 0 ? "justify-start" : "justify-end"}`
                  : "group block"
              }
            >
              <ArtworkFrame
                src={piece.images[0]}
                alt={piece.title}
                label={`${piece.title} image placeholder`}
                className={
                  isEditorialCollection
                    ? `aspect-[4/3] ${editorialWidths[index % editorialWidths.length]} [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-[1.015]`
                    : "aspect-[4/5] w-full"
                }
                fit="contain"
                sizes={
                  isEditorialCollection
                    ? "(min-width: 1024px) 74vw, 82vw"
                    : "(min-width: 1024px) 896px, 92vw"
                }
                priority={index === 0}
                framed={!isEditorialCollection}
              />
            </Link>
          ))}
        </section>
      </FadeIn>
    </main>
  );
}

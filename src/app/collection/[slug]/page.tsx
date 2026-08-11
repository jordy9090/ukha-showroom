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
  const editorialPlacements = [
    "sm:col-span-3 sm:col-start-1",
    "translate-y-8 sm:col-span-4 sm:col-start-5 sm:translate-y-14",
    "sm:col-span-3 sm:col-start-10 sm:translate-y-3",
    "sm:col-span-3 sm:col-start-2",
    "translate-y-8 sm:col-span-4 sm:col-start-6 sm:translate-y-16",
    "sm:col-span-3 sm:col-start-10 sm:translate-y-2",
    "sm:col-span-3 sm:col-start-4",
  ];
  const editorialAspects = [
    "aspect-[4/5]",
    "aspect-[5/4]",
    "aspect-square",
    "aspect-[5/6]",
    "aspect-[4/3]",
    "aspect-[3/4]",
    "aspect-square",
  ];

  return (
    <main className="ukha-page min-h-screen px-6 py-28 sm:px-10">
      <ShowroomHeader />
      <FadeIn className="mx-auto max-w-7xl">
        {isEditorialCollection ? (
          <section className="grid gap-12 pb-20 pt-14 sm:grid-cols-2 sm:gap-20 sm:pb-32 sm:pt-24">
            <h1 className="ukha-piece-title self-start">{collection.title}</h1>
            <p className="max-w-md text-[13px] font-normal leading-[1.95] tracking-[0.045em] text-[var(--muted)] sm:justify-self-end sm:text-[14px]">
              {collection.description}
            </p>
          </section>
        ) : null}

        <section
          className={
            isEditorialCollection
              ? "mx-auto grid grid-cols-2 gap-x-5 gap-y-20 pb-20 sm:grid-cols-12 sm:gap-x-7 sm:gap-y-28 sm:pb-28"
              : "mx-auto flex max-w-4xl flex-col gap-20 pt-10 sm:gap-24"
          }
        >
          {collection.pieces.map((piece, index) => (
            <Link
              key={piece.id}
              href={`/piece/${piece.id}`}
              className={
                isEditorialCollection
                  ? `group ${editorialPlacements[index % editorialPlacements.length]}`
                  : "group block"
              }
            >
              <ArtworkFrame
                src={piece.images[0]}
                alt={piece.title}
                label={`${piece.title} image placeholder`}
                className={
                  isEditorialCollection
                    ? `${editorialAspects[index % editorialAspects.length]} w-full [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-[1.015]`
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
              {isEditorialCollection ? (
                <span className="mt-3 block text-[9px] tracking-[0.18em] text-[var(--muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              ) : null}
            </Link>
          ))}
        </section>
      </FadeIn>
    </main>
  );
}

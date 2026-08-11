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
            <PanopticonDesktopGallery pieces={collection.pieces} />

            <PanopticonOutro title={collection.title} description={collection.description} />
          </>
        ) : (
          <>
          <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-[12vh] py-8">
            {collection.pieces.map((piece, index) => {
              const keepsPortraitRatio = [3, 5, 6].includes(index);
              const positionClass = [
                "self-center",
                "self-start sm:ml-[7%]",
                "self-end sm:mr-[8%]",
                "ml-[8%] self-center sm:ml-[16%]",
              ][index % 4];

              return (
              <Link
                key={piece.id}
                href={`/piece/${piece.id}`}
                className={`group relative block ${keepsPortraitRatio ? "w-[64vw] max-w-[270px] sm:w-[34%]" : "w-[72vw] max-w-[300px] sm:w-[38%]"} sm:max-w-none ${positionClass}`}
              >
                <ArtworkFrame
                  src={piece.images[0]}
                  alt={piece.title}
                  label={`${piece.title} image placeholder`}
                  className={`${keepsPortraitRatio ? "aspect-[3/4]" : "aspect-[4/3]"} w-full`}
                  fit="cover"
                  sizes="(min-width: 640px) 38vw, 72vw"
                  priority={index === 0}
                  framed={false}
                />
                <span className="mt-2 block text-center text-[9px] tracking-[0.18em] text-[var(--muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
              );
            })}
          </section>

          <PanopticonOutro title={collection.title} description={collection.description} />
          </>
        )}
      </FadeIn>
    </main>
  );
}

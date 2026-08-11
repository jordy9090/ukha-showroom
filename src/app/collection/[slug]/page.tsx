import { notFound } from "next/navigation";
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
          <PanopticonDesktopGallery pieces={collection.pieces} preservePortraitRatio />

          <PanopticonOutro title={collection.title} description={collection.description} />
          </>
        )}
      </FadeIn>
    </main>
  );
}

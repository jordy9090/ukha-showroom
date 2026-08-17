import Image from "next/image";
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
    <main className={`${isEditorialCollection ? "panopticon-page" : "ukha-page"} relative min-h-screen overflow-x-hidden px-6 py-28 sm:px-10`}>
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={
            isEditorialCollection
              ? "/images/ukha/panopticon-background-mobile.png"
              : "/images/ukha/liminal-background-mobile-v2.png"
          }
          alt=""
          fill
          sizes="100vw"
          className="object-fill opacity-[0.34] mix-blend-multiply sm:hidden"
          priority
        />
        <Image
          src={
            isEditorialCollection
              ? "/images/ukha/panopticon-background-desktop.png"
              : "/images/ukha/liminal-background-desktop-v2.png"
          }
          alt=""
          fill
          sizes="100vw"
          className="hidden object-fill opacity-[0.38] mix-blend-multiply sm:block"
          priority
        />
      </div>
      <ShowroomHeader />
      <FadeIn className="relative z-10 mx-auto max-w-7xl">
        {collection.handwrittenTitleImage ? (
          <div className="flex justify-center pb-20 pt-8 sm:pb-28 sm:pt-12">
            <Image
              src={collection.handwrittenTitleImage}
              alt={`${collection.title} collection`}
              width={isEditorialCollection ? 1125 : 890}
              height={isEditorialCollection ? 300 : 180}
              sizes="(max-width: 639px) 72vw, 672px"
              className={`h-auto object-contain ${
                isEditorialCollection ? "w-[82%] max-w-2xl" : "w-[78%] max-w-xl"
              }`}
              priority
            />
          </div>
        ) : null}
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

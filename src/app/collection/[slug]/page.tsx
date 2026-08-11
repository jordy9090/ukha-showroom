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
  const panopticonPositions = [
    { left: "50%", top: "4%" },
    { left: "79%", top: "21%" },
    { left: "86%", top: "57%" },
    { left: "63%", top: "83%" },
    { left: "28%", top: "83%" },
    { left: "8%", top: "55%" },
    { left: "16%", top: "20%" },
  ];

  return (
    <main className="ukha-page min-h-screen px-6 py-28 sm:px-10">
      <ShowroomHeader />
      <FadeIn className="relative z-10 mx-auto max-w-7xl">
        {isEditorialCollection ? (
          <section className="grid gap-12 pb-20 pt-14 sm:grid-cols-2 sm:gap-20 sm:pb-32 sm:pt-24">
            <h1 className="ukha-piece-title self-start">{collection.title}</h1>
            <p className="max-w-md text-[13px] font-normal leading-[1.95] tracking-[0.045em] text-[var(--muted)] sm:justify-self-end sm:text-[14px]">
              {collection.description}
            </p>
          </section>
        ) : null}

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

            <section className="relative mx-auto mb-24 hidden aspect-square w-full max-w-[980px] sm:block">
              {collection.pieces.map((piece, index) => (
                <Link
                  key={piece.id}
                  href={`/piece/${piece.id}`}
                  className="group absolute z-10 w-[22%] -translate-x-1/2 -translate-y-1/2 transition-[z-index] hover:z-30 focus-visible:z-30"
                  style={panopticonPositions[index % panopticonPositions.length]}
                >
                  <div className="transition-transform duration-500 ease-out group-hover:scale-[1.32] group-focus-visible:scale-[1.32]">
                    <ArtworkFrame
                      src={piece.images[0]}
                      alt={piece.title}
                      label={`${piece.title} image placeholder`}
                      className="aspect-square w-full"
                      fit="contain"
                      sizes="(min-width: 1024px) 216px, 22vw"
                      priority={index === 0}
                      framed={false}
                    />
                    <span className="mt-2 block text-center text-[9px] tracking-[0.18em] text-[var(--muted)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </Link>
              ))}
            </section>
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

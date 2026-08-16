import Image from "next/image";
import Link from "next/link";
import { ArtworkFrame } from "@/components/ArtworkFrame";
import { FadeIn } from "@/components/FadeIn";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { collections } from "@/data/collections";

// Collection names are intentionally omitted from the listing.
export default function CollectionPage() {
  const newestFirstCollections = [...collections].reverse();
  const collectionOverlays = {
    "collection-02": {
      src: "/images/ukha/collection-overlay-panopticon.png",
      width: 1125,
      height: 300,
      className: "w-[min(82vw,780px)]",
      contrastClass: "mix-blend-multiply",
    },
    liminal: {
      src: "/images/ukha/collection-overlay-liminal.png",
      width: 890,
      height: 180,
      className: "w-[min(68vw,620px)]",
      contrastClass: "brightness-0 invert mix-blend-difference",
    },
  } as const;

  return (
    <main className="ukha-page min-h-screen px-6 py-28 sm:px-10">
      <ShowroomHeader />
      <FadeIn className="mx-auto flex min-h-[68vh] max-w-6xl items-center justify-center">
        <div className="w-full text-center">
          <Image
            src="/images/ukha/nav-collection.png"
            alt="collection"
            width={1492}
            height={179}
            sizes="(max-width: 640px) 46vw, 300px"
            className="mx-auto mb-12 h-auto w-[min(46vw,300px)] opacity-[0.96] mix-blend-multiply"
            priority
          />
          <div className="flex flex-col items-center gap-[3.9rem] sm:gap-[5.46rem]">
            {newestFirstCollections.map((collection) => {
              const overlay = collectionOverlays[collection.slug as keyof typeof collectionOverlays];

              return (
                <Link
                  key={collection.slug}
                  href={`/collection/${collection.slug}`}
                  className="relative flex w-full flex-col items-center gap-10"
                >
                  {collection.coverImage ? (
                    <ArtworkFrame
                      src={collection.coverImage}
                      alt={`${collection.title} collection image`}
                      className={
                        collection.slug === "collection-02"
                          ? "aspect-[1.39/1] w-full max-w-4xl"
                          : "aspect-[16/10] w-full max-w-4xl"
                      }
                      fit="contain"
                      sizes="(min-width: 1024px) 896px, 92vw"
                      priority
                      framed={false}
                    />
                  ) : null}
                  {overlay && collection.slug === "liminal" ? (
                    <>
                      <Image
                        src={overlay.src}
                        alt={collection.title}
                        width={overlay.width}
                        height={overlay.height}
                        className={`pointer-events-none absolute left-1/2 top-1/2 z-10 h-auto -translate-x-1/2 -translate-y-1/2 object-contain brightness-0 invert mix-blend-difference ${overlay.className}`}
                        style={{ clipPath: "inset(0 0 0 32%)" }}
                        sizes="(max-width: 640px) 68vw, 620px"
                      />
                      <Image
                        src={overlay.src}
                        alt=""
                        width={overlay.width}
                        height={overlay.height}
                        className={`pointer-events-none absolute left-1/2 top-1/2 z-10 h-auto -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-multiply ${overlay.className}`}
                        style={{ clipPath: "inset(0 68% 0 0)" }}
                        sizes="(max-width: 640px) 68vw, 620px"
                      />
                    </>
                  ) : overlay ? (
                    <Image
                      src={overlay.src}
                      alt={collection.title}
                      width={overlay.width}
                      height={overlay.height}
                      className={`pointer-events-none absolute left-1/2 top-1/2 z-10 h-auto -translate-x-1/2 -translate-y-1/2 object-contain ${overlay.contrastClass} ${overlay.className}`}
                      sizes="(max-width: 640px) 82vw, 780px"
                    />
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>
      </FadeIn>
    </main>
  );
}

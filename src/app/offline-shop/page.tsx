import Image from "next/image";
import { ArtworkFrame } from "@/components/ArtworkFrame";
import { FadeIn } from "@/components/FadeIn";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { offlineShopImages, visitCopy } from "@/data/collections";

export default function OfflineShopPage() {
  return (
    <main className="ukha-page min-h-screen px-6 py-28 sm:px-10">
      <ShowroomHeader />
      <FadeIn className="mx-auto max-w-6xl">
        <section className="grid gap-10 pb-16 pt-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Image
              src="/images/ukha/nav-visit.png"
              alt="visit"
              width={1347}
              height={285}
              sizes="(max-width: 640px) 34vw, 220px"
              className="h-auto w-[min(34vw,220px)] opacity-[0.76] mix-blend-multiply"
              priority
            />
          </div>
          <div className="ukha-note max-w-md space-y-5">
            {visitCopy.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>

        <section className="grid gap-5 sm:grid-cols-2">
          {offlineShopImages.map((image, index) => (
            <ArtworkFrame
              key={image.id}
              src={image.src}
              alt={image.title}
              label={`${image.title} placeholder`}
              className={`${
                image.aspect === "portrait" ? "aspect-[4/5]" : "aspect-[5/4]"
              } ${index === 1 ? "sm:mt-12" : ""}`}
              fit="contain"
              priority={index === 0}
            />
          ))}
        </section>
      </FadeIn>
    </main>
  );
}

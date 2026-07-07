import { ArtworkFrame } from "@/components/ArtworkFrame";
import { FadeIn } from "@/components/FadeIn";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { offlineShopImages } from "@/data/collections";

export default function OfflineShopPage() {
  return (
    <main className="ukha-page min-h-screen px-6 py-28 sm:px-10">
      <ShowroomHeader />
      <FadeIn className="mx-auto max-w-6xl">
        <section className="grid gap-10 pb-16 pt-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="ukha-caption mb-5">
              visit
            </p>
            <h1 className="ukha-display">
              showroom visit
            </h1>
          </div>
          <div className="ukha-copy max-w-xl">
            <p>Address text will be placed here.</p>
            <p className="mt-5">
              Future opening hours, appointment notes, and studio visit details
              can live in this quiet text area.
            </p>
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

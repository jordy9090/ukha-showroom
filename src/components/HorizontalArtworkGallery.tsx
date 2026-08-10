import { ArtworkFrame } from "@/components/ArtworkFrame";

type HorizontalArtworkGalleryProps = {
  images: Array<string | undefined>;
  title: string;
  landscape?: boolean;
  unframed?: boolean;
};

export function HorizontalArtworkGallery({
  images,
  title,
  landscape = false,
  unframed = false,
}: HorizontalArtworkGalleryProps) {
  return (
    <section>
      <div
        className="ukha-horizontal-gallery flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:gap-6"
      >
        {images.map((src, index) => (
          <div
            key={`${title}-${index}`}
            className="min-w-[88%] snap-start sm:min-w-[82%]"
          >
            <ArtworkFrame
              src={src}
              alt={`${title} image ${index + 1}`}
              label={`${title} detail image ${index + 1} placeholder`}
              className={
                landscape
                  ? "aspect-[4/3]"
                  : index === 0
                    ? "aspect-[4/5]"
                    : "aspect-[5/4]"
              }
              fit="contain"
              sizes="(min-width: 1024px) 760px, 82vw"
              priority={index === 0}
              framed={!unframed}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

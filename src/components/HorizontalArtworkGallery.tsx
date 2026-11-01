import { SwipeHint } from "@/components/SwipeHint";

type HorizontalArtworkGalleryProps = {
  images: Array<string | undefined>;
  title: string;
};

export function HorizontalArtworkGallery({
  images,
  title,
}: HorizontalArtworkGalleryProps) {
  return (
    <section className="min-w-0 w-full max-w-full overflow-hidden">
      <div
        className="ukha-horizontal-gallery flex w-full max-w-full snap-x snap-mandatory items-center gap-4 overflow-x-auto overscroll-x-contain pb-2 sm:h-[46vw] sm:gap-5 sm:pr-12 lg:h-[430px]"
      >
        {images.map((src, index) =>
          src ? (
            // Phones: each image is 82% of the screen wide so the next one peeks in.
            // Larger screens: intrinsic sizing preserves equal gaps with a glimpse of the next image.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${title}-${index}`}
              src={src}
              alt={`${title} image ${index + 1}`}
              className="block h-auto max-h-[110vw] w-[82vw] flex-none snap-start object-contain sm:max-h-full sm:w-auto sm:max-w-[calc(100%_-_3rem)]"
              loading={index === 0 ? "eager" : "lazy"}
            />
          ) : (
            <div
              key={`${title}-${index}`}
              role="img"
              aria-label={`${title} detail image ${index + 1} placeholder`}
              className="aspect-[4/3] w-[82vw] flex-none snap-start bg-transparent sm:h-full sm:w-auto sm:max-w-[calc(100%_-_3rem)]"
            />
          ),
        )}
      </div>
      {images.length > 1 ? <SwipeHint /> : null}
    </section>
  );
}

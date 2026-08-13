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
        className="ukha-horizontal-gallery flex h-[63vw] w-full max-w-full snap-x snap-mandatory items-center gap-5 overflow-x-auto overscroll-x-contain pb-2 pr-12 sm:h-[46vw] lg:h-[430px]"
      >
        {images.map((src, index) =>
          src ? (
            // Intrinsic sizing preserves equal visible gaps while leaving a glimpse of the next image.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${title}-${index}`}
              src={src}
              alt={`${title} image ${index + 1}`}
              className="block h-auto max-h-full w-auto max-w-[calc(100%_-_3rem)] flex-none snap-start object-contain"
              loading={index === 0 ? "eager" : "lazy"}
            />
          ) : (
            <div
              key={`${title}-${index}`}
              role="img"
              aria-label={`${title} detail image ${index + 1} placeholder`}
              className="aspect-[4/3] h-full max-w-[calc(100%_-_3rem)] flex-none snap-start bg-transparent"
            />
          ),
        )}
      </div>
    </section>
  );
}

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
        className="ukha-horizontal-gallery flex w-full max-w-full snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2"
      >
        {images.map((src, index) => (
          <div
            key={`${title}-${index}`}
            className="flex h-[63vw] max-h-[520px] flex-none snap-start items-center sm:h-[46vw] lg:h-[430px]"
          >
            {src ? (
              // Intrinsic width keeps the visible gap equal for mixed portrait and landscape photos.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={`${title} image ${index + 1}`}
                className="block h-full w-auto max-w-none object-contain"
                loading={index === 0 ? "eager" : "lazy"}
              />
            ) : (
              <div
                role="img"
                aria-label={`${title} detail image ${index + 1} placeholder`}
                className="aspect-[4/3] h-full bg-transparent"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

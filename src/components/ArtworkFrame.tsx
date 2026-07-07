import Image from "next/image";

type ArtworkFrameProps = {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  sizes?: string;
};

export function ArtworkFrame({
  src,
  alt,
  label,
  className = "",
  priority = false,
  fit = "cover",
  sizes = "(min-width: 1024px) 40vw, 92vw",
}: ArtworkFrameProps) {
  const imageFit = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <div
      className={`relative overflow-hidden border border-[var(--line)] bg-[var(--paper)] ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={imageFit}
        />
      ) : (
        <div
          role="img"
          aria-label={label ?? alt}
          className="flex h-full min-h-64 items-center justify-center bg-[linear-gradient(145deg,rgba(255,255,255,0.52),rgba(231,225,214,0.3))]"
        >
          <span
            aria-hidden="true"
            className="h-10 w-px bg-[var(--line)]"
          />
        </div>
      )}
    </div>
  );
}

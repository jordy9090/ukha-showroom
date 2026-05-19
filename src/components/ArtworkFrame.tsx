import Image from "next/image";

type ArtworkFrameProps = {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
};

export function ArtworkFrame({
  src,
  alt,
  label,
  className = "",
  priority = false,
}: ArtworkFrameProps) {
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
          sizes="(min-width: 1024px) 40vw, 92vw"
          className="object-cover"
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

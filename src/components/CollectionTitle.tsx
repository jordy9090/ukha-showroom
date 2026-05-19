import Image from "next/image";

export function CollectionTitle({
  title,
  handwrittenTitleImage,
}: {
  title: string;
  handwrittenTitleImage?: string;
}) {
  if (handwrittenTitleImage) {
    return (
      <Image
        src={handwrittenTitleImage}
        alt={title}
        width={420}
        height={160}
        className="h-auto w-52 sm:w-72"
        priority
      />
    );
  }

  return (
    <h1 className="font-serif text-5xl lowercase tracking-[0.08em] sm:text-7xl">
      {title}
    </h1>
  );
}

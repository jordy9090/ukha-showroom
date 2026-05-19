import Link from "next/link";
import { CollectionTitle } from "@/components/CollectionTitle";
import { FadeIn } from "@/components/FadeIn";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { collections } from "@/data/collections";

export default function CollectionPage() {
  return (
    <main className="ukha-page min-h-screen px-6 py-28 sm:px-10">
      <ShowroomHeader />
      <FadeIn className="mx-auto flex min-h-[68vh] max-w-4xl items-center justify-center">
        <div className="w-full text-center">
          <p className="mb-12 text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
            collection
          </p>
          <div className="flex flex-col items-center gap-14">
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                href={`/collection/${collection.slug}`}
                className="group flex flex-col items-center gap-5"
              >
                <CollectionTitle
                  title={collection.title}
                  handwrittenTitleImage={collection.handwrittenTitleImage}
                />
                <span className="max-w-md text-sm leading-7 text-[var(--muted)] transition group-hover:text-[var(--foreground)]">
                  {collection.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </FadeIn>
    </main>
  );
}

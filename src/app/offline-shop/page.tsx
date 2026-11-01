import Image from "next/image";
import { ArtworkFrame } from "@/components/ArtworkFrame";
import { CopyEmail } from "@/components/CopyEmail";
import { FadeIn } from "@/components/FadeIn";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { offlineShopImages, visitCopy, visitCopyBeforeShop } from "@/data/collections";
import { SHOP_ENABLED } from "@/data/wearable";

export default function OfflineShopPage() {
  const visibleOfflineShopImages = offlineShopImages.filter(
    (image) => image.src,
  );

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
          <div className="ukha-note max-w-md space-y-6 leading-[2]">
            {(SHOP_ENABLED ? visitCopy : visitCopyBeforeShop).map((line) => (
              <p key={line} className="whitespace-pre-line break-keep">{line}</p>
            ))}
          </div>
        </section>

        <section className="grid gap-5 sm:grid-cols-2">
          {visibleOfflineShopImages.map((image, index) => (
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

        <section className="ukha-note ukha-contact mt-16 flex flex-col items-end pb-4 text-right">
          <CopyEmail className="cursor-pointer text-inherit" />
          <a
            href="https://www.instagram.com/ukha_studio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1"
          >
            @ukha_studio
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 5h5v5" />
              <path d="m10 14 9-9" />
              <path d="M19 14v5H5V5h5" />
            </svg>
          </a>
        </section>
      </FadeIn>
    </main>
  );
}

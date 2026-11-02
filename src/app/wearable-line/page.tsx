import Image from "next/image";
import Link from "next/link";
import { CartBar } from "@/components/CartBar";
import { FadeIn } from "@/components/FadeIn";
import { ShopFooter } from "@/components/ShopFooter";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { formatPrice, PURCHASE_ENABLED, wearableProducts } from "@/data/wearable";

export const metadata = {
  title: "Wearable Line — UKHA studio",
};

export default function WearableLinePage() {
  return (
    <main className="ukha-page min-h-screen px-6 pb-40 pt-28 sm:px-10">
      <ShowroomHeader />
      <FadeIn className="mx-auto max-w-6xl">
        <h1 className="mb-14 flex justify-center sm:mb-20">
          <Image
            src="/images/ukha/collection-overlay-wearable-line.png"
            alt="Wearable Line"
            width={2164}
            height={339}
            sizes="(max-width: 640px) 62vw, 390px"
            className="h-auto w-[min(62vw,390px)] object-contain opacity-75 mix-blend-multiply"
            priority
          />
        </h1>

        <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {wearableProducts.map((product) => (
            <li key={product.id}>
              <Link href={`/wearable-line/${product.id}`} className="group block outline-none">
                {/* 3:2 like the landscape product photos, so they show uncropped; other ratios fit inside. */}
                <div className="aspect-[3/2] overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={2000}
                    height={1333}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
                    className="h-full w-full object-contain opacity-90 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                </div>
                <p className="ukha-piece-title mt-5 text-[12px] transition duration-300 group-hover:-translate-y-0.5">
                  {product.title}
                </p>
                <p className="ukha-note mt-2 text-[var(--muted)]">
                  {formatPrice(product.price)}
                  {product.madeToOrderWeeks ? " · Made to order" : ""}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <ShopFooter />
      </FadeIn>
      {PURCHASE_ENABLED ? <CartBar /> : null}
    </main>
  );
}

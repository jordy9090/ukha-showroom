import { notFound } from "next/navigation";
import { CartBar } from "@/components/CartBar";
import { FadeIn } from "@/components/FadeIn";
import { HorizontalArtworkGallery } from "@/components/HorizontalArtworkGallery";
import { PurchaseOptions } from "@/components/PurchaseOptions";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { formatKRW, formatPrice, getWearableProduct, PURCHASE_ENABLED, SHIPPING_FEE, wearableProducts } from "@/data/wearable";

export function generateStaticParams() {
  return wearableProducts.map((product) => ({ id: product.id }));
}

export default async function WearableProductPage(props: PageProps<"/wearable-line/[id]">) {
  const { id } = await props.params;
  const product = getWearableProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="ukha-page min-h-screen overflow-x-hidden px-6 pb-40 pt-28 sm:px-10">
      <ShowroomHeader />
      <FadeIn className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <HorizontalArtworkGallery images={product.images} title={product.title} />

        <aside className="ukha-piece-details min-w-0 lg:sticky lg:top-28 lg:self-start">
          <h1 className="ukha-piece-title">{product.title}</h1>

          <div className="ukha-piece-metadata mt-10 pt-7">
            <section>
              <p className="ukha-note">{product.material}</p>
              <p className="ukha-note">Size: {product.sizeLabel}</p>
              {product.customWord ? (
                <p className="ukha-note">Design: original or one custom word</p>
              ) : null}
            </section>
            <section>
              <p className="ukha-note">Price: {formatPrice(product.price)}</p>
              <p className="ukha-note text-[var(--muted)]">Shipping: {formatKRW(SHIPPING_FEE)}</p>
            </section>
          </div>

          <PurchaseOptions product={product} />
        </aside>
      </FadeIn>
      {PURCHASE_ENABLED ? <CartBar /> : null}
    </main>
  );
}

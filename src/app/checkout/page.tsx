import Image from "next/image";
import Link from "next/link";
import { CheckoutForm } from "@/components/CheckoutForm";
import { ShopFooter } from "@/components/ShopFooter";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { decodeOrderItems, formatKRW, itemLabel, priceOrder } from "@/data/wearable";

export const metadata = {
  title: "Checkout — UKHA studio",
};

export default async function CheckoutPage(props: PageProps<"/checkout">) {
  const query = await props.searchParams;
  const itemsParam = Array.isArray(query.items) ? query.items[0] : query.items;
  const order = priceOrder(decodeOrderItems(itemsParam));
  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

  return (
    <main className="ukha-page min-h-screen px-6 py-28 sm:px-10">
      <ShowroomHeader />
      <div className="mx-auto max-w-5xl">
        {!order ? (
          <p className="ukha-note text-center">
            One of these items is not available.{" "}
            <Link href="/wearable-line/cart" className="underline">
              Back to cart
            </Link>
          </p>
        ) : (
          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <div className="order-2 lg:order-1">
              {clientKey ? (
                <CheckoutForm
                  clientKey={clientKey}
                  items={order.items.map((line) => ({
                    productId: line.product.id,
                    size: line.size,
                    quantity: line.quantity,
                    word: line.word,
                  }))}
                  total={order.total}
                />
              ) : (
                <p className="ukha-note">Online payment is not configured yet.</p>
              )}
            </div>

            <aside className="order-1 lg:sticky lg:top-28 lg:order-2 lg:self-start">
              <h1 className="ukha-piece-title mb-6 text-[12px]">ORDER</h1>
              <ul className="space-y-5">
                {order.items.map((line) => (
                  <li key={`${line.product.id}-${line.size}-${line.word}`} className="flex gap-4">
                    <Image
                      src={line.product.images[0]}
                      alt=""
                      width={1600}
                      height={1600}
                      sizes="80px"
                      className="h-20 w-20 flex-none object-cover"
                    />
                    <div className="ukha-note min-w-0 flex-1 space-y-1 leading-5">
                      <p>{itemLabel(line.product, line.size, line.word)}</p>
                      <p className="text-[var(--muted)]">
                        Qty {line.quantity} · {formatKRW(line.lineTotal)}
                      </p>
                      {line.product.madeToOrderWeeks ? (
                        <p className="text-[var(--muted)]">
                          Made to order · ships in about {line.product.madeToOrderWeeks} weeks
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="ukha-note mt-8 space-y-2 border-t border-[var(--line)] pt-5">
                <div className="flex justify-between">
                  <dt className="text-[var(--muted)]">Subtotal</dt>
                  <dd>{formatKRW(order.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--muted)]">Shipping</dt>
                  <dd>{formatKRW(order.shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-[var(--line)] pt-3">
                  <dt>Total</dt>
                  <dd>{formatKRW(order.total)}</dd>
                </div>
              </dl>
            </aside>
          </div>
        )}
      </div>
      <ShopFooter />
    </main>
  );
}

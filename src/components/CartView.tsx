"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  encodeOrderItems,
  formatKRW,
  getWearableProduct,
  itemLabel,
  MAX_QUANTITY,
  SHIPPING_FEE,
} from "@/data/wearable";
import {
  markCheckoutFromCart,
  removeFromCart,
  setCartQuantity,
  useCart,
} from "@/lib/cart";

export function CartView() {
  const router = useRouter();
  const items = useCart();
  // Pieces removed from the catalogue since they were added are shown as unavailable.
  const lines = items.map((item, index) => ({
    item,
    index,
    product: getWearableProduct(item.productId),
  }));
  const available = lines.filter((line) => line.product && line.product.price !== null);
  const subtotal = available.reduce(
    (sum, line) => sum + (line.product!.price ?? 0) * line.item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <div className="ukha-note py-24 text-center">
        <p>Your cart is empty.</p>
        <Link href="/wearable-line" className="mt-6 inline-block underline">
          Back to Wearable Line
        </Link>
      </div>
    );
  }

  const checkout = () => {
    markCheckoutFromCart(true);
    router.push(
      `/checkout?${new URLSearchParams({
        items: encodeOrderItems(available.map((line) => line.item)),
      }).toString()}`,
    );
  };

  return (
    <div className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
      <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {lines.map(({ item, index, product }) => (
          <li key={`${item.productId}-${item.size}-${item.word}-${index}`} className="flex gap-5 py-6">
            {product ? (
              <Link href={`/wearable-line/${product.id}`} className="flex-none">
                <Image
                  src={product.images[0]}
                  alt=""
                  width={1600}
                  height={1600}
                  sizes="112px"
                  className="h-24 w-24 object-cover sm:h-28 sm:w-28"
                />
              </Link>
            ) : (
              <div className="h-24 w-24 flex-none bg-[var(--paper)] sm:h-28 sm:w-28" />
            )}

            <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
              <div className="ukha-note leading-5">
                <p className="text-[var(--foreground)]!">
                  {product ? itemLabel(product, item.size, item.word) : "This piece is no longer available"}
                </p>
                {product?.madeToOrderWeeks ? (
                  <p>Made to order · ships in about {product.madeToOrderWeeks} weeks</p>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center border border-[var(--line)]">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={!product || item.quantity <= 1}
                    onClick={() => setCartQuantity(index, item.quantity - 1)}
                    className="ukha-note h-8 w-8 hover:bg-[var(--paper)] disabled:opacity-30"
                  >
                    −
                  </button>
                  <span className="ukha-note w-7 text-center">{item.quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={!product || item.quantity >= MAX_QUANTITY}
                    onClick={() => setCartQuantity(index, item.quantity + 1)}
                    className="ukha-note h-8 w-8 hover:bg-[var(--paper)] disabled:opacity-30"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-5">
                  {product ? (
                    <span className="ukha-note">{formatKRW((product.price ?? 0) * item.quantity)}</span>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => removeFromCart(index)}
                    className="ukha-note underline hover:opacity-70"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <dl className="ukha-note space-y-2">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatKRW(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd>{formatKRW(SHIPPING_FEE)}</dd>
          </div>
          <div className="flex justify-between border-t border-[var(--line)] pt-3 text-[var(--foreground)]!">
            <dt>Total</dt>
            <dd>{formatKRW(subtotal + SHIPPING_FEE)}</dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={checkout}
          disabled={available.length === 0}
          className="ukha-note mt-8 w-full border border-[var(--foreground)] bg-[var(--foreground)] py-4 tracking-[0.22em]! text-[var(--background)]! transition duration-300 hover:opacity-85 disabled:opacity-40"
        >
          CHECKOUT
        </button>
        <p className="ukha-note mt-4 leading-6">Payment is available in Korea only.</p>
      </aside>
    </div>
  );
}

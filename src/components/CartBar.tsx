"use client";

import Link from "next/link";
import { formatKRW, getWearableProduct } from "@/data/wearable";
import { cartCount, useCart } from "@/lib/cart";

// Cart tab pinned to the bottom of the Wearable Line pages, visible even when empty.
export function CartBar() {
  // Ignore lines for pieces that are no longer in the catalogue.
  const items = useCart().filter((item) => getWearableProduct(item.productId));
  const count = cartCount(items);
  const subtotal = items.reduce(
    (sum, item) => sum + (getWearableProduct(item.productId)?.price ?? 0) * item.quantity,
    0,
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--line)] bg-[var(--background)]/92 backdrop-blur-sm">
      <Link
        href="/wearable-line/cart"
        className="group mx-auto flex max-w-6xl items-center justify-between px-6 py-4 outline-none sm:px-10"
      >
        <span className="ukha-note tracking-[0.22em]! text-[var(--foreground)]! transition duration-300 group-hover:-translate-y-0.5">
          CART ({count})
        </span>
        <span className="ukha-note flex items-center gap-3">
          {count > 0 ? formatKRW(subtotal) : "Empty"}
          <span
            aria-hidden="true"
            className="text-[var(--foreground)]! transition duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </Link>
    </div>
  );
}

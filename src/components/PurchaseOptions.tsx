"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  encodeOrderItems,
  formatKRW,
  madeToOrderNotice,
  MAX_QUANTITY,
  type WearableProduct,
} from "@/data/wearable";
import { addToCart, markCheckoutFromCart } from "@/lib/cart";

export function PurchaseOptions({ product }: { product: WearableProduct }) {
  const router = useRouter();
  const [size, setSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (addedTimer.current) {
      clearTimeout(addedTimer.current);
    }
  }, []);

  const selection = () => {
    if (product.ringSizes && size === null) {
      setError("Please choose a ring size.");
      return null;
    }

    return { productId: product.id, size, quantity };
  };

  const buy = () => {
    const item = selection();

    if (!item) {
      return;
    }

    markCheckoutFromCart(false);
    router.push(`/checkout?${new URLSearchParams({ items: encodeOrderItems([item]) }).toString()}`);
  };

  const add = () => {
    const item = selection();

    if (!item) {
      return;
    }

    if (!addToCart(item)) {
      setError("Your cart is full.");
      return;
    }

    // Show "ADDED" on the button for one second; repeated clicks restart the timer.
    if (addedTimer.current) {
      clearTimeout(addedTimer.current);
    }

    setAdded(true);
    addedTimer.current = setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div className="mt-10 space-y-7">
      {product.ringSizes ? (
        <fieldset>
          <legend className="ukha-note mb-3 text-[var(--muted)]">Ring size (KR)</legend>
          <div className="flex flex-wrap gap-2">
            {product.ringSizes.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={size === option}
                onClick={() => {
                  setSize(option);
                  setError("");
                  setAdded(false);
                }}
                className={`ukha-note h-9 w-10 border transition duration-300 ${
                  size === option
                    ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]!"
                    : "border-[var(--line)] hover:border-[var(--foreground)]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className="flex items-center gap-4">
        <span className="ukha-note text-[var(--muted)]">Quantity</span>
        <div className="flex items-center border border-[var(--line)]">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => {
              setQuantity((value) => Math.max(1, value - 1));
              setAdded(false);
            }}
            className="ukha-note h-9 w-9 hover:bg-[var(--paper)]"
          >
            −
          </button>
          <span className="ukha-note w-8 text-center" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => {
              setQuantity((value) => Math.min(MAX_QUANTITY, value + 1));
              setAdded(false);
            }}
            className="ukha-note h-9 w-9 hover:bg-[var(--paper)]"
          >
            +
          </button>
        </div>
      </div>

      {product.madeToOrderWeeks ? (
        <div className="ukha-note space-y-3 leading-6 text-[var(--muted)]">
          {madeToOrderNotice(product.madeToOrderWeeks).map((line) => (
            <p key={line} className="break-keep">
              {line}
            </p>
          ))}
        </div>
      ) : null}

      <div className="space-y-3">
        <button
          type="button"
          onClick={add}
          className="ukha-note w-full border border-[var(--foreground)] py-4 tracking-[0.22em]! text-[var(--foreground)]! transition duration-300 hover:bg-[var(--paper)]"
        >
          <span aria-live="polite">{added ? "ADDED" : "ADD TO CART"}</span>
        </button>
        <button
          type="button"
          onClick={buy}
          className="ukha-note w-full border border-[var(--foreground)] bg-[var(--foreground)] py-4 tracking-[0.22em]! text-[var(--background)]! transition duration-300 hover:opacity-85"
        >
          BUY NOW · {formatKRW(product.price * quantity)}
        </button>
        {error ? (
          <p role="alert" className="ukha-note text-[#9a3b2e]!">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}

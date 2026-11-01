"use client";

import { useEffect } from "react";
import { clearCart, consumeCheckoutFromCart } from "@/lib/cart";

// Empties the cart once its contents have been paid for.
export function ClearCartAfterPayment() {
  useEffect(() => {
    if (consumeCheckoutFromCart()) {
      clearCart();
    }
  }, []);

  return null;
}

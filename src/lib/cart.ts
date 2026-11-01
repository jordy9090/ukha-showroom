"use client";

import { useSyncExternalStore } from "react";
import { MAX_CART_LINES, MAX_QUANTITY, type OrderSelection } from "@/data/wearable";

// The Wearable Line cart lives in this browser's localStorage, so it survives
// reloads without an account. Prices are always recalculated on the server.
const STORAGE_KEY = "ukha_cart";
const CHECKOUT_FROM_CART_KEY = "ukha_checkout_from_cart";
const EMPTY: OrderSelection[] = [];
const listeners = new Set<() => void>();

let cachedRaw: string | null = null;
let cachedItems: OrderSelection[] = EMPTY;

function readRaw() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getSnapshot() {
  const raw = readRaw();

  if (raw !== cachedRaw) {
    cachedRaw = raw;

    try {
      const parsed = raw ? JSON.parse(raw) : [];
      cachedItems = Array.isArray(parsed) ? parsed : EMPTY;
    } catch {
      cachedItems = EMPTY;
    }
  }

  return cachedItems;
}

function write(items: OrderSelection[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage can be unavailable (private mode); the cart then lasts for this page only.
    cachedRaw = JSON.stringify(items);
    cachedItems = items;
  }

  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      listener();
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}

export function cartCount(items: OrderSelection[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

// Adds a line, merging with an existing line for the same piece, size and word.
// Returns false when the cart is full.
export function addToCart(item: OrderSelection) {
  const items = getSnapshot();
  const index = items.findIndex(
    (line) =>
      line.productId === item.productId &&
      line.size === item.size &&
      (line.word ?? null) === (item.word ?? null),
  );

  if (index >= 0) {
    write(
      items.map((line, lineIndex) =>
        lineIndex === index
          ? { ...line, quantity: Math.min(MAX_QUANTITY, line.quantity + item.quantity) }
          : line,
      ),
    );
    return true;
  }

  if (items.length >= MAX_CART_LINES) {
    return false;
  }

  write([...items, item]);
  return true;
}

export function setCartQuantity(index: number, quantity: number) {
  write(
    getSnapshot().map((line, lineIndex) =>
      lineIndex === index
        ? { ...line, quantity: Math.max(1, Math.min(MAX_QUANTITY, quantity)) }
        : line,
    ),
  );
}

export function removeFromCart(index: number) {
  write(getSnapshot().filter((_, lineIndex) => lineIndex !== index));
}

export function clearCart() {
  write([]);
}

// Remembers that the current checkout came from the cart, so the cart is only
// emptied after paying for it (not after a single "buy now" purchase).
export function markCheckoutFromCart(fromCart: boolean) {
  try {
    if (fromCart) {
      window.sessionStorage.setItem(CHECKOUT_FROM_CART_KEY, "1");
    } else {
      window.sessionStorage.removeItem(CHECKOUT_FROM_CART_KEY);
    }
  } catch {
    // Ignore unavailable storage.
  }
}

export function consumeCheckoutFromCart() {
  try {
    const fromCart = window.sessionStorage.getItem(CHECKOUT_FROM_CART_KEY) === "1";
    window.sessionStorage.removeItem(CHECKOUT_FROM_CART_KEY);
    return fromCart;
  } catch {
    return false;
  }
}

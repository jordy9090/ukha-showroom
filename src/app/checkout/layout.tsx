import { notFound } from "next/navigation";
import { PURCHASE_ENABLED } from "@/data/wearable";

// Checkout exists only while buying is switched on.
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  if (!PURCHASE_ENABLED) {
    notFound();
  }

  return children;
}

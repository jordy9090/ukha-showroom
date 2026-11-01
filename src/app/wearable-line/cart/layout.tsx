import { notFound } from "next/navigation";
import { PURCHASE_ENABLED } from "@/data/wearable";

// The cart exists only while buying is switched on.
export default function CartLayout({ children }: { children: React.ReactNode }) {
  if (!PURCHASE_ENABLED) {
    notFound();
  }

  return children;
}

import { notFound } from "next/navigation";
import { SHOP_ENABLED } from "@/data/wearable";

// Hidden on the live site until the online shop is switched on.
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  if (!SHOP_ENABLED) {
    notFound();
  }

  return children;
}

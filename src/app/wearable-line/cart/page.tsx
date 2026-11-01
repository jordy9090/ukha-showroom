import Link from "next/link";
import { CartView } from "@/components/CartView";
import { ShopFooter } from "@/components/ShopFooter";
import { ShowroomHeader } from "@/components/ShowroomHeader";

export const metadata = {
  title: "Cart — UKHA studio",
};

export default function CartPage() {
  return (
    <main className="ukha-page min-h-screen px-6 py-28 sm:px-10">
      <ShowroomHeader />
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-baseline justify-between">
          <h1 className="ukha-piece-title">CART</h1>
          <Link href="/wearable-line" className="ukha-note underline">
            Continue shopping
          </Link>
        </div>
        <CartView />
        <ShopFooter />
      </div>
    </main>
  );
}

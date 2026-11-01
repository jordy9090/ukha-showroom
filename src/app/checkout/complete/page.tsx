import Link from "next/link";
import { ClearCartAfterPayment } from "@/components/ClearCartAfterPayment";
import { ShowroomHeader } from "@/components/ShowroomHeader";
import { formatKRW } from "@/data/wearable";

export const metadata = {
  title: "Order complete — UKHA studio",
};

export default async function CheckoutCompletePage(props: PageProps<"/checkout/complete">) {
  const query = await props.searchParams;
  const one = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);
  const orderId = one(query.orderId);
  const orderName = one(query.orderName);
  const total = Number(one(query.total));

  return (
    <main className="ukha-page flex min-h-screen flex-col items-center justify-center px-6 py-28 text-center sm:px-10">
      <ShowroomHeader />
      <ClearCartAfterPayment />
      <h1 className="ukha-piece-title">THANK YOU</h1>
      <div className="ukha-note mt-8 space-y-2 leading-6">
        <p>Your payment has been completed.</p>
        {orderName ? <p>{orderName}</p> : null}
        {Number.isFinite(total) && total > 0 ? <p>{formatKRW(total)}</p> : null}
        {orderId ? <p className="text-[var(--muted)]">Order {orderId}</p> : null}
        <p className="pt-4 text-[var(--muted)]">
          A receipt has been sent to your email. We will contact you when your piece ships.
        </p>
      </div>
      <Link href="/wearable-line" className="ukha-note mt-12 underline">
        Back to Wearable Line
      </Link>
    </main>
  );
}

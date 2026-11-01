import Link from "next/link";
import { ShowroomHeader } from "@/components/ShowroomHeader";

export const metadata = {
  title: "Payment not completed — UKHA studio",
};

export default async function CheckoutFailPage(props: PageProps<"/checkout/fail">) {
  const query = await props.searchParams;
  const one = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);
  const message = one(query.message);
  const code = one(query.code);

  return (
    <main className="ukha-page flex min-h-screen flex-col items-center justify-center px-6 py-28 text-center sm:px-10">
      <ShowroomHeader />
      <h1 className="ukha-piece-title">PAYMENT NOT COMPLETED</h1>
      <div className="ukha-note mt-8 space-y-2 leading-6">
        <p>{message || "The payment was cancelled or could not be processed."}</p>
        {code ? <p className="text-[var(--muted)]">{code}</p> : null}
        <p className="pt-4 text-[var(--muted)]">You have not been charged.</p>
      </div>
      <Link href="/wearable-line" className="ukha-note mt-12 underline">
        Back to Wearable Line
      </Link>
    </main>
  );
}

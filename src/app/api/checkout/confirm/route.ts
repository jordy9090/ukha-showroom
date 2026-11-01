import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SHOP_ENABLED } from "@/data/wearable";
import {
  confirmTossPayment,
  notifyNewOrder,
  PENDING_ORDER_COOKIE,
  unsealOrder,
} from "@/lib/orders";

// Toss redirects here (successUrl) after the buyer authorises the payment.
// The payment is only final once this handler confirms it with the secret key.
export async function GET(request: Request) {
  if (!SHOP_ENABLED) {
    return new Response(null, { status: 404 });
  }

  const params = new URL(request.url).searchParams;
  const paymentKey = params.get("paymentKey") ?? "";
  const orderId = params.get("orderId") ?? "";
  const amount = Number(params.get("amount"));
  const cookieStore = await cookies();
  const order = unsealOrder(cookieStore.get(PENDING_ORDER_COOKIE)?.value);

  const fail = (code: string, message: string) =>
    redirect(`/checkout/fail?${new URLSearchParams({ code, message }).toString()}`);

  if (!paymentKey || !order || order.orderId !== orderId) {
    fail("ORDER_NOT_FOUND", "The order session expired. Please try again.");
  }

  // The amount in the URL comes from the browser; it must match what the server priced.
  if (amount !== order!.total) {
    fail("AMOUNT_MISMATCH", "The payment amount did not match the order.");
  }

  const result = await confirmTossPayment({ paymentKey, orderId, amount: order!.total });

  if (!result.ok) {
    fail(result.code, result.message);
  }

  cookieStore.delete(PENDING_ORDER_COOKIE);
  await notifyNewOrder(order!, { method: result.ok ? result.method : null });

  redirect(
    `/checkout/complete?${new URLSearchParams({ orderId, orderName: order!.orderName, total: String(order!.total) }).toString()}`,
  );
}

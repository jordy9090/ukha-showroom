import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { businessInfo, formatKRW, type OrderSelection } from "@/data/wearable";

// A pending order lives in an encrypted, httpOnly cookie between the checkout
// form and Toss's redirect back, so no database is needed and no personal data
// travels in URLs.
export const PENDING_ORDER_COOKIE = "ukha_pending_order";
export const PENDING_ORDER_MAX_AGE = 60 * 30;

export type Customer = {
  name: string;
  phone: string;
  email: string;
  postalCode: string;
  address: string;
  addressDetail: string;
  memo: string;
};

export type PendingOrder = {
  orderId: string;
  orderName: string;
  items: OrderSelection[];
  // One display line per item, e.g. "WEARABLE LINE: RING 01 / size 13 x1 — KRW 130,000".
  itemSummaries: string[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: Customer;
  createdAt: string;
};

function tossSecretKey() {
  const key = process.env.TOSS_SECRET_KEY;

  if (!key) {
    throw new Error("TOSS_SECRET_KEY is not set.");
  }

  return key;
}

function cookieKey() {
  const secret = process.env.ORDER_COOKIE_SECRET || tossSecretKey();

  return createHash("sha256").update(secret).digest();
}

export function sealOrder(order: PendingOrder) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", cookieKey(), iv);
  const body = Buffer.concat([cipher.update(JSON.stringify(order), "utf8"), cipher.final()]);

  return Buffer.concat([iv, cipher.getAuthTag(), body]).toString("base64url");
}

export function unsealOrder(value: string | undefined): PendingOrder | null {
  if (!value) {
    return null;
  }

  try {
    const raw = Buffer.from(value, "base64url");
    const decipher = createDecipheriv("aes-256-gcm", cookieKey(), raw.subarray(0, 12));
    decipher.setAuthTag(raw.subarray(12, 28));
    const body = Buffer.concat([decipher.update(raw.subarray(28)), decipher.final()]);

    return JSON.parse(body.toString("utf8")) as PendingOrder;
  } catch {
    return null;
  }
}

export function createOrderId() {
  // Korean date (UTC+9) so order numbers match the shop's calendar.
  const date = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10).replaceAll("-", "");

  return `UKHA-${date}-${randomBytes(6).toString("hex")}`;
}

type ConfirmResult =
  | { ok: true; method: string | null; approvedAt: string | null }
  | { ok: false; code: string; message: string };

export async function confirmTossPayment(params: {
  paymentKey: string;
  orderId: string;
  amount: number;
}): Promise<ConfirmResult> {
  const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${tossSecretKey()}:`).toString("base64")}`,
      "Content-Type": "application/json",
      // Lets a refreshed success URL retry safely without charging twice.
      "Idempotency-Key": params.orderId,
    },
    body: JSON.stringify(params),
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return {
      ok: false,
      code: typeof data.code === "string" ? data.code : "CONFIRM_FAILED",
      message: typeof data.message === "string" ? data.message : "Payment could not be confirmed.",
    };
  }

  return {
    ok: true,
    method: typeof data.method === "string" ? data.method : null,
    approvedAt: typeof data.approvedAt === "string" ? data.approvedAt : null,
  };
}

// Emails the shop about a paid order through Resend. Skipped (with a log line)
// until RESEND_API_KEY and ORDER_NOTIFY_EMAIL are configured.
export async function notifyNewOrder(order: PendingOrder, payment: { method: string | null }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_EMAIL;

  if (!apiKey || !to) {
    console.info(`[orders] Paid order ${order.orderId}; email skipped (RESEND_API_KEY / ORDER_NOTIFY_EMAIL not set).`);
    return;
  }

  const { customer } = order;
  const lines = [
    `New order ${order.orderId}`,
    "",
    ...order.itemSummaries,
    `Subtotal: ${formatKRW(order.subtotal)}`,
    `Shipping: ${formatKRW(order.shipping)}`,
    `Total paid: ${formatKRW(order.total)}${payment.method ? ` (${payment.method})` : ""}`,
    "",
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Email: ${customer.email}`,
    `Address: (${customer.postalCode}) ${customer.address} ${customer.addressDetail}`.trim(),
    customer.memo ? `Memo: ${customer.memo}` : "",
  ].filter((line, index, all) => line !== "" || all[index - 1] !== "");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.ORDER_FROM_EMAIL || `${businessInfo.companyName} <onboarding@resend.dev>`,
      to: [to],
      reply_to: customer.email,
      subject: `[UKHA] New order ${order.orderId}`,
      text: lines.join("\n"),
    }),
  });

  if (!response.ok) {
    console.error(`[orders] Order email for ${order.orderId} failed: ${response.status} ${await response.text()}`);
  }
}

import { cookies } from "next/headers";
import { formatKRW, itemLabel, MAX_CART_LINES, priceOrder, SHOP_ENABLED } from "@/data/wearable";
import {
  createOrderId,
  PENDING_ORDER_COOKIE,
  PENDING_ORDER_MAX_AGE,
  sealOrder,
  type Customer,
} from "@/lib/orders";

const customerLimits: Record<keyof Customer, { required: boolean; max: number }> = {
  name: { required: true, max: 50 },
  phone: { required: true, max: 15 },
  email: { required: true, max: 100 },
  postalCode: { required: true, max: 10 },
  address: { required: true, max: 200 },
  addressDetail: { required: false, max: 200 },
  memo: { required: false, max: 300 },
};

function readCustomer(input: unknown): Customer | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const source = input as Record<string, unknown>;
  const customer = {} as Customer;

  for (const [field, limit] of Object.entries(customerLimits) as [keyof Customer, (typeof customerLimits)[keyof Customer]][]) {
    const value = typeof source[field] === "string" ? (source[field] as string).trim() : "";

    if ((limit.required && !value) || value.length > limit.max) {
      return null;
    }

    customer[field] = value;
  }

  customer.phone = customer.phone.replace(/\D/g, "");

  if (customer.phone.length < 8 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    return null;
  }

  return customer;
}

export async function POST(request: Request) {
  if (!SHOP_ENABLED) {
    return new Response(null, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const rawItems: unknown[] =
    body && Array.isArray(body.items) ? body.items.slice(0, MAX_CART_LINES + 1) : [];
  const priced = priceOrder(
    rawItems.map((raw) => {
      const item = (raw ?? {}) as Record<string, unknown>;

      return {
        productId: String(item.productId ?? ""),
        size: item.size === null || item.size === undefined ? null : Number(item.size),
        quantity: Number(item.quantity),
      };
    }),
  );
  const customer = body ? readCustomer(body.customer) : null;

  if (!priced) {
    return Response.json({ error: "One of the items or options is not available." }, { status: 400 });
  }

  if (!customer) {
    return Response.json({ error: "Please check the shipping details." }, { status: 400 });
  }

  const orderId = createOrderId();
  const cookieStore = await cookies();

  cookieStore.set(
    PENDING_ORDER_COOKIE,
    sealOrder({
      orderId,
      orderName: priced.orderName,
      items: priced.items.map((line) => ({
        productId: line.product.id,
        size: line.size,
        quantity: line.quantity,
      })),
      itemSummaries: priced.items.map(
        (line) => `${itemLabel(line.product, line.size)} x${line.quantity} — ${formatKRW(line.lineTotal)}`,
      ),
      subtotal: priced.subtotal,
      shipping: priced.shipping,
      total: priced.total,
      customer,
      createdAt: new Date().toISOString(),
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: PENDING_ORDER_MAX_AGE,
    },
  );

  return Response.json({
    orderId,
    orderName: priced.orderName,
    amount: priced.total,
    customer: { name: customer.name, email: customer.email, phone: customer.phone },
  });
}

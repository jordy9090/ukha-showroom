import { businessInfo, getWearableProduct } from "@/data/wearable";

// Purchase inquiries from the Wearable Line product pages. Each one is emailed to the studio
// through Resend (RESEND_API_KEY), to INQUIRY_NOTIFY_EMAIL or the studio email by default.
// The studio replies by Instagram DM, phone or email.

const limits = { instagram: 60, contact: 100, message: 1000 };

function field(source: Record<string, unknown>, name: keyof typeof limits) {
  const value = typeof source[name] === "string" ? (source[name] as string).trim() : "";
  return value.length > limits[name] ? null : value;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

  if (!body) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  // Hidden field only bots fill in; pretend it worked.
  if (typeof body.website === "string" && body.website !== "") {
    return Response.json({ ok: true });
  }

  const product = getWearableProduct(String(body.productId ?? ""));
  const instagram = field(body, "instagram");
  const contact = field(body, "contact");
  const message = field(body, "message");

  if (!product || instagram === null || contact === null || message === null || (!instagram && !contact)) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const text = [
    `구매 문의 / Purchase inquiry: ${product.title}`,
    "",
    instagram ? `Instagram: ${instagram.startsWith("@") ? instagram : `@${instagram}`}` : "",
    contact ? `연락처 / Contact: ${contact}` : "",
    message ? `\n${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_NOTIFY_EMAIL || businessInfo.email;

  if (!apiKey) {
    console.info(`[inquiry] Email skipped (RESEND_API_KEY not set).\n${text}`);
    // Locally that is fine; on the live site the visitor is pointed to email or Instagram instead.
    return process.env.NODE_ENV === "production"
      ? Response.json({ error: "unavailable" }, { status: 503 })
      : Response.json({ ok: true });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      // Resend's shared sender delivers to the Resend account's own address, which is enough
      // for notifications to the studio.
      from: process.env.INQUIRY_FROM_EMAIL || "UKHA studio <onboarding@resend.dev>",
      to: [to],
      reply_to: contact.includes("@") ? contact : undefined,
      subject: `[UKHA] 구매 문의 — ${product.title}`,
      text,
    }),
  });

  if (!response.ok) {
    console.error(`[inquiry] Email failed: ${response.status} ${await response.text()}`);
    return Response.json({ error: "unavailable" }, { status: 502 });
  }

  return Response.json({ ok: true });
}

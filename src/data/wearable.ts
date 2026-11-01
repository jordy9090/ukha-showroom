// Wearable Line products that can be bought online.
// This file is imported by client components, so keep it free of Node APIs.
// Prices are in KRW. Replace the temporary entries with the real line-up.

// Online shop switch. Off unless NEXT_PUBLIC_SHOP_ENABLED=true, so the live site
// keeps Wearable Line, cart and checkout hidden until payments are approved.
export const SHOP_ENABLED = process.env.NEXT_PUBLIC_SHOP_ENABLED === "true";

export type WearableProduct = {
  id: string;
  title: string;
  material: string;
  description: string;
  price: number;
  images: string[];
  // Ring sizes (Korean 호) the buyer must choose from. Omit for one-size pieces.
  ringSizes?: number[];
  // Made-to-order pieces: approximate weeks from payment to shipping.
  madeToOrderWeeks?: number;
};

export const SHIPPING_FEE = 3000;
export const MAX_QUANTITY = 5;

const STANDARD_RING_SIZES = [9, 10, 11, 12, 13, 14, 15, 16, 17];

export const wearableProducts: WearableProduct[] = [
  {
    id: "wearable-ring-01",
    title: "WEARABLE LINE: RING 01",
    material: "Brass",
    description: "Hand-textured brass band, linked ring set.",
    price: 130000,
    images: ["/images/ukha/wearable-line-01.jpg"],
    ringSizes: STANDARD_RING_SIZES,
    madeToOrderWeeks: 2,
  },
  {
    id: "wearable-ring-02",
    title: "WEARABLE LINE: RING 02",
    material: "Brass",
    description: "Sculptural brass ring with layered plates.",
    price: 180000,
    images: ["/images/ukha/wearable-line-02.jpg"],
    ringSizes: STANDARD_RING_SIZES,
    madeToOrderWeeks: 2,
  },
  {
    id: "wearable-cuff-01",
    title: "WEARABLE LINE: CUFF",
    material: "Brass",
    description: "Open brass cuff. One size.",
    price: 220000,
    images: ["/images/ukha/wearable-line-03.jpg"],
    madeToOrderWeeks: 2,
  },
];

// Seller details required on Korean e-commerce pages (전자상거래법).
// Fill these in before going live; the payment provider checks them during review.
export const businessInfo = {
  companyName: "유카(UkHa)",
  representative: "정하윤",
  registrationNumber: "478-45-01125",
  mailOrderNumber: "—",
  address: "경기도 용인시 기흥구 연원로 5 (연원마을엘지자이아파트) 105-1603 (16908)",
  email: "ukhastudio@gmail.com",
  phone: "—",
};

// Exchange and refund policy shown in the shop footer (Korean, then English).
export const refundPolicy = [
  {
    title: "교환 및 환불 안내",
    items: [
      "주문 제작(M-T-O) 피스는 주문에 따라 개별 제작되는 상품으로, 결제 후 24시간 이내 취소 요청 시 전액 환불됩니다. 24시간이 지난 이후에는 제작이 시작되어 단순 변심에 의한 취소·교환·환불이 불가합니다.",
      "상품 불량 또는 오배송의 경우 수령 후 7일 이내 연락 주시면 교환 또는 환불해 드리며, 배송비는 UKHA가 부담합니다.",
      "수작업 특성상 표면 질감, 형태, 황동의 자연스러운 산화(색 변화)는 피스마다 다를 수 있으며 불량에 해당하지 않습니다.",
      "환불은 반품 상품 확인 후 3영업일 이내 결제하신 수단으로 처리됩니다.",
      "교환·환불 문의는 이메일 또는 인스타그램 DM으로 연락 주시기 바랍니다.",
    ],
  },
  {
    title: "Exchange & Refund Policy",
    items: [
      "Made-to-order (M-T-O) pieces are produced individually for each order. Orders cancelled within 24 hours of payment are fully refunded; after 24 hours, production begins and orders cannot be cancelled, exchanged or refunded for change of mind.",
      "For defective or incorrect items, please contact us within 7 days of delivery for an exchange or refund; UKHA covers the shipping.",
      "As each piece is handmade, variations in surface texture, form and the natural oxidation of brass are not considered defects.",
      "Refunds are issued to the original payment method within 3 business days after the returned item is received.",
      "For exchanges and refunds, please contact us via email or Instagram DM.",
    ],
  },
];

// Made-to-order notice (Korean, then English) shown above the purchase buttons.
export function madeToOrderNotice(weeks: number) {
  return [
    `주문 제작(M-T-O) 피스입니다. 결제 후 제작되어 발송까지 약 ${weeks}주가 소요되며, 결제 후 24시간이 지나면 취소할 수 없습니다.`,
    `Made to order (M-T-O). Each piece is made after payment and ships in about ${weeks} weeks. Orders cannot be cancelled more than 24 hours after payment.`,
  ];
}

export function getWearableProduct(id: string) {
  return wearableProducts.find((product) => product.id === id);
}

export function formatKRW(value: number) {
  return `KRW ${value.toLocaleString("en-US")}`;
}

export type OrderSelection = {
  productId: string;
  size: number | null;
  quantity: number;
};

export const MAX_CART_LINES = 10;

// Order lines travel between pages as "productId:size:quantity" joined by commas,
// e.g. "wearable-ring-01:13:1,wearable-cuff-01::2". No personal data is included.
export function encodeOrderItems(items: OrderSelection[]) {
  return items.map((item) => `${item.productId}:${item.size ?? ""}:${item.quantity}`).join(",");
}

export function decodeOrderItems(value: string | undefined | null): OrderSelection[] {
  if (!value) {
    return [];
  }

  return value.split(",").map((part) => {
    const [productId = "", size = "", quantity = ""] = part.split(":");

    return { productId, size: size === "" ? null : Number(size), quantity: Number(quantity) };
  });
}

export function itemLabel(product: WearableProduct, size: number | null) {
  return size === null ? product.title : `${product.title} / size ${size}`;
}

function priceLine(selection: OrderSelection) {
  const product = getWearableProduct(selection.productId);

  if (!product) {
    return null;
  }

  const { quantity, size } = selection;

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
    return null;
  }

  if (product.ringSizes) {
    if (size === null || !product.ringSizes.includes(size)) {
      return null;
    }
  } else if (size !== null) {
    return null;
  }

  return { product, size, quantity, lineTotal: product.price * quantity };
}

// Validates every line against the catalogue and returns the priced order,
// or null when anything is off. The server uses this as the source of truth.
export function priceOrder(selections: OrderSelection[]) {
  if (selections.length === 0 || selections.length > MAX_CART_LINES) {
    return null;
  }

  const lines = selections.map(priceLine);

  if (lines.some((line) => line === null)) {
    return null;
  }

  const items = lines as NonNullable<ReturnType<typeof priceLine>>[];
  const subtotal = items.reduce((sum, line) => sum + line.lineTotal, 0);
  const total = subtotal + SHIPPING_FEE;
  const first = items[0];
  const firstLabel = `${itemLabel(first.product, first.size)}${first.quantity > 1 ? ` x${first.quantity}` : ""}`;
  // Toss shows this on the payment screen, e.g. "WEARABLE LINE: RING 01 / size 13 외 1건".
  const orderName = (items.length > 1 ? `${firstLabel} 외 ${items.length - 1}건` : firstLabel).slice(0, 100);

  return { items, subtotal, shipping: SHIPPING_FEE, total, orderName };
}

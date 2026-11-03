// Wearable Line products that can be bought online.
// This file is imported by client components, so keep it free of Node APIs.
// Prices are in KRW.

// Buying switch. Wearable Line pages are always public; buttons, cart, checkout and
// the payment API only work when NEXT_PUBLIC_SHOP_ENABLED=true (after Toss approval).
export const PURCHASE_ENABLED = process.env.NEXT_PUBLIC_SHOP_ENABLED === "true";

export type WearableProduct = {
  id: string;
  title: string;
  material: string;
  description: string;
  // KRW. null until the price is decided; the piece is then shown but not purchasable.
  price: number | null;
  images: string[];
  // Fit shown on the product page, in Korean ring sizes (호).
  sizeLabel: string;
  // Ring sizes (Korean 호) the buyer must choose from. Omit for one-size pieces.
  ringSizes?: number[];
  // Made-to-order pieces: approximate weeks from payment to shipping.
  madeToOrderWeeks?: number;
  // Buyer can keep the original design or have one custom word cut into the piece.
  customWord?: { maxLength: number };
};

export const SHIPPING_FEE = 3000;
export const MAX_QUANTITY = 5;

// Sizes from "selected for BENDHAUS" (US) converted to Korean sizes:
// US 3 = 4호, US 4 = 7호, US 5 = 9호, US 6 = 11–12호.
// Korean ring sizes offered for pieces made to the buyer's size.
const RING_SIZE_OPTIONS = Array.from({ length: 16 }, (_, index) => index + 5); // 5–20호

export const wearableProducts: WearableProduct[] = [
  {
    id: "flock-necklace",
    title: "FLOCK NECKLACE",
    material: "Brass",
    description: "",
    price: 79_000,
    images: ["/images/ukha/flock-necklace-02.jpg", "/images/ukha/flock-necklace-01.jpg"],
    sizeLabel: "One size",
    madeToOrderWeeks: 2,
  },
  {
    id: "totem-ring",
    title: "TOTEM RING",
    material: "Brass",
    description: "",
    price: 130_000,
    images: [
      "/images/ukha/totem-01.jpg",
      "/images/ukha/totem-02.jpg",
      "/images/ukha/totem-03.jpg",
      "/images/ukha/totem-04.jpg",
    ],
    sizeLabel: "One size",
    madeToOrderWeeks: 2,
    customWord: { maxLength: 10 },
  },
  {
    id: "joint-ring",
    title: "JOINT RING",
    material: "Brass",
    description: "",
    price: 59_000,
    images: ["/images/ukha/joint-ring-01.jpg", "/images/ukha/joint-ring-02.jpg"],
    sizeLabel: "Choose your ring size (KR)",
    ringSizes: RING_SIZE_OPTIONS,
    madeToOrderWeeks: 2,
  },
  {
    id: "wing-ring",
    title: "WING RING",
    material: "Brass",
    description: "",
    price: 110_000,
    images: [
      "/images/ukha/wing-ring-01.jpg",
      "/images/ukha/wing-ring-02.jpg",
      "/images/ukha/wing-ring-03.jpg",
      "/images/ukha/wing-ring-04.jpg",
    ],
    sizeLabel: "Choose your ring size (KR)",
    ringSizes: RING_SIZE_OPTIONS,
    madeToOrderWeeks: 2,
  },
  {
    id: "liminal-01",
    title: "LIMINAL: 01",
    material: "Brass",
    description: "",
    price: 650_000,
    images: [
      "/images/ukha/liminal-01-01.jpg",
      "/images/ukha/liminal-01-02.jpg",
      "/images/ukha/liminal-01-03.jpg",
      "/images/ukha/liminal-01-04.jpg",
      "/images/ukha/liminal-01-05.jpg",
      "/images/ukha/liminal-01-06.jpg",
      "/images/ukha/liminal-01-07.jpg",
    ],
    sizeLabel: "Open ring (adjustable)",
    ringSizes: RING_SIZE_OPTIONS,
    madeToOrderWeeks: 2,
  },
  {
    id: "liminal-03",
    title: "LIMINAL: 03",
    material: "Brass",
    description: "",
    price: 540_000,
    images: [
      "/images/ukha/liminal-03-01.jpg",
      "/images/ukha/liminal-03-02.jpg",
      "/images/ukha/liminal-03-03.jpg",
      "/images/ukha/liminal-03-04.jpg",
      "/images/ukha/liminal-03-05.jpg",
      "/images/ukha/liminal-03-06.jpg",
    ],
    sizeLabel: "One size · middle joint 4–7호",
    madeToOrderWeeks: 2,
  },
  {
    id: "liminal-05",
    title: "LIMINAL: 05",
    material: "Brass",
    description: "",
    price: 540_000,
    images: [
      "/images/ukha/liminal-05-01.jpg",
      "/images/ukha/liminal-05-02.jpg",
      "/images/ukha/liminal-05-03.jpg",
      "/images/ukha/liminal-05-04.jpg",
      "/images/ukha/liminal-05-05.jpg",
      "/images/ukha/liminal-05-06.jpg",
    ],
    sizeLabel: "Open ring (adjustable)",
    ringSizes: RING_SIZE_OPTIONS,
    madeToOrderWeeks: 2,
  },
  {
    id: "panopticon-05",
    title: "PANOPTICON: 05",
    material: "Brass",
    description: "Is isolation ever complete?",
    price: 540_000,
    images: [
      "/images/ukha/panopticon-05-01.jpg",
      "/images/ukha/panopticon-05-02.jpg",
      "/images/ukha/panopticon-05-03.jpg",
      "/images/ukha/panopticon-05-04.jpg",
      "/images/ukha/panopticon-05-05.jpg",
      "/images/ukha/panopticon-05-06.jpg",
      "/images/ukha/panopticon-05-07.jpg",
    ],
    sizeLabel: "9–12호",
    madeToOrderWeeks: 2,
  },
  {
    id: "panopticon-07",
    title: "PANOPTICON: 07",
    material: "Brass",
    description: "Can resistance be contained?",
    price: 540_000,
    images: [
      "/images/ukha/panopticon-07-01.jpg",
      "/images/ukha/panopticon-07-02.jpg",
      "/images/ukha/panopticon-07-03.jpg",
      "/images/ukha/panopticon-07-04.jpg",
      "/images/ukha/panopticon-07-05.jpg",
      "/images/ukha/panopticon-07-06.jpg",
      "/images/ukha/panopticon-07-07.jpg",
    ],
    sizeLabel: "One size · middle joint 7–9호",
    madeToOrderWeeks: 2,
  },
  {
    id: "panopticon-08",
    title: "PANOPTICON: 08",
    material: "Brass",
    description: "When does repetition become instinct?",
    price: 220_000,
    images: [
      "/images/ukha/panopticon-08-01.jpg",
      "/images/ukha/panopticon-08-02.jpg",
      "/images/ukha/panopticon-08-03.jpg",
      "/images/ukha/panopticon-08-04.jpg",
      "/images/ukha/panopticon-08-05.jpg",
    ],
    sizeLabel: "Open ring (adjustable)",
    ringSizes: RING_SIZE_OPTIONS,
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

export function formatPrice(price: number | null) {
  return price === null ? "Coming soon" : formatKRW(price);
}

export type OrderSelection = {
  productId: string;
  size: number | null;
  quantity: number;
  // Custom word for pieces with `customWord`; null (or missing) means the original design.
  word?: string | null;
};

// One word only: letters (any language) and numbers, no spaces or symbols.
const WORD_PATTERN = /^[\p{L}\p{N}]+$/u;

// Returns an error message for an invalid custom word, or null when it is fine.
export function customWordError(word: string, maxLength: number) {
  if (!word) {
    return "Please enter a word.";
  }

  if (!WORD_PATTERN.test(word)) {
    return "One word only: letters or numbers, no spaces or symbols.";
  }

  if ([...word].length > maxLength) {
    return `Up to ${maxLength} characters.`;
  }

  return null;
}

export const MAX_CART_LINES = 10;

// Order lines travel between pages as "productId:size:quantity:word" joined by commas,
// e.g. "liminal-01:13:1:,totem-ring::1:LOVE". Words never contain ":" or ",".
export function encodeOrderItems(items: OrderSelection[]) {
  return items
    .map((item) => `${item.productId}:${item.size ?? ""}:${item.quantity}:${item.word ?? ""}`)
    .join(",");
}

export function decodeOrderItems(value: string | undefined | null): OrderSelection[] {
  if (!value) {
    return [];
  }

  return value.split(",").map((part) => {
    const [productId = "", size = "", quantity = "", word = ""] = part.split(":");

    return {
      productId,
      size: size === "" ? null : Number(size),
      quantity: Number(quantity),
      word: word === "" ? null : word,
    };
  });
}

export function itemLabel(product: WearableProduct, size: number | null, word?: string | null) {
  const parts = [product.title];

  if (size !== null) {
    parts.push(`size ${size}`);
  }

  if (product.customWord) {
    parts.push(word ? `word "${word}"` : "original design");
  }

  return parts.join(" / ");
}

function priceLine(selection: OrderSelection) {
  const product = getWearableProduct(selection.productId);

  if (!product || product.price === null) {
    return null;
  }

  const { quantity, size } = selection;
  const word = selection.word ?? null;

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
    return null;
  }

  if (product.customWord) {
    if (word !== null && customWordError(word, product.customWord.maxLength)) {
      return null;
    }
  } else if (word !== null) {
    return null;
  }

  if (product.ringSizes) {
    if (size === null || !product.ringSizes.includes(size)) {
      return null;
    }
  } else if (size !== null) {
    return null;
  }

  return { product, size, quantity, word, lineTotal: product.price * quantity };
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
  const firstLabel = `${itemLabel(first.product, first.size, first.word)}${first.quantity > 1 ? ` x${first.quantity}` : ""}`;
  // Toss shows this on the payment screen, e.g. "WEARABLE LINE: RING 01 / size 13 외 1건".
  const orderName = (items.length > 1 ? `${firstLabel} 외 ${items.length - 1}건` : firstLabel).slice(0, 100);

  return { items, subtotal, shipping: SHIPPING_FEE, total, orderName };
}

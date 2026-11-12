import { businessInfo } from "@/data/wearable";

// The exchange and refund policy (refundPolicy in data/wearable.ts) is hidden for now;
// show it here again before purchases open.
export function ShopFooter() {
  return (
    <footer className="ukha-note mx-auto mt-24 max-w-6xl border-t border-[var(--line)] pt-6 leading-6 text-[var(--muted)]">
      <p>
        {businessInfo.companyName} · Representative {businessInfo.representative} · Business
        registration {businessInfo.registrationNumber} · Mail-order registration{" "}
        {businessInfo.mailOrderNumber}
      </p>
      <p>
        {businessInfo.address} · {businessInfo.email} · {businessInfo.phone}
      </p>
    </footer>
  );
}

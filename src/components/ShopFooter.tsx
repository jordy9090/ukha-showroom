import { businessInfo, refundPolicy } from "@/data/wearable";

export function ShopFooter() {
  return (
    <footer className="ukha-note mx-auto mt-24 max-w-6xl border-t border-[var(--line)] pt-6 leading-6 text-[var(--muted)]">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        {refundPolicy.map((section) => (
          <section key={section.title}>
            <h2 className="mb-2 text-[var(--foreground)]!">{section.title}</h2>
            <ol className="list-decimal space-y-1 pl-4">
              {section.items.map((item) => (
                <li key={item} className="break-keep">
                  {item}
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <div className="mt-10">
        <p>
          {businessInfo.companyName} · Representative {businessInfo.representative} · Business
          registration {businessInfo.registrationNumber} · Mail-order registration{" "}
          {businessInfo.mailOrderNumber}
        </p>
        <p>
          {businessInfo.address} · {businessInfo.email} · {businessInfo.phone}
        </p>
      </div>
    </footer>
  );
}

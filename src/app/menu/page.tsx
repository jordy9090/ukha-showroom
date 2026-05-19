import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";

const menuItems = [
  { href: "/collection", label: "collection" },
  { href: "/offline-shop", label: "offline shop" },
  { href: "/archive-note", label: "archive note" },
];

export default function MenuPage() {
  return (
    <main className="ukha-page flex min-h-screen items-center justify-center px-6">
      <FadeIn>
        <nav
          aria-label="UKHA showroom menu"
          className="flex flex-col items-center gap-7 text-center font-serif text-3xl lowercase tracking-[0.08em] text-[var(--foreground)] sm:text-5xl"
        >
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition duration-500 hover:text-[var(--muted)]"
            >
              {/* Replace menu text with handwritten image assets here if desired. */}
              {item.label}
            </Link>
          ))}
        </nav>
      </FadeIn>
    </main>
  );
}

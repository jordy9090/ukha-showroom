import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";

const menuItems = [
  { href: "/collection", label: "collection" },
  { href: "/archive-note", label: "archive" },
  { href: "/offline-shop", label: "visit" },
];

export default function MenuPage() {
  return (
    <main className="ukha-page relative min-h-screen overflow-hidden px-5 text-[var(--foreground)] sm:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-6vh] left-1/2 h-[44vh] w-[min(86vw,820px)] -translate-x-1/2 opacity-[0.16] mix-blend-multiply"
      >
        <Image
          src="/images/ukha/liminal-cover.png"
          alt=""
          fill
          sizes="(max-width: 953px) 86vw, 820px"
          className="object-contain object-bottom"
        />
      </div>

      <Link
        href="/"
        aria-label="UKHA home"
        className="absolute left-1/2 top-12 z-20 -translate-x-1/2"
      >
        <Image
          src="/images/ukha/logo-signature-black.png"
          alt="UKHA"
          width={2156}
          height={475}
          sizes="(max-width: 639px) 8rem, 10rem"
          className="h-auto w-32 sm:w-40"
        />
      </Link>

      <FadeIn className="relative z-10 grid min-h-screen grid-rows-[1fr_auto]">
        <nav
          aria-label="UKHA showroom menu"
          className="flex items-center justify-center pb-14 pt-28"
        >
          <div className="grid w-full max-w-3xl gap-8 sm:grid-cols-3 sm:gap-10">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group border-t border-[rgba(32,31,27,0.18)] pt-5 text-center transition duration-500 hover:border-[rgba(32,31,27,0.52)]"
              >
                <span className="ukha-caption transition duration-500 group-hover:text-[var(--foreground)]">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="ukha-caption mx-auto mb-20 flex w-full max-w-[560px] justify-between sm:mb-10">
          <span>ukha</span>
          <span>showroom</span>
        </div>
      </FadeIn>
    </main>
  );
}

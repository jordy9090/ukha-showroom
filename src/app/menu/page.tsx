import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { HandwrittenNav } from "@/components/HandwrittenNav";

export default function MenuPage() {
  return (
    <main className="ukha-page relative min-h-screen overflow-x-hidden px-5 text-[var(--foreground)] sm:px-8">
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

      <FadeIn className="relative z-10 flex min-h-screen items-center justify-center pb-20 pt-32">
        <HandwrittenNav className="translate-y-4" />
      </FadeIn>
    </main>
  );
}

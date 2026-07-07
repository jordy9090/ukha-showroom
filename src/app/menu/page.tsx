import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { HandwrittenNav } from "@/components/HandwrittenNav";

export default function MenuPage() {
  return (
    <main className="ukha-page relative min-h-screen overflow-x-hidden px-5 text-[var(--foreground)] sm:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-2vh] left-1/2 h-[44vh] w-[min(86vw,820px)] -translate-x-1/2 opacity-[0.13] mix-blend-multiply"
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

      <FadeIn className="relative z-10 flex min-h-screen items-center justify-center pb-20 pt-32">
        <HandwrittenNav className="translate-y-4" />
      </FadeIn>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

export function ShowroomHeader() {
  return (
    <header className="ukha-caption fixed left-0 top-0 z-20 flex w-full items-center justify-between px-5 py-5 sm:px-8">
      <Link
        href="/"
        aria-label="UKHA home"
        className="block"
      >
        <Image
          src="/images/ukha/logo-signature-black.png"
          alt="UKHA"
          width={2156}
          height={475}
          preload
          sizes="(max-width: 639px) 7rem, 9rem"
          className="h-auto w-28 sm:w-36"
        />
      </Link>
      <Link href="/menu">
        menu
      </Link>
    </header>
  );
}

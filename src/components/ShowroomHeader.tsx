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
      <Link
        href="/menu"
        aria-label="menu"
        className="group block outline-none"
      >
        <Image
          src="/images/ukha/nav-menu.png"
          alt=""
          width={1464}
          height={180}
          sizes="(max-width: 639px) 5rem, 6rem"
          className="h-auto w-20 opacity-[0.78] mix-blend-multiply transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:w-24"
        />
      </Link>
    </header>
  );
}

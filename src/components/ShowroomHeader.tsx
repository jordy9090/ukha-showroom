import Image from "next/image";
import Link from "next/link";

// "blend" inverts against whatever is behind; "white" keeps the logo and menu plain white
// (for dark pages such as the archive).
export function ShowroomHeader({ tone = "blend" }: { tone?: "blend" | "white" }) {
  return (
    <header
      className={`ukha-caption fixed left-0 top-0 z-20 flex w-full items-center justify-between px-5 py-5 sm:px-8 ${tone === "blend" ? "mix-blend-difference" : ""}`}
    >
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
          className="h-auto w-28 brightness-0 invert sm:w-36"
        />
      </Link>
      <Link
        href="/#home-menu"
        aria-label="menu"
        className="group -my-[18px] flex py-[18px] outline-none"
      >
        <Image
          src="/images/ukha/nav-menu.png"
          alt=""
          width={1464}
          height={180}
          sizes="(max-width: 639px) 5rem, 6rem"
          className="h-auto w-20 brightness-0 invert opacity-[0.9] transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:w-24"
        />
      </Link>
    </header>
  );
}

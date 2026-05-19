import Link from "next/link";

export function ShowroomHeader() {
  return (
    <header className="fixed left-0 top-0 z-20 flex w-full items-center justify-between px-5 py-5 text-[11px] uppercase tracking-[0.28em] text-[var(--muted)] sm:px-8">
      <Link href="/" className="transition hover:text-[var(--foreground)]">
        UKHA
      </Link>
      <Link href="/menu" className="transition hover:text-[var(--foreground)]">
        menu
      </Link>
    </header>
  );
}

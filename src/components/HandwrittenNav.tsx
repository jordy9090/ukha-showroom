import Image from "next/image";
import Link from "next/link";

type HandwrittenNavProps = {
  className?: string;
  includeMenu?: boolean;
};

const navItems = [
  {
    href: "/collection",
    label: "collection",
    src: "/images/ukha/nav-collection.png",
    width: 1492,
    height: 179,
    className: "w-[min(48vw,360px)]",
  },
  {
    href: "/archive-note",
    label: "archive",
    src: "/images/ukha/nav-archive.png",
    width: 1470,
    height: 201,
    className: "w-[min(40vw,300px)]",
  },
  {
    href: "/offline-shop",
    label: "visit",
    src: "/images/ukha/nav-visit.png",
    width: 1347,
    height: 285,
    className: "w-[min(32vw,240px)]",
  },
  {
    href: "/menu",
    label: "menu",
    src: "/images/ukha/nav-menu.png",
    width: 1464,
    height: 180,
    className: "w-[min(36vw,260px)]",
    isMenu: true,
  },
];

export function HandwrittenNav({
  className = "",
  includeMenu = false,
}: HandwrittenNavProps) {
  const visibleItems = includeMenu
    ? navItems
    : navItems.filter((item) => !item.isMenu);

  return (
    <nav
      aria-label="UKHA showroom navigation"
      className={`flex flex-col items-center gap-5 sm:gap-6 ${className}`}
    >
      {visibleItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-label={item.label}
          className="group block max-w-[92vw] outline-none transition duration-500 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
        >
          <Image
            src={item.src}
            alt=""
            width={item.width}
            height={item.height}
            sizes="(max-width: 640px) 48vw, 360px"
            className={`${item.className} h-auto object-contain opacity-[0.78] mix-blend-multiply transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100`}
          />
        </Link>
      ))}
    </nav>
  );
}

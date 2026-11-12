"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type HandwrittenNavProps = {
  className?: string;
  includeMenu?: boolean;
  adaptiveContrast?: boolean;
  expandCollections?: boolean;
};

// One shared opacity so every handwritten menu word reads at the same brightness.
const NAV_OPACITY = "opacity-[0.88]";

const navItems = [
  {
    // Wider than the others: its thin, long handwriting needs this width for its
    // lowercase letters to match "archive".
    href: "/wearable-line",
    label: "wearable line",
    src: "/images/ukha/collection-overlay-wearable-line.png",
    width: 2164,
    height: 339,
    className: "w-[min(58vw,430px)]",
  },
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
  // "visit" (/offline-shop) is hidden for now; the page itself still exists.
  {
    href: "/#home-menu",
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
  adaptiveContrast = false,
  expandCollections = false,
}: HandwrittenNavProps) {
  const router = useRouter();
  // Set once "collection" is clicked: the other words fade out before the collection page
  // opens, where the word itself glides to the left.
  const [leaving, setLeaving] = useState(false);
  const visibleItems = includeMenu
    ? navItems
    : navItems.filter((item) => !item.isMenu);

  useEffect(() => {
    if (expandCollections) router.prefetch("/collection");
  }, [expandCollections, router]);

  const imageClassName = (item: (typeof navItems)[number]) =>
    `${item.className} ${NAV_OPACITY} relative h-auto object-contain ${adaptiveContrast ? "brightness-0 invert mix-blend-difference" : "mix-blend-multiply"} transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100`;

  const menuTransition = {
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  return (
    <nav
      aria-label="UKHA showroom navigation"
      className={`flex flex-col items-center ${expandCollections ? "gap-9 sm:gap-11" : "gap-5 sm:gap-6"} ${className}`}
    >
      {visibleItems.map((item) => {
        const isCollection = expandCollections && item.href === "/collection";
        return (
          <motion.div
            key={item.href}
            initial={false}
            animate={
              leaving && !isCollection
                ? { opacity: 0, y: -8, filter: "blur(3px)" }
                : { opacity: 1, y: 0, filter: "blur(0px)" }
            }
            transition={menuTransition}
            // Wearable Line keeps its extra space above the rest on the home menu.
            className={expandCollections && item.href === "/wearable-line" ? "mb-3 sm:mb-5" : ""}
          >
            <Link
              href={item.href}
              aria-label={item.label}
              onClick={
                isCollection
                  ? (event) => {
                      event.preventDefault();
                      if (leaving) return;
                      setLeaving(true);
                      window.setTimeout(() => router.push("/collection"), 380);
                    }
                  : undefined
              }
              className="group relative block max-w-[92vw] outline-none transition duration-500 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
            >
              <Image
                src={item.src}
                alt=""
                width={item.width}
                height={item.height}
                sizes="(max-width: 640px) 48vw, 360px"
                className={imageClassName(item)}
              />
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
}

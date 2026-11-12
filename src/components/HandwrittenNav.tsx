"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

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
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const visibleItems = includeMenu
    ? navItems
    : navItems.filter((item) => !item.isMenu);
  const collectionIndex = visibleItems.findIndex(
    (item) => item.label === "collection",
  );
  const collectionItem = visibleItems[collectionIndex];
  // Items above "collection" hide while its submenu is open; the rest swap with it.
  const leadingItems = visibleItems.slice(0, collectionIndex);
  const secondaryItems = visibleItems.slice(collectionIndex + 1);

  const imageClassName = (item: (typeof navItems)[number]) =>
    `${item.className} ${NAV_OPACITY} relative h-auto object-contain ${adaptiveContrast ? "brightness-0 invert mix-blend-difference" : "mix-blend-multiply"} transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100`;

  const menuTransition = {
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  return (
    <motion.nav
      layout
      transition={{ layout: menuTransition }}
      aria-label="UKHA showroom navigation"
      className={`flex flex-col items-center ${expandCollections ? "gap-9 sm:gap-11" : "gap-5 sm:gap-6"} ${className}`}
    >
      {/* Items above "collection" (Wearable Line) step aside while its submenu is open. */}
      <AnimatePresence initial={false}>
        {expandCollections && !collectionsOpen
          ? leadingItems.map((item) => (
              <motion.div
                layout
                key={item.href}
                initial={{ opacity: 0, y: -10, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(3px)" }}
                transition={menuTransition}
                className="mb-3 sm:mb-5"
              >
                <Link
                  href={item.href}
                  aria-label={item.label}
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
            ))
          : null}
      </AnimatePresence>

      {expandCollections ? (
        <motion.button
          layout
          type="button"
          aria-label="Show collections"
          aria-expanded={collectionsOpen}
          onClick={() => setCollectionsOpen((open) => !open)}
          className="group relative block max-w-[92vw] cursor-pointer outline-none transition duration-500 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
        >
          <Image
            src={collectionItem.src}
            alt=""
            width={collectionItem.width}
            height={collectionItem.height}
            sizes="(max-width: 640px) 48vw, 360px"
            className={imageClassName(collectionItem)}
          />
        </motion.button>
      ) : null}

      <AnimatePresence mode="popLayout" initial={false}>
        {expandCollections && collectionsOpen ? (
          <motion.div
            layout
            key="collection-links"
            initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(3px)" }}
            transition={menuTransition}
            className="flex flex-col items-center gap-4 sm:gap-5"
          >
            {[
              {
                href: "/collection/collection-02",
                label: "PANOPTICON",
                src: "/images/ukha/collection-overlay-panopticon.png",
                width: 1125,
                height: 300,
                className: "w-[min(62vw,390px)]",
              },
              {
                href: "/collection/liminal",
                label: "LIMINAL",
                src: "/images/ukha/collection-overlay-liminal.png",
                width: 890,
                height: 180,
                className: "w-[min(54vw,340px)]",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className="group block max-w-[92vw] outline-none transition duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
              >
                <Image
                  src={item.src}
                  alt=""
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 640px) 62vw, 390px"
                  className={`${item.className} h-auto object-contain ${NAV_OPACITY} transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 ${adaptiveContrast ? "brightness-0 invert mix-blend-difference" : "mix-blend-multiply"}`}
                />
              </Link>
            ))}
          </motion.div>
        ) : (
          <motion.div
            layout
            key="main-links"
            initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(3px)" }}
            transition={menuTransition}
            className="flex flex-col items-center gap-5 sm:gap-6"
          >
            {(expandCollections ? secondaryItems : visibleItems).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
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
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

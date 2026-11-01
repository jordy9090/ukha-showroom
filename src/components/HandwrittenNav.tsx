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

const navItems = [
  {
    href: "/collection",
    label: "collection",
    src: "/images/ukha/nav-collection.png",
    width: 1492,
    height: 179,
    className: "w-[min(48vw,360px)]",
    opacityClass: "opacity-100",
  },
  {
    href: "/archive-note",
    label: "archive",
    src: "/images/ukha/nav-archive.png",
    width: 1470,
    height: 201,
    className: "w-[min(40vw,300px)]",
    opacityClass: "opacity-[0.7]",
  },
  {
    href: "/offline-shop",
    label: "visit",
    src: "/images/ukha/nav-visit.png",
    width: 1347,
    height: 285,
    className: "w-[min(32vw,240px)]",
    opacityClass: "opacity-[0.7]",
  },
  {
    href: "/#home-menu",
    label: "menu",
    src: "/images/ukha/nav-menu.png",
    width: 1464,
    height: 180,
    className: "w-[min(36vw,260px)]",
    opacityClass: "opacity-[0.88]",
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
  const collectionItem = visibleItems[0];
  const secondaryItems = visibleItems.slice(1);

  const imageClassName = (item: (typeof navItems)[number]) =>
    `${item.className} ${item.opacityClass} relative h-auto object-contain ${adaptiveContrast ? "brightness-0 invert mix-blend-difference" : "mix-blend-multiply"} transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100`;

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
            <Link
              href="/wearable-line"
              aria-label="WEARABLE LINE"
              className="group mb-3.5 block max-w-[92vw] outline-none transition duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
            >
              <Image
                src="/images/ukha/collection-overlay-wearable-line.png"
                alt=""
                width={2164}
                height={339}
                sizes="(max-width: 640px) 62vw, 390px"
                className={`h-auto w-[min(62vw,390px)] object-contain opacity-75 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 ${adaptiveContrast ? "brightness-0 invert mix-blend-difference" : "mix-blend-multiply"}`}
              />
            </Link>
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
                  className={`${item.className} h-auto object-contain opacity-75 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 ${adaptiveContrast ? "brightness-0 invert mix-blend-difference" : "mix-blend-multiply"}`}
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

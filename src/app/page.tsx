"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const entranceLinks = [
  { href: "/collection", label: "collection" },
  { href: "/archive-note", label: "archive" },
  { href: "/offline-shop", label: "visit" },
];

export default function Home() {
  return (
    <main className="ukha-page relative min-h-screen overflow-hidden px-5 text-[var(--foreground)] sm:px-8">
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 0.18, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        className="pointer-events-none absolute bottom-[-5vh] left-1/2 h-[38vh] w-[min(82vw,760px)] -translate-x-1/2 mix-blend-multiply"
      >
        <Image
          src="/images/ukha/liminal-cover.png"
          alt=""
          fill
          sizes="(max-width: 927px) 82vw, 760px"
          className="object-contain object-bottom"
        />
      </motion.div>

      <section className="relative z-10 grid min-h-screen grid-rows-[1fr_auto]">
        <div className="flex items-center justify-center pb-10 pt-14">
          <Link
            href="/menu"
            aria-label="Open UKHA menu"
            className="group block text-center outline-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 0.992 }}
              whileTap={{ scale: 0.982 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center"
            >
              <Image
                src="/images/ukha/logo-signature-black.png"
                alt="UKHA"
                width={2156}
                height={475}
                preload
                sizes="(max-width: 897px) 80vw, 720px"
                className="h-auto w-[min(80vw,720px)]"
              />
            </motion.div>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="ukha-caption relative z-20 mx-auto mb-20 flex w-full max-w-[560px] items-end justify-between gap-5 sm:mb-10"
        >
          {entranceLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition duration-500 hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </motion.div>
      </section>
    </main>
  );
}

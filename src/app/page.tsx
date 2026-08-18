"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HandwrittenNav } from "@/components/HandwrittenNav";

export default function Home() {
  return (
    <main className="ukha-page ukha-home-background relative min-h-screen overflow-x-hidden px-5 text-[var(--foreground)] sm:px-8">
      <Link
        href="#home-menu"
        aria-label="Scroll to UKHA menu"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("home-menu")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
        className="group relative z-10 flex min-h-screen cursor-pointer flex-col items-center justify-center py-20 outline-none"
      >
        <div className="flex -translate-y-[2vh] flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: [1, 1.024, 1] }}
            whileHover={{ scale: 1.06, y: -4 }}
            whileTap={{ scale: 0.97 }}
            transition={{
              opacity: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 3, ease: "easeInOut", repeat: Infinity },
            }}
            className="flex items-center"
          >
            <Image
              src="/images/ukha/logo-signature-black.png"
              alt="UKHA"
              width={2156}
              height={475}
              preload
              sizes="(max-width: 927px) 82vw, 760px"
              className="h-auto w-[min(82vw,760px)]"
            />
          </motion.div>
        </div>
      </Link>

      <section id="home-menu" className="relative flex min-h-screen scroll-mt-0 flex-col items-center justify-center py-24">
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <HandwrittenNav adaptiveContrast expandCollections />
          </motion.div>
        </div>
      </section>
    </main>
  );
}

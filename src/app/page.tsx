"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HandwrittenNav } from "@/components/HandwrittenNav";

export default function Home() {
  return (
    <main className="ukha-page relative min-h-screen overflow-x-hidden px-5 text-[var(--foreground)] sm:px-8">
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 0.14, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        className="pointer-events-none absolute bottom-[3vh] left-1/2 h-[42vh] w-[min(84vw,780px)] -translate-x-1/2 mix-blend-multiply"
      >
        <Image
          src="/images/ukha/liminal-cover.png"
          alt=""
          fill
          sizes="(max-width: 929px) 84vw, 780px"
          className="object-contain object-bottom"
        />
      </motion.div>

      <section className="relative z-10 flex min-h-[112svh] flex-col items-center justify-center py-20">
        <div className="flex -translate-y-[4vh] flex-col items-center">
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
                sizes="(max-width: 927px) 82vw, 760px"
                className="h-auto w-[min(82vw,760px)]"
              />
            </motion.div>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.22,
            }}
            className="relative z-20 mt-12 sm:mt-14"
          >
            <HandwrittenNav />
          </motion.div>
        </div>
      </section>
    </main>
  );
}

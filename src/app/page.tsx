"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="ukha-page flex min-h-screen items-center justify-center px-6 text-[var(--foreground)]">
      <Link href="/menu" aria-label="Open UKHA menu">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ opacity: 0.72 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Replace this text mark with /public/images/ukha/logo.svg or .png when the final UKHA logo is ready. */}
          <div className="font-serif text-6xl tracking-[0.22em] sm:text-8xl">
            UKHA
          </div>
        </motion.div>
      </Link>
    </main>
  );
}

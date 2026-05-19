"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="ukha-page flex min-h-screen items-center justify-center px-6 text-[var(--foreground)]">
      <Link href="/menu" aria-label="Open UKHA menu">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <Image
            src="/images/ukha/logo-home.png"
            alt="UKHA"
            width={1720}
            height={1060}
            priority
            className="h-auto w-[min(76vw,520px)] mix-blend-multiply"
          />
        </motion.div>
      </Link>
    </main>
  );
}

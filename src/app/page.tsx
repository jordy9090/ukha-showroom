"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f6f1] text-neutral-900 flex items-center justify-center">
      <motion.button
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="font-serif text-6xl tracking-[0.28em]">
          UKHA
        </div>
        <div className="mt-4 text-[10px] tracking-[0.36em] text-neutral-500 uppercase">
          showroom
        </div>
      </motion.button>
    </main>
  );
}
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

// The handwritten "collection" word. It opens in the middle of the screen, where it sat in the
// home menu, then glides over to the top of the left column; both spots share a layoutId so
// framer-motion animates the move.
export function CollectionHeading() {
  const reduceMotion = useReducedMotion();
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setSettled(true), reduceMotion ? 0 : 450);
    return () => window.clearTimeout(id);
  }, [reduceMotion]);

  const word = (
    <Image
      src="/images/ukha/nav-collection.png"
      alt="collection"
      width={1492}
      height={179}
      sizes="360px"
      priority
      className="h-auto w-full brightness-0 invert"
    />
  );

  return settled ? (
    <motion.div
      layoutId="collection-heading"
      transition={{ duration: reduceMotion ? 0 : 0.9, ease }}
      className="mb-8 w-[min(34vw,150px)] sm:mb-12 sm:w-[min(16vw,200px)]"
    >
      {word}
    </motion.div>
  ) : (
    // Centred on the pinned screen (the nearest positioned ancestor), not on the window, so the
    // page's fade-in transform can't throw it off.
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
      <motion.div layoutId="collection-heading" className="w-[min(48vw,360px)]">
        {word}
      </motion.div>
    </div>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

const email = "ukhastudio@gmail.com";

type CopyEmailProps = {
  className?: string;
};

export function CopyEmail({ className }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  async function copyEmail() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    // Show "copied" for one second, then fade back to the address.
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1000);
  }

  return (
    <button
      type="button"
      onClick={copyEmail}
      className={`relative inline-grid ${className ?? ""}`}
      aria-label={`Copy ${email}`}
    >
      {/* The hidden address keeps the button the same size while "copied" shows. */}
      <span className="invisible col-start-1 row-start-1">{email}</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={copied ? "copied" : "email"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="col-start-1 row-start-1 self-center justify-self-center"
        >
          {copied ? "copied" : email}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

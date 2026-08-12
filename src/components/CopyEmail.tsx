"use client";

import { useState } from "react";

const email = "ukhastudio@gmail.com";

type CopyEmailProps = {
  className?: string;
};

export function CopyEmail({ className }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      type="button"
      onClick={copyEmail}
      className={className}
      aria-label={`Copy ${email}`}
    >
      {copied ? (
        <span className="text-[11px] sm:text-[12px]">copied</span>
      ) : (
        email
      )}
    </button>
  );
}

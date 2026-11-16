"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { businessInfo, INSTAGRAM_URL, type WearableProduct } from "@/data/wearable";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const inputClassName =
  "ukha-note w-full border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 text-[13px]! text-[var(--foreground)]! outline-none transition focus:border-[var(--foreground)]";

type Status = "idle" | "sending" | "sent" | "unavailable";

// Shown on a product page while online buying is off. The visitor leaves an Instagram ID or
// a phone number / email (either one), and the studio replies to arrange the purchase.
export function PurchaseInquiry({ product }: { product: WearableProduct }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "sending") {
      return;
    }

    const data = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;

    if (!data.instagram?.trim() && !data.contact?.trim()) {
      setError("인스타그램 아이디나 연락처 중 하나를 남겨주세요. / Please leave your Instagram or a contact.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, productId: product.id }),
      });

      if (response.ok) {
        setStatus("sent");
      } else if (response.status === 400) {
        setStatus("idle");
        setError("입력한 내용을 확인해 주세요. / Please check what you entered.");
      } else {
        setStatus("unavailable");
      }
    } catch {
      setStatus("unavailable");
    }
  };

  if (status === "sent") {
    return (
      <p className="ukha-note border border-[var(--line)] px-4 py-5 text-center leading-6">
        문의가 접수되었습니다. 곧 연락드릴게요.
        <br />
        Thank you — we will get back to you soon.
      </p>
    );
  }

  if (status === "unavailable") {
    return (
      <p className="ukha-note border border-[var(--line)] px-4 py-5 text-center leading-6">
        지금은 문의를 접수할 수 없어요. 인스타그램 DM이나 이메일로 연락 주세요.
        <br />
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="underline">
          Instagram
        </a>{" "}
        ·{" "}
        <a href={`mailto:${businessInfo.email}?subject=${encodeURIComponent(`구매 문의 — ${product.title}`)}`} className="underline">
          {businessInfo.email}
        </a>
      </p>
    );
  }

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="ukha-note w-full cursor-pointer border border-[var(--foreground)] py-4 tracking-[0.22em]! text-[var(--foreground)]! transition duration-300 hover:bg-[var(--paper)]"
      >
        구매 문의 · INQUIRE
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.form
            key="inquiry"
            onSubmit={submit}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-6">
              <p className="ukha-note leading-6">
                인스타그램 아이디나 연락처(전화 또는 이메일) 중 하나를 남겨주시면 답장 드릴게요.
                <br />
                Leave your Instagram or a phone number / email and we will reply.
              </p>
              <label className="block">
                <span className="ukha-note mb-1.5 block text-[var(--muted)]">Instagram</span>
                <input name="instagram" placeholder="@" autoComplete="off" maxLength={60} className={inputClassName} />
              </label>
              <label className="block">
                <span className="ukha-note mb-1.5 block text-[var(--muted)]">연락처 / Phone or email</span>
                <input name="contact" autoComplete="email" maxLength={100} className={inputClassName} />
              </label>
              <label className="block">
                <span className="ukha-note mb-1.5 block text-[var(--muted)]">
                  메시지 (선택) / Message (optional)
                </span>
                <textarea
                  name="message"
                  rows={3}
                  maxLength={1000}
                  placeholder="사이즈, 수량 등 / size, quantity…"
                  className={`${inputClassName} resize-none`}
                />
              </label>
              {/* Left empty by people; bots that fill every field are ignored. */}
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <p className="ukha-note text-[10px]! leading-5">
                남겨주신 정보는 이 문의에 답하는 데에만 사용합니다. / Used only to reply to this inquiry.
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="ukha-note w-full cursor-pointer border border-[var(--foreground)] bg-[var(--foreground)] py-4 tracking-[0.22em]! text-[var(--background)]! transition duration-300 hover:opacity-85 disabled:opacity-40"
              >
                {status === "sending" ? "SENDING…" : "SEND · 보내기"}
              </button>
              {error ? (
                <p role="alert" className="ukha-note text-[#9a3b2e]!">
                  {error}
                </p>
              ) : null}
            </div>
          </motion.form>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

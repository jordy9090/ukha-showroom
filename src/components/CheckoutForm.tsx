"use client";

import {
  ANONYMOUS,
  loadTossPayments,
  type TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";
import { useEffect, useRef, useState } from "react";
import type { OrderSelection } from "@/data/wearable";

type CheckoutFormProps = {
  clientKey: string;
  items: OrderSelection[];
  total: number;
};

const fields = [
  { name: "name", label: "Name", autoComplete: "name", required: true },
  { name: "phone", label: "Mobile phone", autoComplete: "tel", required: true, inputMode: "tel" },
  { name: "email", label: "Email", autoComplete: "email", required: true, type: "email" },
  { name: "postalCode", label: "Postal code", autoComplete: "postal-code", required: true },
  { name: "address", label: "Address", autoComplete: "address-line1", required: true },
  { name: "addressDetail", label: "Address detail", autoComplete: "address-line2", required: false },
  { name: "memo", label: "Delivery note", autoComplete: "off", required: false },
] as const;

export function CheckoutForm({ clientKey, items, total }: CheckoutFormProps) {
  const widgetsRef = useRef<TossPaymentsWidgets | null>(null);
  // Toss allows a single payment-method widget per page, so render it only once
  // even when React re-runs the effect (Strict Mode in development).
  const startedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (startedRef.current) {
      return;
    }

    startedRef.current = true;

    (async () => {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
        await widgets.setAmount({ currency: "KRW", value: total });
        await Promise.all([
          widgets.renderPaymentMethods({ selector: "#payment-method", variantKey: "DEFAULT" }),
          widgets.renderAgreement({ selector: "#agreement", variantKey: "AGREEMENT" }),
        ]);

        widgetsRef.current = widgets;
        setReady(true);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "The payment form could not be loaded.");
      }
    })();
  }, [clientKey, total]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const widgets = widgetsRef.current;

    if (!widgets || submitting) {
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const customer = Object.fromEntries(new FormData(event.currentTarget));
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customer }),
      });
      const order = await response.json();

      if (!response.ok) {
        throw new Error(order.error ?? "The order could not be created.");
      }

      if (order.amount !== total) {
        throw new Error("The price has changed. Please reload the page.");
      }

      await widgets.requestPayment({
        orderId: order.orderId,
        orderName: order.orderName,
        successUrl: `${window.location.origin}/api/checkout/confirm`,
        failUrl: `${window.location.origin}/checkout/fail`,
        customerName: order.customer.name,
        customerEmail: order.customer.email,
        customerMobilePhone: order.customer.phone,
      });
    } catch (caught) {
      const code = (caught as { code?: string }).code;

      // Closing the payment window is not an error worth showing.
      if (code !== "USER_CANCEL") {
        setError(caught instanceof Error ? caught.message : "The payment could not be started.");
      }

      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-10">
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="ukha-piece-title mb-6 text-[12px]">SHIPPING</legend>
        {fields.map((field) => (
          <label
            key={field.name}
            className={`block ${field.name === "address" || field.name === "addressDetail" || field.name === "memo" ? "sm:col-span-2" : ""}`}
          >
            <span className="ukha-note mb-1.5 block text-[var(--muted)]">
              {field.label}
              {field.required ? "" : " (optional)"}
            </span>
            <input
              name={field.name}
              type={"type" in field ? field.type : "text"}
              inputMode={"inputMode" in field ? field.inputMode : undefined}
              autoComplete={field.autoComplete}
              required={field.required}
              className="ukha-note w-full border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 text-[13px]! text-[var(--foreground)]! outline-none transition focus:border-[var(--foreground)]"
            />
          </label>
        ))}
      </fieldset>

      <section>
        <h2 className="ukha-piece-title mb-4 text-[12px]">PAYMENT</h2>
        <div id="payment-method" />
        <div id="agreement" />
      </section>

      <div>
        <button
          type="submit"
          disabled={!ready || submitting}
          className="ukha-note w-full border border-[var(--foreground)] bg-[var(--foreground)] py-4 tracking-[0.22em]! text-[var(--background)]! transition duration-300 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? "PROCESSING…" : `PAY · KRW ${total.toLocaleString("en-US")}`}
        </button>
        {error ? (
          <p role="alert" className="ukha-note mt-3 text-[#9a3b2e]!">
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}

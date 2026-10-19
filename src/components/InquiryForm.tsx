"use client";

import { FormEvent, useState } from "react";

const inquiryEmail = "ukhastudio@gmail.com";
const purposes = ["Editorial", "Commercial Shoot", "Music Video", "Personal", "Other"];

export function InquiryForm({ initialPiece }: { initialPiece: string }) {
  const [inquiryType, setInquiryType] = useState("Purchase");
  const [imageName, setImageName] = useState("");
  const [prepared, setPrepared] = useState(false);
  const fieldClass = "mt-3 w-full border-b border-[var(--line)] bg-transparent py-3 text-sm outline-none transition placeholder:text-[rgba(32,31,27,0.28)] focus:border-[var(--foreground)]";

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const rentalLines = inquiryType === "Rental" ? [
      `Rental Period: ${form.get("startDate") || "—"} — ${form.get("endDate") || "—"}`,
      `Purpose of Rental: ${form.get("rentalPurpose") || "—"}`,
    ] : [];
    const body = [
      "New Inquiry — UKHA STUDIO", "",
      `Full Name: ${form.get("fullName")}`,
      `Email: ${form.get("email")}`,
      `Shipping Location: ${form.get("shippingLocation")}`,
      `Inquiry Type: ${inquiryType}`,
      ...rentalLines,
      `Piece Name: ${form.get("pieceName")}`,
      `Reference Image: ${imageName || "None"}`, "",
      "Additional Questions or Requests:",
      String(form.get("message") || "None"),
    ].join("\n");

    window.location.href = `mailto:${inquiryEmail}?subject=${encodeURIComponent("New Inquiry — UKHA STUDIO")}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }

  return (
    <form onSubmit={submitInquiry} className="mt-16 space-y-12 sm:mt-24">
      <Field number="01" label="Full Name" required>
        <input className={fieldClass} name="fullName" placeholder="Enter your full name" required />
      </Field>
      <Field number="02" label="Email Address" required>
        <input className={fieldClass} name="email" type="email" placeholder="Enter your email address" required />
      </Field>
      <Field number="03" label="Shipping Location" required>
        <input className={fieldClass} name="shippingLocation" placeholder="Country / City" required />
      </Field>
      <Field number="04" label="Type of Inquiry" required>
        <div className="mt-5 flex gap-8">
          {["Purchase", "Rental"].map((type) => (
            <label key={type} className="ukha-note flex cursor-pointer items-center gap-3">
              <input type="radio" name="inquiryType" value={type} checked={inquiryType === type} onChange={() => setInquiryType(type)} />
              {type} — {type === "Purchase" ? "구매" : "대여"}
            </label>
          ))}
        </div>
      </Field>

      {inquiryType === "Rental" ? (
        <section className="grid gap-10 border-y border-[var(--line)] py-10 sm:grid-cols-2">
          <Field label="Rental Period" required>
            <div className="grid grid-cols-2 gap-4">
              <input aria-label="Rental start date" className={fieldClass} name="startDate" type="date" required />
              <input aria-label="Rental end date" className={fieldClass} name="endDate" type="date" required />
            </div>
          </Field>
          <Field label="Purpose of Rental" required>
            <select className={fieldClass} name="rentalPurpose" defaultValue="" required>
              <option value="" disabled>Select a purpose</option>
              {purposes.map((purpose) => <option key={purpose}>{purpose}</option>)}
            </select>
          </Field>
        </section>
      ) : null}

      <Field number="05" label="Piece of Interest" required>
        <input className={fieldClass} name="pieceName" defaultValue={initialPiece} placeholder="Enter the name of the piece" required />
        <label className="ukha-note mt-6 inline-flex cursor-pointer border-b border-[var(--foreground)] pb-1">
          Upload reference image
          <input className="sr-only" type="file" accept="image/*" onChange={(event) => setImageName(event.target.files?.[0]?.name || "")} />
        </label>
        {imageName ? <p className="ukha-note mt-2">Selected: {imageName}</p> : null}
      </Field>
      <Field number="06" label="Additional Questions or Requests">
        <textarea className={`${fieldClass} min-h-36 resize-y`} name="message" placeholder="Please let us know if you have any questions or specific requests regarding the piece." />
      </Field>

      <label className="ukha-note flex cursor-pointer items-start gap-3 border-t border-[var(--line)] pt-8">
        <input className="mt-2" type="checkbox" required />
        <span>
          I agree that the information entered above may be collected and used to respond to this inquiry.<br />
          위 정보를 문의 답변을 위해 수집·이용하는 데 동의합니다. *
        </span>
      </label>

      <div className="pb-16">
        <button type="submit" className="border border-[var(--foreground)] px-7 py-4 text-[10px] uppercase tracking-[0.22em] transition hover:bg-[var(--foreground)] hover:text-[var(--background)] sm:text-[11px]">
          Submit Inquiry
        </button>
        <p className="ukha-note mt-4 max-w-xl text-[10px]">
          Your email application will open with the inquiry details. If you selected a reference image, please attach it before sending.
        </p>
        {prepared ? (
          <div className="mt-12 border-t border-[var(--line)] pt-8" role="status">
            <p className="ukha-caption">Your inquiry email is ready</p>
            <p className="ukha-note mt-4">Please review the message, attach your reference image if needed, and send it to UKHA STUDIO.</p>
          </div>
        ) : null}
      </div>
    </form>
  );
}

function Field({ number, label, required, children }: {
  number?: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-baseline gap-3">
        {number ? <span className="ukha-caption">{number}.</span> : null}
        <h2 className="text-xs uppercase tracking-[0.14em] sm:text-sm">{label} {required ? "*" : ""}</h2>
      </div>
      {children}
    </section>
  );
}

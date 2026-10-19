import { InquiryForm } from "@/components/InquiryForm";
import { ShowroomHeader } from "@/components/ShowroomHeader";

export default async function InquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ piece?: string }>;
}) {
  const { piece = "" } = await searchParams;

  return (
    <main className="ukha-page min-h-screen px-6 py-28 sm:px-10">
      <ShowroomHeader />
      <div className="mx-auto max-w-3xl">
        <header className="max-w-2xl">
          <p className="ukha-caption">PRIVATE REQUEST</p>
          <h1 className="mt-5 text-xl font-normal uppercase tracking-[0.18em] sm:text-3xl">
            Acquisition &amp; Rental Inquiry
          </h1>
          <div className="ukha-note mt-8 space-y-4">
            <p>Each piece by UKHA STUDIO is one of a kind and is never reproduced.</p>
            <p>
              To inquire about acquiring or renting a piece, please complete the
              form below. We will review your request and contact you via email
              with further details.
            </p>
            <p className="pt-2 text-[10px] leading-7 sm:text-[11px]">
              UKHA STUDIO의 모든 작품은 단 하나만 제작되며 복제되지 않습니다.<br />
              작품의 소장 또는 대여를 문의하시려면 아래 양식을 작성해 주세요.
            </p>
          </div>
        </header>
        <InquiryForm initialPiece={piece} />
      </div>
    </main>
  );
}

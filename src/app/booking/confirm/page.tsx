import { Suspense } from "react";
import { BookingConfirm } from "@/components/booking/BookingConfirm";

export default function Page() {
  return (
    <Suspense fallback={<BookingConfirmFallback />}>
      <BookingConfirm />
    </Suspense>
  );
}

function BookingConfirmFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <p className="text-sm text-zinc-500">Loading booking details…</p>
    </div>
  );
}

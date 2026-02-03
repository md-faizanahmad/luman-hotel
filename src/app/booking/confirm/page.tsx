"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { BookingPayload } from "@/types/booking";

export default function BookingConfirmPage() {
  const searchParams = useSearchParams();

  // Guard: searchParams can be null during hydration
  if (!searchParams) {
    return null;
  }

  const token = searchParams.get("token");

  // Guard: token missing or invalid
  if (!token) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-xl font-bold mb-2">Invalid Booking Link</h1>
        <p className="text-sm text-zinc-500">
          Booking details are missing or expired.
        </p>
      </div>
    );
  }

  // Decode booking payload
  let data: BookingPayload;

  try {
    data = JSON.parse(atob(token));
  } catch {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-xl font-bold mb-2">Invalid Booking Data</h1>
        <p className="text-sm text-zinc-500">Unable to read booking details.</p>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(`
Booking Request

Room: ${data.room.name}
Guests: ${data.guests}
Check-in: ${data.checkIn}
Check-out: ${data.checkOut}

Room Charges: ₹${data.roomTotal}
GST (12%): ₹${data.gstAmount}
Total: ₹${data.totalAmount}
`);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 mt-15 ">
      <h1 className="text-2xl font-bold">Booking Details</h1>

      {/* ROOM CARD */}
      <div className="flex gap-6 border rounded-xl p-4">
        <Image
          src={data.room.image}
          alt={data.room.name}
          width={160}
          height={120}
          className="rounded-lg object-cover"
        />

        <div>
          <h2 className="text-lg font-semibold">{data.room.name}</h2>
          <p className="text-sm text-zinc-500">
            {data.guests} Guests · {data.nights} Nights
          </p>

          <div className="mt-3 text-sm space-y-1">
            <p>Room Charges: ₹{data.roomTotal}</p>
            <p>GST (12%): ₹{data.gstAmount}</p>
            <p className="font-bold">Total: ₹{data.totalAmount}</p>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4">
        <a
          href={`https://wa.me/917563092029?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold"
        >
          WhatsApp Hotel
        </a>
      </div>
    </div>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { BookingPayload } from "@/types/booking";
import { CheckCircle, PhoneCall } from "lucide-react";

export default function BookingConfirmPage() {
  const searchParams = useSearchParams();
  if (!searchParams) return null;

  const token = searchParams.get("token");

  if (!token) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center">
        <h1 className="text-xl font-bold mb-2">Invalid Booking Link</h1>
        <p className="text-sm text-zinc-500">
          Booking details are missing or expired.
        </p>
      </div>
    );
  }

  let data: BookingPayload;
  try {
    data = JSON.parse(atob(token));
  } catch {
    return (
      <div className="max-w-xl mx-auto p-8 text-center">
        <h1 className="text-xl font-bold mb-2">Invalid Booking Data</h1>
        <p className="text-sm text-zinc-500">Unable to read booking details.</p>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(`
Hello,

I have submitted a room booking request.

Room: ${data.room.name}
Guests: ${data.guests}
Check-in: ${data.checkIn}
Check-out: ${data.checkOut}

Room Charges: ₹${data.roomTotal}
GST (12%): ₹${data.gstAmount}
Total Amount: ₹${data.totalAmount}

Please confirm availability.
`);

  return (
    <section className="pt-18">
      <div className="max-w-5xl mx-auto px-6 py-14 space-y-10 mt-18 bg-accent p-8">
        {/* HERO CONFIRMATION */}
        <section className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="text-green-600 w-14 h-14" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Booking Request Sent Successfully
          </h1>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Your booking details have been shared with the hotel.
            <br />
            The hotel team will contact you shortly to confirm availability.
          </p>
        </section>

        {/* BOOKING DETAILS CARD */}
        <section className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Your Booking Details</h2>

          <div className="flex flex-col md:flex-row gap-6">
            {/* ROOM IMAGE */}
            <Image
              src={data.room.image}
              alt={data.room.name}
              width={220}
              height={150}
              className="rounded-xl object-cover"
            />

            {/* DETAILS */}
            <div className="flex-1 space-y-3">
              <h3 className="text-xl font-semibold">{data.room.name}</h3>
              <p className="text-sm text-zinc-500">
                {data.guests} Guests · {data.nights} Night
                {data.nights > 1 ? "s" : ""}
              </p>

              <div className="pt-3 text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Room Charges</span>
                  <span>₹{data.roomTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (12%)</span>
                  <span>₹{data.gstAmount}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total Amount</span>
                  <span>₹{data.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEXT STEP MESSAGE */}
        <section className="bg-zinc-50 border rounded-2xl p-6 text-center space-y-3">
          <p className="text-sm text-zinc-600">
            📞 <strong>What happens next?</strong>
          </p>
          <p className="text-sm text-zinc-500 max-w-2xl mx-auto">
            This is a booking request, not a payment. The hotel will confirm
            room availability and final details via call or WhatsApp.
          </p>
        </section>

        {/* WHATSAPP ACTION */}
        <section className="flex justify-center">
          <a
            href={`https://wa.me/917563092029?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all"
          >
            <PhoneCall size={18} />
            Contact Hotel on WhatsApp
          </a>
        </section>
      </div>
    </section>
  );
}

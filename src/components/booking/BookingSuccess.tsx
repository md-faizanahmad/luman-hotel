"use client";

import Image from "next/image";
import { CheckCircle, PhoneCall, FileText } from "lucide-react";
import { BookingPayload } from "@/types/booking";

interface BookingSuccessProps {
  booking: BookingPayload;
  whatsappLink: string;
}

export function BookingSuccess({ booking, whatsappLink }: BookingSuccessProps) {
  return (
    <section className="pt-20 m-15">
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        {/* SUCCESS HEADER */}
        <div className="text-center space-y-4">
          <CheckCircle className="mx-auto text-green-600 w-16 h-16" />
          <h1 className="text-3xl font-bold tracking-tight">
            Booking Request Sent
          </h1>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Your booking request has been successfully shared with the hotel.
            <br />
            The hotel team will contact you shortly to confirm availability.
          </p>
        </div>

        {/* BOOKING SUMMARY CARD */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Booking Summary</h2>

          <div className="flex flex-col md:flex-row gap-6">
            {/* ROOM IMAGE */}
            <Image
              src={booking.room.image}
              alt={booking.room.name}
              width={220}
              height={150}
              className="rounded-xl object-cover"
            />

            {/* DETAILS */}
            <div className="flex-1 space-y-3">
              <h3 className="text-xl font-semibold">{booking.room.name}</h3>

              <p className="text-sm text-zinc-500">
                {booking.guests} Guests · {booking.nights} Night
                {booking.nights > 1 ? "s" : ""}
              </p>

              <div className="pt-3 text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Room Charges</span>
                  <span>₹{booking.roomTotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>GST (12%)</span>
                  <span>₹{booking.gstAmount}</span>
                </div>

                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total Amount</span>
                  <span>₹{booking.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NEXT STEPS */}
        <div className="bg-zinc-50 border rounded-2xl p-6 text-center space-y-3">
          <p className="text-sm text-zinc-600">
            📞 <strong>What happens next?</strong>
          </p>
          <p className="text-sm text-zinc-500 max-w-2xl mx-auto">
            This is a booking request, not a payment.
            <br />
            The hotel will confirm room availability and final details via call
            or WhatsApp.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all"
          >
            <PhoneCall size={18} />
            Contact Hotel on WhatsApp
          </a>

          {/* FUTURE ACTION: INVOICE / PAYMENT */}
          <button
            disabled
            className="flex items-center justify-center gap-3 px-8 py-4 bg-zinc-200 text-zinc-500 rounded-xl font-bold cursor-not-allowed"
          >
            <FileText size={18} />
            Download Invoice (Coming Soon)
          </button>
        </div>
      </div>
    </section>
  );
}

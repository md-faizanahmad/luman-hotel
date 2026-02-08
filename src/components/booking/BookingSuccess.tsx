"use client";

import Image from "next/image";
import { CheckCircle2, MessageSquare, Clock, ArrowRight } from "lucide-react";
import { BookingPayload } from "@/types/booking";

interface BookingSuccessProps {
  booking: BookingPayload;
  whatsappLink: string;
}

export function BookingSuccess({ booking, whatsappLink }: BookingSuccessProps) {
  return (
    <section className="min-h-screen  pb-12 pt-12">
      {/* SUCCESS CONFETTI/BANNER AREA */}
      <div className=" border-b border-zinc-100 pt-16 pb-10 text-center px-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
          <CheckCircle2 className="text-green-600 w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
          Request Received!
        </h1>
        <p className="text-sm text-zinc-500 mt-2 max-w-xs mx-auto">
          We&apos;ve sent your details to the hotel. They usually respond within
          15 minutes.
        </p>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-6">
        {/* THE "TICKET" CARD */}
        <div className=" rounded-2xl shadow-xl shadow-zinc-200/50 overflow-hidden border border-zinc-100">
          <div className="relative h-40 w-full">
            <Image
              src={booking.room.image}
              alt={booking.room.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-5 text-white">
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-80">
                Reserved Room
              </p>
              <h3 className="text-lg font-bold">{booking.room.name}</h3>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* STAY DETAILS GRID */}
            <div className="grid grid-cols-2 gap-4 pb-6 border-b border-dashed border-zinc-200">
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                  Check In
                </p>
                <p className="text-sm font-semibold text-zinc-800">
                  {booking.checkIn}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                  Guests
                </p>
                <p className="text-sm font-semibold text-zinc-800">
                  {booking.guests} Adults
                </p>
              </div>
            </div>

            {/* BILLING SUMMARY */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">
                  Total for {booking.nights} night(s)
                </span>
                <span className="font-bold text-zinc-900">
                  ₹{booking.totalAmount}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 italic text-center pt-2">
                *Payment will be handled directly with the hotel.
              </p>
            </div>
          </div>
        </div>

        {/* TIMELINE / NEXT STEPS */}
        <div className="mt-8 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">
            Next Steps
          </h4>

          <div className="bg-white p-4 rounded-xl border border-zinc-100 flex gap-4 items-start">
            <div className="bg-orange-50 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-800">
                Await Confirmation
              </p>
              <p className="text-xs text-zinc-500">
                The hotel team is checking room availability right now.
              </p>
            </div>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full p-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl shadow-lg shadow-green-100 transition-all"
          >
            <div className="flex gap-4 items-start">
              <div className="bg-white/20 p-2 rounded-lg">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold">Fast-track via WhatsApp</p>
                <p className="text-xs text-white/80">
                  Message the manager directly
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <button
          onClick={() => window.print()}
          className="w-full mt-8 text-xs font-medium text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          Save a copy of this request
        </button>
      </div>
    </section>
  );
}

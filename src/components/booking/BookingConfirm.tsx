"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { BookingPayload } from "@/types/booking";
import { BookingSuccess } from "./BookingSuccess";

// Small Lucide-like icons for a premium feel
const PinIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export function BookingConfirm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [locError, setLocError] = useState<string | null>(null);

  if (!searchParams) return null;

  const token = searchParams.get("token");
  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <div className="bg-red-50 p-4 rounded-full mb-4">⚠️</div>
        <h1 className="text-lg font-semibold">Invalid Link</h1>
        <p className="text-sm text-zinc-500">Booking details have expired.</p>
      </div>
    );
  }

  let data: BookingPayload;
  try {
    data = JSON.parse(atob(token));
  } catch {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <h1 className="text-lg font-semibold text-red-600">Data Error</h1>
        <p className="text-sm text-zinc-500">Unable to read booking details.</p>
      </div>
    );
  }

  const handleFinalConfirm = async () => {
    if (!name.trim() || !phone.trim()) {
      alert("Please enter your name and phone number");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/booking/final", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking: data,
          customer: { name, phone, email },
          location,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Unable to send booking. Please try again.");
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocError("Unsupported browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocError(null);
      },
      () => setLocError("Location access denied"),
      { timeout: 10000 },
    );
  };

  const whatsappMessage = encodeURIComponent(
    `Hello, I've submitted a booking request.\nName: ${name}\nRoom: ${data.room.name}\nTotal: ₹${data.totalAmount}`,
  );

  if (success) {
    return (
      <BookingSuccess
        booking={data}
        whatsappLink={`https://wa.me/917563092029?text=${whatsappMessage}`}
      />
    );
  }

  return (
    <section className="bg-zinc-50 min-h-screen pb-20 md:pt-10 mt-25">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 p-4">
        {/* LEFT COLUMN: FORM */}
        <div className="md:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100">
            <h1 className="text-xl font-bold text-zinc-900 mb-1">
              Confirm Details
            </h1>
            <p className="text-sm text-zinc-500 mb-6">
              The hotel will call you shortly to finalize.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 bg-zinc-50 border-none focus:ring-2 focus:ring-orange-500 rounded-xl px-4 py-3 text-sm transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 ml-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full mt-1 bg-zinc-50 border-none focus:ring-2 focus:ring-orange-500 rounded-xl px-4 py-3 text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 bg-zinc-50 border-none focus:ring-2 focus:ring-orange-500 rounded-xl px-4 py-3 text-sm transition-all"
                  />
                </div>
              </div>

              {/* LOCATION COMPONENT */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="flex items-center gap-2 text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-50 px-3 py-2 rounded-lg transition"
                >
                  <PinIcon />
                  {location
                    ? "Location Shared"
                    : "Share current location for easier arrival"}
                </button>
                {locError && (
                  <p className="text-[10px] mt-1 text-red-500">{locError}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY SUMMARY */}
        <div className="md:col-span-5">
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden sticky top-6">
            <div className="relative h-32 w-full">
              <Image
                src={data.room.image}
                alt={data.room.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">
                  Your Stay
                </p>
                <h3 className="text-lg font-bold leading-tight">
                  {data.room.name}
                </h3>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex justify-between text-xs text-zinc-500 font-medium">
                <span>{data.guests} Guests</span>
                <span>
                  {data.nights} Night{data.nights > 1 ? "s" : ""}
                </span>
              </div>

              <div className="space-y-2 border-t border-zinc-50 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Room total</span>
                  <span className="font-medium">₹{data.roomTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">GST (12%)</span>
                  <span className="font-medium">₹{data.gstAmount}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-zinc-900">Total</span>
                  <span className="font-bold text-lg text-orange-600">
                    ₹{data.totalAmount}
                  </span>
                </div>
              </div>

              <button
                onClick={handleFinalConfirm}
                disabled={loading}
                className={`
                  w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all
                  ${loading ? "bg-zinc-100 text-zinc-400" : "bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-200"}
                `}
              >
                {loading ? (
                  <div className="h-4 w-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Confirm & Send Request"
                )}
              </button>
              <p className="text-[10px] text-center text-zinc-400">
                No payment required now
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

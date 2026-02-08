"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { BookingPayload } from "@/types/booking";
import { BookingSuccess } from "./BookingSuccess";

export function BookingConfirm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();

  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [locError, setLocError] = useState<string | null>(null);

  // ---------- Guards ----------
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

  // ---------- Customer form state ----------

  // ---------- Submit ----------
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
          location, // 👈 ADD THIS
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
      setLocError("Geolocation not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLocError(null);
      },
      () => {
        setLocError("Unable to access location. Permission denied.");
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
      },
    );
  };

  // ---------- WhatsApp ----------
  const whatsappMessage = encodeURIComponent(`
Hello,

I have submitted a booking request.

Name: ${name || "—"}
Phone: ${phone || "—"}

Room: ${data.room.name}
Guests: ${data.guests}
Check-in: ${data.checkIn}
Check-out: ${data.checkOut}

Total Amount: ₹${data.totalAmount}

Please confirm availability.
`);

  // ---------- Success state ----------
  if (success) {
    return (
      <BookingSuccess
        booking={data}
        whatsappLink={`https://wa.me/917563092029?text=${whatsappMessage}`}
      />
    );
  }

  // ---------- Main UI ----------
  return (
    <section className="pt-20">
      <div className="max-w-5xl mx-auto px-6 py-14 space-y-10">
        {/* HERO */}
        <section className="text-center space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">
            Complete Your Booking
          </h1>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Please confirm your contact details. The hotel will contact you to
            confirm availability.
          </p>
        </section>

        {/* BOOKING DETAILS */}
        <section className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Booking Summary</h2>

          <div className="flex flex-col md:flex-row gap-6">
            <Image
              src={data.room.image}
              alt={data.room.name}
              width={220}
              height={150}
              className="rounded-xl object-cover"
            />

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

        {/* CUSTOMER FORM */}
        <section className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Your Contact Details</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-xl px-4 py-3 text-sm"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded-xl px-4 py-3 text-sm"
            />

            <input
              type="email"
              placeholder="Email (optional)"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-xl px-4 py-3 text-sm md:col-span-2"
            />
          </div>
          <section className="mt-4 border rounded-2xl p-6 space-y-3">
            <p className="text-sm font-medium text-zinc-700">
              📍 Share your current location (optional)
            </p>

            <button
              type="button"
              onClick={getCurrentLocation}
              className="px-4 py-2 rounded-lg border text-sm font-semibold hover:bg-zinc-100 transition"
            >
              Use my current location
            </button>

            {location && (
              <p className="text-xs text-green-600">
                Location added successfully
              </p>
            )}

            {locError && <p className="text-xs text-orange-600">{locError}</p>}
          </section>

          <button
            onClick={handleFinalConfirm}
            disabled={loading}
            className={`
              w-full mt-6 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px]
              ${
                loading
                  ? "bg-zinc-400 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700 text-white"
              }
            `}
          >
            {loading ? "Sending Booking..." : "Confirm Booking"}
          </button>
        </section>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, ShieldCheck, Moon, ArrowRight } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { RoomType } from "@/types/rooms";
import { useRouter } from "next/navigation";

interface BookingSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    checkIn?: Date;
    checkOut?: Date;
    guests: number;
    room?: RoomType;
    basePrice: number;
  };
}

export function BookingSummary({ isOpen, onClose, data }: BookingSummaryProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  // Calculate number of nights (minimum 1)
  const nights =
    data.checkIn && data.checkOut
      ? Math.max(differenceInDays(data.checkOut, data.checkIn), 1)
      : 1;
  const GST_RATE = 0.12; // 12% GST (standard for budget hotels)
  // Use room price as source of truth
  const basePrice = data.room?.price ?? data.basePrice;
  // const totalAmount = basePrice * nights;
  // Base room total (without tax)
  const roomTotal = basePrice * nights;

  // GST amount
  const gstAmount = Math.round(roomTotal * GST_RATE);

  // Final payable amount
  const router = useRouter();
  const totalAmount = roomTotal + gstAmount;
  const handleConfirm = async () => {
    if (!data.room || !data.checkIn || !data.checkOut) {
      alert("Missing booking details");
      return;
    }
    setIsConfirming(true);
    // ---- BUILD PAYLOAD (THIS WAS MISSING) ----
    const payload = {
      checkIn: data.checkIn.toISOString(),
      checkOut: data.checkOut.toISOString(),
      guests: data.guests,
      nights,
      room: data.room,
      roomTotal,
      gstAmount,
      totalAmount,
    };

    try {
      const res = await fetch("/api/booking/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      if (!text) throw new Error("Empty server response");

      const json: { redirectUrl?: string; message?: string } = JSON.parse(text);

      if (!res.ok) {
        throw new Error(json.message || "Booking failed");
      }

      if (json.redirectUrl) {
        router.push(json.redirectUrl);
      }
    } catch (err) {
      console.error("CONFIRM ERROR:", err);
      alert("Unable to process booking. Please try again.");
      setIsConfirming(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-600 flex items-center justify-center p-4">
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl"
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-175 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* TOP BAR */}
            <div className="flex items-center justify-between px-8 py-4 border-b border-zinc-100 bg-zinc-50/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-zinc-950 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                  L
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  Booking Overview
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-zinc-950 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* LEFT: DETAILS */}
                <div className="space-y-6">
                  {/* DATES */}
                  <div className="flex items-center gap-6">
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold text-orange-600 uppercase tracking-widest">
                        Arrival
                      </p>
                      <p className="text-lg font-serif">
                        {data.checkIn ? format(data.checkIn, "MMM dd") : "—"}
                      </p>
                    </div>
                    <ArrowRight className="text-zinc-200" size={20} />
                    <div className="space-y-1 text-right md:text-left">
                      <p className="text-[9px] font-bold text-orange-600 uppercase tracking-widest">
                        Departure
                      </p>
                      <p className="text-lg font-serif">
                        {data.checkOut ? format(data.checkOut, "MMM dd") : "—"}
                      </p>
                    </div>
                  </div>

                  {/* GUESTS & NIGHTS */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-50">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Users size={14} />
                      <span className="text-xs font-medium">
                        {data.guests} Adults
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Moon size={14} />
                      <span className="text-xs font-medium">
                        {nights} Night{nights !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {/* ROOM TYPE */}
                  {data.room && (
                    <div className="pt-4 border-t border-zinc-50">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                        Room Type
                      </p>
                      <p className="text-sm font-semibold text-zinc-900">
                        {data.room.name}
                        <span className="text-zinc-400 font-medium">
                          {" "}
                          · ₹{data.room.price}/night
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* RIGHT: PRICE */}
                <div className="bg-zinc-950 rounded-[2rem] p-8 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-2">
                      Total Amount
                    </p>
                    <div className="mb-6">
                      {/* TOTAL */}
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-serif">
                          ₹{totalAmount.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                          All inclusive
                        </span>
                      </div>

                      {/* BREAKDOWN */}
                      <div className="mt-3 space-y-1 text-[10px] text-zinc-400">
                        <div className="flex justify-between">
                          <span>
                            Room charges ({nights} night{nights > 1 ? "s" : ""})
                          </span>
                          <span>₹{roomTotal.toLocaleString("en-IN")}</span>
                        </div>

                        <div className="flex justify-between">
                          <span>GST (12%)</span>
                          <span>₹{gstAmount.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleConfirm}
                      disabled={isConfirming}
                      className={`
    w-full py-4 rounded-xl font-bold uppercase tracking-widest text-[10px]
    flex items-center justify-center gap-2 transition-all
    ${
      isConfirming
        ? "bg-zinc-400 cursor-not-allowed text-white"
        : "bg-orange-600 hover:bg-white hover:text-black text-white"
    }
  `}
                    >
                      {isConfirming ? "Confirming..." : "Confirm Now"}
                    </button>
                  </div>

                  {/* DECOR */}
                  <ShieldCheck className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5 rotate-12" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

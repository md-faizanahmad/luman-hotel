"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Users,
  CreditCard,
  ShieldCheck,
  Moon,
  ArrowRight,
} from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { useCurrencyStore } from "@/store/useCurrencyStore";

interface BookingSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    checkIn?: Date;
    checkOut?: Date;
    guests: number;
    basePrice: number;
  };
}

export function BookingSummary({ isOpen, onClose, data }: BookingSummaryProps) {
  const { activeCurrency } = useCurrencyStore();

  const nights =
    data.checkIn && data.checkOut
      ? differenceInDays(data.checkOut, data.checkIn)
      : 1;

  const convertedBase = Math.round(data.basePrice * activeCurrency.rate);
  const totalAmount = convertedBase * (nights > 0 ? nights : 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-600 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-175 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* COMPACT TOP BAR */}
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

            <div className="p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* LEFT: TRIP DETAILS */}
                <div className="space-y-6">
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
                </div>

                {/* RIGHT: PRICING & CTA */}
                <div className="bg-zinc-950 rounded-[2rem] p-8 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-2">
                      Total Amount
                    </p>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-serif">
                        {activeCurrency.symbol}
                        {Math.round(totalAmount * 1.12).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                        All inclusive
                      </span>
                    </div>

                    <button className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2">
                      <CreditCard size={14} />
                      Confirm Now
                    </button>
                  </div>

                  {/* Subtle decorative background icon */}
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

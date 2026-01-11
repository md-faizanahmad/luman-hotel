"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Utensils,
  Flower2,
  Send,
  Calendar,
} from "lucide-react";
import { useConciergeStore } from "@/store/useConciergeStore";

export function VirtualConcierge() {
  const { isOpen, setIsOpen, booking, setBooking } = useConciergeStore();
  const [step, setStep] = useState<"menu" | "form">("menu");

  const startBooking = (type: "Spa" | "Dining") => {
    setBooking({ type });
    setStep("form");
  };

  return (
    <div className="fixed bottom-6 right-6 z-100">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
              transformOrigin: "bottom right",
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-87.5 bg-white/90 backdrop-blur-2xl border border-zinc-200 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* HEADER */}
            <div className="bg-zinc-900 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center font-serif italic text-xl">
                  L
                </div>
                <div>
                  <h4 className="text-sm font-bold">Luman Concierge</h4>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest">
                    Always at your service
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-6 h-100 overflow-y-auto space-y-4">
              {step === "menu" ? (
                <>
                  <p className="text-sm text-zinc-600 bg-zinc-100 p-4 rounded-2xl rounded-tl-none">
                    Welcome back. How may I elevate your stay today?
                  </p>

                  <div className="grid grid-cols-1 gap-3 pt-4">
                    <button
                      onClick={() => startBooking("Spa")}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all group text-left"
                    >
                      <div className="p-3 bg-zinc-50 rounded-xl group-hover:bg-white transition-colors">
                        <Flower2 className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest">
                          Book Zen Spa
                        </p>
                        <p className="text-[10px] text-zinc-400 italic">
                          Availability: Today
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => startBooking("Dining")}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all group text-left"
                    >
                      <div className="p-3 bg-zinc-50 rounded-xl group-hover:bg-white transition-colors">
                        <Utensils className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest">
                          Dinner Reservation
                        </p>
                        <p className="text-[10px] text-zinc-400 italic">
                          Michelin Terrace
                        </p>
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <button
                    onClick={() => setStep("menu")}
                    className="text-[10px] font-bold uppercase tracking-widest text-zinc-400"
                  >
                    ← Back to Services
                  </button>
                  <h5 className="text-xl font-serif">Reserve {booking.type}</h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                      <Calendar className="w-4 h-4 text-zinc-400" />
                      <input
                        type="date"
                        className="bg-transparent text-xs font-bold outline-none w-full"
                      />
                    </div>
                    <div className="flex gap-2">
                      {["18:00", "19:30", "21:00"].map((t) => (
                        <button
                          key={t}
                          className="flex-1 py-2 rounded-lg border border-zinc-200 text-[10px] font-bold hover:bg-zinc-900 hover:text-white transition-all"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button className="w-full py-4 bg-orange-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-orange-200">
                    Confirm Request
                  </button>
                </motion.div>
              )}
            </div>

            {/* INPUT AREA */}
            <div className="p-4 bg-zinc-50 flex gap-2 border-t border-zinc-100">
              <input
                placeholder="Type a message..."
                className="flex-1 bg-white border border-zinc-200 rounded-full px-4 text-xs outline-none focus:ring-1 ring-orange-500 transition-all"
              />
              <button className="bg-zinc-900 p-2.5 rounded-full text-white hover:bg-orange-600 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING TRIGGER */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-zinc-950 text-white rounded-full flex items-center justify-center shadow-2xl relative"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 rounded-full border-2 border-white animate-pulse" />
      </motion.button>
    </div>
  );
}

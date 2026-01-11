"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Users, Calendar, Clock } from "lucide-react";

export function TableReservation() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 2000);
  };

  return (
    <div className="bg-zinc-50 p-8 md:p-16 rounded-[3rem] border border-zinc-100 max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {status !== "success" ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-5xl font-serif mb-4">
                Reserve a Table
              </h3>
              <p className="text-zinc-500 font-light">
                Join us for an unforgettable evening at The Terrace.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <select className="w-full bg-white border border-zinc-200 p-4 pl-12 rounded-2xl text-sm appearance-none outline-none focus:ring-1 ring-orange-500">
                  <option>2 Guests</option>
                  <option>4 Guests</option>
                  <option>6+ Guests</option>
                </select>
              </div>

              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="date"
                  className="w-full bg-white border border-zinc-200 p-4 pl-12 rounded-2xl text-sm outline-none focus:ring-1 ring-orange-500"
                />
              </div>

              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <select className="w-full bg-white border border-zinc-200 p-4 pl-12 rounded-2xl text-sm appearance-none outline-none focus:ring-1 ring-orange-500">
                  <option>19:00</option>
                  <option>20:00</option>
                  <option>21:00</option>
                </select>
              </div>

              <button
                disabled={status === "submitting"}
                className="md:col-span-3 mt-4 py-5 bg-orange-600 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-950 transition-all shadow-lg shadow-orange-200"
              >
                {status === "submitting"
                  ? "Checking Availability..."
                  : "Confirm Reservation"}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h3 className="text-3xl font-serif mb-2">Reservation Confirmed</h3>
            <p className="text-zinc-500 mb-8">
              We have sent a confirmation to your email. See you soon!
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-xs font-bold uppercase tracking-widest text-orange-600 hover:text-zinc-950 transition-colors"
            >
              Make another booking
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

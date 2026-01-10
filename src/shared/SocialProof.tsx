"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X } from "lucide-react";
import { MOCK_BOOKINGS } from "@/lib/data";

export function SocialProof() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show first notification after 5 seconds
    const initialDelay = setTimeout(() => setIsVisible(true), 5000);

    const interval = setInterval(() => {
      setIsVisible(false); // Hide current

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % MOCK_BOOKINGS.map.length);
        setIsVisible(true); // Show next
      }, 1000); // Small gap between switches
    }, 10000); // Switch every 10 seconds

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  const current = MOCK_BOOKINGS[index];

  return (
    <div className="fixed bottom-6 left-6 z-60 pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className="pointer-events-auto bg-white/90 backdrop-blur-xl border border-zinc-200 p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center gap-4 max-w-75"
          >
            {/* ICON / AVATAR */}
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-orange-600 fill-orange-600" />
            </div>

            {/* TEXT CONTENT */}
            <div className="flex flex-col gap-0.5">
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-none">
                Recent Booking
              </p>
              <p className="text-sm font-medium text-zinc-900 leading-tight">
                {current.guest} reserved the{" "}
                <span className="font-bold">{current.room}</span>
              </p>
              <p className="text-[10px] text-zinc-400 italic">{current.time}</p>
            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute -top-2 -right-2 bg-white border border-zinc-100 rounded-full p-1 shadow-sm hover:bg-zinc-50 transition-colors"
            >
              <X className="w-3 h-3 text-zinc-400" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

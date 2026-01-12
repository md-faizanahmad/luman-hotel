"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import Image from "next/image";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { Venue } from "@/@types/dining";

export function MenuModal({
  isOpen,
  onClose,
  venue,
}: {
  isOpen: boolean;
  onClose: () => void;
  venue: Venue | null;
}) {
  const { activeCurrency } = useCurrencyStore();
  if (!venue) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-200 flex items-end md:items-center justify-center p-0 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/90 backdrop-blur-xl"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full h-[90vh] md:h-full max-w-5xl bg-white rounded-t-[3rem] md:rounded-[4rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-210 p-3 bg-zinc-100 hover:bg-zinc-900 hover:text-white rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image Section */}
            <div className="relative h-48 md:h-auto md:w-2/5 shrink-0">
              <Image
                src={venue.image}
                alt={venue.name}
                fill
                className="object-cover brightness-[0.7]"
              />
              <div className="absolute inset-0 p-10 flex flex-col justify-end text-white bg-linear-to-t from-black/80 via-transparent to-transparent">
                <Sparkles className="w-6 h-6 text-orange-500 mb-4" />
                <h4 className="text-3xl font-serif italic">{venue.name}</h4>
              </div>
            </div>

            {/* Menu List */}
            <div className="flex-1 p-8 md:p-16 overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-end mb-12 pb-6 border-b border-zinc-100">
                <h2 className="text-4xl font-serif">Menu</h2>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Rates in{" "}
                  <span className="text-zinc-900">{activeCurrency.curr}</span>
                </div>
              </div>

              <div className="space-y-12">
                {Object.entries(venue.menu).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600 mb-8 border-b pb-2">
                      {category}
                    </h3>
                    <div className="space-y-8">
                      {items.map((item) => (
                        <div
                          key={item.n}
                          className="flex justify-between items-start group"
                        >
                          <div className="max-w-[70%]">
                            <h5 className="text-sm font-bold text-zinc-900 group-hover:text-orange-600 transition-colors">
                              {item.n}
                            </h5>
                            <p className="text-[11px] text-zinc-400 italic mt-1">
                              {item.d}
                            </p>
                          </div>
                          <div className="text-sm font-serif font-medium text-zinc-900">
                            {activeCurrency.symbol}
                            {Math.round(
                              Number(item.p) * activeCurrency.rate
                            ).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

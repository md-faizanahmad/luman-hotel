"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Utensils, Flower2, Send, Calendar, Sparkles } from "lucide-react";

export function VirtualConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"options" | "spa" | "dining">("options");

  return (
    <div className="fixed bottom-4 right-4 z-100 md:bottom-8 md:right-8">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[calc(100vw-32px)] sm:w-[320px] bg-white/95 backdrop-blur-xl border border-zinc-200 rounded-[2rem] shadow-2xl overflow-hidden"
          >
            {/* COMPACT HEADER */}
            <div className="p-4 bg-zinc-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Luman Concierge
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* CONTENT AREA */}
            <div className="p-5 min-h-75 flex flex-col">
              {view === "options" ? (
                <div className="space-y-4 flex-1">
                  <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                    How can we assist your stay today?
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <QuickAction
                      icon={<Flower2 className="w-4 h-4" />}
                      label="Spa"
                      onClick={() => setView("spa")}
                    />
                    <QuickAction
                      icon={<Utensils className="w-4 h-4" />}
                      label="Dining"
                      onClick={() => setView("dining")}
                    />
                  </div>
                  <div className="p-3 bg-orange-50 rounded-2xl border border-orange-100 flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                    <p className="text-[10px] font-bold text-orange-700 uppercase">
                      Member Exclusive: Late Checkout Available
                    </p>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <button
                    onClick={() => setView("options")}
                    className="text-[9px] font-bold text-zinc-400 uppercase"
                  >
                    ← Back
                  </button>
                  <h4 className="font-serif text-lg lowercase italic">
                    Reserve {view}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-3 bg-zinc-50 rounded-xl">
                      <Calendar className="w-3 h-3 text-zinc-400" />
                      <span className="text-[10px] font-bold">
                        Select Preferred Date
                      </span>
                    </div>
                    <button className="w-full py-3 bg-zinc-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest">
                      Check Availability
                    </button>
                  </div>
                </motion.div>
              )}

              {/* MINI INPUT */}
              <div className="mt-auto pt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask anything..."
                  className="flex-1 bg-zinc-100 rounded-full px-4 py-2 text-[11px] outline-none focus:ring-1 ring-orange-500"
                />
                <button className="p-2 bg-orange-600 text-white rounded-full">
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMPACT TRIGGER */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-zinc-950 text-white pl-4 pr-2 py-2 rounded-full shadow-2xl"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">
          Concierge
        </span>
        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
          <Sparkles className="w-4 h-4" />
        </div>
      </motion.button>
    </div>
  );
}

function QuickAction({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-orange-200 hover:bg-white transition-all group"
    >
      <div className="text-zinc-400 group-hover:text-orange-600 transition-colors">
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
        {label}
      </span>
    </button>
  );
}

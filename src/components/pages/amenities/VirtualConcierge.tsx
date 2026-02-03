"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Utensils,
  Flower2,
  Send,
  Sparkles,
  MessageCircle,
  Info,
} from "lucide-react";
import {
  QuickAction,
  SelectionItem,
  ViewHeader,
  ViewState,
} from "@/shared/ConciergeParts";

export function VirtualConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<ViewState>("options");

  return (
    <div className="fixed bottom-8 right-8 z-200 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
              transformOrigin: "bottom right",
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="pointer-events-auto mb-4 w-70 sm:w-[320px] bg-white/95 backdrop-blur-2xl border border-zinc-200 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* COMPACT TOP BAR */}
            <div className="px-5 py-3 bg-zinc-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Luman Assistant
                </span>
              </div>
            </div>

            <div className="p-5 overflow-y-auto max-h-100">
              <AnimatePresence mode="wait">
                {view === "options" && (
                  <motion.div
                    key="options"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-[11px] text-zinc-500 mb-4 font-light">
                      Welcome back, how may we assist you?
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <QuickAction
                        icon={<Flower2 size={18} />}
                        label="Wellness"
                        onClick={() => setView("spa")}
                      />
                      <QuickAction
                        icon={<Utensils size={18} />}
                        label="Dining"
                        onClick={() => setView("dining")}
                      />
                      <QuickAction
                        icon={<Info size={18} />}
                        label="FAQ"
                        onClick={() => setView("queries")}
                      />
                      <QuickAction
                        icon={<Sparkles size={18} />}
                        label="Concierge"
                        onClick={() => {}}
                      />
                    </div>
                  </motion.div>
                )}

                {view === "spa" && (
                  <motion.div
                    key="spa"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <ViewHeader
                      title="Spa Rituals"
                      onBack={() => setView("options")}
                    />
                    <div className="space-y-2">
                      <SelectionItem title="Deep Tissue" time="60m" />
                      <SelectionItem title="Himalayan Salt" time="45m" />
                    </div>
                  </motion.div>
                )}

                {view === "dining" && (
                  <motion.div
                    key="dining"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <ViewHeader
                      title="Reserve Table"
                      onBack={() => setView("options")}
                    />
                    <div className="space-y-2">
                      <SelectionItem title="The Terrace" time="Dinner" />
                      <SelectionItem title="The Vault" time="Supper" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* MINIMALIST INPUT */}
            <div className="p-4 pt-0 mt-auto border-t border-zinc-50">
              <div className="flex gap-2 items-center bg-zinc-100 rounded-xl p-1.5">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  className="bg-transparent flex-1 text-[11px] px-2 outline-none"
                />
                <button className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white hover:bg-zinc-900 transition-colors">
                  <Send size={14} />
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
        className="pointer-events-auto w-12 h-12 bg-zinc-950 rounded-full flex items-center justify-center border border-white/10 shadow-xl group"
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="m"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="x"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

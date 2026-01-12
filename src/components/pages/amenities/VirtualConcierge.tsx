"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Utensils,
  Flower2,
  Send,
  Calendar,
  Sparkles,
  MessageCircle,
  Info,
  MapPin,
  Moon,
  Clock,
} from "lucide-react";

type ViewState = "options" | "spa" | "dining" | "queries";

export function VirtualConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<ViewState>("options");

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="mb-4 w-[calc(100vw-48px)] sm:w-[350px] bg-white/95 backdrop-blur-2xl border border-zinc-200 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden"
          >
            {/* COMPACT HEADER */}
            <div className="p-5 bg-zinc-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Luman Digital Concierge
                </span>
              </div>
            </div>

            {/* DYNAMIC CONTENT AREA */}
            <div className="p-6 min-h-[400px] flex flex-col">
              <AnimatePresence mode="wait">
                {view === "options" && (
                  <motion.div
                    key="options"
                    {...fadeTransition}
                    className="space-y-6 flex-1"
                  >
                    <h4 className="font-serif text-xl italic text-zinc-900">
                      How may we assist?
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <QuickAction
                        icon={<Flower2 />}
                        label="Spa"
                        onClick={() => setView("spa")}
                      />
                      <QuickAction
                        icon={<Utensils />}
                        label="Dining"
                        onClick={() => setView("dining")}
                      />
                      <QuickAction
                        icon={<Info />}
                        label="Queries"
                        onClick={() => setView("queries")}
                      />
                      <QuickAction
                        icon={<MapPin />}
                        label="Locate"
                        onClick={() => {}}
                      />
                    </div>
                    <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 flex items-center gap-3">
                      <Moon className="w-4 h-4 text-orange-600" />
                      <p className="text-[9px] font-bold text-orange-800 uppercase tracking-tight italic">
                        Turn-down service scheduled for 20:00
                      </p>
                    </div>
                  </motion.div>
                )}

                {view === "spa" && (
                  <motion.div
                    key="spa"
                    {...fadeTransition}
                    className="space-y-4 flex-1"
                  >
                    <BackButton onClick={() => setView("options")} />
                    <h4 className="font-serif text-2xl italic">Spa Rituals</h4>
                    <div className="space-y-2">
                      <SelectionItem
                        title="Deep Tissue Massage"
                        time="60 min"
                      />
                      <SelectionItem
                        title="Himalayan Salt Scrub"
                        time="45 min"
                      />
                      <SelectionItem
                        title="Zen Meditation Session"
                        time="30 min"
                      />
                    </div>
                    <BookingButton label="Check Spa Availability" />
                  </motion.div>
                )}

                {view === "dining" && (
                  <motion.div
                    key="dining"
                    {...fadeTransition}
                    className="space-y-4 flex-1"
                  >
                    <BackButton onClick={() => setView("options")} />
                    <h4 className="font-serif text-2xl italic">Dining</h4>
                    <div className="space-y-2">
                      <SelectionItem
                        title="The Terrace (Al-Fresco)"
                        time="Dinner"
                      />
                      <SelectionItem
                        title="The Vault (Fine Dining)"
                        time="7-Course"
                      />
                      <SelectionItem title="In-Room Gastronomy" time="24/7" />
                    </div>
                    <BookingButton label="Reserve a Table" />
                  </motion.div>
                )}

                {view === "queries" && (
                  <motion.div
                    key="queries"
                    {...fadeTransition}
                    className="space-y-4 flex-1"
                  >
                    <BackButton onClick={() => setView("options")} />
                    <h4 className="font-serif text-2xl italic">Quick FAQ</h4>
                    <div className="space-y-3">
                      <details className="group border-b border-zinc-100 pb-2">
                        <summary className="list-none text-xs font-bold uppercase tracking-tighter flex justify-between cursor-pointer">
                          Wi-Fi Access <Plus className="w-3 h-3" />
                        </summary>
                        <p className="text-[11px] text-zinc-500 mt-2">
                          Connect to &apos;Luman_Guest&apos;. Use your room
                          number and last name.
                        </p>
                      </details>
                      <details className="group border-b border-zinc-100 pb-2">
                        <summary className="list-none text-xs font-bold uppercase tracking-tighter flex justify-between cursor-pointer">
                          Gym Hours <Plus className="w-3 h-3" />
                        </summary>
                        <p className="text-[11px] text-zinc-500 mt-2">
                          Our fitness sanctuary is open 24/7 on Level 4.
                        </p>
                      </details>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CHAT INPUT FIELD */}
              <div className="mt-auto pt-6 flex gap-2">
                <input
                  type="text"
                  placeholder="Need extra towels? Ask here..."
                  className="flex-1 bg-zinc-100 rounded-2xl px-4 py-3 text-[12px] outline-none focus:ring-1 ring-orange-500 transition-all"
                />
                <button className="w-12 h-12 bg-orange-600 text-white rounded-2xl flex items-center justify-center hover:bg-zinc-950 transition-colors">
                  <Send className="w-4 h-4" />
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
        className="w-14 h-14 bg-zinc-950 rounded-full shadow-2xl flex items-center justify-center relative border border-white/10"
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="m"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="x"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

// HELPER COMPONENTS
const fadeTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};

function QuickAction({
  icon,
  label,
  onClick,
}: {
  icon: any;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 rounded-[2rem] bg-zinc-50 border border-zinc-100 hover:border-orange-200 hover:bg-white transition-all group h-28"
    >
      <div className="mb-2 text-zinc-400 group-hover:text-orange-600 transition-all">
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">
        {label}
      </span>
    </button>
  );
}

function SelectionItem({ title, time }: { title: string; time: string }) {
  return (
    <div className="flex justify-between items-center p-4 bg-zinc-50 rounded-2xl hover:bg-orange-50 transition-colors cursor-pointer group">
      <span className="text-[11px] font-bold text-zinc-900">{title}</span>
      <span className="text-[9px] font-bold text-zinc-400 group-hover:text-orange-600">
        {time}
      </span>
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest hover:text-zinc-900"
    >
      ← Back
    </button>
  );
}

function BookingButton({ label }: { label: string }) {
  return (
    <button className="w-full py-4 bg-zinc-950 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-orange-600 transition-colors">
      {label}
    </button>
  );
}

function Plus({ className }: { className?: string }) {
  return <span className={className}>+</span>;
}

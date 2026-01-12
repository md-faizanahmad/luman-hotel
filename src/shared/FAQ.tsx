"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const FAQ_DATA = [
  {
    question: "What is the standard check-in and check-out time?",
    answer:
      "Our check-in begins at 15:00 to ensure your sanctuary is perfectly prepared. Check-out is at 12:00. Early arrivals and late departures can be arranged via our Golden Keys Concierge, subject to availability.",
  },
  {
    question: "Do you offer private airport transfers?",
    answer:
      "Yes. We provide seamless transfers in our private fleet of luxury sedans. For a truly cinematic arrival, helicopter transfers from the international terminal directly to our rooftop pad can be coordinated.",
  },
  {
    question: "Are children and pets permitted at Luman?",
    answer:
      "Luman is designed as a serene retreat. While we welcome families and offer professional babysitting services, we maintain specific 'Quiet Zones'. Well-behaved pets are welcome in our Terrace Suites.",
  },
  {
    question: "What is the policy for Michelin-starred dining reservations?",
    answer:
      "To ensure an intimate experience, we recommend booking table reservations at least 48 hours in advance. Guests staying in our 'Cliff' and 'Luman' suites receive priority seating.",
  },
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-40 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          {/* LEFT: EDITORIAL SIDEBAR */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[10px]"
            >
              Support & Clarity
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-serif text-zinc-950 mt-6 leading-none tracking-tighter">
              Common <br />
              <span className="italic text-zinc-400 font-light text-6xl md:text-8xl">
                Queries.
              </span>
            </h2>
            <p className="mt-8 text-zinc-500 font-light leading-relaxed max-w-sm">
              Everything you need to know about your upcoming stay at Luman. If
              you require further assistance, our 24-hour concierge is always on
              call.
            </p>

            <div className="mt-12 flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-zinc-950 text-white flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1">
                Contact Concierge
              </span>
            </div>
          </div>

          {/* RIGHT: ACCORDION LIST */}
          <div className="lg:col-span-8">
            <div className="border-t border-zinc-100">
              {FAQ_DATA.map((item, i) => (
                <div key={i} className="border-b border-zinc-100">
                  <button
                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                    className="w-full py-8 md:py-12 flex items-center justify-between text-left group"
                  >
                    <span className="flex items-baseline gap-6 md:gap-10">
                      <span className="text-[10px] font-bold text-zinc-300 group-hover:text-orange-600 transition-colors">
                        0{i + 1}
                      </span>
                      <span className="text-xl md:text-3xl font-serif text-zinc-900 group-hover:text-zinc-600 transition-colors">
                        {item.question}
                      </span>
                    </span>

                    <div
                      className={`p-3 rounded-full transition-all duration-500 ${
                        activeIndex === i
                          ? "bg-orange-600 text-white rotate-180"
                          : "bg-zinc-50 text-zinc-400"
                      }`}
                    >
                      {activeIndex === i ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-10 md:pb-16 pl-16 md:pl-28 max-w-2xl">
                          <p className="text-zinc-500 text-lg font-light leading-relaxed italic border-l-2 border-orange-100 pl-8">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

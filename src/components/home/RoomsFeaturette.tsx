"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Maximize2, Wind, Droplets } from "lucide-react";
import { useCurrencyStore } from "@/store/useCurrencyStore";

const SUITES = [
  {
    id: "01",
    name: "The Cliff",
    type: "Panoramic Suite",
    price: 450,
    sqft: "1,200",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1500",
    features: ["Infinity Pool", "Ocean View", "Private Butler"],
  },
  {
    id: "02",
    name: "The Zen",
    type: "Garden Sanctuary",
    price: 320,
    sqft: "950",
    image: "https://images.unsplash.com/photo-1719328787120-579a7a22dfda",
    features: ["Stone Tub", "Hidden Patio", "Incense Ritual"],
  },
  {
    id: "03",
    name: "The Luman",
    type: "Presidential Loft",
    price: 890,
    sqft: "2,400",
    image: "https://images.unsplash.com/photo-1664780476492-fbb9fd277ce8",
    features: ["Glass Floor", "Private Chef", "Helipad Access"],
  },
];

export function RoomsFeaturette() {
  const [active, setActive] = useState(0);
  const { activeCurrency } = useCurrencyStore();

  return (
    <section className="py-24 md:py-40 bg-zinc-950 overflow-hidden relative">
      {/* 1. IMMERSIVE BACKGROUND (Animated Glow) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-orange-600 rounded-full blur-[150px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px]">
              Private Sanctuaries
            </span>
            <h2 className="text-5xl md:text-8xl font-serif text-white mt-4 tracking-tighter">
              The{" "}
              <span className="italic text-zinc-500 font-light">Suites</span>
            </h2>
          </div>
          <button className="flex items-center gap-3 text-white text-[10px] font-bold uppercase tracking-[0.3em] border-b border-white/20 pb-2 hover:border-orange-500 transition-colors">
            View All Residencies <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 2. THE KINETIC STAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: ROOM LIST (Selection) */}
          <div className="lg:col-span-4 space-y-4">
            {SUITES.map((suite, idx) => (
              <motion.div
                key={suite.id}
                onMouseEnter={() => setActive(idx)}
                className={`relative p-8 rounded-[2rem] cursor-pointer transition-all duration-500 border-2 
                  ${
                    active === idx
                      ? "bg-white border-white shadow-2xl"
                      : "bg-white/5 border-white/5 hover:bg-white/10"
                  }
                `}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span
                      className={`text-[10px] font-bold tracking-widest uppercase ${
                        active === idx ? "text-orange-600" : "text-zinc-500"
                      }`}
                    >
                      {suite.id} — {suite.type}
                    </span>
                    <h3
                      className={`text-2xl md:text-3xl font-serif mt-2 ${
                        active === idx ? "text-zinc-900" : "text-white"
                      }`}
                    >
                      {suite.name}
                    </h3>
                  </div>
                  {active === idx && (
                    <motion.div
                      layoutId="suite-check"
                      className="p-2 bg-orange-600 rounded-full text-white"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: CINEMATIC REVEAL */}
          <div className="lg:col-span-8 h-[500px] md:h-[650px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 rounded-[3rem] overflow-hidden group shadow-2xl"
              >
                <Image
                  src={SUITES[active].image}
                  alt={SUITES[active].name}
                  fill
                  className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                {/* FLOATING SPECS */}
                <div className="absolute top-10 right-10 flex flex-col gap-4 items-end">
                  <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-3">
                    <Maximize2 className="w-4 h-4 text-orange-500" />
                    <span className="text-white text-[10px] font-bold uppercase tracking-widest">
                      {SUITES[active].sqft} SQFT
                    </span>
                  </div>
                </div>

                {/* BOTTOM PRICE & DETAILS */}
                <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-end gap-6">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      {SUITES[active].features.map((f) => (
                        <span
                          key={f}
                          className="text-[9px] font-bold uppercase tracking-widest text-zinc-300 border border-white/20 px-3 py-1 rounded-full"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <p className="text-4xl md:text-6xl font-serif text-white tracking-tighter italic">
                      {SUITES[active].name} Suite
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl text-zinc-950 flex flex-col items-center min-w-[180px]">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                      Starting from
                    </p>
                    <motion.p
                      key={activeCurrency.curr}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-4xl font-serif mb-4"
                    >
                      {activeCurrency.symbol}
                      {Math.round(
                        SUITES[active].price * activeCurrency.rate
                      ).toLocaleString()}
                    </motion.p>
                    <button className="w-full py-3 bg-zinc-950 text-white rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors">
                      Book Suite
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

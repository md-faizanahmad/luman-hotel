"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Box } from "lucide-react";
import { useCurrencyStore } from "@/store/useCurrencyStore";

const TABLES = [
  {
    id: "ocean",
    name: "Ocean Edge",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1200",
    tags: ["Outdoor", "Sunset View", "Private Rail"],
  },
  {
    id: "vault",
    name: "Stone Vault",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200",
    tags: ["Subterranean", "Acoustic", "Wine Cellar"],
  },
  {
    id: "chef",
    name: "Chef Table",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200",
    tags: ["Open Kitchen", "Live Action", "Limited"],
  },
];

export function TableSelector() {
  const [active, setActive] = useState(0);
  const { activeCurrency } = useCurrencyStore();

  const paginate = (dir: number) => {
    setActive((prev) => (prev + dir + TABLES.length) % TABLES.length);
  };

  return (
    <section className="bg-zinc-950 py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          {/* 3D VISUALIZER PANEL */}
          <div className="w-full lg:w-1/2 relative flex flex-col items-center">
            <div className="relative w-full aspect-4/5 md:aspect-square max-w-125 perspective-1000">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, rotateY: 20, scale: 0.9, x: 50 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1, x: 0 }}
                  exit={{ opacity: 0, rotateY: -20, scale: 0.9, x: -50 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
                >
                  <Image
                    src={TABLES[active].image}
                    alt={TABLES[active].name}
                    fill
                    className="object-cover brightness-75"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

                  {/* Floating 360 UI Badge */}
                  <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <Box className="w-3 h-3 text-orange-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                      Live 360° Seating
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* SLIDE CONTROLS (Floating) */}
              <div className="absolute -bottom-6 flex gap-4 z-20">
                <button
                  onClick={() => paginate(-1)}
                  className="p-5 bg-white text-zinc-950 rounded-full hover:bg-orange-600 hover:text-white transition-all shadow-xl"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="p-5 bg-white text-zinc-950 rounded-full hover:bg-orange-600 hover:text-white transition-all shadow-xl"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* DETAILS PANEL */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div>
                  <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px]">
                    Selection 0{active + 1}
                  </span>
                  <h3 className="text-5xl md:text-8xl font-serif text-white mt-4 tracking-tighter leading-none">
                    {TABLES[active].name.split(" ")[0]} <br />
                    <span className="italic font-light text-zinc-500">
                      {TABLES[active].name.split(" ")[1]}
                    </span>
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {TABLES[active].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] text-zinc-400 font-bold uppercase tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/5 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
                      Reservation Fee
                    </p>
                    <p className="text-4xl md:text-5xl font-serif text-white">
                      {activeCurrency.symbol}
                      {Math.round(
                        TABLES[active].price * activeCurrency.rate
                      ).toLocaleString()}
                    </p>
                  </div>
                  <button className="px-10 py-5 bg-orange-600 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all shadow-xl shadow-orange-600/20">
                    Reserve This Table
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

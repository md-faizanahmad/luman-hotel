"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, LayoutGroup } from "framer-motion";
import { ArrowRight, Plus, Sunset, Utensils } from "lucide-react";
import { MenuModal } from "./MenuModal";
import { Venue } from "@/@types/dining";

// Use the same VENUES array from your previous code
const VENUES: Venue[] = [
  {
    id: "01",
    name: "The Terrace",
    type: "Al-Fresco Mediterranean",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    icon: <Sunset className="w-5 h-5" />,
    desc: "Experience the sea breeze. Our terrace serves artisan seafood caught daily, paired with organic local vintages.",
    menu: {
      mains: [{ n: "Wild Seabass", p: "42", d: "Artichoke, saffron emulsion" }],
      starters: [{ n: "Oyster Glacée", p: "24", d: "Cucumber, dill, gin" }],
      desserts: [{ n: "Gold Soufflé", p: "20", d: "Dark chocolate" }],
    },
  },

  {
    id: "02",
    name: "The Vault",
    type: "Michelin Fine Dining",
    image: "https://images.unsplash.com/photo-1474225183201-99971f7495cf",
    icon: <Utensils className="w-5 h-5" />,
    desc: "A subterranean sanctuary carved from stone. Enjoy a 9-course ritual in a candle-lit acoustic environment.",
    menu: {
      mains: [{ n: "Wagyu A5", p: "110", d: "Smoked marrow, truffle jus" }],
      starters: [{ n: "Beef Crudo", p: "28", d: "Caper leaf, parmesan crisp" }],
      desserts: [
        { n: "Truffle Honey Tart", p: "22", d: "Honeycomb, sea salt" },
      ],
    },
  },

  {
    id: "03",
    name: "The Vault",
    type: "Michelin Fine Dining",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000",
    icon: <Utensils className="w-5 h-5" />,
    desc: "A subterranean sanctuary carved from stone. Enjoy a 9-course ritual in a candle-lit acoustic environment.",
    menu: {
      mains: [{ n: "Wagyu A5", p: "110", d: "Smoked marrow, truffle jus" }],
      starters: [{ n: "Beef Crudo", p: "28", d: "Caper leaf, parmesan crisp" }],
      desserts: [
        { n: "Truffle Honey Tart", p: "22", d: "Honeycomb, sea salt" },
      ],
    },
  },
];
export function DiningConcepts() {
  const [selectedVenue, setSelectedVenue] = useState<null | Venue>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-12">
        <div className="mb-12">
          <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px]">
            Gastronomy
          </span>
          <h2 className="text-5xl md:text-7xl font-serif mt-2">
            The <span className="italic text-zinc-400">Venues</span>
          </h2>
        </div>

        {/* LayoutGroup ensures smooth width transitions between siblings */}
        <LayoutGroup>
          <div className="flex flex-row overflow-x-auto md:overflow-visible pb-10 gap-4 snap-x snap-mandatory hide-scrollbar h-125 md:h-150">
            {VENUES.map((venue) => (
              <motion.div
                key={venue.id}
                layout
                onMouseEnter={() => setHoveredId(venue.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedVenue(venue)}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`relative snap-center shrink-0 rounded-[2.5rem] overflow-hidden cursor-pointer bg-zinc-900 group shadow-2xl transition-all duration-500
                  ${
                    hoveredId === venue.id
                      ? "w-[85vw] md:w-[50%]"
                      : "w-[85vw] md:w-[25%]"
                  }
                  ${
                    hoveredId !== null && hoveredId !== venue.id
                      ? "md:opacity-60 md:grayscale-[0.5]"
                      : "opacity-100"
                  }
                `}
              >
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                />

                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
                  {/* Top Bar */}
                  <div className="flex justify-between items-start">
                    <span className="text-white font-bold tracking-[0.3em] text-[10px] uppercase">
                      {venue.type}
                    </span>
                    <motion.div
                      animate={{ rotate: hoveredId === venue.id ? 90 : 0 }}
                      className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.div>
                  </div>

                  {/* Bottom Content */}
                  <div className="space-y-4">
                    <h3 className="text-4xl md:text-5xl font-serif text-white leading-none">
                      {venue.name}
                    </h3>

                    {/* Expandable Description (Desktop Only) */}
                    <motion.p
                      initial={false}
                      animate={{
                        opacity: hoveredId === venue.id ? 1 : 0,
                        height: hoveredId === venue.id ? "auto" : 0,
                      }}
                      className="text-zinc-300 text-sm font-light leading-relaxed max-w-sm hidden md:block"
                    >
                      {venue.desc}
                    </motion.p>

                    <div className="flex items-center gap-4 text-orange-500 font-bold uppercase tracking-widest text-[9px]">
                      <span>Discover Menu</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </LayoutGroup>
      </div>

      <MenuModal
        isOpen={!!selectedVenue}
        onClose={() => setSelectedVenue(null)}
        venue={selectedVenue}
      />
    </section>
  );
}

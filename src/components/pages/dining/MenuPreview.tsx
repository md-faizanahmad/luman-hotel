"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCurrencyStore } from "@/store/useCurrencyStore";

const DISHES = [
  {
    name: "Bluefin Crudo",
    basePrice: 28, // Using number for math
    desc: "Citrus oil, caper berries, sea salt",
    image:
      "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=1000",
  },
  {
    name: "Wild Mushroom Risotto",
    basePrice: 34,
    desc: "Black truffle, 24-month parmesan",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=1000",
  },
  {
    name: "Wagyu Tenderloin",
    basePrice: 65,
    desc: "Smoked potato purée, red wine jus",
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1000",
  },
];

export function MenuPreview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Syncing with our global Currency Store
  const { activeCurrency } = useCurrencyStore();

  const handleMouseMove = (e: React.MouseEvent) => {
    // We use clientX/Y for the fixed follow-container
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative py-24 md:py-32 bg-white overflow-hidden cursor-default"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-4"
          >
            Signature Selection
          </motion.span>
          <h2 className="text-5xl md:text-8xl font-serif tracking-tighter leading-none">
            The{" "}
            <span className="italic text-zinc-400 font-light">Degustation</span>
          </h2>
        </div>

        {/* INTERACTIVE MENU LIST */}
        <div className="relative border-t border-zinc-100">
          {DISHES.map((dish, idx) => {
            // Dynamic Price Calculation
            const convertedPrice = Math.round(
              dish.basePrice * activeCurrency.rate
            );

            return (
              <motion.div
                key={dish.name}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="group relative flex justify-between items-center py-10 md:py-14 border-b border-zinc-100 transition-colors duration-500 hover:border-orange-600"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] font-bold text-zinc-300 group-hover:text-orange-500 transition-colors duration-500">
                      0{idx + 1}
                    </span>
                    <h5 className="text-3xl md:text-6xl font-serif text-zinc-950 group-hover:translate-x-4 transition-transform duration-700 ease-out">
                      {dish.name}
                    </h5>
                  </div>
                  <p className="text-sm md:text-base text-zinc-400 font-light ml-12 md:ml-16 max-w-xs md:max-w-md group-hover:translate-x-4 transition-transform duration-700 delay-75 ease-out leading-relaxed">
                    {dish.desc}
                  </p>
                </div>

                <div className="text-right flex flex-col items-end">
                  <motion.span
                    key={activeCurrency.curr} // Re-animate when currency changes
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl md:text-4xl font-serif text-zinc-900"
                  >
                    {activeCurrency.symbol}
                    {convertedPrice.toLocaleString()}
                  </motion.span>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-300 mt-2">
                    Service Incl.
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* KINETIC IMAGE REVEAL (Cursor Follow) */}
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                x: mousePos.x - 150, // Responsive offset
                y: mousePos.y - 400,
              }}
              exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
                mass: 0.6,
              }}
              className="fixed pointer-events-none z-50 w-64 h-80 md:w-80 md:h-112.5 rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]"
            >
              <Image
                src={DISHES[hoveredIndex].image}
                alt={DISHES[hoveredIndex].name}
                fill
                priority
                className="object-cover"
              />
              {/* Luxury Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

              {/* Caption inside the floating reveal */}
              <div className="absolute bottom-8 left-8">
                <p className="text-white text-[10px] font-bold uppercase tracking-widest opacity-60">
                  Signature Dish
                </p>
                <p className="text-white text-xl font-serif italic mt-1">
                  {DISHES[hoveredIndex].name}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BACKGROUND WATERMARK DECOR */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[28vw] font-serif italic text-zinc-50 pointer-events-none select-none z-0 opacity-80">
        Epicure
      </div>
    </section>
  );
}

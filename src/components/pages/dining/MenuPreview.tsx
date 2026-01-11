"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCurrencyStore } from "@/store/useCurrencyStore";

const DISHES = [
  {
    name: "Bluefin Crudo",
    price: "€28",
    desc: "Citrus oil, caper berries, sea salt",
    image:
      "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=1000",
  },
  {
    name: "Wild Mushroom Risotto",
    price: "€34",
    desc: "Black truffle, 24-month parmesan",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=1000",
  },
  {
    name: "Wagyu Tenderloin",
    price: "€65",
    desc: "Smoked potato purée, red wine jus",
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1000",
  },
];

export function MenuPreview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { activeCurrency } = useCurrencyStore();
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative py-32 bg-white overflow-hidden cursor-default"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        {/* HEADER */}
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-4"
          >
            Signature Selection
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-serif">
            The <span className="italic text-zinc-400">Degustation</span>
          </h2>
        </div>

        {/* LIST */}
        <div className="relative z-10">
          {DISHES.map((dish, idx) => (
            <motion.div
              key={dish.name}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative flex justify-between items-center py-10 border-b border-zinc-100 hover:border-orange-600 transition-colors duration-500"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-zinc-300 group-hover:text-orange-600 transition-colors">
                    0{idx + 1}
                  </span>
                  <h5 className="text-3xl md:text-5xl font-serif text-zinc-900 group-hover:translate-x-4 transition-transform duration-500">
                    {dish.name}
                  </h5>
                </div>
                <p className="text-sm text-zinc-400 font-light ml-8 group-hover:translate-x-4 transition-transform duration-500 delay-75">
                  {dish.desc}
                </p>
              </div>

              <div className="text-right">
                <span className="text-2xl font-serif text-zinc-900">
                  {dish.price}
                </span>
                <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-300 mt-1">
                  Excl. Tax
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* IMAGE FOLLOW REVEAL (The Next-Gen Part) */}
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                x: mousePos.x - 200, // Centers image on cursor
                y: mousePos.y - 450, // Offset so it floats above cursor
              }}
              exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
                mass: 0.5,
              }}
              className="fixed pointer-events-none z-50 w-75 h-100 rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <Image
                src={DISHES[hoveredIndex].image}
                alt={DISHES[hoveredIndex].name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BACKGROUND DECOR */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[30vw] font-serif italic text-zinc-50/90 z-0 pointer-events-none select-none">
        Menu
      </div>
    </section>
  );
}

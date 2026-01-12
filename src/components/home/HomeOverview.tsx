"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass, ShieldCheck, Zap } from "lucide-react";

const PHILOSOPHY = [
  {
    title: "The Architecture",
    desc: "Designed to vanish into the coastal cliffs, our structure uses raw stone and floor-to-ceiling glass.",
    icon: <Zap className="w-5 h-5" />,
    img: "https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?q=80&w=1200",
  },
  {
    title: "The Sanctuary",
    desc: "Private terraces and hidden gardens provide a silent refuge from the digital world.",
    icon: <ShieldCheck className="w-5 h-5" />,
    img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200",
  },
];

export default function HomeOverview() {
  return (
    <section className="py-24 md:py-40 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* TOP SECTION: EDITORIAL HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 md:mb-40">
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[10px]"
            >
              Exclusivity Redefined
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-serif mt-6 leading-[0.9] tracking-tighter text-zinc-950"
            >
              A sanctuary built <br />
              <span className="italic text-zinc-400 font-light text-6xl md:text-9xl">
                within the elements.
              </span>
            </motion.h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed border-l-2 border-orange-600 pl-8"
            >
              Luman is more than a destination. It is a dialogue between modern
              minimalism and the untamed power of the ocean. Every corner is a
              frame, every hour is an experience.
            </motion.p>
          </div>
        </div>

        {/* BOTTOM SECTION: STAGGERED VISUALS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* LARGE MAIN IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative aspect-[4/5] md:aspect-[3/4] rounded-[3.5rem] overflow-hidden group shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1500"
              alt="Luman Exterior"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Compass className="w-5 h-5 text-orange-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Coastal Haven
                </span>
              </div>
              <p className="text-2xl font-serif italic">The Silent Horizon</p>
            </div>
          </motion.div>

          {/* SIDE CARDS */}
          <div className="space-y-24">
            {PHILOSOPHY.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="group cursor-default"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-orange-600 border border-zinc-100 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-500">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold text-zinc-900 uppercase tracking-widest">
                    {item.title}
                  </h4>
                </div>

                <p className="text-zinc-500 font-light leading-relaxed mb-8 text-lg">
                  {item.desc}
                </p>

                <div className="relative w-full h-48 rounded-3xl overflow-hidden mb-6">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 group-hover:text-orange-600 transition-colors">
                  Learn More <ArrowUpRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

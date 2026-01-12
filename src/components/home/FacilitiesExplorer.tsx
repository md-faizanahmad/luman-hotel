"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Building2,
  Utensils,
  Sparkles,
  BedDouble,
  Wifi,
  Baby,
  ConciergeBell,
  Stethoscope,
  Dumbbell,
  Scissors,
  Soup,
  Flame,
  ArrowUpRight,
} from "lucide-react";

const CATEGORIES = [
  {
    id: "hotel",
    label: "Hotel",
    icon: <Building2 className="w-4 h-4" />,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000",
    features: [
      {
        name: "Golden Keys Concierge",
        desc: "World-class personalized assistance",
        icon: <ConciergeBell />,
      },
      {
        name: "Inclusive Accessibility",
        desc: "Tailored facilities for specially abled guests",
        icon: <Sparkles />,
      },
      {
        name: "Babysitting Services",
        desc: "Professional care for our youngest guests",
        icon: <Baby />,
      },
      {
        name: "High-Speed Wi-Fi",
        desc: "Standard & Premium fiber-optic options",
        icon: <Wifi />,
      },
    ],
  },
  {
    id: "dining",
    label: "Dining",
    icon: <Utensils className="w-4 h-4" />,
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000",
    features: [
      {
        name: "Chinoiserie",
        desc: "Authentic Schezwan and Cantonese fine dining",
        icon: <Soup />,
      },
      {
        name: "Sonargaon",
        desc: "Bengali & North West Frontier Province cuisine",
        icon: <Flame />,
      },
      {
        name: "Souk",
        desc: "Vibrant Eastern Mediterranean flavors",
        icon: <Utensils />,
      },
      {
        name: "Cal 27",
        desc: "24-hour global all-day dining",
        icon: <Building2 />,
      },
    ],
  },
  {
    id: "wellness",
    label: "Wellness",
    icon: <Sparkles className="w-4 h-4" />,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000",
    features: [
      {
        name: " Salon & Spa",
        desc: "Ancient healing rituals and modern beauty",
        icon: <Scissors />,
      },
      {
        name: "24-Hour Fitness",
        desc: "State-of-the-art strength & cardio center",
        icon: <Dumbbell />,
      },
      {
        name: "Medical Services",
        desc: "24-hour on-call medical assistance",
        icon: <Stethoscope />,
      },
    ],
  },
  {
    id: "rooms",
    label: "Rooms",
    icon: <BedDouble className="w-4 h-4" />,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2000",
    features: [
      {
        name: "Marble Bathrooms",
        desc: "Five-fixture spa-style marble retreats",
        icon: <Sparkles />,
      },
      {
        name: "In-Room Dining",
        desc: "24-hour gourmet service to your door",
        icon: <Utensils />,
      },
      {
        name: "Room Variety",
        desc: "Smoking and non-smoking configurations",
        icon: <BedDouble />,
      },
    ],
  },
];

export function FacilitiesExplorer() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);

  return (
    <section className="py-24 md:py-32 bg-zinc-50 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[10px]">
              Services & Amenities
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-zinc-900 mt-4 tracking-tighter">
              A <span className="italic text-zinc-400 font-light">Legacy</span>{" "}
              of Comfort
            </h2>
          </div>

          {/* TAB SWITCHER */}
          <div className="flex bg-white p-1 rounded-full border border-zinc-200 shadow-sm overflow-x-auto hide-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap
                  ${
                    activeTab.id === cat.id
                      ? "bg-zinc-950 text-white shadow-lg"
                      : "text-zinc-400 hover:text-zinc-600"
                  }
                `}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN DISPLAY AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
          {/* LEFT: CINEMATIC IMAGE (7 Columns) */}
          <div className="lg:col-span-7 relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden group shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={activeTab.image}
                  alt={activeTab.label}
                  fill
                  className="object-cover transition-transform duration-[5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-12 left-12">
                  <h3 className="text-white text-5xl font-serif italic">
                    {activeTab.label}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: FEATURE GRID (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 gap-4"
              >
                {activeTab.features.map((feature, i) => (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 md:p-8 bg-white rounded-3xl border border-zinc-100 group hover:border-orange-500 hover:shadow-xl transition-all duration-500"
                  >
                    <div className="flex gap-6 items-start">
                      <div className="w-12 h-12 shrink-0 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 shadow-inner">
                        {React.cloneElement(feature.icon as React.ReactElement)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest group-hover:text-orange-600 transition-colors">
                          {feature.name}
                        </h4>
                        <p className="text-xs text-zinc-500 font-light mt-2 leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-zinc-200 group-hover:text-orange-600 transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

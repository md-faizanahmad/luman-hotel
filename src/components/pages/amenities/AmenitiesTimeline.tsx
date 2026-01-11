"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";

const TIMELINE_DATA = [
  {
    time: "07:00",
    activity: "Sunrise Yoga",
    location: "Ocean Deck",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2000",
  },
  {
    time: "10:00",
    activity: "Artisan Breakfast",
    location: "The Terrace",
    image:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=2000",
  },
  {
    time: "14:00",
    activity: "Zen Spa Ritual",
    location: "Wellness Wing",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000",
  },
  {
    time: "19:00",
    activity: "Michelin Dining",
    location: "Main Hall",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000",
  },
];

export function AmenitiesTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Precise Index Mapping: Divide scroll into equal segments
  // 0-0.25 (Index 0), 0.25-0.50 (Index 1), etc.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = 1 / TIMELINE_DATA.length;
    const index = Math.min(Math.floor(latest / step), TIMELINE_DATA.length - 1);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-zinc-950">
      {/* 1. STICKY BACKGROUND (Synced to activeIndex) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={TIMELINE_DATA[activeIndex].image}
              alt={TIMELINE_DATA[activeIndex].activity}
              fill
              className="object-cover brightness-[0.35]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-zinc-950" />
          </motion.div>
        </AnimatePresence>

        {/* BACKGROUND LARGE TIME (Synced) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.h2
              key={`bg-time-${activeIndex}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-[25vw] font-serif italic text-white leading-none select-none"
            >
              {TIMELINE_DATA[activeIndex].time}
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>

      {/* 2. FOREGROUND TEXT (Aligned with Scroll Steps) */}
      <div className="relative z-10 mt-[-100vh]">
        {" "}
        {/* Pulls content up to start immediately */}
        {TIMELINE_DATA.map((item, i) => (
          <section key={i} className="h-screen flex items-center px-6 md:px-24">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ amount: 0.5 }} // Syncs trigger point to halfway through viewport
              className="max-w-3xl"
            >
              <p className="text-orange-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-4">
                The Rhythm of Luman • {item.time}
              </p>
              <h2 className="text-6xl md:text-9xl font-serif text-white mb-6">
                {item.activity.split(" ")[0]} <br />
                <span className="italic font-light text-zinc-400">
                  {item.activity.split(" ")[1]}
                </span>
              </h2>
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-orange-600" />
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">
                  {item.location}
                </p>
              </div>
            </motion.div>
          </section>
        ))}
      </div>

      {/* 3. SYNCED PROGRESS BAR */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
        {TIMELINE_DATA.map((_, i) => (
          <div key={i} className="relative flex items-center justify-center">
            <motion.div
              animate={{
                scale: activeIndex === i ? 1.5 : 1,
                backgroundColor: activeIndex === i ? "#ea580c" : "#3f3f46",
              }}
              className="w-2 h-2 rounded-full"
            />
            {activeIndex === i && (
              <motion.div
                layoutId="indicator-ring"
                className="absolute w-5 h-5 border border-orange-600/50 rounded-full"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

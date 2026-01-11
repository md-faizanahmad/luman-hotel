"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function RoomEntrance() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Door panels slide out to the sides
  const leftDoor = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "-100%"]);
  const rightDoor = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "100%"]);

  // The room image scales up as if you are walking in
  const imageScale = useTransform(scrollYProgress, [0.4, 0.8], [0.8, 1.1]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen bg-zinc-950 overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        {/* THE ROOM INTERIOR (Revealed behind doors) */}
        <motion.div
          style={{ scale: imageScale, opacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src="https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa"
            className="w-full h-full object-cover"
            alt="Room Interior"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* THE DOORS */}
        <div className="absolute inset-0 z-10 flex">
          <motion.div
            style={{ x: leftDoor }}
            className="w-1/2 h-full bg-zinc-900 border-r border-orange-900/20 flex items-center justify-end"
          >
            <div className="w-1 h-32 bg-orange-600/50 rounded-l-full" />{" "}
            {/* Door handle detail */}
          </motion.div>

          <motion.div
            style={{ x: rightDoor }}
            className="w-1/2 h-full bg-zinc-900 border-l border-orange-900/20 flex items-center justify-start"
          >
            <div className="w-1 h-32 bg-orange-600/50 rounded-r-full" />
          </motion.div>
        </div>

        {/* OVERLAY TEXT */}
        <motion.div
          style={{ opacity }}
          className="relative z-20 text-center text-white"
        >
          <h2 className="text-5xl md:text-8xl font-serif">Enter Serenity</h2>
          <p className="text-orange-400 tracking-[0.5em] uppercase text-sm mt-4">
            The Royal Penthouse
          </p>
        </motion.div>
      </div>
    </section>
  );
}

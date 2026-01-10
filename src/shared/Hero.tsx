// src/components/hotel/Hero.tsx
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookingBar } from "@/components/hotel/BookingBar";

export default function Hero() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[110vh] w-full overflow-hidden flex items-center justify-center"
    >
      <motion.div style={{ y: videoY }} className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://unsplash.com/photos/a-bedroom-with-a-large-window-cXyLVsx37mk" // High-quality image while video loads
          className="h-full w-full object-cover brightness-[0.65]"
        >
          {/* PATH TO YOUR LOCAL VIDEO IN THE PUBLIC FOLDER */}
          <source
            src="Hero_Section_with_Video_Background.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-zinc-950/80" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-4"
      >
        <motion.h1
          className="text-6xl md:text-9xl font-serif text-white tracking-tighter"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          LUMAN <span className="italic font-light">HOTEL</span>
        </motion.h1>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full z-20">
        <BookingBar />
      </div>
    </section>
  );
}

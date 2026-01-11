"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookingBar } from "@/components/hotel/BookingBar";

interface HeroProps {
  videoSrc: string;
  titlePrimary: string;
  titleSecondary?: string;
  subtitle?: string;
  showBookingBar?: boolean;
  poster?: string;
  height?: string; // e.g., "110vh" or "80vh"
}

export default function Hero({
  videoSrc,
  titlePrimary,
  titleSecondary,
  subtitle,
  showBookingBar = true,
  poster = "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070",
  height = "110vh",
}: HeroProps) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax and Fade logic
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      style={{ height }}
      className="relative w-full overflow-hidden flex items-center justify-center bg-zinc-950"
    >
      {/* VIDEO BACKGROUND */}
      <motion.div style={{ y: videoY }} className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          key={videoSrc} // Forces re-render when video path changes
          poster={poster}
          className="h-full w-full object-cover brightness-[0.6]"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Modern Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-zinc-950/90" />
      </motion.div>

      {/* CONTENT AREA */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-4 pt-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-4"
        >
          {subtitle && (
            <span className="text-white font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs">
              {subtitle}
            </span>
          )}

          <h1 className="text-5xl md:text-9xl font-serif text-white tracking-tighter leading-none">
            {titlePrimary}{" "}
            {titleSecondary && (
              <span className="italic font-light text-zinc-300 block md:inline mt-2 md:mt-0">
                {titleSecondary}
              </span>
            )}
          </h1>
        </motion.div>
      </motion.div>

      {/* OPTIONAL BOOKING BAR */}
      {showBookingBar && (
        <div className="absolute bottom-0 left-0 w-full z-20">
          <BookingBar />
        </div>
      )}
    </section>
  );
}

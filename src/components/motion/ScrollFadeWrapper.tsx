"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React, { ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
}

export default function ScrollFadeWrapper({ children }: Props) {
  const containerRef = useRef(null);

  // 1. Track scroll progress relative to this specific component
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Start animation when top of element enters bottom of screen
  });

  // 2. Map scroll progress to Opacity (0 -> 1 -> 0)
  // This makes it fade in as it enters and fade out as it leaves
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1], // The points in the scroll journey
    [0, 1, 1, 0] // The opacity values at those points
  );

  // 3. Map scroll progress to a subtle Y-translation
  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [100, 0, 0, -100] // Slides up in, stays flat, then slides up out
  );

  // Smooth the movement so it feels organic
  const smoothY = useSpring(y, { damping: 20, stiffness: 100 });

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, y: smoothY }}
      className="will-change-[opacity,transform]"
    >
      {children}
    </motion.div>
  );
}

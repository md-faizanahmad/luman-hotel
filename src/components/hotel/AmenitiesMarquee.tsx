"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue, // Added this
} from "framer-motion";
import { wrap } from "@motionone/utils";
import {
  Sparkles,
  Utensils,
  Wifi,
  Waves,
  Dumbbell,
  Flower2,
} from "lucide-react";

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  // FIX: Use useMotionValue instead of useRef for the X position
  const baseX = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * This is the magic part: It wraps the value between -20% and -45%
   * so the marquee never ends.
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  // We use a ref for the direction to avoid unnecessary re-renders
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Dynamic Direction Change
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    // Update the motion value using .set()
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap py-10 select-none">
      <motion.div
        className="flex flex-nowrap gap-20 text-3xl md:text-3xl font-serif uppercase tracking-tighter"
        style={{ x }}
      >
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}

export default function AmenitiesMarquee() {
  const amenities = [
    { name: "Infinity Pool", icon: <Waves className="w-8 h-8" /> },
    { name: "Michelin Dining", icon: <Utensils className="w-8 h-8" /> },
    { name: "Zen Spa", icon: <Flower2 className="w-8 h-8" /> },
    { name: "Sky Gym", icon: <Dumbbell className="w-8 h-8" /> },
    { name: "Private Butler", icon: <Sparkles className="w-8 h-8" /> },
    { name: "High-Speed Fiber", icon: <Wifi className="w-8 h-8" /> },
  ];

  const content = (
    <div className="flex items-center gap-20">
      {amenities.map((item) => (
        <div key={item.name} className="flex items-center gap-8">
          <span className="text-orange-500">{item.icon}</span>
          <span className="text-zinc-200">{item.name}</span>
          <span className="text-zinc-800">•</span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-10 bg-zinc-950 overflow-hidden border-y border-white/5">
      <div className="opacity-30 hover:opacity-100 transition-opacity duration-700">
        <ParallaxText baseVelocity={-1}>{content}</ParallaxText>
        <ParallaxText baseVelocity={1}>{content}</ParallaxText>
      </div>
    </section>
  );
}

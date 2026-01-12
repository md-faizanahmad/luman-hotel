"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Track scroll progress for the circular border
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after 400px of scrolling
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-8 right-8 z-[100]"
        >
          <button
            onClick={scrollToTop}
            className="group relative flex items-center justify-center w-14 h-14 bg-zinc-950 text-white rounded-full shadow-2xl transition-transform active:scale-90"
            aria-label="Scroll to top"
          >
            {/* PROGRESS CIRCLE INDICATOR */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
              />
              <motion.circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                stroke="#ea580c" // Orange-600
                strokeWidth="2"
                strokeDasharray="1"
                style={{ pathLength: scrollYProgress }}
              />
            </svg>

            {/* ICON */}
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />

            {/* HOVER TOOLTIP */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Top
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

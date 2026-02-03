"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const toggleVisibility = () => {
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-8  right-24 z-100"
        >
          <button
            onClick={scrollToTop}
            className="group relative flex items-center justify-center w-10 h-10 bg-zinc-950 text-white rounded-full shadow-xl active:scale-90 transition-transform"
            aria-label="Scroll to top"
          >
            {/* PROGRESS CIRCLE - Scaled for 40px (w-10) */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
              />
              <motion.circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="#ea580c"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ pathLength: scrollYProgress }}
              />
            </svg>

            {/* ICON - Slightly smaller to fit w-10 */}
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

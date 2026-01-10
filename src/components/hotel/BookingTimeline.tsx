"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const steps = [
  { id: 1, name: "Selection" },
  { id: 2, name: "Guest Details" },
  { id: 3, name: "Payment" },
  { id: 4, name: "Confirmation" },
];

export function BookingTimeline({ currentStep = 1 }) {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between relative max-w-2xl mx-auto">
        {/* BACKGROUND LINE */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-100 -translate-y-1/2 z-0" />

        {/* PROGRESS LINE */}
        <motion.div
          initial={{ width: "0%" }}
          animate={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
          className="absolute top-1/2 left-0 h-0.5 bg-orange-600 -translate-y-1/2 z-0"
        />

        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center gap-3"
            >
              <motion.div
                animate={{
                  backgroundColor:
                    isCompleted || isActive ? "#ea580c" : "#f4f4f5",
                  scale: isActive ? 1.2 : 1,
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors"
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span
                    className={
                      isActive
                        ? "text-white text-xs font-bold"
                        : "text-zinc-400 text-xs font-bold"
                    }
                  >
                    {step.id}
                  </span>
                )}
              </motion.div>
              <span
                className={`text-[10px] uppercase font-bold tracking-widest ${
                  isActive ? "text-zinc-900" : "text-zinc-400"
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

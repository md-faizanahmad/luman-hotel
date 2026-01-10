// src/components/layout/CurrencySwitcher.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const options = [
  { lang: "EN", curr: "USD", symbol: "$" },
  { lang: "EN", curr: "INR", symbol: "₹" },
  { lang: "FR", curr: "EUR", symbol: "€" },
];

export function CurrencySwitcher({ scrolled }: { scrolled: boolean }) {
  const [active, setActive] = React.useState(options[1]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="outline-none">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? "border-zinc-200 text-white"
              : "border-white/20 text-white bg-white/10 backdrop-blur-md"
          }`}
        >
          <span className="text-[10px] font-bold tracking-widest">
            {active.lang} • {active.symbol}
          </span>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white/90 backdrop-blur-xl border-zinc-100 rounded-2xl p-2 shadow-2xl"
      >
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.curr}
            onClick={() => setActive(opt)}
            className="flex z-100 items-center justify-between gap-8 rounded-lg cursor-pointer py-2"
          >
            <span className="text-sm font-medium">
              {opt.curr} ({opt.lang})
            </span>
            {active.curr === opt.curr && (
              <Check className="w-4 h-4 text-orange-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

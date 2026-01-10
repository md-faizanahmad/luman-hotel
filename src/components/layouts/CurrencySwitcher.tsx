"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const options = [
  { lang: "EN", curr: "USD", symbol: "$", rate: 1 },
  { lang: "EN", curr: "INR", symbol: "₹", rate: 83 },
  { lang: "FR", curr: "EUR", symbol: "€", rate: 0.92 },
];

export function CurrencySwitcher({ scrolled }: { scrolled: boolean }) {
  const { activeCurrency, setCurrency } = useCurrencyStore();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="outline-none border-none">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
            scrolled
              ? "border-zinc-200 text-zinc-900 bg-white/50 backdrop-blur-sm"
              : "border-white/20 text-white bg-white/10 backdrop-blur-md"
          }`}
        >
          <span className="text-[10px] font-bold tracking-widest uppercase">
            {activeCurrency.curr} • {activeCurrency.symbol}
          </span>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white/95 backdrop-blur-xl border-zinc-100 rounded-2xl p-2 shadow-2xl z-100"
      >
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.curr}
            onClick={() => setCurrency(opt)}
            className="flex items-center justify-between gap-8 rounded-lg cursor-pointer py-2 px-3 focus:bg-zinc-100"
          >
            <span className="text-sm font-medium text-zinc-800">
              {opt.curr} ({opt.lang})
            </span>
            {activeCurrency.curr === opt.curr && (
              <Check className="w-4 h-4 text-orange-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

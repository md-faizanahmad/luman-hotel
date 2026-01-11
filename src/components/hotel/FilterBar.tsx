"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  "All Suites",
  "Ocean Front",
  "Penthouses",
  "Garden Villas",
  "Wellness",
];

export function FilterBar() {
  const [activeTab, setActiveTab] = useState("All Suites");

  return (
    <div className=" z-40 w-full bg-white/80 backdrop-blur-md border-y border-zinc-100 py-3">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* CATEGORY TABS */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className="relative px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap"
            >
              <span
                className={
                  activeTab === cat ? "text-orange-600" : "text-zinc-400"
                }
              >
                {cat}
              </span>
              {activeTab === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"
                />
              )}
            </button>
          ))}
        </div>

        {/* ADVANCED FILTERS */}
        <div className="flex items-center gap-4 border-l border-zinc-200 pl-6 ml-4">
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex gap-2 text-zinc-600 font-bold uppercase text-[10px] tracking-widest"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Sort By <ChevronDown className="w-3 h-3" />
          </Button>
          <div className="text-[10px] font-bold text-zinc-300 hidden lg:block uppercase tracking-widest">
            Showing 12 Results
          </div>
        </div>
      </div>
    </div>
  );
}

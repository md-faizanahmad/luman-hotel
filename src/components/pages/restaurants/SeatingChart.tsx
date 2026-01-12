"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Info, CheckCircle2, Armchair } from "lucide-react";
import { useCurrencyStore } from "@/store/useCurrencyStore";

// Mock Data for Tables
const TABLES_DATA = [
  { id: 1, x: "20%", y: "30%", size: 4, type: "Standard", status: "available" },
  { id: 2, x: "20%", y: "50%", size: 2, type: "Standard", status: "booked" },
  {
    id: 3,
    x: "45%",
    y: "20%",
    size: 6,
    type: "Ocean View",
    status: "available",
  },
  { id: 4, x: "45%", y: "45%", size: 4, type: "Standard", status: "available" },
  { id: 5, x: "45%", y: "70%", size: 2, type: "Standard", status: "available" },
  {
    id: 6,
    x: "75%",
    y: "30%",
    size: 8,
    type: "Private Booth",
    status: "available",
  },
  {
    id: 7,
    x: "75%",
    y: "60%",
    size: 4,
    type: "Private Booth",
    status: "booked",
  },
];

export function SeatingChart() {
  const [selectedTable, setSelectedTable] = useState<
    (typeof TABLES_DATA)[0] | null
  >(null);
  const { activeCurrency } = useCurrencyStore();

  // Price calculation logic (example: size * base_rate)
  const calculatePrice = (size: number) => {
    const base = 25;
    return Math.round(size * base * activeCurrency.rate);
  };

  return (
    <section className="bg-white py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* LEFT: THE ARCHITECTURAL FLOOR PLAN */}
          <div className="w-full lg:w-3/5 bg-zinc-50 rounded-[3rem] p-8 md:p-12 relative border border-zinc-100 shadow-inner min-h-125 md:min-h-150">
            <div className="absolute top-8 left-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                Main Dining Floor
              </span>
              <h4 className="text-2xl font-serif italic mt-1 text-zinc-900">
                Select Your Table
              </h4>
            </div>

            {/* THE MAP AREA */}
            <div className="relative w-full h-full mt-12 aspect-square md:aspect-auto md:h-112.5">
              {/* Entrance UI Marker */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-white border border-zinc-100 rounded-full text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                Entrance
              </div>

              {/* TABLE NODES */}
              {TABLES_DATA.map((table) => (
                <motion.button
                  key={table.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: table.id * 0.05 }}
                  onClick={() =>
                    table.status === "available" && setSelectedTable(table)
                  }
                  style={{ left: table.x, top: table.y }}
                  className={`absolute group transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300
                    ${
                      table.status === "booked"
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }
                  `}
                >
                  {/* Table Shape (Circle for 2-4, Rectangle for 6+) */}
                  <div
                    className={`relative flex items-center justify-center transition-all duration-500
                    ${
                      table.size > 4
                        ? "w-16 h-24 md:w-20 md:h-32 rounded-2xl"
                        : "w-12 h-12 md:w-16 md:h-16 rounded-full"
                    }
                    ${
                      selectedTable?.id === table.id
                        ? "bg-orange-600 shadow-[0_0_30px_rgba(234,88,12,0.4)]"
                        : table.status === "booked"
                        ? "bg-zinc-200 border-2 border-dashed border-zinc-300"
                        : "bg-white border border-zinc-200 hover:border-orange-600 shadow-sm"
                    }
                  `}
                  >
                    <span
                      className={`text-[10px] font-bold transition-colors
                      ${
                        selectedTable?.id === table.id
                          ? "text-white"
                          : "text-zinc-400"
                      }
                    `}
                    >
                      T-{table.id}
                    </span>

                    {/* Chairs Simulation (Small dots around) */}
                    <div className="absolute -inset-2 pointer-events-none opacity-40">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-300" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-300" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* LEGEND */}
            <div className="absolute bottom-8 right-8 flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white border border-zinc-200" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                  Available
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-200 border-2 border-dashed border-zinc-300" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                  Booked
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: SELECTION DRAWER */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center h-full">
            <AnimatePresence mode="wait">
              {selectedTable ? (
                <motion.div
                  key={selectedTable.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                        <Armchair className="w-6 h-6" />
                      </div>
                      <h3 className="text-4xl font-serif text-zinc-900">
                        Table {selectedTable.id}
                      </h3>
                    </div>
                    <p className="text-zinc-500 font-light leading-relaxed">
                      This {selectedTable.type} table offers the perfect balance
                      of privacy and atmosphere. Ideal for groups of up to{" "}
                      {selectedTable.size} guests.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                      <p className="text-[9px] font-bold uppercase text-zinc-400 mb-1">
                        Capacity
                      </p>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-zinc-900" />
                        <span className="text-sm font-bold text-zinc-900">
                          {selectedTable.size} Guests
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                      <p className="text-[9px] font-bold uppercase text-zinc-400 mb-1">
                        Location
                      </p>
                      <span className="text-sm font-bold text-zinc-900 uppercase tracking-tighter italic">
                        {selectedTable.type}
                      </span>
                    </div>
                  </div>

                  {/* PRICE SYNC */}
                  <div className="pt-8 border-t border-zinc-100 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-1">
                        Service Fee
                      </p>
                      <p className="text-4xl font-serif text-zinc-900">
                        {activeCurrency.symbol}
                        {calculatePrice(selectedTable.size).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 text-[10px] font-bold uppercase">
                      <CheckCircle2 className="w-4 h-4" />
                      Best Spot
                    </div>
                  </div>

                  <button className="w-full py-5 bg-zinc-900 text-white hover:bg-orange-600 transition-all rounded-2xl font-bold uppercase tracking-widest text-xs">
                    Confirm Selection
                  </button>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-zinc-50 rounded-[3rem] border-2 border-dashed border-zinc-200">
                  <Info className="w-8 h-8 text-zinc-300 mb-4" />
                  <p className="text-zinc-400 text-sm italic font-serif">
                    Select a table on the map to view details and pricing.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function BookingBar() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);

  // Control visibility of the popovers
  const [openIn, setOpenIn] = useState(false);
  const [openOut, setOpenOut] = useState(false);

  return (
    <div className="w-full flex justify-center px-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-5xl"
      >
        <div className="bg-white/70 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-[2rem] p-2 flex flex-col md:flex-row items-center gap-1">
          {/* CHECK-IN */}
          <Popover open={openIn} onOpenChange={setOpenIn} modal={false}>
            <PopoverTrigger asChild>
              <button className="flex-1 w-full flex flex-col items-start px-6 py-3 rounded-2xl hover:bg-white/50 transition-all text-left group">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black group-hover:text-orange-600">
                  Check In
                </span>
                <span className="text-sm font-medium text-zinc-800">
                  {checkIn ? format(checkIn, "dd MMM yyyy") : "Add date"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 rounded-3xl border-none shadow-2xl"
              align="start"
            >
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={(date) => {
                  setCheckIn(date);
                  setOpenIn(false); // <--- Closes calendar on click
                  setOpenOut(true); // <--- Auto-opens Check-Out for faster UX
                }}
              />
            </PopoverContent>
          </Popover>

          <div className="hidden md:block w-px h-8 bg-zinc-200" />

          {/* CHECK-OUT */}
          <Popover open={openOut} onOpenChange={setOpenOut} modal={false}>
            <PopoverTrigger asChild>
              <button className="flex-1 w-full flex flex-col items-start px-6 py-3 rounded-2xl hover:bg-white/50 transition-all text-left group">
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-black0 group-hover:text-orange-600">
                  Check Out
                </span>
                <span className="text-sm font-medium text-zinc-800">
                  {checkOut ? format(checkOut, "dd MMM yyyy") : "Add date"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 rounded-3xl border-none shadow-2xl"
              align="start"
            >
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={(date) => {
                  setCheckOut(date);
                  setOpenOut(false); // <--- Closes calendar on click
                }}
                disabled={(date) => (checkIn ? date < checkIn : false)}
              />
            </PopoverContent>
          </Popover>

          <div className="hidden md:block w-px h-8 bg-zinc-200" />

          {/* GUESTS (Kept as standard Popover) */}
          <Popover modal={false}>
            <PopoverTrigger asChild>
              <button className="flex-1 w-full flex flex-col items-start px-6 py-3 rounded-2xl hover:bg-white/50 transition-all text-left group">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black group-hover:text-orange-600">
                  Guests
                </span>
                <span className="text-sm font-medium text-zinc-800">
                  {guests} Adults
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-4 rounded-3xl shadow-2xl border-white/50 bg-white/90 backdrop-blur-lg">
              {/* Guest controls here... */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">Adults</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold">{guests}</span>
                  <button
                    onClick={() => setGuests(guests + 1)}
                    className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* SEARCH */}
          <button className="w-full md:w-auto bg-orange-600 text-white px-8 py-4 rounded-3xl flex items-center justify-center gap-3 font-bold text-sm hover:bg-orange-700 transition-all shadow-lg">
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

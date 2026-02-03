"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { BookingDates } from "./BookingDates";
import { GuestSelector } from "./GuestSelector";
import { BookingSummary } from "../BookingSummary";
import { MAX_GUESTS } from "@/utils/booking";
import { RoomType } from "@/types/rooms";
import { ROOMS } from "@/data/rooms";
import { RoomSelector } from "./RoomSelector";
import { Separator } from "./Separator";

export function BookingBar() {
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState<number>(2);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [room, setRoom] = useState<RoomType | undefined>();

  const isGuestLimitExceeded = guests > MAX_GUESTS;

  return (
    <div className="w-full flex justify-center px-4 relative z-100">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-5xl"
      >
        <div className="bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-[2rem] md:rounded-full p-1.5 flex flex-col md:flex-row gap-1">
          {/* DATE SELECTION */}
          <BookingDates
            checkIn={checkIn}
            checkOut={checkOut}
            onCheckInChange={setCheckIn}
            onCheckOutChange={setCheckOut}
          />
          <RoomSelector rooms={ROOMS} selectedRoom={room} onSelect={setRoom} />

          <Separator />

          {/* GUEST SELECTION */}
          <GuestSelector guests={guests} onChange={setGuests} />

          {/* ACTION */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsSummaryOpen(true)}
            className="md:ml-auto mt-1 bg-zinc-950 text-white h-14 md:h-12 px-8 rounded-3xl md:rounded-full flex items-center justify-center gap-3 hover:bg-orange-600 transition-all"
          >
            <Search size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              {isGuestLimitExceeded ? "Call Hotel" : "Check Availability"}
            </span>
          </motion.button>
        </div>
      </motion.div>

      <BookingSummary
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
        data={{
          checkIn,
          checkOut,
          guests,
          room,
          basePrice: room?.price ?? 0,
        }}
      />
    </div>
  );
}

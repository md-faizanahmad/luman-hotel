"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import { BookingDates } from "./BookingDates";
import { RoomSelector } from "./RoomSelector";
import { GuestSelector } from "./GuestSelector";
import { Separator } from "./Separator";
import { BookingSummary } from "../BookingSummary";

import { MAX_GUESTS } from "@/utils/booking";
import { ROOMS } from "@/data/rooms";
import { RoomType } from "@/types/rooms";

// --- Booking flow steps ---
type BookingStep = "checkin" | "checkout" | "room" | "guests" | "ready";

export function BookingBar() {
  // Core booking state
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [room, setRoom] = useState<RoomType | undefined>();
  const [guests, setGuests] = useState<number>(2);

  // Flow control
  const [step, setStep] = useState<BookingStep>("checkin");

  // Popover control (mobile UX)
  const [openDates, setOpenDates] = useState<"checkin" | "checkout" | null>(
    null,
  );
  const [openRoom, setOpenRoom] = useState(false);
  const [openGuests, setOpenGuests] = useState(false);

  // Summary modal
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const isGuestLimitExceeded = guests > MAX_GUESTS;
  const datesSelected = !!checkIn && !!checkOut;
  // CTA enabled only when flow is complete
  const isReady =
    step === "ready" &&
    !!checkIn &&
    !!checkOut &&
    !!room &&
    guests > 0 &&
    guests <= MAX_GUESTS;

  return (
    <div className="w-full flex justify-center px-4 relative z-100">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-5xl"
      >
        <div className="bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-[2rem] md:rounded-full p-1.5 flex flex-col md:flex-row gap-1">
          {/* --- DATES (CHECK-IN → CHECK-OUT) --- */}
          <BookingDates
            checkIn={checkIn}
            checkOut={checkOut}
            step={step}
            open={openDates}
            onOpenChange={setOpenDates}
            onCheckInChange={(date) => {
              setCheckIn(date);
              setStep("checkout");
              setOpenDates("checkout"); // auto-open checkout
            }}
            onCheckOutChange={(date) => {
              setCheckOut(date);
              setStep("room");
              setOpenDates(null);
              setTimeout(() => setOpenRoom(true), 150); // auto-open room
            }}
          />

          {/* --- ROOM SELECTION --- */}
          <RoomSelector
            rooms={ROOMS}
            disabled={!datesSelected}
            selectedRoom={room}
            open={openRoom}
            onOpenChange={setOpenRoom}
            onSelect={(selected) => {
              setRoom(selected);
              setStep("guests");
              setOpenRoom(false);
              setTimeout(() => setOpenGuests(true), 150); // auto-open guests
            }}
          />

          <Separator />

          {/* --- GUEST SELECTION --- */}
          <GuestSelector
            guests={guests}
            disabled={!datesSelected}
            open={openGuests}
            onOpenChange={setOpenGuests}
            onChange={(count) => {
              setGuests(count);
              if (count > 0 && count <= MAX_GUESTS) {
                setStep("ready");
                setOpenGuests(false);
              }
            }}
          />

          {/* --- ACTION BUTTON --- */}
          <motion.button
            whileHover={isReady ? { scale: 1.02 } : undefined}
            whileTap={isReady ? { scale: 0.98 } : undefined}
            disabled={!isReady}
            onClick={() => setIsSummaryOpen(true)}
            className={`md:ml-auto mt-1 h-14 md:h-12 px-8 rounded-3xl md:rounded-full flex items-center justify-center gap-3 transition-all
              ${
                isReady
                  ? "bg-zinc-950 text-white hover:bg-orange-600"
                  : "bg-zinc-400 text-white cursor-not-allowed"
              }`}
          >
            <Search size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              {isGuestLimitExceeded ? "Call Hotel" : "Check Availability"}
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* --- SUMMARY MODAL --- */}
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

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRoomStore } from "@/store/useRoomStore";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import {
  X,
  BedDouble,
  Maximize,
  Bath,
  Coffee,
  ShieldCheck,
} from "lucide-react";
import VirtualTour from "./VirtualTour";
import Image from "next/image";

export default function RoomDetailModal() {
  const { selectedRoom, setSelectedRoom } = useRoomStore();
  const { activeCurrency } = useCurrencyStore();

  if (!selectedRoom) return null;

  const totalPrice = Math.round(selectedRoom.price * activeCurrency.rate);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center">
        {/* BACKDROP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedRoom(null)}
          className="absolute inset-0 bg-zinc-950/90 backdrop-blur-2xl"
        />

        {/* MODAL CONTAINER */}
        <motion.div
          layoutId={`container-${selectedRoom.id}`}
          className="relative w-full h-full md:h-[95vh] md:max-w-7xl bg-white md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setSelectedRoom(null)}
            className="absolute top-8 right-8 z-110 p-3 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-zinc-900" />
          </button>

          {/* LEFT SIDE: VIRTUAL TOUR & GALLERY */}
          <div className="md:w-[55%] h-1/2 md:h-full bg-zinc-50 p-6 md:p-12 flex flex-col gap-6 overflow-y-auto">
            <motion.div layoutId={`image-${selectedRoom.id}`}>
              <VirtualTour />
            </motion.div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                Room Gallery
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="h-24 md:h-32 rounded-2xl bg-zinc-200 overflow-hidden cursor-pointer"
                  >
                    <Image
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      src={selectedRoom.image}
                      className="w-full h-full object-cover"
                      alt="Gallery item"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: DETAILS & BOOKING */}
          <div className="md:w-[45%] h-1/2 md:h-full p-8 md:p-16 overflow-y-auto flex flex-col">
            <div className="flex-1">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-orange-600 font-bold uppercase tracking-widest text-[10px]"
              >
                Available Now
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-serif mt-2 mb-6 leading-tight">
                {selectedRoom.title}
              </h2>

              <p className="text-zinc-500 font-light leading-relaxed mb-10">
                Experience the pinnacle of coastal luxury. Each suite is curated
                with sustainable materials and features high-fidelity acoustics
                for total immersion in tranquility.
              </p>

              {/* AMENITIES GRID */}
              <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-12">
                <div className="flex items-center gap-4 text-zinc-800">
                  <div className="p-3 bg-zinc-50 rounded-xl">
                    <Maximize className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    85 m² Space
                  </span>
                </div>
                <div className="flex items-center gap-4 text-zinc-800">
                  <div className="p-3 bg-zinc-50 rounded-xl">
                    <BedDouble className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    King Bed
                  </span>
                </div>
                <div className="flex items-center gap-4 text-zinc-800">
                  <div className="p-3 bg-zinc-50 rounded-xl">
                    <Bath className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Marble Tub
                  </span>
                </div>
                <div className="flex items-center gap-4 text-zinc-800">
                  <div className="p-3 bg-zinc-50 rounded-xl">
                    <Coffee className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Butler Service
                  </span>
                </div>
              </div>
            </div>

            {/* STICKY FOOTER ACTION */}
            <div className="pt-8 border-t border-zinc-100 space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    Pricing
                  </p>
                  <p className="text-3xl font-black text-zinc-900">
                    {activeCurrency.symbol}
                    {totalPrice.toLocaleString()}
                    <span className="text-sm font-normal text-zinc-400">
                      {" "}
                      / Night
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-1 text-green-600 text-[10px] font-bold uppercase tracking-tighter">
                  <ShieldCheck className="w-4 h-4" />
                  Best Price Guaranteed
                </div>
              </div>
              <button className="w-full py-5 bg-zinc-950 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-xl shadow-zinc-200">
                Proceed to Reservation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

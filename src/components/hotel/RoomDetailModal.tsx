"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRoomStore } from "@/store/useRoomStore";
import { X, BedDouble, Maximize, Coffee, Bath } from "lucide-react";

export default function RoomDetailModal() {
  const { selectedRoom, setSelectedRoom } = useRoomStore();

  return (
    <AnimatePresence>
      {selectedRoom && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-10">
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRoom(null)}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* CONTENT CARD */}
          <motion.div
            layoutId={`container-${selectedRoom.id}`}
            className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedRoom(null)}
              className="absolute top-6 right-6 z-50 p-3 bg-black/10 hover:bg-black/20 rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* EXPANDED IMAGE */}
            <div className="md:w-1/2 h-1/2 md:h-full relative">
              <motion.img
                layoutId={`image-${selectedRoom.id}`}
                src={selectedRoom.image}
                className="w-full h-full object-cover"
              />
            </div>

            {/* EXPANDED DETAILS */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center overflow-y-auto"
            >
              <span className="text-orange-600 font-bold tracking-widest text-xs uppercase">
                Premium Suite
              </span>
              <h2 className="text-4xl md:text-6xl font-serif mt-2 mb-6">
                {selectedRoom.title}
              </h2>

              <p className="text-zinc-500 font-light leading-relaxed mb-8">
                Indulge in an atmosphere of refined elegance. This suite offers
                panoramic views, hand-crafted Italian furniture, and a
                climate-controlled environment tailored to your comfort.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="flex items-center gap-3 text-zinc-700">
                  <BedDouble className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium">Extra Large King</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-700">
                  <Maximize className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium">120 Square Meters</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-700">
                  <Coffee className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium">Nespresso Machine</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-700">
                  <Bath className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium">Marble Bathtub</span>
                </div>
              </div>

              <button className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-xl shadow-zinc-200">
                Complete Reservation
              </button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

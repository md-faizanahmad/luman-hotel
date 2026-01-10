"use client";

import { motion } from "framer-motion";
import { ROOMS } from "@/lib/data";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useRoomStore } from "@/store/useRoomStore";
import { BedDouble, Maximize, ArrowRight, Star, Wind } from "lucide-react";

export default function RoomGrid() {
  const { activeCurrency } = useCurrencyStore();
  const { setSelectedRoom } = useRoomStore();

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-orange-600 font-bold uppercase tracking-[0.3em] text-xs"
            >
              Accommodation
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-serif text-zinc-900 tracking-tighter">
              Private <span className="italic text-zinc-400">Sanctuaries</span>
            </h2>
          </div>
          <button className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-orange-600 transition-colors border-b border-zinc-200 pb-2">
            Explore All Suites
          </button>
        </div>

        {/* RESPONSIVE GRID / SLIDER */}
        <div className="flex overflow-x-auto pb-10 hide-scrollbar snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-10 gap-4">
          {ROOMS.map((room, index) => (
            <motion.div
              key={room.id}
              layoutId={`container-${room.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedRoom(room)}
              className="min-w-[85vw] md:min-w-full snap-center group cursor-pointer"
            >
              {/* IMAGE WRAPPER WITH SHARED LAYOUT */}
              <div className="relative h-125 md:h-150 w-full rounded-[3rem] overflow-hidden bg-zinc-100">
                <motion.img
                  layoutId={`image-${room.id}`}
                  src={room.image}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={room.title}
                />

                {/* HOVER DETAILS OVERLAY (Desktop Only Logic via CSS) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/60 backdrop-blur-xs hidden md:flex flex-col justify-center items-center text-center p-10 transition-opacity duration-500"
                >
                  <div className="space-y-8 text-white">
                    <div className="flex justify-center gap-8">
                      <div className="flex flex-col items-center gap-3">
                        <BedDouble className="w-6 h-6 text-orange-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">
                          King Bed
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-3">
                        <Maximize className="w-6 h-6 text-orange-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">
                          80 m²
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-3">
                        <Wind className="w-6 h-6 text-orange-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">
                          Climate
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-300 font-light italic leading-relaxed max-w-70">
                      &qout;An architectural masterpiece offering total
                      immersion in luxury and coastal serenity.&qout;
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block px-8 py-3 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest"
                    >
                      View Suite Details
                    </motion.div>
                  </div>
                </motion.div>

                {/* PRICE TAG (Always Syncs with Switcher) */}
                <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-md px-5 py-2 rounded-full shadow-2xl flex items-center gap-2">
                  <span className="text-sm font-black text-zinc-900">
                    {activeCurrency.symbol}
                    {Math.round(
                      room.price * activeCurrency.rate
                    ).toLocaleString()}
                  </span>
                  <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-tighter">
                    / Night
                  </span>
                </div>
              </div>

              {/* CARD FOOTER */}
              <div className="mt-8 flex justify-between items-start px-2">
                <div className="space-y-2">
                  <h3 className="text-3xl font-serif text-zinc-900 group-hover:text-orange-600 transition-colors leading-none">
                    {room.title}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-orange-400 text-orange-400"
                      />
                    ))}
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest ml-2">
                      Luxury Tier
                    </span>
                  </div>
                </div>

                <div className="w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-zinc-900 group-hover:border-zinc-900 group-hover:text-white transition-all duration-500">
                  <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CUSTOM CSS FOR HIDING SCROLLBARS */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

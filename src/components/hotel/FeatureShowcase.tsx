"use client";

import { motion } from "framer-motion";

export default function FeatureShowcase() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* LEFT: IMAGE WITH PARALLAX */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative h-150 rounded-[3rem] overflow-hidden group"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070"
              alt="Luxury Suite"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          </motion.div>

          {/* RIGHT: TEXT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-xs">
              The Luman Experience
            </span>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight text-zinc-900">
              Where Architecture <br />
              <span className="italic text-zinc-400">Meets Nature</span>
            </h2>
            <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-md">
              Our suites are designed to harmonize with the coastal landscape,
              offering floor-to-ceiling windows that turn the horizon into your
              personal gallery.
            </p>
            <motion.button
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 text-zinc-900 font-bold group"
            >
              <span className="border-b-2 border-orange-600 pb-1">
                Explore Amenities
              </span>
              <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all">
                →
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

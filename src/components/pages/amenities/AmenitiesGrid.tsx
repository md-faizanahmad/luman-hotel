"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Utensils, Waves, Flower2, Sparkles } from "lucide-react";

const AMENITY_LIST = [
  {
    title: "Michelin Dining",
    desc: "Led by 3-star chefs, our terrace restaurant offers a sensory journey.",
    icon: <Utensils />,
    image: "https://images.unsplash.com/photo-1616669989627-0cea7f32be2c",
    size: "md:col-span-2",
  },
  {
    title: "Infinity Edge Pool",
    desc: "180-degree views of the coastline.",
    icon: <Waves />,
    image:
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070",
    size: "md:col-span-1",
  },
  {
    title: "Wellness Spa",
    desc: "Ancient rituals meet modern recovery.",
    icon: <Flower2 />,
    image: "https://images.unsplash.com/photo-1554424518-336ec861b705",
    size: "md:col-span-1",
  },
  {
    title: "Private Cinema",
    desc: "A boutique 12-seat theater for private screenings.",
    icon: <Sparkles />,
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070",
    size: "md:col-span-2",
  },
];

export function AmenitiesGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AMENITY_LIST.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${item.size} group relative h-125 rounded-[3rem] overflow-hidden bg-zinc-100 shadow-sm`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
                <div className="p-3 w-fit bg-white/20 backdrop-blur-md rounded-2xl text-white mb-4">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-serif text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-zinc-300 text-sm font-light max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

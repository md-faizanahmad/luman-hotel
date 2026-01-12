"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  Car,
  Plane,
  Train,
  ArrowUpRight,
  Navigation,
} from "lucide-react";

const TRAVEL_MODES = [
  {
    mode: "By Air",
    icon: <Plane />,
    title: "International Arrivals",
    instruction:
      "Private chauffeur service from the International Airport (45 mins). Helicopter transfers available to our rooftop pad.",
  },
  {
    mode: "By Road",
    icon: <Car />,
    title: "Coastal Drive",
    instruction:
      "Follow the Marine Highway south. We are located at the edge of the Alipore cliffs, marked by the stone monolith entrance.",
  },
  {
    mode: "By Rail",
    icon: <Train />,
    title: "The Express",
    instruction:
      "Direct luxury rail links from the Central Station. A 15-minute scenic drive through the heritage district.",
  },
];
export function LocationDirection() {
  // Replace this with your actual Google Maps Embed URL from Google Cloud Console or Share > Embed Map
  const MAP_EMBED_URL =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d65206.442607530895!2d78.3508278263815!3d17.4445558254165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e1!3m2!1sen!2sin!4v1768206816900!5m2!1sen!2sin";

  return (
    <section className="py-24 md:py-40 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* SECTION HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
          <div className="lg:col-span-8">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[10px]"
            >
              The Destination
            </motion.span>
            <h2 className="text-5xl md:text-8xl font-serif text-zinc-950 mt-6 tracking-tighter">
              At the edge <br />
              <span className="italic text-zinc-400 font-light text-6xl md:text-9xl">
                of the world.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-zinc-500 text-lg font-light leading-relaxed mb-6">
              Luman is perched on the secluded Alipore cliffs, where the
              city&apos;s heritage meets the infinite horizon of the ocean.
            </p>
            <button className="group flex items-center gap-3 bg-zinc-950 text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-orange-600 transition-all">
              <Navigation className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Open in Google Maps
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 1. GOOGLE MAP IFRAME CONTAINER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 relative h-[500px] md:h-[700px] rounded-[4rem] overflow-hidden bg-zinc-100 border border-zinc-200 group shadow-2xl"
          >
            {/* Overlay Branding */}
            <div className="absolute top-8 left-8 z-20 pointer-events-none">
              <div className="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-xl border border-white/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-950 rounded-2xl flex items-center justify-center text-white">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-900">
                      Luman Boutique
                    </h4>
                    <p className="text-[9px] text-zinc-500 mt-0.5">
                      34-B Belvedere Road, Alipore
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* THE IFRAME */}
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Luman Boutique Location"
              className="grayscale contrast-[1.1] brightness-[0.95] hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          {/* 2. TRAVEL INFO & NEXT IMAGE */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="space-y-10">
              {TRAVEL_MODES.map((item, i) => (
                <motion.div
                  key={item.mode}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-orange-600">
                      {React.cloneElement(item.icon as React.ReactElement, {})}
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                      {item.mode}
                    </span>
                  </div>
                  <h4 className="text-lg font-serif text-zinc-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed">
                    {item.instruction}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* FEATURED LOCATION IMAGE USING NEXT/IMAGE */}
            <div className="relative h-48 w-full mt-12 rounded-[2.5rem] overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000"
                alt="The Alipore Cliffs"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-[10px] font-bold uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-opacity">
                  The Neighborhood
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

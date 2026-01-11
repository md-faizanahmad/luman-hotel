"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Camera, Plus } from "lucide-react";

// 1. Data Structure for Scenes and their Hotspots
const SCENES = [
  {
    id: "bedroom",
    name: "Master Bedroom",
    url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000",
    hotspots: [
      {
        id: "h1",
        top: "45%",
        left: "55%",
        title: "Egyptian Cotton",
        desc: "1000-thread-count hand-pressed linens.",
      },
      {
        id: "h2",
        top: "60%",
        left: "25%",
        title: "Smart Lighting",
        desc: "Voice-controlled ambient scene settings.",
      },
    ],
  },
  {
    id: "bathroom",
    name: "Marble Spa",
    url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2000",
    hotspots: [
      {
        id: "h3",
        top: "40%",
        left: "70%",
        title: "Rainforest Shower",
        desc: "Dual-head system with heated stone flooring.",
      },
    ],
  },
  {
    id: "balcony",
    name: "Ocean Deck",
    url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2000",
    hotspots: [
      {
        id: "h4",
        top: "50%",
        left: "45%",
        title: "Infinity View",
        desc: "Unobstructed 180° views of the coast.",
      },
    ],
  },
];

export default function VirtualTour() {
  const [currentScene, setCurrentScene] = useState(SCENES[0]);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const springX = useSpring(mouseX, { damping: 40, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 120 });

  const x = useTransform(springX, [0, 100], ["8%", "-8%"]);
  const y = useTransform(springY, [0, 100], ["4%", "-4%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - left) / width) * 100);
    mouseY.set(((e.clientY - top) / height) * 100);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-3">
          <div className="bg-orange-600 p-2 rounded-xl text-white shadow-lg shadow-orange-600/20">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 leading-tight">
              {currentScene.name}
            </h3>
            <p className="text-[10px] text-zinc-400 font-bold uppercase">
              Discover Interior Details
            </p>
          </div>
        </div>
      </div>

      {/* MAIN VIEWER */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(50);
          mouseY.set(50);
        }}
        className="relative h-100 md:h-137.5 w-full rounded-[2.5rem] overflow-hidden bg-zinc-900 md:cursor-none group shadow-2xl"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ x, y, scale: 1.2 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentScene.url}
              alt={currentScene.name}
              fill
              priority
              className="object-cover select-none pointer-events-none brightness-90"
            />

            {/* HOTSPOTS RENDERING */}
            {currentScene.hotspots.map((spot) => (
              <div
                key={spot.id}
                className="absolute"
                style={{ top: spot.top, left: spot.left }}
              >
                <div className="relative">
                  {/* Pulse Animation */}
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-white rounded-full w-8 h-8 -left-4 -top-4 pointer-events-none"
                  />

                  {/* Hotspot Button */}
                  <button
                    onMouseEnter={() => setActiveHotspot(spot.id)}
                    onMouseLeave={() => setActiveHotspot(null)}
                    className="relative w-6 h-6 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl hover:bg-orange-600 hover:text-white transition-colors duration-300 -left-3 -top-3 z-20 pointer-events-auto"
                  >
                    <Plus
                      className={`w-3 h-3 transition-transform ${
                        activeHotspot === spot.id ? "rotate-45" : ""
                      }`}
                    />
                  </button>

                  {/* Tooltip Card */}
                  <AnimatePresence>
                    {activeHotspot === spot.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute bottom-8 left-0 w-48 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl z-30 pointer-events-none"
                      >
                        <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1">
                          Feature
                        </p>
                        <h5 className="text-xs font-bold text-zinc-900 mb-1">
                          {spot.title}
                        </h5>
                        <p className="text-[10px] text-zinc-500 leading-relaxed italic">
                          {spot.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CUSTOM CURSOR & VIGNETTE (Same as before) */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.5)]" />
      </div>

      {/* THUMBNAILS (Same as before) */}
      <div className="grid grid-cols-3 gap-4 h-24">
        {SCENES.map((scene) => (
          <button
            key={scene.id}
            onClick={() => {
              setCurrentScene(scene);
              setActiveHotspot(null);
            }}
            className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
              currentScene.id === scene.id
                ? "ring-2 ring-orange-600 ring-offset-2"
                : "opacity-40 grayscale"
            }`}
          >
            <Image
              src={scene.url}
              alt={scene.name}
              fill
              sizes="150px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

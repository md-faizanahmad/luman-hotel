// src/components/layout/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CurrencySwitcher } from "./CurrencySwitcher";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Rooms", href: "/rooms" },
  { name: "Experiences", href: "/amenities" },
  { name: "Dining", href: "/dining" },
  { name: "Gallery", href: "/gallery" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-1 md:p-6 transition-all duration-500">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`relative flex items-center justify-between px-6 py-2.5 transition-all duration-500 will-change-transform ${
          scrolled
            ? "w-full md:w-[90%] lg:w-[70%] bg-black backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] rounded-full"
            : "w-full bg-transparent border-transparent rounded-none"
        }`}
      >
        {/* LOGO AREA */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="relative h-8 w-8 bg-orange-600 rounded-full flex items-center justify-center overflow-hidden">
            <motion.div
              whileHover={{ y: -30 }}
              className="flex flex-col items-center transition-duration-500"
            >
              <span className="text-white font-bold text-lg">L</span>
              <span className="text-white font-bold text-lg">H</span>
            </motion.div>
          </div>
          <span
            className={`text-xl font-serif font-bold tracking-tighter transition-colors duration-300 ${
              scrolled ? "text-white" : "text-white"
            }`}
          >
            LUMAN
          </span>
        </Link>

        {/* CENTER NAV (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative px-4 py-2 group"
            >
              <span
                className={`text-xs uppercase tracking-[0.2em] font-semibold transition-colors ${
                  scrolled
                    ? "text-white group-hover:text-orange-600"
                    : "text-white/80 group-hover:text-white"
                }`}
              >
                {link.name}
              </span>
              <motion.span
                className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-orange-600 group-hover:w-1/2 transition-all duration-300"
                style={{ translateX: "-50%" }}
              />
            </Link>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <CurrencySwitcher scrolled={scrolled} />
          </div>

          <Link href="/restaurants">
            <Button
              className={`rounded-full px-6 transition-all duration-500 ${
                scrolled
                  ? "bg-zinc-900 text-white hover:bg-orange-600"
                  : "bg-white text-zinc-900 hover:bg-orange-400"
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider">
                Book Now
              </span>
            </Button>
          </Link>

          {/* MOBILE TOGGLE */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                className={`md:hidden p-2 rounded-3xl transition-colors ${
                  scrolled
                    ? "text-white cursor-pointer hover:bg-orange-400"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-100 border-none bg-zinc-950 text-white p-0 overflow-hidden [&>button]:hidden"
            >
              {/* HIDDEN LOGIC FOR ACCESSIBILITY */}
              <VisuallyHidden.Root>
                <SheetTitle>Luman Navigation</SheetTitle>
                <SheetDescription>
                  Explore suites and experiences
                </SheetDescription>
              </VisuallyHidden.Root>

              <div className="flex flex-col h-full p-8 md:p-12 justify-between relative">
                {/* 1. CUSTOM CLOSE BUTTON - Positioned for better UX */}
                <div className="flex justify-end pt-4">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLinkClick}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-orange-600 hover:border-orange-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* 2. NAVIGATION LINKS */}
                <div className="space-y-10">
                  <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold">
                    Discover Luman
                  </p>
                  <nav className="flex flex-col gap-4 md:gap-6">
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.name}
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          delay: i * 0.1,
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={handleLinkClick}
                          className="text-5xl md:text-7xl font-serif italic hover:text-orange-500 transition-colors flex items-center justify-between group"
                        >
                          <span className="relative">
                            {link.name}
                            {/* Underline on Hover */}
                            <motion.span className="absolute -bottom-2 left-0 h-1 bg-orange-600 w-0 group-hover:w-full transition-all duration-500" />
                          </span>
                          <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all w-10 h-10 md:w-12 md:h-12" />
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                {/* 3. MOBILE FOOTER ACTIONS */}
                <div className="space-y-8">
                  <div className="h-px bg-white/10 w-full" />
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <CurrencySwitcher scrolled={false} />
                      <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        <a
                          href="#"
                          className="hover:text-white transition-colors"
                        >
                          Instagram
                        </a>
                        <a
                          href="#"
                          className="hover:text-white transition-colors"
                        >
                          Facebook
                        </a>
                      </div>
                    </div>

                    {/* Secondary Info */}
                    <p className="text-[9px] text-zinc-600 uppercase tracking-widest leading-loose">
                      123 Luxury Avenue, Coastal Road <br />
                      Mumbai, MH 400001
                    </p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.header>
    </div>
  );
}

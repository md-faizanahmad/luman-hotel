"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // Added X for close icon
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
  { name: "Amenities", href: "/amenities" },
  { name: "Dining", href: "/dining" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className={`text-2xl font-serif font-bold tracking-tight transition-colors ${
            isScrolled ? "text-black" : "text-gray-400"
          }`}
        >
          LUMAN
          <span className={isScrolled ? "text-orange-600" : "text-orange-400"}>
            HOTEL
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                isScrolled ? "text-zinc-700" : "text-white/90"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          <div className={isScrolled ? "text-zinc-800" : "text-white"}>
            <CurrencySwitcher />
          </div>
          <Button variant={isScrolled ? "outline" : "secondary"} size="sm">
            Sign Up
          </Button>
          <Button
            size="sm"
            className="bg-orange-600 hover:bg-orange-700 text-white border-none"
          >
            Book Now
          </Button>
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden flex items-center gap-3">
          <Button size="sm" className="bg-orange-600 h-8 px-3">
            Book
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={isScrolled ? "text-black" : "text-white"}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-75 bg-white">
              {/* ACCESSIBILITY FIXES START */}
              <VisuallyHidden.Root>
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>
                  Access hotel rooms, amenities, and booking options.
                </SheetDescription>
              </VisuallyHidden.Root>
              {/* ACCESSIBILITY FIXES END */}

              <nav className="flex flex-col gap-6 mt-12">
                <div className="flex flex-col gap-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                    Menu
                  </p>
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-xl font-serif hover:text-orange-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <hr className="my-4" />

                <div className="flex flex-col gap-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                    Settings
                  </p>
                  <CurrencySwitcher isMobile={true} />
                  <Button
                    variant="outline"
                    className="w-full justify-start font-normal"
                  >
                    Sign Up
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}

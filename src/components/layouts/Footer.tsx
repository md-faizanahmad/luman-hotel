"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const footerLinks = {
  about: [
    { name: "Our Story", href: "#" },
    { name: "Sustainability", href: "#" },
    { name: "Careers", href: "#" },
    { name: "News & Press", href: "#" },
  ],
  services: [
    { name: "Fine Dining", href: "#" },
    { name: "Spa & Wellness", href: "#" },
    { name: "Events & Weddings", href: "#" },
    { name: "Concierge", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Accessibility", href: "#" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-950 text-zinc-400 pt-32 pb-12 overflow-hidden border-t border-white/5">
      {/* 1. BACKGROUND WATERMARK - Visual Depth */}
      <div className="absolute -bottom-10 left-0 right-0 pointer-events-none select-none overflow-hidden">
        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 0.03 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[25vw] font-serif text-white leading-none text-center"
        >
          LUMAN
        </motion.h2>
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* BRAND & INTRO */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="group block">
              <span className="text-3xl font-serif font-bold tracking-tighter text-white">
                LUMAN
                <span className="italic font-light text-zinc-600 group-hover:text-orange-600 transition-colors">
                  HOTEL
                </span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs font-light tracking-wide">
              An architectural sanctuary where raw coastal nature meets refined
              luxury. Experience serenity redesigned.
            </p>

            {/* SOCIALS - Minimalist style */}
            <div className="flex gap-5 pt-4">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ y: -5, color: "#fff" }}
                  className="p-3 rounded-full border border-white/10 hover:border-orange-600 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* DYNAMIC LINKS - Better Hierarchy */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.3em]">
                Explore
              </h4>
              <ul className="space-y-4">
                {footerLinks.about.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-all flex items-center group"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-orange-600 mr-0 group-hover:mr-2 transition-all opacity-0 group-hover:opacity-100" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.3em]">
                Experiences
              </h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-all flex items-center group"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-orange-600 mr-0 group-hover:mr-2 transition-all opacity-0 group-hover:opacity-100" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* NEWSLETTER - High End Boutique Style */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.3em]">
              The Inner Circle
            </h4>
            <p className="text-sm font-light">
              Join for private invitations and seasonal reveals.
            </p>
            <div className="relative border-b border-white/10 pb-2 group focus-within:border-orange-600 transition-colors">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent text-lg font-serif italic text-white w-full outline-none placeholder:text-zinc-700"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-orange-600 hover:text-white transition-colors">
                <ArrowUpRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* CONTACT BAR - Clean Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-white/5 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
          <div className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
            <MapPin className="w-4 h-4 text-orange-600" />
            <span>Coastal Road, Mumbai, MH</span>
          </div>
          <div className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors justify-start md:justify-center">
            <Phone className="w-4 h-4 text-orange-600" />
            <span>+91 22 1234 5678</span>
          </div>
          <div className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors justify-start md:justify-end">
            <Mail className="w-4 h-4 text-orange-600" />
            <span>reservations@luman.com</span>
          </div>
        </div>

        {/* LEGAL BOTTOM */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-700">
          <p>© {currentYear} LUMAN HOTEL GROUP. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-zinc-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

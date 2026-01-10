"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-8 border-t border-zinc-800">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* BRAND & NEWSLETTER */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="text-2xl font-serif font-bold tracking-tight text-white"
            >
              LUMAN<span className="font-light text-zinc-500">HOTEL</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Experience the pinnacle of luxury and comfort. Subscribe to our
              newsletter for exclusive offers and seasonal updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-zinc-900 border-zinc-800 text-sm px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600 flex-1"
              />
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                Join
              </Button>
            </div>
          </div>

          {/* DYNAMIC LINKS */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h4 className="text-white font-semibold mb-6">Explore</h4>
              <ul className="space-y-4 text-sm">
                {footerLinks.about.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-orange-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Experiences</h4>
              <ul className="space-y-4 text-sm">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-orange-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-600 shrink-0" />
                <span>
                  123 Luxury Avenue, Coastal Road,
                  <br />
                  Mumbai, MH 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-600 shrink-0" />
                <span>+91 22 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-600 shrink-0" />
                <span>reservations@lumanhotel.com</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-8">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="bg-zinc-900 p-2 rounded-full hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {currentYear} Luman Hotel Group. All rights reserved.</p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
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

// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Modern font pairing
import "./globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

// Setup Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Luman Hotel | Luxury Rediscovered",
  description: "Experience world-class hospitality and elegant stays.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {/* Header appears on every page */}
        <Header />

        {/* The 'children' is where your individual page.tsx content loads */}
        <main>{children}</main>

        {/* Footer appears on every page */}
        <Footer />
      </body>
    </html>
  );
}

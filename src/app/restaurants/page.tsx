import ScrollFadeWrapper from "@/components/motion/ScrollFadeWrapper";
import { MenuPreview } from "@/components/pages/dining/MenuPreview";
import { SeatingChart } from "@/components/pages/restaurants/SeatingChart";
import { TableSelector } from "@/components/pages/restaurants/TableSelector";
import Hero from "@/shared/Hero";

export default function RestaurantPage() {
  return (
    <main className="bg-white">
      {/* 1. Cinematic Hero */}
      <Hero
        videoSrc="/videos/restaurant_slow_mo.mp4"
        titlePrimary="THE"
        titleSecondary="TERRACE"
        subtitle="A Michelin Star Experience"
        showBookingBar={false}
        height="100vh"
      />

      {/* 2. Brand Ethos Section */}
      <ScrollFadeWrapper>
        <div className="py-20 md:py-32 text-center max-w-4xl mx-auto px-6">
          <span className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[10px]">
            Gastronomy
          </span>
          <h2 className="text-4xl md:text-7xl font-serif mt-6 leading-tight">
            Where raw{" "}
            <span className="italic text-zinc-400">coastal spirit</span> meets
            culinary precision.
          </h2>
        </div>
      </ScrollFadeWrapper>

      {/* 3. Immersive Table Selection (The 360 View) */}
      <TableSelector />
      <SeatingChart />
      {/* 4. Interactive Menu Reveal */}
      <div className="relative z-10 bg-white rounded-t-[3rem] -mt-12">
        <MenuPreview />
      </div>

      {/* 5. Luxury Footer */}
    </main>
  );
}

import ScrollFadeWrapper from "@/components/motion/ScrollFadeWrapper";
import { DiningConcepts } from "@/components/pages/dining/DiningConcepts";
import { MenuPreview } from "@/components/pages/dining/MenuPreview";
import Hero from "@/shared/Hero";

export default function DiningPage() {
  return (
    <main>
      <Hero
        videoSrc="Hotel_Dining_Hero_Video_Generated.mp4"
        titlePrimary="SENSORY"
        titleSecondary="JOURNEY"
        subtitle="The Art of Gastronomy"
        showBookingBar={false}
        height="90vh"
      />

      {/* 1. Venue Introduction */}
      <ScrollFadeWrapper>
        <div className="py-24 text-center max-w-3xl mx-auto px-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-orange-600 mb-6">
            Epicurean Excellence
          </h2>
          <p className="text-3xl md:text-5xl font-serif text-zinc-900 leading-tight">
            From farm-to-table terrace brunches to{" "}
            <span className="italic text-zinc-400">Michelin-starred</span>{" "}
            evening rituals.
          </p>
        </div>
      </ScrollFadeWrapper>

      {/* 2. Venue Showcase */}
      <DiningConcepts />

      {/* 3. The Menu Reveal */}
      <MenuPreview />

      {/* 4. Footer */}
    </main>
  );
}

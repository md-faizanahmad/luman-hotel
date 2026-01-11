import AmenitiesMarquee from "@/components/hotel/AmenitiesMarquee";
import ScrollFadeWrapper from "@/components/motion/ScrollFadeWrapper";
import FeatureShowcase from "@/components/hotel/FeatureShowcase";
import Hero from "@/shared/Hero";
import { AmenitiesGrid } from "@/components/pages/amenities/AmenitiesGrid";

export default function AmenitiesPage() {
  return (
    <main>
      <Hero
        videoSrc="Hotel_Amenities_Hero_Video_Generated.mp4"
        titlePrimary="CURATED"
        titleSecondary="LIVING"
        subtitle="The Luman Signature Services"
        showBookingBar={false}
        height="80vh"
      />

      {/* 1. The Kinetic Marquee (Directional Scroll) */}
      <div className="bg-zinc-950 py-10">
        <AmenitiesMarquee />
      </div>

      {/* 2. Visual Deep Dive */}
      <ScrollFadeWrapper>
        <AmenitiesGrid />
      </ScrollFadeWrapper>

      {/* 3. Reusing Brand Story for specific highlight (e.g., The Spa) */}
      <ScrollFadeWrapper>
        <FeatureShowcase />
      </ScrollFadeWrapper>

      {/* 4. Luxury Conclusion */}
      <section className="h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-white">
        <h2 className="text-4xl md:text-6xl font-serif text-zinc-900 mb-6">
          Every detail, <span className="italic text-zinc-400">mastered.</span>
        </h2>
        <button className="px-10 py-4 bg-zinc-900 text-white rounded-full font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors">
          Download Experience Guide
        </button>
      </section>
    </main>
  );
}

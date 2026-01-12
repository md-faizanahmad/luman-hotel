import { FacilitiesExplorer } from "@/components/home/FacilitiesExplorer";
import HomeOverview from "@/components/home/HomeOverview";
import { LocationDirection } from "@/components/home/LocationDirection";
import { RoomsFeaturette } from "@/components/home/RoomsFeaturette";
import AmenitiesMarquee from "@/components/hotel/AmenitiesMarquee";
import FeatureShowcase from "@/components/hotel/FeatureShowcase";
// import { FilterBar } from "@/components/hotel/FilterBar";
import RoomDetailModal from "@/components/hotel/RoomDetailModal";
import RoomGrid from "@/components/hotel/RoomGrid";
import ScrollFadeWrapper from "@/components/motion/ScrollFadeWrapper";
import { FAQ } from "@/shared/FAQ";
import Hero from "@/shared/Hero";
import { SocialProof } from "@/shared/SocialProof";

export default function Home() {
  return (
    <main className="">
      <Hero
        videoSrc="Hero_Section.mp4"
        titlePrimary="LUMAN"
        titleSecondary="HOTEL"
        subtitle="Luxury Rediscovered"
        showBookingBar={true}
      />
      <ScrollFadeWrapper>
        <FeatureShowcase />
      </ScrollFadeWrapper>
      <AmenitiesMarquee />
      <HomeOverview />
      <RoomsFeaturette />
      <FacilitiesExplorer />
      <ScrollFadeWrapper>
        <RoomGrid />
      </ScrollFadeWrapper>
      <LocationDirection />
      <FAQ />
      <SocialProof />
      <RoomDetailModal />
      {/* Extra content to enable scrolling */}
      <div className="h-screen bg-zinc-50 flex items-center justify-center">
        <h2 className="text-3xl font-serif text-zinc-400 italic">
          Discover the Art of Living
        </h2>
      </div>
    </main>
  );
}

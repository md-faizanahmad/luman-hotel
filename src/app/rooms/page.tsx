import { FilterBar } from "@/components/hotel/FilterBar";
import RoomGrid from "@/components/hotel/RoomGrid";
import RoomEntrance from "@/components/pages/rooms/RoomEntrance";
import RoomComparison from "@/components/pages/rooms/RoomComparison";
import Hero from "@/shared/Hero";
import VirtualTour from "@/components/pages/rooms/VirtualTour";
import RoomDetailModal from "@/components/pages/rooms/RoomDetailModal";

// This is a Server Component
export default async function RoomsPage() {
  // Imagine fetching room data from your API here later
  // const rooms = await fetchRooms();
  return (
    <main>
      {/* 1. Introductory Hero */}
      <Hero
        videoSrc="Hotel_Check_In.mp4"
        titlePrimary="Our "
        titleSecondary="Collections"
        subtitle="Select Your Sanctuary"
        showBookingBar={false}
        height="90vh"
      />

      {/* 2. Interactive Entrance Animation */}
      <RoomEntrance />

      {/* 3. Filtering and Navigation */}
      <div className="relative z-30 bg-white">
        <FilterBar />
        <RoomGrid />
      </div>

      {/* 4. Deep Detail Comparison */}
      <RoomComparison />

      {/* 5. Client Side Modals */}
      <RoomDetailModal />
      <div className="p-8">
        <VirtualTour />
      </div>
    </main>
  );
}

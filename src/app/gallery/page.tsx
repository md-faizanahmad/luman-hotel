import Hero from "@/shared/Hero";

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
    </main>
  );
}

import Hero from "@/shared/Hero";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Extra content to enable scrolling */}
      <div className="h-screen bg-zinc-50 flex items-center justify-center">
        <h2 className="text-3xl font-serif text-zinc-400 italic">
          Discover the Art of Living
        </h2>
      </div>
    </main>
  );
}

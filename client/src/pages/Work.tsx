import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Work() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      <main className="pt-32 pb-24 relative">
        <BackgroundBeams className="opacity-40" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mb-24 mx-auto text-center">
            <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 tracking-tighter">Our Work</h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
              We don't just design interfaces; we engineer digital operating layers that power businesses.
            </p>
          </div>

          <FeaturedWork />
        </div>
      </main>
      <Footer />
    </div>
  );
}
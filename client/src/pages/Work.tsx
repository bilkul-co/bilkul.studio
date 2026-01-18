import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FeaturedWork } from "@/components/sections/FeaturedWork";

export default function Work() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Selected Works</h1>
            <p className="text-xl text-muted-foreground">
              A collection of digital systems engineered for impact.
            </p>
          </div>
          <FeaturedWork />
        </div>
      </main>
      <Footer />
    </div>
  );
}
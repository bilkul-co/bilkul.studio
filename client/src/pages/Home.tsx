import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { DemoTeaser } from "@/components/sections/DemoTeaser";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { FAQ } from "@/components/sections/FAQ";
import { LeadForm } from "@/components/sections/LeadForm";
import { FloatingObjects } from "@/components/ui/floating-objects";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 relative">
      <FloatingObjects />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <TrustBar />
        <DemoTeaser />
        <ServicesGrid />
        <ProcessTimeline />
        <FeaturedWork />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
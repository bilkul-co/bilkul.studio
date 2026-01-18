import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { FAQ } from "@/components/sections/FAQ";
import { LeadForm } from "@/components/sections/LeadForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
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
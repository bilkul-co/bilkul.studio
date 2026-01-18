import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/glass-card";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-12">Engineered for Trust.</h1>
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-2xl leading-relaxed text-muted-foreground mb-8">
              Bilkul Digital Studio is not a creative agency. We are a systems studio.
            </p>
            <p className="mb-6">
              Founded in 2024, we saw a gap in the UAE market. Businesses were buying "websites" but needing "operating systems." They were getting pretty pixels that broke under pressure, or clunky enterprise software that users hated.
            </p>
            <p className="mb-6">
              We sit in the middle. We bring the rigor of software engineering to the art of digital experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-16">
            <GlassCard className="p-8">
              <h3 className="text-xl font-bold mb-2">Our Philosophy</h3>
              <p className="text-muted-foreground">Functionality is the baseline. Delight is the goal.</p>
            </GlassCard>
            <GlassCard className="p-8">
              <h3 className="text-xl font-bold mb-2">Our Promise</h3>
              <p className="text-muted-foreground">We build systems that you own, understand, and can scale.</p>
            </GlassCard>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
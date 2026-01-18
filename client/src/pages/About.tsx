import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/glass-card";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      <main className="pt-32 pb-24 relative">
        <BackgroundBeams className="opacity-30" />
        
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="mb-24">
            <span className="text-primary font-mono text-sm tracking-[0.2em] uppercase mb-6 block">The Studio</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-12 tracking-tight leading-[0.9]">
              Engineered for <br /><span className="text-gradient-primary">Trust.</span>
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none text-muted-foreground font-light leading-relaxed">
              <p className="text-2xl text-white mb-10 font-medium">
                Bilkul Digital Studio is not a creative agency. We are a systems studio.
              </p>
              <p className="mb-8">
                Founded in 2024, we identified a critical gap in the UAE market. Businesses were purchasing "websites" when they actually needed "operating systems." They received beautiful pixels that crumbled under pressure, or clunky enterprise software that users despised.
              </p>
              <p className="mb-8">
                We occupy the middle ground. We bring the rigor of software engineering to the art of digital experience. We believe that true luxury in the digital age is reliability, speed, and intuitive design.
              </p>
              <p>
                Our team consists of product engineers, system architects, and motion designers who have shipped for global unicorns. Now, we are building the digital infrastructure for the next generation of MENA giants.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-10" spotlight>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Philosophy</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Functionality is the baseline. Delight is the goal. Every interaction should feel earned, weighted, and precise.</p>
            </GlassCard>
            <GlassCard className="p-10" spotlight>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Promise</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">We build systems that you own, understand, and can scale. No black boxes. No vendor lock-in.</p>
            </GlassCard>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
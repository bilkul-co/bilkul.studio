import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/glass-card";
import { FloatingObjects } from "@/components/ui/floating-objects";
import { motion } from "framer-motion";
import { transitions } from "@/lib/motion";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20 relative home-wrapper">
      <FloatingObjects />
      <Navbar />
      <main className="pt-32 pb-24 relative z-10">
        
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={transitions.page}
            className="mb-24"
          >
            <span className="text-[var(--aquamarine)] font-mono text-sm tracking-[0.2em] uppercase mb-6 block">The Studio</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-12 tracking-tight leading-[0.9] text-white">
              Engineered for <br /><span className="text-gradient-primary">Trust.</span>
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none text-white/70 font-light leading-relaxed">
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
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                <GlassCard className="p-10 h-full bg-white/[0.02] border-white/5" spotlight>
                <h3 className="text-2xl font-bold mb-4 text-white">Our Philosophy</h3>
                <p className="text-white/60 text-lg leading-relaxed font-light">Functionality is the baseline. Delight is the goal. Every interaction should feel earned, weighted, and precise.</p>
                </GlassCard>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
            >
                <GlassCard className="p-10 h-full bg-white/[0.02] border-white/5" spotlight>
                <h3 className="text-2xl font-bold mb-4 text-white">Our Promise</h3>
                <p className="text-white/60 text-lg leading-relaxed font-light">We build systems that you own, understand, and can scale. No black boxes. No vendor lock-in.</p>
                </GlassCard>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { MotionButton } from "@/components/ui/motion-button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ArrowRight, ShieldCheck, Zap, BarChart } from "lucide-react";
import { transitions } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-background">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none noise-bg mix-blend-overlay" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none mask-gradient-b" />
      
      <BackgroundBeams />

      <div className="container mx-auto px-6 relative z-20 text-center">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={transitions.page}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm font-medium text-muted-foreground mb-8 backdrop-blur-md shadow-2xl"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
              <span className="text-xs uppercase tracking-widest font-mono">Systems Studio • UAE</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-bold tracking-tighter leading-[0.9] mb-8 text-gradient drop-shadow-sm">
              Systems for the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-white/80">Next Generation.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              We engineer premium digital ecosystems, portals, and AI workflows. 
              <br className="hidden md:block"/> Not just websites—we architect trust.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/contact">
                <MotionButton size="lg" className="h-14 px-10 text-base rounded-full bg-foreground text-background hover:bg-white/90 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] border-none font-semibold">
                  Book a Discovery Call
                </MotionButton>
              </Link>
              <Link href="/services">
                <MotionButton variant="outline" size="lg" className="h-14 px-10 text-base rounded-full border-white/10 hover:bg-white/5 backdrop-blur-md font-medium text-foreground">
                  View Services
                </MotionButton>
              </Link>
            </div>

            {/* Proof Layer */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-60">
               {[
                 { icon: ShieldCheck, text: "Security-First" },
                 { icon: Zap, text: "High Performance" },
                 { icon: BarChart, text: "Data-Driven" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-muted-foreground">
                    <item.icon size={14} className="text-primary" />
                    {item.text}
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
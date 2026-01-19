import { MotionButton } from "@/components/ui/motion-button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ArrowRight, ShieldCheck, Zap, BarChart } from "lucide-react";
import { transitions } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-24 overflow-hidden">
      {/* Aurora Gradient Background */}
      <div className="absolute inset-0 aurora-bg opacity-40 pointer-events-none" />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none noise-bg mix-blend-overlay" />
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none mask-gradient-b" />
      
      <BackgroundBeams className="opacity-40" />
      
      {/* Watermark Logo (Very subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] opacity-[0.02] pointer-events-none z-0">
         <img src="/brand/logo.png" className="w-full h-full object-contain" alt="" />
      </div>

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
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-sm font-medium text-white/80 mb-10 backdrop-blur-md shadow-2xl hover:bg-white/[0.08] transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--aquamarine)] animate-pulse shadow-[0_0_10px_var(--aquamarine)]" />
              <span className="text-xs uppercase tracking-[0.2em] font-mono">Systems Studio • UAE</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-7xl lg:text-9xl font-display font-bold tracking-tighter leading-[0.9] mb-8 text-white drop-shadow-lg">
              Systems for the <br />
              <span className="text-gradient-primary">Next Generation.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
              We engineer premium digital ecosystems, portals, and AI workflows. 
              <br className="hidden md:block"/> Not just websites—we architect trust.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Link href="/contact">
                <MotionButton size="lg" className="h-16 px-12 text-lg rounded-full font-bold shadow-[0_0_40px_-10px_rgba(45,107,255,0.4)]">
                  Start Your Project
                </MotionButton>
              </Link>
              <Link href="/services">
                <MotionButton variant="outline" size="lg" className="h-16 px-12 text-lg rounded-full border-white/10 hover:bg-white/5 backdrop-blur-md font-medium text-white">
                  View Services
                </MotionButton>
              </Link>
            </div>

            {/* Proof Layer */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 border-t border-white/[0.05] pt-10">
               {[
                 { icon: ShieldCheck, text: "Security-First" },
                 { icon: Zap, text: "High Performance" },
                 { icon: BarChart, text: "Data-Driven" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 text-sm font-mono uppercase tracking-wider text-white/40">
                    <item.icon size={16} className="text-[var(--rare-blue)]" />
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
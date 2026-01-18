import { MotionButton } from "@/components/ui/motion-button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { BackgroundBeams } from "@/components/ui/background-beams";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none noise-bg mix-blend-overlay" />
      
      <BackgroundBeams />

      <div className="container mx-auto px-6 relative z-20 text-center">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-muted-foreground mb-8 backdrop-blur-md shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              The Digital Operating Layer
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 drop-shadow-2xl">
              Systems for the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-white/50">Next Generation.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Bilkul Digital Studio engineers premium digital ecosystems, portals, and AI workflows. We don't just design websites; we architect trust.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/contact">
                <MotionButton size="lg" className="h-14 px-10 text-lg rounded-full bg-white text-black hover:bg-white/90 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] border-none">
                  Start Your Project
                </MotionButton>
              </Link>
              <Link href="/services">
                <MotionButton variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full border-white/10 hover:bg-white/5 backdrop-blur-md">
                  Explore Services
                </MotionButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Premium Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-mono">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white to-transparent" />
      </motion.div>
    </section>
  );
}
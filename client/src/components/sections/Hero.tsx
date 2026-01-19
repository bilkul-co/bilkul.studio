import { MotionButton } from "@/components/ui/motion-button";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ArrowRight, ShieldCheck, Zap, BarChart, Play } from "lucide-react";
import { transitions } from "@/lib/motion";
import { FluidBackground } from "@/components/ui/fluid-background";
import { FloatingObjects } from "@/components/ui/floating-objects";
import { useRef } from "react";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-center justify-center pt-24 overflow-hidden">
      {/* Video Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-lighten opacity-60">
        <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover scale-110 opacity-40 blur-sm"
        >
            <source src="/assets/sphere-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Liquid Fluid Background */}
      <FluidBackground className="opacity-80 mix-blend-screen" />
      
      {/* Floating 3D Objects Layer */}
      <FloatingObjects />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none noise-bg mix-blend-overlay" />
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none mask-gradient-b" />
      
      <BackgroundBeams className="opacity-30" />

      <div className="container mx-auto px-6 relative z-20 text-center perspective-1000">
        <motion.div
          style={{ y: yText, opacity: opacityText, scale: scaleHero }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            initial="initial"
            animate="animate"
            variants={transitions.page}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-sm font-medium text-white/80 mb-10 backdrop-blur-md shadow-[0_0_30px_-10px_rgba(45,107,255,0.3)] hover:bg-white/[0.08] transition-colors hover:scale-105 cursor-default group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--aquamarine)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--aquamarine)]"></span>
              </span>
              <span className="text-xs uppercase tracking-[0.2em] font-mono group-hover:text-[var(--aquamarine)] transition-colors text-shadow-glow">Systems Studio • UAE</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter leading-[0.9] mb-8 text-white drop-shadow-2xl">
              <motion.span 
                initial={{ opacity: 0, y: 50, rotateX: 20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                className="block relative z-10"
              >
                Systems for the
              </motion.span>
              <motion.span 
                 initial={{ opacity: 0, y: 50, rotateX: 20 }}
                 animate={{ opacity: 1, y: 0, rotateX: 0 }}
                 transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                 className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 relative z-10"
              >
                <span className="text-gradient-primary shine-effect">Next Generation.</span>
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-14 leading-relaxed font-light mix-blend-plus-lighter relative z-10"
            >
              We engineer premium digital ecosystems, portals, and AI workflows. 
              <br className="hidden md:block"/> Not just websites—we architect <span className="text-white font-medium text-shadow-sm">trust</span>.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24 relative z-20"
            >
              <Link href="/contact">
                <MotionButton size="lg" className="h-16 px-12 text-lg rounded-full font-bold shadow-[0_0_50px_-10px_rgba(45,107,255,0.5)] hover:shadow-[0_0_80px_-10px_rgba(45,107,255,0.7)] transition-shadow duration-500 bg-white text-black hover:bg-white/90">
                  Start Your Project
                </MotionButton>
              </Link>
              <Link href="/services">
                <MotionButton variant="outline" size="lg" className="h-16 px-12 text-lg rounded-full border-white/10 hover:bg-white/5 backdrop-blur-md font-medium text-white group">
                  <span className="group-hover:text-[var(--aquamarine)] transition-colors">View Services</span> <Play size={12} className="ml-2 fill-current opacity-50 group-hover:opacity-100 transition-opacity" />
                </MotionButton>
              </Link>
            </motion.div>

            {/* Proof Layer */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 border-t border-white/[0.05] pt-10 relative z-10">
               {[
                 { icon: ShieldCheck, text: "Security-First" },
                 { icon: Zap, text: "High Performance" },
                 { icon: BarChart, text: "Data-Driven" }
               ].map((item, i) => (
                 <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + (i * 0.1) }}
                    className="flex items-center gap-3 text-sm font-mono uppercase tracking-wider text-white/40 hover:text-white transition-colors cursor-default"
                 >
                    <item.icon size={16} className="text-[var(--rare-blue)] drop-shadow-[0_0_8px_var(--rare-blue)]" />
                    {item.text}
                 </motion.div>
               ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
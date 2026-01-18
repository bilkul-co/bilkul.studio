import { MotionButton } from "@/components/ui/motion-button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import heroBg from "@assets/generated_images/deep_cobalt_and_violet_abstract_glass_texture_background.png";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
        <img
          src={heroBg}
          alt="Abstract Digital Texture"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary mb-6 backdrop-blur-sm">
              The Digital Operating Layer
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[0.9] mb-8 text-gradient">
              Systems for the <br />
              <span className="text-white/50">Next Generation.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Bilkul Digital Studio builds premium digital ecosystems, portals, and AI workflows for ambitious brands in the UAE. We don't just design websites; we engineer trust.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <MotionButton size="lg" className="text-base h-12 px-8 rounded-full shadow-lg shadow-primary/20">
                  Book a Discovery Call
                </MotionButton>
              </Link>
              <Link href="/services">
                <MotionButton variant="outline" size="lg" className="text-base h-12 px-8 rounded-full border-white/10 hover:bg-white/5 backdrop-blur-sm">
                  View Services
                </MotionButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-current rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { FloatingObjects } from "@/components/ui/floating-objects";
import { motion } from "framer-motion";
import { transitions } from "@/lib/motion";

export default function Work() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20 relative home-wrapper">
      <FloatingObjects />
      <Navbar />
      <main className="pt-32 pb-24 relative z-10">
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={transitions.page}
            className="max-w-4xl mb-24 mx-auto text-center"
          >
            <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 tracking-tighter text-white drop-shadow-2xl">Our Work</h1>
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
              We don't just design interfaces; we engineer digital operating layers that power businesses.
            </p>
          </motion.div>

          <FeaturedWork />
        </div>
      </main>
      <Footer />
    </div>
  );
}

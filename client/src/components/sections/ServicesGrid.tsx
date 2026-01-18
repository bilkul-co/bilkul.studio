import { GlassCard } from "@/components/ui/glass-card";
import { MotionButton } from "@/components/ui/motion-button";
import { ArrowRight, Globe, Layers, Box, Cpu, BarChart, Bot, Sparkles } from "lucide-react";
import { Link } from "wouter";
import accentImg from "@assets/generated_images/abstract_chrome_3d_shape_with_iridescence.png";
import { transitions } from "@/lib/motion";
import { motion } from "framer-motion";

const services = [
  {
    icon: Globe,
    title: "Web Experience Design",
    description: "Immersive, high-performance websites that tell your story and convert visitors into partners."
  },
  {
    icon: Layers,
    title: "Portals & Digital Systems",
    description: "Secure client portals, dashboards, and internal tools that streamline operations."
  },
  {
    icon: Box,
    title: "White-Label Products",
    description: "Product design and development for SaaS founders and enterprise innovation teams."
  },
  {
    icon: BarChart,
    title: "Strategy & Consulting",
    description: "Digital transformation roadmaps and systems architecture for scaling businesses."
  },
  {
    icon: Cpu,
    title: "Content Intelligence",
    description: "Data-driven content strategies tailored for the UAE market landscape."
  }
];

export function ServicesGrid() {
  return (
    <section className="py-32 relative bg-background overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
            initial="initial"
            whileInView="whileInView"
            viewport={transitions.section.viewport}
            variants={transitions.section as any}
            className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8"
        >
          <div>
            <span className="text-primary font-mono text-xs tracking-widest uppercase mb-4 block">Our Capabilities</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">Engineered for Growth</h2>
            <p className="text-xl text-muted-foreground max-w-2xl font-light">
              We don't just build pages; we build engines for your business.
            </p>
          </div>
          <Link href="/services">
             <a className="text-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium group uppercase tracking-widest">
                View All Services <ArrowRight className="group-hover:translate-x-1 transition-transform w-4 h-4" />
             </a>
          </Link>
        </motion.div>

        <motion.div 
            variants={transitions.stagger.container as any}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={transitions.stagger.item as any}>
                <GlassCard hoverEffect spotlight className="flex flex-col h-full min-h-[320px] p-8 group border-white/5 hover:border-white/10 bg-white/[0.01]">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-white group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-lg">
                    <service.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground mb-8 flex-grow leading-relaxed text-base font-light">{service.description}</p>
                <div className="flex items-center text-xs font-medium uppercase tracking-wider text-muted-foreground group-hover:text-white transition-colors">
                    Learn more <ArrowRight className="ml-2 h-3 w-3 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                </div>
                </GlassCard>
            </motion.div>
          ))}

          {/* AI Highlight Card */}
          <motion.div variants={transitions.stagger.item as any}>
            <GlassCard hoverEffect spotlight className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 to-indigo-900/20 group p-0 h-full">
                <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 opacity-30 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12 mix-blend-lighten">
                <img src={accentImg} alt="" className="w-full h-full object-cover" />
                </div>
                
                <div className="relative z-10 flex flex-col h-full min-h-[320px] p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center mb-8 text-white shadow-lg shadow-primary/20">
                    <Sparkles size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">AI Integration</h3>
                <p className="text-white/80 mb-8 flex-grow leading-relaxed text-base font-light">
                    Enable your business with custom AI agents, workflow automation, and internal knowledge tools.
                </p>
                <Link href="/ai-integration">
                    <MotionButton className="w-full bg-white text-black hover:bg-white/90 border-0 font-semibold h-11 text-sm shadow-lg shadow-white/10">
                    Explore AI Solutions
                    </MotionButton>
                </Link>
                </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
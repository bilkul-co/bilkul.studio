import { HolographicCard } from "@/components/ui/holographic-card";
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
    description: "Immersive, high-performance websites that tell your story and convert visitors into partners.",
    gradient: "from-blue-600 to-cyan-500"
  },
  {
    icon: Layers,
    title: "Portals & Digital Systems",
    description: "Secure client portals, dashboards, and internal tools that streamline operations.",
    gradient: "from-purple-600 to-indigo-500"
  },
  {
    icon: Box,
    title: "White-Label Products",
    description: "Product design and development for SaaS founders and enterprise innovation teams.",
    gradient: "from-rose-500 to-pink-500"
  },
  {
    icon: BarChart,
    title: "Strategy & Consulting",
    description: "Digital transformation roadmaps and systems architecture for scaling businesses.",
    gradient: "from-orange-500 to-amber-500"
  },
  {
    icon: Cpu,
    title: "Content Intelligence",
    description: "Data-driven content strategies tailored for the UAE market landscape.",
    gradient: "from-emerald-500 to-teal-500"
  }
];

export function ServicesGrid() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[var(--rare-blue)]/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
            initial="initial"
            whileInView="whileInView"
            viewport={transitions.section.viewport}
            variants={transitions.section as any}
            className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8"
        >
          <div>
            <span className="text-[var(--aquamarine)] font-mono text-xs tracking-widest uppercase mb-4 block">Our Capabilities</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight text-white">Engineered for Growth</h2>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              We don't just build pages; we build engines for your business.
            </p>
          </div>
          <Link href="/services">
             <a className="text-white hover:text-[var(--aquamarine)] transition-colors flex items-center gap-2 text-sm font-medium group uppercase tracking-widest cursor-hover">
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
                <HolographicCard className="flex flex-col h-full min-h-[320px] p-8 group/card service-card">
                    <div className={`relative w-14 h-14 rounded-2xl p-0.5 mb-8 transition-all duration-500 group-hover/card:scale-110`}>
                         {/* Gradient Border & Glow */}
                         <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl opacity-100 group-hover/card:blur-md transition-all duration-500`} />
                         <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl opacity-100`} />
                         
                         {/* Inner Icon Container */}
                         <div className="relative w-full h-full bg-[#030305] rounded-[14px] flex items-center justify-center z-10 group-hover/card:bg-opacity-90 transition-all duration-500">
                            <service.icon size={26} strokeWidth={1.5} className="text-white group-hover/card:text-white transition-colors duration-300 relative z-10" />
                            {/* Inner Color Fill on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover/card:opacity-20 rounded-[14px] transition-opacity duration-500`} />
                         </div>
                    </div>
                    <h3 className={`text-xl font-bold mb-4 text-white group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r ${service.gradient} transition-all duration-300`}>{service.title}</h3>
                    <p className="text-white/60 mb-8 flex-grow leading-relaxed text-base font-light">{service.description}</p>
                    <div className="flex items-center text-xs font-medium uppercase tracking-wider text-white/40 group-hover/card:text-white transition-colors cursor-hover">
                        Learn more <ArrowRight className="ml-2 h-3 w-3 -translate-x-2 opacity-0 group-hover/card:translate-x-0 group-hover/card:opacity-100 transition-all" />
                    </div>
                </HolographicCard>
            </motion.div>
          ))}

          {/* AI Highlight Card - Using Holographic base but with custom style */}
          <motion.div variants={transitions.stagger.item as any}>
            <HolographicCard className="p-0 h-full border-[var(--rare-blue)]/30 bg-gradient-to-br from-[var(--rare-blue)]/10 to-[var(--deep-midnight)]/50 group">
                <div className="absolute inset-0 bg-[var(--rare-blue)]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 opacity-40 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12 mix-blend-lighten pointer-events-none">
                     <img src={accentImg} alt="" className="w-full h-full object-cover" />
                </div>
                
                <div className="relative z-10 flex flex-col h-full min-h-[320px] p-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[var(--rare-blue)] to-[var(--violet-mist)] flex items-center justify-center mb-8 text-white shadow-lg shadow-[var(--rare-blue)]/20">
                        <Sparkles size={26} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-white">AI Integration</h3>
                    <p className="text-white/80 mb-8 flex-grow leading-relaxed text-base font-light">
                        Enable your business with custom AI agents, workflow automation, and internal knowledge tools.
                    </p>
                    <Link href="/ai-integration">
                        <MotionButton className="w-full bg-white text-black hover:bg-white/90 border-0 font-bold h-12 text-sm shadow-lg shadow-white/10 cursor-hover">
                        Explore AI Solutions
                        </MotionButton>
                    </Link>
                </div>
            </HolographicCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
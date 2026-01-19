import { GlassCard } from "@/components/ui/glass-card";
import { MotionButton } from "@/components/ui/motion-button";
import { ArrowRight, Globe, Layers, Box, Cpu, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { transitions } from "@/lib/motion";
import { motion } from "framer-motion";

const services = [
  {
    icon: Globe,
    title: "Web Experience",
    description: "Immersive, high-performance websites that tell your story."
  },
  {
    icon: Layers,
    title: "Portals & Systems",
    description: "Secure client portals and internal tools that streamline operations."
  },
  {
    icon: Box,
    title: "Product Design",
    description: "Product design and development for SaaS founders."
  },
  {
    icon: Cpu,
    title: "Content Intel",
    description: "Data-driven content strategies tailored for the market."
  }
];

export function ServicesGrid() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
            initial="initial"
            whileInView="whileInView"
            viewport={transitions.section.viewport}
            variants={transitions.section as any}
            className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8"
        >
          <div>
            <span className="text-blue-600 font-mono text-xs tracking-widest uppercase mb-4 block font-bold">Capabilities</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight text-slate-900">Engineered for Growth</h2>
            <p className="text-xl text-slate-500 max-w-2xl font-normal">
              We don't just build pages; we build engines for your business.
            </p>
          </div>
          <Link href="/services">
             <a className="text-slate-900 hover:text-blue-600 transition-colors flex items-center gap-2 text-sm font-bold group uppercase tracking-widest border-b border-slate-200 pb-1 hover:border-blue-600">
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
                <GlassCard hoverEffect className="flex flex-col h-full min-h-[320px] group bg-slate-50/50 border-slate-100 hover:bg-white">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-8 text-slate-900 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-blue-200">
                    <service.icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">{service.title}</h3>
                <p className="text-slate-500 mb-8 flex-grow leading-relaxed text-base">{service.description}</p>
                <div className="flex items-center text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-600 transition-colors">
                    Learn more <ArrowRight className="ml-2 h-3 w-3 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                </div>
                </GlassCard>
            </motion.div>
          ))}

          {/* AI Highlight Card */}
          <motion.div variants={transitions.stagger.item as any}>
            <GlassCard hoverEffect className="relative overflow-hidden bg-slate-900 group p-0 h-full border-slate-900">
                <div className="relative z-10 flex flex-col h-full min-h-[320px] p-8">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 text-white">
                    <Sparkles size={26} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">AI Integration</h3>
                <p className="text-white/70 mb-8 flex-grow leading-relaxed text-base font-light">
                    Enable your business with custom AI agents and automation.
                </p>
                <Link href="/ai-integration">
                    <MotionButton className="w-full bg-white text-slate-900 hover:bg-blue-50 border-0 font-bold h-12 text-sm">
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
import { GlassCard } from "@/components/ui/glass-card";
import { MotionButton } from "@/components/ui/motion-button";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { transitions } from "@/lib/motion";

const projects = [
  {
    title: "Modern SaaS Dashboard",
    category: "Product Design",
    image: "/assets/framer/work-1.png",
    tags: ["UI/UX", "SaaS", "Dashboard"],
    summary: "A clean, data-rich interface for modern analytics platforms."
  },
  {
    title: "E-Commerce Experience",
    category: "Web Design",
    image: "/assets/framer/work-2.png",
    tags: ["E-Commerce", "Branding", "Conversion"],
    summary: "High-conversion product pages with immersive storytelling."
  },
  {
    title: "Fintech Mobile App",
    category: "App Design",
    image: "/assets/framer/work-3.png",
    tags: ["Mobile", "Fintech", "iOS"],
    summary: "Secure and intuitive mobile banking experience."
  },
  {
    title: "Corporate Identity",
    category: "Branding",
    image: "/assets/framer/work-4.png",
    tags: ["Identity", "Strategy", "Web"],
    summary: "Rebranding a legacy enterprise for the digital age."
  }
];

export function FeaturedWork() {
  return (
    <section className="py-32 bg-background relative z-10">
      <div className="container mx-auto px-6">
        <motion.div 
           initial="initial"
           whileInView="whileInView"
           viewport={transitions.section.viewport}
           variants={transitions.section as any}
           className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <span className="text-[var(--aquamarine)] font-mono text-xs tracking-[0.2em] uppercase mb-4 block">Selected Work</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-4 tracking-tight text-white">Our Portfolio</h2>
            <p className="text-white/60 text-xl max-w-xl font-light">
              Award-winning designs that drive real business results.
            </p>
          </div>
          <Link href="/work">
            <MotionButton variant="outline" className="hidden md:flex rounded-full px-8 border-white/10 hover:bg-white/5 text-white">
              View All Projects
            </MotionButton>
          </Link>
        </motion.div>

        <motion.div 
            variants={transitions.stagger.container as any}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={transitions.stagger.item as any}>
                <GlassCard 
                hoverEffect 
                spotlight
                noPadding
                className="group cursor-pointer h-[500px] flex flex-col border-white/5 bg-white/[0.02] overflow-hidden"
                >
                <div className="relative h-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 opacity-60 transition-opacity group-hover:opacity-40" />
                    <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-6 left-6 z-20">
                        <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border border-white/10 text-white">
                            {project.category}
                        </span>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-3xl font-bold mb-2 flex items-center gap-2 text-white group-hover:text-[var(--aquamarine)] transition-colors">
                            {project.title}
                            <ArrowUpRight size={24} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[var(--aquamarine)]" />
                        </h3>
                        <p className="text-white/70 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{project.summary}</p>
                        <div className="flex gap-2 flex-wrap opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                            {project.tags.map(tag => (
                            <span key={tag} className="text-xs text-white/60 bg-white/10 px-3 py-1.5 rounded-full border border-white/5">
                                {tag}
                            </span>
                            ))}
                        </div>
                    </div>
                </div>
                </GlassCard>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 md:hidden">
          <Link href="/work">
            <MotionButton variant="outline" className="w-full rounded-full h-12 text-white border-white/10">
              View All Projects
            </MotionButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
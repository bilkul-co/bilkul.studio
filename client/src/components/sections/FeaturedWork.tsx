import { GlassCard } from "@/components/ui/glass-card";
import { MotionButton } from "@/components/ui/motion-button";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { transitions } from "@/lib/motion";

const projects = [
  {
    title: "Dubai Future Foundation",
    category: "System Design",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    tags: ["Portal", "Next.js", "Design System"],
    summary: "A unified digital gateway for Dubai's innovation ecosystem."
  },
  {
    title: "Emaar Lifestyle App",
    category: "Mobile Experience",
    image: "https://images.unsplash.com/photo-1512453979798-5ea904ac6605?q=80&w=2070&auto=format&fit=crop",
    tags: ["App", "React Native", "UX Strategy"],
    summary: "Reimagining luxury living through a seamless mobile concierge."
  },
  {
    title: "Abu Dhabi Finance AI",
    category: "Fintech Integration",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    tags: ["AI", "Dashboard", "Data Viz"],
    summary: "Real-time predictive analytics for institutional investors."
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
            <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-4 block">Case Studies</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-4 tracking-tight">Selected Work</h2>
            <p className="text-muted-foreground text-xl max-w-xl font-light">Digital systems engineered for impact in the MENA region.</p>
          </div>
          <Link href="/work">
            <MotionButton variant="outline" className="hidden md:flex rounded-full px-8 border-white/10 hover:bg-white/5">
              View All Projects
            </MotionButton>
          </Link>
        </motion.div>

        <motion.div 
            variants={transitions.stagger.container as any}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={transitions.stagger.item as any}>
                <GlassCard 
                hoverEffect 
                spotlight
                noPadding
                className="group cursor-pointer h-[550px] flex flex-col border-white/5 bg-white/[0.02]"
                >
                <div className="relative h-2/3 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 opacity-80" />
                    <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                    />
                    <div className="absolute top-6 left-6 z-20">
                        <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border border-white/10 text-white">
                            {project.category}
                        </span>
                    </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow justify-between bg-white/[0.01] border-t border-white/5 relative z-20">
                    <div>
                    <h3 className="text-2xl font-bold mb-3 flex items-center gap-2 text-white group-hover:text-primary transition-colors">
                        {project.title}
                        <ArrowUpRight size={24} className="opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                    </h3>
                    <p className="text-muted-foreground mb-6 line-clamp-2">{project.summary}</p>
                    <div className="flex gap-2 flex-wrap">
                        {project.tags.map(tag => (
                        <span key={tag} className="text-xs text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full border border-white/5 group-hover:border-white/20 transition-colors">
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
            <MotionButton variant="outline" className="w-full rounded-full h-12">
              View All Projects
            </MotionButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
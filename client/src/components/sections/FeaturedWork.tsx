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
    tags: ["UI/UX", "SaaS"],
    summary: "Clean analytics interface."
  },
  {
    title: "E-Commerce Experience",
    category: "Web Design",
    image: "/assets/framer/work-2.png",
    tags: ["Growth", "Shopify"],
    summary: "High-conversion product page."
  },
  {
    title: "Fintech Mobile App",
    category: "App Design",
    image: "/assets/framer/work-3.png",
    tags: ["iOS", "Fintech"],
    summary: "Secure banking experience."
  },
  {
    title: "Corporate Identity",
    category: "Branding",
    image: "/assets/framer/work-4.png",
    tags: ["Identity", "Strategy"],
    summary: "Rebranding a legacy enterprise."
  }
];

export function FeaturedWork() {
  return (
    <section className="py-32 bg-slate-50 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div 
           initial="initial"
           whileInView="whileInView"
           viewport={transitions.section.viewport}
           variants={transitions.section as any}
           className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <span className="text-blue-600 font-mono text-xs tracking-[0.2em] uppercase mb-4 block font-bold">Selected Work</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tight text-slate-900">Our Portfolio</h2>
            <p className="text-slate-500 text-xl max-w-xl font-normal">
              Award-winning designs that drive real business results.
            </p>
          </div>
          <Link href="/work">
            <MotionButton variant="outline" className="hidden md:flex rounded-full px-8 bg-white border-slate-200 hover:bg-slate-50 text-slate-900 font-bold">
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
                noPadding
                className="group cursor-pointer h-[500px] flex flex-col overflow-hidden bg-white border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                <div className="relative h-full overflow-hidden">
                    <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-top"
                    />
                    
                    <div className="absolute top-6 left-6 z-20">
                        <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-900 shadow-sm">
                            {project.category}
                        </span>
                    </div>
                </div>
                
                <div className="p-8 bg-white relative z-20 border-t border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                             <h3 className="text-2xl font-bold mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">
                                {project.title}
                             </h3>
                             <p className="text-slate-500 text-sm">{project.summary}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <ArrowUpRight size={20} />
                        </div>
                    </div>
                </div>
                </GlassCard>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 md:hidden">
          <Link href="/work">
            <MotionButton variant="outline" className="w-full rounded-full h-12 text-slate-900 border-slate-200 bg-white">
              View All Projects
            </MotionButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
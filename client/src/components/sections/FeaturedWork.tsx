import { GlassCard } from "@/components/ui/glass-card";
import { MotionButton } from "@/components/ui/motion-button";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

const projects = [
  {
    title: "Dubai Future Foundation Portal",
    category: "System Design",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    tags: ["Portal", "Next.js", "Design System"]
  },
  {
    title: "Emaar Lifestyle App",
    category: "Mobile Experience",
    image: "https://images.unsplash.com/photo-1512453979798-5ea904ac6605?q=80&w=2070&auto=format&fit=crop",
    tags: ["App", "React Native", "UX Strategy"]
  },
  {
    title: "Abu Dhabi Finance AI",
    category: "Fintech Integration",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    tags: ["AI", "Dashboard", "Data Viz"]
  }
];

export function FeaturedWork() {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-4">Selected Work</h2>
            <p className="text-muted-foreground text-xl max-w-xl">Recent digital systems deployed in the region.</p>
          </div>
          <Link href="/work">
            <MotionButton variant="outline" className="hidden md:flex rounded-full px-8">
              View All Projects
            </MotionButton>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <GlassCard 
              key={index} 
              hoverEffect 
              spotlight
              className="group p-0 overflow-hidden cursor-pointer h-[500px] flex flex-col border-white/5 bg-white/[0.02]"
            >
              <div className="relative h-3/4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-60" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full text-xs font-medium border border-white/10 text-white z-20 shadow-lg">
                  {project.category}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow justify-between bg-white/[0.02] backdrop-blur-sm border-t border-white/5 relative z-20">
                <div>
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-2 text-white group-hover:text-primary transition-colors">
                    {project.title}
                    <ArrowUpRight size={20} className="opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                  </h3>
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
          ))}
        </div>
        
        <div className="mt-12 md:hidden">
          <Link href="/work">
            <MotionButton variant="outline" className="w-full rounded-full">
              View All Projects
            </MotionButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
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
    <section className="py-32">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Selected Work</h2>
            <p className="text-muted-foreground text-lg">Recent digital systems deployed in the region.</p>
          </div>
          <Link href="/work">
            <MotionButton variant="outline" className="hidden md:flex">
              View All Projects
            </MotionButton>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <GlassCard 
              key={index} 
              hoverEffect 
              className="group p-0 overflow-hidden cursor-pointer h-[400px] flex flex-col"
            >
              <div className="relative h-2/3 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                  {project.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow justify-between bg-card/50 backdrop-blur-sm">
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    {project.title}
                    <ArrowUpRight size={18} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
        
        <div className="mt-10 md:hidden">
          <Link href="/work">
            <MotionButton variant="outline" className="w-full">
              View All Projects
            </MotionButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
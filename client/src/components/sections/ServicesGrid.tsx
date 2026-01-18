import { GlassCard } from "@/components/ui/glass-card";
import { MotionButton } from "@/components/ui/motion-button";
import { ArrowRight, Globe, Layers, Box, Cpu, BarChart, Bot } from "lucide-react";
import { Link } from "wouter";
import accentImg from "@assets/generated_images/abstract_chrome_3d_shape_with_iridescence.png";

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
    <section className="py-32 relative bg-background">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">Our Capabilities</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              We don't just build pages; we build engines for growth.
            </p>
          </div>
          <Link href="/services">
             <a className="text-primary hover:text-white transition-colors flex items-center gap-2 text-lg font-medium group">
                View All Services <ArrowRight className="group-hover:translate-x-1 transition-transform" />
             </a>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <GlassCard key={index} hoverEffect spotlight className="flex flex-col h-full min-h-[340px] p-8 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-white group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-xl">
                <service.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-muted-foreground mb-8 flex-grow leading-relaxed text-lg">{service.description}</p>
              <div className="flex items-center text-sm font-medium text-white/50 group-hover:text-white transition-colors">
                 Learn more <ArrowRight className="ml-2 h-4 w-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </div>
            </GlassCard>
          ))}

          {/* AI Highlight Card */}
          <GlassCard hoverEffect spotlight className="relative overflow-hidden border-primary/40 bg-gradient-to-br from-primary/10 to-secondary/10 group p-0">
            <div className="absolute inset-0 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 opacity-40 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
              <img src={accentImg} alt="" className="w-full h-full object-cover mix-blend-screen" />
            </div>
            
            <div className="relative z-10 flex flex-col h-full min-h-[340px] p-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center mb-8 text-white shadow-lg shadow-primary/20">
                <Bot size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">AI Integration</h3>
              <p className="text-white/80 mb-8 flex-grow leading-relaxed text-lg">
                Enable your business with custom AI agents, workflow automation, and internal knowledge tools.
              </p>
              <Link href="/ai-integration">
                <MotionButton className="w-full bg-white text-black hover:bg-white/90 border-0 font-semibold h-12">
                  Explore AI Solutions
                </MotionButton>
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
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
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Our Capabilities</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            We don't just build pages; we build engines for growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <GlassCard key={index} hoverEffect className="flex flex-col h-full min-h-[300px]">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <service.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-8 flex-grow">{service.description}</p>
              <Link href="/services">
                <a className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Link>
            </GlassCard>
          ))}

          {/* AI Highlight Card */}
          <GlassCard hoverEffect className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5 group">
            <div className="absolute -right-20 -bottom-20 w-64 h-64 opacity-20 transition-opacity group-hover:opacity-40">
              <img src={accentImg} alt="" className="w-full h-full object-cover mix-blend-screen" />
            </div>
            
            <div className="relative z-10 flex flex-col h-full min-h-[300px]">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center mb-6 text-white shadow-lg shadow-primary/20">
                <Bot size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">AI Integration</h3>
              <p className="text-muted-foreground mb-8 flex-grow">
                Enable your business with custom AI agents, workflow automation, and internal knowledge tools.
              </p>
              <Link href="/ai-integration">
                <MotionButton size="sm" className="w-full bg-white/10 hover:bg-white/20 text-white border-0">
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
import { GlassCard } from "@/components/ui/glass-card";
import { MotionButton } from "@/components/ui/motion-button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { transitions } from "@/lib/motion";

const projects: Array<{
  title: string;
  category: string;
  image: string;
  tags: string[];
  summary: string;
}> = [
  {
    title: "Dubai Future Foundation",
    category: "System Design",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    tags: ["Portal", "Next.js", "Design System"],
    summary: "A unified digital gateway for Dubai's innovation ecosystem."
  },
  {
    title: "Car Rentals",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2070&auto=format&fit=crop",
    tags: ["Web App", "Secure Payments", "Booking Engine"],
    summary: "Premium car rental platform with seamless booking experience."
  },
  {
    title: "Vacation Homes",
    category: "Holiday Home Company",
    image: "https://images.unsplash.com/photo-1745750327932-7fb1d6f60b9b?auto=format&fit=crop&fm=jpg&q=60&w=3000",
    tags: ["Property Management System", "Mobile Optimized", "Dynamic Pricing"],
    summary: "Curated stays in Dubai's most exceptional spaces."
  },
  {
    title: "Spa & Wellness Centres",
    category: "Hospitality",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&fm=jpg&q=60&w=3000",
    tags: ["Booking", "Memberships", "Experience Design"],
    summary: "A serene wellness brand with modern booking and membership flows."
  },
  {
    title: "Luxury Retail",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&fm=jpg&q=60&w=3000",
    tags: ["Commerce", "Branding", "Fulfillment"],
    summary: "A premium retail experience with high-conversion storefront flows."
  },
  {
    title: "Real Estate",
    category: "Property",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    tags: ["Listings", "Lead Capture", "CRM"],
    summary: "High-end property presentation with investor-ready lead funnels."
  },
  {
    title: "Logistics",
    category: "Supply Chain",
    image: "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?auto=format&fit=crop&fm=jpg&q=60&w=3000",
    tags: ["Tracking", "Operations", "Dashboards"],
    summary: "Real-time fleet visibility with modern dispatch tooling."
  },
  {
    title: "Healthcare",
    category: "Clinics",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&fm=jpg&q=60&w=3000",
    tags: ["Patient Portal", "Scheduling", "Compliance"],
    summary: "Patient-first systems that reduce friction and improve outcomes."
  },
  {
    title: "Food & Beverage",
    category: "Restaurants",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&fm=jpg&q=60&w=3000",
    tags: ["Online Ordering", "Loyalty", "POS"],
    summary: "Digitized ordering, loyalty, and guest engagement flows."
  },
  {
    title: "Construction",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&fm=jpg&q=60&w=3000",
    tags: ["Project Tracking", "Bids", "Field Ops"],
    summary: "End-to-end visibility across complex build programs."
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
          {projects.map((project, index) => {
            const cardContent = (
                <GlassCard 
                hoverEffect 
                spotlight
                noPadding
                className="group h-[550px] flex flex-col border-white/5 bg-white/[0.02]"
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
                    <h3 className="text-2xl font-bold mb-3 text-white">
                        {project.title}
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
            );
            
            return (
              <motion.div key={index} variants={transitions.stagger.item as any}>
                {cardContent}
              </motion.div>
            );
          })}
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

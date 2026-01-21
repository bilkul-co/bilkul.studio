import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionButton } from "@/components/ui/motion-button";
import { FloatingObjects } from "@/components/ui/floating-objects";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { transitions } from "@/lib/motion";

const serviceDetails = [
  {
    title: "Web Experience Design",
    description: "We craft immersive, award-winning websites that serve as the flagship of your digital presence.",
    deliverables: ["UX/UI Design", "Next.js Development", "Motion Design", "CMS Integration"],
    forWho: "Brands that need to differentiate in a crowded market."
  },
  {
    title: "Portals & Digital Systems",
    description: "Secure, scalable customer portals and internal tools that streamline complex business logic.",
    deliverables: ["Client Dashboards", "Employee Portals", "SaaS Architecture", "Database Design"],
    forWho: "Operations-heavy businesses needing efficiency."
  },
  {
    title: "AI Integration & Automation",
    description: "Practical AI layers that sit on top of your data to automate workflows and surface insights.",
    deliverables: ["Custom GPT Agents", "Knowledge Base RAG", "Automated Reporting", "Workflow Scripts"],
    forWho: "Forward-thinking companies ready to reduce manual overhead."
  },
  {
    title: "White-Label Products",
    description: "Full-cycle product development for founders who need an engineering partner, not just a dev shop.",
    deliverables: ["MVP Strategy", "Product Design", "Full-Stack Dev", "Launch Support"],
    forWho: "Founders & Intrapreneurs."
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 relative home-wrapper">
      <FloatingObjects />
      <Navbar />
      <main className="pt-32 pb-24 relative z-10">
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mb-24 mx-auto text-center">
            <motion.div
                initial="initial"
                animate="animate"
                variants={transitions.page}
            >
                <span className="text-[var(--aquamarine)] font-mono text-sm tracking-[0.2em] uppercase mb-6 block">Capabilities</span>
                <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 tracking-tighter text-white drop-shadow-2xl">
                Services
                </h1>
                <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
                We specialize in the intersection of design, engineering, and intelligence.
                </p>
            </motion.div>
          </div>

          <div className="grid gap-8 max-w-5xl mx-auto">
            {serviceDetails.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-8 md:p-12 border-white/5 bg-white/[0.02] backdrop-blur-md" spotlight>
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-white">{service.title}</h2>
                        <p className="text-lg text-white/60 mb-8 leading-relaxed font-light">
                        {service.description}
                        </p>
                        
                        <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/5 inline-block">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--aquamarine)] mb-2">Best For</h4>
                        <p className="text-sm font-medium text-white">{service.forWho}</p>
                        </div>

                        <div>
                            <Link href="/contact">
                            <MotionButton className="rounded-full px-8 bg-white text-black hover:bg-white/90 font-semibold h-12 shadow-lg shadow-white/10">
                                Get a Proposal <ArrowRight className="ml-2 h-4 w-4" />
                            </MotionButton>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="bg-black/20 rounded-2xl p-8 border border-white/5 backdrop-blur-sm shadow-inner">
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white flex items-center gap-2">
                            <Sparkles size={14} className="text-[var(--aquamarine)]" /> Deliverables
                        </h4>
                        <ul className="space-y-4">
                        {service.deliverables.map(item => (
                            <li key={item} className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[var(--aquamarine)] shrink-0 group-hover:bg-[var(--aquamarine)] group-hover:text-black transition-colors border border-white/5">
                                <Check size={14} />
                            </div>
                            <span className="text-lg font-light">{item}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                    </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

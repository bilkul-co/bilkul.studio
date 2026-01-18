import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionButton } from "@/components/ui/motion-button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";

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
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground">
              We specialize in the intersection of design, engineering, and intelligence.
            </p>
          </div>

          <div className="grid gap-12">
            {serviceDetails.map((service, index) => (
              <GlassCard key={index} className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Best For</h4>
                      <p className="text-sm">{service.forWho}</p>
                    </div>
                    <Link href="/contact">
                      <MotionButton>
                        Get a Proposal <ArrowRight className="ml-2 h-4 w-4" />
                      </MotionButton>
                    </Link>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-8 border border-white/5">
                    <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Deliverables</h4>
                    <ul className="space-y-4">
                      {service.deliverables.map(item => (
                        <li key={item} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                            <Check size={14} />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
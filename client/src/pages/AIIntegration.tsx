import { useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionButton } from "@/components/ui/motion-button";
import { FloatingObjects } from "@/components/ui/floating-objects";
import { Bot, Check, Shield, Zap, Database, BrainCircuit, ArrowRight } from "lucide-react";
import accentImg from "@assets/generated_images/abstract_chrome_3d_shape_with_iridescence.png";
import liquidImg from "@assets/generated_images/dark_iridescent_liquid_metal_flow_abstract_3d.png";
import { motion } from "framer-motion";
import { transitions } from "@/lib/motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function AIIntegration() {
  const [, setLocation] = useLocation();
  const [selectedSpec, setSelectedSpec] = useState<{
    title: string;
    specs: string[];
  } | null>(null);

  const offerings = [
    {
      icon: Zap,
      title: "Workflow Automation",
      desc: "Automate email triage, ticket routing, and CRM updates.",
      specs: [
        "Email and inbox automation workflows",
        "CRM sync + tagging + lead routing",
        "Human-in-the-loop escalation paths",
        "Audit logs and change tracking"
      ],
    },
    {
      icon: BrainCircuit,
      title: "Internal Knowledge",
      desc: "RAG-based chat agents trained on your company docs.",
      specs: [
        "Secure document indexing (PDF, Notion, Drive)",
        "Role-based access and permissions",
        "Source citations in every response",
        "Daily refresh and drift monitoring"
      ],
    },
    {
      icon: Database,
      title: "Data Intelligence",
      desc: "Weekly AI-generated summaries of your operational metrics.",
      specs: [
        "Executive weekly performance digest",
        "Anomaly detection and alerts",
        "Automated KPI summaries by team",
        "Data warehouse integrations"
      ],
    },
  ];

  const handleUseCases = () => {
    document.getElementById("use-cases")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20 relative home-wrapper">
      <FloatingObjects />
      <Navbar />
      <main className="pt-32 pb-24 relative z-10">
        
        <div className="container mx-auto px-6 relative z-10">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
                initial="initial"
                animate="animate"
                variants={transitions.page}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono mb-6 border border-primary/20 backdrop-blur-sm">
                BILKUL INTELLIGENCE LAYER
              </div>
              <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 leading-[0.9] text-white">
                Your Business, <br />
                <span className="text-gradient-aurora">Supercharged.</span>
              </h1>
              <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-xl font-light">
                We implement secure, practical AI layers that automate operational drudgery and unlock new insights from your existing data. No hype, just systems that work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <MotionButton
                  size="lg"
                  className="rounded-full h-12 px-8 bg-white text-black hover:bg-white/90"
                  onClick={() => setLocation("/contact")}
                >
                  Start AI Audit
                </MotionButton>
                <MotionButton
                  variant="outline"
                  size="lg"
                  className="rounded-full h-12 px-8 border-white/10 hover:bg-white/5 text-white"
                  onClick={handleUseCases}
                >
                  View Use Cases
                </MotionButton>
              </div>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-[100px] rounded-full pointer-events-none" />
              <GlassCard className="relative z-10 p-0 overflow-hidden border-white/10 group rotate-2 hover:rotate-0 transition-transform duration-700">
                <img src={liquidImg} alt="AI Abstract" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-2 text-white font-mono text-sm mb-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Neural Engine Active
                  </div>
                  <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[70%] animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Offerings */}
          <div id="use-cases" className="grid md:grid-cols-3 gap-6 mb-32">
            {offerings.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard spotlight className="p-10 min-h-[300px] flex flex-col justify-between group bg-white/[0.02] border-white/5 hover:border-white/10">
                    <div>
                    <item.icon className="w-12 h-12 text-white/50 group-hover:text-primary transition-colors mb-6" />
                    <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                    <p className="text-white/60 text-lg leading-relaxed font-light">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setSelectedSpec({ title: item.title, specs: item.specs })}
                      className="mt-8 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      View Specs <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Readiness Checklist */}
          <div className="mb-32">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">AI Readiness Checklist</h2>
               <p className="text-white/60 text-lg font-light">Before we build, we qualify.</p>
            </div>
            
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
              {[
                "Do you have centralized digital data storage?",
                "Are your SOPs documented digitally?",
                "Do you handle >100 recurring support queries/week?",
                "Is data privacy a regulatory constraint?"
              ].map((q, i) => (
                <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-6 p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 text-white/40 group-hover:border-primary group-hover:text-primary transition-colors">
                    <span className="font-mono">{i + 1}</span>
                  </div>
                  <p className="text-xl font-medium text-white">{q}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Trust/Safety */}
          <GlassCard className="p-12 md:p-20 border-primary/20 bg-gradient-to-br from-primary/10 to-transparent relative overflow-hidden backdrop-blur-md">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="p-8 rounded-3xl bg-primary/20 text-primary border border-primary/20 shadow-[0_0_50px_-10px_rgba(56,189,248,0.3)]">
                <Shield size={64} />
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-4 text-white">Enterprise-Grade Safety</h3>
                <p className="text-white/70 text-xl leading-relaxed max-w-2xl font-light">
                  We deploy private instances. Your data is never used to train public models. We adhere to strict UAE data residency laws and encryption standards.
                </p>
              </div>
            </div>
          </GlassCard>

        </div>
      </main>
      <Footer />

      <Dialog open={!!selectedSpec} onOpenChange={(open) => !open && setSelectedSpec(null)}>
        <DialogContent className="max-w-xl bg-[#0b0d14] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-display">{selectedSpec?.title} Specs</DialogTitle>
          </DialogHeader>
          <ul className="space-y-3 text-sm text-white/80">
            {selectedSpec?.specs.map((spec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--aquamarine)]" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
}

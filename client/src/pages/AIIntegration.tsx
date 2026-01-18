import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionButton } from "@/components/ui/motion-button";
import { Bot, Check, Shield, Zap, Database, BrainCircuit } from "lucide-react";
import accentImg from "@assets/generated_images/abstract_chrome_3d_shape_with_iridescence.png";

export default function AIIntegration() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">Bilkul Intelligence</span>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                Your Business, <br />
                <span className="text-gradient-primary">Supercharged.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We implement secure, practical AI layers that automate operational drudgery and unlock new insights from your existing data. No hype—just systems that work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <MotionButton size="lg" className="rounded-full">Start AI Audit</MotionButton>
                <MotionButton variant="outline" size="lg" className="rounded-full">View Use Cases</MotionButton>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-full" />
              <img src={accentImg} alt="AI Abstract" className="relative z-10 w-full rounded-2xl border border-white/10 shadow-2xl" />
            </div>
          </div>

          {/* Offerings */}
          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {[
              { icon: Zap, title: "Workflow Automation", desc: "Automate email triage, ticket routing, and CRM updates." },
              { icon: BrainCircuit, title: "Internal Knowledge", desc: "RAG-based chat agents trained on your company docs." },
              { icon: Database, title: "Data Intelligence", desc: "Weekly AI-generated summaries of your operational metrics." }
            ].map((item, i) => (
              <GlassCard key={i} className="p-8">
                <item.icon className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </GlassCard>
            ))}
          </div>

          {/* Readiness Checklist */}
          <div className="mb-24">
            <h2 className="text-3xl font-display font-bold mb-12 text-center">AI Readiness Checklist</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              {[
                "Do you have centralized digital data storage?",
                "Are your SOPs documented digitally?",
                "Do you handle >100 recurring support queries/week?",
                "Is data privacy a regulatory constraint?"
              ].map((q, i) => (
                <div key={i} className="flex items-start gap-4 p-6 rounded-xl border border-white/5 bg-white/[0.02]">
                  <div className="w-6 h-6 rounded-full border border-primary/50 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-xs font-mono">{i + 1}</span>
                  </div>
                  <p className="text-lg font-medium">{q}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trust/Safety */}
          <GlassCard className="p-12 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="p-4 rounded-full bg-primary/20 text-primary">
                <Shield size={48} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Enterprise-Grade Safety</h3>
                <p className="text-muted-foreground text-lg mb-0">
                  We deploy private instances. Your data is never used to train public models. We adhere to UAE data residency laws.
                </p>
              </div>
            </div>
          </GlassCard>

        </div>
      </main>
      <Footer />
    </div>
  );
}
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { PageBlueprint, Section } from "@/lib/demo-generator";
import { MotionButton } from "@/components/ui/motion-button";
import { Loader2, ArrowLeft, RefreshCw, Send, Zap, Shield, Heart, Activity, Globe, Layout, BarChart, Sparkles, Key, UserCheck, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { FluidBackground } from "@/components/ui/fluid-background";
import { HolographicCard } from "@/components/ui/holographic-card";

// --- DYNAMIC ICONS ---
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, any> = {
    Zap, Shield, Heart, Activity, Globe, Layout, BarChart, Sparkles, Key, UserCheck, Stethoscope, ShieldCheck: Shield
  };
  const Icon = icons[name] || Sparkles;
  return <Icon className={className} />;
};

// --- SECTION RENDERERS ---

const DemoHero = ({ data }: { data: Extract<Section, { type: 'hero' }> }) => (
  <section className="relative min-h-[85vh] flex items-center justify-center text-center px-6 overflow-hidden">
    <div className="max-w-5xl relative z-20 pt-20">
       <motion.div 
         initial={{ opacity: 0, scale: 0.9 }} 
         animate={{ opacity: 1, scale: 1 }}
         className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-widest text-primary mb-8"
       >
         <span>AI Generated Preview</span>
       </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-[0.9] tracking-tight"
      >
        {data.headline}
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
      >
        {data.subheadline}
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <MotionButton size="lg" className="rounded-full px-10 h-14 text-lg bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10">
            {data.ctaPrimary}
        </MotionButton>
        {data.ctaSecondary && (
            <MotionButton size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg border-white/10 hover:bg-white/5">
                {data.ctaSecondary}
            </MotionButton>
        )}
      </motion.div>
    </div>
  </section>
);

const DemoTrustBar = ({ data }: { data: Extract<Section, { type: 'trustBar' }> }) => (
    <div className="border-y border-white/5 bg-white/[0.02] py-10 backdrop-blur-sm">
        <div className="container mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6">
            {data.items.map((item, i) => (
                <span key={i} className="text-white/30 font-mono uppercase tracking-widest text-sm font-medium hover:text-white/60 transition-colors cursor-default">{item}</span>
            ))}
        </div>
    </div>
);

const DemoFeatures = ({ data }: { data: Extract<Section, { type: 'features' }> }) => (
    <section className="py-32 container mx-auto px-6">
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">{data.headline}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto opacity-50" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            {data.items.map((item, i) => (
                <HolographicCard key={i} className="p-8 h-full flex flex-col">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center mb-6 text-primary shadow-lg">
                         <DynamicIcon name={item.icon} className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-white/50 leading-relaxed font-light">{item.desc}</p>
                </HolographicCard>
            ))}
        </div>
    </section>
);

const DemoShowcase = ({ data }: { data: Extract<Section, { type: 'showcase' }> }) => (
    <section className="py-32 bg-white/[0.02]">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-16">{data.headline}</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {data.items.map((item, i) => (
                    <div key={i} className="group relative aspect-[4/5] md:aspect-square overflow-hidden rounded-3xl bg-[#0a0a15] border border-white/5">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 z-0 mix-blend-overlay" />
                        
                        {/* Abstract placeholder visual */}
                        <div className={`absolute inset-0 bg-gradient-to-tr opacity-30 group-hover:opacity-50 transition-opacity duration-700 ${i % 2 === 0 ? 'from-blue-500/20 to-purple-500/20' : 'from-emerald-500/20 to-teal-500/20'}`} />
                        
                        <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                            <h3 className="text-2xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
                            <p className="text-white/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const DemoTestimonials = ({ data }: { data: Extract<Section, { type: 'testimonials' }> }) => (
    <section className="py-32 container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">{data.headline}</h2>
        <div className="grid md:grid-cols-2 gap-8">
            {data.items.map((item, i) => (
                <div key={i} className="p-10 rounded-[2rem] bg-white/[0.03] border border-white/5 relative">
                    <div className="text-4xl text-primary/30 font-serif absolute top-8 left-8">"</div>
                    <p className="text-xl md:text-2xl text-white/80 font-light italic mb-8 relative z-10 leading-relaxed">
                        {item.quote}
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10" />
                        <div>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-sm text-white/40 uppercase tracking-wider">{item.role}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const DemoFAQ = ({ data }: { data: Extract<Section, { type: 'faq' }> }) => (
    <section className="py-24 container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-display font-bold mb-12 text-center">{data.headline}</h2>
        <div className="space-y-4">
            {data.items.map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                    <h3 className="font-bold text-lg mb-2 text-white/90">{item.q}</h3>
                    <p className="text-white/50 leading-relaxed">{item.a}</p>
                </div>
            ))}
        </div>
    </section>
);

const DemoCTA = ({ data }: { data: Extract<Section, { type: 'cta' }> }) => (
    <section className="py-32 container mx-auto px-6 text-center">
        <div className="bg-gradient-to-br from-primary/20 to-purple-500/10 border border-white/10 rounded-[3rem] p-12 md:p-32 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-overlay" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-primary/30 transition-colors duration-700" />
            
            <div className="relative z-10">
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tight">{data.headline}</h2>
                <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto font-light">{data.subheadline}</p>
                <MotionButton size="lg" className="rounded-full px-12 h-16 text-xl bg-white text-black hover:bg-white/90 font-bold shadow-2xl shadow-primary/20">
                    {data.cta}
                </MotionButton>
            </div>
        </div>
    </section>
);

// --- MAIN PREVIEW COMPONENT ---

export default function DemoPreview() {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  
  // Retrieve blueprint from cache
  const blueprint = queryClient.getQueryData<PageBlueprint>(["demo-blueprint"]);

  if (!blueprint) {
    return (
        <div className="h-screen flex items-center justify-center bg-[#030305] text-white">
            <div className="flex flex-col items-center gap-6 p-8 text-center max-w-md">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                     <Loader2 className="animate-spin text-white/50" size={32} />
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-2">Waiting for blueprint...</h2>
                    <p className="text-white/40 text-sm mb-6">If this takes too long, your session may have expired.</p>
                </div>
                <MotionButton variant="outline" onClick={() => setLocation("/demo")}>
                    Return to Wizard
                </MotionButton>
            </div>
        </div>
    );
  }

  // Color Mapping
  const colorMap = {
    rareBlue: '#2D6BFF',
    aquamarine: '#00FFD1',
    turquoise: '#40E0D0',
    softPink: '#FFB6C1',
    teal: '#14B8A6'
  };
  const primaryColorVar = colorMap[blueprint.primaryColor] || '#2D6BFF';

  return (
    <div className="min-h-screen bg-[#030305] text-white overflow-x-hidden relative" style={{ '--primary': primaryColorVar } as any}>
      
      {/* Top Control Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#030305]/80 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
            <MotionButton size="sm" variant="ghost" onClick={() => setLocation("/demo")} className="text-white/60 hover:text-white">
                <ArrowLeft size={16} className="mr-2" /> Edit
            </MotionButton>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex flex-col">
                <span className="text-xs font-mono text-white/40 uppercase tracking-wider">Project Preview</span>
                <span className="text-sm font-bold text-white">{blueprint.brandName}</span>
            </div>
        </div>
        
        <div className="flex items-center gap-3">
             <div className="hidden md:flex items-center gap-2 mr-4 text-xs font-mono text-white/30">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                AI GENERATED
             </div>
             <MotionButton size="sm" variant="outline" className="border-white/10 hidden sm:flex" onClick={() => setLocation("/demo")}>
                <RefreshCw size={14} className="mr-2" /> Regenerate
             </MotionButton>
             <MotionButton size="sm" className="bg-primary text-black font-bold hover:bg-primary/90" onClick={() => setLocation("/contact")}>
                <Send size={14} className="mr-2" /> Request This Build
             </MotionButton>
        </div>
      </div>

      {/* Generated Content Render */}
      <div className="animate-in fade-in duration-1000 slide-in-from-bottom-8">
        {blueprint.sections.map((section, idx) => {
            switch(section.type) {
                case 'hero': return <DemoHero key={idx} data={section} />;
                case 'trustBar': return <DemoTrustBar key={idx} data={section} />;
                case 'features': return <DemoFeatures key={idx} data={section} />;
                case 'showcase': return <DemoShowcase key={idx} data={section} />;
                case 'testimonials': return <DemoTestimonials key={idx} data={section} />;
                case 'faq': return <DemoFAQ key={idx} data={section} />;
                case 'cta': return <DemoCTA key={idx} data={section} />;
                default: return null;
            }
        })}
        
        <footer className="py-12 border-t border-white/5 text-center text-white/30 text-sm">
            <p className="mb-2">This is a concept preview generated by Bilkul AI.</p>
            <p>© 2026 {blueprint.brandName}. All rights reserved.</p>
        </footer>
      </div>

      {/* Background Ambience */}
      <FluidBackground className="opacity-20 fixed inset-0 pointer-events-none -z-10" />
    </div>
  );
}
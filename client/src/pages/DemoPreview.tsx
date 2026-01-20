import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { PageBlueprint } from "@/lib/demo-schema"; // Corrected import source
import { MotionButton } from "@/components/ui/motion-button";
import { Loader2, ArrowLeft, RefreshCw, Send, CheckCircle, Zap, Shield, Heart, Activity, Globe, Layout, BarChart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/Navbar";
import { FluidBackground } from "@/components/ui/fluid-background";

// --- RENDERER COMPONENTS ---

// 1. Dynamic Hero
const DemoHero = ({ data }: { data: PageBlueprint['sections'][0] & { type: 'hero' } }) => (
  <section className="relative min-h-[80vh] flex items-center justify-center text-center px-6 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10" />
    <div className="max-w-4xl relative z-20">
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight"
      >
        {data.headline}
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto font-light"
      >
        {data.subheadline}
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-4 justify-center"
      >
        <MotionButton size="lg" className="rounded-full px-8 bg-white text-black hover:bg-white/90">
            {data.ctaPrimary}
        </MotionButton>
        {data.ctaSecondary && (
            <MotionButton size="lg" variant="outline" className="rounded-full px-8">
                {data.ctaSecondary}
            </MotionButton>
        )}
      </motion.div>
    </div>
  </section>
);

// 2. Trust Bar
const DemoTrustBar = ({ data }: { data: PageBlueprint['sections'][1] & { type: 'trustBar' } }) => (
    <div className="border-y border-white/5 bg-white/[0.02] py-8">
        <div className="container mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
            {data.items.map((item: string, i: number) => (
                <span key={i} className="text-white/40 font-mono uppercase tracking-widest text-sm font-medium">{item}</span>
            ))}
        </div>
    </div>
);

// 3. Features
const DemoFeatures = ({ data }: { data: PageBlueprint['sections'][2] & { type: 'features' } }) => (
    <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">{data.headline}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            {data.items.map((item: any, i: number) => (
                <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 text-[var(--aquamarine)]">
                         {/* Dynamic Icon Rendering Placeholder - Mapping common names */}
                         {item.icon === 'Zap' && <Zap size={24} />}
                         {item.icon === 'ShieldCheck' && <Shield size={24} />}
                         {item.icon === 'BarChart' && <BarChart size={24} />}
                         {item.icon === 'Activity' && <Activity size={24} />}
                         {item.icon === 'Heart' && <Heart size={24} />}
                         {item.icon === 'Globe' && <Globe size={24} />}
                         {item.icon === 'Layout' && <Layout size={24} />}
                         {item.icon === 'Stethoscope' && <Activity size={24} />}
                         {!['Zap','ShieldCheck','BarChart','Activity','Heart','Globe','Layout','Stethoscope'].includes(item.icon) && <Sparkles size={24} />}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
    </section>
);

// 4. CTA
const DemoCTA = ({ data }: { data: PageBlueprint['sections'][6] & { type: 'cta' } }) => (
    <section className="py-32 container mx-auto px-6 text-center">
        <div className="bg-gradient-to-br from-[var(--rare-blue)]/20 to-[var(--aquamarine)]/10 border border-white/10 rounded-[2.5rem] p-12 md:p-24 relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">{data.headline}</h2>
                <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">{data.subheadline}</p>
                <MotionButton size="lg" className="rounded-full px-10 h-14 text-lg bg-white text-black hover:bg-white/90">
                    {data.cta}
                </MotionButton>
            </div>
            {/* Bg effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-20 pointer-events-none" />
        </div>
    </section>
);


export default function DemoPreview() {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  
  // Retrieve blueprint from cache
  const blueprint = queryClient.getQueryData<PageBlueprint>(["demo-blueprint"]);

  if (!blueprint) {
    // If no blueprint, redirect to wizard
    return (
        <div className="h-screen flex items-center justify-center bg-[#030305] text-white">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-white/50" />
                <p className="text-white/40 font-mono text-sm">Loading blueprint...</p>
                <MotionButton variant="outline" size="sm" onClick={() => setLocation("/demo")}>
                    Return to Wizard
                </MotionButton>
            </div>
        </div>
    );
  }

  // Determine colors based on blueprint
  const primaryColorVar = 
    blueprint.primaryColor === 'rareBlue' ? '#2D6BFF' :
    blueprint.primaryColor === 'aquamarine' ? '#00FFD1' :
    blueprint.primaryColor === 'turquoise' ? '#40E0D0' :
    blueprint.primaryColor === 'softPink' ? '#FFB6C1' : '#2D6BFF';

  return (
    <div className="min-h-screen bg-[#030305] text-white overflow-x-hidden relative" style={{ '--primary': primaryColorVar } as any}>
      {/* --- PREVIEW UI WRAPPER --- */}
      
      {/* Top Bar for Demo Controls */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#030305] border-b border-white/10 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
            <MotionButton size="sm" variant="ghost" onClick={() => setLocation("/demo")} className="text-white/60">
                <ArrowLeft size={16} className="mr-2" /> Edit Prompt
            </MotionButton>
            <div className="h-6 w-px bg-white/10" />
            <span className="text-sm font-mono text-white/40 uppercase tracking-wider hidden sm:inline-block">AI Generated Preview</span>
        </div>
        
        <div className="flex items-center gap-3">
             <MotionButton size="sm" variant="outline" className="border-white/10 hidden sm:flex" onClick={() => setLocation("/demo")}>
                <RefreshCw size={14} className="mr-2" /> Regenerate
             </MotionButton>
             <MotionButton size="sm" className="bg-[var(--aquamarine)] text-black font-bold hover:bg-[var(--aquamarine)]/90" onClick={() => setLocation("/contact")}>
                <Send size={14} className="mr-2" /> Request Build
             </MotionButton>
        </div>
      </div>

      {/* --- GENERATED PAGE CONTENT --- */}
      <div className="pt-16 animate-in fade-in duration-700 slide-in-from-bottom-4">
        {/* Render sections dynamically */}
        {blueprint.sections.map((section: any, idx: number) => {
            switch(section.type) {
                case 'hero': return <DemoHero key={idx} data={section} />;
                case 'trustBar': return <DemoTrustBar key={idx} data={section} />;
                case 'features': return <DemoFeatures key={idx} data={section} />;
                case 'cta': return <DemoCTA key={idx} data={section} />;
                // Fallback for others not yet implemented in this snippet
                default: return null;
            }
        })}
        
        {/* Fallback Footer for Demo */}
        <footer className="py-12 border-t border-white/5 text-center text-white/30 text-sm">
            <p>© 2026 {blueprint.brandName}. Powered by Bilkul Digital.</p>
        </footer>
      </div>

      {/* Global bg for the preview */}
      <FluidBackground className="opacity-30 fixed inset-0 pointer-events-none -z-10" />
    </div>
  );
}
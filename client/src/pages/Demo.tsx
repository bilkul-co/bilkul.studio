import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { MotionButton } from "@/components/ui/motion-button";
import { FluidBackground } from "@/components/ui/fluid-background";
import { ArrowLeft, Sparkles, Wand2, CheckCircle2, ChevronRight, Palette } from "lucide-react";
import { generatePageBlueprint } from "@/lib/demo-generator";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const LOADING_STEPS = [
  "Analyzing industry patterns...",
  "Constructing site architecture...",
  "Generating premium copy...",
  "Applying 'Aurora' design system...",
  "Polishing final preview..."
];

const SUGGESTED_PROMPTS = [
  "Luxury Dental Clinic", "High-End Real Estate", "Modern SaaS Platform", "Artisan Coffee Shop", "Digital Marketing Agency", "Personal Portfolio"
];

export default function DemoWizard() {
  const [step, setStep] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [vibe, setVibe] = useState("Modern Minimal");
  const [industry, setIndustry] = useState("");
  const [audience, setAudience] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [primaryCta, setPrimaryCta] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    const interval = setInterval(() => {
      setLoadingStepIndex(prev => {
        if (prev >= LOADING_STEPS.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    try {
      const contextPrompt = [
        prompt,
        industry ? `Industry: ${industry}` : "",
        audience ? `Audience: ${audience}` : "",
        primaryGoal ? `Primary Goal: ${primaryGoal}` : "",
        primaryCta ? `Primary CTA: ${primaryCta}` : "",
      ]
        .filter(Boolean)
        .join(" | ");

      const blueprint = await generatePageBlueprint(contextPrompt, vibe);
      
      const { data, error } = await supabase
        .from("demo_blueprints")
        .insert([
          {
            prompt,
            meta: {
              industry: industry || null,
              audience: audience || null,
              primaryGoal: primaryGoal || null,
              primaryCta: primaryCta || null,
            },
            brand_name: blueprint.brandName,
            tagline: blueprint.tagline,
            tone: blueprint.tone,
            primary_color: blueprint.primaryColor,
            sections: blueprint.sections,
            prompt_anchors: blueprint.promptAnchors,
            coverage_score: blueprint.coverageScore?.toString(),
          },
        ])
        .select()
        .single();
      if (error) throw error;
      const savedBlueprint = data;
      queryClient.setQueryData(["demo-blueprint"], savedBlueprint);
      localStorage.setItem("latest-demo-blueprint", JSON.stringify(savedBlueprint));
      
      setTimeout(() => {
        setLocation("/demo/preview");
      }, 1500);
    } catch (error) {
      console.error("Generation failed", error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#030305] text-white overflow-hidden relative flex flex-col items-center justify-center p-6 font-sans">
      <FluidBackground className="opacity-30" />
      
      {/* Navigation */}
      <div className="absolute top-0 left-0 w-full p-8 z-50 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
             <MotionButton variant="ghost" onClick={() => setLocation("/")} className="text-white/60 hover:text-white hover:bg-white/10 rounded-full px-4">
               <ArrowLeft className="mr-2 h-4 w-4" /> Back to Studio
             </MotionButton>
        </div>
      </div>

      <div className="w-full max-w-3xl relative z-20">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: PROMPT INPUT */}
          {step === 1 && !isGenerating && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="space-y-10"
            >
              <div className="space-y-4 text-center">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[var(--aquamarine)] mb-2"
                >
                  <Wand2 size={12} />
                  <span>AI Architect</span>
                </motion.div>
                <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight">
                  What are we <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">building today?</span>
                </h1>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--rare-blue)] to-[var(--aquamarine)] rounded-3xl opacity-20 group-hover:opacity-40 transition duration-500 blur-lg" />
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your vision (e.g., 'A minimalist portfolio for a landscape photographer based in Tokyo...')"
                  className="relative w-full bg-[#0a0a12]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-2xl font-light min-h-[200px] focus:outline-none focus:ring-1 focus:ring-white/30 placeholder:text-white/20 resize-none z-10 shadow-2xl"
                  autoFocus
                />
              </div>

              <div className="space-y-3">
                <p className="text-sm font-mono text-white/40 uppercase tracking-widest text-center">Suggestions</p>
                <div className="flex flex-wrap gap-3 justify-center">
                    {SUGGESTED_PROMPTS.map((s) => (
                    <button
                        key={s}
                        onClick={() => setPrompt(s)}
                        className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-sm transition-all hover:scale-105"
                    >
                        {s}
                    </button>
                    ))}
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <MotionButton
                  size="lg"
                  onClick={() => {
                    if (prompt.trim()) setStep(2);
                  }}
                  disabled={!prompt.trim()}
                  className="rounded-full px-16 h-16 text-xl font-bold bg-white text-black hover:bg-white/90 shadow-[0_0_50px_-10px_rgba(255,255,255,0.2)]"
                >
                  Continue <ChevronRight className="ml-2" />
                </MotionButton>
              </div>
            </motion.div>
          )}

          {/* STEP 2: CONTEXT DETAILS */}
          {step === 2 && !isGenerating && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="space-y-10"
            >
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-display font-bold">
                  Project Context
                </h1>
                <p className="text-xl text-white/50 font-light max-w-lg mx-auto">
                  These details sharpen the output and improve relevance.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm text-white/60 font-mono uppercase tracking-widest">Industry</label>
                  <input
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g., Fintech, Real Estate, Hospitality"
                    className="w-full px-4 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/30 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/60 font-mono uppercase tracking-widest">Target Audience</label>
                  <input
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="e.g., Enterprise buyers, UAE residents"
                    className="w-full px-4 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/30 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/60 font-mono uppercase tracking-widest">Primary Goal</label>
                  <input
                    value={primaryGoal}
                    onChange={(e) => setPrimaryGoal(e.target.value)}
                    placeholder="e.g., Generate leads, Book demos"
                    className="w-full px-4 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/30 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/60 font-mono uppercase tracking-widest">Primary CTA</label>
                  <input
                    value={primaryCta}
                    onChange={(e) => setPrimaryCta(e.target.value)}
                    placeholder="e.g., Book Consultation"
                    className="w-full px-4 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/30 transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-10 px-4">
                <MotionButton variant="ghost" onClick={() => setStep(1)} className="text-white/50 hover:text-white">
                  Back
                </MotionButton>
                <MotionButton
                  size="lg"
                  onClick={() => setStep(3)}
                  className="rounded-full px-12 h-16 text-xl font-bold bg-gradient-to-r from-[var(--rare-blue)] to-[var(--aquamarine)] text-white shadow-[0_0_50px_-10px_rgba(45,107,255,0.4)] border-0 hover:scale-105 transition-transform"
                >
                  Continue <ChevronRight className="ml-2" />
                </MotionButton>
              </div>
            </motion.div>
          )}

          {/* STEP 3: TONE & VIBE */}
          {step === 3 && !isGenerating && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="space-y-10"
            >
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-display font-bold">
                  Define the Atmosphere
                </h1>
                <p className="text-xl text-white/50 font-light max-w-lg mx-auto">
                  How should your visitors feel when they land on your site?
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { name: "Calm Luxury", desc: "Sophisticated, serif typography, soft transitions.", color: "bg-[#eaddcf]" },
                  { name: "Modern Minimal", desc: "Clean lines, heavy whitespace, functional.", color: "bg-[#f5f5f5]" },
                  { name: "Bold Premium", desc: "High contrast, large type, impactful imagery.", color: "bg-[#1a1a1a]" },
                  { name: "Futuristic Glass", desc: "Dark mode, neon accents, glassmorphism.", color: "bg-[#0a0a2e]" }
                ].map((v) => (
                  <button
                    key={v.name}
                    onClick={() => setVibe(v.name)}
                    className={`relative p-8 rounded-3xl border transition-all duration-300 text-left group overflow-hidden ${
                      vibe === v.name 
                        ? "bg-white/10 border-[var(--aquamarine)] ring-1 ring-[var(--aquamarine)]" 
                        : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                             <h3 className={`font-bold text-xl mb-2 ${vibe === v.name ? "text-white" : "text-white/90"}`}>{v.name}</h3>
                             <p className="text-sm text-white/50 leading-relaxed">{v.desc}</p>
                        </div>
                        {vibe === v.name ? (
                            <CheckCircle2 className="text-[var(--aquamarine)] shrink-0" size={24} />
                        ) : (
                            <div className={`w-6 h-6 rounded-full opacity-20 ${v.color}`} />
                        )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center pt-10 px-4">
                <MotionButton variant="ghost" onClick={() => setStep(2)} className="text-white/50 hover:text-white">
                  Back
                </MotionButton>
                <MotionButton
                  size="lg"
                  onClick={handleGenerate}
                  className="rounded-full px-12 h-16 text-xl font-bold bg-gradient-to-r from-[var(--rare-blue)] to-[var(--aquamarine)] text-white shadow-[0_0_50px_-10px_rgba(45,107,255,0.4)] border-0 hover:scale-105 transition-transform"
                >
                  <Sparkles className="mr-2 fill-white" /> Generate Preview
                </MotionButton>
              </div>
            </motion.div>
          )}
          {/* LOADING STATE */}
          {isGenerating && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center space-y-12 text-center py-20"
            >
              <div className="relative w-40 h-40">
                 {/* Cinematic Loader */}
                <div className="absolute inset-0 rounded-full border-t border-[var(--aquamarine)]/50 animate-[spin_3s_linear_infinite]" />
                <div className="absolute inset-2 rounded-full border-r border-[var(--rare-blue)]/50 animate-[spin_2s_linear_infinite_reverse]" />
                <div className="absolute inset-4 rounded-full border-b border-purple-500/50 animate-[spin_4s_linear_infinite]" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full backdrop-blur-md flex items-center justify-center animate-pulse">
                        <Wand2 className="text-white opacity-80" size={32} />
                    </div>
                </div>
              </div>

              <div className="space-y-4 max-w-md mx-auto">
                <h2 className="text-3xl font-bold font-display tracking-tight">Constructing Blueprint</h2>
                <div className="h-12 flex items-center justify-center">
                   <AnimatePresence mode="wait">
                     <motion.div
                        key={loadingStepIndex}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="text-[var(--aquamarine)] font-mono text-sm uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full"
                     >
                        {LOADING_STEPS[loadingStepIndex]}
                     </motion.div>
                   </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

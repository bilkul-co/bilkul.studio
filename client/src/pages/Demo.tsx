import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { MotionButton } from "@/components/ui/motion-button";
import { FluidBackground } from "@/components/ui/fluid-background";
import { ArrowLeft, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { generatePageBlueprint } from "@/lib/demo-generator";
import { useQueryClient } from "@tanstack/react-query";

// Steps for the loading animation
const LOADING_STEPS = [
  "Analyzing requirements...",
  "Structuring layout...",
  "Applying design system...",
  "Polishing interactions...",
  "Finalizing preview..."
];

export default function DemoWizard() {
  const [step, setStep] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [vibe, setVibe] = useState("Modern Minimal");
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Start loading steps animation
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
      const blueprint = await generatePageBlueprint(prompt, vibe);
      // Store in query cache or local storage to pass to preview
      queryClient.setQueryData(["demo-blueprint"], blueprint);
      // Add a small delay for the final step
      setTimeout(() => {
        setLocation("/demo/preview");
      }, 1000);
    } catch (error) {
      console.error("Generation failed", error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#030305] text-white overflow-hidden relative flex flex-col items-center justify-center p-6">
      <FluidBackground className="opacity-40" />
      
      {/* Back Button */}
      <div className="absolute top-8 left-8 z-50">
        <MotionButton variant="ghost" onClick={() => setLocation("/")} className="text-white/60 hover:text-white hover:bg-white/10">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </MotionButton>
      </div>

      <div className="w-full max-w-2xl relative z-20">
        <AnimatePresence mode="wait">
          {/* STEP 1: PROMPT */}
          {step === 1 && !isGenerating && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <div className="space-y-2 text-center">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[var(--aquamarine)] mb-4"
                >
                  <Sparkles size={12} />
                  <span>AI Demo Builder</span>
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                  What are we building?
                </h1>
                <p className="text-xl text-white/50 font-light">
                  Describe your dream project in a few words.
                </p>
              </div>

              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--rare-blue)] to-[var(--aquamarine)] rounded-2xl opacity-50 group-hover:opacity-100 transition duration-500 blur-md" />
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A luxury dental clinic in Dubai with online booking and team profiles..."
                  className="relative w-full bg-[#0a0a12] rounded-xl border border-white/10 p-6 text-xl min-h-[160px] focus:outline-none focus:ring-2 focus:ring-white/20 placeholder:text-white/20 resize-none z-10"
                />
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {["Luxury Real Estate", "SaaS Platform", "Digital Agency", "E-commerce Store"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setPrompt(s)}
                    className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-sm transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <MotionButton
                  size="lg"
                  onClick={() => {
                    if (prompt.trim()) setStep(2);
                  }}
                  disabled={!prompt.trim()}
                  className="rounded-full px-12 h-14 text-lg font-bold bg-white text-black hover:bg-white/90 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                >
                  Next Step
                </MotionButton>
              </div>
            </motion.div>
          )}

          {/* STEP 2: VIBE */}
          {step === 2 && !isGenerating && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2">
                <h1 className="text-4xl md:text-5xl font-display font-bold">
                  Choose a Vibe
                </h1>
                <p className="text-xl text-white/50 font-light">
                  How should it feel?
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Calm Luxury", "Modern Minimal", "Bold Premium", "Futuristic Glass"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setVibe(v)}
                    className={`relative p-6 rounded-2xl border transition-all duration-300 text-left group overflow-hidden ${
                      vibe === v 
                        ? "bg-white/10 border-[var(--aquamarine)] shadow-[0_0_30px_-10px_var(--aquamarine)]" 
                        : "bg-white/5 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-2">
                             <h3 className={`font-bold text-lg ${vibe === v ? "text-white" : "text-white/80"}`}>{v}</h3>
                             {vibe === v && <CheckCircle2 className="text-[var(--aquamarine)]" size={20} />}
                        </div>
                        <p className="text-sm text-white/40">
                            {v === "Calm Luxury" && "Sophisticated, serif fonts, soft transitions."}
                            {v === "Modern Minimal" && "Clean lines, plenty of whitespace, sans-serif."}
                            {v === "Bold Premium" && "High contrast, large typography, impactful."}
                            {v === "Futuristic Glass" && "Blur effects, gradients, dark mode aesthetics."}
                        </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center pt-8">
                <MotionButton variant="ghost" onClick={() => setStep(1)}>
                  Back
                </MotionButton>
                <MotionButton
                  size="lg"
                  onClick={handleGenerate}
                  className="rounded-full px-12 h-14 text-lg font-bold bg-gradient-to-r from-[var(--rare-blue)] to-[var(--aquamarine)] text-white shadow-[0_0_40px_-10px_rgba(45,107,255,0.5)] border-0"
                >
                  Generate Demo
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
              className="flex flex-col items-center justify-center space-y-8 text-center"
            >
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full border-t-2 border-[var(--aquamarine)] animate-spin" />
                <div className="absolute inset-4 rounded-full border-r-2 border-[var(--rare-blue)] animate-spin animation-delay-500" />
                <div className="absolute inset-8 rounded-full border-b-2 border-purple-500 animate-spin animation-delay-1000" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="text-white animate-pulse" size={32} />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold font-display">Building your demo...</h2>
                <div className="h-6 overflow-hidden relative">
                   <AnimatePresence mode="wait">
                     <motion.p
                        key={loadingStepIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="text-white/60 font-mono text-sm uppercase tracking-widest"
                     >
                        {LOADING_STEPS[loadingStepIndex]}
                     </motion.p>
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
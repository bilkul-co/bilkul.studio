import { HolographicCard } from "@/components/ui/holographic-card";
import { MotionButton } from "@/components/ui/motion-button";
import { Sparkles, ArrowRight, Wand2 } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export function DemoTeaser() {
  return (
    <section className="py-24 relative overflow-hidden">
        {/* Decorative BG */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-[var(--rare-blue)]/5 to-transparent rounded-full blur-[100px] opacity-30 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                <div className="w-full md:w-1/2">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[var(--aquamarine)] mb-6">
                            <Sparkles size={12} />
                            <span>BETA FEATURE</span>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            See Your Vision <br />
                            <span className="text-gradient-primary">In 30 Seconds.</span>
                        </h2>
                        
                        <p className="text-xl text-white/60 mb-8 leading-relaxed font-light">
                            Experience the power of our AI-driven design engine. Describe your dream project, and watch us generate a tailored interactive preview instantly.
                        </p>
                        
                        <ul className="space-y-4 mb-10">
                            {[
                                "Instant wireframe generation",
                                "Tailored copy & aesthetics",
                                "Downloadable project blueprint"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-white/80">
                                    <div className="w-6 h-6 rounded-full bg-[var(--rare-blue)]/20 flex items-center justify-center text-[var(--aquamarine)]">
                                        <Wand2 size={12} />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <Link href="/demo">
                            <MotionButton size="lg" className="rounded-full px-8 bg-white text-black hover:bg-white/90 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] font-bold">
                                Try Demo Builder <ArrowRight size={16} className="ml-2" />
                            </MotionButton>
                        </Link>
                    </motion.div>
                </div>
                
                <div className="w-full md:w-1/2">
                    <motion.div
                         initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
                         whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.8 }}
                    >
                        <HolographicCard className="p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent">
                            <div className="bg-[#050510] rounded-xl overflow-hidden relative aspect-video group cursor-pointer border border-white/5">
                                {/* Grid Background */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
                                
                                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--rare-blue)]/20 to-[var(--aquamarine)]/10 z-0" />
                                
                                {/* Mock UI Interface - Technical Header */}
                                <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 flex items-center px-4 border-b border-white/5 justify-between">
                                    <div className="flex gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                    </div>
                                    <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                                        bilkul-engine-v3.0.1
                                    </div>
                                </div>
                                
                                <div className="absolute inset-0 flex items-center justify-center mt-10">
                                    <div className="text-center p-8 relative">
                                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/10 group-hover:border-[var(--aquamarine)]/50 transition-colors duration-500 relative">
                                            <div className="absolute inset-0 rounded-full border border-t-[var(--aquamarine)] border-r-transparent border-b-transparent border-l-transparent animate-spin opacity-50" />
                                            <Wand2 size={32} className="text-[var(--aquamarine)] drop-shadow-[0_0_10px_var(--aquamarine)]" />
                                        </div>
                                        <h3 className="text-sm font-mono text-[var(--aquamarine)] uppercase tracking-widest mb-2 animate-pulse">Initializing...</h3>
                                        
                                        {/* Fake Code Lines */}
                                        <div className="text-[10px] font-mono text-left text-white/40 space-y-1 w-48 mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="flex justify-between"><span>{'>'} load_modules</span><span className="text-green-500">OK</span></div>
                                            <div className="flex justify-between"><span>{'>'} parse_intent</span><span className="text-green-500">OK</span></div>
                                            <div className="flex justify-between"><span>{'>'} generate_ui</span><span className="text-yellow-500">Processing...</span></div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Scanline Effect */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--aquamarine)] to-transparent opacity-50 animate-scanline" />
                            </div>
                        </HolographicCard>
                    </motion.div>
                </div>
            </div>
        </div>
    </section>
  );
}
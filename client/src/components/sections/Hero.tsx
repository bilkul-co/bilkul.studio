import { Link } from "wouter";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionButton } from "@/components/ui/motion-button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
      {/* Aurora Gradient Background */}
      <div className="absolute inset-0 aurora-bg opacity-30 pointer-events-none" />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none noise-bg mix-blend-overlay" />
      
      {/* Abstract 3D Element from Framer */}
      <div className="absolute right-[-10%] top-[20%] w-[50%] h-[50%] opacity-40 pointer-events-none blur-3xl animate-pulse-slow">
         <img src="/assets/framer/abstract-1.png" className="w-full h-full object-contain" alt="" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
                <div 
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-sm font-medium text-white/80 mb-8 backdrop-blur-md shadow-lg"
                >
                <span className="w-2 h-2 rounded-full bg-[var(--aquamarine)] animate-pulse shadow-[0_0_10px_var(--aquamarine)]" />
                <span className="text-xs uppercase tracking-[0.2em] font-mono">Intelligent Automation</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1] mb-8 text-white">
                Systems for the <br />
                <span className="text-gradient-primary">Next Generation.</span>
                </h1>
                
                <p className="text-xl text-white/60 max-w-lg mb-10 leading-relaxed font-light">
                Bilkul brings AI automation to your fingertips & streamlines tasks. We replace unreliable freelancers and expensive agencies for one flat monthly fee.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <Link href="/contact">
                    <MotionButton size="lg" className="h-14 px-10 text-base rounded-full font-bold shadow-[0_0_30px_-10px_rgba(45,107,255,0.4)]">
                    Book a Call
                    </MotionButton>
                </Link>
                <Link href="/services">
                    <MotionButton variant="outline" size="lg" className="h-14 px-10 text-base rounded-full border-white/10 hover:bg-white/5 backdrop-blur-md font-medium text-white">
                    View Services
                    </MotionButton>
                </Link>
                </div>
            </div>

            <div className="relative hidden lg:block">
                <GlassCard className="relative z-10 bg-white/[0.01] border-white/10 p-2 rounded-3xl" noPadding spotlight={false}>
                    <img 
                        src="/assets/framer/work-1.png" 
                        alt="Dashboard Preview" 
                        className="rounded-2xl shadow-2xl border border-white/5"
                    />
                    
                    {/* Floating Badge */}
                    <div className="absolute -bottom-10 -left-10 bg-[#060A12]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl max-w-[280px]">
                        <div className="flex items-center gap-4 mb-3">
                             <div className="w-10 h-10 rounded-full bg-[var(--rare-blue)]/20 flex items-center justify-center text-[var(--rare-blue)] border border-[var(--rare-blue)]/20">
                                <ArrowRight size={20} className="-rotate-45" />
                             </div>
                             <div>
                                <h4 className="text-white font-bold text-sm">Fast Delivery</h4>
                                <p className="text-white/40 text-xs">Avg. 48 hours</p>
                             </div>
                        </div>
                        <p className="text-white/60 text-sm italic">"The work is incredible and the process is refreshingly painless."</p>
                    </div>
                </GlassCard>
                
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--rare-blue)]/20 blur-[100px] -z-10 rounded-full pointer-events-none" />
            </div>
        </div>
      </div>
    </section>
  );
}
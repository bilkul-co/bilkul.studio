import { Link } from "wouter";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionButton } from "@/components/ui/motion-button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-white">
      {/* Clean Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-600 mb-8">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-xs uppercase tracking-wider font-bold">Accepting New Clients</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[1.05] mb-8 text-slate-900">
              Intelligent Automation <br />
              <span className="text-slate-400">for Modern Business.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mb-12 leading-relaxed font-normal">
              Bilkul brings AI automation to your fingertips. We replace unreliable freelancers and expensive agencies for one flat monthly fee.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full justify-center">
               <Link href="/contact">
                <MotionButton size="lg" className="h-14 px-10 text-base rounded-full font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10 border-0 min-w-[180px]">
                  Book a Call
                </MotionButton>
               </Link>
               <Link href="/pricing">
                <MotionButton variant="outline" size="lg" className="h-14 px-10 text-base rounded-full border-slate-200 bg-white hover:bg-slate-50 text-slate-900 font-bold min-w-[180px]">
                  View Pricing
                </MotionButton>
               </Link>
            </div>

            {/* Visual Proof / Bento Grid Preview */}
            <div className="w-full relative mt-8">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[500px] bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 blur-[100px] -z-10 opacity-60 rounded-full" />
                
                <GlassCard className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-2xl shadow-slate-200/50 p-2 rounded-3xl overflow-hidden" noPadding>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="md:col-span-2 relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 group">
                             <img src="/assets/framer/work-1.png" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" alt="Dashboard" />
                             <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
                                Automation Dashboard
                             </div>
                        </div>
                        <div className="hidden md:flex flex-col gap-2">
                            <div className="flex-1 relative overflow-hidden rounded-2xl bg-blue-50 group">
                                <img src="/assets/framer/work-3.png" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" alt="Mobile App" />
                            </div>
                            <div className="h-[120px] bg-slate-900 rounded-2xl p-6 flex flex-col justify-center text-white">
                                <div className="text-3xl font-bold mb-1">48h</div>
                                <div className="text-slate-400 text-sm">Average Delivery</div>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </div>
            
            {/* Social Proof Strip */}
            <div className="mt-20 pt-10 border-t border-slate-100 w-full">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Trusted by Forward Thinkers</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder logos - purely for layout */}
                    <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
                    <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
                    <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
                    <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
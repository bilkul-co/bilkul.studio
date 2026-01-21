import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const FluidBackground = ({ className }: { className?: string }) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none bg-[#030305]", className)}>
      {/* Deepest Void Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-[#0a0a1a] opacity-90" />

      {/* Deep Indigo Core - Darker - Slower */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#1a0535]/30 rounded-full blur-[140px] mix-blend-screen animate-blob opacity-60 will-change-transform" />
      
      {/* Electric Blue Flow - More subtle - Slower */}
      <div className="absolute top-[-10%] right-[-20%] w-[60vw] h-[60vw] bg-[#001a80]/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000 opacity-50 will-change-transform" />
      
      {/* Violet Mist - Deeper - Slower */}
      <div className="absolute bottom-[-20%] left-[20%] w-[80vw] h-[80vw] bg-[#2d0f59]/20 rounded-full blur-[160px] mix-blend-screen animate-blob animation-delay-4000 opacity-40 will-change-transform" />
      
      {/* Neon Accent - Very faint - Slower */}
      <div className="absolute top-[40%] left-[60%] w-[40vw] h-[40vw] bg-[#601070]/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000 opacity-30 will-change-transform" />
      
      {/* Cinematic Grain - Stronger for texture */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.08] mix-blend-overlay" />
      
      {/* Vignette for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
    </div>
  );
};

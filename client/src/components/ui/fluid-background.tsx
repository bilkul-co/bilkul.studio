import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const FluidBackground = ({ className }: { className?: string }) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Deep Indigo Core */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#2a0a55]/40 rounded-full blur-[120px] mix-blend-screen animate-blob" />
      
      {/* Electric Blue Flow */}
      <div className="absolute top-[-10%] right-[-20%] w-[60vw] h-[60vw] bg-[#0044ff]/30 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000" />
      
      {/* Violet Mist */}
      <div className="absolute bottom-[-20%] left-[20%] w-[80vw] h-[80vw] bg-[#6d28d9]/30 rounded-full blur-[140px] mix-blend-screen animate-blob animation-delay-4000" />
      
      {/* Neon Pink/Magenta Accent */}
      <div className="absolute top-[40%] left-[60%] w-[40vw] h-[40vw] bg-[#d946ef]/20 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000" />
      
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.04] mix-blend-overlay" />
    </div>
  );
};

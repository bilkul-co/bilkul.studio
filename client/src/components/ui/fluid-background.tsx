import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const FluidBackground = ({ className }: { className?: string }) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[var(--rare-blue)]/40 rounded-full blur-[100px] mix-blend-screen animate-blob" />
      <div className="absolute top-[-10%] right-[-20%] w-[60vw] h-[60vw] bg-[var(--aquamarine)]/30 rounded-full blur-[90px] mix-blend-screen animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-20%] left-[20%] w-[80vw] h-[80vw] bg-[var(--violet-mist)]/30 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-4000" />
      <div className="absolute top-[40%] left-[60%] w-[40vw] h-[40vw] bg-[var(--soft-pink)]/20 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000" />
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.04] mix-blend-overlay" />
    </div>
  );
};

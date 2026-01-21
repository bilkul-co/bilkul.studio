import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const ArchitecturalBackground = ({ className }: { className?: string }) => {
  // Mouse parallax for the horizon light
  const x = useSpring(0, { stiffness: 50, damping: 20 });
  const y = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xPos = (e.clientX / innerWidth - 0.5) * 100; // -50 to 50
      const yPos = (e.clientY / innerHeight - 0.5) * 50;  // -25 to 25
      
      x.set(xPos);
      y.set(yPos);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none bg-[#030305]", className)}>
      {/* 1. Base Void */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020204] via-[#050810] to-[#0a0f1e]" />

      {/* 2. Horizon Glow (The "Sun") */}
      <motion.div 
        style={{ x, y }}
        className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] bg-[var(--rare-blue)]/20 blur-[120px] rounded-full mix-blend-screen opacity-60" 
      />
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[80vw] h-[20vw] bg-[var(--aquamarine)]/10 blur-[100px] rounded-full mix-blend-screen opacity-40" />

      {/* 3. The Grid Floor (Perspective) */}
      <div className="absolute inset-0 perspective-[1000px] overflow-hidden">
        <div className="absolute inset-0 top-[20%] bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:rotateX(60deg)_scale(2)] origin-top opacity-30 mask-gradient-b animate-grid-flow" />
      </div>

      {/* 4. Vertical Data Lines (Subtle Matrix effect) */}
      <div className="absolute inset-0 flex justify-around opacity-20 mask-gradient-t">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse-slow" style={{ animationDelay: "0s" }} />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse-slow" style={{ animationDelay: "3s" }} />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse-slow" style={{ animationDelay: "4s" }} />
      </div>

      {/* 5. Vignette & Texture */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.05] mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#030305_100%)]" />
    </div>
  );
};

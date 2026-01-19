import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { transitions } from "@/lib/motion";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  spotlight?: boolean;
  noPadding?: boolean;
  colored?: boolean; // New prop for intense color mode
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, hoverEffect = false, spotlight = true, noPadding = false, colored = false, ...props }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current || !spotlight) return;

      const rect = divRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    return (
      <motion.div
        ref={divRef}
        onMouseMove={handleMouseMove}
        initial="initial"
        whileInView="whileInView"
        viewport={transitions.card.viewport}
        transition={transitions.card.transition}
        variants={transitions.card}
        className={cn(
          "glass-card relative overflow-hidden rounded-2xl transition-all duration-500 group",
          hoverEffect && "hover:translate-y-[-4px] hover:shadow-[0_20px_40px_-15px_rgba(45,107,255,0.3)] hover-glow-border", // Blue shadow
          colored && "border-[var(--rare-blue)]/20 bg-[var(--rare-blue)]/5 hover:bg-[var(--rare-blue)]/10", // Colored variant
          !noPadding && "p-8",
          className
        )}
        {...props as any}
      >
        {spotlight && (
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500 z-10"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  650px circle at ${mouseX}px ${mouseY}px,
                  rgba(255, 255, 255, 0.15),
                  transparent 80%
                )
              `,
            }}
          />
        )}
        
        {/* Holographic Border on Hover - Colorful */}
        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-[var(--aquamarine)]/30 to-[var(--soft-pink)]/30 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none mix-blend-screen" />

        {/* Inner subtle noise texture for tactile feel */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} 
        />
        
        <div className="relative z-30 h-full">{children}</div>
      </motion.div>
    );
  }
);
GlassCard.displayName = "GlassCard";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { transitions } from "@/lib/motion";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  spotlight?: boolean;
  noPadding?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, hoverEffect = false, spotlight = true, noPadding = false, ...props }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current || !spotlight) return;

      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
      if (spotlight) setOpacity(1);
    };

    const handleMouseLeave = () => {
      if (spotlight) setOpacity(0);
    };

    return (
      <motion.div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial="initial"
        whileInView="whileInView"
        viewport={transitions.card.viewport}
        transition={transitions.card.transition}
        variants={transitions.card}
        className={cn(
          "glass-card relative overflow-hidden rounded-2xl transition-all duration-500",
          hoverEffect && "hover:translate-y-[-4px] hover:shadow-2xl hover-glow-border",
          !noPadding && "p-8",
          className
        )}
        {...props as any}
      >
        {spotlight && (
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 z-0"
            style={{
              opacity,
              background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
            }}
          />
        )}
        
        {/* Inner subtle noise texture for tactile feel */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} 
        />
        
        <div className="relative z-10 h-full">{children}</div>
      </motion.div>
    );
  }
);
GlassCard.displayName = "GlassCard";
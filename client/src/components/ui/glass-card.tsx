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
          "glass-card relative overflow-hidden rounded-xl transition-all duration-500 border-white/[0.08]",
          hoverEffect && "hover:border-white/20 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.05)]",
          !noPadding && "p-6",
          className
        )}
        {...props as any}
      >
        {spotlight && (
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-500"
            style={{
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.08), transparent 40%)`,
            }}
          />
        )}
        <div className="relative z-10 h-full">{children}</div>
      </motion.div>
    );
  }
);
GlassCard.displayName = "GlassCard";
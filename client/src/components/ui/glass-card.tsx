import React from "react";
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
  ({ children, className, hoverEffect = false, spotlight = false, noPadding = false, ...props }, ref) => {
    
    return (
      <motion.div
        ref={ref}
        initial="initial"
        whileInView="whileInView"
        viewport={transitions.card.viewport}
        transition={transitions.card.transition}
        variants={transitions.card}
        className={cn(
          "bg-white border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl transition-all duration-300 overflow-hidden",
          hoverEffect && "hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-blue-100",
          !noPadding && "p-8",
          className
        )}
        {...props as any}
      >
        <div className="relative z-10 h-full">{children}</div>
      </motion.div>
    );
  }
);
GlassCard.displayName = "GlassCard";
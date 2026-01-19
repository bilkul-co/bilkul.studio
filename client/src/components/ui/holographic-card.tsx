import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const HolographicCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    x.set(clientX - left);
    y.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div
      onMouseMove={onMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-500",
        className
      )}
    >
      {/* Prismatic/Iridescent Glow Layer */}
      <div className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 group-hover:opacity-100 opacity-0">
         <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-20" />
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]" />
      </div>

      {/* Hover Reveal Border */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={style}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--aquamarine)] via-[var(--rare-blue)] to-[var(--aquamarine)] opacity-50" />
      </motion.div>
      
      {/* Inner Content */}
      <div className="relative z-20 h-full">
        {children}
      </div>

      {/* Glass Reflection Shine */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full group-hover:animate-shine z-30" />
    </div>
  );
};

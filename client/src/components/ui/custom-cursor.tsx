import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const CustomCursor = () => {
  const [hovered, setHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.classList.contains('cursor-hover')) {
            setHovered(true);
        } else {
            setHovered(false);
        }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] rounded-full border border-white/50 mix-blend-difference flex items-center justify-center transition-all duration-200",
        hovered ? "w-16 h-16 bg-white/10 border-white/80 backdrop-blur-[1px]" : "bg-transparent"
      )}
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    >
      <div className={cn(
        "w-1.5 h-1.5 bg-white rounded-full transition-all duration-200",
        hovered ? "w-0 h-0 opacity-0" : "opacity-100"
      )} />
    </motion.div>
  );
};

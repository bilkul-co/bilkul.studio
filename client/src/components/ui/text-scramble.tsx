import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CHARS = "-_~=+*!@#$%^&()[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface TextScrambleProps {
  children: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function TextScramble({ children, className, speed = 40, delay = 0 }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Initial scramble on mount
    triggerAnimation();
  }, []);

  const triggerAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    let iteration = 0;
    const maxIterations = 10;
    
    // Initial delay
    setTimeout(() => {
        const interval = setInterval(() => {
            setDisplayText(
                children
                .split("")
                .map((char, index) => {
                    if (index < iteration) {
                        return children[index];
                    }
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join("")
            );

            if (iteration >= children.length) {
                clearInterval(interval);
                setIsAnimating(false);
            }

            iteration += 1/2; // Speed control
        }, speed);
    }, delay);
  };

  return (
    <motion.span 
        className={className}
        onHoverStart={triggerAnimation}
    >
      {displayText}
    </motion.span>
  );
}
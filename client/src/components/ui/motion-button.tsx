import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "./button"
import { transitions } from "@/lib/motion"

type MotionButtonProps = ButtonProps & HTMLMotionProps<"button">

const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <motion.div
        whileHover={transitions.button.hover as any}
        whileTap={transitions.button.tap as any}
        transition={transitions.button.transition as any}
        className="inline-block"
      >
        <Button
          ref={ref}
          variant={variant}
          className={cn(
            "w-full relative overflow-hidden font-medium tracking-wide",
            // Primary Button Gradient Override
            variant === 'default' || !variant 
              ? "bg-gradient-to-r from-[var(--rare-blue)] to-[var(--teal)] border-0 text-white shadow-[0_0_20px_-5px_rgba(45,107,255,0.4)] hover:shadow-[0_0_25px_-5px_rgba(53,245,213,0.4)]" 
              : "",
            // Secondary Button Glass Override
            variant === 'outline'
              ? "bg-white/[0.05] border-white/10 text-white hover:bg-white/[0.1] hover:border-white/20 backdrop-blur-md"
              : "",
            className
          )}
          {...props}
        />
      </motion.div>
    )
  }
)
MotionButton.displayName = "MotionButton"

export { MotionButton }
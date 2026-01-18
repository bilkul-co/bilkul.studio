import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, hoverEffect = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "glass rounded-xl p-6 relative overflow-hidden transition-all duration-300",
          hoverEffect && "hover:bg-white/10 hover:shadow-2xl hover:border-white/20 group",
          className
        )}
        initial={hoverEffect ? { y: 0 } : undefined}
        whileHover={hoverEffect ? { y: -5 } : undefined}
        {...props}
      >
        {hoverEffect && (
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}
        {children}
      </motion.div>
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
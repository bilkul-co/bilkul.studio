import * as React from "react"
import { motion, HTMLMotionProps, AnimationProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "./button"
import { transitions } from "@/lib/motion"

type MotionButtonProps = ButtonProps & HTMLMotionProps<"button">

const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <motion.div
        whileHover={transitions.button.hover as any}
        whileTap={transitions.button.tap as any}
        transition={transitions.button.transition as any}
        className="inline-block"
      >
        <Button
          ref={ref}
          className={cn("w-full relative overflow-hidden", className)}
          {...props}
        />
      </motion.div>
    )
  }
)
MotionButton.displayName = "MotionButton"

export { MotionButton }
import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "./button"

type MotionButtonProps = ButtonProps & HTMLMotionProps<"button">

const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="inline-block"
      >
        <Button
          ref={ref}
          className={cn("w-full", className)}
          {...props}
        />
      </motion.div>
    )
  }
)
MotionButton.displayName = "MotionButton"

export { MotionButton }
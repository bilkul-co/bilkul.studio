import * as React from "react"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "./button"

const MotionButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        className={cn(
          "relative overflow-hidden font-medium tracking-wide transition-all duration-200",
          className
        )}
        {...props}
      />
    )
  }
)
MotionButton.displayName = "MotionButton"

export { MotionButton }
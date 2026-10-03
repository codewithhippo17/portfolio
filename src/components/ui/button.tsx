import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"

function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

const buttonVariants = cva(
  "inline-flex items-center justify-center font-mono uppercase text-[10px] sm:text-xs font-bold tracking-widest rounded-md px-4 py-2 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-mauve focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-ctp-mauve text-ctp-base hover:bg-ctp-mauve/90 dark:text-ctp-crust",
        outline: "border border-ctp-surface1 bg-transparent text-ctp-subtext0 hover:border-ctp-surface2 hover:bg-ctp-surface0 hover:text-ctp-mauve",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants, cn }

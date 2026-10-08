import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ctp-mauve focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-ctp-surface0 text-ctp-text hover:bg-ctp-surface1",
        completed:
          "border-ctp-green/40 bg-ctp-green/10 text-ctp-green",
        ongoing:
          "border-ctp-blue/40 bg-ctp-blue/10 text-ctp-blue",
        archived:
          "border-ctp-overlay1/40 bg-ctp-overlay1/10 text-ctp-text",
        "info-light":
          "border-ctp-sky/40 bg-ctp-sky/10 text-ctp-sky",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

export function GlassCard({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]",
        "ring-1 ring-white/5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

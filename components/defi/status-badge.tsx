import { cn } from "@/lib/utils"

type Props = {
  status: "active" | "dueSoon" | "repaid"
  className?: string
}

export function StatusBadge({ status, className }: Props) {
  const map = {
    active: { dot: "bg-sky-400", text: "text-sky-300", label: "Active" },
    dueSoon: { dot: "bg-fuchsia-400", text: "text-fuchsia-300", label: "Due Soon" },
    repaid: { dot: "bg-teal-400", text: "text-teal-300", label: "Repaid" },
  }[status]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs",
        map.text,
        className,
      )}
      aria-label={`Status: ${map.label}`}
    >
      <span className={cn("h-2.5 w-2.5 rounded-full", map.dot)} aria-hidden="true" />
      {map.label}
    </span>
  )
}

import { cn } from "cn"

/**
 * Small pill used for job type, remote flag and category labels.
 * `variant` picks a subtle, theme-aware color treatment.
 */
export function JobBadge({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode
  variant?: "neutral" | "indigo" | "success"
  className?: string
}) {
  const variants = {
    neutral: "bg-muted text-muted-foreground",
    indigo:
      "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
    success:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  } as const

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

import type { DashboardStat } from "./dashboard-config"

type DashboardStatCardProps = DashboardStat

/**
 * Single overview metric card with a lucide icon and optional hint line.
 */
export function DashboardStatCard({
  label,
  value,
  hint,
  icon: Icon,
}: DashboardStatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-card-foreground">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

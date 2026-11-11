import Link from "next/link"

import type { DashboardAction } from "./dashboard-config"

type DashboardActionCardProps = DashboardAction

/**
 * Clickable quick-action card navigating to a role-specific dashboard route.
 */
export function DashboardActionCard({
  title,
  description,
  href,
  icon: Icon,
}: DashboardActionCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Icon className="size-5 text-primary" />
      <p className="mt-3 text-sm font-medium text-card-foreground">{title}</p>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </Link>
  )
}

import type { AppRole, SidebarUser } from "@/components/sidebar/types"

import { DashboardActionCard } from "./dashboard-action-card"
import { DASHBOARD_CONFIG } from "./dashboard-config"
import { DashboardStatCard } from "./dashboard-stat-card"

type DashboardOverviewProps = {
  role: AppRole
  user: SidebarUser | null
}

/**
 * Role-specific dashboard overview: greeting, stat cards and quick actions,
 * all driven by `DASHBOARD_CONFIG[role]`.
 */
export function DashboardOverview({ role, user }: DashboardOverviewProps) {
  const config = DASHBOARD_CONFIG[role]
  const firstName = user?.name?.trim().split(/\s+/)[0]

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Welcome back{firstName ? `, ${firstName}` : ""}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{config.subtitle}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {config.stats.map((stat) => (
          <DashboardStatCard key={stat.label} {...stat} />
        ))}
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-foreground">
          {config.sectionTitle}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {config.actions.map((action) => (
            <DashboardActionCard key={action.href} {...action} />
          ))}
        </div>
      </section>
    </div>
  )
}

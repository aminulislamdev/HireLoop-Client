import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { requireSessionRole } from "@/lib/session"

/**
 * Admin dashboard: platform-wide metrics and management shortcuts.
 */
export default async function AdminDashboardPage() {
  const { user } = await requireSessionRole("admin")

  return <DashboardOverview role="admin" user={user} />
}

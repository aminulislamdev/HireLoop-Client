import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { requireSessionRole } from "@/lib/session"

/**
 * Seeker dashboard: overview metrics and quick actions for job seekers.
 */
export default async function SeekerDashboardPage() {
  const { user } = await requireSessionRole("seeker")

  return <DashboardOverview role="seeker" user={user} />
}

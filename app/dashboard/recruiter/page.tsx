import { DashboardOverview } from "@/app/components/dashboard/dashboard-overview"
import { requireSessionRole } from "@/lib/session"

/**
 * Recruiter dashboard: overview metrics and quick actions for recruiters.
 */
export default async function RecruiterDashboardPage() {
  const { user } = await requireSessionRole("recruiter")

  return <DashboardOverview role="recruiter" user={user} />
}

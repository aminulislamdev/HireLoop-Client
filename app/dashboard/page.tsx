import { redirect } from "next/navigation"

import { normalizeAppRole } from "@/app/components/sidebar/types"
import { getServerSession } from "@/lib/session"

/**
 * `/dashboard` index: sends each signed-in user to the dashboard matching
 * their session role (guests are already handled by the layout).
 */
export default async function DashboardIndexPage() {
  const session = await getServerSession()
  const role = normalizeAppRole(session?.user?.role)

  redirect(`/dashboard/${role}`)
}

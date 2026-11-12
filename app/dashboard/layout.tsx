import { redirect } from "next/navigation"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { normalizeAppRole } from "@/components/sidebar/types"
import { getServerSession } from "@/lib/session"

/**
 * Role-aware dashboard layout. The Better Auth session is resolved on the
 * server; guests are sent to sign-in and the resolved role drives the whole
 * shell (sidebar navigation, topbar identity) for every nested dashboard page.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session?.user) {
    redirect("/sign-in")
  }

  const role = normalizeAppRole(session.user.role)

  return (
    <DashboardShell role={role} user={session.user}>
      {children}
    </DashboardShell>
  )
}

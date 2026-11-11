import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { AppSidebar } from "@/app/components/sidebar/AppSidebar"
import type { AppRole, SidebarUser } from "@/app/components/sidebar/types"

import { DashboardTopbar } from "./dashboard-topbar"

type DashboardShellProps = {
  role: AppRole
  user: SidebarUser | null
  children: React.ReactNode
}

/**
 * Role-aware dashboard shell. The server-resolved session role drives the
 * sidebar (navigation, header, footer) and the topbar; page content is
 * passed through as children so each role page stays independent.
 */
export function DashboardShell({ role, user, children }: DashboardShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar role={role} user={user} />
      <SidebarInset>
        <DashboardTopbar role={role} user={user} />
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

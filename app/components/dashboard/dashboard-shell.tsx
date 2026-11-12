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
 *
 * Layout contract:
 * - Root layout renders <SiteHeader /> (h-16 / lg:h-18) above everything.
 * - This shell fills only the remaining viewport height below the navbar.
 * - The sidebar is fixed but offset by the navbar height so it never
 *   overlaps the main navigation.
 */
export function DashboardShell({ role, user, children }: DashboardShellProps) {
  return (
    /*
     * SidebarProvider receives a custom style so the inner sidebar-container
     * (which is `fixed inset-y-0`) can be overridden via the CSS variable
     * `--dashboard-top` through a global CSS rule defined in globals.css.
     * We also constrain the shell height to the viewport minus the navbar.
     */
    <SidebarProvider
      className="!min-h-0 h-[calc(100svh-var(--navbar-height))]"
      style={
        {
          "--dashboard-top": "var(--navbar-height)",
        } as React.CSSProperties
      }
    >
      <AppSidebar role={role} user={user} />
      <SidebarInset className="overflow-y-auto">
        <DashboardTopbar role={role} user={user} />
        <div className="flex flex-1 flex-col p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

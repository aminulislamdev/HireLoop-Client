import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import type { AppRole, SidebarUser } from "@/app/components/sidebar/types"
import { getInitials } from "@/lib/utils"

import { ROLE_LABELS } from "./dashboard-config"

type DashboardTopbarProps = {
  role: AppRole
  user: SidebarUser | null
}

/**
 * Sticky topbar inside the dashboard shell: mobile sidebar trigger, the
 * role label and a compact session identity chip.
 */
export function DashboardTopbar({ role, user }: DashboardTopbarProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b border-sidebar-border bg-background/80 px-4 backdrop-blur">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4" />
      <p className="text-sm font-medium text-foreground">
        {ROLE_LABELS[role]} Dashboard
      </p>
      <div className="ml-auto flex items-center gap-2">
        <span className="hidden max-w-40 truncate text-xs text-muted-foreground sm:inline">
          {user?.name ?? "Guest"}
        </span>
        <Avatar size="sm">
          {user?.image ? (
            <AvatarImage src={user.image} alt={user?.name ?? "User"} />
          ) : null}
          <AvatarFallback>{getInitials(user?.name, user?.email)}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

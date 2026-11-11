import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"

import { AppSidebarRoleBadge } from "./role-badge"
import type { RoleBadgeVariant, SidebarUser } from "./types"

type AppSidebarUserProfileProps = {
  user?: SidebarUser | null
  /** Muted line under the name; omitted when a badge already covers it. */
  caption?: string
  badge?: RoleBadgeVariant | null
  /** Shown while the session is still loading or the name is empty. */
  fallbackName?: string
}

/**
 * Identity card: session avatar with initials fallback, display name, and an
 * optional role caption and/or role badge.
 */
export function AppSidebarUserProfile({
  user,
  caption,
  badge,
  fallbackName = "User",
}: AppSidebarUserProfileProps) {
  const name = user?.name?.trim() || fallbackName

  return (
    <div className="flex items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/50 p-2">
      <Avatar size="lg">
        {user?.image ? <AvatarImage src={user.image} alt={name} /> : null}
        <AvatarFallback>{getInitials(name, user?.email)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 leading-tight">
        <p className="truncate text-sm font-semibold text-sidebar-foreground">
          {name}
        </p>
        {caption ? (
          <div className="flex items-center gap-1.5">
            <p className="truncate text-xs text-muted-foreground">{caption}</p>
            {badge ? <AppSidebarRoleBadge variant={badge} /> : null}
          </div>
        ) : badge ? (
          <div className="flex items-center gap-1.5">
            <AppSidebarRoleBadge variant={badge} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

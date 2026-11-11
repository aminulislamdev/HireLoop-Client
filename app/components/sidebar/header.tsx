import { AppSidebarLogo } from "./logo"
import { AppSidebarUserProfile } from "./user-profile"
import type { AppRole, RoleBadgeVariant, SidebarUser } from "./types"

type RoleHeaderProfile = {
  caption?: string
  badge?: RoleBadgeVariant | null
  fallbackName: string
}

/**
 * Per-role header configuration: caption line, badge variant and the name
 * shown while the session is still loading.
 */
const HEADER_PROFILES: Partial<Record<AppRole, RoleHeaderProfile>> = {
  seeker: { caption: "Professional Tier", badge: null, fallbackName: "Job Seeker" },
  recruiter: { caption: "Recruiter", badge: "premium", fallbackName: "Recruiter" },
}

type AppSidebarHeaderProps = {
  role: AppRole
  user: SidebarUser | null
}

/**
 * Sidebar header, switched by role:
 * - seeker / recruiter: session-driven user profile (avatar, name, caption, badge).
 * - admin: HireLoop logo with the "Admin Console" title.
 */
export function AppSidebarHeader({ role, user }: AppSidebarHeaderProps) {
  if (role === "admin") {
    return <AppSidebarLogo title="Admin Console" subtitle="HireLoop" />
  }

  const profile = HEADER_PROFILES[role] ?? {
    caption: undefined,
    badge: null,
    fallbackName: "Job Seeker",
  }

  return (
    <AppSidebarUserProfile
      user={user}
      caption={profile.caption}
      badge={profile.badge}
      fallbackName={profile.fallbackName}
    />
  )
}

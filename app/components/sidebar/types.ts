import type { LucideIcon } from "lucide-react"

/**
 * Sidebar role. Values match the Better Auth user role, in lowercase.
 */
export type AppRole = "seeker" | "recruiter" | "admin"

/**
 * Identity shown in headers / footers. Defaults to the Better Auth session
 * user; callers may pass an override for previews or embedded contexts.
 */
export type SidebarUser = {
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string | null
}

/**
 * A single navigation entry (title, url, lucide icon).
 */
export type NavItem = {
  title: string
  url: string
  icon: LucideIcon
}

/**
 * A labeled group of navigation entries.
 */
export type NavSection = {
  label?: string
  items: NavItem[]
}

/**
 * Visual variants of the role badge pill.
 */
export type RoleBadgeVariant = "tier" | "premium" | "admin"

/**
 * Normalizes an arbitrary (Better Auth) role string into an `AppRole`,
 * defaulting to `seeker` while the session is loading or unknown.
 */
export function normalizeAppRole(role?: string | null): AppRole {
  const value = role?.trim().toLowerCase()

  if (value === "recruiter" || value === "admin") {
    return value
  }

  return "seeker"
}

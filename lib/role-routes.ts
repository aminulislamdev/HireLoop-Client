import type { AppRole } from "@/app/components/sidebar/types"

export type { AppRole }

/**
 * A navbar navigation entry.
 */
export type NavLink = {
  label: string
  href: string
}

/**
 * Canonical dashboard entry route per session role. The navbar "Dashboard"
 * link, the user menu and the `/dashboard` index all resolve through this
 * map, so a role change only requires updating it here.
 */
export const ROLE_DASHBOARD: Record<AppRole, string> = {
  seeker: "/dashboard/seeker",
  recruiter: "/dashboard/recruiter",
  admin: "/dashboard/admin",
}

/**
 * Navbar links shown to guests (shared by desktop nav and the mobile sheet).
 */
export const PUBLIC_NAV_LINKS: readonly NavLink[] = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

/**
 * Navbar links per role for signed-in users. Each list starts with the
 * role's own dashboard, so "Dashboard" always lands on the right place.
 */
export const ROLE_NAV_LINKS: Record<AppRole, readonly NavLink[]> = {
  seeker: [
    { label: "Dashboard", href: ROLE_DASHBOARD.seeker },
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Pricing", href: "/pricing" },
  ],
  recruiter: [
    { label: "Dashboard", href: ROLE_DASHBOARD.recruiter },
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Pricing", href: "/pricing" },
  ],
  admin: [
    { label: "Dashboard", href: ROLE_DASHBOARD.admin },
    { label: "Companies", href: "/company" },
    { label: "Pricing", href: "/pricing" },
  ],
}

/**
 * Resolves the navbar links for a (possibly missing / raw) session role.
 * Unknown or absent roles fall back to the guest links.
 */
export function navLinksForRole(role?: string | null): readonly NavLink[] {
  const value = role?.trim().toLowerCase()

  if (value === "seeker" || value === "recruiter" || value === "admin") {
    return ROLE_NAV_LINKS[value]
  }

  return PUBLIC_NAV_LINKS
}

/**
 * Resolves the dashboard entry route for a (possibly missing / raw) session
 * role, defaulting to the seeker dashboard like the rest of the app.
 */
export function roleDashboardPath(role?: string | null): string {
  const value = role?.trim().toLowerCase()

  if (value === "recruiter" || value === "admin") {
    return ROLE_DASHBOARD[value]
  }

  return ROLE_DASHBOARD.seeker
}

/**
 * Active-route check used for navbar link highlighting.
 */
export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`)
}

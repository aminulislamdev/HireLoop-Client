import {
  Bookmark,
  Briefcase,
  Building2,
  CreditCard,
  CirclePlus,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react"

import type { AppRole, NavSection } from "./types"

/**
 * Data-driven navigation configuration, keyed by role. Adding a section or
 * item requires only a change here — the sidebar renders whatever it holds.
 */
export const NAV_SECTIONS: Record<AppRole, NavSection[]> = {
  seeker: [
    {
      label: "Menu",
      items: [
        { title: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
        { title: "Jobs", url: "/dashboard/seeker/jobs", icon: Briefcase },
        { title: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
        { title: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
        { title: "Billing", url: "/dashboard/seeker/billing", icon: CreditCard },
        { title: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
      ],
    },
  ],
  recruiter: [
    {
      label: "Menu",
      items: [
        { title: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
        { title: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
        { title: "Add Job", url: "/dashboard/recruiter/jobs/new", icon: CirclePlus },
        { title: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
        { title: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
      ],
    },
  ],
  admin: [
    {
      label: "Console",
      items: [
        { title: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
        { title: "Users", url: "/dashboard/admin/users", icon: Users },
        { title: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
        { title: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
        { title: "Payments", url: "/dashboard/admin/payments", icon: CreditCard },
        { title: "Settings", url: "/dashboard/admin/settings", icon: Settings },
      ],
    },
  ],
}

/**
 * Picks the most specific matching URL for the current pathname, so nested
 * routes highlight exactly one item (e.g. `/dashboard/seeker/jobs` highlights
 * "Jobs", not "Dashboard").
 */
export function resolveActiveUrl(pathname: string, urls: string[]): string | null {
  let best: string | null = null

  for (const url of urls) {
    const isExact = pathname === url
    const isPrefix = pathname.startsWith(`${url}/`)

    if ((isExact || isPrefix) && (!best || url.length > best.length)) {
      best = url
    }
  }

  return best
}

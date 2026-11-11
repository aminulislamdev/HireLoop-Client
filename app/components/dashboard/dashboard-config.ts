import {
  Bookmark,
  Briefcase,
  Building2,
  Clock,
  CreditCard,
  Eye,
  FilePlus2,
  FileText,
  PlusSquare,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react"

import type { AppRole } from "@/app/components/sidebar/types"

/**
 * Human-readable role labels for the dashboard topbar.
 */
export const ROLE_LABELS: Record<AppRole, string> = {
  seeker: "Job Seeker",
  recruiter: "Recruiter",
  admin: "Administrator",
}

export type DashboardStat = {
  label: string
  value: string
  hint?: string
  icon: LucideIcon
}

export type DashboardAction = {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export type DashboardConfig = {
  subtitle: string
  stats: DashboardStat[]
  sectionTitle: string
  actions: DashboardAction[]
}

/**
 * Data-driven dashboard content, keyed by role. Each role gets its own
 * overview metrics and quick actions pointing at its dashboard routes.
 */
export const DASHBOARD_CONFIG: Record<AppRole, DashboardConfig> = {
  seeker: {
    subtitle: "Track your applications and discover new opportunities.",
    stats: [
      { label: "Applications", value: "12", hint: "3 in review", icon: FileText },
      { label: "Saved Jobs", value: "8", hint: "+2 this week", icon: Bookmark },
      { label: "Profile Views", value: "34", hint: "last 7 days", icon: Eye },
      { label: "New Matches", value: "5", hint: "found today", icon: Briefcase },
    ],
    sectionTitle: "Quick actions",
    actions: [
      {
        title: "Browse Jobs",
        description: "Find roles matched to your profile",
        href: "/dashboard/seeker/jobs",
        icon: Briefcase,
      },
      {
        title: "Post Resume",
        description: "Keep your resume visible to recruiters",
        href: "/dashboard/seeker/resume",
        icon: FilePlus2,
      },
      {
        title: "Manage Billing",
        description: "Plan, invoices and payment methods",
        href: "/dashboard/seeker/billing",
        icon: CreditCard,
      },
    ],
  },
  recruiter: {
    subtitle: "Manage your job posts and review incoming applicants.",
    stats: [
      { label: "Active Jobs", value: "6", hint: "2 closing soon", icon: Briefcase },
      { label: "Total Applicants", value: "48", hint: "+9 this week", icon: Users },
      { label: "Pending Reviews", value: "4", hint: "awaiting action", icon: Clock },
      { label: "Job Views", value: "1.2k", hint: "last 30 days", icon: Eye },
    ],
    sectionTitle: "Quick actions",
    actions: [
      {
        title: "Post a Job",
        description: "Reach matched seekers instantly",
        href: "/dashboard/recruiter/jobs",
        icon: PlusSquare,
      },
      {
        title: "Review Applications",
        description: "Screen and shortlist candidates",
        href: "/dashboard/recruiter/applications",
        icon: FileText,
      },
      {
        title: "Account Settings",
        description: "Company profile and preferences",
        href: "/dashboard/recruiter/settings",
        icon: Settings,
      },
    ],
  },
  admin: {
    subtitle: "Monitor platform activity across users, companies and payments.",
    stats: [
      { label: "Total Users", value: "1,284", hint: "+3% this month", icon: Users },
      { label: "Companies", value: "96", hint: "4 awaiting review", icon: Building2 },
      { label: "Active Jobs", value: "342", hint: "live right now", icon: Briefcase },
      { label: "Revenue (30d)", value: "$18.4k", hint: "payments settled", icon: CreditCard },
    ],
    sectionTitle: "Platform management",
    actions: [
      {
        title: "Manage Users",
        description: "Accounts, roles and suspensions",
        href: "/dashboard/admin/users",
        icon: Users,
      },
      {
        title: "Review Companies",
        description: "Approve and moderate listings",
        href: "/dashboard/admin/companies",
        icon: Building2,
      },
      {
        title: "Payments",
        description: "Transactions and payouts",
        href: "/dashboard/admin/payments",
        icon: CreditCard,
      },
    ],
  },
}

/**
 * Optional helper kept with the config so role switches stay type-safe.
 */
export function getDashboardConfig(role: AppRole): DashboardConfig {
  return DASHBOARD_CONFIG[role]
}

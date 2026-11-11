import { Crown, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import type { RoleBadgeVariant } from "./types"

const ROLE_BADGES: Record<
  RoleBadgeVariant,
  { label: string; icon: LucideIcon; className: string }
> = {
  tier: {
    label: "Professional Tier",
    icon: Sparkles,
    className: "bg-primary/10 text-primary ring-primary/20",
  },
  premium: {
    label: "Premium",
    icon: Crown,
    className: "bg-primary/10 text-primary ring-primary/20",
  },
  admin: {
    label: "Super Admin",
    icon: ShieldCheck,
    className: "bg-destructive/10 text-destructive ring-destructive/20",
  },
}

type AppSidebarRoleBadgeProps = {
  variant: RoleBadgeVariant
  className?: string
}

/**
 * Small pill badge describing the user's role / plan tier.
 */
export function AppSidebarRoleBadge({
  variant,
  className,
}: AppSidebarRoleBadgeProps) {
  const badge = ROLE_BADGES[variant]

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium ring-1",
        badge.className,
        className
      )}
    >
      <badge.icon className="size-2.5" />
      {badge.label}
    </span>
  )
}

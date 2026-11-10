"use client"

import { Loader2, LogOut } from "lucide-react"

import type { NavUser } from "@/components/auth/user-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useLogout } from "@/hooks/use-logout"
import { cn, getInitials } from "@/lib/utils"

interface UserSummaryProps {
  user: NavUser
  className?: string
}

/**
 * Compact signed-in identity card with a direct logout action.
 * Used inside the mobile navigation sheet, where a nested portal menu would
 * fight the modal drawer for focus.
 */
export function UserSummary({ user, className }: UserSummaryProps) {
  const { logout, isLoggingOut } = useLogout()

  const displayName =
    user.name?.trim() || user.email?.split("@")[0] || "Account"
  const initials = getInitials(user.name, user.email)

  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/[0.04] p-3",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar size="lg" className="ring-1 ring-white/15">
          {user.image ? (
            <AvatarImage src={user.image} alt="" className="size-full" />
          ) : null}
          <AvatarFallback className="bg-brand/25 text-sm font-semibold text-white">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            {displayName}
          </p>
          {user.email ? (
            <p className="truncate text-xs text-zinc-400">{user.email}</p>
          ) : null}
        </div>
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={() => {
          void logout()
        }}
        disabled={isLoggingOut}
        className="mt-3 h-9 w-full justify-start gap-2 rounded-lg px-2.5 text-[13px] font-medium text-rose-300 hover:bg-rose-500/10 hover:text-rose-200 disabled:opacity-60"
      >
        {isLoggingOut ? (
          <Loader2 aria-hidden className="size-4 animate-spin" />
        ) : (
          <LogOut aria-hidden className="size-4" />
        )}
        <span>{isLoggingOut ? "Signing out..." : "Log out"}</span>
      </Button>
    </div>
  )
}

"use client"

import Link from "next/link"
import { ChevronDown, LayoutDashboard, Loader2, LogOut } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLogout } from "@/hooks/use-logout"
import { roleDashboardPath } from "@/lib/role-routes"
import { cn, getInitials } from "@/lib/utils"

export interface NavUser {
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string | null
}

interface UserMenuProps {
  user: NavUser
  className?: string
}

/**
 * Authenticated navbar identity chip: avatar trigger + shadcn dropdown with the
 * signed-in user's name, email and a working Better Auth logout action.
 */
export function UserMenu({ user, className }: UserMenuProps) {
  const { logout, isLoggingOut } = useLogout()

  const displayName =
    user.name?.trim() || user.email?.split("@")[0] || "Account"
  const initials = getInitials(user.name, user.email)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label={`Open account menu for ${displayName}`}
            className={cn(
              "group/user-menu inline-flex shrink-0 items-center gap-1.5 rounded-full outline-none",
              "focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-nav",
              className
            )}
          />
        }
      >
        <Avatar className="size-9 ring-1 ring-white/20 transition-shadow duration-200 group-hover/user-menu:ring-brand/70 group-data-[popup-open]/user-menu:ring-brand">
          {user.image ? (
            <AvatarImage src={user.image} alt="" className="size-full" />
          ) : null}
          <AvatarFallback className="bg-brand/25 text-xs font-semibold text-white">
            {initials}
          </AvatarFallback>
        </Avatar>

        <ChevronDown
          aria-hidden
          className="hidden size-3.5 text-nav-foreground/60 transition-transform duration-200 group-data-[popup-open]/user-menu:rotate-180 sm:block"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-64 rounded-xl border border-white/10 bg-[#141419] p-1.5 text-nav-foreground shadow-[0_20px_60px_rgba(0,0,0,0.55)] ring-0"
      >
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <Avatar className="size-10 ring-1 ring-white/15">
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

        <DropdownMenuSeparator className="my-1 bg-white/10" />

        <DropdownMenuItem
          render={<Link href={roleDashboardPath(user.role)} />}
          className="cursor-pointer gap-2 rounded-lg px-2 py-2 text-[13px] font-medium text-nav-foreground focus:bg-white/5 focus:text-white"
        >
          <LayoutDashboard aria-hidden className="size-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          disabled={isLoggingOut}
          onClick={() => {
            void logout()
          }}
          className="cursor-pointer gap-2 rounded-lg px-2 py-2 text-[13px] font-medium text-rose-300 focus:bg-rose-500/10 focus:text-rose-200 dark:focus:bg-rose-500/15"
        >
          {isLoggingOut ? (
            <Loader2 aria-hidden className="size-4 animate-spin" />
          ) : (
            <LogOut aria-hidden className="size-4" />
          )}
          <span>{isLoggingOut ? "Signing out..." : "Log out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

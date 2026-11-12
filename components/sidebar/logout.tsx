"use client"

import { Loader2, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLogout } from "@/hooks/use-logout"
import { cn } from "@/lib/utils"

type AppSidebarLogoutProps = {
  className?: string
}

/**
 * Fully working logout: calls the shared Better Auth `use-logout` flow
 * (sign out + router refresh) with a disabled spinner state while pending.
 */
export function AppSidebarLogout({ className }: AppSidebarLogoutProps) {
  const { logout, isLoggingOut } = useLogout()

  return (
    <Button
      variant="ghost"
      onClick={logout}
      disabled={isLoggingOut}
      className={cn(
        "w-full justify-start text-muted-foreground hover:text-destructive",
        isLoggingOut && "opacity-60",
        className
      )}
    >
      {isLoggingOut ? (
        <Loader2 data-icon="inline-start" className="animate-spin" />
      ) : (
        <LogOut data-icon="inline-start" />
      )}
      {isLoggingOut ? "Logging out..." : "Log out"}
    </Button>
  )
}

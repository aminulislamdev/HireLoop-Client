"use client"

import Link from "next/link"

import { UserMenu } from "@/components/auth/user-menu"
import { UserSummary } from "@/components/auth/user-summary"
import { Button } from "@/components/ui/button"
import { useSession } from "@/lib/auth-client"

interface NavAuthProps {
  /**
   * `desktop` — guest links or avatar dropdown in the main navbar.
   * `mobile` — guest links or identity card inside the mobile sheet.
   * `compact` — avatar-only dropdown for the mobile top bar (nothing for guests).
   */
  variant?: "desktop" | "mobile" | "compact"
  /** Closes the mobile sheet when a guest chooses a destination. */
  onNavigate?: () => void
}

/**
 * Single source of truth for navbar authentication state.
 *
 * `useSession` is backed by Better Auth's reactive store, so signing in or out
 * swaps the guest actions for the profile dropdown immediately — no reload.
 */
export function NavAuth({ variant = "desktop", onNavigate }: NavAuthProps) {
  const { data: session, isPending } = useSession()
  const user = session?.user

  if (variant === "compact") {
    return user ? <UserMenu user={user} /> : null
  }

  if (isPending) {
    return <NavAuthSkeleton variant={variant} />
  }

  if (user) {
    return variant === "mobile" ? (
      <UserSummary user={user} />
    ) : (
      <UserMenu user={user} />
    )
  }

  if (variant === "mobile") {
    return (
      <>
        <Button
          nativeButton={false}
          render={<Link href="/sign-in" onClick={onNavigate} />}
          variant="outline"
          className="h-10 w-full border-white/15 bg-transparent text-nav-foreground hover:bg-white/5 hover:text-white"
        >
          Sign In
        </Button>

        <Button
          nativeButton={false}
          render={<Link href="/sign-up" onClick={onNavigate} />}
          className="h-10 w-full rounded-md bg-brand text-brand-foreground hover:bg-brand-hover"
        >
          Get Started
        </Button>
      </>
    )
  }

  return (
    <>
      <Button
        nativeButton={false}
        render={<Link href="/sign-in" />}
        variant="ghost"
        size="sm"
        className="h-9 px-2.5 text-sm font-medium text-brand hover:bg-white/5 hover:text-brand-hover"
      >
        Sign In
      </Button>

      <Button
        nativeButton={false}
        render={<Link href="/sign-up" />}
        className="h-10 rounded-md bg-brand px-5 text-sm font-semibold text-brand-foreground hover:bg-brand-hover"
      >
        Get Started
      </Button>
    </>
  )
}

function NavAuthSkeleton({ variant }: { variant: "desktop" | "mobile" }) {
  if (variant === "mobile") {
    return (
      <div aria-hidden className="flex w-full flex-col gap-2">
        <div className="h-10 w-full animate-pulse rounded-md bg-white/10" />
        <div className="h-10 w-full animate-pulse rounded-md bg-white/10" />
      </div>
    )
  }

  return (
    <div
      aria-hidden
      className="h-9 w-47 animate-pulse rounded-lg bg-white/10"
    />
  )
}

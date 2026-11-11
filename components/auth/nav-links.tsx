"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { useSession } from "@/lib/auth-client"
import {
  PUBLIC_NAV_LINKS,
  isActivePath,
  navLinksForRole,
} from "@/lib/role-routes"
import { cn } from "@/lib/utils"

interface NavLinksProps {
  /** `desktop` — inline links in the main navbar; `mobile` — stacked links in the sheet. */
  variant: "desktop" | "mobile"
  /** Closes the mobile sheet when a link is chosen. */
  onNavigate?: () => void
}

/**
 * Reusable, session-driven navbar links.
 *
 * Guests see the public links; signed-in users see their role's links with a
 * "Dashboard" entry pointing at their own dashboard. `useSession` is Better
 * Auth's reactive store, so the links swap immediately after login/logout —
 * no page refresh.
 */
export function NavLinks({ variant, onNavigate }: NavLinksProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  // Signed-in users always get role links (unknown roles default to seeker,
  // matching the Better Auth role default); guests get the public links.
  const links = session?.user
    ? navLinksForRole(session.user.role ?? "seeker")
    : PUBLIC_NAV_LINKS

  if (variant === "mobile") {
    return (
      <>
        {links.map((item) => {
          const active = isActivePath(pathname, item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-white/5 hover:text-white",
                active ? "bg-white/5 text-white" : "text-nav-foreground/90"
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </>
    )
  }

  return (
    <>
      {links.map((item) => {
        const active = isActivePath(pathname, item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "text-sm font-medium transition-colors hover:text-white",
              active ? "text-white" : "text-nav-foreground/90"
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </>
  )
}

"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"

import { NAV_SECTIONS, resolveActiveUrl } from "./navigation-config"
import { AppSidebarHeader } from "./header"
import { AppSidebarFooter } from "./footer"
import { AppSidebarNavigationMenu } from "./navigation-menu"
import { normalizeAppRole, type AppRole, type SidebarUser } from "./types"

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  /** Overrides the role resolved from the Better Auth session. */
  role?: AppRole
  /** Overrides the session user shown in headers / footers. */
  user?: SidebarUser | null
}

/**
 * Reusable, fully dynamic dashboard sidebar.
 *
 * Role, username and avatar are read from the Better Auth session; menus come
 * from `navigation-config.ts`. Both `role` and `user` may be passed to force
 * a specific rendering, e.g. for previews or tests.
 */
export function AppSidebar({ role: roleProp, user: userProp, ...props }: AppSidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()

  const user = (userProp ?? session?.user ?? null) as SidebarUser | null
  const role = roleProp ?? normalizeAppRole(user?.role)

  const sections = NAV_SECTIONS[role]
  const urls = sections.flatMap((section) => section.items.map((item) => item.url))
  const activeUrl = resolveActiveUrl(pathname, urls)

  return (
    <Sidebar {...props}>
      <AppSidebarHeader role={role} user={user} />
      <SidebarContent>
        <AppSidebarNavigationMenu sections={sections} activeUrl={activeUrl} />
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarFooter role={role} user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}

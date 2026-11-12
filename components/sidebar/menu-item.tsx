import Link from "next/link"

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

import type { NavItem } from "./types"

type AppSidebarMenuItemProps = {
  item: NavItem
  isActive: boolean
}

/**
 * A single navigation row: lucide icon + title, rendered as a Next `Link`
 * with the shadcn active-route styling.
 */
export function AppSidebarMenuItem({ item, isActive }: AppSidebarMenuItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} render={<Link href={item.url} />}>
        <item.icon />
        <span>{item.title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

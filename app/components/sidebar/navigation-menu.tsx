import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar"

import { AppSidebarMenuItem } from "./menu-item"
import type { NavSection } from "./types"

type AppSidebarNavigationMenuProps = {
  sections: NavSection[]
  /** URL of the currently active item, pre-resolved by the orchestrator. */
  activeUrl: string | null
}

/**
 * Renders the role's navigation sections as labeled shadcn sidebar groups.
 */
export function AppSidebarNavigationMenu({
  sections,
  activeUrl,
}: AppSidebarNavigationMenuProps) {
  return (
    <>
      {sections.map((section, index) => (
        <SidebarGroup key={index}>
          {section.label ? (
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
          ) : null}
          <SidebarGroupContent>
            <SidebarMenu>
              {section.items.map((item) => (
                <AppSidebarMenuItem
                  key={item.url}
                  item={item}
                  isActive={item.url === activeUrl}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}

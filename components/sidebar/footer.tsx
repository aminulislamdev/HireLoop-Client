import Link from "next/link"
import { FilePlus2 } from "lucide-react"

import { Button } from "@/components/ui/button"

import { AppSidebarLogout } from "./logout"
import { AppSidebarUserProfile } from "./user-profile"
import type { AppRole, SidebarUser } from "./types"

type AppSidebarFooterProps = {
  role: AppRole
  user: SidebarUser | null
}

/**
 * Sidebar footer, switched by role:
 * - seeker: "Post Resume" call-to-action + working logout.
 * - admin: session-driven identity card with the "Super Admin" badge.
 * - recruiter: no footer, per the role spec.
 */
export function AppSidebarFooter({ role, user }: AppSidebarFooterProps) {
  if (role === "seeker") {
    return (
      <>
        <Button
          render={<Link href="/dashboard/seeker/resume" />}
          className="w-full justify-start"
        >
          <FilePlus2 data-icon="inline-start" />
          Post Resume
        </Button>
        <AppSidebarLogout />
      </>
    )
  }

  if (role === "admin") {
    return (
      <AppSidebarUserProfile user={user} badge="admin" fallbackName="Admin" />
    )
  }

  return null
}

import { cache } from "react"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import { normalizeAppRole, type AppRole } from "@/components/sidebar/types"

type ServerSession = Awaited<ReturnType<typeof auth.api.getSession>>

/**
 * Request-scoped Better Auth session lookup. `cache()` deduplicates the call
 * per render pass so the dashboard layout and its pages share one lookup.
 */
export const getServerSession = cache(async (): Promise<ServerSession> => {
  return auth.api.getSession({ headers: await headers() })
})

/**
 * Guard for role-specific dashboard pages. Redirects guests to sign-in and
 * users with a different role to their own dashboard, so `/dashboard/seeker`
 * can never be rendered for an admin, etc.
 */
export async function requireSessionRole(expected: AppRole) {
  const session = await getServerSession()
  const user = session?.user

  if (!user) {
    redirect("/sign-in")
  }

  const role = normalizeAppRole(user.role)

  if (role !== expected) {
    redirect(`/dashboard/${role}`)
  }

  return { user }
}

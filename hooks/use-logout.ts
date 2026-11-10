"use client"

import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

import { authClient } from "@/lib/auth-client"

/**
 * Shared Better Auth sign-out flow.
 *
 * Clears the session on the server, then refreshes the current route so the
 * reactive `useSession` store re-renders the navbar without a hard reload.
 */
export function useLogout() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const logout = useCallback(async () => {
    if (isLoggingOut) return

    setIsLoggingOut(true)

    try {
      const { error } = await authClient.signOut()

      if (error) {
        setIsLoggingOut(false)
        return
      }

      router.replace("/")
      router.refresh()
    } catch {
      setIsLoggingOut(false)
    }
  }, [isLoggingOut, router])

  return { logout, isLoggingOut }
}

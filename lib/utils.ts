export { cn } from "cn"

/**
 * Builds a short, stable set of initials for avatar fallbacks.
 */
export function getInitials(
  name?: string | null,
  email?: string | null
): string {
  const source = name?.trim() || email?.split("@")[0]?.trim()

  if (!source) return "U"

  const parts = source.split(/[\s._-]+/).filter(Boolean)

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
  }

  return source.slice(0, 2).toUpperCase()
}

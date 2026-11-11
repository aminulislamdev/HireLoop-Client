import { NextResponse, type NextRequest } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

/**
 * Edge guard for the dashboard area.
 *
 * Guests are bounced to the sign-in portal before any dashboard layout or
 * page runs. Role permissions are enforced inside the dashboard layout and
 * pages (`lib/session.ts` → `requireSessionRole`), because the signed
 * session cookie alone doesn't reveal the user's role.
 */
export default function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}

/**
 * Auth layout — a minimal pass-through for sign-in and sign-up pages.
 * SiteHeader is provided by the root layout. No footer is rendered here;
 * AuthPortalLayout within each page provides the full-screen auth UI.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

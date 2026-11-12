import { SiteFooter } from "@/components/layout/site-footer"

/**
 * Marketing layout — wraps all public/marketing pages with the site footer.
 * SiteHeader is already provided by the root layout (app/layout.tsx).
 * Dashboard and auth pages do NOT use this layout, so they remain footer-free.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <SiteFooter />
    </>
  )
}

import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          {/* SiteHeader is global — appears on every page */}
          <SiteHeader />
          {children}
          {/* SiteFooter is intentionally NOT here.
              It lives in app/(marketing)/layout.tsx so only
              public/marketing pages render it. Dashboard and
              auth pages remain footer-free. */}
        </ThemeProvider>
      </body>
    </html>
  )
}

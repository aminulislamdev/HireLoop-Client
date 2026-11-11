import Image from "next/image"
import logo from "@/public/images/logo.png"

type AppSidebarLogoProps = {
  title: string
  subtitle?: string
}

/**
 * HireLoop brand mark with an optional title / subtitle, used for the
 * ADMIN header where the console is not tied to a personal profile.
 */
export function AppSidebarLogo({ title, subtitle }: AppSidebarLogoProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/50 p-2">
      <Image
        src={logo}
        alt="HireLoop"
        width={32}
        height={32}
        className="size-8 rounded-md object-contain"
      />
      <div className="min-w-0 flex-1 leading-tight">
        <p className="truncate text-sm font-semibold text-sidebar-foreground">
          {title}
        </p>
        {subtitle ? (
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
    </div>
  )
}

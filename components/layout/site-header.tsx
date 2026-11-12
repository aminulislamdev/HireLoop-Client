"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

import { NavAuth } from "@/components/layout/nav-auth"
import { NavLinks } from "@/components/layout/nav-links"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-nav text-nav-foreground">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-18 lg:px-16">
        <Link
          href="/"
          aria-label="HireLoop home"
          className="shrink-0 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-nav"
        >
          <Image
            src="/images/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            priority
            className="h-8 w-auto lg:h-9"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 md:flex lg:gap-8"
        >
          <NavLinks variant="desktop" />

          <Separator
            orientation="vertical"
            className="mx-1 h-5 w-px bg-white/15 lg:mx-2"
          />

          <NavAuth />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <NavAuth variant="compact" />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="text-nav-foreground hover:bg-white/10 hover:text-white"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              showCloseButton={false}
              className="bottom-auto flex h-fit max-h-dvh w-full flex-col overflow-hidden border-white/10 bg-nav p-0 text-nav-foreground sm:max-w-sm"
            >
              <SheetHeader className="flex-row items-center justify-between gap-3 border-b border-white/10 p-4">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Links to browse the HireLoop site.
                </SheetDescription>

                <Image
                  src="/images/logo.png"
                  alt="HireLoop"
                  width={154}
                  height={44}
                  className="h-7 w-auto"
                />

                <SheetClose
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="-mr-1 text-nav-foreground/70 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40"
                    />
                  }
                >
                  <X className="size-4" />
                  <span className="sr-only">Close menu</span>
                </SheetClose>
              </SheetHeader>

              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-1 overflow-y-auto p-4"
              >
                <NavLinks variant="mobile" onNavigate={() => setOpen(false)} />
              </nav>

              <div className="flex flex-col gap-2 border-t border-white/10 p-4">
                <NavAuth variant="mobile" onNavigate={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

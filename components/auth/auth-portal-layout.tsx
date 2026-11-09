import Image from "next/image"
import NextLink from "next/link"
import { ReactNode } from "react"
import { Fingerprint, Globe2, ShieldCheck, Sparkles, Zap } from "lucide-react"

import { cn } from "@/lib/utils"

interface AuthPortalLayoutProps {
  children: ReactNode
  mode: "sign-in" | "sign-up"
}

export function AuthPortalLayout({ children, mode }: AuthPortalLayoutProps) {
  const isSignIn = mode === "sign-in"

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#07070a] text-white">
      {/* Background Ambient Lighting Layers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 -z-10 h-150 w-150 rounded-full bg-brand/20 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-1/4 -z-10 h-125 w-125 rounded-full bg-blue-600/15 blur-[160px]"
      />

      {/* Cybernetic grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(91,87,245,0.18)_0%,transparent_80%)]"
      />

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Futuristic Identity Visual Gateway (Desktop) */}
          <div className="hidden flex-col justify-center space-y-8 lg:col-span-6 lg:flex xl:col-span-7">
            {/* System Status Pill */}
            <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400 backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>DIGITAL IDENTITY GATEWAY • SECURE</span>
            </div>

            {/* Typography */}
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight text-white xl:text-5xl">
                {isSignIn ? (
                  <>
                    Access Your
                    <br />
                    <span className="bg-gradient-to-r from-brand via-purple-300 to-blue-400 bg-clip-text text-transparent">
                      Career Telemetry
                    </span>
                  </>
                ) : (
                  <>
                    Mint Your Verified
                    <br />
                    <span className="bg-gradient-to-r from-brand via-purple-300 to-blue-400 bg-clip-text text-transparent">
                      Digital Career Identity
                    </span>
                  </>
                )}
              </h1>

              <p className="max-w-xl text-sm leading-relaxed text-zinc-400 xl:text-base">
                {isSignIn
                  ? "Re-enter the HireLoop decentralized network. Instant tracking for applications, interviews, and verified employer offers."
                  : "Join 15,000+ ambitious tech professionals connected directly to verified employers, transparent compensation tiers, and smart matching."}
              </p>
            </div>

            {/* Interactive Holographic Portal Graphic */}
            <div className="relative my-4 flex h-64 w-full max-w-md items-center justify-center">
              {/* Outer Pulsing Glow */}
              <div
                aria-hidden="true"
                className="absolute size-56 rounded-full bg-brand/20 blur-2xl"
              />

              {/* Rotating Dashed Orbit Ring */}
              <div
                aria-hidden="true"
                className="absolute size-52 animate-[spin_20s_linear_infinite] rounded-full border border-dashed border-brand/40"
              />

              {/* Counter Rotating Inner Orbit Ring */}
              <div
                aria-hidden="true"
                className="absolute size-40 animate-[spin_12s_linear_infinite_reverse] rounded-full border border-white/20"
              />

              {/* Core Biometric Glyph */}
              <div className="relative flex size-24 items-center justify-center rounded-3xl border border-white/20 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 shadow-[0_0_40px_rgba(91,87,245,0.4)] backdrop-blur-xl">
                <Fingerprint className="size-12 text-brand animate-pulse" />
              </div>

              {/* Orbiting Telemetry Badges */}
              <div className="absolute top-2 left-6 flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-950/80 px-3 py-1 text-xs text-zinc-300 shadow-lg backdrop-blur-md">
                <Sparkles className="size-3.5 text-brand" />
                <span>50K+ Active Jobs</span>
              </div>

              <div className="absolute right-2 bottom-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-950/80 px-3 py-1 text-xs text-zinc-300 shadow-lg backdrop-blur-md">
                <ShieldCheck className="size-3.5 text-emerald-400" />
                <span>Zero-Spam Verified</span>
              </div>
            </div>

            {/* Platform Trust Highlights */}
            <div className="grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Zap className="size-3.5 text-amber-400" />
                  <span>&lt; 24h Turnaround</span>
                </div>
                <p className="mt-1 text-[11px] text-zinc-500">
                  Fast interview scheduling
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Globe2 className="size-3.5 text-blue-400" />
                  <span>Global Roles</span>
                </div>
                <p className="mt-1 text-[11px] text-zinc-500">
                  Remote & hybrid teams
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <ShieldCheck className="size-3.5 text-brand" />
                  <span>Better Auth</span>
                </div>
                <p className="mt-1 text-[11px] text-zinc-500">
                  Secure cryptographic keys
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphic Credential Card */}
          <div className="mx-auto w-full max-w-md lg:col-span-6 xl:col-span-5">
            <div className="relative rounded-3xl border border-white/10 bg-[#0c0c11]/85 p-6 shadow-[0_0_60px_rgba(91,87,245,0.12)] backdrop-blur-2xl sm:p-8">
              {/* Subtle top card glow line */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent opacity-80"
              />

              {/* Header inside Card */}
              <div className="mb-6 flex items-center justify-between">
                <NextLink
                  href="/"
                  className="inline-block transition-opacity hover:opacity-85"
                >
                  <Image
                    src="/images/logo.png"
                    alt="HireLoop"
                    width={154}
                    height={44}
                    className="h-7 w-auto"
                  />
                </NextLink>

                {/* Segmented Auth Mode Switch */}
                <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.04] p-1 text-xs">
                  <NextLink
                    href="/sign-in"
                    className={cn(
                      "rounded-lg px-3 py-1 font-medium transition-all",
                      isSignIn
                        ? "bg-brand text-white shadow-sm"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    Sign In
                  </NextLink>
                  <NextLink
                    href="/sign-up"
                    className={cn(
                      "rounded-lg px-3 py-1 font-medium transition-all",
                      !isSignIn
                        ? "bg-brand text-white shadow-sm"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    Sign Up
                  </NextLink>
                </div>
              </div>

              {/* Form Content */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

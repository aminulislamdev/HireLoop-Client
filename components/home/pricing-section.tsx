"use client"

import Link from "next/link"
import { useState } from "react"
import { Check, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "Free",
      price: billingCycle === "monthly" ? "$0" : "$0",
      period: "/ forever",
      description: "Essential tools to discover and apply for your next career role.",
      featured: false,
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const,
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs / month",
        "Basic candidate profile",
        "Standard application status tracking",
        "Email job alerts",
      ],
    },
    {
      name: "Pro",
      price: billingCycle === "monthly" ? "$19" : "$15",
      period: "/ month",
      description: "For active candidates seeking faster interviews and placement.",
      featured: true,
      badge: "Most Popular",
      buttonText: "Upgrade to Pro",
      buttonVariant: "default" as const,
      features: [
        "Apply to up to 30 jobs / month",
        "Unlimited saved jobs",
        "Detailed application tracking & analytics",
        "Full transparent salary benchmark insights",
        "Priority placement in recruiter search",
        "Automated resume match scoring",
      ],
    },
    {
      name: "Premium",
      price: billingCycle === "monthly" ? "$39" : "$31",
      period: "/ month",
      description: "Maximum visibility, early access, and dedicated recruiter reach.",
      featured: false,
      buttonText: "Go Premium",
      buttonVariant: "outline" as const,
      features: [
        "Unlimited job applications",
        "Everything in Pro included",
        "Profile boost directly to verified recruiters",
        "24h early access to newly posted openings",
        "Direct recruiter outreach badge",
        "Priority 24/7 dedicated support",
      ],
    },
  ]

  return (
    <section className="relative bg-[#070709] py-20 text-white sm:py-24 lg:py-28">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[500px] w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[180px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <span className="text-xs font-semibold tracking-widest text-brand uppercase">
            Simple Pricing
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Pay for the leverage, not the listings
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">
            Transparent plans designed to supercharge your career. Upgrade,
            downgrade, or cancel anytime.
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 inline-flex items-center rounded-full border border-white/10 bg-zinc-900/80 p-1 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
                billingCycle === "monthly"
                  ? "bg-white text-zinc-950 shadow-sm"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
                billingCycle === "yearly"
                  ? "bg-white text-zinc-950 shadow-sm"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <span>Yearly</span>
              <span className="rounded-full bg-brand/20 px-1.5 py-0.5 text-[10px] font-bold text-brand">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col justify-between rounded-3xl p-7 backdrop-blur-xl transition-all duration-200 sm:p-8",
                plan.featured
                  ? "border-2 border-brand/60 bg-gradient-to-b from-zinc-900/95 to-zinc-950/95 shadow-[0_0_50px_rgba(91,87,245,0.2)] lg:-translate-y-2"
                  : "border border-white/10 bg-zinc-950/70 hover:border-white/20 hover:bg-zinc-900/80"
              )}
            >
              {/* Badge for featured plan */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-brand/50 bg-brand px-3 py-0.5 text-[11px] font-bold tracking-wide text-white shadow-md">
                    <Sparkles className="size-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Plan Name & Description */}
                <h3 className="text-xl font-bold tracking-tight text-white">
                  {plan.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    {plan.price}
                  </span>
                  <span className="text-xs text-zinc-400 sm:text-sm">
                    {plan.period}
                  </span>
                </div>

                <div className="my-6 h-px w-full bg-white/10" />

                {/* Features List */}
                <ul className="space-y-3 text-xs sm:text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand">
                        <Check className="size-3 stroke-[2.5]" />
                      </div>
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <Button
                  nativeButton={false}
                  render={<Link href="/sign-up" />}
                  className={cn(
                    "h-11 w-full rounded-xl text-sm font-semibold transition-all active:scale-[0.98]",
                    plan.featured
                      ? "bg-white text-zinc-950 hover:bg-zinc-200 shadow-lg shadow-white/10"
                      : "border border-white/15 bg-transparent text-white hover:bg-white/10"
                  )}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


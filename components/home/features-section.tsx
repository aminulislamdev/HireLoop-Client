import {
  Bell,
  Briefcase,
  Building2,
  CheckCircle2,
  Search,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Filter opportunities by precision keyword, location, salary tier, and remote flexibility.",
  },
  {
    icon: Building2,
    title: "Verified Companies",
    description:
      "Browse thoroughly vetted organizations with authentic recruitment teams and active openings.",
  },
  {
    icon: Briefcase,
    title: "Direct Applications",
    description:
      "Submit candidate profiles directly to hiring decision-makers with zero recruiter clutter.",
  },
  {
    icon: CheckCircle2,
    title: "Status Tracking",
    description:
      "Follow every stage of your candidacy from Applied to Under Review, Shortlisted, and Offered.",
  },
  {
    icon: TrendingUp,
    title: "Salary Insights",
    description:
      "Access transparent industry compensation benchmarks to negotiate with confidence.",
  },
  {
    icon: Users,
    title: "Candidate Boost",
    description:
      "Highlight your profile to recruiters and get prioritized in matching candidate queues.",
  },
  {
    icon: Sparkles,
    title: "Skill Matching",
    description:
      "Smart recommendation engine pairs your experience with relevant high-fit career roles.",
  },
  {
    icon: Bell,
    title: "Instant Job Alerts",
    description:
      "Stay ahead with real-time notifications the moment matching positions are published.",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative bg-[#070709] py-20 text-white sm:py-24 lg:py-28">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[450px] w-full max-w-5xl -translate-x-1/2 rounded-full bg-blue-500/5 blur-[160px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <span className="text-xs font-semibold tracking-widest text-brand uppercase">
            Platform Capabilities
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Everything you need to succeed
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">
            Equipped with modern discovery, application management, and recruiter
            connectivity to accelerate your hiring journey.
          </p>
        </div>

        {/* 4x2 Grid of Feature Cards */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-white/10 bg-zinc-950/60 p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-zinc-900/70"
              >
                {/* Icon */}
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition-colors group-hover:border-brand/40 group-hover:bg-brand/10 group-hover:text-brand-foreground">
                  <Icon className="size-5" />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white transition-colors group-hover:text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


import Link from "next/link"
import { Building2, ChevronRight, DollarSign, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"

export interface JobListing {
  id: string
  title: string
  company: string
  location: string
  salary: string
  type: string
  description: string
  tags: string[]
}

const featuredJobs: JobListing[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Acme Cloud",
    location: "San Francisco, CA (Hybrid)",
    salary: "$130k - $160k",
    type: "Full-time",
    description:
      "Build high-performance web applications with Next.js, React 19, and modern TypeScript toolchains.",
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    id: "2",
    title: "Senior Product Designer",
    company: "Linear Systems",
    location: "Remote (US/EU)",
    salary: "$140k - $175k",
    type: "Full-time",
    description:
      "Craft sleek, intuitive digital interfaces and maintain comprehensive design systems for cloud platforms.",
    tags: ["Figma", "Design Systems", "UI/UX"],
  },
  {
    id: "3",
    title: "Full Stack Engineer",
    company: "Vercel Labs",
    location: "New York, NY (Hybrid)",
    salary: "$150k - $185k",
    type: "Full-time",
    description:
      "Scale real-time serverless workflows, modern edge APIs, and global content distribution systems.",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    id: "4",
    title: "Backend Platform Engineer",
    company: "Stripe Partner Co.",
    location: "Remote",
    salary: "$145k - $180k",
    type: "Full-time",
    description:
      "Architect resilient microservices, high-throughput payment pipelines, and distributed event queues.",
    tags: ["Go", "Kubernetes", "Kafka"],
  },
  {
    id: "5",
    title: "DevOps & Cloud Architect",
    company: "Supabase Corp",
    location: "Austin, TX (Hybrid)",
    salary: "$135k - $170k",
    type: "Full-time",
    description:
      "Manage AWS/GCP cloud environments, automated CI/CD pipelines, and zero-downtime cluster rollouts.",
    tags: ["Terraform", "AWS", "Docker"],
  },
  {
    id: "6",
    title: "AI / Machine Learning Engineer",
    company: "Anthropic Edge",
    location: "San Francisco, CA (Remote Friendly)",
    salary: "$160k - $210k",
    type: "Full-time",
    description:
      "Fine-tune modern LLM pipelines, vector databases, and high-performance multimodal agent services.",
    tags: ["Python", "PyTorch", "LLMs"],
  },
]

export function FeaturedJobsSection() {
  return (
    <section className="relative bg-[#070709] py-20 text-white sm:py-24 lg:py-28">
      {/* Background radial accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[500px] w-full max-w-6xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/5 blur-[160px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <span className="text-xs font-semibold tracking-widest text-brand uppercase">
            Curated Opportunities
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            The roles you&apos;d never find by searching
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">
            Discover verified openings at industry-leading companies with transparent
            compensation and fast hiring turnarounds.
          </p>
        </div>

        {/* 3x2 Grid of Job Cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-950/70 p-6 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-black/40"
            >
              <div>
                {/* Title & Company */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-white transition-colors group-hover:text-brand-foreground">
                      {job.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-zinc-400">
                      <Building2 className="size-3.5 shrink-0 text-zinc-500" />
                      <span>{job.company}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-[11px] font-medium text-brand-foreground">
                    {job.type}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3.5 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                  {job.description}
                </p>

                {/* Meta details */}
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="size-3.5 text-zinc-500" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="size-3.5 text-zinc-500" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                {/* Skill tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer / Apply Link */}
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <Button
                  nativeButton={false}
                  render={<Link href={`/jobs/${job.id}`} />}
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1.5 px-0 text-xs font-semibold text-zinc-300 hover:bg-transparent hover:text-white"
                >
                  <span>Apply Now</span>
                  <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Button>

                <div className="text-[11px] text-zinc-500">Posted recently</div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Jobs CTA */}
        <div className="mt-12 flex justify-center">
          <Button
            nativeButton={false}
            render={<Link href="/jobs" />}
            className="h-11 rounded-full bg-white px-8 text-sm font-semibold text-zinc-950 shadow-lg shadow-white/10 transition-all hover:bg-zinc-200 active:scale-95"
          >
            <span>View All Jobs</span>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

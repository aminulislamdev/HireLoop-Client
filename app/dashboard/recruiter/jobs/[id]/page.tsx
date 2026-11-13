import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Building2,
  Calendar,
  Globe,
  Mail,
  MapPin,
  Wallet,
} from "lucide-react"

import { JobBadge } from "@/components/jobs/job-badge"
import { requireSessionRole } from "@/lib/session"
import { getJob, type Job } from "@/lib/jobs"

/** Formats the ISO deadline as "30 May 2025". */
function formatDeadline(deadline: string | null): string | null {
  if (!deadline) return null
  return new Date(deadline).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

/** Formats the salary range with its frequency, or null when absent. */
function formatSalary(job: Job): string | null {
  const { min, max, frequency } = job.salary
  if (min == null && max == null) return null
  if (min != null && max != null) return `€${min} – €${max} ${frequency}`
  return `€${min ?? max} ${frequency}`
}

/**
 * Recruiter Job Details page: renders a single posting from the public
 * `GET /jobs/:id` API. Invalid or unknown ids render the 404 view.
 */
export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireSessionRole("recruiter")

  const { id } = await params

  let job: Job
  try {
    job = await getJob(id)
  } catch {
    // 400 (bad id) or 404 (unknown id) → Not Found page.
    notFound()
  }

  const salary = formatSalary(job)
  const deadline = formatDeadline(job.deadline)
  const posted = new Date(job.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <div className="max-w-4xl mx-auto w-full space-y-8">
      {/* Back navigation */}
      <Link
        href="/dashboard/recruiter/jobs"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to All Jobs
      </Link>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <JobBadge variant="indigo">{job.jobType}</JobBadge>
          {job.isRemote && <JobBadge variant="success">Remote</JobBadge>}
          <JobBadge>{job.category}</JobBadge>
        </div>
        <div>
          <h1 className="text-3xl font-semibold mb-2 tracking-tight">{job.title}</h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              {job.companyName || job.recruiter.name}
            </span>
            <span>Posted by {job.recruiter.name} on {posted}</span>
          </div>
        </div>
      </header>

      {/* Key facts */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-input bg-card p-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
            <MapPin className="h-3.5 w-3.5" />
            Location
          </div>
          <p className="text-sm font-medium">{job.location}</p>
        </div>
        <div className="rounded-lg border border-input bg-card p-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
            <Wallet className="h-3.5 w-3.5" />
            Salary / Rate
          </div>
          <p className="text-sm font-medium">{salary ?? "Not disclosed"}</p>
        </div>
        <div className="rounded-lg border border-input bg-card p-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
            <Calendar className="h-3.5 w-3.5" />
            Deadline
          </div>
          <p className="text-sm font-medium">{deadline ?? "Open until filled"}</p>
        </div>
      </section>

      {/* Description */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full inline-block"></span>
            Key Responsibilities
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
            {job.responsibilities}
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full inline-block"></span>
            Qualifications & Requirements
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
            {job.requirements}
          </p>
        </div>
      </section>

      {/* Recruiter info */}
      <section className="rounded-lg border border-input bg-card p-5">
        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          Recruiter Information
        </h2>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Name
            </dt>
            <dd className="text-sm font-medium">{job.recruiter.name}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Email
            </dt>
            <dd className="text-sm font-medium flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              {job.recruiter.email}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Role
            </dt>
            <dd className="text-sm font-medium flex items-center gap-1.5 capitalize">
              <Globe className="h-3.5 w-3.5 text-muted-foreground" />
              {job.recruiter.role}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  )
}

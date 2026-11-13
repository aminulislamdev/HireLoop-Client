import Link from "next/link"
import { ArrowRight, Briefcase, Building2, MapPin, Wallet } from "lucide-react"

import { JobBadge } from "@/components/jobs/job-badge"
import type { Job } from "@/lib/jobs"

/**
 * Formats the salary range with its frequency, hiding the block entirely
 * when the recruiter didn't provide numbers.
 */
function formatSalary(job: Job): string | null {
  const { min, max, frequency } = job.salary
  if (min == null && max == null) return null
  if (min != null && max != null) return `€${min}–€${max} ${frequency}`
  const single = min ?? max
  return `€${single} ${frequency}`
}

/** Formats the ISO deadline as "30 May 2025" or null when missing/expired-less. */
function formatDeadline(deadline: string | null): string | null {
  if (!deadline) return null
  return new Date(deadline).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

/**
 * A single job listing card used on the All Jobs page. Server-renderable
 * (no hooks) so pages can use it directly from server components.
 */
export function JobCard({ job }: { job: Job }) {
  const salary = formatSalary(job)
  const deadline = formatDeadline(job.deadline)

  return (
    <Link
      href={`/dashboard/recruiter/jobs/${job._id}`}
      className="group flex flex-col rounded-lg border border-input bg-card p-5 transition-all hover:border-indigo-300 hover:shadow-md dark:hover:border-indigo-800"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <JobBadge variant="indigo">{job.jobType}</JobBadge>
        {job.isRemote && <JobBadge variant="success">Remote</JobBadge>}
        <JobBadge>{job.category}</JobBadge>
      </div>

      <h3 className="text-base font-semibold tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
        {job.title}
      </h3>

      <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Building2 className="h-3.5 w-3.5" />
        <span>{job.companyName || job.recruiter.name}</span>
      </div>

      <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          <span>{job.location}</span>
        </div>
        {salary && (
          <div className="flex items-center gap-1.5">
            <Wallet className="h-3.5 w-3.5" />
            <span>{salary}</span>
          </div>
        )}
        {deadline && (
          <div className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5" />
            <span>Apply by {deadline}</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
        View details
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  )
}

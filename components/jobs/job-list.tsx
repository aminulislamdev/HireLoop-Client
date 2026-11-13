import Link from "next/link"
import { AlertTriangle, BriefcaseBusiness, Inbox } from "lucide-react"

import { JobCard } from "@/components/jobs/job-card"
import { Skeleton } from "@/components/ui/skeleton"
import type { Job } from "@/lib/jobs"

/** Loading state: mirrors the All Jobs grid with skeletons. */
export function JobListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="space-y-3 rounded-lg border border-input bg-card p-5"
        >
          <div className="flex gap-2">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

/** Empty state shown when no jobs have been posted yet. */
export function JobListEmpty({ actionHref }: { actionHref?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-input bg-card px-6 py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Inbox className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mb-1 text-base font-semibold">No jobs posted yet</h3>
      <p className="mb-5 max-w-sm text-sm text-muted-foreground">
        Published listings will appear here. Post your first job to start
        attracting candidates.
      </p>
      {actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          <BriefcaseBusiness className="h-4 w-4" />
          Post a Job
        </Link>
      )}
    </div>
  )
}

/** Error state shown when the jobs API cannot be reached. */
export function JobListError({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-5 py-4">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
      <div>
        <h3 className="text-sm font-semibold text-destructive">
          Failed to load jobs
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}

/** Presentational grid of job cards (server-renderable). */
export function JobList({ jobs }: { jobs: Job[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  )
}

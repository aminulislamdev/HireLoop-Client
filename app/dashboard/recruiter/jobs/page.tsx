import Link from "next/link"
import { Plus } from "lucide-react"

import {
  JobList,
  JobListEmpty,
  JobListError,
} from "@/components/jobs/job-list"
import { requireSessionRole } from "@/lib/session"
import { getJobs, type Job } from "@/lib/jobs"

/**
 * Recruiter All Jobs page: lists every posted job using the public
 * `GET /jobs` API. The page itself stays recruiter-guarded server-side via
 * `requireSessionRole`, matching the rest of the recruiter dashboard.
 */
export default async function RecruiterJobsPage() {
  await requireSessionRole("recruiter")

  let jobs: Job[] | null = null
  let errorMessage: string | null = null

  try {
    jobs = await getJobs()
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "Could not reach the jobs API. Is the server running?"
  }

  return (
    <div className="max-w-6xl mx-auto w-full space-y-8">
      {/* Header */}
      <header>
        <div className="text-sm text-muted-foreground mb-2">
          Dashboard &gt; Manage Jobs
        </div>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold mb-2 tracking-tight">All Jobs</h1>
            <p className="text-sm text-muted-foreground">
              Every listing published on HireLoop, newest first.
            </p>
          </div>
          <Link
            href="/dashboard/recruiter/jobs/new"
            className="inline-flex items-center gap-1.5 self-start rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Post a Job
          </Link>
        </div>
      </header>

      {/* Body */}
      {errorMessage ? (
        <JobListError message={errorMessage} />
      ) : jobs && jobs.length > 0 ? (
        <JobList jobs={jobs} />
      ) : (
        <JobListEmpty actionHref="/dashboard/recruiter/jobs/new" />
      )}
    </div>
  )
}

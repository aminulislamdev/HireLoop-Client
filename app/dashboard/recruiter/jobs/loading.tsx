import { JobListSkeleton } from "@/components/jobs/job-list"

/** Skeleton shown while the All Jobs page fetches the jobs API. */
export default function RecruiterJobsLoading() {
  return <JobListSkeleton />
}

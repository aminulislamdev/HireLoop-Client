/**
 * Typed helpers for the HireLoop Express API (hireloop-server).
 *
 * The base URL comes from `NEXT_PUBLIC_API_URL` (defaults to
 * http://localhost:8000 for local development).
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/** A recruiter job posting as stored in MongoDB. */
export type Job = {
  _id: string;
  title: string;
  companyName: string;
  category: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  deadline: string | null;
  salary: {
    min: number | null;
    max: number | null;
    frequency: string;
  };
  responsibilities: string;
  requirements: string;
  recruiter: {
    userId: string;
    name: string;
    email: string;
    role: string;
  };
  createdAt: string;
};

/** The job fields the recruiter submits through the Post Job form. */
export type JobInput = {
  title: string;
  companyName: string;
  category: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  deadline: string;
  salaryMin: string;
  salaryMax: string;
  salaryFrequency: string;
  responsibilities: string;
  requirements: string;
};

/**
 * Small wrapper so every response surfaces a readable error message
 * instead of a raw failed fetch.
 */
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, init);

  if (!res.ok) {
    // The API always answers errors with { message: "..." }.
    let message = `Request failed with status ${res.status}`;
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      // Not JSON — keep the status-based message.
    }
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}

/** Public: all jobs, newest first. */
export function getJobs() {
  return request<Job[]>("/jobs");
}

/** Public: a single job by id. */
export function getJob(id: string) {
  return request<Job>(`/jobs/${id}`);
}

/**
 * Exchanges the signed-in user's Better Auth session (forwarded through its
 * httpOnly cookie) for a short-lived recruiter JWT. The server verifies the
 * session in MongoDB and rejects non-recruiters.
 */
export function getRecruiterToken() {
  return request<{ token: string }>("/auth/token", {
    method: "POST",
    // Required so the Better Auth session cookie travels to the API.
    credentials: "include",
  });
}

/** Authenticated: creates a job. `token` comes from `getRecruiterToken()`. */
export function createJob(input: JobInput, token: string) {
  return request<{ message: string; jobId: string }>("/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
}

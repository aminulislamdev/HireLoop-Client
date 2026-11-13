// dashboard/recruiter/jobs/new/_components/post-job-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createJob, getRecruiterToken, type JobInput } from "@/lib/jobs";
import {
  AlertTriangle,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Globe,
  Loader2,
  MapPin,
} from "lucide-react";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Marketing",
  "Product",
  "Operations",
  "Other",
];
const SALARY_FREQUENCIES = ["per hour", "per month", "per year"];

// Empty form state — used both on mount and after validation resets.
const INITIAL_FORM: JobInput = {
  title: "",
  companyName: "",
  category: "Engineering & Tech",
  jobType: "Full-time",
  isRemote: true,
  location: "",
  deadline: "",
  salaryMin: "",
  salaryMax: "",
  salaryFrequency: "per year",
  responsibilities: "",
  requirements: "",
};

export default function PostJobForm() {
  const router = useRouter();

  const [form, setForm] = useState<JobInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof JobInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  /** Updates one controlled field and clears its validation error. */
  function updateField<K extends keyof JobInput>(field: K, value: JobInput[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  /** Client-side validation. Returns true when every required field is valid. */
  function validate(): boolean {
    const nextErrors: Partial<Record<keyof JobInput, string>> = {};

    if (!form.title.trim()) nextErrors.title = "Job title is required.";
    if (!form.companyName.trim())
      nextErrors.companyName = "Company name is required.";
    if (!form.location.trim()) nextErrors.location = "Job location is required.";
    if (!form.responsibilities.trim())
      nextErrors.responsibilities = "Key responsibilities are required.";
    if (!form.requirements.trim())
      nextErrors.requirements = "Qualifications & requirements are required.";

    // Salary is optional, but when given it must be numeric and ordered.
    const min = Number(form.salaryMin);
    const max = Number(form.salaryMax);
    if (form.salaryMin && (Number.isNaN(min) || min < 0))
      nextErrors.salaryMin = "Enter a valid non-negative number.";
    if (form.salaryMax && (Number.isNaN(max) || max < 0))
      nextErrors.salaryMax = "Enter a valid non-negative number.";
    if (
      !nextErrors.salaryMin &&
      !nextErrors.salaryMax &&
      form.salaryMin &&
      form.salaryMax &&
      min > max
    ) {
      nextErrors.salaryMax = "Max salary must be greater than min salary.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  /** Submits the form: session → recruiter JWT → POST /jobs. */
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // 1. Exchange the Better Auth session (via httpOnly cookie) for a JWT.
      const { token } = await getRecruiterToken();
      // 2. Post the job with the verified token.
      await createJob(form, token);

      setSubmitSuccess(true);
      // Small pause so the success state is visible, then go to All Jobs.
      setTimeout(() => router.push("/dashboard/recruiter/jobs"), 1200);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Header */}
      <header className="mb-10">
        <div className="text-sm text-muted-foreground mb-2">
          Manage Jobs &gt; Create New Listing
        </div>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold mb-2 tracking-tight">Post a New Job</h1>
            <p className="text-sm text-muted-foreground">
              Fill in the position specifications to attract qualified talent across our network.
            </p>
          </div>
          <Button
            type="submit"
            form="post-job-form"
            disabled={isSubmitting || submitSuccess}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" data-icon="inline-start" />
                Publishing...
              </>
            ) : (
              <>Publish Job &rarr;</>
            )}
          </Button>
        </div>
      </header>

      {/* Submission feedback */}
      {submitSuccess && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          Job published successfully! Redirecting to your jobs...
        </div>
      )}
      {submitError && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm">
          <AlertTriangle className="h-5 w-5 shrink-0 text-destructive" />
          <p className="text-destructive">{submitError}</p>
        </div>
      )}

      <form id="post-job-form" onSubmit={handleSubmit} className="space-y-10">
        {/* Section 1: Basic Information */}
        <section className="space-y-5">
          <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full inline-block"></span>
            1. Basic Information
          </h2>

          <div className="space-y-2">
            <label htmlFor="job-title" className="text-sm font-medium">Job Title *</label>
            <Input
              id="job-title"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="e.g. Senior Product Designer"
              className="bg-background"
              aria-invalid={Boolean(errors.title)}
            />
            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="company-name" className="text-sm font-medium">Company Name *</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="company-name"
                  value={form.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  placeholder="e.g. HirePulse Network"
                  className="pl-10 bg-background"
                  aria-invalid={Boolean(errors.companyName)}
                />
              </div>
              {errors.companyName && (
                <p className="text-xs text-destructive">{errors.companyName}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="job-category" className="text-sm font-medium">Job Category *</label>
              <div className="relative">
                <select
                  id="job-category"
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                >
                  {JOB_CATEGORIES.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Job Type *</label>
            <div className="flex flex-wrap md:flex-nowrap gap-3">
              {JOB_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateField("jobType", type)}
                  className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 border ${form.jobType === type
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950 dark:border-indigo-800 dark:text-indigo-300"
                    : "bg-background border-input text-muted-foreground hover:bg-muted"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Location, Compensation & Timeline */}
        <section className="space-y-5">
          <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full inline-block"></span>
            2. Location, Compensation & Timeline
          </h2>

          <div className="border rounded-lg p-4 flex items-center justify-between bg-card">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Globe className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Remote Work Allowed (isRemote)</h3>
                <p className="text-xs text-muted-foreground">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
            </div>
            {/* Custom Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={form.isRemote}
                onChange={(e) => updateField("isRemote", e.target.checked)}
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="job-location" className="text-sm font-medium flex items-center justify-between">
                <span>Job Location (location)</span>
                <span className="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground">Required</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="job-location"
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="e.g. New York, USA"
                  className="pl-10"
                  aria-invalid={Boolean(errors.location)}
                />
              </div>
              {errors.location && <p className="text-xs text-destructive">{errors.location}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="job-deadline" className="text-sm font-medium">Application Deadline (deadline)</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="job-deadline"
                  type="date"
                  value={form.deadline}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => updateField("deadline", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label htmlFor="salary-min" className="text-sm font-medium">Min Salary / Rate</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
                <Input
                  id="salary-min"
                  type="number"
                  min="0"
                  value={form.salaryMin}
                  onChange={(e) => updateField("salaryMin", e.target.value)}
                  placeholder="25"
                  className="pl-8"
                  aria-invalid={Boolean(errors.salaryMin)}
                />
              </div>
              {errors.salaryMin && <p className="text-xs text-destructive">{errors.salaryMin}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="salary-max" className="text-sm font-medium">Max Salary / Rate</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
                <Input
                  id="salary-max"
                  type="number"
                  min="0"
                  value={form.salaryMax}
                  onChange={(e) => updateField("salaryMax", e.target.value)}
                  placeholder="40"
                  className="pl-8"
                  aria-invalid={Boolean(errors.salaryMax)}
                />
              </div>
              {errors.salaryMax && <p className="text-xs text-destructive">{errors.salaryMax}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="salary-frequency" className="text-sm font-medium">Frequency</label>
              <div className="relative">
                <select
                  id="salary-frequency"
                  value={form.salaryFrequency}
                  onChange={(e) => updateField("salaryFrequency", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {SALARY_FREQUENCIES.map((frequency) => (
                    <option key={frequency}>{frequency}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Responsibilities & Requirements */}
        <section className="space-y-5">
          <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full inline-block"></span>
            3. Responsibilities & Requirements
          </h2>

          <div className="space-y-2">
            <label htmlFor="responsibilities" className="text-sm font-medium">Key Responsibilities *</label>
            <Textarea
              id="responsibilities"
              rows={4}
              value={form.responsibilities}
              onChange={(e) => updateField("responsibilities", e.target.value)}
              placeholder="Describe the core responsibilities and day-to-day work for this role..."
              className="resize-y"
              aria-invalid={Boolean(errors.responsibilities)}
            />
            {errors.responsibilities && (
              <p className="text-xs text-destructive">{errors.responsibilities}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="requirements" className="text-sm font-medium">Qualifications & Requirements *</label>
            <Textarea
              id="requirements"
              rows={5}
              value={form.requirements}
              onChange={(e) => updateField("requirements", e.target.value)}
              placeholder={"e.g.\n• 3+ years of experience with React and TypeScript\n• Solid understanding of DOM performance\n• Experience partnering with product teams"}
              className="resize-y"
              aria-invalid={Boolean(errors.requirements)}
            />
            {errors.requirements && (
              <p className="text-xs text-destructive">{errors.requirements}</p>
            )}
          </div>
        </section>
      </form>
    </div>
  );
}

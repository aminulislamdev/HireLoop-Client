"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useMemo, type FormEvent } from "react"
import {
  AlertCircle,
  Briefcase,
  Building2,
  CheckCircle2,
  Loader2,
  Mail,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/auth/password-input"
import { SocialAuthButton } from "@/components/auth/social-auth-button"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

type UserRole = "seeker" | "recruiter"

export function SignUpForm() {
  const router = useRouter()
  const [role, setRole] = useState<UserRole>("seeker")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(true)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Real-time password strength calculation
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: "None", color: "bg-zinc-700" }
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    switch (score) {
      case 1:
        return { score: 1, label: "Weak", color: "bg-rose-500" }
      case 2:
        return { score: 2, label: "Fair", color: "bg-amber-500" }
      case 3:
        return { score: 3, label: "Good", color: "bg-blue-500" }
      case 4:
        return { score: 4, label: "Strong", color: "bg-emerald-500" }
      default:
        return { score: 0, label: "None", color: "bg-zinc-700" }
    }
  }, [password])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Form Validation
    if (!name.trim()) {
      setError("Please enter your full legal or professional name.")
      return
    }
    if (!email.trim()) {
      setError("Please enter your email address.")
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.")
      return
    }
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.")
      return
    }
    if (!agreeTerms) {
      setError("You must agree to the Terms of Service to proceed.")
      return
    }

    try {
      setLoading(true)
      const res = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      })

      if (res?.error) {
        setError(res.error.message || "Failed to create account. Please try again.")
        setLoading(false)
        return
      }

      setSuccess("Digital identity minted! Redirecting you home...")
      setTimeout(() => {
        router.replace("/")
        router.refresh()
      }, 900)
    } catch (err) {
      setLoading(false)
      const errMessage =
        err instanceof Error ? err.message : "Registration failed. Please try again."
      setError(errMessage)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          Create an account
        </h2>
        <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
          Select your portal role and initialize your verified profile.
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-300">
          Account Role
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("seeker")}
            className={cn(
              "flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-center transition-all duration-200",
              role === "seeker"
                ? "border-brand bg-brand/10 text-white shadow-[0_0_15px_rgba(91,87,245,0.2)]"
                : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:bg-white/[0.05]"
            )}
          >
            <Briefcase
              className={cn("size-4.5", role === "seeker" ? "text-brand" : "text-zinc-500")}
            />
            <span className="text-xs font-semibold">Job Seeker</span>
            <span className="text-[10px] text-zinc-500">Apply &amp; Track</span>
          </button>

          <button
            type="button"
            onClick={() => setRole("recruiter")}
            className={cn(
              "flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-center transition-all duration-200",
              role === "recruiter"
                ? "border-brand bg-brand/10 text-white shadow-[0_0_15px_rgba(91,87,245,0.2)]"
                : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:bg-white/[0.05]"
            )}
          >
            <Building2
              className={cn("size-4.5", role === "recruiter" ? "text-brand" : "text-zinc-500")}
            />
            <span className="text-xs font-semibold">Recruiter</span>
            <span className="text-[10px] text-zinc-500">Hire Top Talent</span>
          </button>
        </div>
      </div>

      {/* Social Google Sign-Up */}
      <SocialAuthButton mode="sign-up" onError={(msg) => setError(msg)} />

      {/* Divider */}
      <div className="relative my-4 flex items-center justify-center">
        <div className="w-full border-t border-white/10" />
        <span className="absolute bg-[#0c0c11] px-3 text-[11px] font-medium tracking-wider text-zinc-500 uppercase">
          Or register with email
        </span>
      </div>

      {/* Error Alert */}
      {error && (
        <div
          role="alert"
          className="flex items-center gap-2.5 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-rose-300 backdrop-blur-sm"
        >
          <AlertCircle className="size-4 shrink-0 text-destructive" />
          <span>{error}</span>
        </div>
      )}

      {/* Success Alert */}
      {success && (
        <div
          role="status"
          className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 backdrop-blur-sm"
        >
          <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
          <span>{success}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="signup-name"
            className="text-xs font-medium text-zinc-300"
          >
            Full Name
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
              <User className="size-4" />
            </div>
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Morgan"
              disabled={loading}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] pr-4 pl-10 text-sm text-white placeholder-zinc-500 shadow-inner outline-none transition-all duration-200 focus:border-brand focus:bg-white/[0.07] focus:ring-2 focus:ring-brand/30 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="signup-email"
            className="text-xs font-medium text-zinc-300"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
              <Mail className="size-4" />
            </div>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              disabled={loading}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] pr-4 pl-10 text-sm text-white placeholder-zinc-500 shadow-inner outline-none transition-all duration-200 focus:border-brand focus:bg-white/[0.07] focus:ring-2 focus:ring-brand/30 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="signup-password"
              className="text-xs font-medium text-zinc-300"
            >
              Password
            </label>
            {password && (
              <span className="text-[11px] font-semibold text-zinc-400">
                Strength:{" "}
                <span className={cn("capitalize", passwordStrength.color.replace("bg-", "text-"))}>
                  {passwordStrength.label}
                </span>
              </span>
            )}
          </div>
          <PasswordInput
            id="signup-password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            disabled={loading}
          />

          {/* Password Strength Meter */}
          {password && (
            <div className="pt-1.5">
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      passwordStrength.score >= step
                        ? passwordStrength.color
                        : "bg-white/10"
                    )}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start gap-2 pt-1">
          <input
            id="agree-terms"
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-0.5 size-4 rounded border-white/20 bg-white/5 text-brand accent-brand focus:ring-brand/40"
          />
          <label
            htmlFor="agree-terms"
            className="text-xs leading-relaxed text-zinc-400 select-none"
          >
            I accept HireLoop&apos;s{" "}
            <a href="#" className="text-zinc-300 underline hover:text-white">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-zinc-300 underline hover:text-white">
              Privacy Policy
            </a>
            .
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl bg-gradient-to-r from-brand to-[#4A46E8] text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-200 hover:from-brand-hover hover:to-[#3F3BD8] hover:shadow-brand/40 active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="size-4.5 animate-spin" />
              <span>Minting Digital Key...</span>
            </span>
          ) : (
            <span>Initialize Digital Identity</span>
          )}
        </Button>
      </form>

      {/* Footer Switch */}
      <div className="text-center text-xs text-zinc-400">
        Already have a Digital Identity?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-brand transition-colors hover:text-brand-hover hover:underline"
        >
          Sign in to your portal
        </Link>
      </div>
    </div>
  )
}


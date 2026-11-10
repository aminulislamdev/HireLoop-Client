"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"
import { AlertCircle, CheckCircle2, Loader2, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/auth/password-input"
import { SocialAuthButton } from "@/components/auth/social-auth-button"
import { authClient } from "@/lib/auth-client"

export function SignInForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(true)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showForgotNotice, setShowForgotNotice] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Form Validation
    if (!email.trim()) {
      setError("Please provide your email address.")
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.")
      return
    }
    if (!password) {
      setError("Please enter your password.")
      return
    }

    try {
      setLoading(true)
      const res = await authClient.signIn.email({
        email: email.trim(),
        password,
      })

      if (res?.error) {
        setError(res.error.message || "Invalid credentials. Please verify and try again.")
        setLoading(false)
        return
      }

      setSuccess("Identity verified! Redirecting you home...")
      setTimeout(() => {
        router.replace("/")
        router.refresh()
      }, 900)
    } catch (err) {
      setLoading(false)
      const errMessage =
        err instanceof Error ? err.message : "Authentication failed. Please try again."
      setError(errMessage)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          Welcome back
        </h2>
        <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
          Enter your digital credentials to access your session.
        </p>
      </div>

      {/* Social Single Sign-on */}
      <SocialAuthButton mode="sign-in" onError={(msg) => setError(msg)} />

      {/* Divider */}
      <div className="relative my-4 flex items-center justify-center">
        <div className="w-full border-t border-white/10" />
        <span className="absolute bg-[#0c0c11] px-3 text-[11px] font-medium tracking-wider text-zinc-500 uppercase">
          Or continue with email
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

      {/* Sign In Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="signin-email"
            className="text-xs font-medium text-zinc-300"
          >
            Work or Personal Email
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
              <Mail className="size-4" />
            </div>
            <input
              id="signin-email"
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

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="signin-password"
              className="text-xs font-medium text-zinc-300"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowForgotNotice(!showForgotNotice)}
              className="text-xs font-medium text-brand hover:text-brand-hover hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <PasswordInput
            id="signin-password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            disabled={loading}
          />
        </div>

        {/* Forgot Password Helper Notice (if clicked) */}
        {showForgotNotice && (
          <div className="rounded-xl border border-brand/30 bg-brand/10 p-3 text-xs text-zinc-300">
            <span className="font-semibold text-brand">Password Recovery:</span> Enter your
            registered email and click &quot;Authenticate&quot; or reach support at{" "}
            <a href="mailto:support@hireloop.com" className="underline">
              support@hireloop.com
            </a>{" "}
            for instant identity reset.
          </div>
        )}

        {/* Remember Me */}
        <div className="flex items-center gap-2 pt-1">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="size-4 rounded border-white/20 bg-white/5 text-brand accent-brand focus:ring-brand/40"
          />
          <label
            htmlFor="remember-me"
            className="text-xs text-zinc-400 select-none hover:text-zinc-300"
          >
            Remember session on this device for 30 days
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
              <span>Verifying Telemetry...</span>
            </span>
          ) : (
            <span>Authenticate &amp; Enter</span>
          )}
        </Button>
      </form>

      {/* Footer Switch */}
      <div className="text-center text-xs text-zinc-400">
        New to HireLoop?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-brand transition-colors hover:text-brand-hover hover:underline"
        >
          Mint a free Digital Identity
        </Link>
      </div>
    </div>
  )
}


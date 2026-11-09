"use client"

import { useState, type InputHTMLAttributes } from "react"
import { Eye, EyeOff, Lock } from "lucide-react"

import { cn } from "@/lib/utils"

interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  error?: string
}

export function PasswordInput({
  className,
  error,
  disabled,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
        <Lock className="size-4" />
      </div>

      <input
        type={showPassword ? "text" : "password"}
        disabled={disabled}
        className={cn(
          "h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] pr-11 pl-10 text-sm text-white placeholder-zinc-500 shadow-inner outline-none transition-all duration-200 focus:border-brand focus:bg-white/[0.07] focus:ring-2 focus:ring-brand/30 disabled:opacity-50",
          error && "border-destructive focus:border-destructive focus:ring-destructive/30",
          className
        )}
        {...props}
      />

      <button
        type="button"
        disabled={disabled}
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-zinc-400 transition-colors hover:text-white disabled:pointer-events-none"
      >
        {showPassword ? (
          <EyeOff className="size-4" />
        ) : (
          <Eye className="size-4" />
        )}
      </button>
    </div>
  )
}


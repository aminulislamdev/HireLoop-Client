"use client"

import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"
import { MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GlobeStatsSection } from "@/components/home/globe-stats-section"

const popularSearches = [
  "Frontend Developer",
  "Product Designer",
  "Data Analyst",
  "Remote",
] as const

export function HeroSection() {
  const router = useRouter()
  const [keyword, setKeyword] = useState("")
  const [location, setLocation] = useState("")

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (keyword.trim()) params.set("q", keyword.trim())
    if (location.trim()) params.set("location", location.trim())
    const query = params.toString()
    router.push(`/jobs${query ? `?${query}` : ""}`)
  }

  function handleTagClick(tag: string) {
    if (tag.toLowerCase() === "remote") {
      setLocation("Remote")
    } else {
      setKeyword(tag)
    }
  }

  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* Background radial gradients for ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-full max-w-7xl -translate-x-1/2 rounded-full bg-brand/10 blur-[140px]"
      />

      <div className="mx-auto max-w-7xl px-4 pt-12 pb-6 sm:px-6 sm:pt-16 sm:pb-8 lg:px-8 lg:pt-20 lg:pb-10">
        {/* Top Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.15)] backdrop-blur-md">
            <span role="img" aria-label="fire" className="text-sm leading-none">
              🔥
            </span>
            <span>#1 JOB PLATFORM IN 2024</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="mt-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Find Your Dream Job Today
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base md:text-lg">
            Connect with top companies, discover opportunities tailored to your
            skills, and take the next step in your career.
          </p>
        </div>

        {/* Search Bar Form */}
        <div className="mx-auto mt-8 w-full max-w-3xl sm:mt-10">
          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-zinc-900/80 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all focus-within:border-white/20 sm:flex-row sm:items-center sm:gap-0 sm:p-2.5"
          >
            {/* Keyword Input */}
            <div className="flex flex-1 items-center gap-3 px-3 py-2 sm:py-1">
              <Search className="size-5 shrink-0 text-zinc-400" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title, keywords..."
                aria-label="Job title or keywords"
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
              />
            </div>

            {/* Separator on desktop */}
            <div className="hidden h-7 w-px bg-white/15 sm:block" />

            {/* Location Input */}
            <div className="flex flex-1 items-center gap-3 px-3 py-2 sm:py-1">
              <MapPin className="size-5 shrink-0 text-zinc-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, state or remote"
                aria-label="Location"
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="h-11 w-full rounded-xl bg-brand px-6 font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-hover active:scale-[0.98] sm:h-11 sm:w-auto"
            >
              <Search className="size-4" />
              <span className="sm:hidden lg:inline">Search</span>
            </Button>
          </form>

          {/* Popular Searches */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
            <span className="text-zinc-400">Popular Searches:</span>
            {popularSearches.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pixel-Perfect 3D Earth Globe with Stars & 4 Stat Cards */}
      <GlobeStatsSection />
    </section>
  )
}

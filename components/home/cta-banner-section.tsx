import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Briefcase } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CtaBannerSection() {
  return (
    <section className="relative overflow-hidden bg-[#070709] pt-16 pb-24 text-white sm:pt-20 sm:pb-32">
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[500px] w-full max-w-5xl -translate-x-1/2 rounded-full bg-brand/15 blur-[160px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl overflow-hidden text-center">
          {/* Wireframe Glowing Dome Asset */}
          <div className="relative mx-auto flex justify-center">
            <Image
              src="/images/cta-bg.png"
              alt="Glowing network grid dome"
              width={1440}
              height={964}
              className="h-[260px] w-auto max-w-none object-top object-cover opacity-90 sm:h-[340px] md:h-[400px]"
            />

            {/* Gradient Mask to smoothly blend */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#070709] via-[#070709]/80 to-transparent"
            />

            {/* Text Overlay inside the Glowing Dome */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-4 sm:pt-8">
              <h2 className="max-w-3xl text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] sm:text-4xl md:text-5xl">
                Your next role is
                <br />
                already looking for you
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-xs text-zinc-300 drop-shadow sm:text-sm md:text-base">
                Join over 15,000+ ambitious job seekers discovering verified opportunities
                and accelerating their careers with HireLoop today.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Button
                  nativeButton={false}
                  render={<Link href="/jobs" />}
                  className="h-11 rounded-full bg-white px-7 text-sm font-semibold text-zinc-950 shadow-xl shadow-white/10 transition-all hover:bg-zinc-200 active:scale-95"
                >
                  <span>Browse Opportunities</span>
                  <ArrowRight className="size-4" />
                </Button>

                <Button
                  nativeButton={false}
                  render={<Link href="/sign-up" />}
                  variant="outline"
                  className="h-11 rounded-full border-white/20 bg-zinc-950/60 px-7 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10 active:scale-95"
                >
                  <Briefcase className="size-4" />
                  <span>Post a Job</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


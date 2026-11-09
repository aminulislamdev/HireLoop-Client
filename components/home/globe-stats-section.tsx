import Image from "next/image"

export interface StatItem {
  id: string
  value: string
  label: string
  icon: (props: { className?: string }) => React.JSX.Element
}

function BriefcaseSearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M20 12.5V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6" />
      <circle cx="16.5" cy="16.5" r="3" />
      <path d="m19 19 2.5 2.5" />
    </svg>
  )
}

function BuildingBarsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3.5" y="10" width="4.5" height="10" rx="1" />
      <rect x="9.75" y="4.5" width="4.5" height="15.5" rx="1" />
      <rect x="16" y="13" width="4.5" height="7" rx="1" />
    </svg>
  )
}

function UserSearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="10.5" cy="10.5" r="7" />
      <circle cx="10.5" cy="8.5" r="2.5" />
      <path d="M7 14.5a3.5 3.5 0 0 1 7 0" />
      <path d="m15.5 15.5 4.5 4.5" />
    </svg>
  )
}

function StarOutlineIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

const statsData: StatItem[] = [
  {
    id: "active-jobs",
    value: "50K",
    label: "Active Jobs",
    icon: BriefcaseSearchIcon,
  },
  {
    id: "companies",
    value: "12K",
    label: "Companies",
    icon: BuildingBarsIcon,
  },
  {
    id: "job-seekers",
    value: "2M",
    label: "Job Seekers",
    icon: UserSearchIcon,
  },
  {
    id: "satisfaction-rate",
    value: "97%",
    label: "Satisfaction Rate",
    icon: StarOutlineIcon,
  },
]

// Twinkling background star coordinates for deep space aesthetic
const stars = [
  { top: "8%", left: "12%", size: "w-1 h-1", opacity: "opacity-60" },
  { top: "14%", left: "18%", size: "w-0.5 h-0.5", opacity: "opacity-40" },
  { top: "6%", left: "26%", size: "w-1 h-1", opacity: "opacity-75" },
  { top: "12%", left: "35%", size: "w-0.5 h-0.5", opacity: "opacity-50" },
  { top: "5%", left: "44%", size: "w-1.5 h-1.5", opacity: "opacity-80" },
  { top: "16%", left: "52%", size: "w-0.5 h-0.5", opacity: "opacity-35" },
  { top: "7%", left: "62%", size: "w-1 h-1", opacity: "opacity-70" },
  { top: "15%", left: "71%", size: "w-0.5 h-0.5", opacity: "opacity-50" },
  { top: "6%", left: "80%", size: "w-1 h-1", opacity: "opacity-85" },
  { top: "14%", left: "89%", size: "w-0.5 h-0.5", opacity: "opacity-45" },
  { top: "22%", left: "7%", size: "w-0.5 h-0.5", opacity: "opacity-55" },
  { top: "25%", left: "93%", size: "w-1 h-1", opacity: "opacity-60" },
]

export function GlobeStatsSection() {
  return (
    <section className="relative overflow-hidden bg-black text-white pt-6 pb-20 sm:pt-10 sm:pb-28 lg:pt-14 lg:pb-36">
      {/* Deep Space Background Atmosphere Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-4 left-1/2 -z-10 h-[500px] w-full max-w-6xl -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_70%_50%_at_50%_35%,rgba(79,70,229,0.45)_0%,rgba(59,130,246,0.25)_35%,rgba(91,87,245,0.1)_60%,transparent_80%)] blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 left-1/2 -z-10 h-[350px] w-full max-w-4xl -translate-x-1/2 rounded-full bg-blue-500/20 blur-[130px]"
      />

      {/* Scattered Deep Space Stars */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-80 overflow-hidden">
        {stars.map((star, idx) => (
          <span
            key={idx}
            style={{ top: star.top, left: star.left }}
            className={`absolute rounded-full bg-blue-100 ${star.size} ${star.opacity} shadow-[0_0_4px_rgba(255,255,255,0.8)]`}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 3D Earth Globe with Overlaid Heading */}
        <div className="relative mx-auto max-w-5xl">
          {/* Earth Globe Image */}
          <div className="relative flex justify-center">
            <Image
              src="/images/globe-earth.png"
              alt="3D Earth globe with atmospheric glow"
              width={1440}
              height={780}
              priority
              className="h-auto w-full max-w-5xl select-none object-contain"
            />

            {/* Centered Heading Over Globe */}
            <div className="absolute top-[32%] left-1/2 w-full max-w-3xl -translate-x-1/2 px-4 text-center sm:top-[34%] md:top-[36%] lg:top-[38%]">
              <h2 className="text-xl font-medium tracking-tight text-white/95 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] sm:text-2xl md:text-3xl lg:text-[36px] xl:text-[40px] leading-[1.25]">
                Assisting over 15,000 job seekers
                <br />
                find their dream positions.
              </h2>
            </div>
          </div>

          {/* 4 Statistic Cards (Overlapping Lower Section of the Earth Globe) */}
          <div className="relative z-10 -mt-20 sm:-mt-28 md:-mt-36 lg:-mt-44 xl:-mt-48">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 md:gap-5 lg:gap-5 xl:gap-6">
              {statsData.map((stat) => {
                const IconComponent = stat.icon
                return (
                  <div
                    key={stat.id}
                    className="group relative flex flex-col justify-between rounded-[22px] border border-white/[0.08] bg-[#0c0c0e] p-6 shadow-2xl shadow-black/90 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#121217] sm:p-7 md:p-8 min-h-[185px] sm:min-h-[200px]"
                  >
                    {/* Top Left Icon */}
                    <div className="text-zinc-300 transition-colors group-hover:text-white">
                      <IconComponent className="size-5 sm:size-5.5" />
                    </div>

                    {/* Bottom Value & Label */}
                    <div className="mt-8 sm:mt-10">
                      <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[42px] xl:text-[46px] leading-none">
                        {stat.value}
                      </div>
                      <p className="mt-2 text-xs font-normal text-zinc-400 sm:text-sm tracking-normal">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


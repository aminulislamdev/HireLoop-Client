import Image from "next/image"
import Link from "next/link"

const footerNavigation = {
  product: [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Companies", href: "/company" },
    { name: "Pricing", href: "/pricing" },
    { name: "Salary Insights", href: "/jobs" },
  ],
  employers: [
    { name: "Post a Job", href: "/sign-up" },
    { name: "Recruiter Portal", href: "/sign-in" },
    { name: "Hiring Solutions", href: "/pricing" },
    { name: "Company Verification", href: "/company" },
  ],
  company: [
    { name: "About Us", href: "/company" },
    { name: "Careers", href: "/jobs" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#070709] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="HireLoop"
                width={154}
                height={44}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-zinc-400 sm:text-sm">
              The modern job hunting portal bridging ambitious talent with
              world-class companies through verified data and seamless workflows.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-white uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerNavigation.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs text-zinc-400 transition-colors hover:text-white sm:text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Employers Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-white uppercase">
              For Employers
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerNavigation.employers.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs text-zinc-400 transition-colors hover:text-white sm:text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-white uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs text-zinc-400 transition-colors hover:text-white sm:text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} HireLoop Inc. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-zinc-500">
            <Link href="#" className="hover:text-zinc-300">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-zinc-300">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-zinc-300">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


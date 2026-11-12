import { CtaBannerSection } from "@/components/home/cta-banner-section"
import { FeaturedJobsSection } from "@/components/home/featured-jobs-section"
import { FeaturesSection } from "@/components/home/features-section"
import { HeroSection } from "@/components/home/hero-section"
import { PricingSection } from "@/components/home/pricing-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#070709] text-white">
      <main className="flex-1">
        <HeroSection />
        <FeaturedJobsSection />
        <FeaturesSection />
        <PricingSection />
        <CtaBannerSection />
      </main>
    </div>
  )
}

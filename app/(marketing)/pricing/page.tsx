import type { Metadata } from "next"

import { PlaceholderPage } from "@/components/marketing/placeholder-page"

export const metadata: Metadata = {
  title: "Pricing",
}

export default function PricingPage() {
  return (
    <PlaceholderPage
      title="Pricing"
      description="Simple, transparent plans for teams of every size are on the way."
    />
  )
}

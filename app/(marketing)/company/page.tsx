import type { Metadata } from "next"

import { PlaceholderPage } from "@/components/marketing/placeholder-page"

export const metadata: Metadata = {
  title: "Company",
}

export default function CompanyPage() {
  return (
    <PlaceholderPage
      title="Company"
      description="Learn more about HireLoop, our mission, and the team behind it."
    />
  )
}

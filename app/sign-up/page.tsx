import type { Metadata } from "next"

import { PlaceholderPage } from "@/components/placeholder-page"

export const metadata: Metadata = {
  title: "Get Started",
}

export default function SignUpPage() {
  return (
    <PlaceholderPage
      title="Get Started"
      description="Account creation is coming soon. Start finding your next opportunity with HireLoop."
    />
  )
}

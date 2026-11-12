import type { Metadata } from "next"

import { PlaceholderPage } from "@/components/placeholder-page"

export const metadata: Metadata = {
  title: "Browse Jobs",
}

export default function JobsPage() {
  return (
    <PlaceholderPage
      title="Browse Jobs"
      description="Job listings are coming soon. Check back shortly to explore open roles."
    />
  )
}

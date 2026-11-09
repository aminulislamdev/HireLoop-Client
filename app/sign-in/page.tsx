import type { Metadata } from "next"

import { PlaceholderPage } from "@/components/placeholder-page"

export const metadata: Metadata = {
  title: "Sign In",
}

export default function SignInPage() {
  return (
    <PlaceholderPage
      title="Sign In"
      description="Authentication is being set up. You will be able to sign in here soon."
    />
  )
}

import type { Metadata } from "next"

import { AuthPortalLayout } from "@/components/auth/auth-portal-layout"
import { SignInForm } from "@/components/auth/sign-in-form"

export const metadata: Metadata = {
  title: "Sign In | HireLoop Digital Identity Portal",
  description:
    "Securely access your HireLoop career portal to track job applications, interviews, and verified opportunities.",
}

export default function SignInPage() {
  return (
    <AuthPortalLayout mode="sign-in">
      <SignInForm />
    </AuthPortalLayout>
  )
}

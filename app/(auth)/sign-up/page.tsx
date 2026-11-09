import type { Metadata } from "next"

import { AuthPortalLayout } from "@/components/auth/auth-portal-layout"
import { SignUpForm } from "@/components/auth/sign-up-form"

export const metadata: Metadata = {
  title: "Sign Up | HireLoop Digital Identity Portal",
  description:
    "Create your verified digital career identity on HireLoop to discover exclusive roles and connect directly with hiring teams.",
}

export default function SignUpPage() {
  return (
    <AuthPortalLayout mode="sign-up">
      <SignUpForm />
    </AuthPortalLayout>
  )
}

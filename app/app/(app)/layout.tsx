import React from 'react'
import { AppShell } from '@/components/admin/app-shell'
import { OnboardingGuard } from '@/components/admin/onboarding-guard'
import { requireAuth, getAuthTenant } from '@/lib/auth'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAuth()
  const tenant = await getAuthTenant()

  return (
    <AppShell>
      <OnboardingGuard tenant={tenant}>{children}</OnboardingGuard>
    </AppShell>
  )
}

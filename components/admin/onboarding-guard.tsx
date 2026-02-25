'use client'

import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

/** Accepts AuthTenant or any object with optional logo_url (for onboarding check). */
type TenantLike = { logo_url?: string | null; [k: string]: unknown } | null

export function OnboardingGuard({
  tenant,
  children,
}: {
  tenant: TenantLike
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!tenant || pathname === '/app/onboarding') return
    const logoUrl = tenant.logo_url != null ? String(tenant.logo_url) : ''
    const hasLogo = logoUrl.trim() !== ''
    if (!hasLogo) {
      router.replace('/app/onboarding')
    }
  }, [tenant, pathname, router])

  return <>{children}</>
}

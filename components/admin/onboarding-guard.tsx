'use client'

import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type TenantLike = { logo_url?: string | null } | null

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
    const hasLogo = !!tenant.logo_url && String(tenant.logo_url).trim() !== ''
    if (!hasLogo) {
      router.replace('/app/onboarding')
    }
  }, [tenant, pathname, router])

  return <>{children}</>
}

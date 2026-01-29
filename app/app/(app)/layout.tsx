import React from 'react'
import { AppShell } from '@/components/admin/app-shell'
import { requireAuth } from '@/lib/auth'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAuth()

  return <AppShell>{children}</AppShell>
}

import React from 'react'
import { Sidebar } from '@/components/admin/sidebar'
import { requireAuth } from '@/lib/auth'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Proteger la ruta - redirige a /login si no está autenticado
  await requireAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

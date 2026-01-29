'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/admin/sidebar'
import { cn } from '@/lib/utils'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />
      <main
        className={cn(
          'transition-[padding-left] duration-200',
          collapsed ? 'lg:pl-20' : 'lg:pl-64'
        )}
      >
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  )
}

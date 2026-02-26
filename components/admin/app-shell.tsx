'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/admin/sidebar'
import { BottomNav } from '@/components/admin/bottom-nav'
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
          'transition-[padding-left] duration-200 min-h-screen',
          'pb-20 pt-4 px-4 lg:pb-0 lg:pt-0 lg:px-0',
          collapsed ? 'lg:pl-20' : 'lg:pl-64'
        )}
      >
        <div className="lg:p-8">{children}</div>
      </main>
      <BottomNav />
    </div>
  )
}

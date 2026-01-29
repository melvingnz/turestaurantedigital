'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingCart,
  Settings,
  Menu as MenuIcon,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/logo'

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
  { name: 'Menú', href: '/app/menu', icon: UtensilsCrossed },
  { name: 'Pedidos', href: '/app/orders', icon: ShoppingCart },
  { name: 'Configuración', href: '/app/settings', icon: Settings },
]

interface SidebarProps {
  collapsed?: boolean
  onToggleCollapse?: () => void
}

export function Sidebar({ collapsed = false, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const showCollapseToggle = !!onToggleCollapse

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white"
        >
          {isMobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-200 lg:translate-x-0',
          'w-64',
          collapsed && 'lg:w-20',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div
            className={cn(
              'flex justify-center items-center border-b border-gray-200 min-w-0 overflow-hidden bg-transparent',
              collapsed ? 'lg:px-2 lg:py-4' : 'p-5'
            )}
          >
            {collapsed ? (
              <Logo logoOnly />
            ) : (
              <Logo compact />
            )}
          </div>

          {/* Navigation */}
          <nav
            className={cn(
              'flex-1 space-y-2',
              collapsed ? 'lg:p-2 lg:space-y-1' : 'p-4'
            )}
          >
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/app/dashboard' && pathname?.startsWith(item.href))

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  title={collapsed ? item.name : undefined}
                  className={cn(
                    'flex items-center rounded-lg text-sm font-medium transition-colors',
                    collapsed
                      ? 'lg:justify-center lg:px-0 lg:py-3'
                      : 'gap-3 px-4 py-3',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              )
            })}
          </nav>

          {/* Collapse toggle — desktop only */}
          {showCollapseToggle && (
            <div className="hidden lg:flex justify-center p-3 border-t border-gray-200">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                className="h-9 w-9 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                aria-label={collapsed ? 'Expandir barra lateral' : 'Colapsar barra lateral'}
              >
                {collapsed ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <ChevronLeft className="h-5 w-5" />
                )}
              </Button>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

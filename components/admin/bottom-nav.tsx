'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, UtensilsCrossed, ShoppingCart, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
  { name: 'Menú', href: '/app/menu', icon: UtensilsCrossed },
  { name: 'Pedidos', href: '/app/orders', icon: ShoppingCart },
  { name: 'Config', href: '/app/settings', icon: Settings },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="grid grid-cols-4 place-items-center h-14 max-w-full mx-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/app/dashboard' && pathname?.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 w-full py-2 transition-colors',
                isActive ? 'text-[#FF6B00]' : 'text-gray-500'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className={cn('h-6 w-6 shrink-0', isActive && 'text-[#FF6B00]')} />
              <span className="text-[10px] font-medium text-center">
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

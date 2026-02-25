'use client'

import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import type { Tenant } from '@/types/database'
import { useCart } from './cart-context'
import { getStorefrontDisplayName } from '@/lib/utils'

interface NavbarProps {
  tenant: Tenant
}

export function Navbar({ tenant }: NavbarProps) {
  const { totalItems, setIsOpen } = useCart()
  const displayName = getStorefrontDisplayName(tenant.name)

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            {tenant.logo_url ? (
              <div className="relative h-10 w-10 rounded overflow-hidden">
                <Image
                  src={tenant.logo_url}
                  alt={tenant.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
            ) : null}
            <h1 className="text-xl font-bold text-gray-900">{displayName}</h1>
          </div>
          
          {totalItems > 0 && (
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-gray-700 hover:text-primary transition-colors"
            >
              <ShoppingBag className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

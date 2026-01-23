'use client'

import { ShoppingBag } from 'lucide-react'
import type { Tenant } from '@/types/database'
import { useCart } from './cart-context'

interface StoreHeaderProps {
  tenant: Tenant
  isDark?: boolean
  isLateBurger?: boolean
}

export function StoreHeader({ tenant, isDark = false, isLateBurger = false }: StoreHeaderProps) {
  const { totalItems, setIsOpen } = useCart()
  const primaryColor = tenant.brand_color || '#FF5F1F'

  if (isLateBurger) {
    const LATE_BURGER_PRIMARY = '#0FA8D8' // Brand Blue
    const LATE_BURGER_SECONDARY = '#FCFF70' // Brand Yellow
    
    return (
      <header
        className="sticky top-0 z-50 border-b shadow-lg backdrop-blur-md"
        style={{
          backgroundColor: LATE_BURGER_PRIMARY + 'F0',
          borderBottomColor: LATE_BURGER_SECONDARY + '40',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo and Name */}
            <div className="flex items-center gap-3">
              {tenant.logo_url ? (
                <img
                  src={tenant.logo_url}
                  alt={tenant.name}
                  className="h-12 w-12 md:h-14 md:w-14 object-contain rounded-lg drop-shadow-lg"
                  loading="eager"
                />
              ) : (
                <div
                  className="h-12 w-12 md:h-14 md:w-14 rounded-lg flex items-center justify-center text-white font-bold text-lg md:text-xl"
                  style={{ backgroundColor: LATE_BURGER_SECONDARY, color: LATE_BURGER_PRIMARY }}
                >
                  {tenant.name.charAt(0)}
                </div>
              )}
              <h1
                className="text-xl md:text-2xl font-bold text-white drop-shadow-md"
              >
                {tenant.name}
              </h1>
            </div>

            {/* Cart Icon */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 md:p-3 rounded-full transition-colors hover:opacity-80"
              style={{ backgroundColor: LATE_BURGER_SECONDARY + '20' }}
              aria-label="Ver carrito"
            >
              <ShoppingBag
                className="h-6 w-6 md:h-7 md:w-7 text-white"
              />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 h-5 w-5 md:h-6 md:w-6 text-xs md:text-sm font-bold rounded-full flex items-center justify-center shadow-lg text-white"
                  style={{ backgroundColor: LATE_BURGER_SECONDARY, color: LATE_BURGER_PRIMARY }}
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    )
  }

  if (isDark) {
    const LATE_BURGER_PRIMARY = '#0FA8D8' // Brand Blue
    const LATE_BURGER_BG = '#050505' // Deep Dark Background
    
    return (
      <header
        className="sticky top-0 z-50 border-b shadow-lg backdrop-blur-md bg-[#050505]/95"
        style={{
          borderBottomColor: `${LATE_BURGER_PRIMARY}30`,
          backgroundColor: '#050505',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo and Name */}
            <div className="flex items-center gap-3">
              {tenant.logo_url ? (
                <img
                  src={tenant.logo_url}
                  alt={tenant.name}
                  className="h-12 w-12 md:h-14 md:w-14 object-contain"
                />
              ) : (
                <div
                  className="h-12 w-12 md:h-14 md:w-14 rounded-lg flex items-center justify-center text-white font-bold text-lg md:text-xl"
                  style={{ backgroundColor: LATE_BURGER_PRIMARY }}
                >
                  {tenant.name.charAt(0)}
                </div>
              )}
              <h1
                className="text-xl md:text-2xl font-bold text-white"
                style={{ color: LATE_BURGER_PRIMARY }}
              >
                {tenant.name}
              </h1>
            </div>

            {/* Cart Icon */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 md:p-3 rounded-full transition-colors hover:bg-[#0F0F0F]"
              aria-label="Ver carrito"
            >
              <ShoppingBag
                className="h-6 w-6 md:h-7 md:w-7"
                style={{ color: LATE_BURGER_PRIMARY }}
              />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 h-5 w-5 md:h-6 md:w-6 text-white text-xs md:text-sm font-bold rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: LATE_BURGER_PRIMARY }}
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header
      className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm"
      style={{
        borderBottomColor: `${primaryColor}20`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Name */}
          <div className="flex items-center gap-3">
            {tenant.logo_url ? (
              <img
                src={tenant.logo_url}
                alt={tenant.name}
                className="h-10 w-10 md:h-12 md:w-12 object-contain rounded-lg"
              />
            ) : (
              <div
                className="h-10 w-10 md:h-12 md:w-12 rounded-lg flex items-center justify-center text-white font-bold text-lg md:text-xl"
                style={{ backgroundColor: primaryColor }}
              >
                {tenant.name.charAt(0)}
              </div>
            )}
            <h1
              className="text-xl md:text-2xl font-bold"
              style={{ color: primaryColor }}
            >
              {tenant.name}
            </h1>
          </div>

          {/* Cart Icon */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 md:p-3 rounded-full transition-colors hover:bg-gray-100"
            aria-label="Ver carrito"
          >
            <ShoppingBag
              className="h-6 w-6 md:h-7 md:w-7"
              style={{ color: primaryColor }}
            />
            {totalItems > 0 && (
              <span
                className="absolute -top-1 -right-1 h-5 w-5 md:h-6 md:w-6 text-white text-xs md:text-sm font-bold rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: primaryColor }}
              >
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

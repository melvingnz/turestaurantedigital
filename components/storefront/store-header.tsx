'use client'

import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X, UtensilsCrossed, Coffee } from 'lucide-react'
import Image from 'next/image'
import { useCart } from './cart-context'
import type { Tenant } from '@/types/database'

const LATE_BURGER_PRIMARY = '#0FA8D8'
const LATE_BURGER_SECONDARY = '#FCFF70'

const CATEGORIES = [
  { id: 'burgers', label: 'Hamburguesas', icon: UtensilsCrossed },
  { id: 'sides', label: 'Sides', icon: UtensilsCrossed },
  { id: 'drinks', label: 'Bebidas', icon: Coffee },
] as const

interface StoreHeaderProps {
  tenant: Tenant
  isDark?: boolean
  isLateBurger?: boolean
}

export function StoreHeader({ tenant, isDark = false, isLateBurger = false }: StoreHeaderProps) {
  const { totalItems, setIsOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const primaryColor = tenant.brand_color || '#FF5F1F'

  useEffect(() => {
    if (!isLateBurger || !menuOpen) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [isLateBurger, menuOpen])

  useEffect(() => {
    if (!isLateBurger || !menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isLateBurger, menuOpen])

  const scrollToMenu = () => {
    setMenuOpen(false)
    requestAnimationFrame(() => {
      const el = document.getElementById('menu-section')
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  if (isLateBurger) {
    return (
      <>
        <header
          className="sticky top-0 z-50 border-b shadow-lg supports-[backdrop-filter]:bg-[#0FA8D8]/85 backdrop-blur-xl backdrop-saturate-150"
          style={{
            borderBottomColor: LATE_BURGER_SECONDARY + '40',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
              {/* Hamburger – Categories (mobile-first) */}
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                onPointerDown={() => setMenuOpen(true)}
                className="flex-shrink-0 p-2 -ml-2 min-w-[44px] min-h-[44px] rounded-full touch-manipulation md:p-3 flex items-center justify-center"
                style={{ backgroundColor: LATE_BURGER_SECONDARY + '20', touchAction: 'manipulation' }}
                aria-label="Abrir categorías"
                aria-expanded={menuOpen}
              >
                <Menu className="h-6 w-6 md:h-7 md:w-7 text-white" />
              </button>

              {/* Logo + Name – centered on mobile, left on desktop */}
              <div className="absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0 flex items-center gap-2 md:gap-3 min-w-0">
                {tenant.logo_url ? (
                  <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-lg overflow-hidden flex-shrink-0 drop-shadow-lg">
                    <Image
                      src={tenant.logo_url}
                      alt={tenant.name}
                      fill
                      className="object-contain"
                      sizes="56px"
                      priority
                    />
                  </div>
                ) : (
                  <div
                    className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-lg flex items-center justify-center text-white font-bold text-lg md:text-xl flex-shrink-0"
                    style={{ backgroundColor: LATE_BURGER_SECONDARY, color: LATE_BURGER_PRIMARY }}
                  >
                    {tenant.name.charAt(0)}
                  </div>
                )}
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-md truncate hidden sm:block">
                  {tenant.name}
                </h1>
              </div>

              {/* Cart – top right, prominent */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative flex-shrink-0 p-2 md:p-3 rounded-full transition-transform active:scale-95 touch-manipulation"
                style={{ backgroundColor: LATE_BURGER_SECONDARY + '20' }}
                aria-label="Ver carrito"
              >
                <ShoppingBag className="h-6 w-6 md:h-7 md:w-7 text-white" />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 min-w-[22px] h-[22px] px-1.5 text-xs font-bold rounded-full flex items-center justify-center shadow-lg text-white"
                    style={{ backgroundColor: LATE_BURGER_SECONDARY, color: LATE_BURGER_PRIMARY }}
                  >
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Categories slide-in panel (no Radix, reliable on touch) */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Categorías"
          className={`fixed inset-0 z-[100] ${menuOpen ? 'visible' : 'invisible pointer-events-none'}`}
        >
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setMenuOpen(false)}
          />
          <div
            className={`absolute top-0 left-0 h-full w-full max-w-[280px] sm:max-w-[320px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
              menuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6 pb-2 border-b">
              <h2 className="text-lg font-semibold" style={{ color: LATE_BURGER_PRIMARY }}>Categorías</h2>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="p-2 -mr-2 rounded-lg text-gray-600 hover:bg-gray-100 touch-manipulation"
                aria-label="Cerrar categorías"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 mt-4 space-y-1">
              {CATEGORIES.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToMenu()}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition-colors hover:bg-[#0FA8D8]/10 touch-manipulation"
                  style={{ color: LATE_BURGER_PRIMARY }}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </>
    )
  }

  if (isDark) {
    return (
      <header
        className="sticky top-0 z-50 border-b shadow-lg backdrop-blur-md bg-[#050505]/95"
        style={{ borderBottomColor: `${primaryColor}30` }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-3">
              {tenant.logo_url ? (
                <div className="relative h-12 w-12 md:h-14 md:w-14 rounded-lg overflow-hidden">
                  <Image src={tenant.logo_url} alt={tenant.name} fill className="object-contain" sizes="56px" />
                </div>
              ) : (
                <div className="h-12 w-12 md:h-14 md:w-14 rounded-lg flex items-center justify-center text-white font-bold text-lg md:text-xl" style={{ backgroundColor: primaryColor }}>
                  {tenant.name.charAt(0)}
                </div>
              )}
              <h1 className="text-xl md:text-2xl font-bold text-white" style={{ color: primaryColor }}>{tenant.name}</h1>
            </div>
            <button onClick={() => setIsOpen(true)} className="relative p-2 md:p-3 rounded-full transition-colors hover:bg-[#0F0F0F]" aria-label="Ver carrito">
              <ShoppingBag className="h-6 w-6 md:h-7 md:w-7" style={{ color: primaryColor }} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 md:h-6 md:w-6 text-white text-xs md:text-sm font-bold rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: primaryColor }}>
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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm" style={{ borderBottomColor: `${primaryColor}20` }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            {tenant.logo_url ? (
              <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-lg overflow-hidden">
                <Image src={tenant.logo_url} alt={tenant.name} fill className="object-contain" sizes="48px" />
              </div>
            ) : (
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg flex items-center justify-center text-white font-bold text-lg md:text-xl" style={{ backgroundColor: primaryColor }}>
                {tenant.name.charAt(0)}
              </div>
            )}
            <h1 className="text-xl md:text-2xl font-bold" style={{ color: primaryColor }}>{tenant.name}</h1>
          </div>
          <button onClick={() => setIsOpen(true)} className="relative p-2 md:p-3 rounded-full transition-colors hover:bg-gray-100" aria-label="Ver carrito">
            <ShoppingBag className="h-6 w-6 md:h-7 md:w-7" style={{ color: primaryColor }} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 md:h-6 md:w-6 text-white text-xs md:text-sm font-bold rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: primaryColor }}>
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

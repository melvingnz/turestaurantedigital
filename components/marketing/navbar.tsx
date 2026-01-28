'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

function MobileMenuPanel({
  onClose,
  onLinkClick,
}: {
  onClose: () => void
  onLinkClick: () => void
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
      className="fixed inset-0 z-[20000] md:hidden"
    >
      <div
        className="absolute inset-0 bg-black/50 animate-in fade-in duration-200"
        onClick={onClose}
      />
      <div className="absolute top-0 right-0 h-full w-full max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6 pb-2 border-b">
          <h2 className="text-lg font-semibold text-foreground">Menú</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-1">
          <Link
            href="/#features"
            className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-[#FF6B00] min-h-[44px] flex items-center touch-manipulation"
            onClick={onLinkClick}
          >
            Características
          </Link>
          <Link
            href="/#pricing"
            className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-[#FF6B00] min-h-[44px] flex items-center touch-manipulation"
            onClick={onLinkClick}
          >
            Precios
          </Link>
          <Link
            href="/about"
            className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-[#FF6B00] min-h-[44px] flex items-center touch-manipulation"
            onClick={onLinkClick}
          >
            Acerca de
          </Link>
          <Link
            href="/contact"
            className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-[#FF6B00] min-h-[44px] flex items-center touch-manipulation"
            onClick={onLinkClick}
          >
            Contacto
          </Link>
          <div className="pt-4 mt-4 border-t space-y-2">
            <Button variant="outline" className="w-full justify-center h-12" asChild>
              <Link href="/marketing/login" onClick={onLinkClick}>
                Iniciar Sesión
              </Link>
            </Button>
            <Button className="w-full justify-center h-12 bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white" asChild>
              <Link href="/marketing/signup" onClick={onLinkClick}>
                Empezar Ahora
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </div>
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const closeMenu = () => setMobileOpen(false)

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            <Link href="/" className="flex items-center min-w-0 p-0 bg-transparent border-0" onClick={closeMenu}>
              <Logo />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/#features"
                className="text-sm font-medium text-gray-600 hover:text-[#FF6B00] transition-colors whitespace-nowrap"
              >
                Características
              </Link>
              <Link
                href="/#pricing"
                className="text-sm font-medium text-gray-600 hover:text-[#FF6B00] transition-colors whitespace-nowrap"
              >
                Precios
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-600 hover:text-[#FF6B00] transition-colors whitespace-nowrap"
              >
                Acerca de
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-gray-600 hover:text-[#FF6B00] transition-colors whitespace-nowrap"
              >
                Contacto
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link href="/marketing/login">Iniciar Sesión</Link>
              </Button>
              <Button className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white" asChild>
                <Link href="/marketing/signup">Empezar Ahora</Link>
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              onPointerDown={() => setMobileOpen(true)}
              className="md:hidden flex-shrink-0 p-3 -mr-1 min-w-[48px] min-h-[48px] rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 transition-colors touch-manipulation flex items-center justify-center border-0 cursor-pointer"
              style={{ touchAction: 'manipulation' }}
              aria-label="Abrir menú"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {typeof document !== 'undefined' &&
        mobileOpen &&
        createPortal(
          <MobileMenuPanel onClose={closeMenu} onLinkClick={closeMenu} />,
          document.body
        )}
    </>
  )
}

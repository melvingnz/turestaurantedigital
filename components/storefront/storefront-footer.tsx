'use client'

import Link from 'next/link'
import type { RestaurantConfig } from '@/types/storefront'
import { getStorefrontDisplayName } from '@/lib/utils'

const BRAND_NAME = 'Tu Restaurante Digital'

interface StorefrontFooterProps {
  config: RestaurantConfig
}

function scrollToMenu() {
  document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })
}

const linkClass = 'text-sm text-gray-600 hover:text-gray-900 transition-colors'

export function StorefrontFooter({ config }: StorefrontFooterProps) {
  const displayName = getStorefrontDisplayName(config.name)
  const hasWhatsApp = Boolean(config.whatsappNumber?.trim())
  const year = new Date().getFullYear()

  const whatsAppHref = hasWhatsApp
    ? `https://wa.me/${config.whatsappNumber!.replace(/\D/g, '').replace(/^1?/, '1')}`
    : null

  const contactPhone = config.phone?.trim() || '+1 (809) 555-0123'

  return (
    <footer className="mt-auto bg-gray-100 text-gray-800 py-3">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <button type="button" onClick={scrollToMenu} className={linkClass}>
            Menú
          </button>
          <span className="text-gray-300" aria-hidden>·</span>
          {hasWhatsApp ? (
            <a href={whatsAppHref!} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Contacto
            </a>
          ) : (
            <a href={`tel:${contactPhone.replace(/\D/g, '')}`} className={linkClass}>
              Contacto
            </a>
          )}
          <span className="text-gray-300" aria-hidden>·</span>
          <Link href="/terminos" className={linkClass}>
            Términos
          </Link>
          <span className="text-gray-300" aria-hidden>·</span>
          <Link href="/privacidad" className={linkClass}>
            Privacidad
          </Link>
          <span className="text-gray-300" aria-hidden>·</span>
          <Link href="/seguridad" className={linkClass}>
            Pagos seguros
          </Link>
        </nav>

        <div className="mt-2 pt-2 border-t border-gray-200 flex flex-col items-center gap-1 sm:flex-row sm:justify-between">
          <p className="text-xs text-gray-500">© {year} {displayName}</p>
          <p className="text-xs text-gray-500">Powered by {BRAND_NAME}</p>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from './cart-context'

interface CartSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tenantId: string
  slug: string
  primaryColor?: string
}

export function CartSheet({
  open,
  onOpenChange,
  tenantId,
  slug,
  primaryColor = '#FF5F1F',
}: CartSheetProps) {
  const { items, updateQuantity, removeItem, totalPrice } = useCart()
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    setIsMobile(mq.matches)
    const fn = () => setIsMobile(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)

  const goToCheckout = () => {
    if (!termsAccepted) {
      alert('Debes aceptar los términos y condiciones')
      return
    }
    onOpenChange(false)
    router.push(`/${slug}/checkout`)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className="w-full flex flex-col p-0 overflow-hidden h-full max-h-[90vh] rounded-t-2xl border-t sm:max-h-none sm:rounded-none sm:max-w-[400px] sm:border-l sm:border-t-0 border-gray-200"
      >
        {/* Header: Carrito + badge (Shopify-style). SheetTitle required for a11y. */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-5 pt-5 pb-4 pr-12 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <SheetTitle className="text-xl font-bold text-gray-900 m-0">Carrito</SheetTitle>
            {items.length > 0 && (
              <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-gray-200 text-gray-800 text-sm font-medium">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-16 px-4">
            <p className="text-gray-500 text-center">Tu carrito está vacío</p>
          </div>
        ) : (
          <div className="flex flex-col flex-1 min-h-0">
            {/* Scrollable items */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 py-4 space-y-5">
              {items.map((item) => {
                const lineTotal = item.product.price * item.quantity
                return (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gray-100 overflow-hidden">
                      {item.product.image_url ? (
                        <Image
                          src={item.product.image_url}
                          alt={item.product.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          —
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{item.product.name}</p>
                      <p className="text-sm text-gray-600 mt-0.5">
                        {formatPrice(item.product.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div
                          className="inline-flex items-center rounded-md border border-gray-300 bg-white"
                          style={{ borderColor: primaryColor + '40' }}
                        >
                          <button
                            type="button"
                            className="p-1.5 text-gray-700 hover:bg-gray-50 rounded-l"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="p-1.5 text-gray-700 hover:bg-gray-50 rounded-r"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          type="button"
                          className="p-1.5 text-gray-500 hover:text-red-600"
                          onClick={() => removeItem(item.product.id)}
                          aria-label="Quitar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="font-semibold text-gray-900 tabular-nums">
                        {formatPrice(lineTotal)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Footer: total, disclaimer, terms, form, button (Shopify-style) */}
            <div
              className={`flex-shrink-0 border-t border-gray-200 bg-white px-4 sm:px-5 py-4 ${
                isMobile ? 'pb-[max(1rem,env(safe-area-inset-bottom))]' : ''
              }`}
            >
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-medium text-gray-700">Total estimado</span>
                <span className="text-lg font-bold text-gray-900 tabular-nums">
                  {formatPrice(totalPrice)} DOP
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Impuestos, descuentos y envío calculados en la página de pago.
              </p>

              <label className="flex items-start gap-2 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">
                  Acepto todos los{' '}
                  <Link href="/terminos" className="underline" style={{ color: primaryColor }}>
                    términos y condiciones
                  </Link>
                  .
                </span>
              </label>

              <Button
                type="button"
                onClick={goToCheckout}
                className="w-full h-12 font-semibold text-white rounded-md"
                style={{ backgroundColor: primaryColor }}
              >
                Pagar
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

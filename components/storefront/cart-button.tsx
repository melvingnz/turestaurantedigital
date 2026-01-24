'use client'

import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import { useCart } from './cart-context'

interface CartButtonProps {
  onClick: () => void
  primaryColor?: string
  textColor?: string
}

export function CartButton({ onClick, primaryColor = '#FF5F1F', textColor = '#FFFFFF' }: CartButtonProps) {
  const { totalItems, totalPrice } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
    }).format(price)
  }

  if (totalItems === 0) return null

  return (
    <Button
      onClick={onClick}
      className="fixed right-4 left-4 sm:left-auto sm:min-w-[220px] z-40 h-14 text-base sm:text-lg font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-xl rounded-full touch-manipulation"
      style={{
        backgroundColor: primaryColor,
        color: textColor,
        bottom: 'max(1rem, calc(1rem + env(safe-area-inset-bottom)))',
      }}
    >
      <ShoppingBag className="h-5 w-5 mr-2 flex-shrink-0" />
      <span className="truncate">Ver Carrito ({totalItems}) – {formatPrice(totalPrice)}</span>
    </Button>
  )
}

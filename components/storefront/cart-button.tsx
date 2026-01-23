'use client'

import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import { useCart } from './cart-context'

interface CartButtonProps {
  onClick: () => void
}

export function CartButton({ onClick }: CartButtonProps) {
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
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-auto z-50 h-14 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg rounded-full"
    >
      <ShoppingBag className="h-5 w-5 mr-2" />
      Ver Carrito ({totalItems}) - {formatPrice(totalPrice)}
    </Button>
  )
}

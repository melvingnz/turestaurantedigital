'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Minus, Plus, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import type { Product } from '@/types/database'
import { useCart } from './cart-context'

interface ProductModalProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
  primaryColor?: string
}

export function ProductModal({
  product,
  open,
  onOpenChange,
  primaryColor = '#FF5F1F',
}: ProductModalProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const handleAddToCart = () => {
    addItem(product, quantity)
    onOpenChange(false)
    setQuantity(1)
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] max-h-[90vh] rounded-t-2xl flex flex-col p-0 overflow-hidden w-full"
      >
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="relative w-full aspect-square sm:aspect-[4/3] bg-gray-100 -mt-6">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 512px"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>
            <div className="px-6 pt-4 pb-6">
              <SheetHeader className="text-left p-0">
                <SheetTitle className="text-xl sm:text-2xl">{product.name}</SheetTitle>
                {product.description && (
                  <SheetDescription className="text-base text-gray-600 mt-2">
                    {product.description}
                  </SheetDescription>
                )}
                <div
                  className="text-2xl sm:text-3xl font-bold mt-4"
                  style={{ color: primaryColor }}
                >
                  {formatPrice(product.price)}
                </div>
              </SheetHeader>
              <div className="mt-6 space-y-2">
                <Label>Cantidad</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full touch-manipulation"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <Input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))
                    }
                    className="text-center text-lg font-semibold h-12 w-20"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full touch-manipulation"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 p-4 sm:p-6 pt-0 border-t bg-white">
            <Button
              onClick={handleAddToCart}
              className="w-full h-14 text-lg font-semibold text-white rounded-xl touch-manipulation active:scale-[0.98]"
              style={{ backgroundColor: primaryColor }}
            >
              Agregar al Carrito – {formatPrice(product.price * quantity)}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

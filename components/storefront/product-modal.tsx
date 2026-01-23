'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Minus, Plus, Image as ImageIcon } from 'lucide-react'
import type { Product } from '@/types/database'
import { useCart } from './cart-context'

interface ProductModalProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const handleAddToCart = () => {
    addItem(product, quantity)
    onOpenChange(false)
    setQuantity(1)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
    }).format(price)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl">
        <div className="flex flex-col h-full">
          {/* Product Image */}
          <div className="relative w-full h-64 -mx-6 -mt-6 mb-4">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>

          {/* Product Info */}
          <SheetHeader className="text-left">
            <SheetTitle className="text-2xl">{product.name}</SheetTitle>
            {product.description && (
              <SheetDescription className="text-base text-gray-600 mt-2">
                {product.description}
              </SheetDescription>
            )}
            <div className="text-3xl font-bold text-primary mt-4">
              {formatPrice(product.price)}
            </div>
          </SheetHeader>

          {/* Quantity Selector */}
          <div className="flex-1 flex flex-col justify-end space-y-4 py-6">
            <div className="space-y-2">
              <Label>Cantidad</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="text-center text-lg font-semibold h-12"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90"
            >
              Agregar al Carrito - {formatPrice(product.price * quantity)}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

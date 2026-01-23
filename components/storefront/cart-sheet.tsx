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
import { Switch } from '@/components/ui/switch'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from './cart-context'
import { placeOrder } from '@/app/actions/orders'
import type { OrderType } from '@/types/database'

interface CartSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tenantId: string
  onOrderSuccess: () => void
  primaryColor?: string
}

export function CartSheet({ open, onOpenChange, tenantId, onOrderSuccess, primaryColor = '#FF5F1F' }: CartSheetProps) {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderType, setOrderType] = useState<OrderType>('delivery')
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
    }).format(price)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.customer_name.trim() || !formData.customer_phone.trim()) {
      alert('Por favor completa todos los campos')
      return
    }

    setIsSubmitting(true)

    try {
      const orderItems = items.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }))

      await placeOrder(
        {
          tenant_id: tenantId,
          customer_name: formData.customer_name,
          customer_phone: formData.customer_phone,
          type: orderType,
          total_amount: totalPrice,
          status: 'pending',
        },
        orderItems
      )

      // Success!
      clearCart()
      setFormData({ customer_name: '', customer_phone: '' })
      onOpenChange(false)
      onOrderSuccess()
    } catch (error) {
      console.error('Error placing order:', error)
      alert(error instanceof Error ? error.message : 'Error al realizar el pedido')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Mi Carrito
          </SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? 'Tu carrito está vacío'
              : `${items.length} ${items.length === 1 ? 'producto' : 'productos'}`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No hay productos en tu carrito</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.product.name}</h4>
                    <p className="text-sm text-gray-600">{formatPrice(item.product.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer_name">Nombre *</Label>
                  <Input
                    id="customer_name"
                    value={formData.customer_name}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_name: e.target.value })
                    }
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer_phone">Teléfono *</Label>
                  <Input
                    id="customer_phone"
                    type="tel"
                    value={formData.customer_phone}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_phone: e.target.value })
                    }
                    placeholder="809-123-4567"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Pedido</Label>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">
                        {orderType === 'delivery' ? 'Entrega a Domicilio' : 'Recoger en Local'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {orderType === 'delivery'
                          ? 'Te llevamos tu pedido'
                          : 'Ven a recoger tu pedido'}
                      </p>
                    </div>
                    <Switch
                      checked={orderType === 'delivery'}
                      onCheckedChange={(checked) =>
                        setOrderType(checked ? 'delivery' : 'pickup')
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span style={{ color: primaryColor }}>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: primaryColor }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Procesando...' : 'Realizar Pedido'}
              </Button>
            </form>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

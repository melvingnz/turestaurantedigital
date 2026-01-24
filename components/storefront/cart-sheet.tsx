'use client'

import { useState, useEffect } from 'react'
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

export function CartSheet({
  open,
  onOpenChange,
  tenantId,
  onOrderSuccess,
  primaryColor = '#FF5F1F',
}: CartSheetProps) {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderType, setOrderType] = useState<OrderType>('delivery')
  const [formData, setFormData] = useState({ customer_name: '', customer_phone: '' })
  const [isMobile, setIsMobile] = useState(true)

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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)

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
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={`
          w-full flex flex-col p-0 overflow-hidden
          ${isMobile ? 'h-[90vh] max-h-[90vh] rounded-t-2xl border-t' : 'h-full w-full sm:max-w-lg border-l'}
        `}
      >
        <SheetHeader className="flex-shrink-0 px-4 sm:px-6 pt-4 sm:pt-6 pb-2 pr-12">
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
          <div className="flex-1 flex items-center justify-center py-12">
            <div className="text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No hay productos en tu carrito</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden min-h-0">
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 space-y-4 py-4 scrollbar-hide">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">{item.product.name}</h4>
                    <p className="text-sm text-gray-600" style={{ color: primaryColor }}>
                      {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 sm:h-9 sm:w-9 rounded-full touch-manipulation"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-6 sm:w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 sm:h-9 sm:w-9 rounded-full touch-manipulation"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 sm:h-9 sm:w-9 rounded-full text-red-600 touch-manipulation"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="space-y-4 pt-2 sm:pt-4">
                <div className="space-y-2">
                  <Label htmlFor="cart_name">Nombre *</Label>
                  <Input
                    id="cart_name"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    placeholder="Tu nombre"
                    required
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cart_phone">Teléfono *</Label>
                  <Input
                    id="cart_phone"
                    type="tel"
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                    placeholder="809-123-4567"
                    required
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Pedido</Label>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium">
                        {orderType === 'delivery' ? 'Entrega a Domicilio' : 'Recoger en Local'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {orderType === 'delivery' ? 'Te llevamos tu pedido' : 'Ven a recoger tu pedido'}
                      </p>
                    </div>
                    <Switch
                      checked={orderType === 'delivery'}
                      onCheckedChange={(checked) => setOrderType(checked ? 'delivery' : 'pickup')}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`
                flex-shrink-0 border-t bg-white px-4 sm:px-6 py-4
                ${isMobile ? 'pb-[max(1rem,env(safe-area-inset-bottom))]' : ''}
              `}
            >
              <div className="flex justify-between text-lg font-semibold mb-3">
                <span>Total</span>
                <span style={{ color: primaryColor }}>{formatPrice(totalPrice)}</span>
              </div>
              <Button
                type="submit"
                className="w-full h-14 text-lg font-semibold text-white rounded-xl touch-manipulation active:scale-[0.98]"
                style={{ backgroundColor: primaryColor }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Procesando...' : 'Realizar Pedido'}
              </Button>
            </div>
          </form>
        )}
      </SheetContent>
    </Sheet>
  )
}

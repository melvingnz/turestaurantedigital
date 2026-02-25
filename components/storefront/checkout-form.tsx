'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCart } from './cart-context'
import { placeOrder } from '@/app/actions/orders'
import type { Tenant } from '@/types/database'
import type { OrderType } from '@/types/database'

interface CheckoutFormProps {
  tenant: Tenant
}

type PaymentMethod = 'cod' | 'bank'

export function CheckoutForm({ tenant }: CheckoutFormProps) {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod')
  const [orderType, setOrderType] = useState<OrderType>('delivery')
  const [formData, setFormData] = useState({
    contact: '',
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    country: 'República Dominicana',
  })

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)

  const primaryColor = tenant.brand_color || '#FF5F1F'

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <p className="text-gray-600 mb-4">Tu carrito está vacío.</p>
        <Link href={`/${tenant.slug}`}>
          <Button style={{ backgroundColor: primaryColor }} className="text-white">
            Volver al menú
          </Button>
        </Link>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.contact.trim() || !formData.firstName.trim() || !formData.lastName.trim()) {
      alert('Completa los campos obligatorios: contacto, nombre y apellidos.')
      return
    }
    setIsSubmitting(true)
    try {
      const orderItems = items.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }))
      const contact = formData.contact.trim()
      const isEmail = contact.includes('@')
      const order = await placeOrder(
        {
          tenant_id: tenant.id,
          customer_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
          customer_phone: contact,
          customer_email: isEmail ? contact : null,
          type: orderType,
          total_amount: totalPrice,
          status: 'pending',
        },
        orderItems
      )
      clearCart()
      router.push(`/${tenant.slug}/orden-completada?order=${order.id}`)
    } catch (error) {
      console.error('Error placing order:', error)
      alert(error instanceof Error ? error.message : 'Error al realizar el pedido')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Form column */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contacto */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Contacto</h2>
              <Input
                type="text"
                placeholder="Email o número de teléfono móvil"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full h-11 rounded-md border-gray-300"
                required
              />
            </div>

            {/* Pago */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Pago</h2>
              <p className="text-sm text-gray-500 mb-3">
                Todas las transacciones son seguras y están encriptadas.
              </p>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <label
                  className={`flex items-center gap-3 p-4 cursor-pointer border-b border-gray-200 ${
                    paymentMethod === 'cod' ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="rounded-full border-gray-300"
                  />
                  <span className="font-medium">Pago contra entrega</span>
                </label>
                <label
                  className={`flex items-center gap-3 p-4 cursor-pointer ${paymentMethod === 'bank' ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                    className="rounded-full border-gray-300"
                  />
                  <span className="font-medium">Depósito bancario</span>
                </label>
              </div>
            </div>

            {/* Tipo: entrega o recoger */}
            <div>
              <Label className="text-gray-700">Tipo de pedido</Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="orderType"
                    checked={orderType === 'delivery'}
                    onChange={() => setOrderType('delivery')}
                    className="rounded-full border-gray-300"
                  />
                  <span>Entrega a domicilio</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="orderType"
                    checked={orderType === 'pickup'}
                    onChange={() => setOrderType('pickup')}
                    className="rounded-full border-gray-300"
                  />
                  <span>Recoger en local</span>
                </label>
              </div>
            </div>

            {/* Dirección de facturación */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Dirección de facturación</h2>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="country" className="text-gray-700">País / Región</Label>
                  <select
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="mt-1 w-full h-11 rounded-md border border-gray-300 bg-white px-3"
                  >
                    <option>República Dominicana</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-700">Nombre</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Nombre"
                      className="mt-1 h-11 rounded-md border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-700">Apellidos</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Apellidos"
                      className="mt-1 h-11 rounded-md border-gray-300"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address" className="text-gray-700">Dirección</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Dirección"
                    className="mt-1 h-11 rounded-md border-gray-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="postalCode" className="text-gray-700">Código postal (opcional)</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="Código postal"
                      className="mt-1 h-11 rounded-md border-gray-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-gray-700">Ciudad</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Ciudad"
                      className="mt-1 h-11 rounded-md border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 font-semibold text-white rounded-md"
              style={{ backgroundColor: primaryColor }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Procesando...' : 'Finalizar el pedido'}
            </Button>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <Link href="/privacidad" className="underline" style={{ color: primaryColor }}>
                Política de privacidad
              </Link>
              <Link href="/terminos" className="underline" style={{ color: primaryColor }}>
                Términos del servicio
              </Link>
              <Link href="/contact" className="underline" style={{ color: primaryColor }}>
                Contacto
              </Link>
            </div>
          </form>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-8 border border-gray-200 rounded-xl p-5 bg-gray-50/50">
            <h2 className="font-semibold text-gray-900 mb-4">Resumen del pedido</h2>
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-3">
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gray-200 overflow-hidden">
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
                    <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                  </div>
                  <div className="flex-shrink-0 text-right font-medium text-gray-900 tabular-nums">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-baseline">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-lg font-bold text-gray-900 tabular-nums">
                DOP ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

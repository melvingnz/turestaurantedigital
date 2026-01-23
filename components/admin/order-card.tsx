'use client'

import { Button } from '@/components/ui/button'
import { Clock, User, Phone, Package } from 'lucide-react'
import type { OrderWithItems } from '@/types/database'
import { formatDistanceToNow } from 'date-fns'

interface OrderCardProps {
  order: OrderWithItems
  onStatusUpdate: (orderId: string, status: OrderWithItems['status']) => Promise<void>
}

const statusConfig = {
  pending: {
    label: 'Pendiente',
    color: 'border-yellow-500 bg-yellow-50',
    textColor: 'text-yellow-700',
    nextAction: 'Aceptar',
    nextStatus: 'preparing' as const,
  },
  preparing: {
    label: 'En Cocina',
    color: 'border-blue-500 bg-blue-50',
    textColor: 'text-blue-700',
    nextAction: 'Marcar Listo',
    nextStatus: 'ready' as const,
  },
  ready: {
    label: 'Listo',
    color: 'border-green-500 bg-green-50',
    textColor: 'text-green-700',
    nextAction: 'Entregado',
    nextStatus: 'delivered' as const,
  },
  delivered: {
    label: 'Entregado',
    color: 'border-gray-400 bg-gray-50',
    textColor: 'text-gray-700',
    nextAction: null,
    nextStatus: null,
  },
  cancelled: {
    label: 'Cancelado',
    color: 'border-red-500 bg-red-50',
    textColor: 'text-red-700',
    nextAction: null,
    nextStatus: null,
  },
}

export function OrderCard({ order, onStatusUpdate }: OrderCardProps) {
  const config = statusConfig[order.status]
  const timeAgo = formatDistanceToNow(new Date(order.created_at), {
    addSuffix: true,
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
    }).format(price)
  }

  const getOrderNumber = (id: string) => {
    // Use last 4 characters of UUID for display
    return `#${id.slice(-4).toUpperCase()}`
  }

  const handleStatusUpdate = async () => {
    if (!config.nextStatus) return
    await onStatusUpdate(order.id, config.nextStatus)
  }

  return (
    <div
      className={`rounded-lg border-4 ${config.color} p-6 shadow-lg transition-all hover:shadow-xl`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-5 w-5 text-gray-600" />
            <span className="text-2xl font-bold text-gray-900">
              {getOrderNumber(order.id)}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${config.textColor} ${config.color.replace('bg-', 'bg-').replace('border-', 'border-')}`}
            >
              {config.label}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-500" />
          <span className="font-semibold text-gray-900">{order.customer_name}</span>
        </div>
        {order.customer_phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">{order.customer_phone}</span>
          </div>
        )}
        <div className="text-sm text-gray-600">
          Tipo: {order.type === 'delivery' ? 'Entrega a Domicilio' : order.type === 'pickup' ? 'Para Llevar' : 'Comer Aquí'}
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">Items:</h4>
        <ul className="space-y-1">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">
                <span className="font-semibold">{item.quantity}x</span>{' '}
                {item.product?.name || 'Producto'}
              </span>
              <span className="text-gray-600">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between mb-4 pt-4 border-t-2 border-gray-300">
        <span className="text-lg font-bold text-gray-900">Total:</span>
        <span className="text-xl font-bold text-primary">
          {formatPrice(order.total_amount)}
        </span>
      </div>

      {/* Actions */}
      {config.nextAction && (
        <Button
          onClick={handleStatusUpdate}
          className={`w-full h-12 text-lg font-semibold ${
            order.status === 'pending'
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : order.status === 'preparing'
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {config.nextAction}
        </Button>
      )}
    </div>
  )
}

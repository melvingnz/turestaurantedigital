'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { OrderCard } from './order-card'
import { supabase } from '@/lib/supabase/client'
import { updateOrderStatus } from '@/app/actions/orders'
import { useSound } from '@/hooks/use-sound'
import type { OrderWithItems, OrderStatus } from '@/types/database'
import { Bell } from 'lucide-react'

interface OrdersClientProps {
  initialOrders: OrderWithItems[]
  tenantId: string
}

type StatusFilter = 'all' | 'pending' | 'preparing' | 'ready'

export function OrdersClient({ initialOrders, tenantId }: OrdersClientProps) {
  const [orders, setOrders] = useState<OrderWithItems[]>(initialOrders)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [isConnected, setIsConnected] = useState(false)
  const { playSound } = useSound()

  // Filter and sort orders by status and time
  const filteredOrders = orders
    .filter((order) => {
      if (statusFilter === 'all') return order.status !== 'delivered' && order.status !== 'cancelled'
      return order.status === statusFilter
    })
    .sort((a, b) => {
      // Sort by created_at (newest first)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

  // Handle status update
  const handleStatusUpdate = useCallback(
    async (orderId: string, newStatus: OrderStatus) => {
      try {
        await updateOrderStatus(orderId, newStatus)
        
        // Optimistically update local state
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        )
      } catch (error) {
        console.error('Error updating order status:', error)
        alert('Error al actualizar el estado del pedido')
      }
    },
    []
  )

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `tenant_id=eq.${tenantId}`,
        },
        async (payload) => {
          console.log('Order change detected:', payload)

          if (payload.eventType === 'INSERT') {
            // New order - fetch full order with items
            const newOrder = payload.new as any
            
            // Fetch order items
            const { data: orderItems } = await supabase
              .from('order_items')
              .select('*, products(*)')
              .eq('order_id', newOrder.id)

            const orderWithItems: OrderWithItems = {
              ...newOrder,
              items: (orderItems || []).map((item: any) => ({
                id: item.id,
                order_id: item.order_id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price,
                notes: item.notes,
                created_at: item.created_at,
                product: item.products,
              })),
            }

            setOrders((prev) => [orderWithItems, ...prev])
            
            // Play notification sound
            playSound()
            
            // Flash notification (subtle visual feedback)
            const originalBg = document.body.style.backgroundColor
            document.body.style.transition = 'background-color 0.2s'
            document.body.style.backgroundColor = 'rgba(255, 95, 31, 0.1)'
            setTimeout(() => {
              document.body.style.backgroundColor = originalBg || ''
              setTimeout(() => {
                document.body.style.transition = ''
              }, 200)
            }, 300)
          } else if (payload.eventType === 'UPDATE') {
            // Order updated - update local state
            const updatedOrder = payload.new as any
            
            setOrders((prev) =>
              prev.map((order) =>
                order.id === updatedOrder.id
                  ? { ...order, ...updatedOrder }
                  : order
              )
            )
          } else if (payload.eventType === 'DELETE') {
            // Order deleted - remove from local state
            setOrders((prev) => prev.filter((order) => order.id !== payload.old.id))
          }
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status)
        setIsConnected(status === 'SUBSCRIBED')
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [tenantId, playSound])

  const statusTabs: Array<{ id: StatusFilter; label: string }> = [
    { id: 'all', label: 'Todos' },
    { id: 'pending', label: 'Pendientes' },
    { id: 'preparing', label: 'En Cocina' },
    { id: 'ready', label: 'Listos' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Pedidos en Vivo</h1>
            <div className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${
                  isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                }`}
              />
              <span className="text-sm text-gray-600">
                {isConnected ? 'Conectado' : 'Desconectado'}
              </span>
            </div>
          </div>
          <p className="text-gray-600 mt-1">
            Sistema de visualización de cocina en tiempo real
          </p>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {statusTabs.map((tab) => (
          <Button
            key={tab.id}
            variant={statusFilter === tab.id ? 'default' : 'ghost'}
            onClick={() => setStatusFilter(tab.id)}
            className={`rounded-b-none ${
              statusFilter === tab.id
                ? 'bg-primary hover:bg-primary/90 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No hay pedidos
          </h3>
          <p className="text-gray-600">
            {statusFilter === 'all'
              ? 'Los nuevos pedidos aparecerán aquí en tiempo real'
              : `No hay pedidos con estado "${statusTabs.find((t) => t.id === statusFilter)?.label}"`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

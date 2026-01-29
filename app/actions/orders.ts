'use server'

import { createServerClient } from '@/lib/supabase/server'
import type { Order, OrderInsert, OrderItemInsert, OrderWithItems } from '@/types/database'
import { logger } from '@/lib/logger'

/**
 * Create a new order with items
 */
export async function placeOrder(
  orderData: OrderInsert,
  items: Array<{ product_id: string; quantity: number; price: number }>
): Promise<Order> {
  const supabase = await createServerClient()

  // Start a transaction by creating the order first
  const { data: order, error: orderError } = await supabase
    .from('orders')
    // @ts-ignore - Supabase generated types mismatch
    .insert(orderData)
    .select()
    .single()

  if (orderError || !order) {
    logger.error('[Orders] Error creating order', { message: orderError?.message })
    throw new Error(`Failed to create order: ${orderError?.message || 'Unknown error'}`)
  }

  // Type guard para asegurar que order es válido
  const validOrder = order as unknown as Order

  // Create order items
  const orderItems: OrderItemInsert[] = items.map((item) => ({
    order_id: validOrder.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price,
    notes: null,
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    // @ts-ignore - Supabase generated types mismatch
    .insert(orderItems)

  if (itemsError) {
    logger.error('[Orders] Error creating order items', { orderId: validOrder.id, message: itemsError.message })
    // Try to clean up the order if items failed
    // @ts-ignore - Supabase generated types mismatch
    await supabase.from('orders').delete().eq('id', validOrder.id)
    throw new Error(`Failed to create order items: ${itemsError.message}`)
  }

  return validOrder
}

/**
 * Get orders for a tenant with order items
 */
export async function getOrdersWithItems(tenantId: string): Promise<OrderWithItems[]> {
  try {
    const supabase = await createServerClient()

    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      // @ts-ignore - Supabase generated types mismatch
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })

    if (ordersError) {
      logger.error('[Orders] Error fetching orders', { tenantId, message: ordersError.message })
      return []
    }

    if (!orders || orders.length === 0) {
      return []
    }

    // Type guard para asegurar que orders es válido
    const validOrders = orders as unknown as Order[]

    // Fetch order items for all orders
    const orderIds = validOrders.map((o) => o.id)
    const { data: orderItems, error: itemsError } = await supabase
      .from('order_items')
      .select('*, products(*)')
      // @ts-ignore - Supabase generated types mismatch
      .in('order_id', orderIds)

    if (itemsError) {
      logger.error('[Orders] Error fetching order items', { message: itemsError.message })
      return []
    }

    // Combine orders with their items
    const validOrderItems = (orderItems as unknown as Array<{
      id: string
      order_id: string
      product_id: string
      quantity: number
      price: number
      notes: string | null
      created_at: string
      products: any
    }> | null) || []

    const ordersWithItems: OrderWithItems[] = validOrders.map((order) => {
      const items = validOrderItems
        .filter((item) => item.order_id === order.id)
        .map((item) => ({
          id: item.id,
          order_id: item.order_id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
          notes: item.notes,
          created_at: item.created_at,
          product: item.products as any, // Type assertion for joined product
        }))

      return {
        ...order,
        items,
      }
    })

    return ordersWithItems
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    logger.error('[Orders] Fetch failed (network or Supabase)', { tenantId, message })
    return []
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: Order['status']
): Promise<Order> {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('orders')
    // @ts-ignore - Supabase generated types mismatch
    .update({ status })
    .eq('id', orderId)
    .select()
    .single()

  if (error) {
    logger.error('[Orders] Error updating order status', { orderId, status, message: error.message })
    throw new Error(`Failed to update order status: ${error.message}`)
  }

  if (!data) {
    throw new Error('Failed to update order status: No data returned')
  }

  return data as unknown as Order
}

/**
 * Get orders for a tenant
 */
export async function getOrders(tenantId: string): Promise<Order[]> {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    // @ts-ignore - Supabase generated types mismatch
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false })

  if (error) {
    logger.error('[Orders] Error fetching orders', { tenantId, message: error.message })
    throw new Error(`Failed to fetch orders: ${error.message}`)
  }

  return ((data as unknown as Order[]) || []) as Order[]
}

'use server'

import { createClient } from '@/lib/supabase/server'
import { getAuthTenant } from '@/lib/auth'

export interface DashboardMetrics {
  totalProducts: number
  ordersToday: number
  ordersThisWeek: number
  ordersThisMonth: number
  revenueToday: number
  revenueThisWeek: number
  revenueThisMonth: number
  averageOrderValue: number
  topProducts: Array<{
    product_id: string
    product_name: string
    total_quantity: number
    total_revenue: number
  }>
  salesByDay: Array<{
    date: string
    orders: number
    revenue: number
  }>
}

/**
 * Obtener métricas del dashboard para el tenant actual
 */
export async function getDashboardMetrics(): Promise<DashboardMetrics | null> {
  const tenant = await getAuthTenant()
  if (!tenant || typeof tenant !== 'object' || !('id' in tenant)) return null

  const tenantId = (tenant as { id: string }).id as string
  const supabase = await createClient()

  // Obtener fecha de inicio del día, semana y mes
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekStart = new Date(todayStart)
  weekStart.setDate(weekStart.getDate() - 7)
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  // Total de productos
  const { count: totalProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    // @ts-expect-error - Supabase type inference issue
    .eq('tenant_id', tenantId)

  // Órdenes de hoy
  const { count: ordersToday } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    // @ts-expect-error - Supabase type inference issue
    .eq('tenant_id', tenantId)
    .gte('created_at', todayStart.toISOString())
    // @ts-expect-error - Supabase type inference issue
    .neq('status', 'cancelled')

  // Órdenes de esta semana
  const { count: ordersThisWeek } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    // @ts-expect-error - Supabase type inference issue
    .eq('tenant_id', tenantId)
    .gte('created_at', weekStart.toISOString())
    // @ts-expect-error - Supabase type inference issue
    .neq('status', 'cancelled')

  // Órdenes de este mes
  const { count: ordersThisMonth } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    // @ts-expect-error - Supabase type inference issue
    .eq('tenant_id', tenantId)
    .gte('created_at', monthStart.toISOString())
    // @ts-expect-error - Supabase type inference issue
    .neq('status', 'cancelled')

  // Ingresos de hoy
  const { data: ordersTodayData } = await supabase
    .from('orders')
    .select('total_amount')
    // @ts-expect-error - Supabase type inference issue
    .eq('tenant_id', tenantId)
    .gte('created_at', todayStart.toISOString())
    // @ts-expect-error - Supabase type inference issue
    .neq('status', 'cancelled')

  const revenueToday =
    (ordersTodayData as Array<{ total_amount: number }> | null)?.reduce(
      (sum, order) => sum + Number(order.total_amount || 0),
      0
    ) || 0

  // Ingresos de esta semana
  const { data: ordersWeekData } = await supabase
    .from('orders')
    .select('total_amount')
    // @ts-expect-error - Supabase type inference issue
    .eq('tenant_id', tenantId)
    .gte('created_at', weekStart.toISOString())
    // @ts-expect-error - Supabase type inference issue
    .neq('status', 'cancelled')

  const revenueThisWeek =
    (ordersWeekData as Array<{ total_amount: number }> | null)?.reduce(
      (sum, order) => sum + Number(order.total_amount || 0),
      0
    ) || 0

  // Ingresos de este mes
  const { data: ordersMonthData } = await supabase
    .from('orders')
    .select('total_amount')
    // @ts-expect-error - Supabase type inference issue
    .eq('tenant_id', tenantId)
    .gte('created_at', monthStart.toISOString())
    // @ts-expect-error - Supabase type inference issue
    .neq('status', 'cancelled')

  const revenueThisMonth =
    (ordersMonthData as Array<{ total_amount: number }> | null)?.reduce(
      (sum, order) => sum + Number(order.total_amount || 0),
      0
    ) || 0

  // Valor promedio de orden
  const totalOrders = ordersMonthData?.length || 0
  const averageOrderValue = totalOrders > 0 ? revenueThisMonth / totalOrders : 0

  // Productos más vendidos (últimos 30 días)
  const thirtyDaysAgo = new Date(now)
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const { data: recentOrders } = await supabase
    .from('orders')
    .select('id')
    // @ts-expect-error - Supabase type inference issue
    .eq('tenant_id', tenantId)
    .gte('created_at', thirtyDaysAgo.toISOString())
    // @ts-expect-error - Supabase type inference issue
    .neq('status', 'cancelled')

  const orderIds = (recentOrders as Array<{ id: string }> | null)?.map((o) => o.id) || []

  let topProducts: Array<{
    product_id: string
    product_name: string
    total_quantity: number
    total_revenue: number
  }> = []

  if (orderIds.length > 0) {
    const { data: orderItems } = await supabase
      .from('order_items')
      .select('product_id, quantity, price')
      // @ts-expect-error - Supabase type inference issue
      .in('order_id', orderIds)

    if (orderItems) {
      // Agrupar por producto
      const productMap = new Map<
        string,
        { name: string; quantity: number; revenue: number }
      >()

      const validOrderItems = orderItems as Array<{
        product_id: string
        quantity: number
        price: number
      }>

      for (const item of validOrderItems) {
        const existing = productMap.get(item.product_id) || {
          name: '',
          quantity: 0,
          revenue: 0,
        }
        existing.quantity += item.quantity
        existing.revenue += Number(item.price) * item.quantity
        productMap.set(item.product_id, existing)
      }

      // Obtener nombres de productos
      const productIds = Array.from(productMap.keys())
      const { data: products } = await supabase
        .from('products')
        .select('id, name')
        // @ts-expect-error - Supabase type inference issue
        .in('id', productIds)

      if (products) {
        const validProducts = products as Array<{ id: string; name: string }>
        const productNameMap = new Map(validProducts.map((p) => [p.id, p.name]))
        topProducts = Array.from(productMap.entries())
          .map(([product_id, data]) => ({
            product_id,
            product_name: productNameMap.get(product_id) || 'Producto desconocido',
            total_quantity: data.quantity,
            total_revenue: data.revenue,
          }))
          .sort((a, b) => b.total_quantity - a.total_quantity)
          .slice(0, 5) // Top 5
      }
    }
  }

  // Ventas por día (últimos 7 días)
  const salesByDay: Array<{ date: string; orders: number; revenue: number }> = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date(todayStart)
    date.setDate(date.getDate() - i)
    const dateStart = new Date(date)
    dateStart.setHours(0, 0, 0, 0)
    const dateEnd = new Date(date)
    dateEnd.setHours(23, 59, 59, 999)

    const { data: dayOrders, count: dayOrdersCount } = await supabase
      .from('orders')
      .select('total_amount', { count: 'exact' })
      // @ts-expect-error - Supabase type inference issue
    .eq('tenant_id', tenantId)
      .gte('created_at', dateStart.toISOString())
      .lte('created_at', dateEnd.toISOString())
      // @ts-expect-error - Supabase type inference issue
    .neq('status', 'cancelled')

    const dayRevenue =
      (dayOrders as Array<{ total_amount: number }> | null)?.reduce(
        (sum, order) => sum + Number(order.total_amount || 0),
        0
      ) || 0

    salesByDay.push({
      date: date.toISOString().split('T')[0],
      orders: dayOrdersCount || 0,
      revenue: dayRevenue,
    })
  }

  return {
    totalProducts: totalProducts || 0,
    ordersToday: ordersToday || 0,
    ordersThisWeek: ordersThisWeek || 0,
    ordersThisMonth: ordersThisMonth || 0,
    revenueToday,
    revenueThisWeek,
    revenueThisMonth,
    averageOrderValue,
    topProducts,
    salesByDay,
  }
}

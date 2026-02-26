import { NextResponse } from 'next/server'
import { getAuthTenant } from '@/lib/auth'
import { getOrdersWithItems } from '@/app/actions/orders'
import { logger } from '@/lib/logger'

/**
 * GET /api/app/orders — Lista de pedidos del tenant del usuario autenticado.
 * Usado por la vista de cocina para polling/refresh.
 */
export async function GET() {
  try {
    const tenant = await getAuthTenant()
    if (!tenant?.id) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
    }

    const orders = await getOrdersWithItems(tenant.id)
    return NextResponse.json(orders)
  } catch (error) {
    logger.error('[API Orders] Error fetching orders', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Error al cargar pedidos' },
      { status: 500 }
    )
  }
}

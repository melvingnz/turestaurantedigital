import { getAuthTenant } from '@/lib/auth'
import { getOrdersWithItems } from '@/app/actions/orders'
import { OrdersClient } from '@/components/admin/orders-client'

export const metadata = {
  title: 'Pedidos | Tu Restaurante Digital',
}

export default async function OrdersPage() {
  const tenant = await getAuthTenant()
  if (!tenant?.id) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-gray-600">No se encontró tu restaurante. Revisa la sesión o contacta soporte.</p>
      </div>
    )
  }
  const initialOrders = await getOrdersWithItems(tenant.id)
  return <OrdersClient initialOrders={initialOrders} tenantId={tenant.id} />
}

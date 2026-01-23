import { getCurrentTenantId } from '@/lib/tenant'
import { getOrdersWithItems } from '@/app/actions/orders'
import { OrdersClient } from '@/components/admin/orders-client'

export default async function OrdersPage() {
  const tenantId = await getCurrentTenantId()
  const initialOrders = await getOrdersWithItems(tenantId)

  return <OrdersClient initialOrders={initialOrders} tenantId={tenantId} />
}

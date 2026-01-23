import { getProducts } from '@/app/actions/products'
import { getCurrentTenantId } from '@/lib/tenant'
import { MenuClient } from '@/components/admin/menu-client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default async function MenuPage() {
  const tenantId = await getCurrentTenantId()
  const products = await getProducts(tenantId)

  return <MenuClient initialProducts={products} tenantId={tenantId} />
}

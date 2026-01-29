import { getProducts } from '@/app/actions/products'
import { getAuthTenant } from '@/lib/auth'
import { MenuClient } from '@/components/admin/menu-client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const metadata = {
  title: 'Menú | Tu Restaurante Digital',
}

export default async function MenuPage() {
  const tenant = await getAuthTenant()
  if (!tenant?.id) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-gray-600">No se encontró tu restaurante. Revisa la sesión o contacta soporte.</p>
      </div>
    )
  }
  const products = await getProducts(tenant.id)
  return <MenuClient initialProducts={products} tenantId={tenant.id} />
}

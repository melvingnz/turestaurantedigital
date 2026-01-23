import { getTenantBySlug, getProductsBySlug } from '@/lib/api'
import { MenuClient } from '@/components/storefront/menu-client'
import { notFound } from 'next/navigation'

export default async function StorefrontPage({
  params,
}: {
  params: { slug: string }
}) {
  const tenant = await getTenantBySlug(params.slug)
  
  if (!tenant) {
    notFound()
  }

  const products = await getProductsBySlug(params.slug)

  return <MenuClient products={products} tenantId={tenant.id} />
}

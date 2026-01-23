import { getTenantBySlug, getProductsBySlug } from '@/lib/api'
import { LateBurgerStorefront } from '@/components/storefront/late-burger-storefront'
import { StorefrontClient } from '@/components/storefront/storefront-client'
import { LATE_BURGER_TENANT, LATE_BURGER_PRODUCTS } from '@/lib/mock-data'
import { notFound } from 'next/navigation'

export default async function StorefrontPage({
  params,
}: {
  params: { slug: string }
}) {
  // TODO: Replace with Supabase fetch when ready
  // For now, use mock data for Late Burger pilot with Vibrant Blue Theme
  const isLateBurger = params.slug === 'lateburger'
  
  if (isLateBurger) {
    return (
      <LateBurgerStorefront
        tenant={LATE_BURGER_TENANT}
        products={LATE_BURGER_PRODUCTS}
      />
    )
  }

  // Fallback to Supabase for other tenants (light theme)
  const tenant = await getTenantBySlug(params.slug)
  
  if (!tenant) {
    notFound()
  }

  const products = await getProductsBySlug(params.slug)

  return <StorefrontClient tenant={tenant} products={products} />
}

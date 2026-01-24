import { getTenantBySlug, getProductsBySlug } from '@/lib/api'
import { LateBurgerStorefront } from '@/components/storefront/late-burger-storefront'
import { StorefrontClient } from '@/components/storefront/storefront-client'
import { LATE_BURGER_TENANT, LATE_BURGER_PRODUCTS } from '@/lib/mock-data'
import { notFound } from 'next/navigation'

export default async function StorefrontPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>
}) {
  const resolvedParams = await Promise.resolve(params)
  const slug = resolvedParams.slug

  // Reject static assets that [slug] wrongly catches (favicon, etc.)
  const staticSlugs = ['favicon.ico', 'favicon.png', 'robots.txt', 'sitemap.xml']
  if (slug && staticSlugs.includes(slug.toLowerCase())) {
    notFound()
  }

  // DEBUG
  console.log('[STOREFRONT PAGE]', { slug, paramsType: typeof params })

  // HARDCODED FALLBACK: Always use mock data for Late Burger
  // DO NOT rely on Supabase for Late Burger in production
  const isLateBurger = slug === 'lateburger' || slug?.toLowerCase() === 'lateburger'
  
  if (isLateBurger) {
    console.log('[STOREFRONT PAGE] Using Late Burger mock data')
    return (
      <LateBurgerStorefront
        tenant={LATE_BURGER_TENANT}
        products={LATE_BURGER_PRODUCTS}
      />
    )
  }

  // Fallback to Supabase for other tenants (light theme)
  const tenant = await getTenantBySlug(slug)
  
  if (!tenant) {
    notFound()
  }

  const products = await getProductsBySlug(slug)

  return <StorefrontClient tenant={tenant} products={products} />
}

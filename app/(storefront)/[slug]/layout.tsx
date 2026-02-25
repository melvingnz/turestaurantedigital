import { notFound } from 'next/navigation'
import { getTenantBySlug } from '@/lib/api'
import { CartProvider } from '@/components/storefront/cart-context'
import { LATE_BURGER_TENANT } from '@/lib/mock-data'
import { logger } from '@/lib/logger'

export default async function StorefrontLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string } | Promise<{ slug: string }>
}) {
  const resolvedParams = await Promise.resolve(params)
  const slug = resolvedParams.slug

  const staticSlugs = ['favicon.ico', 'favicon.png', 'robots.txt', 'sitemap.xml']
  if (slug && staticSlugs.includes(slug.toLowerCase())) {
    notFound()
  }

  logger.debug('[Storefront] Layout', { slug, paramsType: typeof params })

  // TODO: Replace with Supabase fetch when ready
  // For now, use mock data for Late Burger pilot
  const isLateBurger = slug === 'lateburger' || slug?.toLowerCase() === 'lateburger'
  
  if (isLateBurger) {
    return (
      <CartProvider>
        <div className="min-h-screen" style={{ backgroundColor: '#0FA8D8' }}>
          <main>{children}</main>
        </div>
      </CartProvider>
    )
  }

  // Fallback to Supabase for other tenants
  const tenant = await getTenantBySlug(slug)

  if (!tenant) {
    notFound()
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <main>{children}</main>
      </div>
    </CartProvider>
  )
}

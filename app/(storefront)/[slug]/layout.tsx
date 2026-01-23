import { notFound } from 'next/navigation'
import { getTenantBySlug } from '@/lib/api'
import { CartProvider } from '@/components/storefront/cart-context'
import { LATE_BURGER_TENANT } from '@/lib/mock-data'

export default async function StorefrontLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string } | Promise<{ slug: string }>
}) {
  // Handle params as Promise (Next.js 15+) or object (Next.js 14)
  const resolvedParams = await Promise.resolve(params)
  const slug = resolvedParams.slug

  // DEBUG: Log slug in layout
  console.log('[STOREFRONT LAYOUT]', {
    slug,
    paramsType: typeof params,
  })

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
      <div className="min-h-screen bg-gray-50">
        <main>{children}</main>
      </div>
    </CartProvider>
  )
}

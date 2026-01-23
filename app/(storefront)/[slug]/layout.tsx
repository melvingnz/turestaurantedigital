import { notFound } from 'next/navigation'
import { getTenantBySlug } from '@/lib/api'
import { CartProvider } from '@/components/storefront/cart-context'
import { LATE_BURGER_TENANT } from '@/lib/mock-data'

export default async function StorefrontLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  // TODO: Replace with Supabase fetch when ready
  // For now, use mock data for Late Burger pilot
  const isLateBurger = params.slug === 'lateburger'
  
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
  const tenant = await getTenantBySlug(params.slug)

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

import { notFound } from 'next/navigation'
import { getTenantBySlug } from '@/lib/api'
import { CartProvider } from '@/components/storefront/cart-context'
import { Navbar } from '@/components/storefront/navbar'
import type { Tenant } from '@/types/database'

export default async function StorefrontLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const tenant = await getTenantBySlug(params.slug)

  if (!tenant) {
    notFound()
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar tenant={tenant} />
        <main>{children}</main>
      </div>
    </CartProvider>
  )
}

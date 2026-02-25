import { notFound } from 'next/navigation'
import { getTenantBySlug } from '@/lib/api'
import { getStorefrontDisplayName } from '@/lib/utils'
import { CheckoutForm } from '@/components/storefront/checkout-form'
import { StoreHeader } from '@/components/storefront/store-header'

export default async function CheckoutPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>
}) {
  const { slug } = await Promise.resolve(params)
  const tenant = await getTenantBySlug(slug)
  if (!tenant) notFound()

  const displayName = getStorefrontDisplayName(tenant.name)

  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ '--brand-primary': tenant.brand_color || '#FF5F1F' } as React.CSSProperties}>
      <StoreHeader tenant={tenant} />
      <div className="flex-1">
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-gray-900">{displayName} – Checkout</h1>
          </div>
        </div>
        <CheckoutForm tenant={tenant} />
      </div>
    </div>
  )
}

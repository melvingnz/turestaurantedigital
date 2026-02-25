'use client'

import type { Product, Tenant } from '@/types/database'
import type { RestaurantConfig } from '@/types/storefront'
import { ProductCard } from './product-card'

interface FeaturedProductsProps {
  config: RestaurantConfig
  tenant: Tenant
  onProductClick: (product: Product) => void
}

function toProduct(p: RestaurantConfig['products'][0], tenantId: string): Product {
  return {
    id: p.id,
    tenant_id: tenantId,
    name: p.name,
    description: p.description,
    price: p.price,
    image_url: p.image_url,
    is_available: p.is_available,
    category: p.category,
    created_at: '',
    updated_at: '',
  }
}

export function FeaturedProducts({ config, tenant, onProductClick }: FeaturedProductsProps) {
  const featured = config.products.filter((p) => p.featured && p.is_available)
  if (featured.length === 0) return null

  const products = featured.map((p) => toProduct(p, tenant.id))

  return (
    <section className="py-8 md:py-12 px-4 md:px-6 bg-white border-b border-gray-100">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">🔥 Más vendidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              primaryColor={config.primaryColor}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

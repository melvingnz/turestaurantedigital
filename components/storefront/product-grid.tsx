'use client'

import { Image as ImageIcon } from 'lucide-react'
import type { Product, Tenant } from '@/types/database'
import { ProductCard } from './product-card'

interface ProductGridProps {
  products: Product[]
  tenant: Tenant
  onProductClick: (product: Product) => void
}

export function ProductGrid({ products, tenant, onProductClick }: ProductGridProps) {
  const primaryColor = tenant.brand_color || '#FF5F1F'

  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">No hay productos disponibles</p>
      </div>
    )
  }

  return (
    <div className="grid w-full grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          primaryColor={primaryColor}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  )
}

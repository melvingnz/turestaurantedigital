'use client'

import { Plus, Image as ImageIcon } from 'lucide-react'
import type { Product, Tenant } from '@/types/database'

interface ProductGridProps {
  products: Product[]
  tenant: Tenant
  onProductClick: (product: Product) => void
}

export function ProductGrid({ products, tenant, onProductClick }: ProductGridProps) {
  const primaryColor = tenant.brand_color || '#FF5F1F'
  const secondaryColor = '#FCFF70' // Late Burger secondary (can be made dynamic later)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">No hay productos disponibles</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-4 md:px-6">
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => onProductClick(product)}
          className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 text-left group hover:border-gray-300"
        >
          {/* Image Container */}
          <div className="aspect-square relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-gray-300" />
              </div>
            )}
            
            {/* Add Button Overlay */}
            <div className="absolute bottom-4 right-4">
              <div
                className="h-12 w-12 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                style={{ backgroundColor: primaryColor }}
              >
                <Plus className="h-6 w-6 text-white" />
              </div>
            </div>

            {/* Secondary Color Accent */}
            <div
              className="absolute top-0 left-0 w-full h-1"
              style={{ backgroundColor: secondaryColor }}
            />
          </div>

          {/* Product Info */}
          <div className="p-4 md:p-5">
            <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2 line-clamp-2">
              {product.name}
            </h3>
            
            {product.description && (
              <p className="text-sm md:text-base text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <span
                className="text-xl md:text-2xl font-bold"
                style={{ color: primaryColor }}
              >
                {formatPrice(product.price)}
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

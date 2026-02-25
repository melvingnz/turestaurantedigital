'use client'

import { Plus, Image as ImageIcon } from 'lucide-react'
import type { Product } from '@/types/database'

const SECONDARY_COLOR = '#FCFF70'

interface ProductCardProps {
  product: Product
  primaryColor: string
  onProductClick: (product: Product) => void
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency: 'DOP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

export function ProductCard({ product, primaryColor, onProductClick }: ProductCardProps) {
  return (
    <button
      type="button"
      onClick={() => onProductClick(product)}
      className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 text-left group hover:border-gray-300 w-full"
    >
      <div className="aspect-[4/3] relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="h-12 w-12 text-gray-300" />
          </div>
        )}
        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
          <div
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-105"
            style={{ backgroundColor: primaryColor }}
          >
            <Plus className="h-5 w-5 text-white" />
          </div>
        </div>
        <div
          className="absolute top-0 left-0 w-full h-0.5"
          style={{ backgroundColor: SECONDARY_COLOR }}
        />
      </div>
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
          <span className="text-xl md:text-2xl font-bold" style={{ color: primaryColor }}>
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </button>
  )
}

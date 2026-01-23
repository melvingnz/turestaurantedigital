'use client'

import { Plus, Image as ImageIcon } from 'lucide-react'
import type { Product } from '@/types/database'

// Late Burger Official Brand Colors
const LATE_BURGER_PRIMARY = '#0FA8D8' // Brand Blue
const LATE_BURGER_SECONDARY = '#FCFF70' // Brand Yellow
const LATE_BURGER_BG = '#050505' // Deep Dark Background
const CARD_BG = '#121212' // Premium card background

interface DarkProductGridProps {
  products: Product[]
  onProductClick: (product: Product) => void
}

export function DarkProductGrid({ products, onProductClick }: DarkProductGridProps) {
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
        <ImageIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400 text-lg">No hay productos disponibles</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" id="menu-section">
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => onProductClick(product)}
          className="group relative rounded-2xl overflow-hidden transition-all duration-300 text-left"
          style={{
            backgroundColor: CARD_BG,
            border: '1px solid transparent',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = LATE_BURGER_PRIMARY
            e.currentTarget.style.boxShadow = `0 0 30px ${LATE_BURGER_PRIMARY}50`
            e.currentTarget.style.transform = 'translateY(-4px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'transparent'
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          {/* Image Container - Top Half */}
          <div className="relative w-full h-72 md:h-80 overflow-hidden bg-[#050505]">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-gray-600" />
              </div>
            )}
            
            {/* Add Button Overlay - Brand Blue */}
            <div className="absolute bottom-4 right-4">
              <div
                className="h-14 w-14 rounded-full flex items-center justify-center shadow-xl transition-transform group-hover:scale-110"
                style={{ backgroundColor: LATE_BURGER_PRIMARY }}
              >
                <Plus className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>

          {/* Product Info - Bottom Half */}
          <div className="p-6">
            <h3 className="font-bold text-xl md:text-2xl text-white mb-3 line-clamp-2">
              {product.name}
            </h3>
            
            {product.description && (
              <p className="text-sm md:text-base text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <span
                className="text-2xl md:text-3xl font-bold"
                style={{ color: LATE_BURGER_SECONDARY }}
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

'use client'

import { Plus, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import type { Product } from '@/types/database'

// Late Burger Official Brand Colors
const LATE_BURGER_PRIMARY = '#0FA8D8' // Brand Blue (Background, Buttons & Prices)
const LATE_BURGER_SECONDARY = '#FCFF70' // Brand Yellow (Text & Accents)

interface LateBurgerProductGridProps {
  products: Product[]
  onProductClick: (product: Product) => void
}

export function LateBurgerProductGrid({ products, onProductClick }: LateBurgerProductGridProps) {
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
        <ImageIcon className="h-16 w-16 text-white/60 mx-auto mb-4" />
        <p className="text-white/80 text-lg">No hay productos disponibles</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8" id="menu-section">
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => onProductClick(product)}
          className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 text-left shadow-xl hover:shadow-2xl"
          style={{
            border: '3px solid transparent',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = LATE_BURGER_SECONDARY
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
            e.currentTarget.style.boxShadow = `0 20px 40px ${LATE_BURGER_SECONDARY}40`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'transparent'
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Image Container */}
          <div className="relative w-full h-64 md:h-72 overflow-hidden bg-gray-100">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <ImageIcon className="h-16 w-16 text-gray-400" />
              </div>
            )}
            
            {/* Yellow Accent Bar */}
            <div
              className="absolute top-0 left-0 w-full h-1"
              style={{ backgroundColor: LATE_BURGER_SECONDARY }}
            />
            
            {/* Add Button Overlay - Yellow */}
            <div className="absolute bottom-4 right-4">
              <div
                className="h-14 w-14 rounded-full flex items-center justify-center shadow-xl transition-transform group-hover:scale-110"
                style={{ backgroundColor: LATE_BURGER_SECONDARY }}
              >
                <Plus 
                  className="h-7 w-7"
                  style={{ color: LATE_BURGER_PRIMARY }}
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6 bg-white">
            <h3 
              className="font-bold text-xl md:text-2xl mb-3 line-clamp-2"
              style={{ color: LATE_BURGER_PRIMARY }}
            >
              {product.name}
            </h3>
            
            {product.description && (
              <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <span
                className="text-2xl md:text-3xl font-bold"
                style={{ color: LATE_BURGER_PRIMARY }}
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

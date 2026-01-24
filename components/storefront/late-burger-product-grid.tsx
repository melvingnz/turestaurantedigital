'use client'

import { Plus, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import type { Product } from '@/types/database'

const LATE_BURGER_PRIMARY = '#0FA8D8'
const LATE_BURGER_SECONDARY = '#FCFF70'

interface LateBurgerProductGridProps {
  products: Product[]
  onProductClick: (product: Product) => void
}

export function LateBurgerProductGrid({ products, onProductClick }: LateBurgerProductGridProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)

  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <ImageIcon className="h-16 w-16 text-white/60 mx-auto mb-4" />
        <p className="text-white/80 text-lg">No hay productos disponibles</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => onProductClick(product)}
          className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 text-left shadow-lg hover:shadow-xl active:scale-[0.98] touch-manipulation"
          style={{ border: '2px solid transparent' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = LATE_BURGER_SECONDARY
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.boxShadow = `0 12px 32px ${LATE_BURGER_SECONDARY}30`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'transparent'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = ''
          }}
        >
          <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <ImageIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
              </div>
            )}
            <div
              className="absolute top-0 left-0 w-full h-1"
              style={{ backgroundColor: LATE_BURGER_SECONDARY }}
            />
            <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4">
              <div
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full flex items-center justify-center shadow-xl transition-transform group-hover:scale-110 group-active:scale-95"
                style={{ backgroundColor: LATE_BURGER_SECONDARY }}
              >
                <Plus className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" style={{ color: LATE_BURGER_PRIMARY }} />
              </div>
            </div>
          </div>
          <div className="p-3 sm:p-4 md:p-6 bg-white">
            <h3
              className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl mb-1 sm:mb-2 md:mb-3 line-clamp-2"
              style={{ color: LATE_BURGER_PRIMARY }}
            >
              {product.name}
            </h3>
            {product.description && (
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3 md:mb-4 line-clamp-2 leading-relaxed hidden sm:block">
                {product.description}
              </p>
            )}
            <div className="flex items-center justify-between">
              <span
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold"
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

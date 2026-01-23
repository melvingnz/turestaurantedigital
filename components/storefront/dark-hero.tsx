'use client'

import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'
import type { Product } from '@/types/database'

// Late Burger Official Brand Colors
const LATE_BURGER_PRIMARY = '#0FA8D8' // Brand Blue
const LATE_BURGER_BG = '#050505' // Deep Dark Background

interface DarkHeroProps {
  product: Product
}

export function DarkHero({ product }: DarkHeroProps) {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Glow Effect */}
      <div className="absolute inset-0">
        {product.image_url ? (
          <>
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Azul Glow behind burger */}
            <div
              className="absolute inset-0 opacity-30 blur-3xl"
              style={{
                background: `radial-gradient(circle at center, ${LATE_BURGER_PRIMARY} 0%, transparent 70%)`,
              }}
            />
          </>
        ) : (
          <div className="w-full h-full bg-[#050505]" />
        )}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/95 via-[#050505]/85 to-[#050505]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl tracking-tight">
          Special Tasty Burger.
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
          Hamburguesas que hacen historia. Ingredientes premium en cada bocado.
        </p>
        <Button
          size="lg"
          className="h-16 px-10 text-xl font-bold text-white hover:opacity-90 transition-opacity shadow-2xl rounded-full"
          style={{ backgroundColor: LATE_BURGER_PRIMARY }}
          onClick={() => {
            document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          Ver Menú
          <ArrowDown className="ml-3 h-6 w-6" />
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}

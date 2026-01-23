'use client'

import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'
import type { Product } from '@/types/database'

// Late Burger Official Brand Colors
const LATE_BURGER_PRIMARY = '#0FA8D8' // Brand Blue
const LATE_BURGER_SECONDARY = '#FCFF70' // Brand Yellow

interface LateBurgerHeroProps {
  product: Product
}

export function LateBurgerHero({ product }: LateBurgerHeroProps) {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Vibrant Blue Background with Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: LATE_BURGER_PRIMARY,
        }}
      >
        {/* Decorative Pattern (like "TAMO' AQUI!!" banner) */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Burger Image Overlay */}
        {product.image_url && (
          <div className="absolute inset-0">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover opacity-20"
            />
            {/* Yellow glow effect */}
            <div
              className="absolute inset-0 opacity-30 blur-3xl"
              style={{
                background: `radial-gradient(circle at center, ${LATE_BURGER_SECONDARY} 0%, transparent 70%)`,
              }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 drop-shadow-2xl tracking-tight"
          style={{ color: LATE_BURGER_SECONDARY }}
        >
          Special Tasty Burger.
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white mb-10 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg">
          Hamburguesas que hacen historia. Ingredientes premium en cada bocado.
        </p>
        <Button
          size="lg"
          className="h-16 px-10 text-xl font-bold hover:opacity-90 transition-opacity shadow-2xl rounded-full"
          style={{ 
            backgroundColor: LATE_BURGER_SECONDARY,
            color: LATE_BURGER_PRIMARY,
          }}
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
        <div 
          className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2"
          style={{ borderColor: LATE_BURGER_SECONDARY + '80' }}
        >
          <div 
            className="w-1 h-3 rounded-full"
            style={{ backgroundColor: LATE_BURGER_SECONDARY }}
          />
        </div>
      </div>
    </section>
  )
}

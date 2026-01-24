'use client'

import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'
import Image from 'next/image'
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
      {/* Banner Background */}
      <div className="absolute inset-0 z-0">
        {/* Banner Image - Sin overlays para mostrar el banner completo */}
        <Image
          src="/images/Banner_Pidebot_x3.jpg"
          alt="Late Burger Banner"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* Content - Ver Menú sticky at bottom of hero, smooth scroll to categories */}
      <div className="absolute bottom-20 sm:bottom-24 md:bottom-32 left-0 right-0 z-10 container mx-auto px-4 md:px-6 text-center">
        <Button
          type="button"
          size="lg"
          className="h-14 sm:h-16 px-8 sm:px-10 text-lg sm:text-xl font-bold hover:opacity-90 active:scale-95 transition-all shadow-2xl rounded-full relative z-10 touch-manipulation"
          style={{ 
            backgroundColor: LATE_BURGER_SECONDARY,
            color: LATE_BURGER_PRIMARY,
            position: 'relative',
            zIndex: 10,
            touchAction: 'manipulation',
          }}
          onClick={() => {
            requestAnimationFrame(() => {
              const el = document.getElementById('menu-section')
              el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            })
          }}
        >
          Ver Menú
          <ArrowDown className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
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

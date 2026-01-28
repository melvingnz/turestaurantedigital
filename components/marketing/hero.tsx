'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { HeroMockup } from './hero-mockup'
import Link from 'next/link'
import { getStorefrontUrl } from '@/lib/utils'

export function Hero() {
  const lateBurgerUrl = getStorefrontUrl('lateburger')

  return (
    <section className="w-full bg-white py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-[6fr_4fr] gap-4 sm:gap-6 lg:gap-8 items-center">
          {/* Text: first on mobile, centered; ≤60% width on desktop */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-6 w-full max-w-2xl mx-auto lg:mx-0 order-1 lg:order-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1A1A1A] leading-tight tracking-tight">
              La experiencia{' '}
              <span className="text-[#FF6B00]">digital completa</span>{' '}
              para tu restaurante.
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#1A1A1A]/70 leading-snug sm:leading-relaxed">
              Brinda a tus clientes un portal web premium para ordenar como ellos prefieran: para comer aquí, para llevar o a domicilio.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 justify-center lg:justify-start">
              <Link href="#pricing" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white rounded-lg px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 text-sm sm:text-base font-semibold touch-manipulation"
                >
                  Ver Planes
                </Button>
              </Link>
              <a href={lateBurgerUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-white border-[#E5E5E5] hover:bg-[#FAFAFA] rounded-lg px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 text-sm sm:text-base font-semibold touch-manipulation"
                >
                  <ArrowRight className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                  Ver Menú de Ejemplo
                </Button>
              </a>
            </div>
          </div>

          {/* Mockup: second on mobile */}
          <div className="relative w-full max-w-full flex items-center justify-center lg:justify-end mt-1 sm:mt-2 md:mt-4 lg:mt-0 order-2 lg:order-2 overflow-hidden">
            <HeroMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

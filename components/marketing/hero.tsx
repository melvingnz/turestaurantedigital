import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { HeroMockup } from './hero-mockup'

export function Hero() {
  return (
    <section className="w-full bg-white py-12 sm:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              La experiencia{' '}
              <span className="text-[#FF5F1F]">digital completa</span>{' '}
              para tu restaurante.
            </h1>
            
            <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Brinda a tus clientes un portal web premium para ordenar como ellos prefieran: para comer aquí, para llevar o a domicilio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-[#FF5F1F] hover:opacity-90 text-white rounded-md px-8 py-6 text-base font-semibold"
              >
                Ver Planes
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white border-gray-300 hover:bg-gray-50 rounded-md px-8 py-6 text-base font-semibold"
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                Ver Menú de Ejemplo
              </Button>
            </div>
          </div>

          {/* Right Column: Floating Mockup */}
          <div className="relative flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
            <HeroMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

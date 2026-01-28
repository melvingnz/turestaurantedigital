'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Headphones, Smartphone, Monitor, Laptop } from 'lucide-react'

const features = [
  {
    icon: Headphones,
    title: 'Soporte local de onboarding',
    description:
      'Nuestro equipo te ayuda con la configuración del menú, dominio personalizado y buenas prácticas. Cero fricción para que empieces a vender desde el día uno.',
  },
  {
    icon: () => (
      <span className="flex items-center justify-center gap-1">
        <Smartphone className="h-5 w-5 sm:h-6 sm:w-6" />
        <Monitor className="h-5 w-5 sm:h-6 sm:w-6" />
        <Laptop className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>
    ),
    title: 'Compatible con cualquier dispositivo',
    description:
      'Funciona en tablet, laptop o smartphone. No necesitas hardware especial ni costos extra: usa lo que ya tienes.',
  },
]

export function ZeroFriction() {
  return (
    <section className="w-full bg-[#FFFFFF] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-3 sm:mb-4 leading-tight">
            Cero fricción:{' '}
            <span className="text-[#FF6B00]">soporte y hardware</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#1A1A1A]/70 max-w-2xl mx-auto leading-snug sm:leading-relaxed">
            Onboarding guiado y flexibilidad total. Sin sorpresas ni inversiones extra.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {features.map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className="p-6 sm:p-8 bg-white border-2 border-[#FF6B00]/30 rounded-lg hover:border-[#FF6B00]/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00]">
                    <Icon />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#1A1A1A]/70 leading-snug sm:leading-relaxed break-words">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

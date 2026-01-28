'use client'

import React from 'react'
import { Monitor, MessageCircle, BarChart3 } from 'lucide-react'
import { Card } from '@/components/ui/card'

const features = [
  {
    icon: Monitor,
    title: '⚡ Cocina en Tiempo Real (KDS)',
    description:
      'Los pedidos llegan directo a la pantalla de cocina. Cero tickets de papel, prioridad clara y menos errores.',
  },
  {
    icon: MessageCircle,
    title: '💎 Integración WhatsApp',
    description:
      'Ordena desde el canal que ya usan tus clientes. Pedidos confirmados en el sistema al instante, sin apps intermedias.',
  },
  {
    icon: BarChart3,
    title: '📈 Analíticas en Tiempo Real',
    description:
      'Platos más vendidos, horas pico y tendencias en un dashboard claro. Decisiones basadas en datos, no en intuición.',
  },
]

export function Features() {
  return (
    <section id="features" className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-3 sm:mb-4 leading-tight">
            Todo lo que necesitas para{' '}
            <span className="text-[#FF6B00]">digitalizar tu restaurante</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#1A1A1A]/70 max-w-2xl mx-auto leading-snug sm:leading-relaxed">
            Herramientas poderosas diseñadas para restaurantes que quieren crecer sin límites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="p-4 sm:p-5 md:p-6 lg:p-8 hover:shadow-lg transition-all duration-300 hover:border-[#FF6B00]/20 border-[#E5E5E5]"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 items-center sm:items-start text-center sm:text-left">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-[#FF6B00]/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-5 w-5 md:h-6 md:w-6 text-[#FF6B00]" />
                  </div>
                  <div className="flex-1 min-w-0 w-full">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#1A1A1A] mb-1.5 sm:mb-2 leading-tight">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-[#1A1A1A]/70 leading-snug sm:leading-relaxed break-words">{feature.description}</p>
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

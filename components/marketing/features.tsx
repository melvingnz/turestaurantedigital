'use client'

import React from 'react'
import { DollarSign, QrCode, Monitor, Store } from 'lucide-react'
import { Card } from '@/components/ui/card'

const features = [
  {
    icon: DollarSign,
    title: 'Sin Comisiones por Orden',
    description: 'Deja de pagar el 30% a las apps de delivery. Tus ganancias son tuyas.',
  },
  {
    icon: QrCode,
    title: 'Menú Digital QR',
    description: 'Actualiza precios y disponibilidad al instante. Adiós a las reimpresiones.',
  },
  {
    icon: Monitor,
    title: 'Cocina en Tiempo Real (KDS)',
    description: 'Los pedidos llegan directo a la pantalla de cocina. Sin tickets de papel.',
  },
  {
    icon: Store,
    title: 'Tu Propia Marca',
    description: 'Tu logo, tus colores, tu dominio. Una experiencia 100% tuya.',
  },
]

export function Features() {
  return (
    <section id="features" className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Todo lo que necesitas para{' '}
            <span className="text-[#FF5F1F]">digitalizar tu restaurante</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-snug sm:leading-relaxed">
            Herramientas poderosas diseñadas para restaurantes que quieren crecer sin límites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="p-4 sm:p-5 md:p-6 lg:p-8 hover:shadow-lg transition-all duration-300 hover:border-[#FF5F1F]/20 border-gray-200"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-[#FF5F1F]/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-5 w-5 md:h-6 md:w-6 text-[#FF5F1F]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 leading-tight">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-snug sm:leading-relaxed">{feature.description}</p>
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

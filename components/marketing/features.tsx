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
    <section className="w-full bg-white py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Todo lo que necesitas para{' '}
            <span className="text-[#FF5F1F]">digitalizar tu restaurante</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Herramientas poderosas diseñadas para restaurantes que quieren crecer sin límites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="p-6 lg:p-8 hover:shadow-lg transition-all duration-300 hover:border-[#FF5F1F]/20 border-gray-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FF5F1F]/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-[#FF5F1F]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
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

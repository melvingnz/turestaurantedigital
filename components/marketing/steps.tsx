import React from 'react'
import { UserPlus, Upload, Share2 } from 'lucide-react'

const steps = [
  {
    number: '1',
    icon: UserPlus,
    title: 'Regístrate',
    description: 'Crea tu cuenta de propietario en segundos.',
  },
  {
    number: '2',
    icon: Upload,
    title: 'Sube tu Menú',
    description: 'Sube tu logo, define tus colores y carga tu menú. El sistema se adapta a ti.',
  },
  {
    number: '3',
    icon: Share2,
    title: 'Empieza a Vender',
    description: 'Comparte tu link o QR y gestiona las órdenes desde tu Panel.',
  },
]

export function Steps() {
  return (
    <section className="w-full bg-gray-50 py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Comienza en <span className="text-[#FF5F1F]">3 pasos simples</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            No necesitas conocimientos técnicos. Estarás listo en minutos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-[#FF5F1F] rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-[#FF5F1F] rounded-full flex items-center justify-center">
                    <span className="text-[#FF5F1F] font-bold text-lg">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

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
    <section className="w-full bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-3 sm:mb-4 leading-tight">
            Comienza en <span className="text-[#FF6B00]">3 pasos simples</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#1A1A1A]/70 max-w-2xl mx-auto leading-snug sm:leading-relaxed">
            No necesitas conocimientos técnicos. Estarás listo en minutos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-10 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="text-center flex flex-col items-center">
                <div className="relative mb-4 sm:mb-5 md:mb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto bg-[#FF6B00] rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white border-2 border-[#FF6B00] rounded-full flex items-center justify-center">
                    <span className="text-[#FF6B00] font-bold text-xs sm:text-sm md:text-lg">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#1A1A1A] mb-1.5 sm:mb-2 leading-tight">{step.title}</h3>
                <p className="text-sm sm:text-base text-[#1A1A1A]/70 leading-snug sm:leading-relaxed max-w-sm mx-auto md:mx-0">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

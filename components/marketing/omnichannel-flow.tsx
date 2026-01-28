'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { MessageCircle, ShoppingBag, Monitor, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: MessageCircle,
    title: 'Tu cliente navega el menú',
    description: 'En Instagram, WhatsApp o tu enlace. Todo en un solo lugar, sin app externa.',
  },
  {
    icon: ShoppingBag,
    title: 'Hace el pedido desde el menú digital',
    description: 'Ordena para comer aquí, para llevar o a domicilio. Pago y datos quedan en tu sistema.',
  },
  {
    icon: Monitor,
    title: 'Llega al instante a tu KDS',
    description: 'La cocina recibe el pedido en la pantalla. Cero tickets, cero errores.',
  },
]

export function OmnichannelFlow() {
  return (
    <section className="w-full bg-[#F5F5F5] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-3 sm:mb-4 leading-tight">
            Flujo omnicanal{' '}
            <span className="text-[#FF6B00]">WhatsApp e Instagram</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#1A1A1A]/70 max-w-2xl mx-auto leading-snug sm:leading-relaxed">
            Del menú en redes al KDS en segundos. Sin intermediarios ni comisiones.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-stretch md:justify-center md:gap-4 lg:gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isLast = index === steps.length - 1
            return (
              <React.Fragment key={index}>
                <Card className="flex-1 min-w-0 md:max-w-[300px] p-6 sm:p-8 bg-white border border-[#E5E5E5] hover:border-[#FF6B00]/30 transition-colors">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4 sm:mb-5">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center bg-[#FF6B00] text-white">
                        <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                      </div>
                      <span
                        className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-[#FF6B00] flex items-center justify-center text-[#FF6B00] font-bold text-sm"
                        aria-hidden
                      >
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#1A1A1A]/70 leading-snug">
                      {step.description}
                    </p>
                  </div>
                </Card>
                {!isLast && (
                  <div className="hidden md:flex items-center justify-center px-1 shrink-0">
                    <ArrowRight className="h-6 w-6 text-[#FF6B00]" aria-hidden />
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}

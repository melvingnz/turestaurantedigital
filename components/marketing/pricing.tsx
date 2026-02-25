import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Inicios',
    price: 'Gratis',
    description: 'Perfecto para empezar',
    features: [
      'Menú Digital',
      'Vistas ilimitadas',
      'Código QR',
    ],
    cta: 'Comenzar Gratis',
    popular: false,
  },
  {
    name: 'Pro',
    price: 'US$ 60',
    period: '/mes',
    description: 'Para restaurantes que quieren crecer',
    features: [
      'Todo en Inicios',
      'Actualización de precios',
      'Pedidos Ilimitados',
      'KDS (Pantalla de Cocina)',
      'Integración WhatsApp',
      'Analytics y Reportes',
      'Soporte Prioritario',
    ],
    cta: 'Empezar Ahora',
    popular: true,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-3 sm:mb-4 leading-tight">
            Planes <span className="text-[#FF6B00]">simples y transparentes</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#1A1A1A]/70 max-w-2xl mx-auto leading-snug sm:leading-relaxed">
            Sin comisiones ocultas. Sin sorpresas. Solo precios claros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative p-5 sm:p-6 md:p-7 lg:p-8 ${
                plan.popular
                  ? 'border-2 border-[#FF6B00] shadow-xl md:scale-105'
                  : 'border-[#E5E5E5]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-[#FF6B00] text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-0.5 sm:py-1 rounded-full">
                    Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-5 sm:mb-6 md:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] mb-1.5 sm:mb-2 leading-tight">{plan.name}</h3>
                <p className="text-xs sm:text-sm text-[#1A1A1A]/70 mb-3 sm:mb-4 leading-snug break-words">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A]">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-500 text-sm sm:text-base">{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 mb-5 sm:mb-6 md:mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#1A1A1A]/70 leading-snug break-words">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/marketing/signup">
                <Button
                  className={`w-full text-xs sm:text-sm h-9 sm:h-10 md:h-11 ${
                    plan.popular
                      ? 'bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white'
                      : 'bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white'
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

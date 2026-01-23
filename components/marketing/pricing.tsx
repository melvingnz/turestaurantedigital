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
      'Actualización de precios',
    ],
    cta: 'Comenzar Gratis',
    popular: false,
  },
  {
    name: 'Pro',
    price: 'RD$ 2,500',
    period: '/mes',
    description: 'Para restaurantes que quieren crecer',
    features: [
      'Todo en Inicios',
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
    <section className="w-full bg-white py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Planes <span className="text-[#FF5F1F]">simples y transparentes</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Sin comisiones ocultas. Sin sorpresas. Solo precios claros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative p-8 ${
                plan.popular
                  ? 'border-2 border-[#FF5F1F] shadow-xl scale-105'
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-[#FF5F1F] text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl lg:text-5xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-500 text-lg">{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#FF5F1F] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/signup">
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-[#FF5F1F] hover:bg-[#FF5F1F]/90 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
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

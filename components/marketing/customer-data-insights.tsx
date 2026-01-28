'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Database, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Database,
    title: 'Tus datos son tuyos',
    description:
      'A diferencia de las apps de delivery, conservas la información de tus clientes. Úsala para programas de fidelidad, promociones y comunicación directa.',
  },
  {
    icon: BarChart3,
    title: 'Analíticas inteligentes',
    description:
      'Platos más vendidos, horas pico y tendencias en un dashboard sencillo. Toma mejores decisiones con datos claros y en tiempo real.',
  },
]

export function CustomerDataInsights() {
  return (
    <section className="w-full bg-[#F5F5F5] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-3 sm:mb-4 leading-tight">
            Datos y perspectivas{' '}
            <span className="text-[#FF6B00]">bajo tu control</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#1A1A1A]/70 max-w-2xl mx-auto leading-snug sm:leading-relaxed">
            Información que las apps no te dan. Todo en tu panel, sin intermediarios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {features.map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className="p-6 sm:p-8 bg-white border border-[#E5E5E5] rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#FF6B00] flex items-center justify-center text-white">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
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

        <div className="mt-10 sm:mt-12 text-center">
          <Link href="#pricing">
            <Button className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold h-12 px-8 rounded-lg">
              Ver planes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

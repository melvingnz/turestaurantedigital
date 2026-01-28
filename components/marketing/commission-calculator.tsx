'use client'

import React, { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Calculator } from 'lucide-react'
import Link from 'next/link'

const COMMISSION_RATE = 0.3

export function CommissionCalculator() {
  const [orders, setOrders] = useState<string>('')
  const [avgValue, setAvgValue] = useState<string>('')

  const ordersNum = parseInt(orders, 10) || 0
  const avgNum = parseInt(avgValue.replace(/\D/g, ''), 10) || 0
  const monthlyRevenue = ordersNum * avgNum
  const savings = Math.round(monthlyRevenue * COMMISSION_RATE)

  const handleCalculate = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const el = document.getElementById('calculator-result')
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [])

  return (
    <section className="w-full bg-[#FFFFFF] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-3 sm:mb-4 leading-tight">
            ¿Cuánto podrías{' '}
            <span className="text-[#FF6B00]">ahorrar</span> cada mes?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#1A1A1A]/70 max-w-2xl mx-auto leading-snug sm:leading-relaxed">
            Las apps de delivery cobran hasta 30% por orden. Con Tu Restaurante Digital, esas comisiones son tuyas.
          </p>
        </div>

        <Card className="p-6 sm:p-8 md:p-10 border border-[#E5E5E5] bg-white shadow-sm">
          <form onSubmit={handleCalculate} className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="orders" className="text-[#1A1A1A] font-medium">
                  Pedidos de delivery al mes
                </Label>
                <Input
                  id="orders"
                  type="number"
                  min={0}
                  placeholder="ej. 150"
                  value={orders}
                  onChange={(e) => setOrders(e.target.value)}
                  className="border-[#E5E5E5] bg-white text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 h-12 focus-visible:ring-[#FF6B00] focus-visible:border-[#FF6B00]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avg" className="text-[#1A1A1A] font-medium">
                  Ticket promedio (RD$)
                </Label>
                <Input
                  id="avg"
                  type="text"
                  inputMode="numeric"
                  placeholder="ej. 450"
                  value={avgValue}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, '')
                    setAvgValue(v)
                  }}
                  className="border-[#E5E5E5] bg-white text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 h-12 focus-visible:ring-[#FF6B00] focus-visible:border-[#FF6B00]"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <Button
                type="submit"
                className="w-full sm:w-auto bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold h-12 px-8 rounded-lg transition-colors"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calcular ahorro
              </Button>
              <Link href="#pricing" className="w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto border-[#E5E5E5] text-[#1A1A1A] hover:bg-[#F5F5F5] h-12 px-8 rounded-lg"
                >
                  Ver planes
                </Button>
              </Link>
            </div>
          </form>

          <div
            id="calculator-result"
            className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#E5E5E5]"
          >
            {savings > 0 ? (
              <p className="text-center sm:text-left text-lg sm:text-xl md:text-2xl font-bold text-[#1A1A1A] leading-snug">
                Con Tu Restaurante Digital podrías ahorrar aproximadamente{' '}
                <span className="text-[#FF6B00]">
                  RD$ {savings.toLocaleString('es-DO')}
                </span>{' '}
                al mes.
              </p>
            ) : (
              <p className="text-center sm:text-left text-base sm:text-lg text-[#1A1A1A]/60">
                Ingresa tus pedidos mensuales y ticket promedio para ver tu ahorro estimado.
              </p>
            )}
          </div>
        </Card>
      </div>
    </section>
  )
}

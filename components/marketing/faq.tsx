'use client'

import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: '¿Necesito tarjeta de crédito?',
    answer:
      'No. Puedes comenzar con el plan Inicios completamente gratis sin necesidad de tarjeta de crédito. Solo necesitas crear tu cuenta y empezar a usar la plataforma.',
  },
  {
    question: '¿Cobran comisión por orden?',
    answer:
      'No. No cobramos comisiones por orden. Solo pagas una suscripción mensual fija. Esto significa que puedes recibir todas las órdenes que quieras sin pagar comisiones adicionales.',
  },
  {
    question: '¿Qué URL tendrá mi menú?',
    answer:
      'Cada restaurante tiene su propia URL como subdominio: [turestaurante].turestaurantedigital.com. Por ejemplo: lateburger.turestaurantedigital.com. No necesitas configurar dominios ni DNS; queda listo al registrarte.',
  },
  {
    question: '¿Puedo cambiar de plan después?',
    answer:
      'Sí. Puedes pasar de Inicios (gratis) a Pro en cualquier momento desde tu panel. Si en el futuro quieres volver al plan gratuito, puedes hacerlo; tus datos se conservan.',
  },
  {
    question: '¿Cómo funciona el menú digital y el código QR?',
    answer:
      'Creas tu menú en el panel, subes fotos y precios, y la plataforma genera un enlace único para tu restaurante. Descargas el código QR y lo imprimes o lo muestras en pantalla; tus clientes escanean y ven el menú al instante en el celular.',
  },
  {
    question: '¿Qué incluye la integración con WhatsApp?',
    answer:
      'En el plan Pro, las órdenes pueden notificarse por WhatsApp para que las reciban directamente en tu número o en un grupo. Así gestionas pedidos sin depender solo de la pantalla de la cocina.',
  },
  {
    question: '¿Hay límite de productos en el menú?',
    answer:
      'En el plan Inicios puedes publicar tu menú con los platos que necesites. En Pro no hay límite de productos ni de categorías; puedes tener entradas, platos fuertes, bebidas, postres y modificadores.',
  },
  {
    question: '¿Cómo actualizo precios o platos?',
    answer:
      'Entras a tu panel, vas a Menú, y editas el producto (nombre, precio, descripción, foto). Los cambios se ven de inmediato en el menú que ven tus clientes. No hace falta avisar ni esperar.',
  },
  {
    question: '¿Qué es el KDS (Pantalla de Cocina)?',
    answer:
      'Es la pantalla donde llegan los pedidos en tiempo real en el plan Pro. La cocina ve cada orden con ítems, notas y estado (nuevo, en preparación, listo), sin necesidad de imprimir tickets.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="w-full bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-3 sm:mb-4 leading-tight">
            Preguntas <span className="text-[#FF6B00]">Frecuentes</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-snug sm:leading-relaxed">
            Todo lo que necesitas saber sobre nuestra plataforma.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" defaultValue="0" className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={index.toString()} className="border-[#E5E5E5] rounded-xl overflow-hidden bg-white shadow-sm">
                <AccordionTrigger value={index.toString()} className="px-4 py-4 sm:px-5 sm:py-5 min-h-[56px] sm:min-h-[60px] hover:bg-[#FFF7F2] data-[state=open]:bg-[#FFF7F2] text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent value={index.toString()} className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 text-[#1A1A1A]/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

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
    question: '¿Puedo usar mi propio dominio?',
    answer:
      'Sí. En el plan Pro puedes conectar tu propio dominio personalizado. Esto te permite tener una URL como "ordenar.turestaurante.com" en lugar de usar nuestra URL predeterminada.',
  },
]

export function FAQ() {
  return (
    <section className="w-full bg-gray-50 py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Preguntas <span className="text-[#FF5F1F]">frecuentes</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Todo lo que necesitas saber sobre nuestra plataforma.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" defaultValue="0">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={index.toString()}>
                <AccordionTrigger value={index.toString()}>{faq.question}</AccordionTrigger>
                <AccordionContent value={index.toString()}>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

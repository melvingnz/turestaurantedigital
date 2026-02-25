'use client'

import type { RestaurantConfig } from '@/types/storefront'

interface CTASectionProps {
  config: RestaurantConfig
}

function buildWhatsAppLink(phone: string, restaurantName: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const number = cleaned.startsWith('1') ? cleaned : `1${cleaned}`
  const message = encodeURIComponent(`Hola, me gustaría hacer un pedido de ${restaurantName}.`)
  return `https://wa.me/${number}?text=${message}`
}

export function CTASection({ config }: CTASectionProps) {
  const hasWhatsApp = Boolean(config.whatsappNumber?.trim())
  const hasReservation = Boolean(config.reservationUrl?.trim())
  if (!hasWhatsApp && !hasReservation) return null

  return (
    <section className="py-10 md:py-14 px-4 md:px-6 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto max-w-2xl text-center">
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">¿Listo para ordenar?</h2>
          <p className="text-gray-600 mb-6">Elige tu opción preferida</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {hasWhatsApp && (
              <a
                href={buildWhatsAppLink(config.whatsappNumber!, config.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#25D366' }}
              >
                Ordenar por WhatsApp
              </a>
            )}
            {hasReservation && (
              <a
                href={config.reservationUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border-2 hover:bg-gray-50 transition-colors"
                style={{ borderColor: config.primaryColor, color: config.primaryColor }}
              >
                Reservar
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

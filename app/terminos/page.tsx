import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Tu Restaurante Digital',
  description: 'Términos y condiciones de uso del servicio.',
}

const LAST_UPDATED = '2025-01-01'

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 mb-6 inline-block">
          ← Volver
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Términos y Condiciones</h1>
        <p className="text-sm text-gray-500 mb-8">Última actualización: {LAST_UPDATED}</p>

        <div className="space-y-6 text-gray-700 text-sm md:text-base">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Aceptación</h2>
            <p>El uso de esta plataforma implica la aceptación de los presentes términos. Si no está de acuerdo, no utilice el servicio.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Uso del servicio</h2>
            <p>El servicio está destinado a la visualización de menús y realización de pedidos. Debe usar el servicio de forma lícita y respetuosa.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Pedidos y pagos</h2>
            <p>Los pedidos están sujetos a la disponibilidad y políticas del restaurante. Las formas de pago y entrega son definidas por cada establecimiento.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Contacto</h2>
            <p>Para consultas sobre estos términos, contacte a través de la página de contacto o el canal indicado por su restaurante.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

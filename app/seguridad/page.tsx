import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagos seguros | Tu Restaurante Digital',
  description: 'Información sobre seguridad y pagos.',
}

const LAST_UPDATED = '2025-01-01'

export default function SeguridadPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 mb-6 inline-block">
          ← Volver
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Pagos seguros</h1>
        <p className="text-sm text-gray-500 mb-8">Última actualización: {LAST_UPDATED}</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700 text-sm md:text-base">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Compromiso de seguridad</h2>
            <p>Nos comprometemos a aplicar medidas técnicas y organizativas adecuadas para proteger sus datos y, cuando corresponda, los procesos de pago asociados al servicio.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Formas de pago</h2>
            <p>Las opciones de pago (efectivo, tarjeta, transferencia, etc.) dependen de cada restaurante. Cuando se ofrezcan pagos en línea, se utilizarán pasarelas que cumplan estándares de seguridad aplicables.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Dudas</h2>
            <p>Para consultas sobre métodos de pago o seguridad, contacte directamente al restaurante o a través de los canales de soporte indicados.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

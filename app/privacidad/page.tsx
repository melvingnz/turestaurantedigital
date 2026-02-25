import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Tu Restaurante Digital',
  description: 'Política de privacidad y tratamiento de datos.',
}

const LAST_UPDATED = '2025-01-01'

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 mb-6 inline-block">
          ← Volver
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Política de Privacidad</h1>
        <p className="text-sm text-gray-500 mb-8">Última actualización: {LAST_UPDATED}</p>

        <div className="space-y-6 text-gray-700 text-sm md:text-base">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Responsable</h2>
            <p>Los datos recogidos son gestionados por el restaurante y por Tu Restaurante Digital según el propósito del tratamiento.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Datos que recogemos</h2>
            <p>Podemos recoger nombre, teléfono, dirección y datos de pedidos. No vendemos sus datos personales.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Finalidad</h2>
            <p>Los datos se utilizan para gestionar pedidos y atención al cliente. Se conservan el tiempo necesario o lo que exija la ley.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Derechos</h2>
            <p>Puede ejercer derechos de acceso, rectificación, supresión y oposición contactando al restaurante o los canales indicados.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

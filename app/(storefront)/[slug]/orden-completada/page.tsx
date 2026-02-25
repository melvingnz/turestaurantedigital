import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTenantBySlug } from '@/lib/api'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function OrdenCompletadaPage({
  params,
  searchParams,
}: {
  params: { slug: string } | Promise<{ slug: string }>
  searchParams: { order?: string } | Promise<{ order?: string }>
}) {
  const { slug } = await Promise.resolve(params)
  const { order: orderId } = await Promise.resolve(searchParams)
  const tenant = await getTenantBySlug(slug)
  if (!tenant) notFound()

  const primaryColor = tenant.brand_color || '#FF5F1F'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <CheckCircle
            className="h-24 w-24 mx-auto animate-bounce"
            style={{ color: primaryColor }}
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ¡Pedido Realizado!
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Gracias por tu pedido. Te contactaremos pronto para confirmar los detalles.
        </p>
        {orderId && (
          <p className="text-sm text-gray-500 mb-8">
            N.º de pedido: <span className="font-mono">{orderId.slice(0, 8)}…</span>
          </p>
        )}
        {!orderId && <div className="mb-8" />}
        <Link href={`/${slug}`}>
          <Button
            className="h-12 px-8 text-lg font-semibold text-white"
            style={{ backgroundColor: primaryColor }}
          >
            Continuar Comprando
          </Button>
        </Link>
      </div>
    </div>
  )
}

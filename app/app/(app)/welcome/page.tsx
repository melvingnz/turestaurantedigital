import { getAuthTenant } from '@/lib/auth'
import { getStorefrontUrl } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle2, ExternalLink, LayoutDashboard } from 'lucide-react'
import type { Tenant } from '@/types/database'

export const metadata = {
  title: 'Bienvenido | Tu Restaurante Digital',
  description: 'Onboarding completado. Tu menú ya está listo.',
}

export default async function WelcomePage() {
  const tenant = await getAuthTenant()
  if (!tenant || typeof tenant !== 'object' || !('slug' in tenant)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <p className="text-[#1A1A1A]/70">No se encontró tu restaurante. Ve al Dashboard.</p>
        <Button asChild className="mt-4 bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white">
          <Link href="/app/dashboard">Ir al Dashboard</Link>
        </Button>
      </div>
    )
  }

  const validTenant = tenant as unknown as Tenant
  const hasCustomDomain = !!validTenant.has_custom_domain
  const slug = validTenant.slug
  const storefrontUrl = getStorefrontUrl(slug)

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <Card className="w-full max-w-lg p-8 sm:p-10 border border-[#E5E5E5] shadow-sm bg-white">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-[#FF6B00]/10 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-[#FF6B00]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-2">
              ¡Bienvenido, {validTenant.name}!
            </h1>
            <p className="text-[#1A1A1A]/70 text-sm sm:text-base leading-relaxed">
              {hasCustomDomain ? (
                <>
                  Tienes dominio propio. Nos pondremos en contacto contigo para configurarlo.
                  Mientras tanto, tu menú ya está disponible en:
                </>
              ) : (
                <>
                  Te hemos configurado tu subdominio automáticamente. Tu menú ya está disponible
                  y puedes compartirlo con tus clientes.
                </>
              )}
            </p>
          </div>

          <div className="w-full rounded-xl bg-[#FFF7F2] border border-[#FF6B00]/20 p-4 text-left">
            <p className="text-xs font-medium text-[#1A1A1A]/60 mb-1">URL de tu menú</p>
            <a
              href={storefrontUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#FF6B00] font-semibold hover:underline break-all"
            >
              {slug}.turestaurantedigital.com
              <ExternalLink className="h-4 w-4 shrink-0" />
            </a>
            <p className="text-xs text-[#1A1A1A]/50 mt-2">
              Añade productos en Menú, personaliza en Configuración y recibe pedidos en tiempo real.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              asChild
              className="w-full sm:w-auto bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold h-12 px-6"
            >
              <Link href="/app/dashboard" className="inline-flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5" />
                Ir al Dashboard
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto border-[#E5E5E5] text-[#1A1A1A] hover:bg-[#FAFAFA] h-12 px-6"
            >
              <a href={storefrontUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                <ExternalLink className="h-4 w-5" />
                Ver mi menú
              </a>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { ImageUpload } from '@/components/ui/image-upload'
import { getCurrentTenant, updateTenant } from '@/app/actions/tenant'
import { uploadLogo, uploadBanner, deleteOldLogo } from '@/app/actions/storage'
import { sendWelcomeEmailAfterOnboarding } from '@/app/actions/send-welcome-email'
import { Loader2, LayoutDashboard, CheckCircle2 } from 'lucide-react'

const STEPS = [
  {
    id: 'logo',
    title: 'Logo de tu restaurante',
    description: 'Se mostrará en el menú y en la cabecera. Recomendado: 500×500 px (cuadrado). PNG o JPG, máx. 2 MB.',
  },
  {
    id: 'banner',
    title: 'Banner / portada (opcional)',
    description: 'Imagen de cabecera de tu menú digital. Recomendado: 1200×600 px. PNG o JPG, máx. 2 MB. Puedes omitir y agregarlo después en Configuración.',
  },
  {
    id: 'done',
    title: '¡Listo!',
    description: 'Ya puedes agregar productos y compartir tu menú.',
  },
] as const

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [tenant, setTenant] = useState<{ id: string; name: string; slug: string; logo_url: string | null; banner_url?: string | null } | null>(null)
  const [logoUrl, setLogoUrl] = useState<string>('')
  const [bannerUrl, setBannerUrl] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [goingToDashboard, setGoingToDashboard] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const data = await getCurrentTenant()
        if (data && typeof data === 'object' && 'name' in data) {
          const t = data as { id: string; name: string; slug: string; logo_url: string | null; banner_url?: string | null }
          setTenant(t)
          setLogoUrl(t.logo_url || '')
          setBannerUrl(t.banner_url || '')
        }
      } catch {
        setError('No se pudo cargar tu restaurante.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleLogoUpload = async (file: File) => {
    if (tenant?.logo_url) await deleteOldLogo(tenant.logo_url)
    const result = await uploadLogo(file)
    if (result.url) setLogoUrl(result.url)
    return result
  }

  const handleLogoRemove = async () => {
    if (tenant?.logo_url) await deleteOldLogo(tenant.logo_url)
    setLogoUrl('')
  }

  const handleContinueFromLogo = async () => {
    if (!logoUrl.trim()) {
      setError('Sube el logo de tu restaurante para continuar.')
      return
    }
    setError(null)
    setSaving(true)
    try {
      await updateTenant({ logo_url: logoUrl })
      setStep(1)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al guardar.')
    } finally {
      setSaving(false)
    }
  }

  const handleContinueFromBanner = async () => {
    setError(null)
    setSaving(true)
    try {
      await updateTenant({ banner_url: bannerUrl || null })
      setStep(2)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al guardar.')
    } finally {
      setSaving(false)
    }
  }

  const handleGoToDashboard = async () => {
    setGoingToDashboard(true)
    await sendWelcomeEmailAfterOnboarding()
    router.push('/app/dashboard')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF6B00]" />
      </div>
    )
  }

  if (!tenant) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <p className="text-gray-600">{error || 'No se encontró tu restaurante.'}</p>
        <Button className="mt-4 bg-[#FF6B00] hover:bg-[#FF6B00]/90" onClick={() => router.push('/app/dashboard')}>
          Ir al Dashboard
        </Button>
      </div>
    )
  }

  const current = STEPS[step]

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>Paso {step + 1} de {STEPS.length}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">{current.title}</h1>
        <p className="text-[#1A1A1A]/70 mt-1">{current.description}</p>
      </div>

      <Card className="p-6 sm:p-8 border border-[#E5E5E5] shadow-sm">
        {step === 0 && (
          <>
            <div className="space-y-4">
              <ImageUpload
                currentUrl={logoUrl}
                onUpload={handleLogoUpload}
                onUrlChange={setLogoUrl}
                onRemove={handleLogoRemove}
                bucket="restaurant-logos"
                allowExternalUrl={false}
                disabled={saving}
              />
              <p className="text-xs text-gray-500">
                <strong>Tamaño recomendado:</strong> 500×500 px (cuadrado). Así se ve nítido en móviles y en la cabecera del menú.
              </p>
            </div>
            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <Button
              className="w-full mt-6 bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white"
              disabled={saving || !logoUrl.trim()}
              onClick={handleContinueFromLogo}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Continuar'
              )}
            </Button>
          </>
        )}

        {step === 1 && (
          <>
            <div className="space-y-4">
            <Label>Banner / imagen de portada (opcional)</Label>
            <ImageUpload
              currentUrl={bannerUrl}
              onUpload={async (file) => {
                const result = await uploadBanner(file)
                if (result.url) setBannerUrl(result.url)
                return result
              }}
              onUrlChange={setBannerUrl}
              onRemove={() => setBannerUrl('')}
              bucket="restaurant-logos"
              disabled={saving}
            />
            <p className="text-xs text-gray-500">
              <strong>Tamaño recomendado:</strong> 1200×600 px. Puedes saltar este paso y agregarlo después en Configuración.
            </p>
            </div>
            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                disabled={saving}
                onClick={() => setStep(2)}
              >
                Omitir
              </Button>
              <Button
                className="flex-1 bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white"
                disabled={saving}
                onClick={handleContinueFromBanner}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  'Continuar'
                )}
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#FF6B00]/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-10 w-10 text-[#FF6B00]" />
              </div>
              <p className="text-[#1A1A1A]/80 mb-6">
                Configuración inicial lista. Ahora agrega tus productos en <strong>Menú</strong> y comparte el enlace de tu menú con tus clientes.
              </p>
              <Button
                className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold"
                disabled={goingToDashboard}
                onClick={() => handleGoToDashboard()}
              >
                {goingToDashboard ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Enviando bienvenida...
                  </>
                ) : (
                  <>
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    Ir al Dashboard
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}

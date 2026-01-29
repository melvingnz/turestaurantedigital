'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { getCurrentTenant, updateTenant, checkSlugAvailability } from '@/app/actions/tenant'
import { validateSlug } from '@/lib/utils'
import { uploadLogo, deleteOldLogo } from '@/app/actions/storage'
import { ImageUpload } from '@/components/ui/image-upload'
import { Loader2, Save, Palette, Building2, Globe, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [tenant, setTenant] = useState<any>(null)

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    logo_url: '',
    brand_color: '#FF5F1F',
  })

  useEffect(() => {
    async function loadTenant() {
      try {
        const data = await getCurrentTenant()
        if (data && typeof data === 'object' && 'name' in data) {
          const validTenant = data as unknown as {
            name: string
            slug: string
            logo_url: string | null
            brand_color: string
            has_custom_domain?: boolean
          }
          setTenant(validTenant)
          setFormData({
            name: validTenant.name || '',
            slug: validTenant.slug || '',
            logo_url: validTenant.logo_url || '',
            brand_color: validTenant.brand_color || '#FF5F1F',
          })
        }
      } catch (err) {
        setError('Error al cargar la información del restaurante')
      } finally {
        setLoading(false)
      }
    }
    loadTenant()
  }, [])

  const handleSlugChange = (value: string) => {
    const normalized = value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    setFormData({ ...formData, slug: normalized })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const slugValidation = validateSlug(formData.slug)
      if (!slugValidation.valid) {
        setError(slugValidation.error || 'Slug inválido')
        setSaving(false)
        return
      }

      if (tenant && formData.slug !== tenant.slug) {
        const isAvailable = await checkSlugAvailability(formData.slug, tenant.id)
        if (!isAvailable) {
          setError('Este slug ya está en uso. Por favor elige otro.')
          setSaving(false)
          return
        }
      }

      const updated = await updateTenant({
        name: formData.name,
        slug: slugValidation.normalized || formData.slug,
        logo_url: formData.logo_url || null,
        brand_color: formData.brand_color,
      })

      setTenant(updated)
      setSuccess('Configuración actualizada correctamente')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Error al actualizar la configuración')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF5F1F]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600 mt-1">
          Personaliza la información y apariencia de tu restaurante
        </p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {tenant?.has_custom_domain && (
        <div className="flex gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
          <Info className="h-5 w-5 shrink-0 mt-0.5 text-amber-600" />
          <div>
            <p className="font-medium">Dominio propio configurado</p>
            <p className="text-sm mt-1 text-amber-700">
              Nos pondremos en contacto contigo para configurar tu dominio. Mientras tanto, tu menú
              está disponible en{' '}
              <span className="font-mono font-semibold">
                {tenant?.slug || 'tu-slug'}.turestaurantedigital.com
              </span>
              .
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="h-5 w-5 text-[#FF5F1F]" />
            <h2 className="text-xl font-semibold text-gray-900">Información Básica</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Restaurante</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ej: Late Burger"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={saving}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">
                URL del Restaurante{' '}
                <span className="text-xs text-gray-500">(solo letras, números y guiones)</span>
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">turestaurantedigital.com/</span>
                <Input
                  id="slug"
                  type="text"
                  placeholder="lateburger"
                  value={formData.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  required
                  pattern="[a-z0-9-]+"
                  minLength={3}
                  maxLength={30}
                  disabled={saving}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500">
                Tu menú estará disponible en: {formData.slug || 'tu-slug'}.turestaurantedigital.com
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="h-5 w-5 text-[#FF5F1F]" />
            <h2 className="text-xl font-semibold text-gray-900">Branding</h2>
          </div>

          <div className="space-y-4">
            <ImageUpload
              currentUrl={formData.logo_url}
              onUpload={async (file) => {
                if (formData.logo_url) {
                  await deleteOldLogo(formData.logo_url)
                }
                const result = await uploadLogo(file)
                if (result.url) {
                  setFormData({ ...formData, logo_url: result.url })
                }
                return result
              }}
              onUrlChange={(url) => {
                setFormData({ ...formData, logo_url: url })
              }}
              onRemove={async () => {
                if (formData.logo_url) {
                  await deleteOldLogo(formData.logo_url)
                }
                setFormData({ ...formData, logo_url: '' })
              }}
              bucket="restaurant-logos"
              disabled={saving}
            />

            <div className="space-y-2">
              <Label htmlFor="brand_color">Color de Marca</Label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    id="brand_color"
                    type="color"
                    value={formData.brand_color}
                    onChange={(e) => setFormData({ ...formData, brand_color: e.target.value })}
                    disabled={saving}
                    className="h-12 w-20 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={formData.brand_color}
                    onChange={(e) => setFormData({ ...formData, brand_color: e.target.value })}
                    disabled={saving}
                    placeholder="#FF5F1F"
                    pattern="^#[0-9A-Fa-f]{6}$"
                    className="flex-1"
                  />
                </div>
                <div
                  className="h-12 w-12 rounded-lg border border-gray-200"
                  style={{ backgroundColor: formData.brand_color }}
                />
              </div>
              <p className="text-xs text-gray-500">
                Este color se usará en botones y elementos destacados de tu storefront.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gray-50">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">Vista Previa</h2>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-4">
              {formData.logo_url ? (
                <div className="relative h-10 w-10">
                  <Image
                    src={formData.logo_url}
                    alt={formData.name}
                    fill
                    className="object-contain"
                    sizes="40px"
                  />
                </div>
              ) : (
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: formData.brand_color }}
                >
                  {formData.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="font-bold text-gray-900">{formData.name || 'Nombre del Restaurante'}</h3>
                <p className="text-xs text-gray-500">
                  {formData.slug || 'tu-slug'}.turestaurantedigital.com
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded-md text-white font-medium text-sm"
                style={{ backgroundColor: formData.brand_color }}
              >
                Ver Menú
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50"
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-[#FF5F1F] hover:bg-[#FF5F1F]/90 text-white"
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

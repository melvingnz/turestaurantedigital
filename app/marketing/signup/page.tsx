'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Logo } from '@/components/ui/logo'
import { signupWithTenant } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    restaurantName: '',
    slug: '',
    hasCustomDomain: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validaciones básicas
    if (!formData.email || !formData.password || !formData.restaurantName || !formData.slug) {
      setError('Por favor completa todos los campos')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setLoading(false)
      return
    }

    const result = await signupWithTenant({
      ...formData,
      hasCustomDomain: formData.hasCustomDomain,
    })

    if (result.success) {
      router.push('/marketing/confirmemail')
    } else {
      setError(result.error || 'Error al crear la cuenta')
      setLoading(false)
    }
  }

  /** Genera slug desde el nombre: minúsculas, todo pegado (sin espacios ni guiones). Ej: "Pau Delicias" → "paudelicias" */
  const slugFromName = (name: string) =>
    name
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // quitar acentos
      .replace(/[^a-z0-9]/g, '')
      .slice(0, 30)

  const handleSlugChange = (value: string) => {
    // Edición manual del slug: minúsculas, solo letras, números y guiones
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 30)
    setFormData({ ...formData, slug })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-[#E5E5E5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
            <Link
              href="/marketing/login"
              className="text-sm text-[#1A1A1A]/70 hover:text-[#FF6B00] transition-colors"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </div>
      </nav>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
        <Card className="w-full max-w-md p-8 border border-[#E5E5E5] shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Registrarse</h1>
            <p className="text-[#1A1A1A]/70">
              Comienza a digitalizar tu restaurante en minutos
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@restaurante.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
                disabled={loading}
              />
            </div>

            {/* Restaurant Name */}
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nombre de tu restaurante</Label>
              <Input
                id="restaurantName"
                type="text"
                placeholder="Tu Restaurante"
                value={formData.restaurantName}
                onChange={(e) => {
                  const name = e.target.value
                  setFormData({
                    ...formData,
                    restaurantName: name,
                    slug: slugFromName(name),
                  })
                }}
                required
                disabled={loading}
                className="placeholder:text-[#1A1A1A]/40"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug">
                URL de tu restaurante{' '}
                <span className="text-xs text-[#1A1A1A]/50">(solo letras, números y guiones)</span>
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#1A1A1A]/50">turestaurantedigital.com/</span>
                <Input
                  id="slug"
                  type="text"
                  placeholder="turestaurante"
                  value={formData.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  required
                  pattern="[a-z0-9-]+"
                  minLength={3}
                  maxLength={30}
                  disabled={loading}
                  className="flex-1 placeholder:text-[#1A1A1A]/40"
                />
              </div>
              <p className="text-xs text-[#1A1A1A]/50">
                Tu menú estará disponible en: {formData.slug || 'turestaurante'}.turestaurantedigital.com
              </p>
            </div>

            {/* ¿Tienes dominio propio? */}
            <div className="space-y-3">
              <Label>¿Tienes dominio propio para tu restaurante?</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="hasCustomDomain"
                    checked={!formData.hasCustomDomain}
                    onChange={() => setFormData({ ...formData, hasCustomDomain: false })}
                    disabled={loading}
                    className="text-[#FF6B00] focus:ring-[#FF6B00]"
                  />
                  <span className="text-sm text-[#1A1A1A]">No, usar subdominio</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="hasCustomDomain"
                    checked={formData.hasCustomDomain}
                    onChange={() => setFormData({ ...formData, hasCustomDomain: true })}
                    disabled={loading}
                    className="text-[#FF6B00] focus:ring-[#FF6B00]"
                  />
                  <span className="text-sm text-[#1A1A1A]">Sí, tengo dominio propio</span>
                </label>
              </div>
              <p className="text-xs text-[#1A1A1A]/50">
                {formData.hasCustomDomain
                  ? 'Nos pondremos en contacto para configurarlo. Mientras tanto usarás el subdominio.'
                  : `Te configuramos ${formData.slug || 'turestaurante'}.turestaurantedigital.com automáticamente.`}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registrando...
                </>
              ) : (
                'Registrarse'
              )}
            </Button>

            {/* Terms */}
            <p className="text-xs text-center text-[#1A1A1A]/60">
              Al crear una cuenta, aceptas nuestros{' '}
              <Link href="/terms" className="text-[#FF6B00] hover:underline">
                Términos de Uso
              </Link>{' '}
              y{' '}
              <Link href="/privacy" className="text-[#FF6B00] hover:underline">
                Política de Privacidad
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  )
}

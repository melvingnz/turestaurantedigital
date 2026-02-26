'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Logo } from '@/components/ui/logo'
import { signupWithTenant } from '@/app/actions/auth'
import { validatePassword } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, Eye, EyeOff, Check, X } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    restaurantName: '',
    slug: '',
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

const pwd = validatePassword(formData.password)
      if (!pwd.valid) {
        setError(pwd.error ?? 'Contraseña no válida')
        setLoading(false)
        return
      }

    const result = await signupWithTenant({
      ...formData,
    })

    if (result.success) {
      router.push(`/marketing/confirmemail?email=${encodeURIComponent(formData.email)}`)
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
              <Logo nav />
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
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mayúscula, número y carácter especial"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={8}
                  disabled={loading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#1A1A1A]/50 hover:text-[#1A1A1A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] rounded p-1"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {formData.password.length > 0 && (
                <ul className="text-xs space-y-1.5 text-[#1A1A1A]/70">
                  <li className={formData.password.length >= 8 ? 'text-green-600' : ''}>
                    {formData.password.length >= 8 ? (
                      <Check className="h-3.5 w-3.5 inline mr-1.5 align-middle" />
                    ) : (
                      <X className="h-3.5 w-3.5 inline mr-1.5 align-middle text-[#1A1A1A]/40" />
                    )}
                    Al menos 8 caracteres
                  </li>
                  <li className={/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}>
                    {/[A-Z]/.test(formData.password) ? (
                      <Check className="h-3.5 w-3.5 inline mr-1.5 align-middle" />
                    ) : (
                      <X className="h-3.5 w-3.5 inline mr-1.5 align-middle text-[#1A1A1A]/40" />
                    )}
                    Una mayúscula
                  </li>
                  <li className={/[0-9]/.test(formData.password) ? 'text-green-600' : ''}>
                    {/[0-9]/.test(formData.password) ? (
                      <Check className="h-3.5 w-3.5 inline mr-1.5 align-middle" />
                    ) : (
                      <X className="h-3.5 w-3.5 inline mr-1.5 align-middle text-[#1A1A1A]/40" />
                    )}
                    Un número
                  </li>
                  <li className={/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-600' : ''}>
                    {/[^A-Za-z0-9]/.test(formData.password) ? (
                      <Check className="h-3.5 w-3.5 inline mr-1.5 align-middle" />
                    ) : (
                      <X className="h-3.5 w-3.5 inline mr-1.5 align-middle text-[#1A1A1A]/40" />
                    )}
                    Un carácter especial (!@#$%&*…)
                  </li>
                </ul>
              )}
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

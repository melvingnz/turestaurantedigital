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

    const result = await signupWithTenant(formData)

    if (result.success) {
      // Redirigir al dashboard
      router.push('/app/dashboard')
    } else {
      setError(result.error || 'Error al crear la cuenta')
      setLoading(false)
    }
  }

  const handleSlugChange = (value: string) => {
    // Convertir a minúsculas y reemplazar espacios y caracteres especiales
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    setFormData({ ...formData, slug })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-[#FF5F1F] transition-colors"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </div>
      </nav>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Crea tu cuenta</h1>
            <p className="text-gray-600">
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
                placeholder="Ej: Late Burger"
                value={formData.restaurantName}
                onChange={(e) => {
                  setFormData({ ...formData, restaurantName: e.target.value })
                  // Auto-generar slug si está vacío
                  if (!formData.slug) {
                    handleSlugChange(e.target.value)
                  }
                }}
                required
                disabled={loading}
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug">
                URL de tu restaurante{' '}
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
                  disabled={loading}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500">
                Tu menú estará disponible en: {formData.slug || 'tu-slug'}.turestaurantedigital.com
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
              className="w-full bg-[#FF5F1F] hover:bg-[#FF5F1F]/90 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                'Crear cuenta'
              )}
            </Button>

            {/* Terms */}
            <p className="text-xs text-center text-gray-500">
              Al crear una cuenta, aceptas nuestros{' '}
              <Link href="/terms" className="text-[#FF5F1F] hover:underline">
                Términos de Uso
              </Link>{' '}
              y{' '}
              <Link href="/privacy" className="text-[#FF5F1F] hover:underline">
                Política de Privacidad
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  )
}

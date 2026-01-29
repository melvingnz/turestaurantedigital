'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Logo } from '@/components/ui/logo'
import { signIn } from '@/app/actions/auth'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // No redirect when client has session: session lives in localStorage but server uses cookies.
  // Auto-redirect caused login↔dashboard loop (requireAuth redirects to login, client redirects back).
  // User must submit login form so server sets cookies, then we redirect to dashboard.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos')
      setLoading(false)
      return
    }

    const result = await signIn(formData.email, formData.password)

    if (!result.success) {
      setError(result.error || 'Error al iniciar sesión')
      setLoading(false)
      return
    }
    router.refresh()
    router.replace('/app/dashboard')
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
              href="/marketing/signup"
              className="text-sm text-[#1A1A1A]/70 hover:text-[#FF6B00] transition-colors"
            >
              ¿No tienes cuenta? Regístrate
            </Link>
          </div>
        </div>
      </nav>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
        <Card className="w-full max-w-md p-8 border border-[#E5E5E5] shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Iniciar sesión</h1>
            <p className="text-[#1A1A1A]/70">
              Accede a tu panel de control
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
                placeholder="Tu contraseña"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={loading}
              />
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
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </Button>

            {/* Forgot Password */}
            <div className="text-center">
              <Link
                href="/forgot-password"
                className="text-sm text-[#FF6B00] hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

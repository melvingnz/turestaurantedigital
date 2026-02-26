'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Logo } from '@/components/ui/logo'
import { requestPasswordReset } from '@/app/actions/auth'
import Link from 'next/link'
import { Loader2, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!email.trim()) {
      setError('Ingresa tu correo electrónico')
      setLoading(false)
      return
    }

    const result = await requestPasswordReset(email.trim())

    if (!result.success) {
      setError(result.error || 'No se pudo enviar el correo. Intenta de nuevo.')
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar — mismo diseño que login */}
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
              Volver a Iniciar Sesión
            </Link>
          </div>
        </div>
      </nav>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
        <Card className="w-full max-w-md p-8 border border-[#E5E5E5] shadow-sm">
          {sent ? (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <CheckCircle className="h-14 w-14 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Revisa tu correo</h1>
              <p className="text-[#1A1A1A]/70">
                Si existe una cuenta con <strong>{email}</strong>, recibirás un enlace para restablecer tu contraseña en unos minutos.
              </p>
              <p className="text-sm text-[#1A1A1A]/60">
                ¿No lo ves? Revisa la carpeta de spam o solicita otro enlace.
              </p>
              <Link href="/marketing/login">
                <Button
                  type="button"
                  className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold"
                >
                  Volver a Iniciar Sesión
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">¿Olvidaste tu contraseña?</h1>
                <p className="text-[#1A1A1A]/70">
                  Ingresa tu correo y te enviaremos un enlace para restablecerla
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@restaurante.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar enlace'
                  )}
                </Button>

                <div className="text-center">
                  <Link
                    href="/marketing/login"
                    className="text-sm text-[#FF6B00] hover:underline"
                  >
                    Volver a Iniciar Sesión
                  </Link>
                </div>
              </form>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

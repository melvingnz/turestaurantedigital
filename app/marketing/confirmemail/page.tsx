'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase/client'
import { Mail, Loader2 } from 'lucide-react'

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams()
  const emailFromUrl = searchParams.get('email')?.trim() || ''

  const [email, setEmail] = useState(emailFromUrl)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setEmail(emailFromUrl)
  }, [emailFromUrl])

  const verifyCode = useCallback(async () => {
    const mail = email.trim()
    const token = code.trim().replace(/\s/g, '')
    if (!mail) {
      setError('Introduce tu correo electrónico.')
      return
    }
    if (token.length !== 6 || !/^\d{6}$/.test(token)) {
      setError('El código debe tener exactamente 6 dígitos.')
      return
    }
    setError(null)
    setLoading(true)
    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: mail,
        token,
        type: 'email',
      })
      if (verifyError) {
        setError(verifyError.message === 'Token has expired' || verifyError.message?.includes('expired')
          ? 'El código ha expirado. Solicita uno nuevo.'
          : verifyError.message || 'Código inválido. Revisa e intenta de nuevo.')
        setLoading(false)
        return
      }
      window.location.href = '/marketing/accountconfirmed'
    } catch {
      setError('Error al verificar. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }, [email, code])

  const resendCode = useCallback(async () => {
    const mail = email.trim()
    if (!mail) {
      setError('Introduce tu correo para reenviar el código.')
      return
    }
    setError(null)
    setResendLoading(true)
    try {
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: mail,
      })
      if (resendError) {
        setError(resendError.message || 'No se pudo reenviar. Espera un minuto e intenta de nuevo.')
      } else {
        setError(null)
        setCode('')
        // Show a small success (optional)
        setTimeout(() => setResendLoading(false), 500)
      }
    } catch {
      setError('Error al reenviar el código.')
    } finally {
      setResendLoading(false)
    }
  }, [email])

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 6)
    setCode(v)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
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
              Iniciar sesión
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
        <Card className="w-full max-w-md p-8 sm:p-10 bg-white rounded-xl shadow-lg border-0">
          <div className="w-14 h-14 rounded-full bg-[#FF6B00]/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-[#FF6B00]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-2 text-center">
            Confirma tu correo con el código
          </h1>
          <p className="text-[#1A1A1A]/70 mb-6 leading-relaxed text-center text-sm">
            Hemos enviado un código de 6 dígitos a tu correo. Introdúcelo aquí para activar tu cuenta.
          </p>

          {!emailFromUrl && (
            <div className="space-y-2 mb-4">
              <Label htmlFor="confirm-email">Correo electrónico</Label>
              <Input
                id="confirm-email"
                type="email"
                placeholder="tu@restaurante.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null) }}
                disabled={!!emailFromUrl}
                className="bg-white"
              />
            </div>
          )}

          {emailFromUrl && (
            <p className="text-sm text-[#1A1A1A]/60 mb-4 text-center">
              Código enviado a <strong>{emailFromUrl}</strong>
            </p>
          )}

          <div className="space-y-2 mb-4">
            <Label htmlFor="confirm-code">Código de 6 dígitos</Label>
            <Input
              id="confirm-code"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="000000"
              maxLength={6}
              value={code}
              onChange={handleCodeChange}
              disabled={loading}
              className="text-center text-2xl tracking-[0.5em] font-mono bg-white"
              onKeyDown={(e) => e.key === 'Enter' && verifyCode()}
            />
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <Button
            className="w-full h-12 bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold"
            disabled={loading || code.length !== 6}
            onClick={verifyCode}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verificando...
              </>
            ) : (
              'Verificar código'
            )}
          </Button>

          <p className="text-center text-sm text-[#1A1A1A]/50 mt-4">
            ¿No recibiste el código?{' '}
            <button
              type="button"
              onClick={resendCode}
              disabled={resendLoading || !email.trim()}
              className="text-[#FF6B00] font-medium hover:underline disabled:opacity-50"
            >
              {resendLoading ? 'Enviando...' : 'Reenviar código'}
            </button>
          </p>

          <p className="text-[#1A1A1A]/50 text-xs mt-6 text-center">
            Revisa también la carpeta de spam o promociones.
          </p>
        </Card>
      </div>
    </div>
  )
}

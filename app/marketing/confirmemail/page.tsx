'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { supabase } from '@/lib/supabase/client'
import { Mail, LogIn } from 'lucide-react'

export default function ConfirmEmailPage() {
  useEffect(() => {
    void supabase.auth.signOut()
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
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
              Iniciar sesión
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
        <Card className="w-full max-w-md p-8 sm:p-10 bg-white rounded-xl shadow-lg border-0 text-center">
          <div className="w-14 h-14 rounded-full bg-[#FF6B00]/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-[#FF6B00]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4">
            ¡Casi listo! 🚀 Revisa tu bandeja de entrada
          </h1>
          <p className="text-[#1A1A1A]/70 mb-6 leading-relaxed">
            Hemos enviado un enlace de confirmación a tu correo. Haz clic en el botón dentro del
            mensaje para activar tu cuenta y empezar a digitalizar tu restaurante.
          </p>
          <p className="text-[#1A1A1A]/60 text-sm mb-8">
            Si no lo ves en unos minutos, revisa tu carpeta de spam o promociones.
          </p>
          <Button
            asChild
            className="w-full h-12 bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold"
          >
            <Link href="/marketing/login" className="inline-flex items-center justify-center gap-2">
              <LogIn className="h-5 w-5" />
              Iniciar sesión
            </Link>
          </Button>
          <p className="text-sm text-[#1A1A1A]/50 mt-4">
            Cuando hayas confirmado tu correo, haz clic aquí para acceder.
          </p>
        </Card>
      </div>
    </div>
  )
}

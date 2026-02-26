'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'
import { ArrowRight } from 'lucide-react'

export default function AccountConfirmedPage() {
  useEffect(() => {
    void supabase.auth.getSession().then(() => {
      if (typeof window !== 'undefined' && window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }
    })
  }, [])

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
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 text-center">
          <div className="flex flex-col items-center gap-0 mb-6">
            <Image
              src="/branding/logo.png"
              alt=""
              width={80}
              height={80}
              className="object-contain w-20 h-20 block"
            />
            <p className="-mt-2 text-base font-medium text-[#1A1A1A]/70 leading-tight">Tu Restaurante Digital</p>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-3">
            ¡Bienvenido a bordo!👨‍🍳<br />
            Tu cuenta ha sido confirmada
          </h1>
          <p className="text-[#1A1A1A]/70 mb-5 text-base leading-relaxed">
            Ahora configura el logo de tu restaurante, banner y luego agrega tu menú.
          </p>
          <Button
            asChild
            className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold h-14 text-base rounded-xl shadow-lg shadow-[#FF6B00]/25 hover:shadow-[#FF6B00]/30 transition-shadow"
          >
            <Link href="/app/dashboard" className="inline-flex items-center justify-center gap-2">
              Configurar mi restaurante
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </Button>
          <Link
            href="/marketing/login"
            className="mt-3 block text-sm text-[#1A1A1A]/50 hover:text-[#FF6B00]/80 transition-colors"
          >
            Prefiero iniciar sesión más tarde
          </Link>
        </div>
      </div>
    </div>
  )
}

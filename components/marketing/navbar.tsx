'use client'

import React from 'react'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <Link href="/marketing" className="flex items-center">
            <Logo />
          </Link>

          {/* Center: Navigation Links (Desktop Only) */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-600 hover:text-[#FF5F1F] transition-colors"
            >
              Características
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-gray-600 hover:text-[#FF5F1F] transition-colors"
            >
              Precios
            </Link>
          </div>

          {/* Right: CTA Buttons */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/marketing/login">Iniciar Sesión</Link>
            </Button>
            <Button className="bg-[#FF5F1F] hover:bg-[#FF5F1F]/90 text-white" asChild>
              <Link href="/marketing/signup">Empezar Ahora</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

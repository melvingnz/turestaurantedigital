import React from 'react'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#FAFAFA] border-t border-[#E5E5E5]">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-12">
          {/* Column 1: Brand — logo horizontal; description & social aligned to logo left edge */}
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center gap-2 flex-nowrap">
              <img
                src="/branding/logo-trd-v3-td-black.png"
                alt="Tu Restaurante Digital"
                width={120}
                height={40}
                className="h-9 sm:h-10 w-auto max-w-[140px] object-contain object-left flex-shrink-0 block"
              />
              <span className="font-semibold text-slate-600 text-sm sm:text-base leading-tight tracking-tight whitespace-nowrap">
                Tu Restaurante Digital
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[280px] w-full text-left">
              Digitalizando la gastronomía dominicana, un pedido a la vez.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-500 hover:text-[#FF6B00] hover:bg-[#FFF7F2] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-500 hover:text-[#FF6B00] hover:bg-[#FFF7F2] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-500 hover:text-[#FF6B00] hover:bg-[#FFF7F2] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Producto */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">
              Producto
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors"
                >
                  Características
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors"
                >
                  Precios
                </Link>
              </li>
              <li>
                <Link
                  href="#menu-digital"
                  className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors"
                >
                  Menú Digital
                </Link>
              </li>
              <li>
                <Link
                  href="#kds"
                  className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors"
                >
                  Sistema KDS
                </Link>
              </li>
              <li>
                <Link
                  href="#roadmap"
                  className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors"
                >
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Recursos */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">
              Recursos
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors"
                >
                  Acerca de
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors"
                >
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors"
                >
                  Guías de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors"
                >
                  Estado del Servicio
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">
              Legal
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors"
                >
                  Términos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 sm:mt-14 lg:mt-16 pt-6 sm:pt-8 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-slate-500">
            © {currentYear} Tu Restaurante Digital. Todos los derechos reservados.
          </p>
          <p className="text-xs sm:text-sm text-slate-500">
            Hecho con <span className="text-[#FF6B00]">❤</span> en República Dominicana
          </p>
        </div>
      </div>
    </footer>
  )
}

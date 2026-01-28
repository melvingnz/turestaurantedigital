import React from 'react'
import { Logo } from '@/components/ui/logo'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-slate-50 border-t border-gray-200">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Column 1: Brand Identity */}
          <div className="space-y-3 sm:space-y-4">
            <Logo />
            <p className="text-sm text-gray-500 leading-relaxed">
              Digitalizando la gastronomía dominicana, un pedido a la vez.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#FF5F1F] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#FF5F1F] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#FF5F1F] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Producto */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Producto</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-gray-600 hover:text-[#FF5F1F] transition-colors"
                >
                  Características
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-sm text-gray-600 hover:text-[#FF5F1F] transition-colors"
                >
                  Precios
                </Link>
              </li>
              <li>
                <Link
                  href="#menu-digital"
                  className="text-sm text-gray-600 hover:text-[#FF5F1F] transition-colors"
                >
                  Menú Digital
                </Link>
              </li>
              <li>
                <Link
                  href="#kds"
                  className="text-sm text-gray-600 hover:text-[#FF5F1F] transition-colors"
                >
                  Sistema KDS
                </Link>
              </li>
              <li>
                <Link
                  href="#roadmap"
                  className="text-sm text-gray-600 hover:text-[#FF5F1F] transition-colors"
                >
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Recursos */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Recursos</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-[#FF6B00] transition-colors"
                >
                  Acerca de
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-gray-600 hover:text-[#FF6B00] transition-colors"
                >
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-sm text-gray-600 hover:text-[#FF5F1F] transition-colors"
                >
                  Guías de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-600 hover:text-[#FF5F1F] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-[#FF6B00] transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-sm text-gray-600 hover:text-[#FF6B00] transition-colors"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="text-sm text-gray-600 hover:text-[#FF5F1F] transition-colors"
                >
                  Estado del Servicio
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Legal</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-[#FF5F1F] transition-colors"
                >
                  Términos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-[#FF5F1F] transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-gray-600 hover:text-[#FF5F1F] transition-colors"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} Tu Restaurante Digital. Todos los derechos reservados.
          </p>
          <p className="text-sm text-gray-500">
            Hecho con ❤️ en República Dominicana
          </p>
        </div>
      </div>
    </footer>
  )
}

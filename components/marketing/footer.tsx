import React from 'react'
import { Instagram, Facebook } from 'lucide-react'
import Link from 'next/link'

/** Logo de X (antes Twitter) — SVG inline para la marca actual */
function XLogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

/** Logo de TikTok — SVG inline */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 w-full min-w-0 bg-[#FAFAFA] border-t border-[#E5E5E5] font-sans isolate" role="contentinfo" aria-label="Pie de página">
      {/* Único content container: padding horizontal consistente para todo el footer */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-5 lg:px-6 pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-14 lg:pb-16" style={{ paddingBottom: 'max(3rem, env(safe-area-inset-bottom, 0px))' }}>
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between gap-10 sm:gap-8 lg:gap-12">
          {/* Columna 1: Mobile = vertical (logo → título → descripción); Desktop = logo y título en fila */}
          <div className="footer-branding flex flex-col items-start gap-2 min-w-0 sm:min-w-[280px] sm:max-w-[320px] flex-1 sm:flex-none">
            <div className="flex flex-col items-start gap-1 flex-nowrap min-w-0 w-full">
              <div className="overflow-hidden flex-shrink-0 h-9 sm:h-10 w-14 sm:w-16">
                <img
                  src="/branding/logo.png"
                  alt="Tu Restaurante Digital"
                  width={120}
                  height={40}
                  className="block h-9 sm:h-10 w-auto max-w-none object-contain object-left bg-transparent mix-blend-multiply m-0 p-0 border-0 -ml-2 sm:-ml-2.5"
                />
              </div>
              <span className="font-semibold text-slate-600 text-sm sm:text-base leading-tight tracking-tight whitespace-nowrap">
                Tu Restaurante Digital
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed m-0">
              Digitalizando la gastronomía dominicana, con tecnología simple.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
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
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-500 hover:text-[#FF6B00] hover:bg-[#FFF7F2] transition-colors"
                aria-label="X (antes Twitter)"
              >
                <XLogoIcon className="h-5 w-5" />
              </Link>
              <Link
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-500 hover:text-[#FF6B00] hover:bg-[#FFF7F2] transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Column 2: PRODUCTO */}
          <div className="flex flex-col items-start text-left min-w-0">
            <h3 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">
              Producto
            </h3>
            <ul className="flex flex-col gap-y-2 mt-4">
              <li>
                <Link href="#features" className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors">
                  Características
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="#menu-digital" className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors">
                  Menú Digital
                </Link>
              </li>
              <li>
                <Link href="#kds" className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors">
                  Sistema KDS
                </Link>
              </li>
              <li>
                <Link href="#roadmap" className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: RECURSOS */}
          <div className="flex flex-col items-start text-left min-w-0">
            <h3 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">
              Recursos
            </h3>
            <ul className="flex flex-col gap-y-2 mt-4">
              <li>
                <Link href="/about" className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors">
                  Acerca de
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors">
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors">
                  Guías de Uso
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors">
                  Estado del Servicio
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: LEGAL */}
          <div className="flex flex-col items-start text-left min-w-0">
            <h3 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">
              Legal
            </h3>
            <ul className="flex flex-col gap-y-2 mt-4 list-none pl-0">
              <li className="relative z-10">
                <Link href="/terms" className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors inline-block py-0.5">
                  Términos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-slate-500 hover:text-[#FF6B00] transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar: padding extra en móvil para que no quede oculto */}
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

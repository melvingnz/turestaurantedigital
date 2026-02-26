import React from 'react'

const LOGO_SRC = '/branding/logo.png'
const ALT = 'Tu Restaurante Digital'

interface LogoProps {
  className?: string
  /** Navbar: logo de marca (imagen) */
  nav?: boolean
  /** Sidebar expanded: logo only, centered, h-10 */
  compact?: boolean
  /** Sidebar collapsed: logo only, centered, h-8 */
  logoOnly?: boolean
}

/** Logo de marca para navbar: mismo tamaño en todas las páginas (login, marketing, confirmación, etc.) */
const NAV_LOGO_HEIGHT = 'h-9' // 36px — tamaño único para headers
function NavLogo({ className }: { className?: string }) {
  return (
    <img
      src={LOGO_SRC}
      alt={ALT}
      width={120}
      height={36}
      className={`${NAV_LOGO_HEIGHT} w-auto object-contain object-left select-none ${className || ''}`}
    />
  )
}

export function Logo({ className, compact, logoOnly, nav }: LogoProps) {
  if (nav) {
    return <NavLogo className={className} />
  }

  if (logoOnly) {
    return (
      <div
        className={`flex items-center justify-center min-w-0 w-full p-0 bg-transparent border-0 shadow-none ${className || ''}`}
      >
        <img
          src={LOGO_SRC}
          alt={ALT}
          width={32}
          height={32}
          className="h-8 w-8 object-contain flex-shrink-0 p-0 m-0 border-0 bg-transparent"
        />
      </div>
    )
  }

  if (compact) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1.5 min-w-0 w-full p-0 bg-transparent border-0 shadow-none ${className || ''}`}
      >
        <img
          src={LOGO_SRC}
          alt={ALT}
          width={48}
          height={48}
          className="h-12 w-12 object-contain flex-shrink-0 p-0 m-0 border-0 bg-transparent"
        />
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 text-center leading-tight">
          Tu Restaurante Digital
        </span>
      </div>
    )
  }

  return (
    <div className={`flex items-center min-w-0 p-0 bg-transparent border-0 shadow-none ${className || ''}`}>
      <img
        src={LOGO_SRC}
        alt={ALT}
        width={112}
        height={112}
        className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 object-contain flex-shrink-0 p-0 m-0 border-0 bg-transparent block"
      />
    </div>
  )
}

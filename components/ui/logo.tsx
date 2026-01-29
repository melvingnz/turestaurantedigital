import React from 'react'

const LOGO_SRC = '/branding/logo-trd-v3-td-black.png'
const ALT = 'Tu Restaurante Digital'

interface LogoProps {
  className?: string
  /** Sidebar expanded: logo only, centered, h-10 */
  compact?: boolean
  /** Sidebar collapsed: logo only, centered, h-8 */
  logoOnly?: boolean
}

export function Logo({ className, compact, logoOnly }: LogoProps) {
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
        width={40}
        height={40}
        className="h-10 w-10 object-contain flex-shrink-0 p-0 m-0 border-0 bg-transparent"
      />
    </div>
  )
}

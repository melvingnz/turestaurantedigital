import React from 'react'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 p-0 bg-transparent border-0 shadow-none ${className || ''}`}>
      <img
        src="/branding/logo-a-r-stylized.png"
        alt=""
        width={40}
        height={40}
        className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 object-contain flex-shrink-0 p-0 m-0 border-0 bg-transparent"
      />
      <span className="font-bold text-[#1A1A1A] text-xs sm:text-sm md:text-base lg:text-xl whitespace-nowrap leading-none py-0">
        Tu Restaurante Digital
      </span>
    </div>
  )
}

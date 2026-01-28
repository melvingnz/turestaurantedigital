'use client'

import React from 'react'
import Image from 'next/image'
import { getStorefrontUrl } from '@/lib/utils'

const LATE_BURGER_PRIMARY = '#0FA8D8'

export function TrustedBy() {
  const lateBurgerUrl = getStorefrontUrl('lateburger')

  return (
    <section className="w-full bg-gray-50 py-8 sm:py-12 md:py-14 lg:py-16 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 sm:mb-6 md:mb-8">
            Confiado por restaurantes en República Dominicana
          </p>

          {/* Late Burger card: 90% width on mobile, proper padding */}
          <div className="w-[90%] sm:w-full max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12">
            <a
              href={lateBurgerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-opacity-100 touch-manipulation"
              style={{ borderColor: 'transparent' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = LATE_BURGER_PRIMARY
                e.currentTarget.style.boxShadow = `0 10px 40px ${LATE_BURGER_PRIMARY}30`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {/* Logo: next/image, object-contain, relative parent */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div
                      className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden ring-2 ring-white/20 flex items-center justify-center p-1.5 sm:p-2"
                      style={{ backgroundColor: LATE_BURGER_PRIMARY }}
                    >
                      <Image
                        src="/images/Logo_500x500.jpg"
                        alt="Late Burger SDQ Logo"
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
                        priority
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0 text-center md:text-left w-full">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-1 sm:mb-1.5 md:mb-2 group-hover:text-[#FF6B00] transition-colors leading-tight">
                    Late Burger SDQ
                  </h3>
                  <p className="text-[#1A1A1A]/70 mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-relaxed break-words">
                    Primer restaurante en digitalizar su experiencia con Tu Restaurante Digital
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2 md:gap-3 text-xs sm:text-sm">
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-green-50 rounded-full shrink-0">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
                      <span className="text-green-700 font-medium">En línea</span>
                    </span>
                    <span className="text-gray-400 shrink-0 inline" aria-hidden>•</span>
                    <span className="text-[#1A1A1A]/70 font-medium shrink-0">Santo Domingo, RD</span>
                    <span className="text-gray-400 shrink-0 inline" aria-hidden>•</span>
                    <span
                      className="font-semibold transition-colors group-hover:underline shrink-0"
                      style={{ color: LATE_BURGER_PRIMARY }}
                    >
                      Ver Storefront →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 flex-wrap">
            <span className="text-xl sm:text-2xl md:text-3xl opacity-60 hover:opacity-100 transition-opacity">🍔</span>
            <span className="text-xl sm:text-2xl md:text-3xl opacity-60 hover:opacity-100 transition-opacity">🍕</span>
            <span className="text-xl sm:text-2xl md:text-3xl opacity-60 hover:opacity-100 transition-opacity">🌮</span>
            <span className="text-xl sm:text-2xl md:text-3xl opacity-60 hover:opacity-100 transition-opacity">🥗</span>
            <span className="text-xl sm:text-2xl md:text-3xl opacity-60 hover:opacity-100 transition-opacity">🍜</span>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 sm:mt-4 md:mt-6">
            + Más restaurantes próximamente
          </p>
        </div>
      </div>
    </section>
  )
}

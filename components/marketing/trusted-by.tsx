'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Late Burger Brand Colors
const LATE_BURGER_PRIMARY = '#0FA8D8' // Brand Blue

export function TrustedBy() {
  return (
    <section className="w-full bg-gray-50 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-8">
            Confiado por restaurantes en República Dominicana
          </p>
          
          {/* Late Burger - Featured Case Study */}
          <div className="max-w-4xl mx-auto mb-12">
            <Link 
              href="/lateburger"
              className="group block bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-opacity-100"
              style={{
                borderColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = LATE_BURGER_PRIMARY
                e.currentTarget.style.boxShadow = `0 10px 40px ${LATE_BURGER_PRIMARY}30`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                {/* Logo - Late Burger Logo with Blue Background */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div 
                      className="w-28 h-28 md:w-32 md:h-32 rounded-2xl shadow-xl overflow-hidden ring-2 ring-white/20 flex items-center justify-center p-2"
                      style={{ backgroundColor: LATE_BURGER_PRIMARY }}
                    >
                      <Image 
                        src="/images/Logo_500x500.jpg" 
                        alt="Late Burger SDQ Logo" 
                        fill
                        className="object-contain"
                        sizes="128px"
                        priority
                      />
                    </div>
                    {/* Subtle glow on hover */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                      style={{ backgroundColor: LATE_BURGER_PRIMARY }}
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 group-hover:text-[#FF5F1F] transition-colors">
                    Late Burger SDQ
                  </h3>
                  <p className="text-gray-600 mb-4 text-base md:text-lg leading-relaxed">
                    Primer restaurante en digitalizar su experiencia con Tu Restaurante Digital
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm">
                    <span className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-green-700 font-medium">En línea</span>
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600 font-medium">Santo Domingo, RD</span>
                    <span className="text-gray-400">•</span>
                    <span 
                      className="font-semibold transition-colors group-hover:underline"
                      style={{ color: LATE_BURGER_PRIMARY }}
                    >
                      Ver Storefront →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Other Restaurant Types */}
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="text-3xl opacity-60 hover:opacity-100 transition-opacity">🍔</div>
            <div className="text-3xl opacity-60 hover:opacity-100 transition-opacity">🍕</div>
            <div className="text-3xl opacity-60 hover:opacity-100 transition-opacity">🌮</div>
            <div className="text-3xl opacity-60 hover:opacity-100 transition-opacity">🥗</div>
            <div className="text-3xl opacity-60 hover:opacity-100 transition-opacity">🍜</div>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            + Más restaurantes próximamente
          </p>
        </div>
      </div>
    </section>
  )
}

'use client'

import React from 'react'

const ORANGE = '#FF6B00'

export function AboutHeroMockup() {
  return (
    <div className="w-full max-w-lg mx-auto flex items-center justify-center">
      <svg
        viewBox="0 0 400 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-hidden
      >
        {/* QR Menu device */}
        <g transform="translate(40, 30)">
          <rect
            x="0"
            y="0"
            width="100"
            height="160"
            rx="12"
            fill="#1A1A1A"
            opacity="0.06"
          />
          <rect
            x="4"
            y="4"
            width="92"
            height="152"
            rx="10"
            fill="white"
            stroke="#E5E5E5"
            strokeWidth="1.5"
          />
          <rect x="14" y="20" width="40" height="40" rx="6" fill={ORANGE} opacity="0.2" />
          <rect x="58" y="20" width="32" height="32" rx="4" fill={ORANGE} opacity="0.15" />
          <rect x="14" y="70" width="76" height="8" rx="2" fill="#1A1A1A" opacity="0.12" />
          <rect x="14" y="86" width="60" height="8" rx="2" fill="#1A1A1A" opacity="0.08" />
          <rect x="14" y="102" width="76" height="8" rx="2" fill="#1A1A1A" opacity="0.12" />
          <rect x="14" y="118" width="50" height="8" rx="2" fill="#1A1A1A" opacity="0.08" />
          <text
            x="50"
            y="150"
            textAnchor="middle"
            fill="#1A1A1A"
            fontSize="10"
            fontWeight="600"
            opacity="0.7"
          >
            Menú QR
          </text>
        </g>

        {/* Sync arrows */}
        <g>
          <path
            d="M155 95 L195 95"
            stroke={ORANGE}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M185 88 L195 95 L185 102"
            stroke={ORANGE}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.8"
          />
          <circle cx="175" cy="95" r="6" fill="white" stroke={ORANGE} strokeWidth="2" />
          <path
            d="M205 125 L245 125"
            stroke={ORANGE}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M215 118 L205 125 L215 132"
            stroke={ORANGE}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.8"
          />
          <circle cx="225" cy="125" r="6" fill="white" stroke={ORANGE} strokeWidth="2" />
        </g>

        {/* KDS display */}
        <g transform="translate(260, 20)">
          <rect
            x="0"
            y="0"
            width="140"
            height="180"
            rx="10"
            fill="white"
            stroke="#E5E5E5"
            strokeWidth="1.5"
          />
          <rect x="12" y="12" width="116" height="28" rx="6" fill={ORANGE} opacity="0.12" />
          <rect x="20" y="20" width="40" height="12" rx="2" fill={ORANGE} />
          <rect x="12" y="52" width="116" height="14" rx="2" fill="#1A1A1A" opacity="0.08" />
          <rect x="12" y="74" width="90" height="10" rx="2" fill="#1A1A1A" opacity="0.06" />
          <rect x="12" y="90" width="100" height="10" rx="2" fill="#1A1A1A" opacity="0.06" />
          <rect x="12" y="110" width="116" height="14" rx="2" fill="#1A1A1A" opacity="0.08" />
          <rect x="12" y="132" width="80" height="10" rx="2" fill="#1A1A1A" opacity="0.06" />
          <rect x="12" y="148" width="95" height="10" rx="2" fill="#1A1A1A" opacity="0.06" />
          <rect x="12" y="156" width="50" height="8" rx="4" fill={ORANGE} opacity="0.3" />
          <text
            x="70"
            y="175"
            textAnchor="middle"
            fill="#1A1A1A"
            fontSize="10"
            fontWeight="600"
            opacity="0.7"
          >
            KDS Cocina
          </text>
        </g>
      </svg>
    </div>
  )
}

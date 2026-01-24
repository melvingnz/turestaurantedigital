import React from 'react'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Chef's Hat Base */}
        <path
          d="M20 8C15 8 11 11 11 15V18C11 19.5 12 21 13.5 21.5L14 22H26L26.5 21.5C28 21 29 19.5 29 18V15C29 11 25 8 20 8Z"
          fill="#FF5F1F"
        />
        {/* Chef's Hat Top (Pouf) */}
        <ellipse
          cx="20"
          cy="12"
          rx="6"
          ry="4"
          fill="#FF5F1F"
          opacity="0.9"
        />
        {/* Digital/WiFi Signal Waves - Integrated into the hat design */}
        <path
          d="M8 28C8 28 10 26 12 28C12 28 14 26 16 28C16 28 18 26 20 28C20 28 22 26 24 28C24 28 26 26 28 28C28 28 30 26 32 28"
          stroke="#FF5F1F"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M10 32C10 32 11.5 30.5 13 32C13 32 14.5 30.5 16 32C16 32 17.5 30.5 19 32C19 32 20.5 30.5 22 32C22 32 23.5 30.5 25 32C25 32 26.5 30.5 28 32C28 32 29.5 30.5 30 32"
          stroke="#FF5F1F"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M12 36C12 36 13 35 14 36C14 36 15 35 16 36C16 36 17 35 18 36C18 36 19 35 20 36C20 36 21 35 22 36C22 36 23 35 24 36C24 36 25 35 26 36C26 36 27 35 28 36"
          stroke="#FF5F1F"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </svg>
      <span className="font-bold text-gray-800 text-xs sm:text-sm md:text-base lg:text-xl whitespace-nowrap">
        Tu Restaurante Digital
      </span>
    </div>
  )
}

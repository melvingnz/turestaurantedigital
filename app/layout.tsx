import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

// Configurar Inter con fallback en caso de error de conexión
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: "Tu Restaurante Digital",
  description: "La experiencia digital completa para tu restaurante",
  icons: { icon: "/branding/logo.png" },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  )
}

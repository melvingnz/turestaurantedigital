import { Navbar } from '@/components/marketing/navbar'
import { Hero } from '@/components/marketing/hero'
import { TrustedBy } from '@/components/marketing/trusted-by'
import { Features } from '@/components/marketing/features'
import { Steps } from '@/components/marketing/steps'
import { Pricing } from '@/components/marketing/pricing'
import { FAQ } from '@/components/marketing/faq'
import { Footer } from '@/components/marketing/footer'

export const metadata = {
  title: 'Inicio | Tu Restaurante Digital',
  description: 'La experiencia digital completa para tu restaurante. Menú QR, KDS, WhatsApp y más.',
}

/**
 * Strict Visual Parity: Desktop and mobile must show the same sections in this exact order.
 * 1. Hero | 2. Social Proof (Late Burger SDQ) | 3. Features | 4. 3 Steps | 5. Pricing | 6. FAQ | Footer
 * No sections use "hidden" on mobile. Max-w-6xl containers throughout.
 */
export default function RootPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <Steps />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  )
}

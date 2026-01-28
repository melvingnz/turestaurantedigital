'use client'

import { MarketingClient } from '@/components/marketing/marketing-client'
import { Steps } from '@/components/marketing/steps'
import { Pricing } from '@/components/marketing/pricing'
import { FAQ } from '@/components/marketing/faq'
import { Footer } from '@/components/marketing/footer'

/**
 * Strict order (parity with app/page.tsx and production):
 * Hero → TrustedBy → Features → Steps → Pricing → FAQ → Footer
 */
export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <MarketingClient />
      <Steps />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  )
}

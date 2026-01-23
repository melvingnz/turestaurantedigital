'use client'

import { MarketingClient } from '@/components/marketing/marketing-client'
import { Steps } from '@/components/marketing/steps'
import { Pricing } from '@/components/marketing/pricing'
import { Footer } from '@/components/marketing/footer'

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingClient />
      <Steps />
      <Pricing />
      <Footer />
    </div>
  )
}

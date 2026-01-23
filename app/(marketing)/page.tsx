import { MarketingClient } from '@/components/marketing/marketing-client'
import { Hero } from '@/components/marketing/hero'
import { Steps } from '@/components/marketing/steps'
import { Pricing } from '@/components/marketing/pricing'
import { Footer } from '@/components/marketing/footer'

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingClient />
      <Hero />
      <Steps />
      <Pricing />
      <Footer />
    </div>
  )
}

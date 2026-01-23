import { MarketingClient } from '@/components/marketing/marketing-client'
import { Steps } from '@/components/marketing/steps'
import { Pricing } from '@/components/marketing/pricing'
import { Footer } from '@/components/marketing/footer'

// Force static generation to avoid client reference manifest issues
export const dynamic = 'force-static'

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

import { Navbar } from '@/components/marketing/navbar'
import { Hero } from '@/components/marketing/hero'
import { TrustedBy } from '@/components/marketing/trusted-by'
import { CommissionCalculator } from '@/components/marketing/commission-calculator'
import { Features } from '@/components/marketing/features'
import { OmnichannelFlow } from '@/components/marketing/omnichannel-flow'
import { ZeroFriction } from '@/components/marketing/zero-friction'
import { CustomerDataInsights } from '@/components/marketing/customer-data-insights'
import { Steps } from '@/components/marketing/steps'
import { Pricing } from '@/components/marketing/pricing'
import { FAQ } from '@/components/marketing/faq'
import { Footer } from '@/components/marketing/footer'

export const metadata = {
  title: 'Inicio | Tu Restaurante Digital',
  description: 'La experiencia digital completa para tu restaurante. Menú QR, KDS, WhatsApp y más.',
}

export default function RootPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <TrustedBy />
      <CommissionCalculator />
      <Features />
      <OmnichannelFlow />
      <ZeroFriction />
      <CustomerDataInsights />
      <Steps />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  )
}

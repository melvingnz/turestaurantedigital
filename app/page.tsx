import { Navbar } from '@/components/marketing/navbar'
import { Hero } from '@/components/marketing/hero'
import { TrustedBy } from '@/components/marketing/trusted-by'
import { Features } from '@/components/marketing/features'
import { Steps } from '@/components/marketing/steps'
import { Pricing } from '@/components/marketing/pricing'
import { FAQ } from '@/components/marketing/faq'
import { Footer } from '@/components/marketing/footer'

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

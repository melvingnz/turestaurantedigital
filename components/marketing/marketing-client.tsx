'use client'

import { Navbar } from './navbar'
import { TrustedBy } from './trusted-by'
import { Features } from './features'
import { FAQ } from './faq'

export function MarketingClient() {
  return (
    <>
      <Navbar />
      <TrustedBy />
      <Features />
      <FAQ />
    </>
  )
}

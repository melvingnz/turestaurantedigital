'use client'

import { Navbar } from './navbar'
import { Hero } from './hero'
import { TrustedBy } from './trusted-by'
import { Features } from './features'
import { FAQ } from './faq'

export function MarketingClient() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <FAQ />
    </>
  )
}

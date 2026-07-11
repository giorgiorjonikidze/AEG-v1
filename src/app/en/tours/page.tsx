import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import TailorMadeCTA from '@/components/TailorMadeCTA'
import HowItWorks from '@/components/HowItWorks'
import Footer from '@/components/Footer'
import ToursListing from '@/components/ToursListing'

export const metadata: Metadata = {
  title: 'All Guided Tours & Adventures in Georgia',
  description: 'Browse all guided tours and adventures in Georgia — treks, summits, caving, canyoning, overlanding and more. Every trip is inquiry-based and fully tailored.',
}

export default function ToursPage() {
  return (
    <>
      {/* Slim photo banner */}
      <section style={{ position: 'relative', background: '#1E1C19' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src="/images/tours/hero.avif"
            alt="Adventure in the Georgian Caucasus"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 40%', opacity: 0.48 }}
          />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1320, margin: '0 auto', padding: '150px 28px 72px' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 22, fontSize: 13, color: 'rgba(255,255,255,.5)', fontFamily: 'var(--font-hanken), sans-serif' }}>
            <Link href="/en" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            <span style={{ color: 'rgba(255,255,255,.8)' }}>Adventures</span>
          </nav>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: 16, fontFamily: 'var(--font-hanken), sans-serif' }}>
            Adventure Experts Georgia
          </div>
          <h1 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(38px,5.5vw,64px)', lineHeight: 1.02, letterSpacing: '-.01em', color: '#fff', margin: '0 0 18px' }}>
            Our Adventures
          </h1>
          <p style={{ margin: 0, maxWidth: 580, fontSize: 'clamp(16px,1.4vw,18px)', lineHeight: 1.55, color: 'rgba(255,255,255,.72)', fontFamily: 'var(--font-hanken), sans-serif' }}>
            Guided treks, summits, caves and overland journeys across the Caucasus — every trip is tailored, so browse, then enquire and we&apos;ll build it around you.
          </p>
        </div>
      </section>

      {/* Interactive listing */}
      <Suspense>
        <ToursListing />
      </Suspense>

      {/* Tailor-made CTA */}
      <TailorMadeCTA />

      {/* How it works */}
      <HowItWorks />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp */}
    </>
  )
}

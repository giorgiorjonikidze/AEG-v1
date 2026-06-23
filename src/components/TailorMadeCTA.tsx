import Link from 'next/link'

export default function TailorMadeCTA() {
  return (
    <section style={{ background: '#213A29', padding: '96px 0', color: '#fff', fontFamily: 'var(--font-dm-sans), sans-serif', textAlign: 'center' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 clamp(20px,5vw,48px)' }}>
        <div style={{ fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 18, fontWeight: 500 }}>Tailor-Made</div>
        <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 500, fontSize: 'clamp(34px,5vw,54px)', lineHeight: 1.06, margin: '0 0 22px', letterSpacing: '-.5px' }}>
          Want a Trip Designed Around You?
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.72, color: 'rgba(255,255,255,.75)', margin: '0 0 40px' }}>
          Tell us your dates, group size, interests, and fitness level, and we&apos;ll craft a private itinerary — hiking, climbing, caving, biking, overlanding, or a mix, with as much Georgian food and culture as you like.
        </p>
        <Link
          href="/en/contact"
          style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 15, fontWeight: 500, letterSpacing: '.2px', color: '#fff', textDecoration: 'none', background: '#9B4E30', padding: '16px 36px', borderRadius: 5, display: 'inline-block' }}
        >
          Request a Custom Trip
        </Link>
      </div>
    </section>
  )
}

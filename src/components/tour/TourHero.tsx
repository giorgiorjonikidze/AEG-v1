'use client'
import Image from 'next/image'
import Link from 'next/link'
import type { TourData } from '@/data/tours'

const QUICK_FACTS = (tour: TourData) => tour.isDayTour ? [
  { label: 'Tour type', value: 'Private' },
  { label: 'Duration', value: tour.quickFacts.duration },
  { label: 'Start / End', value: `${tour.quickFacts.start} / ${tour.quickFacts.end}` },
  { label: 'Activity', value: tour.quickFacts.activity },
  { label: 'Difficulty', value: tour.quickFacts.difficulty },
  { label: 'Group size', value: `Up to ${tour.maxTravelers ?? 12}` },
] : [
  { label: 'Tour type', value: 'Private' },
  { label: 'Duration', value: tour.quickFacts.duration },
  { label: 'Start / End', value: `${tour.quickFacts.start} / ${tour.quickFacts.end}` },
  { label: 'Activity', value: tour.quickFacts.activity },
  { label: 'Difficulty', value: tour.quickFacts.difficulty },
  { label: 'Accommodation', value: tour.quickFacts.accommodation },
]

export default function TourHero({ tour, priceStr }: { tour: TourData; priceStr: string }) {
  return (
    <section className="tp-hero" style={{ position: 'relative', minHeight: 'min(92vh, 780px)', display: 'flex', alignItems: 'flex-end', background: '#1E1C19', overflow: 'hidden' }}>
      <style>{`
        @keyframes heroFade { from { opacity:0; transform:scale(1.03) } to { opacity:1; transform:scale(1) } }
        .tour-hero-img { animation: heroFade 1.2s ease forwards; }
        @media(max-width:768px){
          .tour-hero-grid { grid-template-columns: 1fr 1fr !important; }
          .tour-hero-btns { flex-direction: column !important; }
          .tour-hero-btns a { text-align:center; }
        }
      `}</style>

      {/* Hero image */}
      <div className="tour-hero-img" style={{ position: 'absolute', inset: 0 }}>
        <Image src={tour.heroImage} alt={tour.name} fill priority style={{ objectFit: 'cover', objectPosition: 'center 30%' }} />
      </div>

      {/* Gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,12,10,.72) 0%, rgba(15,12,10,.28) 70%, transparent 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,12,10,.88) 0%, rgba(15,12,10,.3) 50%, transparent 100%)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1280, margin: '0 auto', padding: 'clamp(100px,14vw,160px) 28px 52px' }}>
        {/* Category chip */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(199,90,55,.9)', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 99, marginBottom: 18, fontFamily: 'var(--font-hanken), sans-serif' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z" /></svg>
          {tour.category}
        </div>

        {/* Heading */}
        <h1 style={{ fontFamily: 'var(--font-spectral), serif', fontSize: 'clamp(36px,5.5vw,72px)', fontWeight: 500, lineHeight: 1.04, letterSpacing: '-.02em', color: '#fff', margin: '0 0 16px', maxWidth: 800 }}>
          {tour.name}
        </h1>

        {/* Emotional line */}
        <p style={{ fontSize: 'clamp(15px,1.4vw,18px)', lineHeight: 1.55, color: 'rgba(255,255,255,.75)', margin: '0 0 28px', maxWidth: 540, fontFamily: 'var(--font-hanken), sans-serif' }}>
          {tour.emotionalLine}
        </p>

        {/* Price */}
        <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 7, background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 12, padding: '10px 18px', marginBottom: 32, fontFamily: 'var(--font-hanken), sans-serif' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.6)', letterSpacing: '.1em', textTransform: 'uppercase' }}>From</span>
          <span style={{ fontFamily: 'var(--font-spectral), serif', fontSize: 28, fontWeight: 600, color: '#fff', lineHeight: 1 }}>{priceStr}</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,.6)' }}>/ person</span>
        </div>

        {/* CTAs */}
        <div className="tour-hero-btns" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 44 }}>
          <a href="#enquire" style={{ display: 'inline-block', background: '#C75A37', color: '#fff', padding: '15px 30px', borderRadius: 12, fontSize: 16, fontWeight: 700, textDecoration: 'none', boxShadow: '0 10px 28px -8px rgba(199,90,55,.75)', fontFamily: 'var(--font-hanken), sans-serif' }}>
            Start Planning Your Trip
          </a>
        </div>

        {/* Quick facts strip */}
        <div className="tour-hero-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6,auto)', gap: '0 32px', borderTop: '1px solid rgba(255,255,255,.14)', paddingTop: 24 }}>
          {QUICK_FACTS(tour).map(f => (
            <div key={f.label} style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)', marginBottom: 4 }}>{f.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{f.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { FEATURED_TOURS } from '@/lib/data'

const DAY_TOURS = FEATURED_TOURS.filter(t => t.duration === '1 day').slice(0, 3)
const TILES = ['Cuisine & Wine', 'Medieval Architecture', 'Ancient History', 'Mountain Trails']

export default function DayToursSection() {
  return (
    <section style={{ background: '#1E1C19', color: '#fff', fontFamily: 'var(--font-dm-sans), sans-serif' }}>

      {/* Immersive header */}
      <div style={{ position: 'relative', minHeight: 520, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <Image
          src="/images/martvili.jpg"
          alt="Martvili Canyon, Georgia"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,12,10,.45) 0%, rgba(15,12,10,.72) 100%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1320, margin: '0 auto', padding: '80px clamp(20px,5vw,48px)', width: '100%' }}>
          <div style={{ fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: 14, fontWeight: 500 }}>Day Tours</div>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 500, fontSize: 'clamp(36px,5vw,60px)', lineHeight: 1.04, margin: '0 0 24px', letterSpacing: '-.6px', maxWidth: 720 }}>More Than Mountains</h2>
          <p style={{ fontSize: 17, lineHeight: 1.72, color: 'rgba(255,255,255,.82)', maxWidth: 640, margin: '0 0 40px' }}>
            Beyond the trails lies a country layered with history — cliff-top monasteries, cave cities, frescoed churches, and old stone towns. Our day tours pair the outdoors with the flavors and stories of Georgia: a hike to a medieval fortress, a table of khinkali and homemade wine, a walk through streets older than most nations. Adventure by day, culture all the way through — and back by evening.
          </p>

          {/* Themed tiles — 2-col mobile, 4-col desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-[560px] md:max-w-none">
            {TILES.map(tile => (
              <div key={tile} style={{ background: 'rgba(255,255,255,.10)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 5, padding: '12px 16px', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,.9)' }}>
                {tile}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Day tour cards */}
      {DAY_TOURS.length > 0 && (
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '48px clamp(20px,5vw,48px) 64px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DAY_TOURS.map(t => (
              <Link key={t.id} href={t.href} style={{ textDecoration: 'none', background: 'rgba(255,255,255,.06)', borderRadius: 5, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,.10)' }}>
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#2a2620' }}>
                  <Image src={t.image} alt={t.name} fill sizes="(min-width:768px) 50vw, 100vw" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '18px 20px 20px' }}>
                  <div style={{ fontSize: 10.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)', marginBottom: 8 }}>{t.activity}</div>
                  <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 500, fontSize: 22, lineHeight: 1.18, margin: '0 0 6px', color: '#fff' }}>{t.name}</h3>
                  <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.6)', margin: '0 0 16px' }}>{t.hook}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,.55)' }}>From <strong style={{ color: '#fff', fontFamily: 'var(--font-source-serif), serif', fontSize: 18 }}>{t.price}</strong></span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#C75A37', display: 'flex', alignItems: 'center', gap: 5 }}>
                      View tour
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <Link href="/en/tours/day-tours" style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,.7)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7, borderBottom: '1px solid rgba(255,255,255,.25)', paddingBottom: 2 }}>
              See all day tours
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

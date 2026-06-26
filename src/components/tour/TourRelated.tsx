import Link from 'next/link'
import Image from 'next/image'
import type { TourData } from '@/data/tours'

export default function TourRelated({ tour }: { tour: TourData }) {
  if (tour.relatedTours.length === 0) return null

  return (
    <section className="tp-related" style={{ padding: '72px 0', background: '#FAF8F3', marginTop: 64 }}>
      <style>{`
        .related-grid { display:grid; grid-template-columns:1fr; gap:20px; }
        @media(min-width:640px){ .related-grid { grid-template-columns:repeat(2,1fr); } }
        @media(min-width:1024px){ .related-grid { grid-template-columns:repeat(4,1fr); } }
        .related-card:hover .related-img { transform:scale(1.05); }
        .related-card:hover .related-name { color:#C75A37 !important; }
      `}</style>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#C75A37', marginBottom: 10, fontFamily: 'var(--font-hanken), sans-serif' }}>Related tours</div>
          <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontSize: 'clamp(26px,3vw,36px)', fontWeight: 500, color: '#1E1C19', margin: 0, lineHeight: 1.15 }}>You might also like</h2>
        </div>

        <div className="related-grid">
          {tour.relatedTours.map(rt => (
            <Link key={rt.slug} href={`/en/tours/${rt.slug}`} className="related-card" style={{ textDecoration: 'none', display: 'block', background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(30,28,25,.07)', boxShadow: '0 4px 20px -10px rgba(30,28,25,.14)', transition: 'box-shadow .3s' }}>
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image className="related-img" src={rt.image} alt={rt.name} fill style={{ objectFit: 'cover', transition: 'transform .4s ease' }} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,28,25,.6) 0%, transparent 50%)' }} />
                <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(199,90,55,.9)', color: '#fff', fontSize: 10.5, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, padding: '4px 10px', borderRadius: 99, fontFamily: 'var(--font-hanken), sans-serif' }}>
                  {rt.region}
                </div>
              </div>
              <div style={{ padding: '18px 18px 20px' }}>
                <h3 className="related-name" style={{ fontFamily: 'var(--font-spectral), serif', fontSize: 17, fontWeight: 500, color: '#1E1C19', margin: '0 0 10px', lineHeight: 1.25, transition: 'color .2s' }}>{rt.name}</h3>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: '#6F6A60', fontFamily: 'var(--font-hanken), sans-serif' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                    {rt.duration}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: '#6F6A60', fontFamily: 'var(--font-hanken), sans-serif' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
                    {rt.difficulty}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

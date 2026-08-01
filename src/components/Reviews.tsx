import Link from 'next/link'
import { REVIEWS, GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_REVIEWS_URL } from '@/data/reviews'

const STAR = '#E1A730'

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span aria-label={`${rating} out of 5 stars`} style={{ display: 'inline-flex', gap: 2, color: STAR, fontSize: size, lineHeight: 1 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden style={{ opacity: i < rating ? 1 : 0.22 }}>★</span>
      ))}
    </span>
  )
}

function GoogleG({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden style={{ flexShrink: 0 }}>
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  )
}

function initials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

export default function Reviews({ rows = false, tourSlug }: { rows?: boolean; tourSlug?: string }) {
  // Feature any review tagged for this tour first.
  const ordered = tourSlug
    ? [...REVIEWS].sort((a, b) => Number(b.tourSlug === tourSlug) - Number(a.tourSlug === tourSlug))
    : REVIEWS

  return (
    <section style={{ background: '#F5F0E8', padding: '80px 0 88px', color: '#1E1C19', fontFamily: 'var(--font-hanken), sans-serif' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(20px,5vw,48px)' }}>

        <div style={{ marginBottom: 44, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 18 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#A8A296', marginBottom: 12, fontWeight: 500 }}>Reviews</div>
            <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(30px,4vw,44px)', lineHeight: 1.06, margin: 0, letterSpacing: '-.4px', maxWidth: '18ch' }}>
              What Our Travelers Say
            </h2>
          </div>
          {/* Aggregate rating from the Google Business Profile */}
          <Link
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }}
          >
            <GoogleG size={20} />
            <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                <strong style={{ fontSize: 17, fontWeight: 700 }}>{GOOGLE_RATING.toFixed(1)}</strong>
                <Stars rating={5} size={15} />
              </span>
              <span style={{ fontSize: 12.5, color: '#79736A' }}>{GOOGLE_REVIEW_COUNT} reviews on Google</span>
            </span>
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: rows ? 'repeat(auto-fit, minmax(300px, 1fr))' : 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {ordered.map(r => (
            <figure key={r.author} style={{ background: '#fff', borderRadius: 5, padding: '28px', boxShadow: '0 4px 24px -12px rgba(30,28,25,.14)', display: 'flex', flexDirection: 'column', gap: 16, margin: 0 }}>
              <Stars rating={r.rating} size={17} />
              <blockquote style={{ fontFamily: 'var(--font-spectral), serif', fontSize: 19, fontWeight: 500, lineHeight: 1.45, margin: 0, color: '#1E1C19' }}>
                “{r.text}”
              </blockquote>
              <figcaption style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span aria-hidden style={{ width: 40, height: 40, flexShrink: 0, borderRadius: '50%', background: '#C75A37', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 600 }}>
                  {initials(r.author)}
                </span>
                <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 14.5, fontWeight: 600 }}>{r.author}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#79736A' }}>
                    <GoogleG size={12} /> Posted on Google · {r.date}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p style={{ margin: '32px 0 0', fontSize: 14.5, color: '#79736A', maxWidth: '62ch', lineHeight: 1.6 }}>
          We publish only genuine reviews from our own travelers. Traveled with us? We&apos;d love to hear how it went — <Link href="/en/contact" style={{ color: '#C75A37', fontWeight: 600, textDecoration: 'none' }}>tell us about your trip</Link>.
        </p>

      </div>
    </section>
  )
}

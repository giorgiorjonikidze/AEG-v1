import Link from 'next/link'

const POINTS = [
  {
    title: 'Certified, not just enthusiastic',
    text: 'Our founder is a UIMLA-certified mountain guide with 10+ years across the Caucasus, and every trip runs with certified local guides.',
  },
  {
    title: 'Small groups, real places',
    text: 'We keep departures small and take you to the valleys, villages and routes we actually come from — not a rebranded bus tour.',
  },
  {
    title: 'Honest from day one',
    text: 'We publish only reviews from our own travelers. As a new company, we\'d rather show you none than show you invented ones.',
  },
]

export default function Reviews({ rows = false }: { rows?: boolean }) {
  return (
    <section style={{ background: '#F5F0E8', padding: '80px 0 88px', color: '#1E1C19', fontFamily: 'var(--font-hanken), sans-serif' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(20px,5vw,48px)' }}>

        <div style={{ marginBottom: 44, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 18 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#A8A296', marginBottom: 12, fontWeight: 500 }}>Reviews</div>
            <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(30px,4vw,44px)', lineHeight: 1.06, margin: 0, letterSpacing: '-.4px', maxWidth: '18ch' }}>
              Our First Reviews Are Being Written
            </h2>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#C75A37', color: '#fff', fontSize: 12, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', padding: '8px 14px', borderRadius: 99 }}>
            New for {new Date().getFullYear()}
          </span>
        </div>

        <div className={rows ? '' : undefined} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {POINTS.map(p => (
            <div key={p.title} style={{ background: '#fff', borderRadius: 5, padding: '28px', boxShadow: '0 4px 24px -12px rgba(30,28,25,.14)', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontFamily: 'var(--font-spectral), serif', fontSize: 20, fontWeight: 500, lineHeight: 1.25 }}>{p.title}</div>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: '#5C564E', margin: 0 }}>{p.text}</p>
            </div>
          ))}
        </div>

        <p style={{ margin: '32px 0 0', fontSize: 14.5, color: '#79736A', maxWidth: '62ch', lineHeight: 1.6 }}>
          Traveled with us? We&apos;d love to hear how it went — <Link href="/en/contact" style={{ color: '#C75A37', fontWeight: 600, textDecoration: 'none' }}>tell us about your trip</Link> and your words may be the first on this page.
        </p>

      </div>
    </section>
  )
}

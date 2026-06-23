import { REVIEWS } from '@/lib/data'

const Stars = ({ n }: { n: number }) => (
  <div style={{ display: 'flex', gap: 3 }}>
    {Array.from({ length: n }).map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#C75A37" stroke="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
)

export default function Reviews() {
  return (
    <section style={{ background: '#F5F0E8', padding: '80px 0 88px', color: '#1E1C19', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(20px,5vw,48px)' }}>

        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#A8A296', marginBottom: 12, fontWeight: 500 }}>Reviews</div>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 500, fontSize: 'clamp(30px,4vw,44px)', lineHeight: 1.06, margin: 0, letterSpacing: '-.4px' }}>What Our Travelers Say</h2>
        </div>

        {/* Review cards — stacked on mobile, 3-across on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map(r => (
            <div key={r.id} style={{ background: '#fff', borderRadius: 5, padding: '28px', boxShadow: '0 4px 24px -12px rgba(30,28,25,.14)', display: 'flex', flexDirection: 'column', gap: 18 }}>
              <Stars n={r.stars} />
              <p style={{ fontSize: 15.5, lineHeight: 1.68, color: '#2a2620', margin: 0, flex: 1, fontStyle: 'italic' }}>
                &ldquo;{r.quote}&rdquo;
              </p>
              <div style={{ borderTop: '1px solid #ECE7DC', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 13, color: '#A8A296', fontWeight: 500 }}>— {r.tour}, {r.date}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 999, background: '#213A29', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{r.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1E1C19' }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: '#A8A296' }}>{r.country}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: '#A8A296', fontWeight: 500, background: '#F1ECE1', padding: '3px 8px', borderRadius: 3 }}>via {r.source}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

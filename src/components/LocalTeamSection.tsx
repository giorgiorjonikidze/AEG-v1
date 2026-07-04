export default function LocalTeamSection() {
  const trustPoints = [
    'Certified professional guides',
    'Licensed & insured',
    'Born-and-raised local experts',
    'Private tours only',
  ]

  return (
    <section id="local-team" style={{ background: '#FAF8F3', padding: '80px 0', color: '#1E1C19', fontFamily: 'var(--font-dm-sans), sans-serif', scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(20px,5vw,48px)' }}>

        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#A8A296', marginBottom: 14, fontWeight: 500 }}>Who We Are</div>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 500, fontSize: 'clamp(32px,4vw,46px)', lineHeight: 1.08, margin: '0 0 24px', letterSpacing: '-.5px', color: '#1E1C19' }}>
            Your Local Adventure Team in Georgia
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.72, color: '#4a4540', margin: 0 }}>
            Adventure Experts Georgia creates guided outdoor and cultural experiences across one of the most diverse countries in the Caucasus. From high mountain trails and remote valleys to caves, cliffs, ancient villages, and off-road routes, we help travelers discover Georgia beyond the usual tourist path.
          </p>
        </div>

        {/* Trust row — 2-column on mobile, 4-across on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-8" style={{ margin: '44px auto 0', maxWidth: 720 }}>
          {trustPoints.map(point => (
            <div key={point} style={{ display: 'flex', alignItems: 'center', gap: 11, justifyContent: 'center' }}>
              <span style={{ width: 22, height: 22, borderRadius: 999, background: 'rgba(33,58,41,.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#213A29" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </span>
              <span style={{ fontSize: 14.5, fontWeight: 500, color: '#1E1C19', lineHeight: 1.4 }}>{point}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

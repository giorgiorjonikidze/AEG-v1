import type { TourData } from '@/data/tours'

export default function TourInclusions({ tour }: { tour: TourData }) {
  return (
    <section id="details" className="tp-inclusions" style={{ padding: '52px 0 0' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#C75A37', marginBottom: 10, fontFamily: 'var(--font-hanken), sans-serif' }}>Details</div>
      <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontSize: 'clamp(26px,3vw,36px)', fontWeight: 500, color: '#1E1C19', margin: '0 0 28px', lineHeight: 1.15 }}>What&rsquo;s included</h2>

      <style>{`
        .incl-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media(min-width:640px){ .incl-grid { grid-template-columns: 1fr 1fr; } }
        .incl-bring-cols { columns: 1; column-gap: 24px; }
        @media(min-width:640px){ .incl-bring-cols { columns: 2; } }
      `}</style>

      <div className="incl-grid">
        {/* Included */}
        <div style={{ background: '#fff', border: '1px solid rgba(30,28,25,.07)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid rgba(30,28,25,.07)', background: 'rgba(74,155,111,.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A9B6F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#4A9B6F', fontFamily: 'var(--font-hanken), sans-serif' }}>Included</span>
          </div>
          <ul style={{ margin: 0, padding: '16px 22px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
            {tour.included.map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: 'var(--font-hanken), sans-serif' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4A9B6F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M20 6 9 17l-5-5"/></svg>
                <span style={{ fontSize: 14, lineHeight: 1.4, color: '#3D3A35' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not included */}
        <div style={{ background: '#fff', border: '1px solid rgba(30,28,25,.07)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid rgba(30,28,25,.07)', background: 'rgba(168,162,150,.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A8A296" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#A8A296', fontFamily: 'var(--font-hanken), sans-serif' }}>Not included</span>
          </div>
          <ul style={{ margin: 0, padding: '16px 22px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
            {tour.notIncluded.map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: 'var(--font-hanken), sans-serif' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A8A296" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M18 6 6 18M6 6l12 12"/></svg>
                <span style={{ fontSize: 14, lineHeight: 1.4, color: '#6F6A60' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Accommodation — hidden for day tours */}
      {tour.accommodation.length > 0 && (
        <div style={{ marginTop: 20, background: '#FAF8F3', border: '1px solid #EDE4D6', borderRadius: 16, padding: '22px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1E1C19', marginBottom: 14, fontFamily: 'var(--font-hanken), sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Accommodation
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {tour.accommodation.map(a => (
              <li key={a} style={{ fontSize: 14, color: '#3D3A35', fontFamily: 'var(--font-hanken), sans-serif', paddingLeft: 18, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#C09F7E' }}>·</span>{a}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* What to bring */}
      <div style={{ marginTop: 20, background: '#FAF8F3', border: '1px solid #EDE4D6', borderRadius: 16, padding: '22px 24px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1E1C19', marginBottom: 14, fontFamily: 'var(--font-hanken), sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
          What to bring
        </div>
        <div className="incl-bring-cols">
          {tour.whatToBring.map(item => (
            <div key={item} style={{ fontSize: 14, color: '#3D3A35', fontFamily: 'var(--font-hanken), sans-serif', marginBottom: 8, breakInside: 'avoid', paddingLeft: 18, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: '#C09F7E' }}>·</span>{item}
            </div>
          ))}
        </div>
      </div>

      {/* Best season */}
      <div style={{ marginTop: 20, background: '#FAF8F3', border: '1px solid #EDE4D6', borderRadius: 16, padding: '22px 24px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1E1C19', marginBottom: 16, fontFamily: 'var(--font-hanken), sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          Best season
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tour.season.map(s => (
            <div key={s.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 52, height: 8, borderRadius: 99, background: s.rating === 'excellent' ? '#4A9B6F' : s.rating === 'good' ? '#E8A44A' : '#EDE4D6' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#6F6A60', fontFamily: 'var(--font-hanken), sans-serif' }}>{s.month}</span>
            </div>
          ))}
          <div style={{ marginLeft: 8, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#A8A296', fontFamily: 'var(--font-hanken), sans-serif' }}>
              <div style={{ width: 16, height: 6, borderRadius: 99, background: '#4A9B6F' }} />Excellent
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#A8A296', fontFamily: 'var(--font-hanken), sans-serif' }}>
              <div style={{ width: 16, height: 6, borderRadius: 99, background: '#E8A44A' }} />Good
            </div>
          </div>
        </div>
        <p style={{ margin: '14px 0 0', fontSize: 12.5, color: '#A8A296', fontFamily: 'var(--font-hanken), sans-serif' }}>Mountain weather can change quickly — your guide monitors conditions and adapts the plan.</p>
      </div>
    </section>
  )
}

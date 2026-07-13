import type { TourData } from '@/data/tours'

export default function TourOverview({ tour }: { tour: TourData }) {
  return (
    <section className="tp-overview" style={{ padding: '52px 0 0' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#C75A37', marginBottom: 10, fontFamily: 'var(--font-hanken), sans-serif' }}>Overview</div>
      <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontSize: 'clamp(26px,3vw,36px)', fontWeight: 500, color: '#1E1C19', margin: '0 0 20px', lineHeight: 1.15 }}>
        {tour.overviewHeading ?? `Discover ${tour.region.replace(/,\s*Georgia$/i, '')}`}
      </h2>
      <p style={{ fontSize: 16, lineHeight: 1.7, color: '#3D3A35', margin: '0 0 36px', fontFamily: 'var(--font-hanken), sans-serif', maxWidth: '68ch' }}>
        {tour.overview}
      </p>

      {/* Highlights */}
      <div style={{ background: 'rgba(46,64,52,.04)', border: '1px solid rgba(46,64,52,.1)', borderRadius: 16, padding: '28px 32px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: '#2E4034', marginBottom: 18, fontFamily: 'var(--font-hanken), sans-serif' }}>
          Trip highlights
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', columns: 2, columnGap: 32 }}>
          {tour.highlights.map(h => (
            <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12, breakInside: 'avoid', fontFamily: 'var(--font-hanken), sans-serif' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C75A37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 3, flexShrink: 0 }}><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
              <span style={{ fontSize: 14.5, color: '#3D3A35', lineHeight: 1.45 }}>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

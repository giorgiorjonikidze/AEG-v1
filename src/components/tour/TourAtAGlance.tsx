import type { TourData } from '@/data/tours'

const ICONS: Record<string, React.ReactNode> = {
  clock: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  'map-pin': <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  mountain: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 20 5-9 4 6 3-4 6 7"/></svg>,
  users: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1"/><circle cx="9" cy="7" r="3.2"/><path d="M22 19v-1a4 4 0 0 0-3-3.85"/><path d="M16 4.2A4 4 0 0 1 16 11"/></svg>,
  activity: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  footprints: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 16s.5-1 2-1 2.5 2 4 2 2-1 2-1"/><path d="M2 20s.5-1 2-1 2.5 2 4 2 2-1 2-1"/><path d="M14 8s.5-1 2-1 2.5 2 4 2 2-1 2-1"/><path d="M12 12s.5-1 2-1 2.5 2 4 2 2-1 2-1"/></svg>,
  home: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  compass: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
  star: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
}

export default function TourAtAGlance({ tour }: { tour: TourData }) {
  return (
    <section id="overview" style={{ padding: '52px 0 8px' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#C75A37', marginBottom: 10, fontFamily: 'var(--font-hanken), sans-serif' }}>At a glance</div>
      <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontSize: 'clamp(26px,3vw,36px)', fontWeight: 500, color: '#1E1C19', margin: '0 0 28px', lineHeight: 1.15 }}>Trip summary</h2>

      <style>{`
        .glance-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        @media(min-width: 600px) { .glance-grid { grid-template-columns: repeat(3, 1fr); } }
        @media(min-width: 900px) { .glance-grid { grid-template-columns: repeat(4, 1fr); } }
        @keyframes cardIn { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
        .glance-card { animation: cardIn .5s ease both; }
      `}</style>

      <div className="glance-grid">
        {tour.summaryCards.map((card, i) => (
          <div key={card.label} className="glance-card" style={{ background: '#fff', border: '1px solid rgba(30,28,25,.07)', borderRadius: 14, padding: '18px 16px', display: 'flex', alignItems: 'flex-start', gap: 12, animationDelay: `${i * 50}ms` }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(199,90,55,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C75A37', flexShrink: 0 }}>
              {ICONS[card.icon] ?? ICONS.compass}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 11, color: '#A8A296', marginBottom: 3, fontFamily: 'var(--font-hanken), sans-serif' }}>{card.label}</div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1E1C19', lineHeight: 1.3, fontFamily: 'var(--font-hanken), sans-serif' }}>{card.value}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

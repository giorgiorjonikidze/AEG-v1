import type { TourData } from '@/data/tours'

const LEVEL_COLORS: Record<string, string> = {
  'Easy': '#4A9B6F',
  'Easy–Moderate': '#8DC26F',
  'Moderate': '#E8A44A',
  'Driving': '#A8A296',
  'Departure': '#A8A296',
}

function levelColor(text: string): string {
  for (const [key, color] of Object.entries(LEVEL_COLORS)) {
    if (text.toLowerCase().includes(key.toLowerCase())) return color
  }
  return '#A8A296'
}

export default function TourDifficulty({ tour }: { tour: TourData }) {
  return (
    <section className="tp-difficulty" style={{ padding: '52px 0 0' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#C75A37', marginBottom: 10, fontFamily: 'var(--font-hanken), sans-serif' }}>Difficulty</div>
      <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontSize: 'clamp(26px,3vw,36px)', fontWeight: 500, color: '#1E1C19', margin: '0 0 24px', lineHeight: 1.15 }}>Activity level</h2>

      <div style={{ display: 'grid', gap: 8, marginBottom: 24 }}>
        {tour.difficultyByDay.map((d, i) => {
          const [day, ...rest] = d.split(' — ')
          const desc = rest.join(' — ')
          const color = levelColor(desc)
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', border: '1px solid rgba(30,28,25,.07)', borderRadius: 12, padding: '13px 18px', fontFamily: 'var(--font-hanken), sans-serif' }}>
              <div style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 9, background: `${color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 11.5, fontWeight: 800, color }}>{`D${i + 1}`}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1E1C19', minWidth: 72 }}>{day}</span>
              <div style={{ flex: 1, height: 6, background: '#F0EDE8', borderRadius: 99, overflow: 'hidden', display: 'none' }} className="diff-bar">
                <div style={{ height: '100%', width: color === '#A8A296' ? '10%' : color === '#4A9B6F' ? '25%' : color === '#8DC26F' ? '45%' : '65%', background: color, borderRadius: 99, transition: 'width .6s ease' }} />
              </div>
              <span style={{ fontSize: 13, color: '#6F6A60', flex: 1 }}>{desc}</span>
              <span style={{ flexShrink: 0, fontSize: 11.5, fontWeight: 700, color, background: `${color}12`, padding: '3px 10px', borderRadius: 99 }}>
                {desc.split(' — ')[0]}
              </span>
            </div>
          )
        })}
      </div>

      <div style={{ background: 'rgba(46,64,52,.06)', border: '1px solid rgba(46,64,52,.12)', borderRadius: 14, padding: '18px 22px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E4034" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: '#2E4034', fontFamily: 'var(--font-hanken), sans-serif' }}>
          {tour.difficultyMessage}
        </p>
      </div>
    </section>
  )
}

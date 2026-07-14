'use client'
import { useEffect, useReducer, useRef } from 'react'
import type { TourData } from '@/data/tours'

const ICON_PATHS: Record<string, string> = {
  moveHorizontal: '<path d="m18 8 4 4-4 4"/><path d="M2 12h20"/><path d="m6 8-4 4 4 4"/>',
  mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
  car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><path d="M9 17h6"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
}

function StatIcon({ name }: { name: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] ?? '' }} />
  )
}

function iconForStat(s: { icon: string }) { return s.icon }

type DayInput = TourData['itinerary'][number]

interface DayStat {
  icon: string
  caption: string
  value: string
  optional: boolean
}

function buildStats(day: DayInput): DayStat[] {
  const stats: DayStat[] = []
  if (day.stats.distance) stats.push({ icon: 'moveHorizontal', caption: 'Distance', value: day.stats.distance, optional: false })
  if (day.stats.elevation) stats.push({ icon: 'mountain', caption: 'Elevation', value: day.stats.elevation, optional: false })
  if (day.stats.drive) stats.push({ icon: 'car', caption: 'Drive', value: day.stats.drive, optional: false })
  stats.push({ icon: 'moon', caption: 'Overnight', value: day.stats.overnight, optional: false })
  if (day.stats.optional) stats.push({ icon: 'plus', caption: 'Optional', value: day.stats.optional, optional: true })
  return stats
}

export default function TourItinerary({ tour }: { tour: TourData }) {
  const total = tour.itinerary.length
  const [open, dispatch] = useReducer(
    (state: Record<number, boolean>, action: { type: 'toggle'; i: number } | { type: 'all' }) => {
      if (action.type === 'all') {
        const allOpen = tour.itinerary.every((_, i) => !!state[i])
        if (allOpen) return {}
        const next: Record<number, boolean> = {}
        tour.itinerary.forEach((_, i) => { next[i] = true })
        return next
      }
      const next = { ...state }
      if (next[action.i]) delete next[action.i]; else next[action.i] = true
      return next
    },
    {}
  )

  const [reduced, setReduced] = useStateVal(false)
  const [mobile, setMobile] = useStateVal(false)

  useEffect(() => {
    const cleanups: (() => void)[] = []
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      const set = () => setReduced(mq.matches); set()
      if (mq.addEventListener) { mq.addEventListener('change', set); cleanups.push(() => mq.removeEventListener('change', set)) }
      else { mq.addListener(set); cleanups.push(() => mq.removeListener(set)) }
    } catch {}
    try {
      const mq = window.matchMedia('(max-width: 640px)')
      const set = () => setMobile(mq.matches); set()
      if (mq.addEventListener) { mq.addEventListener('change', set); cleanups.push(() => mq.removeEventListener('change', set)) }
      else { mq.addListener(set); cleanups.push(() => mq.removeListener(set)) }
    } catch {}
    return () => cleanups.forEach(fn => fn())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const allOpen = tour.itinerary.every((_, i) => !!open[i])

  const padLeft = mobile ? '30px' : '56px'
  const markerLeft = mobile ? '4px' : '22px'
  const markerTop = mobile ? '22px' : '30px'
  const lineLeft = mobile ? '9px' : '27px'
  const lineTop = mobile ? '30px' : '36px'
  const lineBottom = mobile ? '30px' : '36px'
  const btnPad = mobile ? '18px 14px 18px 30px' : '22px 6px 22px 56px'
  const panelTransition = reduced ? 'none' : 'max-height .42s cubic-bezier(.4,0,.2,1)'
  const chevronTransition = reduced ? 'none' : 'transform .35s ease'
  const markerTransition = reduced ? 'none' : 'background .3s ease, border-color .3s ease'

  return (
    <section id="itinerary" className="tp-itinerary" style={{ padding: '52px 0 0', marginTop: 32, borderRadius: 20, background: '#FAF8F3', fontFamily: "'Hanken Grotesk',system-ui,sans-serif", color: '#1E1C19' }}>
      <style>{`
        .itin-btn:hover { background: rgba(46,64,52,.025) !important; }
        .itin-btn:focus { outline: 2px solid #C75A37; outline-offset: -3px; border-radius: 6px; }
        @media(prefers-reduced-motion:reduce){ .itin-panel,.itin-chevron,.itin-marker { transition:none!important; } }
      `}</style>

      <div style={{ padding: '0 clamp(16px,4vw,40px)' }}>
      <div>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', paddingBottom: 22, borderBottom: '1px solid #ECE7DC', marginBottom: 6 }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C75A37', fontWeight: 600, marginBottom: 10 }}>Itinerary</div>
            <h2 style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 'clamp(30px,5vw,44px)', lineHeight: 1.05, margin: 0, color: '#1E1C19' }}>Day-by-Day</h2>
          </div>
          <button
            aria-label="Toggle all days"
            onClick={() => dispatch({ type: 'all' })}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, letterSpacing: '.02em', color: '#C75A37', padding: '8px 2px' }}
          >
            <svg aria-hidden="true" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
              <path d="m7 15 5 5 5-5" /><path d="m7 9 5-5 5 5" />
            </svg>
            {allOpen ? 'Collapse all' : 'Expand all'}
          </button>
        </div>

        {/* Timeline + days */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div aria-hidden="true" style={{ position: 'absolute', left: lineLeft, top: lineTop, bottom: lineBottom, width: 2, background: 'linear-gradient(#CFC8BA,#E8E2D6)', borderRadius: 2 }} />

          {tour.itinerary.map((day, i) => {
            const isOpen = !!open[i]
            const stats = buildStats(day)

            // difficulty label from difficultyByDay
            const diffLine = tour.difficultyByDay[i] ?? ''
            const diff = diffLine.includes(' — ') ? diffLine.split(' — ').slice(1).join(' — ').split(' — ')[0] : day.stats.overnight

            return (
              <article key={day.day} style={{ position: 'relative', borderBottom: '1px solid #ECE7DC' }}>
                {/* Marker */}
                <div
                  aria-hidden="true"
                  className="itin-marker"
                  style={{
                    position: 'absolute', left: markerLeft, top: markerTop,
                    width: 12, height: 12, borderRadius: '50%', boxSizing: 'border-box',
                    background: isOpen ? '#C75A37' : '#FFFFFF',
                    border: `2px solid ${isOpen ? '#C75A37' : '#CFC8BA'}`,
                    transition: markerTransition,
                    zIndex: 1,
                  }}
                />

                {/* Toggle button */}
                <button
                  className="itin-btn"
                  aria-expanded={isOpen}
                  onClick={() => dispatch({ type: 'toggle', i })}
                  style={{
                    display: 'flex',
                    flexDirection: mobile ? 'column' : 'row',
                    alignItems: mobile ? 'stretch' : 'center',
                    gap: mobile ? '9px' : '16px',
                    width: '100%', textAlign: 'left',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    padding: btnPad, fontFamily: 'inherit', color: 'inherit',
                  }}
                >
                  {mobile ? (
                    <>
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, width: '100%' }}>
                        <span style={{ fontSize: 11, letterSpacing: '.13em', textTransform: 'uppercase', color: '#C75A37', fontWeight: 700 }}>Day {day.day}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.02em', color: '#2E4034', background: 'rgba(46,64,52,.08)', border: '1px solid rgba(46,64,52,.16)', padding: '5px 11px', borderRadius: 999, whiteSpace: 'nowrap' }}>{getDiffShort(tour, i)}</span>
                          <svg aria-hidden="true" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
                            className="itin-chevron" style={{ flex: 'none', color: '#A8A296', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: chevronTransition }}>
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </span>
                      </span>
                      <span style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 20, lineHeight: 1.22, color: '#1E1C19' }}>{day.title}</span>
                    </>
                  ) : (
                    <>
                      <span style={{ flex: 'none', minWidth: 44, fontSize: 11, letterSpacing: '.13em', textTransform: 'uppercase', color: '#C75A37', fontWeight: 700 }}>Day {day.day}</span>
                      <span style={{ flex: 1, fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 'clamp(17px,2.3vw,22px)', lineHeight: 1.25, color: '#1E1C19' }}>{day.title}</span>
                      <span style={{ flex: 'none', fontSize: 11, fontWeight: 600, letterSpacing: '.02em', color: '#2E4034', background: 'rgba(46,64,52,.08)', border: '1px solid rgba(46,64,52,.16)', padding: '5px 11px', borderRadius: 999, whiteSpace: 'nowrap' }}>{getDiff(tour, i)}</span>
                      <svg aria-hidden="true" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
                        className="itin-chevron" style={{ flex: 'none', color: '#A8A296', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: chevronTransition }}>
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Panel */}
                <div className="itin-panel" style={{ maxHeight: isOpen ? '480px' : '0px', overflow: 'hidden', transition: panelTransition }}>
                  <div style={{ opacity: isOpen ? 1 : 0, transition: reduced ? 'none' : `opacity .3s ease ${isOpen ? '.08s' : '0s'}` }}>
                    <div style={{ padding: `2px 8px 28px ${padLeft}` }}>
                      <p style={{ margin: '0 0 18px', maxWidth: '62ch', fontSize: 16, lineHeight: 1.65, color: '#4A463E' }}>{day.narrative}</p>
                      {stats.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                          {stats.map((stat, si) => stat.optional ? (
                            <span key={si} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '8px 13px', background: 'transparent', border: '1px dashed #D5CEC0', borderRadius: 10 }}>
                              <span style={{ display: 'inline-flex', color: '#A8A296' }}><StatIcon name={stat.icon} /></span>
                              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.25 }}>
                                <span style={{ fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: '#A8A296', fontWeight: 700 }}>Optional</span>
                                <span style={{ fontSize: 13.5, color: '#7C766A', fontWeight: 500 }}>{stat.value}</span>
                              </span>
                            </span>
                          ) : (
                            <span key={si} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '8px 13px', background: '#FFFFFF', border: '1px solid #ECE7DC', borderRadius: 10 }}>
                              <span style={{ display: 'inline-flex', color: '#2E4034' }}><StatIcon name={stat.icon} /></span>
                              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.25 }}>
                                <span style={{ fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: '#A8A296', fontWeight: 700 }}>{stat.caption}</span>
                                <span style={{ fontSize: 13.5, color: '#1E1C19', fontWeight: 500 }}>{stat.value}</span>
                              </span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* Map */}
      <div style={{ marginTop: 40 }}>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #ECE7DC', boxShadow: '0 4px 20px -8px rgba(30,28,25,.14)' }}>
          <iframe
            title="Svaneti tour route map"
            src="https://maps.google.com/maps?q=svaneti+georgia&z=9&output=embed"
            width="100%"
            height="420"
            style={{ display: 'block', border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p style={{ margin: '10px 0 0', fontSize: 12, color: '#A8A296', textAlign: 'center', fontFamily: "'Hanken Grotesk',sans-serif" }}>
          Svaneti region — Georgia
        </p>
      </div>

      </div>
    </section>
  )
}

function getDiff(tour: TourData, i: number): string {
  const line = tour.difficultyByDay[i] ?? ''
  if (!line.includes(' — ')) return line
  const parts = line.split(' — ')
  return parts[1] ?? parts[0]
}

// Short rating only ("Moderate", "Very hard") — the full description pill
// never wraps and blows out the mobile layout width.
function getDiffShort(tour: TourData, i: number): string {
  const line = tour.difficultyByDay[i] ?? ''
  return line.split(' — ')[0]
}

function useStateVal<T>(initial: T): [T, (v: T) => void] {
  const ref = useRef(initial)
  const [, forceRender] = useReducer(x => x + 1, 0)
  function set(v: T) { ref.current = v; forceRender() }
  return [ref.current, set]
}

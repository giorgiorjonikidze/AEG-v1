'use client'
import type { TourData } from '@/data/tours'

// Draws a driving route through the tour's waypoints when `mapRoute` is set,
// otherwise falls back to a simple region pin.
function mapEmbedSrc(tour: TourData): string {
  const enc = (place: string) => encodeURIComponent(`${place}, Georgia`)
  if (tour.mapRoute && tour.mapRoute.length >= 2) {
    const [origin, ...rest] = tour.mapRoute
    return `https://maps.google.com/maps?saddr=${enc(origin)}&daddr=${rest.map(enc).join('+to:')}&output=embed`
  }
  return `https://maps.google.com/maps?q=${encodeURIComponent(tour.region)}&z=9&output=embed`
}

export default function DayTourItinerary({ tour }: { tour: TourData }) {
  const stops = tour.stops ?? []

  return (
    <section id="itinerary" className="tp-itinerary" style={{ marginTop: 32, borderRadius: 20, background: '#FFFFFF', border: '1px solid rgba(30,28,25,.07)', padding: 'clamp(26px,4vw,44px)', fontFamily: "'Hanken Grotesk',system-ui,sans-serif" }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#C75A37', marginBottom: 10 }}>
        Today&rsquo;s Route
      </div>
      <h2 style={{ fontFamily: "'Spectral',serif", fontSize: 'clamp(24px,2.8vw,34px)', fontWeight: 500, color: '#1E1C19', margin: '0 0 32px', lineHeight: 1.15 }}>
        Itinerary
      </h2>

      <div style={{ position: 'relative' }}>
        {/* Vertical timeline line */}
        <div style={{ position: 'absolute', left: 19, top: 24, bottom: 24, width: 1, background: 'linear-gradient(to bottom, #EDE4D6, #EDE4D6 80%, transparent)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {stops.map((stop, i) => (
            <div key={stop.name} style={{ display: 'flex', gap: 22, position: 'relative' }}>
              {/* Number circle */}
              <div style={{ flexShrink: 0, width: 38, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#FAF8F3', border: '1.5px solid #EDE4D6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Spectral',serif", fontSize: 15, fontWeight: 600, color: '#C75A37', flexShrink: 0, zIndex: 1, position: 'relative' }}>
                  {i + 1}
                </div>
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingBottom: i < stops.length - 1 ? 28 : 0 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '4px 12px', marginBottom: 6 }}>
                  <h3 style={{ fontFamily: "'Spectral',serif", fontSize: 19, fontWeight: 500, color: '#1E1C19', margin: 0, lineHeight: 1.2 }}>{stop.name}</h3>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: '#A8A296', whiteSpace: 'nowrap' }}>{stop.time}</span>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: '#4A463E', margin: '0 0 10px' }}>{stop.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {stop.tags.map(tag => (
                    <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', fontSize: 11.5, fontWeight: 600, color: '#2E4034', background: 'rgba(46,64,52,.08)', padding: '4px 10px', borderRadius: 99 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Return note */}
          <div style={{ display: 'flex', gap: 22 }}>
            <div style={{ flexShrink: 0, width: 38, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#EDE4D6', border: '2px solid #C09F7E' }} />
            </div>
            <div style={{ flex: 1, paddingBottom: 4 }}>
              <p style={{ fontSize: 14, color: '#A8A296', margin: '8px 0 0', fontStyle: 'italic' }}>Return to Tbilisi — arrive evening</p>
            </div>
          </div>
        </div>
      </div>

      {/* Google map */}
      <div style={{ marginTop: 40 }}>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #ECE7DC', boxShadow: '0 4px 20px -8px rgba(30,28,25,.14)' }}>
          <iframe
            title="Kazbegi day tour route map"
            src={mapEmbedSrc(tour)}
            width="100%" height="380"
            style={{ display: 'block', border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p style={{ margin: '10px 0 0', fontSize: 12, color: '#A8A296', textAlign: 'center' }}>
          Georgian Military Highway — Kazbegi region
        </p>
      </div>

      <p style={{ margin: '20px 0 0', fontSize: 12.5, color: '#A8A296', borderTop: '1px solid #EDE4D6', paddingTop: 16 }}>
        Timings are approximate. Itinerary may change due to weather or road conditions.
      </p>
    </section>
  )
}

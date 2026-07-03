'use client'
import { useEffect, useRef, useState } from 'react'
import type { TourData } from '@/data/tours'
import { InquiryCard } from './TourInquirySection'
import { WHATSAPP_NUMBER } from '@/lib/contact'

export default function TourMobileBar({ tour, priceStr }: { tour: TourData; priceStr: string }) {
  const [open, setOpen] = useState(false)
  const sheetRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)

  const waNum = WHATSAPP_NUMBER
  const waHref = `https://wa.me/${waNum}`

  useEffect(() => {
    const sh = sheetRef.current
    const sc = scrimRef.current
    if (sh) sh.style.transform = open ? 'translateY(0)' : 'translateY(101%)'
    if (sc) { sc.style.opacity = open ? '1' : '0'; sc.style.pointerEvents = open ? 'auto' : 'none' }
  }, [open])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const factDuration = tour.quickFacts.duration
  const factGroup = 'Max 8 people'
  const factDifficulty = tour.quickFacts.difficulty
  const factSeason = 'Jun – Sep'
  const tourMeta = `${tour.quickFacts.duration} · Mestia & Ushguli`

  return (
    <>
      <style>{`
        .aeg-m-bar { display: none; }
        @media(max-width:1024px){ .aeg-m-bar { display: flex; } }
        .aeg-sheet-scroll::-webkit-scrollbar { width: 0; }
        @media(prefers-reduced-motion:reduce){ .aeg-m *{transition:none!important;animation:none!important} }
        @supports(padding-bottom: env(safe-area-inset-bottom)){
          .aeg-m-bar { padding-bottom: calc(11px + env(safe-area-inset-bottom)) !important; }
        }
      `}</style>

      {/* Slim sticky bottom bar */}
      <div className="aeg-m-bar tp-mobile-bar" style={{
        position: 'fixed', left: 0, right: 0, bottom: 0,
        background: '#FFFFFF', boxShadow: '0 -6px 24px -10px rgba(30,28,25,.28)',
        padding: '11px 16px 11px', zIndex: 48,
        borderTop: '1px solid rgba(30,28,25,.06)',
        alignItems: 'center', gap: 12,
        fontFamily: "'Hanken Grotesk',system-ui,sans-serif",
      }}>
        {/* Price + tour name (tappable) */}
        <button onClick={() => setOpen(true)} type="button" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1, background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', minWidth: 0, flex: 1, fontFamily: 'inherit' }}>
          <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 4, color: '#1E1C19' }}>
            <span style={{ fontSize: 11, color: '#A8A296', fontWeight: 500 }}>From</span>
            <span style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Spectral',serif", lineHeight: 1 }}>{priceStr}</span>
            <span style={{ fontSize: 11, color: '#A8A296', fontWeight: 500 }}>/ person</span>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#C75A37" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 1 }}><path d="m18 15-6-6-6 6"/></svg>
          </span>
          <span style={{ fontSize: 11.5, color: '#A8A296', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 150 }}>{tour.name}</span>
        </button>

        {/* Enquire CTA */}
        <button onClick={() => setOpen(true)} type="button"
          style={{ flex: 'none', border: 'none', borderRadius: 12, background: '#C75A37', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, padding: '12px 22px', cursor: 'pointer', boxShadow: '0 8px 18px -8px rgba(199,90,55,.8)' }}>
          Enquire
        </button>

        {/* WhatsApp */}
        <a href={waHref} target="_blank" rel="noopener noreferrer" aria-label="Contact on WhatsApp"
          style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 46, borderRadius: 12, background: 'rgba(37,211,102,.14)', color: '#1B8043', textDecoration: 'none' }}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="#25D366" stroke="none"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.05c-.24.68-1.42 1.31-1.96 1.36-.5.05-.96.24-3.23-.67-2.72-1.07-4.45-3.84-4.58-4.02-.13-.18-1.1-1.46-1.1-2.79 0-1.33.7-1.98.94-2.25.25-.27.54-.34.72-.34.18 0 .36 0 .52.01.17.01.39-.06.61.47.24.56.79 1.94.86 2.08.07.14.12.31.02.49-.09.18-.14.29-.27.45-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.22.61-.13.25.09 1.6.75 1.87.89.27.14.45.2.52.31.07.12.07.68-.17 1.36Z"/></svg>
        </a>

        {/* iOS home indicator */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 9, width: 128, height: 5, borderRadius: 99, background: '#1E1C19', opacity: 0.18 }} />
      </div>

      {/* Scrim */}
      <div ref={scrimRef} onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(15,12,10,.5)', zIndex: 60, opacity: 0, pointerEvents: 'none', transition: 'opacity .3s ease' }} />

      {/* Bottom sheet */}
      <div
        ref={sheetRef}
        className="aeg-sheet-scroll aeg-m tp-mobile-sheet"
        style={{
          position: 'fixed', left: 0, right: 0, bottom: 0,
          height: '90%',
          background: '#FAF8F3',
          borderTopLeftRadius: 26, borderTopRightRadius: 26,
          boxShadow: '0 -16px 50px -16px rgba(15,12,10,.4)',
          zIndex: 61,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          transform: 'translateY(101%)',
          transition: 'transform .34s cubic-bezier(.32,.72,.24,1)',
          fontFamily: "'Hanken Grotesk',system-ui,sans-serif",
        }}
      >
        {/* Sticky header */}
        <div style={{ position: 'sticky', top: 0, background: '#FAF8F3', padding: '9px 0 6px', zIndex: 2 }}>
          <div style={{ width: 42, height: 5, borderRadius: 99, background: 'rgba(30,28,25,.18)', margin: '0 auto' }} />
          <button onClick={() => setOpen(false)} type="button" aria-label="Close"
            style={{ position: 'absolute', top: 8, right: 14, width: 32, height: 32, borderRadius: '50%', border: 'none', background: 'rgba(30,28,25,.06)', color: '#1E1C19', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div style={{ padding: '6px 14px 26px' }}>
          {/* Trip details card */}
          <div style={{ background: '#FFFFFF', border: '1px solid rgba(30,28,25,.08)', borderRadius: 20, boxShadow: '0 18px 50px -32px rgba(30,28,25,.32)', padding: '22px 22px 20px', marginBottom: 14 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10.5, fontWeight: 600, letterSpacing: '1.3px', textTransform: 'uppercase', color: '#C75A37', marginBottom: 11 }}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
              {tour.category}
            </div>
            <h3 style={{ fontFamily: "'Spectral',Georgia,serif", fontWeight: 600, fontSize: 23, lineHeight: 1.14, letterSpacing: '-.2px', margin: '0 0 4px', color: '#1E1C19' }}>{tour.name}</h3>
            <div style={{ fontSize: 12.5, color: '#A8A296', lineHeight: 1.4 }}>{tourMeta}</div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginTop: 15 }}>
              <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: '#A8A296' }}>From</span>
              <span style={{ fontFamily: "'Spectral',Georgia,serif", fontWeight: 600, fontSize: 31, lineHeight: 1, color: '#1E1C19' }}>{priceStr}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#A8A296' }}>/ person</span>
            </div>

            <div style={{ height: 1, background: '#EDE4D6', margin: '17px 0' }} />

            {/* Facts 2x2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px 14px' }}>
              <FactRow icon="clock" label="Duration" value={factDuration} />
              <FactRow icon="users" label="Group size" value={factGroup} />
              <FactRow icon="mountain" label="Difficulty" value={factDifficulty} />
              <FactRow icon="sun" label="Best season" value={factSeason} />
            </div>
          </div>

          {/* Compact InquiryCard (no header — details shown above) */}
          <InquiryCard
            tourName={tour.name}
            tourMeta={tourMeta}
            whatsappNumber={waNum}
            compact={true}
            hideTravelers={false}
          />
        </div>
      </div>
    </>
  )
}

function FactRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  const icons: Record<string, React.ReactNode> = {
    clock: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
    users: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}><path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1"/><circle cx="9" cy="7" r="3.2"/><path d="M22 19v-1a4 4 0 0 0-3-3.85"/><path d="M16 4.2A4 4 0 0 1 16 11"/></svg>,
    mountain: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}><path d="M3 20h18"/><path d="m4 17 5-9 4 6 3-4 4 7"/></svg>,
    sun: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>,
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}>
      {icons[icon]}
      <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <span style={{ fontSize: 10.5, color: '#A8A296', lineHeight: 1.3 }}>{label}</span>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: '#1E1C19', lineHeight: 1.3 }}>{value}</span>
      </span>
    </div>
  )
}

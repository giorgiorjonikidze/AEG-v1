'use client'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { TourData } from '@/data/tours'
import { InquiryCard } from './TourInquirySection'

interface Props { tour: TourData }

const RATE = (tour: TourData) => tour.perPersonRate ?? tour.price
const MIN = 1
const MAX = (tour: TourData) => tour.maxTravelers ?? 12

export default function DayTourBookingCard({ tour }: Props) {
  const [travelers, setTravelers] = useState(2)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const scrimRef = useRef<HTMLDivElement>(null)

  const rate = RATE(tour)
  const max = MAX(tour)
  const total = travelers * rate
  const currency = tour.currency

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function step(d: number) {
    setTravelers(t => Math.max(MIN, Math.min(max, t + d)))
  }

  const waMsg = `Hi! I'd like to book the Kazbegi day trip for ${travelers} ${travelers === 1 ? 'traveler' : 'travelers'}.`

  return (
    <>
      <div className="tp-booking-card" style={{ width: '100%', maxWidth: 384, boxSizing: 'border-box', background: '#FFFFFF', border: '1px solid #EDE4D6', borderRadius: 16, boxShadow: '0 8px 28px -12px rgba(30,28,25,.16),0 2px 6px -2px rgba(30,28,25,.06)', padding: '26px 26px 24px', fontFamily: "'Hanken Grotesk',sans-serif" }}>
        <style>{`
          @media(prefers-reduced-motion:reduce){ .dtbc-btn{transition:none!important;} }
          .dtbc-primary:hover{filter:brightness(.92);transform:translateY(-1px);box-shadow:0 10px 22px -10px rgba(30,28,25,.5)!important;}
          .dtbc-primary:active{transform:translateY(0)!important;}
          .dtbc-secondary:hover{background:#2E4034!important;color:#FFFFFF!important;transform:translateY(-1px)!important;}
          .dtbc-secondary:active{transform:translateY(0)!important;}
          .dtbc-step:hover{background:#F3EEE4!important;}
          .dtbc-step:active{transform:scale(.92)!important;}
          .dtbc-modal-scrim{transition:opacity .22s ease;}
          .dtbc-modal-panel{transition:transform .26s cubic-bezier(.32,.72,.24,1),opacity .22s ease;}
          .dtbc-modal-panel::-webkit-scrollbar{display:none;}
        `}</style>

        {/* Label */}
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: '#A8A296' }}>Total</div>

        {/* Live price */}
        <div aria-live="polite" style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
          <span style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 48, lineHeight: 1, color: '#1E1C19' }}>{currency}{total}</span>
          <span style={{ fontSize: 15, fontWeight: 500, color: '#A8A296' }}>total for {travelers} {travelers === 1 ? 'traveler' : 'travelers'}</span>
        </div>

        <div style={{ fontSize: 13.5, lineHeight: 1.5, color: '#A8A296', marginTop: 8 }}>Full day · Kazbegi · {currency}{rate} per person</div>

        <div style={{ height: 1, background: '#EDE4D6', margin: '18px 0' }} />

        {/* Traveler stepper */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#1E1C19' }}>Travelers</span>
            <span style={{ fontSize: 12.5, color: '#A8A296' }}>Min {MIN} · Max {max}</span>
          </span>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FAF8F3', border: '1px solid #EDE4D6', borderRadius: 11, padding: 4 }}>
            <button type="button" aria-label="Decrease travelers" onClick={() => step(-1)} disabled={travelers <= MIN}
              className="dtbc-step"
              style={{ appearance: 'none', cursor: travelers <= MIN ? 'not-allowed' : 'pointer', opacity: travelers <= MIN ? 0.35 : 1, width: 38, height: 38, borderRadius: 8, border: 'none', background: '#FFFFFF', color: '#1E1C19', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 2px rgba(30,28,25,.08)', transition: 'transform .12s ease,background .12s ease,opacity .12s ease' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 12h14"/></svg>
            </button>
            <span aria-live="polite" style={{ minWidth: 34, textAlign: 'center', fontSize: 18, fontWeight: 700, color: '#1E1C19', fontVariantNumeric: 'tabular-nums' }}>{travelers}</span>
            <button type="button" aria-label="Increase travelers" onClick={() => step(1)} disabled={travelers >= max}
              className="dtbc-step"
              style={{ appearance: 'none', cursor: travelers >= max ? 'not-allowed' : 'pointer', opacity: travelers >= max ? 0.35 : 1, width: 38, height: 38, borderRadius: 8, border: 'none', background: '#FFFFFF', color: '#1E1C19', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 2px rgba(30,28,25,.08)', transition: 'transform .12s ease,background .12s ease,opacity .12s ease' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>
        </div>

        <div style={{ height: 1, background: '#EDE4D6', margin: '18px 0' }} />

        {/* Facts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
          {[
            { icon: 'clock', label: 'Duration', value: tour.quickFacts.duration },
            { icon: 'users', label: 'Group size', value: `Up to ${max} people` },
            { icon: 'mountain', label: 'Difficulty', value: tour.quickFacts.difficulty },
            { icon: 'sun', label: 'Best season', value: 'May – Oct' },
          ].map(f => (
            <div key={f.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 14, color: '#A8A296' }}>
                <FactIcon name={f.icon} />
                {f.label}
              </span>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#1E1C19' }}>{f.value}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
          <button type="button" onClick={() => setOpen(true)} className="dtbc-btn dtbc-primary"
            style={{ appearance: 'none', border: 'none', cursor: 'pointer', width: '100%', padding: '14px 16px', borderRadius: 11, background: '#C75A37', color: '#FFFFFF', fontFamily: "'Hanken Grotesk',sans-serif", fontSize: 15, fontWeight: 600, boxShadow: '0 6px 16px -10px rgba(30,28,25,.5)', transition: 'transform .15s ease,box-shadow .15s ease,filter .15s ease' }}>
            Send Enquiry
          </button>
          <button type="button" onClick={() => window.open(`https://wa.me/995555123456?text=${encodeURIComponent(waMsg)}`, '_blank', 'noopener')} className="dtbc-btn dtbc-secondary"
            style={{ appearance: 'none', cursor: 'pointer', width: '100%', padding: '13px 16px', borderRadius: 11, background: 'transparent', color: '#2E4034', border: '1.5px solid #2E4034', fontFamily: "'Hanken Grotesk',sans-serif", fontSize: 15, fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'transform .15s ease,background .15s ease,color .15s ease' }}>
            <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z"/></svg>
            Ask a Question
          </button>
        </div>

        {/* Reassurance */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginTop: 14, fontSize: 12.5, lineHeight: 1.45, color: '#A8A296' }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
          <span>No payment today — we&apos;ll confirm dates and details first.</span>
        </div>
      </div>

      {/* Enquiry modal */}
      {mounted && open && createPortal(
        <div ref={scrimRef} className="dtbc-modal-scrim"
          onClick={e => { if (e.target === scrimRef.current) setOpen(false) }}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(10,8,6,.62)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 16px' }}>
          <div className="dtbc-modal-panel"
            style={{ position: 'relative', width: '100%', maxWidth: 480, maxHeight: '92vh', overflowY: 'auto', scrollbarWidth: 'none', background: '#FAF8F3', borderRadius: 20, boxShadow: '0 24px 64px -16px rgba(10,8,6,.5)' }}>
            <button onClick={() => setOpen(false)} aria-label="Close"
              style={{ position: 'absolute', top: 14, right: 14, zIndex: 1, width: 32, height: 32, borderRadius: '50%', background: 'rgba(30,28,25,.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E1C19' }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
            <div style={{ padding: '28px 28px 32px' }}>
              <InquiryCard tourName={tour.name} tourMeta={`Full day · ${tour.region}`} whatsappNumber="995555123456" defaultTravelers={travelers} />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

function FactIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    clock:    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
    users:    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1"/><circle cx="9" cy="7" r="3.2"/><path d="M22 19v-1a4 4 0 0 0-3-3.85"/><path d="M16 4.2A4 4 0 0 1 16 11"/></svg>,
    mountain: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M3 20h18"/><path d="m4 17 5-9 4 6 3-4 4 7"/></svg>,
    sun:      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>,
  }
  return <>{icons[name] ?? null}</>
}

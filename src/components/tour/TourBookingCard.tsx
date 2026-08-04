'use client'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { TourData, GroupDeparture } from '@/data/tours'
import { InquiryCard } from './TourInquirySection'
import { WHATSAPP_NUMBER } from '@/lib/contact'
import { formatDepartureRange, departureStatus, departureFromPrice } from '@/lib/departures'

interface Props {
  tour: TourData
  priceStr: string
}

export default function TourBookingCard({ tour, priceStr }: Props) {
  const departures = tour.groupDepartures ?? []
  const hasGroup = departures.length > 0

  // modal: null = closed; otherwise a departure (group) or 'private' (private enquiry)
  const [modal, setModal] = useState<GroupDeparture | 'private' | null>(null)
  const [tab, setTab] = useState<'group' | 'private'>(hasGroup ? 'group' : 'private')
  const scrimRef = useRef<HTMLDivElement>(null)
  const waNum = WHATSAPP_NUMBER
  const waMsg = `Hi! I'd like to ask a question about "${tour.name}".`

  const groupFrom = departureFromPrice(departures)
  const groupPriceStr = groupFrom != null ? `${tour.currency}${groupFrom.toLocaleString()}` : priceStr

  function askWhatsApp() {
    window.open(`https://wa.me/${waNum}?text=${encodeURIComponent(waMsg)}`, '_blank', 'noopener')
  }

  // lock body scroll while modal is open
  useEffect(() => {
    if (modal) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [modal])

  // close on Escape
  useEffect(() => {
    if (!modal) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setModal(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modal])

  const showGroup = hasGroup && tab === 'group'

  return (
    <>
      <div className="tp-booking-card" style={{
        width: '100%', maxWidth: 384, boxSizing: 'border-box',
        background: '#FFFFFF', border: '1px solid #EDE4D6', borderRadius: 16,
        boxShadow: '0 8px 28px -12px rgba(30,28,25,.16),0 2px 6px -2px rgba(30,28,25,.06)',
        padding: '26px 26px 24px', fontFamily: "'Hanken Grotesk',sans-serif",
      }}>
        <style>{`
          @media(prefers-reduced-motion:reduce){ .bc-btn{transition:none!important;} }
          .bc-primary:hover{filter:brightness(.92);transform:translateY(-1px);box-shadow:0 10px 22px -10px rgba(30,28,25,.5)!important;}
          .bc-primary:active{transform:translateY(0)!important;}
          .bc-primary:focus{outline:2.5px solid #C75A37;outline-offset:2px;}
          .bc-secondary:hover{background:#2E4034!important;color:#FFFFFF!important;transform:translateY(-1px)!important;}
          .bc-secondary:active{transform:translateY(0)!important;}
          .bc-secondary:focus{outline:2.5px solid #2E4034;outline-offset:2px;}
          .bc-modal-scrim{transition:opacity .22s ease;}
          .bc-modal-panel{transition:transform .26s cubic-bezier(.32,.72,.24,1),opacity .22s ease;}
          .bc-modal-panel::-webkit-scrollbar{display:none;}
          .bc-seg{flex:1;padding:9px 8px;border-radius:9px;border:none;background:transparent;color:#6F6A60;cursor:pointer;font-size:13.5px;font-weight:700;font-family:inherit;transition:background .16s ease,color .16s ease,box-shadow .16s ease;}
          .bc-seg[data-on=true]{background:#FFFFFF;color:#1E1C19;box-shadow:0 1px 2px rgba(30,28,25,.16);}
          .bc-dep-btn:hover:not(:disabled){background:#B84F2F!important;transform:translateY(-1px);}
          .bc-dep-btn:disabled{background:#EDE4D6!important;color:#A8A296!important;cursor:not-allowed;box-shadow:none!important;}
          @media(prefers-reduced-motion:reduce){.bc-modal-scrim,.bc-modal-panel{transition:none!important;}}
        `}</style>

        {/* Group / Private toggle */}
        {hasGroup && (
          <div style={{ display: 'flex', gap: 4, padding: 4, background: '#F3EDE3', borderRadius: 12, marginBottom: 20 }}>
            <button type="button" className="bc-seg" data-on={tab === 'group'} onClick={() => setTab('group')}>
              Join a group
            </button>
            <button type="button" className="bc-seg" data-on={tab === 'private'} onClick={() => setTab('private')}>
              Private trip
            </button>
          </div>
        )}

        {/* Label */}
        <div style={{ fontFamily: "'Hanken Grotesk',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: '#A8A296' }}>
          From
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
          <span style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 48, lineHeight: 1, color: '#1E1C19' }}>{showGroup ? groupPriceStr : priceStr}</span>
          <span style={{ fontFamily: "'Hanken Grotesk',sans-serif", fontSize: 15, fontWeight: 500, color: '#A8A296' }}>/ person</span>
        </div>

        {/* Context */}
        <div style={{ fontFamily: "'Hanken Grotesk',sans-serif", fontSize: 13.5, lineHeight: 1.5, color: '#A8A296', marginTop: 10 }}>
          {showGroup
            ? <>Small group · {tour.quickFacts.duration} · {tour.region}</>
            : <>{tour.quickFacts.duration} · {tour.region}</>}
        </div>

        <div style={{ height: 1, background: '#EDE4D6', margin: '18px 0' }} />

        {showGroup ? (
          /* ---------------- GROUP: departures list ---------------- */
          <>
            <div style={{ fontFamily: "'Hanken Grotesk',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#1E1C19', marginBottom: 12 }}>
              Upcoming departures
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {departures.map(dep => (
                <DepartureRow key={dep.id} dep={dep} currency={tour.currency} onReserve={() => setModal(dep)} />
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginTop: 16, fontFamily: "'Hanken Grotesk',sans-serif", fontSize: 12.5, lineHeight: 1.45, color: '#A8A296' }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
              <span>No payment today — reserve your spot and we&apos;ll confirm the details first.</span>
            </div>
            <div style={{ marginTop: 14, textAlign: 'center' }}>
              <button type="button" onClick={() => setTab('private')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, color: '#2E4034', fontWeight: 600, borderBottom: '1px solid rgba(46,64,52,.3)', paddingBottom: 1 }}>
                Dates don&apos;t suit? Ask for a private trip
              </button>
            </div>
          </>
        ) : (
          /* ---------------- PRIVATE: original card ---------------- */
          <>
            {/* Facts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              {[
                { icon: 'clock', label: 'Duration', value: tour.quickFacts.duration },
                // Group size hidden for tours that also offer group departures
                ...(hasGroup ? [] : [{ icon: 'users', label: 'Group size', value: 'Max 8 people' }]),
                { icon: 'mountain', label: 'Difficulty', value: tour.quickFacts.difficulty },
                { icon: 'sun', label: 'Best season', value: 'Jun – Sep' },
              ].map(f => (
                <div key={f.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: "'Hanken Grotesk',sans-serif", fontSize: 14, color: '#A8A296' }}>
                    <FactIcon name={f.icon} />
                    {f.label}
                  </span>
                  <span style={{ fontFamily: "'Hanken Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: '#1E1C19', textAlign: 'right' }}>{f.value}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
              <button type="button" onClick={() => setModal('private')} className="bc-btn bc-primary"
                style={{ appearance: 'none', border: 'none', cursor: 'pointer', width: '100%', padding: '14px 16px', borderRadius: 11, background: '#C75A37', color: '#FFFFFF', fontFamily: "'Hanken Grotesk',sans-serif", fontSize: 15, fontWeight: 600, boxShadow: '0 6px 16px -10px rgba(30,28,25,.5)', transition: 'transform .15s ease,box-shadow .15s ease,filter .15s ease' }}>
                Send Enquiry
              </button>
              <button type="button" onClick={askWhatsApp} className="bc-btn bc-secondary"
                style={{ appearance: 'none', cursor: 'pointer', width: '100%', padding: '13px 16px', borderRadius: 11, background: 'transparent', color: '#2E4034', border: '1.5px solid #2E4034', fontFamily: "'Hanken Grotesk',sans-serif", fontSize: 15, fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'transform .15s ease,background .15s ease,color .15s ease' }}>
                <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z"/></svg>
                Ask a Question
              </button>
            </div>

            {/* Reassurance */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginTop: 14, fontFamily: "'Hanken Grotesk',sans-serif", fontSize: 12.5, lineHeight: 1.45, color: '#A8A296' }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
              <span>No payment today — we&apos;ll confirm dates and details first.</span>
            </div>
          </>
        )}
      </div>

      {modal && createPortal(
        <div
          ref={scrimRef}
          className="bc-modal-scrim"
          onClick={e => { if (e.target === scrimRef.current) setModal(null) }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(10,8,6,.62)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px 16px',
          }}
        >
          <div
            className="bc-modal-panel"
            style={{
              position: 'relative',
              width: '100%', maxWidth: 480,
              maxHeight: '92vh', overflowY: 'auto',
              scrollbarWidth: 'none',
              background: '#FAF8F3', borderRadius: 20,
              boxShadow: '0 24px 64px -16px rgba(10,8,6,.5)',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setModal(null)}
              aria-label="Close"
              style={{
                position: 'absolute', top: 14, right: 14, zIndex: 1,
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(30,28,25,.08)', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#1E1C19',
              }}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>

            <div style={{ padding: '28px 28px 32px' }}>
              <InquiryCard
                tourName={tour.name}
                tourMeta={`${tour.quickFacts.duration} · ${tour.region}`}
                whatsappNumber={waNum}
                defaultDateStart={modal !== 'private' ? modal.startDate : undefined}
                departureLabel={modal !== 'private' ? formatDepartureRange(modal) : undefined}
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export function DepartureRow({ dep, currency, onReserve }: { dep: GroupDeparture; currency: string; onReserve: () => void }) {
  const status = departureStatus(dep)
  const soldOut = status.kind === 'soldout'
  const badgeColor: Record<string, { bg: string; fg: string }> = {
    soldout: { bg: 'rgba(30,28,25,.06)', fg: '#A8A296' },
    last: { bg: 'rgba(199,90,55,.12)', fg: '#B84F2F' },
    limited: { bg: 'rgba(199,90,55,.1)', fg: '#B84F2F' },
    available: { bg: 'rgba(46,64,52,.1)', fg: '#2E4034' },
  }
  const c = badgeColor[status.kind]

  return (
    <div style={{ border: '1px solid #EDE4D6', borderRadius: 13, padding: '13px 14px', background: soldOut ? '#FBF9F5' : '#FFFFFF', opacity: soldOut ? 0.82 : 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 14.5, fontWeight: 700, color: '#1E1C19' }}>{formatDepartureRange(dep)}</span>
            {dep.guaranteed && !soldOut && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10.5, fontWeight: 700, letterSpacing: '.3px', textTransform: 'uppercase', color: '#2E4034', background: 'rgba(46,64,52,.1)', borderRadius: 6, padding: '2px 6px' }}>
                <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Guaranteed
              </span>
            )}
          </div>
          {/* Show the spots-left badge only under urgency (≤3 left) or when sold out */}
          {dep.spotsLeft <= 3 && (
            <span style={{ display: 'inline-block', marginTop: 5, fontSize: 11.5, fontWeight: 700, color: c.fg, background: c.bg, borderRadius: 6, padding: '2px 8px' }}>
              {status.label}
            </span>
          )}
        </div>
        <div style={{ textAlign: 'right', flex: 'none' }}>
          <div style={{ fontFamily: "'Spectral',serif", fontSize: 20, fontWeight: 600, color: '#1E1C19', lineHeight: 1 }}>{currency}{dep.price.toLocaleString()}</div>
          <div style={{ fontSize: 11, color: '#A8A296', marginTop: 2 }}>per person</div>
        </div>
      </div>
      <button type="button" className="bc-dep-btn" onClick={onReserve} disabled={soldOut}
        style={{ appearance: 'none', border: 'none', width: '100%', marginTop: 11, padding: '10px 14px', borderRadius: 10, background: '#C75A37', color: '#FFFFFF', fontFamily: "'Hanken Grotesk',sans-serif", fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 5px 14px -9px rgba(199,90,55,.9)', transition: 'transform .15s ease,background .15s ease' }}>
        {soldOut ? 'Sold out' : 'Reserve a spot'}
      </button>
    </div>
  )
}

function FactIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    clock: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
    users: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1"/><circle cx="9" cy="7" r="3.2"/><path d="M22 19v-1a4 4 0 0 0-3-3.85"/><path d="M16 4.2A4 4 0 0 1 16 11"/></svg>,
    mountain: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M3 20h18"/><path d="m4 17 5-9 4 6 3-4 4 7"/></svg>,
    sun: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>,
  }
  return <>{icons[name]}</>
}

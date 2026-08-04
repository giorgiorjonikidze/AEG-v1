'use client'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { TourData, GroupDeparture } from '@/data/tours'
import { InquiryCard } from './TourInquirySection'
import { WHATSAPP_NUMBER } from '@/lib/contact'
import { formatDepartureRange, departureStatus, departureFromPrice } from '@/lib/departures'

/** Wide, in-page booking section (used instead of the sticky sidebar for tours
 *  that offer fixed-date group departures). Sits above the FAQ. */
export default function TourBookingSection({ tour, priceStr }: { tour: TourData; priceStr: string }) {
  const departures = tour.groupDepartures ?? []
  const hasGroup = departures.length > 0

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

  useEffect(() => {
    if (modal) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [modal])

  useEffect(() => {
    if (!modal) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setModal(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modal])

  const showGroup = hasGroup && tab === 'group'

  return (
    <section id="dates" style={{
      scrollMarginTop: 96, margin: '8px 0 4px',
      background: '#FFFFFF', border: '1px solid #EDE4D6', borderRadius: 22,
      boxShadow: '0 12px 40px -20px rgba(30,28,25,.18)',
      padding: 'clamp(28px,4vw,44px)', fontFamily: "'Hanken Grotesk',sans-serif",
    }}>
      <style>{`
        .bs-primary:hover{filter:brightness(.92);transform:translateY(-1px);}
        .bs-primary:active{transform:translateY(0)!important;}
        .bs-secondary:hover{background:#2E4034!important;color:#FFFFFF!important;transform:translateY(-1px)!important;}
        .bs-secondary:active{transform:translateY(0)!important;}
        .bs-seg{flex:1;padding:11px 8px;border-radius:10px;border:none;background:transparent;color:#6F6A60;cursor:pointer;font-size:14px;font-weight:700;font-family:inherit;transition:background .16s ease,color .16s ease,box-shadow .16s ease;}
        .bs-seg[data-on=true]{background:#FFFFFF;color:#1E1C19;box-shadow:0 1px 3px rgba(30,28,25,.18);}
        .bs-modal-scrim{transition:opacity .22s ease;}
        .bs-modal-panel{transition:transform .26s cubic-bezier(.32,.72,.24,1),opacity .22s ease;}
        .bs-modal-panel::-webkit-scrollbar{display:none;}
        .bs-dep-btn:hover:not(:disabled){background:#B84F2F!important;transform:translateY(-1px);}
        .bs-dep-btn:disabled{background:#EDE4D6!important;color:#A8A296!important;cursor:not-allowed;box-shadow:none!important;}
        @media(prefers-reduced-motion:reduce){.bs-primary,.bs-secondary,.bs-dep-btn,.bs-modal-scrim,.bs-modal-panel{transition:none!important;}}
      `}</style>

      {/* Heading */}
      <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 22px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#C75A37', marginBottom: 10 }}>Dates &amp; Prices</div>
        <h2 style={{ fontFamily: "'Spectral',serif", fontSize: 'clamp(26px,3vw,34px)', fontWeight: 500, color: '#1E1C19', lineHeight: 1.14, margin: 0 }}>
          Join a group departure — or ride it privately
        </h2>
      </div>

      {/* Toggle */}
      {hasGroup && (
        <div style={{ display: 'flex', gap: 4, padding: 4, background: '#F3EDE3', borderRadius: 13, marginBottom: 26, maxWidth: 380, margin: '0 auto 26px' }}>
          <button type="button" className="bs-seg" data-on={tab === 'group'} onClick={() => setTab('group')}>Join a group</button>
          <button type="button" className="bs-seg" data-on={tab === 'private'} onClick={() => setTab('private')}>Private trip</button>
        </div>
      )}

      {showGroup ? (
        /* ---------------- GROUP ---------------- */
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center', gap: '4px 12px', marginBottom: 22, textAlign: 'center' }}>
            <span style={{ fontFamily: "'Spectral',serif", fontSize: 34, fontWeight: 500, color: '#1E1C19', lineHeight: 1 }}>{groupPriceStr}</span>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#A8A296' }}>/ person · small group · {tour.quickFacts.duration}</span>
          </div>

          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {Array.from(new Set(departures.map(d => d.startDate.slice(0, 4)))).sort().map(year => {
              const rows = departures.filter(d => d.startDate.slice(0, 4) === year)
              return (
                <div key={year} style={{ marginBottom: 26 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Spectral',serif", fontSize: 21, fontWeight: 600, color: '#1E1C19' }}>{year}</span>
                    <span style={{ flex: 1, height: 1, background: '#EDE4D6' }} />
                    <span style={{ fontSize: 12, color: '#A8A296' }}>{rows.length} departure{rows.length > 1 ? 's' : ''}</span>
                  </div>
                  {rows.map((dep, i) => {
                    const isLast = i === rows.length - 1
                    const nextDiffMonth = !isLast && rows[i + 1].startDate.slice(5, 7) !== dep.startDate.slice(5, 7)
                    const border = isLast ? 'none' : nextDiffMonth ? 'double' : 'single'
                    return (
                      <SlimDepartureRow key={dep.id} dep={dep} currency={tour.currency} border={border} onReserve={() => setModal(dep)} />
                    )
                  })}
                </div>
              )
            })}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '8px 20px', marginTop: 22 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#A8A296' }}>
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
              No payment today — reserve your spot and we&apos;ll confirm the details first.
            </span>
            <button type="button" onClick={() => setTab('private')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, color: '#2E4034', fontWeight: 600, borderBottom: '1px solid rgba(46,64,52,.3)', paddingBottom: 1 }}>
              Dates don&apos;t suit? Ask for a private trip
            </button>
          </div>
        </>
      ) : (
        /* ---------------- PRIVATE ---------------- */
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center', gap: '4px 12px', marginBottom: 22, textAlign: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#A8A296' }}>From</span>
            <span style={{ fontFamily: "'Spectral',serif", fontSize: 34, fontWeight: 500, color: '#1E1C19', lineHeight: 1 }}>{priceStr}</span>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#A8A296' }}>/ person · your own group · {tour.quickFacts.duration}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
            {[
              { icon: 'clock', label: 'Duration', value: tour.quickFacts.duration },
              { icon: 'mountain', label: 'Difficulty', value: 'Challenging' },
              { icon: 'sun', label: 'Best season', value: 'Jun – Sep' },
            ].map(f => (
              <div key={f.label} style={{ background: '#FAF8F3', border: '1px solid #EDE4D6', borderRadius: 12, padding: '13px 12px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}><FactIcon name={f.icon} /></div>
                <div style={{ fontSize: 11, color: '#A8A296', marginBottom: 2 }}>{f.label}</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1E1C19', lineHeight: 1.25 }}>{f.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <button type="button" onClick={() => setModal('private')} className="bs-primary"
              style={{ flex: '1 1 220px', appearance: 'none', border: 'none', cursor: 'pointer', padding: '15px 16px', borderRadius: 12, background: '#C75A37', color: '#FFFFFF', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, boxShadow: '0 6px 16px -10px rgba(199,90,55,.7)', transition: 'transform .15s ease,filter .15s ease' }}>
              Send Enquiry
            </button>
            <button type="button" onClick={askWhatsApp} className="bs-secondary"
              style={{ flex: '1 1 200px', appearance: 'none', cursor: 'pointer', padding: '14px 16px', borderRadius: 12, background: 'transparent', color: '#2E4034', border: '1.5px solid #2E4034', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'transform .15s ease,background .15s ease,color .15s ease' }}>
              <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z"/></svg>
              Ask a Question
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginTop: 14, justifyContent: 'center', fontSize: 12.5, lineHeight: 1.45, color: '#A8A296' }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
            <span>No payment today — we&apos;ll confirm dates and details first.</span>
          </div>
        </div>
      )}

      {modal && createPortal(
        <div
          ref={scrimRef}
          className="bs-modal-scrim"
          onClick={e => { if (e.target === scrimRef.current) setModal(null) }}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(10,8,6,.62)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 16px' }}
        >
          <div className="bs-modal-panel" style={{ position: 'relative', width: '100%', maxWidth: 480, maxHeight: '92vh', overflowY: 'auto', scrollbarWidth: 'none', background: '#FAF8F3', borderRadius: 20, boxShadow: '0 24px 64px -16px rgba(10,8,6,.5)' }}>
            <button onClick={() => setModal(null)} aria-label="Close"
              style={{ position: 'absolute', top: 14, right: 14, zIndex: 1, width: 32, height: 32, borderRadius: '50%', background: 'rgba(30,28,25,.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E1C19' }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
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
    </section>
  )
}

function SlimDepartureRow({ dep, currency, border = 'single', onReserve }: { dep: GroupDeparture; currency: string; border?: 'single' | 'double' | 'none'; onReserve: () => void }) {
  const status = departureStatus(dep)
  const soldOut = status.kind === 'soldout'
  const borderBottom = border === 'double' ? '3px double #DED3C1' : border === 'none' ? 'none' : '1px solid #F1EBE0'
  const showBadge = dep.spotsLeft <= 3
  const badgeColor: Record<string, { bg: string; fg: string }> = {
    soldout: { bg: 'rgba(30,28,25,.06)', fg: '#A8A296' },
    last: { bg: 'rgba(199,90,55,.12)', fg: '#B84F2F' },
    limited: { bg: 'rgba(199,90,55,.1)', fg: '#B84F2F' },
    available: { bg: 'rgba(46,64,52,.1)', fg: '#2E4034' },
  }
  const c = badgeColor[status.kind]

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px 16px', flexWrap: 'wrap', padding: '14px 2px', borderBottom, opacity: soldOut ? 0.68 : 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', minWidth: 0 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#1E1C19' }}>{formatDepartureRange(dep)}</span>
        {dep.guaranteed && !soldOut && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10.5, fontWeight: 700, letterSpacing: '.3px', textTransform: 'uppercase', color: '#2E4034', background: 'rgba(46,64,52,.1)', borderRadius: 6, padding: '2px 6px' }}>
            <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            Guaranteed
          </span>
        )}
        {showBadge && (
          <span style={{ fontSize: 11.5, fontWeight: 700, color: c.fg, background: c.bg, borderRadius: 6, padding: '2px 8px' }}>{status.label}</span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 'none' }}>
        <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 5 }}>
          <span style={{ fontFamily: "'Spectral',serif", fontSize: 19, fontWeight: 600, color: '#1E1C19', lineHeight: 1 }}>{currency}{dep.price.toLocaleString()}</span>
          <span style={{ fontSize: 12, color: '#A8A296' }}>/ person</span>
        </span>
        <button type="button" className="bs-dep-btn" onClick={onReserve} disabled={soldOut}
          style={{ appearance: 'none', border: 'none', padding: '10px 20px', borderRadius: 10, background: '#C75A37', color: '#FFFFFF', fontFamily: "'Hanken Grotesk',sans-serif", fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 5px 14px -9px rgba(199,90,55,.9)', transition: 'transform .15s ease,background .15s ease', whiteSpace: 'nowrap' }}>
          {soldOut ? 'Sold out' : 'Reserve'}
        </button>
      </div>
    </div>
  )
}

function FactIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    clock: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
    mountain: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M3 20h18"/><path d="m4 17 5-9 4 6 3-4 4 7"/></svg>,
    sun: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#C09F7E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>,
  }
  return <>{icons[name]}</>
}

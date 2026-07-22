'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

// ── DATA ──────────────────────────────────────────────────────────────────────
type Tour = {
  id: string; name: string; region: string; activity: string; days: number
  difficulty: 'Easy' | 'Moderate' | 'Challenging'; price: number; hook: string
  isNew: boolean; beginner: boolean; family: boolean; winter: boolean; order: number
  note?: string
}

const TOURS_DATA: Tour[] = [
  { id: 'discover-georgia-as-a-local', name: 'Discover Georgia as a Local', region: 'Svaneti', activity: 'overlanding', days: 10, difficulty: 'Moderate', price: 1000, hook: 'Ten days, one 4x4, six regions — cave cities, glacier valleys and villages the road forgot.', isNew: true, beginner: false, family: false, winter: false, order: 0 },
  { id: 'vashlovani-overland-expedition', name: 'Vashlovani Semi-Desert Overland Expedition', region: 'Kakheti', activity: 'overlanding', days: 7, difficulty: 'Moderate', price: 600, hook: 'Canyons, mud volcanoes and big skies on the Azeri border — 7 days of semi-desert off-road.', isNew: true, beginner: false, family: false, winter: false, order: 1 },
  { id: 'overland-guria-adjara', name: 'Overland Adventure: Mystical Mountains of Guria & Adjara', region: 'Adjara', activity: 'overlanding', days: 7, difficulty: 'Moderate', price: 800, hook: 'Misty cloud-kingdoms, hidden alpine lakes and a fortress above the clouds — off-road through Upper Adjara.', isNew: true, beginner: false, family: false, winter: false, order: 2 },
  { id: 'ice-and-towers-svaneti', name: 'Ice and Towers, Svaneti', region: 'Svaneti', activity: 'trekking', days: 9, difficulty: 'Moderate', price: 2490, hook: 'Nine days of glaciers, medieval towers and high-altitude passes in the Caucasus crown.', isNew: true, beginner: false, family: false, winter: false, order: 3 },
  { id: 'chaukhi-mountaineering-camp', name: 'Chaukhi Massif Mountaineering Camp', region: 'Kazbegi', activity: 'summit', days: 8, difficulty: 'Challenging', price: 1500, hook: 'Learn the ropes and stand on three summits in the "Georgian Dolomites".', isNew: true, beginner: false, family: false, winter: false, order: 4, note: 'Training camp' },
  { id: 'enduro-mtb-tusheti', name: 'Enduro MTB Expedition in Tusheti', region: 'Tusheti', activity: 'biking', days: 4, difficulty: 'Challenging', price: 734, hook: 'Big-mountain enduro beyond the Abano Pass — remote villages and endless descents.', isNew: true, beginner: false, family: false, winter: false, order: 5 },
  { id: 'cycling-expedition-tusheti', name: 'Cycling Expedition in Tusheti', region: 'Tusheti', activity: 'biking', days: 6, difficulty: 'Challenging', price: 850, hook: '6-day gravel endurance expedition — big climbs, remote villages, full board.', isNew: true, beginner: false, family: false, winter: false, order: 6 },
  { id: 'trans-georgia-tbilisi-batumi', name: 'Trans-Georgia Traverse: Tbilisi to the Black Sea', region: 'Adjara', activity: 'biking', days: 7, difficulty: 'Challenging', price: 1276, hook: 'Cross a whole country by bike — Tbilisi over the Goderdzi Pass to the Black Sea at Batumi.', isNew: true, beginner: false, family: false, winter: false, order: 5 },
  { id: 'canyoning-day-adventure', name: 'Canyoning Day Adventure in Imereti', region: 'Imereti', activity: 'canyoning', days: 1, difficulty: 'Moderate', price: 110, hook: 'Rappel live waterfalls, slide natural chutes and jump into cold green pools — a full day in a wild canyon.', isNew: true, beginner: true, family: false, winter: false, order: 7 },
  { id: 'melouri-cave-caving', name: 'Wild Caving Experience in Melouri Cave', region: 'Imereti', activity: 'caving', days: 1, difficulty: 'Moderate', price: 95, hook: 'Wade an underground river by headlamp into a genuine wild cave near Kutaisi.', isNew: true, beginner: true, family: false, winter: false, order: 8 },
  { id: 'kazbegi-day-trip', name: 'Kazbegi Day Trip', region: 'Kazbegi', activity: 'mixed', days: 1, difficulty: 'Easy', price: 95, hook: 'Ananuri, Gudauri and Gergeti Trinity Church in one perfect day from Tbilisi.', isNew: true, beginner: true, family: true, winter: false, order: 9 },
]

const ACTIVITY_META = [
  { key: 'trekking',   label: 'Trekking & Hiking',   anchor: 'trekking-hiking' },
  { key: 'biking',     label: 'Biking',               anchor: 'biking' },
  { key: 'caving',     label: 'Caving',               anchor: 'caving' },
  { key: 'canyoning',  label: 'Canyoning',            anchor: 'canyoning' },
  { key: 'overlanding',label: 'Overlanding',          anchor: 'overlanding' },
  { key: 'mixed',      label: 'Mixed Tours',          anchor: 'mixed-tours' },
  { key: 'summit',     label: 'Summit Experience',    anchor: 'summit-experience' },
  { key: 'climbing',   label: 'Climbing',             anchor: 'climbing' },
  { key: 'winter',     label: 'Winter',               anchor: 'winter' },
]

const REGIONS = ['Svaneti', 'Kazbegi', 'Imereti', 'Kakheti', 'Adjara', 'Racha', 'Tusheti']
const DIFFS = ['Easy', 'Moderate', 'Challenging'] as const
const DUR_BUCKETS = [
  { key: 'day',  label: 'Day trip' },
  { key: '2-3',  label: '2–3 days' },
  { key: '4-6',  label: '4–6 days' },
  { key: '7+',   label: '7+ days' },
]
const SORT_OPTIONS = [
  { key: 'recommended', label: 'Recommended' },
  { key: 'price-asc',   label: 'Price (low to high)' },
  { key: 'duration',    label: 'Duration' },
  { key: 'difficulty',  label: 'Difficulty' },
  { key: 'newest',      label: 'Newest' },
]

const PMIN = 0, PMAX = 3000, STEP = 10

const TOUR_PHOTOS: Record<string, string> = {
  'vashlovani-overland-expedition': '/images/tours/overlanding/dg-05.jpg',
  'ice-and-towers-svaneti': '/images/tours/ice-towers-hero.avif',
  'kazbegi-day-trip':       '/images/tours/andrew-rusinas-aFFKmsFoldc-unsplash.jpg',
  'discover-georgia-as-a-local': '/images/tours/overlanding/dg-04.jpg',
  'enduro-mtb-tusheti':          '/images/tours/biking/mtb-group.jpg',
  'chaukhi-mountaineering-camp': '/images/tours/summit/chaukhi-ridge-team.jpg',
  'melouri-cave-caving':         '/images/tours/caving/melouri-river-passage.jpg',
  'cycling-expedition-tusheti':  '/images/tours/biking/mtb-open-road.jpg',
  'trans-georgia-tbilisi-batumi': '/images/tours/biking/trans-georgia-hero.jpg',
  'overland-guria-adjara':       '/images/tours/overlanding/dg-06.jpg',
  'canyoning-day-adventure':     '/images/tours/canyoning/canyoning-waterfall-rappel.jpg',
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
const bucket = (d: number) => d === 1 ? 'day' : d <= 3 ? '2-3' : d <= 6 ? '4-6' : '7+'
const fmt = (n: number) => '€' + n.toLocaleString('en-US')
const diffRank: Record<string, number> = { Easy: 1, Moderate: 2, Challenging: 3 }

// ── ICONS ─────────────────────────────────────────────────────────────────────
function ActivityIcon({ type }: { type: string }) {
  const W = 20
  switch (type) {
    case 'trekking':   return <svg width={W} height={W} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
    case 'biking':     return <svg width={W} height={W} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>
    case 'caving':     return <svg width={W} height={W} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><path d="m12 22 0-14"/><path d="M2 8.5 12 15l10-6.5"/></svg>
    case 'canyoning':  return <svg width={W} height={W} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1C7 13 7 11 9.5 11c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1C7 19 7 17 9.5 17c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>
    case 'overlanding': return <svg width={W} height={W} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
    case 'mixed':      return <svg width={W} height={W} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
    case 'summit':     return <svg width={W} height={W} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>
    case 'climbing':   return <svg width={W} height={W} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/></svg>
    case 'winter':     return <svg width={W} height={W} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/></svg>
    default:           return <svg width={W} height={W} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
  }
}

// ── SUBCOMPONENTS ─────────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  )
}

function FilterRow({ checked, label, count, onToggle }: {
  checked: boolean; label: string; count?: number; onToggle: () => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      type="button"
      onClick={onToggle}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 11, width: '100%', padding: '8px 9px',
        borderRadius: 9, border: 'none', cursor: 'pointer',
        fontFamily: 'var(--font-hanken), sans-serif', fontSize: 14.5, lineHeight: 1.2,
        fontWeight: checked ? 600 : 500, color: checked ? '#1E1C19' : '#3C372F',
        textAlign: 'left', background: hov ? '#F7F4EC' : 'transparent',
        transition: 'background .15s ease',
      }}
    >
      <span style={{
        flexShrink: 0, width: 19, height: 19, borderRadius: 6, display: 'inline-flex',
        alignItems: 'center', justifyContent: 'center',
        background: checked ? '#C75A37' : '#fff',
        border: checked ? 'none' : '1.6px solid #CFC8BA',
      }}>
        {checked && <CheckIcon />}
      </span>
      <span style={{ flex: 1 }}>{label}</span>
      {count != null && <span style={{ fontSize: 13, color: '#B7B0A3', fontWeight: 400 }}>{count}</span>}
    </button>
  )
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      type="button"
      onClick={onRemove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        background: '#fff', border: `1px solid ${hov ? '#C75A37' : '#DAD3C5'}`,
        borderRadius: 99, padding: '7px 10px 7px 13px',
        fontFamily: 'var(--font-hanken), sans-serif', fontSize: 13.5, fontWeight: 500,
        color: hov ? '#C75A37' : '#1E1C19', cursor: 'pointer',
        transition: 'border-color .15s, color .15s',
      }}
    >
      {label}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
  )
}

function SortRow({ opt, active, onSelect }: { opt: { key: string; label: string }; active: boolean; onSelect: (k: string) => void }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      type="button"
      onClick={() => onSelect(opt.key)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        width: '100%', padding: '10px 12px', borderRadius: 9, border: 'none',
        background: hov ? '#F7F4EC' : 'transparent', cursor: 'pointer',
        fontFamily: 'var(--font-hanken), sans-serif', fontSize: 14.5,
        fontWeight: active ? 600 : 500, color: '#1E1C19', textAlign: 'left',
        transition: 'background .15s ease',
      }}
    >
      <span>{opt.label}</span>
      {active && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C75A37" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}
    </button>
  )
}

function SortMenu({ options, current, onSelect, onClose }: {
  options: typeof SORT_OPTIONS; current: string; onSelect: (k: string) => void; onClose: () => void
}) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 45 }} />
      <div style={{
        position: 'absolute', right: 0, top: 'calc(100% + 8px)', zIndex: 46,
        background: '#fff', border: '1px solid #ECE8DE', borderRadius: 14,
        boxShadow: '0 18px 44px rgba(30,28,25,.18)', padding: 6, minWidth: 230,
      }}>
        {options.map(opt => (
          <SortRow key={opt.key} opt={opt} active={current === opt.key} onSelect={onSelect} />
        ))}
      </div>
    </>
  )
}

function TourCard({ tour, reduced, globalIdx, isMobile }: {
  tour: Tour; reduced: boolean; globalIdx: number; isMobile: boolean
}) {
  const [hov, setHov] = useState(false)
  const delay = `${Math.min(globalIdx, 8) * 0.05}s`
  const photo = TOUR_PHOTOS[tour.id]

  return (
    <div style={{ animation: reduced ? undefined : `tlCardIn .5s cubic-bezier(.2,.7,.2,1) ${delay} both` }}>
      <Link
        href={`/en/tours/${tour.id}`}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onFocus={() => setHov(true)}
        onBlur={() => setHov(false)}
        style={{
          display: 'flex', flexDirection: 'column', height: '100%',
          background: '#fff', borderRadius: 16, overflow: 'hidden',
          textDecoration: 'none', color: '#1E1C19',
          border: `1px solid ${hov ? '#E2DCCF' : '#ECE8DE'}`,
          boxShadow: hov ? '0 22px 46px -16px rgba(30,28,25,.28)' : '0 1px 3px rgba(30,28,25,.05)',
          transform: hov && !reduced ? 'translateY(-6px)' : 'none',
          transition: reduced ? 'none' : 'transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s ease, border-color .35s ease',
          outline: 'none',
        }}
      >
        {/* Photo */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: '#EBE6DB', flexShrink: 0 }}>
          {photo && (
            <Image
              src={photo}
              alt={tour.name}
              fill
              style={{
                objectFit: 'cover',
                transform: hov && !reduced ? 'scale(1.06)' : 'scale(1)',
                transition: reduced ? 'none' : 'transform .6s cubic-bezier(.2,.7,.2,1)',
              }}
              sizes="(max-width: 880px) 100vw, (max-width: 1320px) 33vw, 400px"
            />
          )}
          <span style={{
            position: 'absolute', top: 12, left: 12, display: 'inline-flex', alignItems: 'center', gap: 5,
            background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(4px)',
            color: '#1E1C19', fontFamily: 'var(--font-hanken), sans-serif', fontSize: 12, fontWeight: 600,
            padding: '7px 10px', borderRadius: 99, boxShadow: '0 2px 8px rgba(30,28,25,.12)',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {tour.days === 1 ? 'Day trip' : `${tour.days} days`}
          </span>
          {tour.isNew && (
            <span style={{
              position: 'absolute', top: 12, right: 12,
              background: '#C75A37', color: '#fff',
              fontFamily: 'var(--font-hanken), sans-serif', fontSize: 11, fontWeight: 600,
              letterSpacing: '.04em', textTransform: 'uppercase',
              padding: '6px 9px', borderRadius: 99, boxShadow: '0 2px 8px rgba(199,90,55,.4)',
            }}>New</span>
          )}
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1, padding: '18px 19px 20px' }}>
          <h3 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 21, lineHeight: 1.2, margin: 0, color: '#1E1C19' }}>
            {tour.name}
          </h3>
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.45, color: '#79736A' }}>{tour.hook}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13.5, color: '#8C8576' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C75A37" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            {tour.region} · {ACTIVITY_META.find(m => m.key === tour.activity)?.label ?? tour.activity}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0 2px', borderTop: '1px solid #F1EDE3', fontSize: 13.5, color: '#5C564E' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A8A296" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {tour.days === 1 ? '1 day' : `${tour.days} days`}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A8A296" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 6v4"/><path d="M12 14h.01"/></svg>
              {tour.difficulty}
            </span>
            {tour.note && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#9B4E30', fontWeight: 600 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9B4E30" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2.5 2 6 2s6-1 6-2v-5"/></svg>
                {tour.note}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10, marginTop: 'auto', paddingTop: 14 }}>
            <span style={{ fontSize: 13, color: '#A8A296', fontFamily: 'var(--font-hanken), sans-serif' }}>
              From{' '}
              <strong style={{ fontFamily: 'var(--font-spectral), serif', fontSize: 19, color: '#1E1C19', fontWeight: 600 }}>
                {fmt(tour.price)}
              </strong>
              {' '}<span style={{ whiteSpace: 'nowrap' }}>/ person</span>
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0,
              background: '#C75A37', color: '#fff', padding: '9px 13px', borderRadius: 10,
              fontFamily: 'var(--font-hanken), sans-serif', fontSize: 13, fontWeight: 600,
              boxShadow: hov ? '0 10px 20px -8px rgba(199,90,55,.6)' : 'none',
              transition: reduced ? 'none' : 'box-shadow .3s ease',
            }}>
              View Tour
              <span style={{ display: 'inline-flex', transform: hov && !reduced ? 'translateX(3px)' : 'none', transition: reduced ? 'none' : 'transform .3s ease' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function ToursListing() {
  const searchParams = useSearchParams()
  const initToggle = (() => {
    const v = searchParams.get('toggle')
    return v === 'day' ? 'day' : v === 'multi' ? 'multi' : 'all'
  })()
  const [toggle, setToggle]       = useState<'all' | 'multi' | 'day'>(initToggle)
  const [activities, setActivities] = useState<string[]>([])
  const [regions, setRegions]       = useState<string[]>([])
  const [difficulties, setDifficulties] = useState<string[]>([])
  const [durations, setDurations]   = useState<string[]>([])
  const [beginner, setBeginner]     = useState(false)
  const [family, setFamily]         = useState(false)
  const [winterChk, setWinterChk]   = useState(false)
  const [priceMin, setPriceMin]     = useState(PMIN)
  const [priceMax, setPriceMax]     = useState(PMAX)
  const [sort, setSort]             = useState('recommended')
  const [isMobile, setIsMobile]     = useState(false)
  const [sheetOpen, setSheetOpen]   = useState(false)
  const [sortOpen, setSortOpen]     = useState(false)
  const [reduced, setReduced]       = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 880px)')
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onM = () => setIsMobile(mq.matches)
    const onR = () => setReduced(rm.matches)
    onM(); onR()
    mq.addEventListener('change', onM)
    rm.addEventListener('change', onR)
    return () => { mq.removeEventListener('change', onM); rm.removeEventListener('change', onR) }
  }, [])

  const toggle_ = <T,>(arr: T[], val: T) => arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]

  const clearAll = useCallback(() => {
    setToggle('all'); setActivities([]); setRegions([]); setDifficulties([])
    setDurations([]); setBeginner(false); setFamily(false); setWinterChk(false)
    setPriceMin(PMIN); setPriceMax(PMAX)
  }, [])

  // Price slider
  const beginDrag = (which: 'min' | 'max') => (e: React.PointerEvent) => {
    e.preventDefault()
    const move = (ev: PointerEvent) => {
      if (!trackRef.current) return
      const r = trackRef.current.getBoundingClientRect()
      const pct = Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width))
      const raw = PMIN + pct * (PMAX - PMIN)
      const snapped = Math.round(raw / STEP) * STEP
      if (which === 'min') setPriceMin(prev => Math.min(snapped, priceMax - STEP))
      else setPriceMax(prev => Math.max(snapped, priceMin + STEP))
    }
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  const keyAdjust = (which: 'min' | 'max') => (e: React.KeyboardEvent) => {
    const cur = which === 'min' ? priceMin : priceMax
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault()
      if (which === 'min') setPriceMin(v => Math.max(PMIN, v - STEP))
      else setPriceMax(v => Math.max(priceMin + STEP, v - STEP))
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (which === 'min') setPriceMin(v => Math.min(priceMax - STEP, v + STEP))
      else setPriceMax(v => Math.min(PMAX, v + STEP))
    }
    void cur
  }

  // Filter
  const filtered = TOURS_DATA.filter(t => {
    if (toggle === 'multi' && t.days <= 1) return false
    if (toggle === 'day'   && t.days  > 1) return false
    if (activities.length  && !activities.includes(t.activity))   return false
    if (regions.length     && !regions.includes(t.region))        return false
    if (difficulties.length && !difficulties.includes(t.difficulty)) return false
    if (durations.length   && !durations.includes(bucket(t.days))) return false
    if (t.price < priceMin || t.price > priceMax)                  return false
    if (beginner && !t.beginner) return false
    if (family   && !t.family)   return false
    if (winterChk && !t.winter)  return false
    return true
  })

  // Sort
  const sorterFns: Record<string, (a: Tour, b: Tour) => number> = {
    recommended: (a, b) => ((b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)) || a.order - b.order,
    'price-asc': (a, b) => a.price - b.price,
    duration:    (a, b) => a.days - b.days,
    difficulty:  (a, b) => (diffRank[a.difficulty] ?? 1) - (diffRank[b.difficulty] ?? 1),
    newest:      (a, b) => b.order - a.order,
  }
  const sorted = [...filtered].sort(sorterFns[sort] ?? sorterFns.recommended)

  // Groups
  const groups = ACTIVITY_META.map(m => ({
    ...m, tours: sorted.filter(t => t.activity === m.key),
  })).filter(g => g.tours.length > 0)

  // Chips
  const chips: { label: string; remove: () => void }[] = []
  if (toggle !== 'all') chips.push({ label: toggle === 'multi' ? 'Multi-Day' : 'Day Tours', remove: () => setToggle('all') })
  activities.forEach(k => chips.push({ label: ACTIVITY_META.find(m => m.key === k)?.label ?? k, remove: () => setActivities(p => p.filter(x => x !== k)) }))
  regions.forEach(k => chips.push({ label: k, remove: () => setRegions(p => p.filter(x => x !== k)) }))
  difficulties.forEach(k => chips.push({ label: k, remove: () => setDifficulties(p => p.filter(x => x !== k)) }))
  durations.forEach(k => chips.push({ label: DUR_BUCKETS.find(d => d.key === k)?.label ?? k, remove: () => setDurations(p => p.filter(x => x !== k)) }))
  if (beginner)  chips.push({ label: 'Good for beginners', remove: () => setBeginner(false) })
  if (family)    chips.push({ label: 'Family-friendly',    remove: () => setFamily(false) })
  if (winterChk) chips.push({ label: 'Winter season',      remove: () => setWinterChk(false) })
  if (priceMin > PMIN || priceMax < PMAX) chips.push({ label: `${fmt(priceMin)} – ${fmt(priceMax)}`, remove: () => { setPriceMin(PMIN); setPriceMax(PMAX) } })

  const hasFilters = chips.length > 0
  const sortLabel  = SORT_OPTIONS.find(o => o.key === sort)?.label ?? 'Recommended'
  const minPct     = (priceMin / PMAX) * 100
  const maxPct     = (priceMax / PMAX) * 100

  // ── FILTER PANEL ────────────────────────────────────────────────────────────
  const filterPanel = (
    <div>
      {/* Desktop header */}
      {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontFamily: 'var(--font-spectral), serif', fontSize: 21, fontWeight: 500 }}>Filters</span>
          {hasFilters && (
            <button type="button" onClick={clearAll} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-hanken), sans-serif', fontSize: 13, fontWeight: 600, color: '#C75A37', padding: 4 }}>
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Mobile header */}
      {isMobile && (
        <div style={{ position: 'sticky', top: 0, background: '#fff', padding: '12px 0 8px', zIndex: 2 }}>
          <div style={{ width: 40, height: 4, borderRadius: 99, background: '#E2DCCF', margin: '0 auto 14px' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-spectral), serif', fontSize: 22, fontWeight: 500 }}>Filters</span>
            <button type="button" onClick={() => setSheetOpen(false)} style={{ display: 'inline-flex', width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 99, border: '1px solid #ECE8DE', background: '#fff', cursor: 'pointer', color: '#79736A' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* Activity */}
      <FilterSection label="Activity">
        {ACTIVITY_META.map(m => (
          <FilterRow key={m.key} checked={activities.includes(m.key)} label={m.label}
            count={TOURS_DATA.filter(t => t.activity === m.key).length}
            onToggle={() => setActivities(p => toggle_(p, m.key))} />
        ))}
      </FilterSection>

      {/* Region */}
      <FilterSection label="Region">
        {REGIONS.map(r => (
          <FilterRow key={r} checked={regions.includes(r)} label={r}
            count={TOURS_DATA.filter(t => t.region === r).length}
            onToggle={() => setRegions(p => toggle_(p, r))} />
        ))}
      </FilterSection>

      {/* Difficulty */}
      <FilterSection label="Difficulty">
        {DIFFS.map(d => (
          <FilterRow key={d} checked={difficulties.includes(d)} label={d}
            count={TOURS_DATA.filter(t => t.difficulty === d).length}
            onToggle={() => setDifficulties(p => toggle_(p, d))} />
        ))}
      </FilterSection>

      {/* Duration */}
      <FilterSection label="Duration">
        {DUR_BUCKETS.map(d => (
          <FilterRow key={d.key} checked={durations.includes(d.key)} label={d.label}
            count={TOURS_DATA.filter(t => bucket(t.days) === d.key).length}
            onToggle={() => setDurations(p => toggle_(p, d.key))} />
        ))}
      </FilterSection>

      {/* Price */}
      <div style={{ padding: '20px 0', borderTop: '1px solid #ECE8DE' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
          <span style={{ fontFamily: 'var(--font-hanken), sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#A8A296' }}>Price</span>
          <span style={{ fontFamily: 'var(--font-hanken), sans-serif', fontSize: 14, fontWeight: 600, color: '#1E1C19' }}>{fmt(priceMin)} – {fmt(priceMax)}</span>
        </div>
        <div ref={trackRef} style={{ position: 'relative', height: 22, margin: '0 10px' }}>
          <div style={{ position: 'absolute', top: 9, left: 0, right: 0, height: 4, borderRadius: 99, background: '#E2DCCF' }} />
          <div style={{ position: 'absolute', top: 9, left: `${minPct}%`, right: `${100 - maxPct}%`, height: 4, borderRadius: 99, background: '#C75A37' }} />
          {(['min', 'max'] as const).map(which => (
            <div
              key={which}
              role="slider"
              tabIndex={0}
              aria-label={which === 'min' ? 'Minimum price' : 'Maximum price'}
              aria-valuemin={PMIN}
              aria-valuemax={PMAX}
              aria-valuenow={which === 'min' ? priceMin : priceMax}
              onPointerDown={beginDrag(which)}
              onKeyDown={keyAdjust(which)}
              style={{
                position: 'absolute', top: '50%',
                left: `${which === 'min' ? minPct : maxPct}%`,
                transform: 'translate(-50%, -50%)',
                width: 20, height: 20, borderRadius: '50%',
                background: '#fff', border: '2px solid #C75A37',
                boxShadow: '0 1px 4px rgba(30,28,25,.3)',
                cursor: 'grab', touchAction: 'none', outline: 'none',
                zIndex: which === 'max' ? 2 : 1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Tags */}
      <div style={{ padding: '18px 0', borderTop: '1px solid #ECE8DE' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FilterRow checked={beginner}  label="Good for beginners" onToggle={() => setBeginner(p => !p)} />
          <FilterRow checked={family}    label="Family-friendly"    onToggle={() => setFamily(p => !p)} />
          <FilterRow checked={winterChk} label="Winter season"      onToggle={() => setWinterChk(p => !p)} />
        </div>
      </div>

      {/* Mobile footer */}
      {isMobile && (
        <div style={{ position: 'sticky', bottom: 0, background: '#fff', padding: '14px 0 8px', display: 'flex', gap: 10, borderTop: '1px solid #ECE8DE' }}>
          <button type="button" onClick={clearAll} style={{ padding: '14px 18px', borderRadius: 12, border: '1px solid #DAD3C5', background: '#fff', fontFamily: 'var(--font-hanken), sans-serif', fontSize: 15, fontWeight: 600, color: '#1E1C19', cursor: 'pointer' }}>Clear</button>
          <button type="button" onClick={() => setSheetOpen(false)} style={{ flex: 1, padding: '14px 18px', borderRadius: 12, border: 'none', background: '#C75A37', fontFamily: 'var(--font-hanken), sans-serif', fontSize: 15, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
            Show {filtered.length} tour{filtered.length !== 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div style={{ background: '#FAF8F3', fontFamily: 'var(--font-hanken), system-ui, sans-serif', color: '#1E1C19' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 28px 96px' }}>

        {/* Toggle */}
        <div style={{ padding: '32px 4px 22px' }}>
          <div style={{ display: 'inline-flex', gap: 4, padding: 5, background: '#fff', border: '1px solid #ECE8DE', borderRadius: 14, boxShadow: '0 1px 2px rgba(30,28,25,.04)' }}>
            {(['all', 'multi', 'day'] as const).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setToggle(t)}
                style={{
                  appearance: 'none', border: 'none', cursor: 'pointer',
                  padding: '10px 20px', borderRadius: 10,
                  fontFamily: 'var(--font-hanken), sans-serif', fontSize: 14.5, fontWeight: 600,
                  transition: reduced ? 'none' : 'background .2s ease, color .2s ease',
                  background: toggle === t ? '#2E4034' : 'transparent',
                  color: toggle === t ? '#fff' : '#5C564E',
                }}
              >
                {t === 'all' ? 'All' : t === 'multi' ? 'Multi-Day' : 'Day Tours'}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile sticky bar */}
        {isMobile && (
          <div style={{ position: 'sticky', top: 'var(--jump-nav-top, 72px)', transition: 'top .3s cubic-bezier(.4,0,.2,1)', zIndex: 40, background: 'rgba(250,248,243,.92)', backdropFilter: 'blur(10px)', margin: '0 -28px', padding: '12px 28px', borderBottom: '1px solid #ECE8DE', display: 'flex', gap: 10 }}>
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fff', border: '1px solid #DAD3C5', borderRadius: 12, padding: 12, fontFamily: 'var(--font-hanken), sans-serif', fontSize: 15, fontWeight: 600, color: '#1E1C19', cursor: 'pointer' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/>
                <line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/>
                <line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/>
                <line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>
              </svg>
              Filters
              {hasFilters && (
                <span style={{ display: 'inline-flex', minWidth: 20, height: 20, padding: '0 6px', alignItems: 'center', justifyContent: 'center', borderRadius: 99, background: '#C75A37', color: '#fff', fontFamily: 'var(--font-hanken), sans-serif', fontSize: 11, fontWeight: 700 }}>
                  {chips.length}
                </span>
              )}
            </button>
            <div style={{ position: 'relative' }}>
              <button type="button" onClick={() => setSortOpen(p => !p)} style={{ height: '100%', display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #DAD3C5', borderRadius: 12, padding: '12px 14px', fontFamily: 'var(--font-hanken), sans-serif', fontSize: 15, fontWeight: 600, color: '#1E1C19', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {sortLabel}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              {sortOpen && <SortMenu options={SORT_OPTIONS} current={sort} onSelect={k => { setSort(k); setSortOpen(false) }} onClose={() => setSortOpen(false)} />}
            </div>
          </div>
        )}

        {/* Main area */}
        <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start', marginTop: 8 }}>

          {/* Backdrop */}
          {isMobile && sheetOpen && (
            <div onClick={() => setSheetOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(30,28,25,.4)', zIndex: 55, animation: reduced ? undefined : 'tlFadeIn .2s ease' }} />
          )}

          {/* Desktop sidebar */}
          {!isMobile && (
            <aside style={{ width: 278, flexShrink: 0, position: 'sticky', top: 88, maxHeight: 'calc(100vh - 104px)', overflowY: 'auto', paddingRight: 4 }}>
              {filterPanel}
            </aside>
          )}

          {/* Mobile bottom sheet */}
          {isMobile && sheetOpen && (
            <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 60, maxHeight: '86vh', overflowY: 'auto', background: '#fff', borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: '0 20px 20px', boxShadow: '0 -16px 50px rgba(30,28,25,.28)', animation: reduced ? undefined : 'tlSheetUp .32s cubic-bezier(.2,.7,.2,1)' }}>
              {filterPanel}
            </div>
          )}

          {/* Results */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Desktop controls bar */}
            {!isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingBottom: 14 }}>
                <div style={{ fontSize: 15, color: '#79736A' }}>
                  <strong style={{ color: '#1E1C19', fontWeight: 600 }}>{filtered.length}</strong> {filtered.length === 1 ? 'tour' : 'tours'}
                </div>
                <div style={{ position: 'relative' }}>
                  <button type="button" onClick={() => setSortOpen(p => !p)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid #DAD3C5', borderRadius: 12, padding: '10px 14px', fontFamily: 'var(--font-hanken), sans-serif', fontSize: 15, fontWeight: 500, color: '#1E1C19', cursor: 'pointer' }}>
                    <span style={{ color: '#A8A296' }}>Sort:</span>
                    <span style={{ fontWeight: 600 }}>{sortLabel}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                  {sortOpen && <SortMenu options={SORT_OPTIONS} current={sort} onSelect={k => { setSort(k); setSortOpen(false) }} onClose={() => setSortOpen(false)} />}
                </div>
              </div>
            )}

            {/* Chips */}
            {hasFilters && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '6px 0 22px' }}>
                {chips.map((chip, i) => <FilterChip key={i} label={chip.label} onRemove={chip.remove} />)}
                <button type="button" onClick={clearAll} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-hanken), sans-serif', fontSize: 13.5, fontWeight: 600, color: '#A8A296', padding: '7px 6px' }}>
                  Clear all
                </button>
              </div>
            )}

            {/* Groups */}
            {groups.length > 0 && groups.map((group, gi) => (
              <section key={group.key} id={group.anchor} style={{ scrollMarginTop: 80, marginBottom: 44 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: 11, background: '#F1EDE3', color: '#C75A37', flexShrink: 0 }}>
                    <ActivityIcon type={group.key} />
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 27, margin: 0, letterSpacing: '-.01em' }}>{group.label}</h2>
                  <span style={{ fontSize: 14, color: '#B7B0A3' }}>{group.tours.length} {group.tours.length === 1 ? 'tour' : 'tours'}</span>
                  <div style={{ flex: 1, height: 1, background: '#ECE8DE' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(268px, 1fr))', gap: 24 }}>
                  {group.tours.map((tour, ti) => (
                    <TourCard key={tour.id} tour={tour} reduced={reduced} globalIdx={gi * 10 + ti} isMobile={isMobile} />
                  ))}
                </div>
              </section>
            ))}

            {/* Empty state */}
            {groups.length === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '64px 24px', background: '#fff', border: '1px solid #ECE8DE', borderRadius: 20, marginTop: 8 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 72, height: 72, borderRadius: 99, background: '#F1EDE3', color: '#2E4034', marginBottom: 22 }}>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
                </span>
                <h3 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 27, margin: '0 0 10px', maxWidth: 440 }}>No tours match yet — but we can build one for you</h3>
                <p style={{ margin: '0 0 26px', fontSize: 16, lineHeight: 1.5, color: '#79736A', maxWidth: 420 }}>Tell us where you&apos;d like to go and we&apos;ll design a private trip around your dates, pace and budget.</p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button type="button" onClick={clearAll} style={{ padding: '13px 20px', borderRadius: 12, border: '1px solid #DAD3C5', background: '#fff', fontFamily: 'var(--font-hanken), sans-serif', fontSize: 15, fontWeight: 600, color: '#1E1C19', cursor: 'pointer' }}>
                    Clear filters
                  </button>
                  <Link href="/en/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 22px', borderRadius: 12, background: '#C75A37', color: '#fff', fontFamily: 'var(--font-hanken), sans-serif', fontSize: 15, fontWeight: 600, textDecoration: 'none', boxShadow: '0 10px 24px -8px rgba(199,90,55,.6)' }}>
                    Plan a Custom Trip
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tlFadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes tlSheetUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
        @keyframes tlCardIn  { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  )
}

// ── FILTER SECTION WRAPPER ────────────────────────────────────────────────────
function FilterSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: '18px 0', borderTop: '1px solid #ECE8DE' }}>
      <div style={{ fontFamily: 'var(--font-hanken), sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#A8A296', marginBottom: 12 }}>
        {label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>{children}</div>
    </div>
  )
}

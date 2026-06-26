'use client'
import { useEffect, useRef, useState } from 'react'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'details', label: 'Details' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'faq', label: 'FAQ' },
]

export default function TourJumpNav() {
  const [active, setActive] = useState('overview')
  const [pinned, setPinned] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(([e]) => setPinned(!e.isIntersecting), { threshold: 0, rootMargin: '-72px 0px 0px 0px' })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sectionIds = TABS.map(t => t.id)
    const observers: IntersectionObserver[] = []
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setActive(id)
      }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 })
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const offset = 130
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <>
      <div ref={sentinelRef} style={{ height: 1 }} aria-hidden="true" />
      <div
        className="tp-jump-nav"
        ref={navRef}
        style={{
          position: 'sticky',
          top: 'var(--jump-nav-top, 72px)',
          zIndex: 40,
          background: pinned ? 'rgba(255,255,255,.96)' : 'transparent',
          backdropFilter: pinned ? 'blur(12px)' : 'none',
          borderBottom: pinned ? '1px solid rgba(30,28,25,.08)' : '1px solid transparent',
          transition: 'background .25s, border-color .25s, box-shadow .25s',
          boxShadow: pinned ? '0 4px 18px -8px rgba(30,28,25,.12)' : 'none',
        }}
      >
        <style>{`
          .jump-scroll::-webkit-scrollbar { display:none }
          @media(max-width:640px){ .jump-inner { padding: 0 16px !important; } }
        `}</style>
        <div className="jump-scroll jump-inner" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', display: 'flex', gap: 4, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              aria-current={active === tab.id ? 'location' : undefined}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '14px 16px',
                fontSize: 14, fontWeight: active === tab.id ? 700 : 500,
                fontFamily: 'var(--font-hanken), sans-serif',
                color: active === tab.id ? '#C75A37' : '#6F6A60',
                borderBottom: active === tab.id ? '2px solid #C75A37' : '2px solid transparent',
                whiteSpace: 'nowrap',
                transition: 'color .2s, border-color .2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

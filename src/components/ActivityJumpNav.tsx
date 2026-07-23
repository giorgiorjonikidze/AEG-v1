'use client'
import { useEffect, useRef, useState } from 'react'

const TABS = [
  { id: 'act-intro',      label: 'Overview' },
  { id: 'act-tours',      label: 'Tours' },
  { id: 'act-gallery',    label: 'Gallery' },
  { id: 'act-facts',      label: 'Quick Facts' },
  { id: 'act-difficulty', label: 'Difficulty' },
  { id: 'act-season',     label: 'Best Time' },
  { id: 'act-practical',  label: 'Practical' },
  { id: 'act-faq',        label: 'FAQ' },
]

export default function ActivityJumpNav() {
  const [active, setActive] = useState(TABS[0].id)
  const [pinned, setPinned] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const obs = new IntersectionObserver(([e]) => setPinned(!e.isIntersecting), { threshold: 0 })
    obs.observe(sentinel)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    TABS.forEach(tab => {
      const el = document.getElementById(tab.id)
      if (!el) return
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setActive(tab.id)
      }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 })
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 130
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <>
      <div ref={sentinelRef} style={{ height: 1 }} aria-hidden="true" />
      <div
        style={{
          position: 'sticky',
          top: 'var(--jump-nav-top, 72px)',
          zIndex: 40,
          background: pinned ? 'rgba(250,248,243,.96)' : 'rgba(250,248,243,.7)',
          backdropFilter: 'blur(12px)',
          borderBottom: pinned ? '1px solid rgba(30,28,25,.1)' : '1px solid rgba(30,28,25,.06)',
          boxShadow: pinned ? '0 4px 18px -8px rgba(30,28,25,.12)' : 'none',
          transition: 'top .3s cubic-bezier(.4,0,.2,1), box-shadow .25s, border-color .25s',
        }}
      >
        <style>{`.act-jnav-scroll::-webkit-scrollbar{display:none}`}</style>
        <div
          className="act-jnav-scroll"
          style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,48px)', display: 'flex', gap: 2, overflowX: 'auto', scrollbarWidth: 'none' }}
        >
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              aria-current={active === tab.id ? 'location' : undefined}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '15px 14px',
                fontSize: 13.5, fontWeight: active === tab.id ? 700 : 500,
                fontFamily: 'var(--font-hanken), sans-serif',
                color: active === tab.id ? '#C75A37' : '#6F6A60',
                borderBottom: active === tab.id ? '2px solid #C75A37' : '2px solid transparent',
                whiteSpace: 'nowrap',
                transition: 'color .2s, border-color .2s',
                letterSpacing: '.1px',
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

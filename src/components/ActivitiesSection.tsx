'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const ACTIVITIES = [
  { name: 'Trekking & Hiking', href: '/en/tours#trekking',    img: '/images/activities/trekking.jpg',    alt: 'Group hiking the trail toward Mount Kazbek' },
  { name: 'Biking',            href: '/en/tours#biking',       img: '/images/activities/biking.jpg',      alt: 'Mountain biking on Georgian trails' },
  { name: 'Caving',            href: '/en/tours#caving',       img: '/images/activities/caving.jpg',      alt: 'Exploring caves in Georgia' },
  { name: 'Canyoning',         href: '/en/tours#canyoning',    img: '/images/activities/canyoning.jpg',   alt: 'Canyoning through Georgian canyons' },
  { name: 'Overlanding',       href: '/en/tours#overlanding',  img: '/images/activities/overlanding.jpg', alt: 'A convoy of 4x4 vehicles crossing the steppe' },
  { name: 'Mixed Tours',       href: '/en/tours#mixed',        img: '/images/activities/mixed-tours.jpg', alt: 'Backpacker watching sunrise from a granite summit' },
  { name: 'Summit Experience', href: '/en/tours#summit',       img: '/images/activities/summit.jpg',      alt: 'Mountaineer ascending a snowy peak' },
  { name: 'Climbing',          href: '/en/tours#climbing',     img: '/images/activities/climbing.jpg',    alt: 'Rock climber on a steep sandstone wall' },
  { name: 'Winter',            href: '/en/tours#winter',       img: '/images/activities/winter.jpg',      alt: 'Skier carving past snow-covered mountain cabins' },
]

const SCRIM = 'linear-gradient(to top, rgba(18,16,14,.88) 0%, rgba(18,16,14,.45) 38%, rgba(18,16,14,0) 66%)'
const ACCENT = '#C75A37'

export default function ActivitiesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const deskRowRef = useRef<HTMLDivElement>(null)
  const mobRowRef  = useRef<HTMLDivElement>(null)
  const [activeMobile, setActiveMobile] = useState(0)

  // Staggered scroll-reveal via IntersectionObserver
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const cards = section.querySelectorAll<HTMLElement>('.act2-reveal')
    const revealAll = () => cards.forEach(c => c.classList.add('is-in'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window) || !cards.length) { revealAll(); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        const card = e.target as HTMLElement
        const idx = Array.prototype.indexOf.call(card.parentElement?.children, card)
        setTimeout(() => card.classList.add('is-in'), Math.min(idx, 8) * 80)
        io.unobserve(card)
      })
    }, { threshold: 0.08 })
    cards.forEach(c => io.observe(c))
    // Short fallback: never leave cards invisible
    const fallback = setTimeout(revealAll, 400)
    return () => { clearTimeout(fallback); io.disconnect() }
  }, [])

  // Desktop drag-to-scroll
  useEffect(() => {
    const el = deskRowRef.current
    if (!el) return
    let down = false, startX = 0, startScroll = 0, moved = false, suppressClick = false
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      down = true; moved = false
      startX = e.clientX; startScroll = el.scrollLeft
      el.style.cursor = 'grabbing'
      try { el.setPointerCapture(e.pointerId) } catch (_) {}
      e.preventDefault()
    }
    const onMove = (e: PointerEvent) => {
      if (!down) return
      if (Math.abs(e.clientX - startX) > 4) moved = true
      el.scrollLeft = startScroll - (e.clientX - startX)
    }
    const onUp = (e: PointerEvent) => {
      if (!down) return
      down = false; el.style.cursor = 'grab'
      try { el.releasePointerCapture(e.pointerId) } catch (_) {}
      if (moved) { suppressClick = true; setTimeout(() => { suppressClick = false }, 0) }
    }
    const onClick = (e: MouseEvent) => { if (suppressClick) { e.preventDefault(); e.stopPropagation() } }
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    el.addEventListener('click', onClick, true)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
      el.removeEventListener('click', onClick, true)
    }
  }, [])

  const scrollDesk = (dir: number) => {
    deskRowRef.current?.scrollBy({ left: dir * (320 + 14) * 2, behavior: 'smooth' })
  }

  const onMobScroll = () => {
    const el = mobRowRef.current
    if (!el || el.children.length < 2) return
    const step = (el.children[1] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft
    if (step <= 0) return
    const idx = Math.max(0, Math.min(Math.round(el.scrollLeft / step), ACTIVITIES.length - 1))
    setActiveMobile(idx)
  }

  const goMob = (i: number) => {
    const el = mobRowRef.current
    if (!el) return
    const c = el.children[i] as HTMLElement
    if (c) el.scrollTo({ left: Math.max(0, c.offsetLeft - 20), behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} style={{ background: '#1E1C19', fontFamily: 'var(--font-hanken), system-ui, sans-serif' }}>

      {/* ── DESKTOP ─────────────────────────────────────── */}
      <div className="hidden md:block" style={{ padding: '58px 0 62px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, padding: '0 56px', marginBottom: 36 }}>
          <div style={{ maxWidth: 580 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 20 }}>
              <span style={{ display: 'block', width: 30, height: 1.5, background: ACCENT }} />
              <span style={{ color: ACCENT, fontSize: 13, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' }}>Activities</span>
            </div>
            <h2 style={{ margin: '0 0 14px', color: '#FAF8F3', fontFamily: 'var(--font-hanken), sans-serif', fontWeight: 700, fontSize: 54, lineHeight: 1.0, letterSpacing: '-.022em', width: 'max-content' }}>Choose Your Adventure</h2>
            <p style={{ margin: 0, color: 'rgba(250,248,243,.62)', fontSize: 17, lineHeight: 1.5 }}>Swipe to explore what&apos;s possible in Georgia.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
            {[
              { dir: -1, label: 'Previous activities', path: 'M15 18l-6-6 6-6' },
              { dir:  1, label: 'Next activities',     path: 'M9 18l6-6-6-6' },
            ].map(btn => (
              <button
                key={btn.dir}
                type="button"
                aria-label={btn.label}
                onClick={() => scrollDesk(btn.dir)}
                style={{ width: 52, height: 52, borderRadius: 999, border: '1px solid rgba(250,248,243,.26)', background: 'transparent', color: '#FAF8F3', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background .25s, border-color .25s, color .25s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#C75A37'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#C75A37' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(250,248,243,.26)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d={btn.path} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Scroll row */}
        <div
          ref={deskRowRef}
          className="scrollbar-hide"
          style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '6px 56px 8px', cursor: 'grab', userSelect: 'none' }}
        >
          {ACTIVITIES.map(act => (
            <Link key={act.name} href={act.href} aria-label={`${act.name} — view tours`} className="act2-card act2-reveal">
              <Image className="act2-img" src={act.img} alt={act.alt} fill sizes="320px" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: SCRIM, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', left: 20, right: 20, bottom: 18, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
                <span className="act2-view" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#FAF8F3', fontFamily: 'var(--font-hanken), sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase' }}>
                  View tours
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="18" y2="12"/><polyline points="12 6 18 12 12 18"/></svg>
                </span>
                <h3 style={{ margin: 0, color: '#FAF8F3', fontFamily: 'var(--font-hanken), sans-serif', fontWeight: 600, fontSize: 22, lineHeight: 1.06, textShadow: '0 1px 16px rgba(0,0,0,.45)' }}>{act.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── MOBILE ──────────────────────────────────────── */}
      <div className="block md:hidden" style={{ padding: '40px 0 34px' }}>
        {/* Header */}
        <div style={{ padding: '0 20px', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 15 }}>
            <span style={{ display: 'block', width: 24, height: 1.5, background: ACCENT }} />
            <span style={{ color: ACCENT, fontSize: 12, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' }}>Activities</span>
          </div>
          <h2 style={{ margin: '0 0 11px', color: '#FAF8F3', fontFamily: 'var(--font-hanken), sans-serif', fontWeight: 700, fontSize: 31, lineHeight: 1.02, letterSpacing: '-.02em', width: 'max-content' }}>Choose Your Adventure</h2>
          <p style={{ margin: 0, color: 'rgba(250,248,243,.62)', fontSize: 14.5, lineHeight: 1.45 }}>Swipe to explore what&apos;s possible in Georgia.</p>
        </div>

        {/* Scroll row */}
        <div
          ref={mobRowRef}
          onScroll={onMobScroll}
          className="scrollbar-hide"
          style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '4px 20px 0', scrollSnapType: 'x mandatory', scrollPaddingLeft: 20 }}
        >
          {ACTIVITIES.map(act => (
            <Link key={act.name} href={act.href} aria-label={`${act.name} — view tours`} className="act2-card act2-reveal">
              <Image className="act2-img" src={act.img} alt={act.alt} fill sizes="78vw" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: SCRIM, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', left: 18, right: 18, bottom: 16, display: 'flex', flexDirection: 'column', gap: 7, alignItems: 'flex-start' }}>
                <span className="act2-view" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#FAF8F3', fontFamily: 'var(--font-hanken), sans-serif', fontSize: 11.5, fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase' }}>
                  View tours
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="18" y2="12"/><polyline points="12 6 18 12 12 18"/></svg>
                </span>
                <h3 style={{ margin: 0, color: '#FAF8F3', fontFamily: 'var(--font-hanken), sans-serif', fontWeight: 600, fontSize: 20, lineHeight: 1.06, textShadow: '0 1px 16px rgba(0,0,0,.45)' }}>{act.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '22px 20px 4px' }}>
          {ACTIVITIES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to activity ${i + 1}`}
              onClick={() => goMob(i)}
              style={{ padding: '18px 5px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span style={{ display: 'block', width: i === activeMobile ? 22 : 7, height: 7, borderRadius: 4, background: i === activeMobile ? ACCENT : 'rgba(250,248,243,.28)', transition: 'width .3s ease, background .3s ease' }} />
            </button>
          ))}
        </div>
      </div>

    </section>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { FEATURED_TOURS } from '@/lib/data'

export default function FeaturedAdventures() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const cardStep = () => {
    const el = scrollerRef.current
    if (!el) return 1
    const card = el.querySelector<HTMLElement>('[data-card]')
    if (!card) return el.clientWidth
    const gap = parseFloat(getComputedStyle(el).columnGap || '26') || 26
    return card.getBoundingClientRect().width + gap
  }

  const update = () => {
    const el = scrollerRef.current
    if (!el) return
    const step = cardStep()
    const idx = Math.round(el.scrollLeft / step)
    setActiveIndex(idx)
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2)
  }

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    requestAnimationFrame(update)
    el.addEventListener('scroll', update, { passive: true })

    // Drag-to-scroll
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
      el.removeEventListener('scroll', update)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
      el.removeEventListener('click', onClick, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const scrollPrev = () => scrollerRef.current?.scrollBy({ left: -cardStep(), behavior: 'smooth' })
  const scrollNext = () => scrollerRef.current?.scrollBy({ left: cardStep(), behavior: 'smooth' })
  const goTo = (i: number) => scrollerRef.current?.scrollTo({ left: i * cardStep(), behavior: 'smooth' })

  return (
    <section style={{ position: 'relative', background: '#FAF6EE', fontFamily: 'var(--font-plus-jakarta), sans-serif', padding: '64px 0 72px', color: '#1E1C19', overflow: 'hidden' }}>
      {/* Contours texture */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: "url('/images/contours.png')", backgroundSize: '1100px auto', backgroundRepeat: 'repeat', opacity: .85 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1320, margin: '0 auto', padding: '0 clamp(20px,5vw,48px)' }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 32 }}>
          <div style={{ width: 'max-content' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#C75A37', marginBottom: 10, whiteSpace: 'nowrap' }}>Adventure Experts Georgia</div>
            <h2 style={{ fontFamily: 'var(--font-source-serif), serif', fontWeight: 600, fontSize: 'clamp(28px,4vw,40px)', lineHeight: 1.05, margin: 0, letterSpacing: '-.01em', whiteSpace: 'nowrap', width: 'max-content' }}>Featured Adventures</h2>
          </div>

          {/* Arrow buttons — desktop only */}
          <div className="hidden md:flex" style={{ gap: 12, flex: 'none', paddingBottom: 6 }}>
            {[
              { dir: 'prev', label: 'Previous adventures', disabled: atStart, onClick: scrollPrev, path: 'M15 18l-6-6 6-6' },
              { dir: 'next', label: 'Next adventures', disabled: atEnd, onClick: scrollNext, path: 'M9 18l6-6-6-6' },
            ].map(btn => (
              <button
                key={btn.dir}
                type="button"
                aria-label={btn.label}
                disabled={btn.disabled}
                onClick={btn.onClick}
                style={{ width: 48, height: 48, borderRadius: 999, border: '1.5px solid #E4DECF', background: '#fff', color: '#1E1C19', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: btn.disabled ? 'not-allowed' : 'pointer', padding: 0, opacity: btn.disabled ? .35 : 1, transition: 'background .2s, border-color .2s, color .2s' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d={btn.path}/>
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollerRef}
          className="scrollbar-hide"
          style={{ display: 'flex', gap: 26, overflowX: 'auto', padding: '6px 0 8px', margin: '-6px 0 0', cursor: 'grab' }}
        >
          {FEATURED_TOURS.map(t => (
            <Link
              key={t.id}
              href={t.href}
              data-card
              className="ae-card ae-card-link"
              style={{ textDecoration: 'none', color: 'inherit', background: '#fff', borderRadius: 5, boxShadow: '0 6px 20px -10px rgba(30,28,25,.18)', overflow: 'hidden', display: 'flex', flexDirection: 'column', flexShrink: 0 }}
            >
              {/* Photo */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: '#ECE7DC' }}>
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  sizes="(min-width:1000px) 340px, (min-width:680px) 46vw, 78vw"
                  className="ae-card-photo"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>

              {/* Info */}
              <div style={{ padding: '20px 20px 22px', display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <h3 style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700, fontSize: 21, lineHeight: 1.18, margin: 0, letterSpacing: '-.01em' }}>{t.name}</h3>
                  <p style={{ margin: 0, fontSize: 14, color: '#A8A296', fontWeight: 500 }}>{t.hook}</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#A8A296', fontWeight: 500 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C75A37" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.6"/>
                  </svg>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.region} · {t.activity}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13.5, color: '#1E1C19', fontWeight: 600, paddingTop: 1 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A8A296" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                    {t.duration}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A8A296" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}><path d="M4 19V11"/><path d="M11 19V7"/><path d="M18 19V3"/></svg>
                    {t.difficulty}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 'auto', paddingTop: 14, borderTop: '1px solid #F1ECE1' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <span style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(46,64,52,.10)', color: '#2E4034', fontSize: 10.5, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 999 }}>
                      <span style={{ width: 5, height: 5, borderRadius: 999, background: '#2E4034' }} />
                      {t.badge}
                    </span>
                    <span style={{ fontSize: 13, color: '#A8A296', fontWeight: 500 }}>
                      From <strong style={{ fontFamily: 'var(--font-source-serif), serif', color: '#1E1C19', fontSize: 20, fontWeight: 700 }}>{t.price}</strong>{' '}
                      <span style={{ color: '#A8A296' }}>/ person</span>
                    </span>
                  </div>
                  <span className="ae-view-btn" style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 7, background: '#C75A37', color: '#fff', fontSize: 13.5, fontWeight: 600, padding: '11px 16px', borderRadius: 5, boxShadow: '0 6px 16px -6px rgba(199,90,55,.55)', transition: 'background .2s' }}>
                    View Tour
                    <svg className="ae-btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {/* View all card */}
          <Link href="/en/tours" className="ae-card" style={{ scrollSnapAlign: 'start', textDecoration: 'none', color: 'inherit', background: '#F0EBE0', borderRadius: 5, border: '1.5px dashed #D9D2C4', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, minHeight: 340 }}>
            <div style={{ textAlign: 'center', padding: 24 }}>
              <div style={{ width: 48, height: 48, borderRadius: 999, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C75A37" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
              </div>
              <div style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 600, fontSize: 15, color: '#1E1C19', marginBottom: 6 }}>View All Tours</div>
              <div style={{ fontSize: 13, color: '#A8A296' }}>Browse our full collection</div>
            </div>
          </Link>
        </div>

        {/* Dots — mobile only (padded to meet 44px touch target) */}
        <div className="flex md:hidden" style={{ justifyContent: 'center', gap: 2, marginTop: 18 }}>
          {FEATURED_TOURS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to adventure ${i + 1}`}
              onClick={() => goTo(i)}
              style={{ border: 'none', padding: '18px 6px', cursor: 'pointer', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span style={{ display: 'block', borderRadius: 999, height: 8, background: i === activeIndex ? '#C75A37' : '#D9D2C4', width: i === activeIndex ? 24 : 8, transition: 'width .3s, background .3s' }} />
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}

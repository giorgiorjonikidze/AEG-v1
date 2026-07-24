'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { GUIDES } from '@/data/guides'

export default function WhyChooseUs() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]

    cards.forEach((wrap) => {
      const surface = wrap.firstElementChild as HTMLDivElement | null
      const img = wrap.querySelector('img') as HTMLImageElement | null
      if (img) img.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)'
      if (surface)
        surface.style.transition =
          'transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s ease'

      const enter = () => {
        if (surface) {
          surface.style.boxShadow = '0 24px 50px rgba(30,28,25,.18)'
          if (!reduce) surface.style.transform = 'translateY(-7px)'
        }
        if (img && !reduce) img.style.transform = 'scale(1.06)'
      }
      const leave = () => {
        if (surface) {
          surface.style.boxShadow = '0 10px 30px rgba(30,28,25,.10)'
          surface.style.transform = ''
        }
        if (img) img.style.transform = ''
      }

      if (surface) {
        surface.addEventListener('mouseenter', enter)
        surface.addEventListener('mouseleave', leave)
        surface.addEventListener('focus', enter)
        surface.addEventListener('blur', leave)
      }
    })

    if (reduce) {
      cards.forEach((w) => {
        w.style.opacity = '1'
        w.style.transform = 'none'
      })
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLDivElement
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.18 }
    )

    cards.forEach((wrap, idx) => {
      const delay = (idx % 3) * 100
      wrap.style.opacity = '0'
      wrap.style.transform = 'translateY(28px)'
      wrap.style.transition = `opacity .7s ease ${delay}ms, transform .8s cubic-bezier(.22,1,.36,1) ${delay}ms`
      io.observe(wrap)
    })

    return () => io.disconnect()
  }, [])

  return (
    <section
      style={{
        background: '#F5F0E8',
        padding: 'clamp(56px,8vw,88px) clamp(24px,6vw,72px) clamp(60px,8vw,92px)',
        fontFamily: 'var(--font-hanken), system-ui, sans-serif',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>

        {/* Intro */}
        <div style={{ maxWidth: 740, margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              fontFamily: 'var(--font-hanken), sans-serif',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: '#C75A37',
              marginBottom: 20,
            }}
          >
            Why Choose Us
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-spectral), serif',
              fontWeight: 500,
              fontSize: 'clamp(30px,4vw,46px)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: '#1E1C19',
              margin: '0 0 clamp(18px,2vw,24px)',
            }}
          >
            Led by Certified Local Guides
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-hanken), sans-serif',
              fontSize: 'clamp(16px,1.5vw,18px)',
              lineHeight: 1.65,
              color: '#46423b',
              margin: 0,
            }}
          >
            Every Adventure Experts trip is led by certified, local guides who were born in these
            mountains and know them better than any map. They&apos;re trained in wilderness safety
            and first aid, so you&apos;re in expert hands from the first step to the last — and
            because they&apos;re locals, they&apos;ll take you to the places, people, and stories
            most travelers never find.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(20px,2vw,28px)',
            marginTop: 'clamp(40px,6vw,64px)',
          }}
          className="why-cards-grid"
        >
          {GUIDES.map((g, idx) => {
            const bio = g.shortBio || g.bio.split(/\n\n+/)[0]
            const alt = `${g.name}, ${g.role} at Adventure Experts Georgia`
            return (
            <div
              key={g.key}
              ref={(el) => { cardRefs.current[idx] = el }}
            >
              <div
                tabIndex={0}
                role="group"
                aria-label={`${g.name}, ${g.role}`}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 5,
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(30,28,25,.10)',
                  cursor: 'default',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.outline =
                    '2.5px solid #C75A37'
                  ;(e.currentTarget as HTMLDivElement).style.outlineOffset = '3px'
                }}
                onBlur={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.outline = 'none'
                }}
              >
                {/* Photo */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '4/5',
                    overflow: 'hidden',
                    background: '#d8d3c8',
                  }}
                >
                  <Image
                    src={g.img}
                    alt={alt}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Body */}
                <div style={{ padding: 'clamp(22px,2vw,24px) clamp(22px,2vw,24px) clamp(24px,2vw,26px)' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-hanken), sans-serif',
                      fontWeight: 700,
                      fontSize: 'clamp(20px,1.5vw,21px)',
                      lineHeight: 1.2,
                      color: '#1E1C19',
                      margin: '0 0 5px',
                    }}
                  >
                    {g.name}
                  </h3>
                  <div
                    style={{
                      fontFamily: 'var(--font-hanken), sans-serif',
                      fontWeight: 600,
                      fontSize: 12,
                      letterSpacing: '.09em',
                      textTransform: 'uppercase',
                      color: '#C75A37',
                      marginBottom: 14,
                    }}
                  >
                    {g.role}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-spectral), serif',
                      fontSize: 16,
                      lineHeight: 1.55,
                      color: '#46423b',
                      margin: '0 0 18px',
                    }}
                  >
                    {bio}
                  </p>

                  {/* Disciplines */}
                  {g.disciplines?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 16 }}>
                      {g.disciplines.map((d) => (
                        <span
                          key={d}
                          style={{
                            fontFamily: 'var(--font-hanken), sans-serif',
                            fontSize: 12,
                            fontWeight: 600,
                            letterSpacing: '.01em',
                            color: '#2E4034',
                            background: 'rgba(46,64,52,.08)',
                            padding: '5px 11px',
                            borderRadius: 999,
                          }}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Languages */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8a8478" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9"/>
                      <path d="M3 12h18"/>
                      <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/>
                    </svg>
                    <span
                      style={{
                        fontFamily: 'var(--font-hanken), sans-serif',
                        fontSize: 12.5,
                        fontWeight: 500,
                        color: '#6f6a60',
                        letterSpacing: '.04em',
                      }}
                    >
                      {g.langs}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            )
          })}
        </div>

        {/* Link */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(36px,4vw,52px)' }}>
          <Link
            href="/en/guides"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'var(--font-hanken), sans-serif',
              fontSize: 'clamp(15px,1.2vw,16px)',
              fontWeight: 600,
              color: '#C75A37',
              textDecoration: 'none',
              letterSpacing: '.01em',
              padding: '4px 2px',
              borderBottom: '1.5px solid transparent',
              transition: 'border-color .2s ease',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.borderBottomColor = '#C75A37'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent'
            }}
          >
            Meet all our guides
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C75A37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </div>

      </div>

      <style>{`
        @media (max-width: 720px) {
          .why-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

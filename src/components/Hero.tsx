'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [scrolled, setScrolled] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    try {
      setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    } catch {}
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToNext = () => {
    const next = document.getElementById('local-team')
    if (!next) return
    next.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <section style={{ position: 'relative', height: '100dvh', minHeight: 560, overflow: 'hidden' }}>
      {/* Background image */}
      <Image
        src="/images/georgia-hero.avif"
        alt="Georgian mountain landscape — Caucasus"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center 38%' }}
      />

      {/* Dark gradient scrim */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(20,28,22,.18) 0%, rgba(20,28,22,0) 30%, rgba(20,28,22,.52) 100%)',
      }} />

      {/* ── Desktop content ──────────────────────── */}
      <div className="hidden md:flex" style={{ position: 'absolute', inset: 0, alignItems: 'center', padding: '0 64px', color: '#fff' }}>
        <div style={{ maxWidth: 780 }}>
          <h1 style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontWeight: 500, fontSize: 'clamp(44px, 5vw, 64px)',
            lineHeight: 1.04, letterSpacing: -1, margin: 0,
            textShadow: '0 2px 30px rgba(0,0,0,.35)',
          }}>
            Explore the Wild Heart of the Caucasus
          </h1>
          <p style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: 18, lineHeight: 1.65, color: 'rgba(255,255,255,.9)',
            maxWidth: 540, margin: '24px 0 0',
            textShadow: '0 1px 12px rgba(0,0,0,.35)',
          }}>
            Small-group adventure tours and day trips across Georgia, led by certified local guides.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 36 }}>
            <Link href="/en/tours"
              style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 15, fontWeight: 500, letterSpacing: '.2px', color: '#fff', textDecoration: 'none', background: '#9B4E30', padding: '15px 30px', borderRadius: 5, border: '1px solid transparent' }}>
              Find Your Adventure
            </Link>
            <Link href="/en/contact"
              style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 15, fontWeight: 500, letterSpacing: '.2px', color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,.06)', padding: '15px 30px', borderRadius: 5, border: '1px solid rgba(255,255,255,.55)' }}>
              Plan a Custom Trip
            </Link>
          </div>
        </div>
      </div>

      {/* ── Mobile content ───────────────────────── */}
      <div className="flex md:hidden" style={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', padding: '0 22px', color: '#fff', textAlign: 'center' }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontWeight: 500, fontSize: 33,
            lineHeight: 1.06, letterSpacing: -.5, margin: 0,
            textShadow: '0 2px 24px rgba(0,0,0,.4)',
          }}>
            Explore the Wild Heart of the Caucasus
          </h1>
          <p style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: 13.5, lineHeight: 1.6, color: 'rgba(255,255,255,.9)',
            margin: '14px auto 0', maxWidth: 300,
            textShadow: '0 1px 12px rgba(0,0,0,.4)',
          }}>
            Small-group adventure tours and day trips across Georgia, led by certified local guides.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 22, justifyContent: 'center' }}>
            <Link href="/en/tours"
              style={{ flex: 1, fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 13, fontWeight: 500, textAlign: 'center', color: '#fff', textDecoration: 'none', background: '#9B4E30', padding: '11px 12px', borderRadius: 5, border: '1px solid transparent' }}>
              Find Your Adventure
            </Link>
            <Link href="/en/contact"
              style={{ flex: 1, fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 13, fontWeight: 500, textAlign: 'center', color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,.06)', padding: '11px 12px', borderRadius: 5, border: '1px solid rgba(255,255,255,.55)' }}>
              Plan a Custom Trip
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        style={{
          position: 'absolute', left: '50%', bottom: 30,
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 11,
          cursor: 'pointer', opacity: scrolled ? 0 : 1,
          transition: 'opacity .5s ease',
          color: '#fff', background: 'transparent', border: 'none', padding: 8,
          borderRadius: 4,
        }}
      >
        <span style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 11, letterSpacing: '3.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,.85)' }}>
          Scroll
        </span>
        <span style={{ position: 'relative', width: 1, height: 48, background: 'rgba(255,255,255,.28)', overflow: 'hidden', display: 'block' }}>
          <span style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '45%',
            background: '#fff',
            animation: reduceMotion ? 'none' : 'scrollLine 2s cubic-bezier(.6,0,.2,1) infinite',
          }} />
        </span>
      </button>
    </section>
  )
}

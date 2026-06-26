'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { TOURS, SERVICES } from '@/lib/data'

const TRANS = 'all .35s cubic-bezier(.4,0,.2,1)'

export default function Navbar() {
  const pathname = usePathname()
  const [solid, setSolid] = useState(false)
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileAcc, setMobileAcc] = useState<string | null>(null)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mobileHidden, setMobileHidden] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    document.documentElement.style.setProperty('--jump-nav-top', mobileHidden ? '0px' : '72px')
  }, [mobileHidden])

  useEffect(() => {
    setMounted(true)
    try {
      setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    } catch {}
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 40)

      if (window.innerWidth < 768) {
        if (y > lastScrollY.current && y > 80) {
          setMobileHidden(true)
          setMobileOpen(false)
        } else {
          setMobileHidden(false)
        }
      }
      lastScrollY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openDrop = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenKey(key)
  }
  const scheduleDrop = () => {
    closeTimer.current = setTimeout(() => setOpenKey(null), 160)
  }
  const toggleDrop = (key: string, e: React.MouseEvent) => {
    e.preventDefault()
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenKey(prev => prev === key ? null : key)
  }
  const onEsc = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpenKey(null)
  }

  const trans = reduceMotion ? 'none' : TRANS
  const mSolid = solid || mobileOpen

  // Desktop colors
  const text = solid ? '#1E1C19' : '#FFFFFF'
  const logoSub = solid ? '#A8A296' : 'rgba(255,255,255,.72)'
  const hairline = solid ? 'rgba(30,28,25,.14)' : 'rgba(255,255,255,.32)'
  const barBg = solid ? '#FAF8F3' : 'transparent'
  const barShadow = solid
    ? '0 1px 0 rgba(30,28,25,.05), 0 14px 30px -22px rgba(30,28,25,.55)'
    : 'none'
  const padY = solid ? '15px' : '26px'

  // Mobile colors
  const mText = mSolid ? '#1E1C19' : '#FFFFFF'
  const mLogoSub = mSolid ? '#A8A296' : 'rgba(255,255,255,.72)'
  const mHairline = mSolid ? 'rgba(30,28,25,.14)' : 'rgba(255,255,255,.32)'
  const mBarBg = mSolid ? '#FAF8F3' : 'transparent'
  const mShadow =
    solid && !mobileOpen
      ? '0 1px 0 rgba(30,28,25,.05), 0 14px 30px -22px rgba(30,28,25,.55)'
      : 'none'

  const toursOpen = openKey === 'tours'
  const servicesOpen = openKey === 'services'

  return (
    <>
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>

      {/* ── DESKTOP ─────────────────────────────────────────── */}
      <div
        className="hidden md:flex items-center justify-between"
        style={{
          gap: 28,
          padding: `${padY} 44px`,
          background: barBg,
          boxShadow: barShadow,
          transition: trans,
          fontFamily: "var(--font-dm-sans), sans-serif",
        }}
      >
        {/* Logo */}
        <Link
          href="/en"
          style={{ display: 'flex', alignItems: 'center', gap: 13, textDecoration: 'none', color: text, transition: trans, flex: 'none' }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 20h20"/><path d="m4 20 5-10 3.4 6"/><path d="m10 20 5-12 5 12"/>
          </svg>
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 600, fontSize: 23, letterSpacing: '.2px', whiteSpace: 'nowrap' }}>Adventure Experts</span>
            <span style={{ fontSize: 9.5, letterSpacing: '4.5px', marginTop: 5, color: logoSub, transition: trans }}>GEORGIA</span>
          </span>
        </Link>

        {/* Center nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>

          {/* Tours dropdown */}
          <div style={{ position: 'relative' }} onMouseEnter={() => openDrop('tours')} onMouseLeave={scheduleDrop}>
            <a
              href="#"
              onClick={e => toggleDrop('tours', e)}
              onFocus={() => openDrop('tours')}
              onKeyDown={onEsc}
              aria-haspopup="true"
              aria-expanded={toursOpen}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none', fontSize: 14.5, color: text, cursor: 'pointer', transition: trans }}
            >
              Tours
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transition: reduceMotion ? 'none' : 'transform .3s', transform: toursOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </a>
            {toursOpen && (
              <div role="menu" style={{ position: 'absolute', top: 'calc(100% + 18px)', left: '50%', transform: 'translateX(-50%)', minWidth: 480, padding: 16, background: '#FAF8F3', border: '1px solid rgba(30,28,25,.07)', borderRadius: 5, boxShadow: '0 28px 56px -28px rgba(30,28,25,.5), 0 2px 8px -4px rgba(30,28,25,.12)', zIndex: 100 }}>
                <div style={{ fontSize: 10.5, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#A8A296', padding: '4px 12px 12px' }}>Tours</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 24px' }}>
                  {TOURS.map(t => (
                    <Link key={t} href={`/en/tours#${t.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} role="menuitem" className="nav-drop-item"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '11px 12px', borderRadius: 5, textDecoration: 'none', color: '#1E1C19', fontSize: 14.5 }}>
                      <span>{t}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: .35 }}><path d="m9 18 6-6-6-6"/></svg>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/en/tours?toggle=day" style={{ textDecoration: 'none', fontSize: 14.5, color: text, transition: trans }}>Day Tours</Link>

          {/* Services dropdown */}
          <div style={{ position: 'relative' }} onMouseEnter={() => openDrop('services')} onMouseLeave={scheduleDrop}>
            <a
              href="/en/services"
              onClick={e => { e.preventDefault(); toggleDrop('services', e) }}
              onFocus={() => openDrop('services')}
              onKeyDown={onEsc}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none', fontSize: 14.5, color: text, cursor: 'pointer', transition: trans }}
            >
              Services
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transition: reduceMotion ? 'none' : 'transform .3s', transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </a>
            {servicesOpen && (
              <div role="menu" style={{ position: 'absolute', top: 'calc(100% + 18px)', left: '50%', transform: 'translateX(-50%)', minWidth: 300, padding: 12, background: '#FAF8F3', border: '1px solid rgba(30,28,25,.07)', borderRadius: 5, boxShadow: '0 28px 56px -28px rgba(30,28,25,.5), 0 2px 8px -4px rgba(30,28,25,.12)', zIndex: 100 }}>
                <div style={{ fontSize: 10.5, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#A8A296', padding: '4px 12px 10px' }}>Services</div>
                {SERVICES.map(sv => (
                  <Link key={sv.label} href="/en/services" role="menuitem" className="nav-drop-item"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '11px 12px', borderRadius: 5, textDecoration: 'none', color: '#1E1C19', fontSize: 14.5 }}>
                    <span>{sv.label}</span>
                    {sv.soon && <span style={{ fontSize: 9.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#A8A296', background: 'rgba(168,162,150,.18)', padding: '3px 8px', borderRadius: 5, flex: 'none' }}>Soon</span>}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/en/guides" style={{ textDecoration: 'none', fontSize: 14.5, color: text, transition: trans }}>Guides</Link>
          <Link href="/en/about" style={{ textDecoration: 'none', fontSize: 14.5, color: text, transition: trans }}>About Us</Link>
        </nav>

        {/* Right cluster */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 'none' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 13, color: text, background: 'transparent', border: `1px solid ${hairline}`, padding: '8px 11px', borderRadius: 5, cursor: 'pointer', transition: trans }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/>
            </svg>
            EN · USD
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>

          <a href="https://wa.me/995555123456" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, color: text, border: `1px solid ${hairline}`, borderRadius: '50%', transition: trans, textDecoration: 'none' }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/>
              <path d="M8.6 8.8c-.2 0-.5.1-.7.3-.2.2-.6.7-.6 1.6s.7 1.9.8 2c.1.2 1.4 2.3 3.5 3.1 1.7.7 2.1.6 2.4.5.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1l-.6-.3s-1-.5-1.1-.5c-.2-.1-.3-.1-.4.1l-.5.6c-.1.1-.2.1-.4.1-.2-.1-.8-.3-1.6-1-.6-.5-1-1.1-1.1-1.3-.1-.2 0-.3.1-.4l.3-.3.2-.3v-.3l-.5-1.3c-.1-.4-.3-.3-.4-.4z"/>
            </svg>
          </a>

          <Link href="/en/contact"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 14, fontWeight: 500, letterSpacing: '.2px', color: '#fff', textDecoration: 'none', background: '#9B4E30', padding: '11px 24px', borderRadius: 5, transition: trans }}>
            Contact Us
          </Link>
        </div>
      </div>

      {/* ── MOBILE ──────────────────────────────────────────── */}
      <div className="flex md:hidden flex-col" style={{ fontFamily: 'var(--font-dm-sans), sans-serif', transform: mobileHidden ? 'translateY(-100%)' : 'translateY(0)', transition: reduceMotion ? 'none' : 'transform .3s cubic-bezier(.4,0,.2,1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 18px', background: mBarBg, boxShadow: mShadow, transition: trans }}>
          <Link href="/en" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: mText, transition: trans }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 20h20"/><path d="m4 20 5-10 3.4 6"/><path d="m10 20 5-12 5 12"/>
            </svg>
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 600, fontSize: 18, whiteSpace: 'nowrap' }}>Adventure Experts</span>
              <span style={{ fontSize: 8, letterSpacing: '3.5px', marginTop: 4, color: mLogoSub, transition: trans }}>GEORGIA</span>
            </span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={() => setMobileOpen(p => !p)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, color: mText, background: 'transparent', border: `1px solid ${mHairline}`, borderRadius: 5, cursor: 'pointer', transition: trans }}
            >
              {mobileOpen
                ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></svg>
              }
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div style={{ background: '#FAF8F3', padding: '18px 18px 24px', borderTop: '1px solid rgba(30,28,25,.06)' }}>
            <button style={{ marginTop: 0, width: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 14, color: '#1E1C19', background: 'transparent', border: '1px solid rgba(30,28,25,.14)', padding: 12, borderRadius: 5, cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></svg>
              English · USD
            </button>

            <nav style={{ marginTop: 8 }}>
              <button onClick={() => setMobileAcc(p => p === 'tours' ? null : 'tours')} aria-expanded={mobileAcc === 'tours'}
                style={{ width: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 16, color: '#1E1C19', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(30,28,25,.08)', padding: '15px 2px', cursor: 'pointer' }}>
                Tours
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transition: reduceMotion ? 'none' : 'transform .3s', transform: mobileAcc === 'tours' ? 'rotate(180deg)' : 'rotate(0deg)', color: '#A8A296' }}>
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              {mobileAcc === 'tours' && (
                <div style={{ padding: '6px 2px 12px', display: 'flex', flexDirection: 'column' }}>
                  {TOURS.map(t => (
                    <Link key={t} href={`/en/tours#${t.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="nav-drop-item"
                      style={{ textDecoration: 'none', color: '#5b554c', fontSize: 14.5, padding: '9px 12px', borderRadius: 5 }}>{t}</Link>
                  ))}
                </div>
              )}

              <Link href="/en/tours?toggle=day" style={{ display: 'block', fontSize: 16, color: '#1E1C19', textDecoration: 'none', borderBottom: '1px solid rgba(30,28,25,.08)', padding: '15px 2px' }}>Day Tours</Link>

              <button onClick={() => setMobileAcc(p => p === 'services' ? null : 'services')} aria-expanded={mobileAcc === 'services'}
                style={{ width: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 16, color: '#1E1C19', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(30,28,25,.08)', padding: '15px 2px', cursor: 'pointer' }}>
                Services
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transition: reduceMotion ? 'none' : 'transform .3s', transform: mobileAcc === 'services' ? 'rotate(180deg)' : 'rotate(0deg)', color: '#A8A296' }}>
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              {mobileAcc === 'services' && (
                <div style={{ padding: '6px 2px 12px', display: 'flex', flexDirection: 'column' }}>
                  {SERVICES.map(sv => (
                    <Link key={sv.label} href="/en/services" className="nav-drop-item"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, textDecoration: 'none', color: '#5b554c', fontSize: 14.5, padding: '9px 12px', borderRadius: 5 }}>
                      <span>{sv.label}</span>
                      {sv.soon && <span style={{ fontSize: 9.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#A8A296', background: 'rgba(168,162,150,.18)', padding: '3px 8px', borderRadius: 5, flex: 'none' }}>Soon</span>}
                    </Link>
                  ))}
                </div>
              )}

              <Link href="/en/guides" style={{ display: 'block', fontSize: 16, color: '#1E1C19', textDecoration: 'none', borderBottom: '1px solid rgba(30,28,25,.08)', padding: '15px 2px' }}>Guides</Link>
              <Link href="/en/about" style={{ display: 'block', fontSize: 16, color: '#1E1C19', textDecoration: 'none', borderBottom: '1px solid rgba(30,28,25,.08)', padding: '15px 2px' }}>About Us</Link>
              <Link href="/en/contact" style={{ display: 'block', fontSize: 16, color: '#1E1C19', textDecoration: 'none', borderBottom: '1px solid rgba(30,28,25,.08)', padding: '15px 2px' }}>Contact</Link>
            </nav>

            <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid rgba(30,28,25,.1)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <a href="https://wa.me/995555123456" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none', color: '#213A29', fontSize: 15 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/>
                  <path d="M8.6 8.8c-.2 0-.5.1-.7.3-.2.2-.6.7-.6 1.6s.7 1.9.8 2c.1.2 1.4 2.3 3.5 3.1 1.7.7 2.1.6 2.4.5.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1l-.6-.3s-1-.5-1.1-.5c-.2-.1-.3-.1-.4.1l-.5.6c-.1.1-.2.1-.4.1-.2-.1-.8-.3-1.6-1-.6-.5-1-1.1-1.1-1.3-.1-.2 0-.3.1-.4l.3-.3.2-.3v-.3l-.5-1.3c-.1-.4-.3-.3-.4-.4z"/>
                </svg>
                +995 555 12 34 56
              </a>
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { label: 'Instagram', icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg> },
                  { label: 'Facebook', icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5.5v4H8v7"/><path d="M8 14h4"/><path d="M12 21v-7"/></svg> },
                  { label: 'Email', icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg> },
                ].map(s => (
                  <a key={s.label} href="#" aria-label={s.label}
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, color: '#1E1C19', border: '1px solid rgba(30,28,25,.14)', borderRadius: 5 }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .nav-drop-item { transition: background .2s ease, color .2s ease; }
        .nav-drop-item:hover { background: rgba(155,78,48,.08); color: #9B4E30; }
        @media (prefers-reduced-motion: reduce) {
          .nav-drop-item { transition: none; }
          .nav-mob-scrim { transition: none !important; }
        }
      `}</style>
    </header>

    {mounted && createPortal(
      <div
        className="nav-mob-scrim"
        onClick={() => setMobileOpen(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 49,
          background: 'rgba(10,8,6,.55)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: 'opacity .28s ease',
        }}
      />,
      document.body
    )}
    </>
  )
}

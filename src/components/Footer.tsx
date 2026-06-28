'use client'

import Link from 'next/link'
import { useState } from 'react'
import { TOURS, SERVICES } from '@/lib/data'

const REGIONS_NAV = ['Svaneti', 'Kazbegi', 'Imereti', 'Kakheti', 'Adjara', 'Racha']

type FooterLink = { name: string; href: string; soon?: boolean }

const COLUMNS: { label: string; links: FooterLink[] }[] = [
  {
    label: 'Adventure Experts Georgia',
    links: [
      { name: 'About Us', href: '/en/about' },
      { name: 'Our Guides', href: '/en/guides' },
      { name: 'Reviews', href: '/en/reviews' },
      { name: 'Contact', href: '/en/contact' },
    ],
  },
  {
    label: 'Tours & Activities',
    links: [
      ...TOURS.map(t => ({ name: t.name, href: t.href })),
      { name: 'Day Tours', href: '/en/tours/day-tours' },
    ],
  },
  {
    label: 'Destinations',
    links: REGIONS_NAV.map(r => ({ name: r, href: `/en/regions/${r.toLowerCase()}` })),
  },
  {
    label: 'Services',
    links: SERVICES.map(s => ({ name: s.label, href: '/en/services', soon: s.soon })),
  },
  {
    label: 'Useful Information',
    links: [
      { name: 'FAQ', href: '/en/faq' },
      { name: 'What to Bring', href: '/en/what-to-bring' },
      { name: 'Booking & Cancellation Policy', href: '/en/booking-policy' },
      { name: 'Privacy Policy', href: '/en/privacy-policy' },
      { name: 'Terms', href: '/en/terms' },
    ],
  },
]

const SOCIALS = [
  { label: 'WhatsApp', href: 'https://wa.me/995555123456', icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/><path d="M8.6 8.8c-.2 0-.5.1-.7.3-.2.2-.6.7-.6 1.6s.7 1.9.8 2c.1.2 1.4 2.3 3.5 3.1 1.7.7 2.1.6 2.4.5.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1l-.6-.3s-1-.5-1.1-.5c-.2-.1-.3-.1-.4.1l-.5.6c-.1.1-.2.1-.4.1-.2-.1-.8-.3-1.6-1-.6-.5-1-1.1-1.1-1.3-.1-.2 0-.3.1-.4l.3-.3.2-.3v-.3l-.5-1.3c-.1-.4-.3-.3-.4-.4z"/></svg> },
  { label: 'Instagram', href: '#', icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg> },
  { label: 'Facebook', href: '#', icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5.5v4H8v7"/><path d="M8 14h4"/><path d="M12 21v-7"/></svg> },
  { label: 'Email', href: 'mailto:info@adventure-experts-georgia.com', icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg> },
]

function FooterColumn({ col }: { col: typeof COLUMNS[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      {/* Mobile accordion header */}
      <button
        onClick={() => setOpen(p => !p)}
        className="flex md:hidden w-full items-center justify-between"
        style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,.08)', padding: '14px 0', cursor: 'pointer', color: 'rgba(255,255,255,.5)', fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 10.5, letterSpacing: '2.5px', textTransform: 'uppercase' as const, fontWeight: 500 }}
      >
        {col.label}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: 'transform .3s', transform: open ? 'rotate(180deg)' : 'none' }}>
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      {/* Desktop always-visible label */}
      <div className="hidden md:block" style={{ fontSize: 10.5, letterSpacing: '2.5px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,.5)', marginBottom: 16, fontWeight: 500 }}>{col.label}</div>

      {/* Links */}
      <div className={`${open ? 'block' : 'hidden'} md:block`} style={{ paddingBottom: open ? 12 : 0 }}>
        {col.links.map((l) => (
          <Link key={l.name} href={l.href}
            style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'rgba(255,255,255,.6)', fontSize: 14, padding: '5px 0', lineHeight: 1.4 }}>
            {l.name}
            {'soon' in l && l.soon && (
              <span style={{ fontSize: 9, letterSpacing: '1px', textTransform: 'uppercase', color: '#A8A296', background: 'rgba(168,162,150,.18)', padding: '2px 6px', borderRadius: 3 }}>Soon</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer style={{ background: '#14120F', color: '#fff', fontFamily: 'var(--font-dm-sans), sans-serif' }}>

      {/* Main grid */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '64px clamp(20px,5vw,48px) 48px' }}>
        {/* Logo */}
        <div style={{ marginBottom: 48 }}>
          <Link href="/en" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: '#fff' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 20h20"/><path d="m4 20 5-10 3.4 6"/><path d="m10 20 5-12 5 12"/>
            </svg>
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 600, fontSize: 21 }}>Adventure Experts</span>
              <span style={{ fontSize: 9, letterSpacing: '4px', marginTop: 4, color: 'rgba(255,255,255,.45)' }}>GEORGIA</span>
            </span>
          </Link>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 md:gap-10">
          {COLUMNS.map(col => <FooterColumn key={col.label} col={col} />)}
        </div>

        {/* Newsletter + social */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-start gap-10"
          style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,.08)' }}>

          {/* Newsletter */}
          <div>
            <div style={{ fontSize: 10.5, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 10, fontWeight: 500 }}>Stay Inspired</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,.65)', marginBottom: 14 }}>Get adventure inspiration & Georgia travel tips</div>
            <form onSubmit={e => { e.preventDefault(); setEmail('') }} style={{ display: 'flex', gap: 0, maxWidth: 420 }}>
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ flex: 1, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', borderRight: 'none', borderRadius: '5px 0 0 5px', padding: '11px 16px', fontSize: 14, color: '#fff', outline: 'none', fontFamily: 'var(--font-dm-sans), sans-serif' }}
              />
              <button type="submit" style={{ background: '#9B4E30', border: 'none', borderRadius: '0 5px 5px 0', padding: '0 18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
              </button>
            </form>
          </div>

          {/* Social + contact */}
          <div>
            <div style={{ fontSize: 10.5, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 14, fontWeight: 500 }}>Connect</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, color: 'rgba(255,255,255,.6)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 5, textDecoration: 'none' }}>
                  {s.icon}
                </a>
              ))}
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', lineHeight: 1.8 }}>
              Tbilisi, Georgia<br/>
              +995 555 12 34 56<br/>
              info@adventure-experts-georgia.com
            </div>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', padding: '16px clamp(20px,5vw,48px)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,.3)' }}>© 2026 Adventure Experts Georgia · Licensed Tour Operator, Registration No. [TBC]</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Booking Conditions', '/en/booking-policy'], ['Terms', '/en/terms'], ['Privacy', '/en/privacy-policy']].map(([name, href]) => (
              <Link key={name} href={href} style={{ fontSize: 12.5, color: 'rgba(255,255,255,.3)', textDecoration: 'none' }}>{name}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

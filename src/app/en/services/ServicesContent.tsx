'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import TailorMadeCTA from '@/components/TailorMadeCTA'

// ── Icons ────────────────────────────────────────────────────────────────────
const ICON_PATHS: Record<string, string> = {
  route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><path d="M9 17h6"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
  tent: '<path d="M3.5 21 14 3"/><path d="M20.5 21 10 3"/><path d="M15.5 21 12 15l-3.5 6"/><path d="M2 21h20"/>',
  snow: '<line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/>',
  idea: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  map: '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
  secure: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  bell: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
}

function Icon({ name, size = 22, color }: { name: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color || 'currentColor'} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] || '' }} />
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────
const AVAIL = [
  {
    key: 'plan', name: 'Custom Trip Planning', icon: 'route', cta: 'Request a Custom Trip', href: '/en/contact',
    desc: 'We design custom itineraries around your group size, preferences, and difficulty level — from crafting brand-new routes to adjusting the pace or itinerary of an existing tour. We shape the experience to your goals.',
  },
  {
    key: 'transfers', name: 'Transfers & Logistics', icon: 'car', cta: 'Get in Touch', href: '/en/contact',
    desc: 'We coordinate transport, route access, timing, and all the practical details that make your trip run smoothly — transport options that pair seamlessly with your adventure.',
  },
]

const SOON = [
  { key: 'climbing', name: 'Climbing Course', icon: 'mountain', desc: 'Build confidence on the rock with guided instruction in climbing fundamentals, technique, and safe movement.' },
  { key: 'camp', name: 'Children Camp', icon: 'tent', desc: 'Structured outdoor experiences for younger groups — focused on fun, learning, and safety, led by guides who know how to work with children.' },
  { key: 'winter', name: 'Winter Sports', icon: 'snow', desc: "Skiing and snowboarding tailored to your level and the day's snow and weather. We handle the route, pacing, and safety so you can focus on the ride and the views." },
]

const STEPS = [
  { n: '1', icon: 'idea', title: 'Tell us your idea', desc: 'Share your dates, group, interests, and activity level.' },
  { n: '2', icon: 'map', title: 'We design it together', desc: 'A custom itinerary plus a quick call to fine-tune the details.' },
  { n: '3', icon: 'secure', title: 'Secure your spot', desc: 'Confirm and pay later through a secure link.' },
]

// Sage theme for Coming Soon
const CS = { bg: '#E7EBE1', text: '#26302A', sub: '#5C6157', eyebrow: '#9B4E30', card: '#FFFFFF', cardB: '#D7DCCF', badgeB: '#DDE3D3', badgeT: '#5C6157', fieldB: '#C9CFBF', fieldT: '#26302A' }

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const [notify, setNotify] = useState<Record<string, boolean>>({})
  const [emails, setEmails] = useState<Record<string, string>>({})
  const [done, setDone] = useState<Record<string, boolean>>({})
  const [reduced, setReduced] = useState(false)

  const refs = {
    banner: useRef<HTMLElement>(null),
    avail: useRef<HTMLElement>(null),
    soon: useRef<HTMLElement>(null),
    steps: useRef<HTMLElement>(null),
  }

  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      const set = () => setReduced(mq.matches); set()
      if (mq.addEventListener) mq.addEventListener('change', set)
    } catch {}

    const observer = new IntersectionObserver((entries) => {
      const updated: Record<string, boolean> = {}
      entries.forEach(e => {
        if (e.isIntersecting) {
          const k = (e.target as HTMLElement).dataset.revKey
          if (k) { updated[k] = true; observer.unobserve(e.target) }
        }
      })
      if (Object.keys(updated).length) setRevealed(prev => ({ ...prev, ...updated }))
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' })

    Object.entries(refs).forEach(([k, r]) => {
      if (r.current) { r.current.dataset.revKey = k; observer.observe(r.current) }
    })
    return () => observer.disconnect()
  }, [])

  function anim(key: string, i: number) {
    if (reduced || !revealed[key]) return 'none'
    return `aegFadeUp .6s cubic-bezier(.22,.61,.36,1) ${i * 0.09}s both`
  }

  return (
    <>
      <style>{`
        @keyframes aegFadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:none; } }
        .svc-card:hover { transform: translateY(-6px) !important; box-shadow: 0 30px 56px -28px rgba(30,28,25,.5) !important; }
        .svc-card:focus { box-shadow: 0 0 0 3px rgba(199,90,55,.35) !important; border-color: #C75A37 !important; }
        .svc-cta:hover { filter: brightness(1.07); transform: translateY(-2px); }
        .svc-notify:hover { opacity: .65; }
        .svc-wa-submit:hover { filter: brightness(1.1); }
        @media(prefers-reduced-motion:reduce){ .svc-card,.svc-cta { transition: none !important; } }
      `}</style>

      <main>
        {/* ── Hero Banner ── */}
        <section ref={refs.banner} style={{ position: 'relative', overflow: 'hidden', background: '#1E1C19', color: '#FAF8F3', fontFamily: "'Hanken Grotesk',system-ui,sans-serif", padding: 'clamp(120px,16vh,170px) clamp(20px,5vw,56px) clamp(58px,8vh,88px)' }}>
          <Image src="/images/hero.avif" alt="Georgia mountains" fill priority style={{ objectFit: 'cover', objectPosition: 'center 40%', opacity: 0.38 }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(118deg,#27362C 0%,#1E1C19 58%)' }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(135deg, rgba(250,248,243,.045) 0 2px, transparent 2px 13px)' }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,18,15,.28) 0%, rgba(20,18,15,.64) 100%)' }} />

          <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', animation: anim('banner', 0) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 12.5, letterSpacing: '.03em', color: 'rgba(250,248,243,.6)', marginBottom: 24 }}>
              <Link href="/en" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              <span style={{ opacity: .5 }}>/</span>
              <span style={{ color: '#FAF8F3' }}>Services</span>
            </div>
            <div style={{ fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#E59A6E', fontWeight: 600, marginBottom: 17 }}>Services</div>
            <h1 style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 'clamp(38px,6vw,62px)', lineHeight: 1.02, letterSpacing: '-.5px', margin: '0 0 19px' }}>How We Can Help</h1>
            <p style={{ maxWidth: '54ch', fontSize: 'clamp(16px,2vw,19px)', lineHeight: 1.6, color: 'rgba(250,248,243,.82)', margin: 0 }}>
              Choose the kind of support you need — guiding, planning, transport, training, or group programs.
            </p>
          </div>
        </section>

        {/* ── Available Now ── */}
        <section ref={refs.avail} style={{ background: '#FAF8F3', color: '#1E1C19', fontFamily: "'Hanken Grotesk',system-ui,sans-serif", padding: 'clamp(64px,9vh,104px) clamp(20px,5vw,56px)' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <div style={{ animation: anim('avail', 0), marginBottom: 'clamp(34px,5vw,52px)' }}>
              <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C75A37', fontWeight: 600, marginBottom: 13 }}>Available Now</div>
              <h2 style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 'clamp(26px,3.4vw,38px)', lineHeight: 1.08, letterSpacing: '-.3px', margin: 0, color: '#1E1C19' }}>Ready to book for your next adventure.</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(20px,2.4vw,30px)' }}>
              {AVAIL.map((card, i) => (
                <div key={card.key} style={{ animation: anim('avail', 1 + i), height: '100%' }}>
                  <Link href={card.href} className="svc-card" style={{
                    display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none', color: '#1E1C19',
                    background: '#FFFFFF', border: '1px solid #ECE7DC', borderRadius: 18,
                    boxShadow: '0 18px 42px -28px rgba(30,28,25,.45)',
                    padding: 'clamp(28px,3vw,40px)',
                    transition: 'transform .35s cubic-bezier(.22,.61,.36,1), box-shadow .35s ease',
                  }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 62, height: 62, borderRadius: 15, background: 'rgba(46,64,52,.08)', color: '#2E4034', marginBottom: 26, flexShrink: 0 }}>
                      <Icon name={card.icon} size={26} />
                    </span>
                    <h3 style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 'clamp(23px,2.6vw,29px)', lineHeight: 1.12, letterSpacing: '-.2px', margin: '0 0 15px' }}>{card.name}</h3>
                    <p style={{ fontSize: 16, lineHeight: 1.64, color: '#4A463E', margin: '0 0 30px', maxWidth: '46ch' }}>{card.desc}</p>
                    <span style={{ marginTop: 'auto', alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 9, background: '#C75A37', color: '#FFFFFF', fontWeight: 600, fontSize: 14.5, letterSpacing: '.01em', padding: '13px 22px', borderRadius: 999 }}>
                      {card.cta}
                      <Icon name="arrow" size={17} />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Coming Soon ── */}
        <section ref={refs.soon} style={{ background: CS.bg, color: CS.text, fontFamily: "'Hanken Grotesk',system-ui,sans-serif", padding: 'clamp(64px,9vh,104px) clamp(20px,5vw,56px)' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto clamp(34px,5vw,50px)', animation: anim('soon', 0) }}>
            <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: CS.eyebrow, fontWeight: 600, marginBottom: 13 }}>Coming Soon</div>
            <h2 style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 'clamp(26px,3.4vw,38px)', lineHeight: 1.08, letterSpacing: '-.3px', margin: 0, color: CS.text }}>Programs we&rsquo;re building for 2026 and beyond.</h2>
          </div>
          <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(232px,1fr))', gap: 'clamp(16px,2vw,22px)' }}>
            {SOON.map((c, i) => {
              const isNotify = !!notify[c.key]
              const isDone = !!done[c.key]
              return (
                <div key={c.key} style={{ animation: anim('soon', 1 + i), height: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: CS.card, border: `1px solid ${CS.cardB}`, borderRadius: 16, padding: '25px 24px 22px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 46, borderRadius: 12, background: CS.badgeB, color: CS.sub, flexShrink: 0 }}>
                        <Icon name={c.icon} size={22} color={CS.sub} />
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: CS.badgeT, background: CS.badgeB, padding: '5px 11px', borderRadius: 999 }}>Soon</span>
                    </div>
                    <h3 style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 20, lineHeight: 1.16, letterSpacing: '-.1px', margin: '0 0 11px', color: CS.text }}>{c.name}</h3>
                    <p style={{ fontSize: 13.7, lineHeight: 1.6, color: CS.sub, margin: '0 0 22px' }}>{c.desc}</p>
                    <div style={{ marginTop: 'auto' }}>
                      {!isNotify && !isDone && (
                        <button className="svc-notify" onClick={() => setNotify(p => ({ ...p, [c.key]: true }))}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', padding: '6px 0', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: CS.text, transition: 'opacity .2s' }}>
                          <Icon name="bell" size={15} color={CS.text} />
                          Notify me when it&rsquo;s ready
                        </button>
                      )}
                      {isNotify && !isDone && (
                        <div>
                          <div style={{ display: 'flex', alignItems: 'stretch', border: `1px solid ${CS.fieldB}`, borderRadius: 10, overflow: 'hidden', background: 'rgba(255,255,255,.5)' }}>
                            <input
                              type="email" value={emails[c.key] || ''} placeholder="you@email.com"
                              aria-label={`Email for ${c.name} updates`}
                              onChange={e => setEmails(p => ({ ...p, [c.key]: e.target.value }))}
                              style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none', padding: '10px 12px', fontFamily: 'inherit', fontSize: 13, color: CS.fieldT }}
                            />
                            <button className="svc-wa-submit" onClick={() => setDone(p => ({ ...p, [c.key]: true }))}
                              aria-label="Submit email"
                              style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 42, background: '#C75A37', border: 'none', cursor: 'pointer', color: '#fff', transition: 'filter .2s' }}>
                              <Icon name="arrow" size={16} color="#fff" />
                            </button>
                          </div>
                          <p style={{ margin: '9px 2px 0', fontSize: 11, lineHeight: 1.5, color: CS.sub }}>We&rsquo;ll email you once — when it launches. Nothing else.</p>
                        </div>
                      )}
                      {isDone && (
                        <div>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: CS.text }}>
                            <Icon name="check" size={16} color={CS.text} />
                            You&rsquo;re on the list
                          </div>
                          <p style={{ margin: '9px 2px 0', fontSize: 11, lineHeight: 1.5, color: CS.sub }}>We&rsquo;ll email you once — when it launches. Nothing else.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── How Custom Planning Works ── */}
        <section ref={refs.steps} style={{ background: '#FFFFFF', color: '#1E1C19', fontFamily: "'Hanken Grotesk',system-ui,sans-serif", padding: 'clamp(64px,9vh,110px) clamp(20px,5vw,56px)' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ animation: anim('steps', 0), textAlign: 'center' }}>
              <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C75A37', fontWeight: 600, marginBottom: 13 }}>Custom Trips</div>
              <h2 style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 'clamp(30px,4.4vw,48px)', lineHeight: 1.05, letterSpacing: '-.4px', margin: 0 }}>Your Trip, Designed Around You</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(238px,1fr))', gap: 'clamp(28px,4vw,46px)', margin: 'clamp(44px,6vw,64px) 0 clamp(40px,5vw,54px)' }}>
              {STEPS.map((s, i) => (
                <div key={s.n} style={{ animation: anim('steps', 1 + i) }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 19 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: '50%', background: '#2E4034', color: '#FAF8F3', fontFamily: "'Spectral',serif", fontSize: 17, fontWeight: 600, flexShrink: 0 }}>{s.n}</span>
                    <span style={{ color: '#A8A296', display: 'inline-flex' }}><Icon name={s.icon} size={22} color="#A8A296" /></span>
                  </div>
                  <h3 style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 21, lineHeight: 1.18, letterSpacing: '-.1px', margin: '0 0 10px' }}>{s.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.62, color: '#4A463E', margin: 0, maxWidth: '34ch' }}>{s.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ animation: anim('steps', 4), textAlign: 'center' }}>
              <Link href="/en/contact" className="svc-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#C75A37', color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 15, padding: '15px 30px', borderRadius: 999, transition: 'transform .25s ease, filter .25s ease' }}>
                Start Planning
                <Icon name="arrow" size={18} color="#fff" />
              </Link>
            </div>
          </div>
        </section>

        <TailorMadeCTA />
      </main>

      <Footer />
    </>
  )
}

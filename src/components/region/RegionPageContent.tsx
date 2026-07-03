'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import type { RegionData } from '@/data/regions'

// ── SVG icon paths (Lucide-style) ─────────────────────────────────────────────
const ICON_PATHS: Record<string, string> = {
  mappin:      '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  plane:       '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  route:       '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  calendar:    '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  mountain:    '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
  mountainSnow:'<path d="m8 3 4 8 5-5 5 15H2L8 3z"/><path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19"/>',
  gauge:       '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  clock:       '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  snowflake:   '<line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/>',
  sun:         '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  alert:       '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  car:         '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  compass:     '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  thermometer: '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>',
  landmark:    '<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
  castle:      '<path d="M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z"/><path d="M18 11V4H6v7"/><path d="M15 22v-4a3 3 0 0 0-3-3 3 3 0 0 0-3 3v4"/><path d="M22 11V9"/><path d="M2 11V9"/><path d="M6 4V2"/><path d="M18 4V2"/><path d="M10 4V2"/><path d="M14 4V2"/>',
  tower:       '<path d="M18 6 8.7 17.4a2.5 2.5 0 0 1-2.1 1.1H3l2.3-2.8"/><path d="M21 3 8.5 8.5"/><path d="m3 21 12.5-5.5"/>',
  arrowRight:  '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  clock2:      '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
}

function Icon({ name, size = 20, color }: { name: string; size?: number; color?: string }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color ?? 'currentColor'} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] ?? '' }}
    />
  )
}

// ── Scroll-reveal hook ─────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let reduced = false
    try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch {}
    if (reduced) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('rp-in'); io.disconnect() } },
      { threshold: 0.06, rootMargin: '0px 0px -7% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

// ── Season accent styles ───────────────────────────────────────────────────────
const S_ACCENT = {
  warm:    { chip: 'rgba(199,90,55,.10)',  chipColor: '#C75A37', months: '#C75A37' },
  cool:    { chip: 'rgba(46,64,52,.10)',   chipColor: '#2E4034', months: '#2E4034' },
  neutral: { chip: 'rgba(168,162,150,.18)', chipColor: '#6B655C', months: '#6B655C' },
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function RegionPageContent({ region }: { region: RegionData }) {
  const heroRef    = useReveal()
  const introRef   = useReveal()
  const factsRef   = useReveal()
  const hlRef      = useReveal()
  const toursRef   = useReveal()
  const actRef     = useReveal()
  const mapRef     = useReveal()
  const seasonRef  = useReveal()
  const pracRef    = useReveal()
  const nudgeRef   = useReveal()

  const PAD = 'clamp(20px,5vw,56px)'
  const SEC_PY = 'clamp(58px,8.5vh,100px)'

  return (
    <>
      <style>{`
        @keyframes rpFadeUp{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}
        .rp-reveal{opacity:0;}
        .rp-reveal.rp-in{animation:rpFadeUp .68s cubic-bezier(.22,.61,.36,1) both;}
        @media(prefers-reduced-motion:reduce){.rp-reveal,.rp-reveal.rp-in{opacity:1;animation:none;}}
        @media(prefers-reduced-motion:no-preference){
          .rp-hlcard:hover .rp-hlphoto{transform:scale(1.06)!important;}
          .rp-tcard:hover .rp-tcphoto{transform:scale(1.06)!important;}
          .rp-tcard:hover{transform:translateY(-6px)!important;box-shadow:0 22px 46px -16px rgba(30,28,25,.28)!important;border-color:#E2DCCF!important;}
          .rp-hlcard:hover{transform:translateY(-4px)!important;box-shadow:0 26px 52px -22px rgba(30,28,25,.42)!important;}
          .rp-actpill:hover{background:#2E4034!important;color:#FAF8F3!important;border-color:#2E4034!important;transform:translateY(-2px)!important;}
          .rp-pin:hover .rp-pinlabel{background:#C75A37!important;color:#fff!important;}
          .rp-pin:hover .rp-pindot{transform:scale(1.35)!important;}
          .rp-nudgebtn:hover{transform:translateY(-2px)!important;box-shadow:0 20px 38px -12px rgba(199,90,55,.8)!important;}
        }
        .rp-pin:focus-visible .rp-pinlabel{outline:2px solid #C75A37;outline-offset:2px;}
        .rp-tcard:focus-visible,.rp-hlcard:focus-visible{outline:3px solid rgba(199,90,55,.5);outline-offset:3px;}
        .qf-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(12px,1.4vw,18px);}
        @media(max-width:1000px){.qf-grid{grid-template-columns:repeat(2,minmax(0,1fr));}}
        @media(max-width:560px){.qf-grid{grid-template-columns:1fr;}}
        .hl-feature{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:minmax(210px,1fr);gap:clamp(14px,1.8vw,22px);}
        .hl-feature>:first-child{grid-column:span 2;grid-row:span 2;}
        .hl-feature>:first-child h3{font-size:clamp(26px,3vw,38px)!important;}
        @media(max-width:980px){
          .hl-feature{grid-template-columns:repeat(2,minmax(0,1fr));}
          .hl-feature>:first-child{grid-column:span 2;grid-row:span 1;min-height:320px;}
        }
        @media(max-width:600px){.hl-feature{grid-template-columns:1fr;}.hl-feature>:first-child{grid-column:span 1;}}
        .tours-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(14px,1.6vw,22px);}
        @media(max-width:1100px){.tours-grid{grid-template-columns:repeat(2,minmax(0,1fr));}}
        @media(max-width:560px){.tours-grid{grid-template-columns:1fr;}}
        .season-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(14px,1.6vw,22px);}
        @media(max-width:760px){.season-grid{grid-template-columns:1fr;}}
        .practical-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(14px,1.6vw,22px);}
        @media(max-width:680px){.practical-grid{grid-template-columns:1fr;}}
        .map-wrap{display:grid;grid-template-columns:1.5fr 1fr;gap:clamp(18px,2.4vw,34px);align-items:stretch;}
        @media(max-width:860px){.map-wrap{grid-template-columns:1fr;}}
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        minHeight: 'clamp(560px,84vh,780px)',
        display: 'flex', alignItems: 'flex-end',
        color: '#FAF8F3', fontFamily: 'var(--font-hanken), system-ui, sans-serif',
        padding: `clamp(118px,16vh,150px) ${PAD} clamp(46px,7vh,72px)`,
      }}>
        {/* Hero image */}
        <Image
          src={region.heroImage} alt={region.adminName}
          fill priority style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        {/* Gradient overlays */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(158deg,rgba(52,80,62,.72) 0%,rgba(35,51,42,.55) 46%,rgba(25,23,18,.88) 100%)' }} />
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(122deg, rgba(250,248,243,.04) 0 2px, transparent 2px 15px)' }} />
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(16,14,11,.12) 0%, rgba(16,14,11,.26) 40%, rgba(16,14,11,.82) 100%)' }} />

        <div ref={heroRef} className="rp-reveal" style={{ position: 'relative', maxWidth: 1180, width: '100%', margin: '0 auto' }}>
          <div style={{ fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#E59A6E', fontWeight: 600, marginBottom: 16 }}>
            {region.eyebrow}
          </div>
          <h1 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(44px,8vw,86px)', lineHeight: .98, letterSpacing: -1, margin: '0 0 18px' }}>
            {region.adminName}
          </h1>
          <p style={{ fontFamily: 'var(--font-spectral), serif', fontStyle: 'italic', fontSize: 'clamp(19px,2.6vw,28px)', lineHeight: 1.3, color: 'rgba(250,248,243,.92)', margin: '0 0 34px', maxWidth: '30ch' }}>
            {region.tagline}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 11 }}>
            {region.heroFacts.map((f, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'rgba(250,248,243,.12)', border: '1px solid rgba(250,248,243,.2)', backdropFilter: 'blur(6px)', padding: '10px 16px', borderRadius: 999, fontSize: 13.5, fontWeight: 500, color: '#FAF8F3' }}>
                <span style={{ display: 'inline-flex', color: '#E59A6E' }}><Icon name={f.icon} size={16} /></span>
                {f.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ background: '#FAF8F3', color: '#1E1C19', fontFamily: 'var(--font-hanken), system-ui, sans-serif', padding: `clamp(60px,9vh,108px) ${PAD} clamp(50px,7vh,80px)` }}>
        <div ref={introRef} className="rp-reveal" style={{ maxWidth: 920, margin: '0 auto' }}>
          <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C75A37', fontWeight: 600, marginBottom: 18 }}>Why This Region</div>
          <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(32px,4.6vw,52px)', lineHeight: 1.04, letterSpacing: -.5, margin: '0 0 26px', maxWidth: '18ch' }}>
            {region.intro.heading}
          </h2>
          <p style={{ fontSize: 'clamp(17px,2vw,21px)', lineHeight: 1.7, color: '#4A463E', margin: 0, maxWidth: '64ch' }}>
            {region.intro.body}
          </p>
        </div>
      </section>

      {/* ── QUICK FACTS ── */}
      <section style={{ background: '#FAF8F3', color: '#1E1C19', fontFamily: 'var(--font-hanken), system-ui, sans-serif', padding: `0 ${PAD} clamp(58px,8vh,96px)` }}>
        <div ref={factsRef} className="rp-reveal" style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C75A37', fontWeight: 600, marginBottom: 'clamp(22px,3vw,34px)' }}>At a Glance</div>
          <div className="qf-grid">
            {region.quickFacts.map((q, i) => (
              <div key={i} style={{ background: '#FFFFFF', padding: '22px 22px 24px', border: '1px solid rgba(30,28,25,.08)', borderRadius: 16, boxShadow: '0 1px 3px rgba(30,28,25,.04)', display: 'flex', flexDirection: 'column', gap: 11 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: 12, background: 'rgba(46,64,52,.08)', color: '#2E4034', flexShrink: 0 }}>
                  <Icon name={q.icon} size={20} />
                </span>
                <div style={{ fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase', color: '#A8A296', fontWeight: 600 }}>{q.label}</div>
                <div style={{ fontSize: 15.5, lineHeight: 1.42, color: '#1E1C19', fontWeight: 500 }}>{q.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section style={{ background: '#F4F1EB', color: '#1E1C19', fontFamily: 'var(--font-hanken), system-ui, sans-serif', padding: `${SEC_PY} ${PAD}`, borderTop: '1px solid rgba(30,28,25,.05)' }}>
        <div ref={hlRef} className="rp-reveal" style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(28px,3.5vw,44px)' }}>
            <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C75A37', fontWeight: 600, marginBottom: 14 }}>Things to Do</div>
            <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(30px,4.2vw,48px)', lineHeight: 1.04, letterSpacing: -.5, margin: 0, maxWidth: '20ch' }}>
              Signature Sights &amp; Experiences
            </h2>
          </div>
          <div className="hl-feature">
            {region.highlights.map((h, i) => (
              <Link key={i} href={h.href} className="rp-hlcard" style={{
                position: 'relative', display: 'block', overflow: 'hidden', borderRadius: 18,
                textDecoration: 'none', color: '#FAF8F3',
                boxShadow: '0 1px 3px rgba(30,28,25,.06)',
                transition: 'box-shadow .35s ease, transform .35s ease',
                minHeight: i === 0 ? 'auto' : 280,
              }}>
                {/* Photo */}
                <div className="rp-hlphoto" style={{ position: 'absolute', inset: 0, transition: 'transform .6s cubic-bezier(.22,.61,.36,1)' }}>
                  {h.image ? (
                    <Image src={h.image} alt={h.title} fill style={{ objectFit: 'cover' }} sizes="(max-width:600px) 100vw,(max-width:980px) 50vw,33vw" />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(165deg,#3C5644,#222F27)' }} />
                  )}
                </div>
                {/* Gradient scrim */}
                <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(16,14,11,0) 30%, rgba(16,14,11,.34) 60%, rgba(16,14,11,.86) 100%)' }} />
                {/* Content */}
                <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(20px,2.4vw,28px)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, alignSelf: 'flex-start', fontSize: 11, letterSpacing: '.04em', fontWeight: 600, color: '#FAF8F3', background: 'rgba(250,248,243,.16)', border: '1px solid rgba(250,248,243,.22)', backdropFilter: 'blur(4px)', padding: '6px 12px', borderRadius: 999, marginBottom: 13 }}>
                    <span style={{ display: 'inline-flex', color: '#F0B894' }}><Icon name={h.icon} size={14} /></span>
                    {h.tag}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(20px,2.2vw,24px)', lineHeight: 1.08, letterSpacing: -.3, margin: '0 0 8px' }}>{h.title}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: 'rgba(250,248,243,.86)', maxWidth: '42ch' }}>{h.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOURS ── */}
      {region.tours.length > 0 && (
      <section style={{ background: '#FAF8F3', color: '#1E1C19', fontFamily: 'var(--font-hanken), system-ui, sans-serif', padding: `${SEC_PY} ${PAD}` }}>
        <div ref={toursRef} className="rp-reveal" style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 'clamp(28px,3.5vw,44px)' }}>
            <div>
              <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C75A37', fontWeight: 600, marginBottom: 14 }}>Tours in This Region</div>
              <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(30px,4.2vw,48px)', lineHeight: 1.04, letterSpacing: -.5, margin: 0, maxWidth: '20ch' }}>
                Ways to Experience {region.adminName}
              </h2>
            </div>
            <Link href={region.toursViewAllHref} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14.5, fontWeight: 600, color: '#2E4034', textDecoration: 'none', borderBottom: '1.5px solid rgba(46,64,52,.28)', paddingBottom: 3, transition: 'color .25s, border-color .25s' }}>
              View all {region.adminName} tours <Icon name="arrowRight" size={16} />
            </Link>
          </div>
          <div className="tours-grid">
            {region.tours.map((t, i) => (
              <Link key={i} href={t.href} className="rp-tcard" style={{
                display: 'flex', flexDirection: 'column', height: '100%',
                background: '#FFFFFF', borderRadius: 16, overflow: 'hidden',
                textDecoration: 'none', color: '#1E1C19',
                border: '1px solid #ECE8DE',
                boxShadow: '0 1px 3px rgba(30,28,25,.05)',
                transition: 'transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s ease, border-color .35s ease',
              }}>
                {/* Card photo */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: '#EBE6DB', flexShrink: 0 }}>
                  <div className="rp-tcphoto" style={{ position: 'absolute', inset: 0, transition: 'transform .6s cubic-bezier(.2,.7,.2,1)' }}>
                    {t.image ? (
                      <Image src={t.image} alt={t.name} fill style={{ objectFit: 'cover' }} sizes="(max-width:560px) 100vw,(max-width:1100px) 50vw,25vw" />
                    ) : (
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,#EFEAE0,#E0D9CA)' }} />
                    )}
                  </div>
                  {/* Duration pill */}
                  <span style={{ position: 'absolute', top: 12, left: 12, display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(4px)', color: '#1E1C19', fontSize: 12, fontWeight: 600, padding: '7px 10px', borderRadius: 99, boxShadow: '0 2px 8px rgba(30,28,25,.12)' }}>
                    <Icon name="clock" size={13} />{t.duration}
                  </span>
                  {/* Badge */}
                  {t.isNew && t.badge && (
                    <span style={{ position: 'absolute', top: 12, right: 12, background: '#C75A37', color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', padding: '6px 9px', borderRadius: 99, boxShadow: '0 2px 8px rgba(199,90,55,.4)' }}>
                      {t.badge}
                    </span>
                  )}
                </div>
                {/* Card body */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1, padding: '18px 19px 20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 20, lineHeight: 1.2, margin: 0, color: '#1E1C19' }}>{t.name}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.45, color: '#79736A' }}>{t.hook}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#8C8576', marginTop: 2 }}>
                    <span style={{ display: 'inline-flex', color: '#C75A37' }}><Icon name="mappin" size={14} /></span>
                    {t.regionActivity}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 13, marginTop: 'auto', borderTop: '1px solid #F1EDE3' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#5C564E' }}>
                      <span style={{ display: 'inline-flex', color: '#A8A296' }}><Icon name="gauge" size={14} /></span>
                      {t.difficulty}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#C75A37', color: '#fff', padding: '9px 13px', borderRadius: 10, fontSize: 13, fontWeight: 600 }}>
                      View Tour <Icon name="arrowRight" size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── ACTIVITIES ── */}
      <section style={{ background: '#FAF8F3', color: '#1E1C19', fontFamily: 'var(--font-hanken), system-ui, sans-serif', padding: `0 ${PAD} clamp(58px,8vh,96px)` }}>
        <div ref={actRef} className="rp-reveal" style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(16px,3vw,36px)' }}>
          <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#A8A296', fontWeight: 600, flexShrink: 0 }}>Activities available here</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {region.activities.map((a, i) => (
              <Link key={i} href={a.href} className="rp-actpill" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#2E4034', background: 'rgba(46,64,52,.07)', border: '1px solid rgba(46,64,52,.12)', padding: '9px 16px', borderRadius: 999, textDecoration: 'none', transition: 'background .25s, color .25s, border-color .25s, transform .25s' }}>
                <Icon name={a.icon} size={16} />{a.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP + KEY SPOTS ── */}
      <section style={{ background: '#FFFFFF', color: '#1E1C19', fontFamily: 'var(--font-hanken), system-ui, sans-serif', padding: `${SEC_PY} ${PAD}`, borderTop: '1px solid rgba(30,28,25,.05)' }}>
        <div ref={mapRef} className="rp-reveal" style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C75A37', fontWeight: 600, marginBottom: 14 }}>On the Map</div>
          <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(30px,4.2vw,48px)', lineHeight: 1.04, letterSpacing: -.5, margin: '0 0 clamp(26px,3.4vw,40px)', maxWidth: '20ch' }}>
            Where It Sits in Georgia
          </h2>
          <div className="map-wrap">
            {/* Map canvas */}
            <div style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', border: '1px solid #E4DDD0', aspectRatio: '1000/620', background: '#D2E1E3' }}>
              <svg viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} aria-hidden>
                {/* Georgia silhouette blob */}
                <path d="M120,560 C90,430 150,360 250,330 C150,300 130,210 220,150 C320,90 430,120 520,90 C640,52 760,90 860,150 C940,196 920,300 840,360 C920,420 880,520 760,540 C600,566 300,600 120,560 Z" fill="rgba(46,64,52,.10)" stroke="rgba(46,64,52,.18)" strokeWidth="2" />
                {/* Dashed route line — Georgian Military Highway corridor */}
                <path d="M430,590 L455,530 Q482,468 510,410 Q505,355 495,300 Q512,235 540,175 M540,175 L470,150" fill="none" stroke="#C75A37" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="2 13" opacity=".9" />
              </svg>
              {/* Interactive pins */}
              {region.mapPins.map((pin, i) => (
                <button key={i} className="rp-pin" style={{ position: 'absolute', left: pin.left, top: pin.top, transform: 'translate(-50%,-100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'none', border: 'none', padding: 0, cursor: 'default', fontFamily: 'inherit', zIndex: 1 }} aria-label={pin.name} tabIndex={-1}>
                  <span className="rp-pinlabel" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.01em', color: '#1E1C19', background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(3px)', padding: '3px 8px', borderRadius: 999, boxShadow: '0 2px 6px rgba(30,28,25,.14)', whiteSpace: 'nowrap', transition: 'background .2s, color .2s' }}>{pin.name}</span>
                  <span className="rp-pindot" style={{ width: 13, height: 13, borderRadius: '50%', background: pin.accent ? '#C75A37' : '#2E4034', border: '2.5px solid #fff', boxShadow: '0 2px 6px rgba(30,28,25,.32)', transition: 'transform .2s', display: 'block' }} />
                </button>
              ))}
            </div>
            {/* Key spots list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 22, lineHeight: 1.2, marginBottom: 2 }}>Key spots</div>
              {region.mapPins.map((pin, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 11, height: 11, borderRadius: '50%', flexShrink: 0, background: pin.accent ? '#C75A37' : '#2E4034', boxShadow: `0 0 0 3px ${pin.accent ? 'rgba(199,90,55,.08)' : 'rgba(46,64,52,.08)'}`, display: 'inline-block' }} />
                  <span style={{ fontSize: 14.5, color: '#3A352E' }}>{pin.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BEST TIME ── */}
      <section style={{ background: '#FAF8F3', color: '#1E1C19', fontFamily: 'var(--font-hanken), system-ui, sans-serif', padding: `${SEC_PY} ${PAD}` }}>
        <div ref={seasonRef} className="rp-reveal" style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C75A37', fontWeight: 600, marginBottom: 14 }}>Best Time to Visit</div>
          <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(30px,4.2vw,48px)', lineHeight: 1.04, letterSpacing: -.5, margin: '0 0 clamp(26px,3.4vw,40px)', maxWidth: '20ch' }}>
            When to Come
          </h2>
          <div className="season-grid">
            {region.seasons.map((s, i) => {
              const ac = S_ACCENT[s.accent]
              return (
                <div key={i} style={{ background: '#FFFFFF', border: '1px solid rgba(30,28,25,.08)', borderRadius: 18, padding: 'clamp(22px,2.4vw,28px)', display: 'flex', flexDirection: 'column', gap: 13, boxShadow: '0 1px 3px rgba(30,28,25,.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 46, borderRadius: 13, background: ac.chip, color: ac.chipColor }}>
                      <Icon name={s.icon} size={22} />
                    </span>
                    <span style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 600, fontSize: 16, letterSpacing: '.02em', color: ac.months }}>{s.months}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 21, lineHeight: 1.2, marginTop: 4 }}>{s.title}</div>
                  <div style={{ fontSize: 14.5, lineHeight: 1.55, color: '#6B655C' }}>{s.desc}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── PRACTICAL / GOOD TO KNOW ── */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#23332A', color: '#FAF8F3', fontFamily: 'var(--font-hanken), system-ui, sans-serif', padding: `${SEC_PY} ${PAD}` }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(135deg, rgba(250,248,243,.035) 0 2px, transparent 2px 14px)' }} />
        <div ref={pracRef} className="rp-reveal" style={{ position: 'relative', maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#E59A6E', fontWeight: 600, marginBottom: 14 }}>Good to Know</div>
          <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(30px,4.2vw,48px)', lineHeight: 1.04, letterSpacing: -.5, margin: '0 0 clamp(28px,3.6vw,44px)', maxWidth: '20ch' }}>
            Practical Notes for the Mountains
          </h2>
          <div className="practical-grid">
            {region.practical.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 15, padding: '22px 24px', background: 'rgba(250,248,243,.05)', border: '1px solid rgba(250,248,243,.10)', borderRadius: 16 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: 12, background: 'rgba(250,248,243,.09)', color: '#E59A6E', flexShrink: 0 }}>
                  <Icon name={p.icon} size={20} />
                </span>
                <div>
                  <div style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 18, lineHeight: 1.25, marginBottom: 6 }}>{p.title}</div>
                  <div style={{ fontSize: 14.5, lineHeight: 1.55, color: 'rgba(250,248,243,.78)' }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOM TRIP NUDGE ── */}
      <section style={{ background: '#FAF8F3', color: '#1E1C19', fontFamily: 'var(--font-hanken), system-ui, sans-serif', padding: `clamp(56px,8vh,92px) ${PAD}` }}>
        <div ref={nudgeRef} className="rp-reveal" style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 24, background: 'linear-gradient(135deg,#FBEDE6,#F6E2D6)', border: '1px solid rgba(199,90,55,.18)', padding: 'clamp(34px,5vw,56px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
            <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(122deg, rgba(199,90,55,.04) 0 2px, transparent 2px 16px)' }} />
            <div style={{ position: 'relative', maxWidth: '42ch' }}>
              <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(26px,3.6vw,40px)', lineHeight: 1.1, letterSpacing: -.4, margin: '0 0 12px' }}>
                {region.customTripHeading}
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: '#5C534B', margin: 0 }}>{region.customTripBody}</p>
            </div>
            <Link href="/en/contact" className="rp-nudgebtn" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 9, flexShrink: 0, background: '#C75A37', color: '#fff', padding: '15px 26px', borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: 'none', boxShadow: '0 14px 30px -12px rgba(199,90,55,.7)', transition: 'transform .25s, box-shadow .25s' }}>
              Plan a Custom Trip <Icon name="arrowRight" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

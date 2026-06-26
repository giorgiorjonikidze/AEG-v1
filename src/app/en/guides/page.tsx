'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TailorMadeCTA from '@/components/TailorMadeCTA'

// ── Icons ──────────────────────────────────────────────────────────────────────
const PATHS: Record<string, string> = {
  instagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
  facebook:  '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  award:     '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>',
  globe:     '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  calendar:  '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  mappin:    '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  shield:    '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  users:     '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
}

function Ico({ n, size = 20, color }: { n: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color || 'currentColor'} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" dangerouslySetInnerHTML={{ __html: PATHS[n] || '' }} />
  )
}

// ── Data ───────────────────────────────────────────────────────────────────────
const GUIDES = [
  {
    key: 'rezi',
    img: '/images/guides/rezi.jpg',
    name: 'Rezi Beridze',
    role: 'Founder & Lead Adventure Guide',
    disciplines: ['Trekking', 'Cycling', 'Overlanding'],
    bio: 'Rezi founded Adventure Experts after years of solo expeditions across Georgia and beyond — on foot, on two wheels, and behind the wheel of a 4x4. He leads with calm certainty and genuine curiosity about the world.',
    line: 'The best roads are the ones with no signal and no rush.',
    cert: 'UIMLA Certified Mountain Leader',
    langs: 'Georgian · English · Russian',
    exp: 'Guiding since 2017',
    socials: ['instagram', 'facebook'],
  },
  {
    key: 'tamo',
    img: '/images/guides/tamo.jpg',
    name: 'Tamara Kvaratskhelia',
    role: 'Mountain Trekking Guide',
    disciplines: ['Trekking', 'High-Altitude', 'Svaneti Specialist'],
    bio: 'Tamo grew up in the shadow of the Caucasus and knows the mountains the way most people know their own neighbourhood. She guides multi-day treks through Svaneti and Kazbegi with equal parts warmth and precision.',
    line: "There's nowhere on earth like the Caucasus in July.",
    cert: 'Wilderness First Responder',
    langs: 'Georgian · English',
    exp: 'On the team since 2019',
    socials: ['instagram'],
  },
  {
    key: 'cotne',
    img: '/images/guides/cotne.png',
    name: 'Cotne Abuseridze',
    role: 'Summit & Winter Guide',
    disciplines: ['Mountaineering', 'Summit', 'Winter Expeditions'],
    bio: 'Cotne specialises in high-altitude objectives and cold-weather expeditions. Whether it is a summit push on Kazbegi or a winter traverse through Tusheti, he keeps the team safe, moving, and smiling.',
    line: 'Cold hands, warm heart — every summit is earned.',
    cert: 'Alpine Guide · Wilderness First Aid',
    langs: 'Georgian · English',
    exp: 'On the team since 2020',
    socials: ['instagram'],
  },
]

const TRUST = [
  { icon: 'award',   title: 'Certified',       desc: 'Internationally accredited mountain and wilderness guides.' },
  { icon: 'mappin',  title: 'Local',            desc: 'Born-and-raised experts who know these valleys by name.' },
  { icon: 'shield',  title: 'Safety-trained',   desc: 'First-responder qualified and equipped for the backcountry.' },
  { icon: 'users',   title: 'Small groups',     desc: 'Maximum eight people, so every trip stays personal.' },
]

// ── Page ───────────────────────────────────────────────────────────────────────
export default function GuidesPage() {
  const [vis, setVis] = useState<Record<string, boolean>>({})
  const [reduced, setReduced] = useState(false)
  const refs = useRef<Record<string, HTMLElement | null>>({})

  function setRef(key: string) {
    return (el: HTMLElement | null) => { refs.current[key] = el }
  }

  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      setReduced(mq.matches)
      mq.addEventListener('change', () => setReduced(mq.matches))
    } catch {}

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const k = (e.target as HTMLElement).dataset.revKey!
          setVis(p => ({ ...p, [k]: true }))
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' })

    Object.entries(refs.current).forEach(([k, el]) => {
      if (el) { el.dataset.revKey = k; io.observe(el) }
    })
    return () => io.disconnect()
  }, [])

  function rev(key: string, delay = 0): React.CSSProperties {
    if (reduced) return {}
    return {
      opacity: vis[key] ? 1 : 0,
      transform: vis[key] ? 'none' : 'translateY(22px)',
      transition: `opacity .65s cubic-bezier(.22,.61,.36,1) ${delay}s, transform .65s cubic-bezier(.22,.61,.36,1) ${delay}s`,
    }
  }

  return (
    <>
      <style>{`
        .g-photo-wrap{transition:transform .6s cubic-bezier(.22,.61,.36,1);}
        .g-photo-wrap:hover{transform:scale(1.045);}
        .g-social:hover{background:#C75A37 !important;color:#FFFFFF !important;border-color:#C75A37 !important;transform:translateY(-2px);}
        .guide-grid{display:grid;grid-template-columns:1.04fr 1fr;gap:clamp(34px,5.2vw,76px);align-items:center;}
        .guide-grid .g-media{order:0;}
        .guide-grid .g-body{order:1;}
        .guide-grid.rev .g-media{order:1;}
        .guide-grid.rev .g-body{order:0;}
        @media(max-width:860px){
          .guide-grid{grid-template-columns:1fr;gap:26px;}
          .guide-grid .g-media,.guide-grid.rev .g-media{order:0;}
          .guide-grid .g-body,.guide-grid.rev .g-body{order:1;}
        }
        .trust-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:clamp(24px,3vw,40px);}
      `}</style>

      <Navbar />

      <main style={{ background: '#FAF8F3' }}>

        {/* ── Hero Banner ── */}
        <section style={{ position: 'relative', overflow: 'hidden', background: '#1E1C19', color: '#FAF8F3', fontFamily: "'Hanken Grotesk',system-ui,sans-serif", padding: 'clamp(118px,16vh,168px) clamp(20px,5vw,56px) clamp(56px,8vh,86px)' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(118deg,#27362C 0%,#1E1C19 60%)' }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(135deg,rgba(250,248,243,.045) 0 2px,transparent 2px 13px)' }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(20,18,15,.26) 0%,rgba(20,18,15,.66) 100%)' }} />
          <div ref={setRef('banner')} style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', ...rev('banner') }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 12.5, letterSpacing: '.03em', color: 'rgba(250,248,243,.6)', marginBottom: 24 }}>
              <Link href="/en" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              <span style={{ opacity: .5 }}>/</span>
              <span style={{ color: '#FAF8F3' }}>Our Team</span>
            </div>
            <div style={{ fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#E59A6E', fontWeight: 600, marginBottom: 17 }}>Our Team</div>
            <h1 style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 'clamp(38px,6vw,62px)', lineHeight: 1.02, letterSpacing: '-.5px', margin: '0 0 20px', maxWidth: '16ch' }}>
              The People Behind Every Adventure
            </h1>
            <p style={{ maxWidth: '60ch', fontSize: 'clamp(16px,2vw,19px)', lineHeight: 1.64, color: 'rgba(250,248,243,.82)', margin: 0 }}>
              We met on a trail and never stopped. Meet the guides who&rsquo;ll walk beside you — locals who know these mountains by heart.
            </p>
          </div>
        </section>

        {/* ── Guides ── */}
        <section style={{ background: '#FAF8F3', color: '#1E1C19', fontFamily: "'Hanken Grotesk',system-ui,sans-serif", padding: 'clamp(60px,9vh,108px) clamp(20px,5vw,56px) clamp(40px,6vh,72px)' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            {GUIDES.map((g, i) => (
              <div key={g.key} ref={setRef(g.key)}
                className={`guide-grid${i % 2 === 1 ? ' rev' : ''}`}
                style={{ marginBottom: i < GUIDES.length - 1 ? 'clamp(56px,9vw,116px)' : 0, ...rev(g.key) }}>

                {/* Photo */}
                <div className="g-media">
                  <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 18, overflow: 'hidden', boxShadow: '0 32px 62px -36px rgba(30,28,25,.55)' }}>
                    <div className="g-photo-wrap" style={{ position: 'absolute', inset: 0 }}>
                      <Image src={g.img} alt={g.name} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} />
                    </div>
                    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: 'inset 0 0 0 1px rgba(30,28,25,.06)' }} />
                  </div>
                </div>

                {/* Body */}
                <div className="g-body">
                  <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C75A37', fontWeight: 600, marginBottom: 14 }}>{g.role}</div>
                  <h2 style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 'clamp(30px,3.6vw,44px)', lineHeight: 1.04, letterSpacing: '-.5px', margin: '0 0 18px' }}>{g.name}</h2>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: '#4A463E', margin: '0 0 20px', maxWidth: '46ch' }}>{g.bio}</p>

                  {/* Quote */}
                  <p style={{ fontFamily: "'Spectral',serif", fontStyle: 'italic', fontSize: 'clamp(18px,2vw,21px)', lineHeight: 1.5, color: '#1E1C19', margin: '0 0 28px', paddingLeft: 17, borderLeft: '2px solid #C75A37', maxWidth: '42ch' }}>
                    &ldquo;{g.line}&rdquo;
                  </p>

                  {/* Discipline pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginBottom: 30 }}>
                    {g.disciplines.map(d => (
                      <span key={d} style={{ display: 'inline-flex', alignItems: 'center', fontSize: 13, fontWeight: 600, letterSpacing: '.01em', color: '#2E4034', background: 'rgba(46,64,52,.08)', border: '1px solid transparent', padding: '7px 15px', borderRadius: 999 }}>{d}</span>
                    ))}
                  </div>

                  {/* Meta rows */}
                  <div style={{ display: 'grid', gap: 16, paddingTop: 26, borderTop: '1px solid rgba(30,28,25,.10)' }}>
                    {[
                      { label: 'Certification', value: g.cert,  icon: 'award'    },
                      { label: 'Languages',     value: g.langs, icon: 'globe'    },
                      { label: 'Experience',    value: g.exp,   icon: 'calendar' },
                    ].map(m => (
                      <div key={m.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 13 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: '50%', background: 'rgba(46,64,52,.07)', color: '#2E4034', flexShrink: 0, marginTop: 1 }}>
                          <Ico n={m.icon} size={16} color="#2E4034" />
                        </span>
                        <div>
                          <div style={{ fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase', color: '#A8A296', fontWeight: 600, marginBottom: 3 }}>{m.label}</div>
                          <div style={{ fontSize: 15, color: '#1E1C19', lineHeight: 1.4 }}>{m.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Social links */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 28 }}>
                    {g.socials.map(s => (
                      <a key={s} href="#" aria-label={s.charAt(0).toUpperCase() + s.slice(1)} className="g-social"
                        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: '50%', border: '1px solid rgba(30,28,25,.16)', color: '#1E1C19', textDecoration: 'none', transition: 'background .25s ease,color .25s ease,border-color .25s ease,transform .25s ease' }}>
                        <Ico n={s} size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why Our Guides ── */}
        <section style={{ background: '#FFFFFF', color: '#1E1C19', fontFamily: "'Hanken Grotesk',system-ui,sans-serif", padding: 'clamp(54px,8vh,86px) clamp(20px,5vw,56px)', borderTop: '1px solid rgba(30,28,25,.06)' }}>
          <div ref={setRef('trust')} style={{ maxWidth: 1080, margin: '0 auto', ...rev('trust') }}>
            <div style={{ textAlign: 'center', fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C75A37', fontWeight: 600, marginBottom: 'clamp(30px,4vw,44px)' }}>Why Our Guides</div>
            <div className="trust-grid">
              {TRUST.map((t, i) => (
                <div key={t.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 13, ...rev('trust', 0.08 + i * 0.08) }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: '50%', background: 'rgba(46,64,52,.08)', color: '#2E4034', flexShrink: 0 }}>
                    <Ico n={t.icon} size={24} color="#2E4034" />
                  </span>
                  <div>
                    <div style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 19, lineHeight: 1.2, marginBottom: 5 }}>{t.title}</div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B655C' }}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TailorMadeCTA />
      </main>

      <Footer />
    </>
  )
}

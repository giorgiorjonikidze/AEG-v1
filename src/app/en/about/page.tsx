import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { GUIDES } from '@/lib/data'
import TailorMadeCTA from '@/components/TailorMadeCTA'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Adventure Experts Georgia is a small team of certified local guides running small-group adventure tours across the Caucasus — trekking, caving, canyoning, overlanding and more.',
}

const VALUES = [
  {
    title: 'Local, certified guides',
    text: 'Every trip is led by certified Georgian guides — people who grew up on these trails, roads and rivers, and hold internationally recognised qualifications.',
  },
  {
    title: 'Small groups only',
    text: 'We keep departures small so the mountains stay quiet, guesthouses stay personal, and your guide actually knows your name.',
  },
  {
    title: 'Safety before summits',
    text: 'Weather, water levels and group condition decide the day — never the schedule. Every itinerary has margins built in, and turning back is always an option.',
  },
  {
    title: 'Honest travel',
    text: 'Real prices, definite inclusions, and no invented reviews. If something is provided, we say so; if it isn\'t, we say that too.',
  },
]

export default function AboutPage() {
  return (
    <>
      <div style={{ background: '#FAF8F3', color: '#1E1C19', fontFamily: 'var(--font-hanken), system-ui, sans-serif' }}>

        {/* ── Intro ── */}
        <section style={{ padding: 'clamp(120px,16vh,170px) clamp(20px,5vw,48px) clamp(48px,7vh,72px)' }}>
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C75A37', fontWeight: 600, marginBottom: 16 }}>About Us</div>
            <h1 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(36px,5.5vw,60px)', lineHeight: 1.05, letterSpacing: '-.5px', margin: '0 0 24px' }}>
              A Small Team of Georgian Guides Who Never Really Came Down From the Mountains
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.75, color: '#5C564E', margin: 0, maxWidth: '62ch' }}>
              Adventure Experts Georgia was founded by local, certified guides who have spent years leading
              travelers through the Caucasus — across Svaneti&apos;s glacier valleys, into the wild caves of
              Imereti, over the Abano Pass into Tusheti, and down the semi-desert canyons of Vashlovani.
              We&apos;re a new company, but the people leading your trip are not new to this: guiding these
              mountains is what we&apos;ve always done. Now we do it under our own name.
            </p>
          </div>
        </section>

        {/* ── Values ── */}
        <section style={{ padding: '0 clamp(20px,5vw,48px) clamp(56px,8vh,88px)' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
            {VALUES.map(v => (
              <div key={v.title} style={{ background: '#FFFFFF', border: '1px solid #ECE8DE', borderRadius: 16, padding: '26px 26px 28px', boxShadow: '0 1px 3px rgba(30,28,25,.05)' }}>
                <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 21, lineHeight: 1.25, margin: '0 0 10px' }}>{v.title}</h2>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: '#6F6A60', margin: 0 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Team ── */}
        <section style={{ background: '#F5F0E8', padding: 'clamp(56px,8vh,88px) clamp(20px,5vw,48px)' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 'clamp(28px,4vw,44px)' }}>
              <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(28px,4vw,42px)', lineHeight: 1.06, letterSpacing: '-.4px', margin: 0 }}>
                The People Behind the Trips
              </h2>
              <Link href="/en/guides" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14.5, fontWeight: 600, color: '#2E4034', textDecoration: 'none', borderBottom: '1.5px solid rgba(46,64,52,.28)', paddingBottom: 3 }}>
                Meet all our guides →
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
              {GUIDES.map(g => (
                <div key={g.id} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #ECE8DE' }}>
                  <div style={{ position: 'relative', aspectRatio: '4/3', background: '#EBE6DB' }}>
                    <Image src={g.photo} alt={g.alt} fill sizes="(max-width:720px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '18px 20px 20px' }}>
                    <div style={{ fontFamily: 'var(--font-spectral), serif', fontSize: 20, fontWeight: 500 }}>{g.name}</div>
                    <div style={{ fontSize: 13, color: '#C75A37', fontWeight: 600, margin: '3px 0 8px' }}>{g.role}</div>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: '#6F6A60', margin: 0 }}>{g.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How we work ── */}
        <section style={{ padding: 'clamp(56px,8vh,88px) clamp(20px,5vw,48px)' }}>
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(28px,4vw,42px)', lineHeight: 1.06, letterSpacing: '-.4px', margin: '0 0 20px' }}>
              Where We Take You
            </h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.75, color: '#5C564E', margin: '0 0 28px' }}>
              From single-day canyoning and caving trips out of Kutaisi to ten-day 4×4 expeditions across
              six regions, everything we run is built and led in-house. Browse the full range, or tell us
              what you have in mind and we&apos;ll build it around you.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Link href="/en/tours" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '14px 26px', borderRadius: 12, background: '#C75A37', color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
                Browse All Tours
              </Link>
              <Link href="/en/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '14px 26px', borderRadius: 12, background: 'rgba(46,64,52,.08)', border: '1px solid rgba(46,64,52,.16)', color: '#2E4034', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </div>

      <TailorMadeCTA />
      <Footer />
    </>
  )
}

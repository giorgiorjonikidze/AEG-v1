import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { GUIDES } from '@/lib/data'
import TailorMadeCTA from '@/components/TailorMadeCTA'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'We met on a university hike in 2017 and never really came back down. How three friends became certified Georgian guides and started Adventure Experts Georgia.',
}

const CHAPTERS = [
  {
    id: 'begin',
    year: '2017',
    kicker: 'How it began',
    title: 'Three strangers, one trail',
    body: [
      'In 2017 we left the university campus for a weekend in the mountains. None of us really knew each other when the bus pulled out of the city. By the time we walked back down, that had changed.',
      'Something clicked out there — the early starts, the cold mornings, the arguing over a paper map, the way a ridge looks once you finally get over it. We came home and the only thing any of us wanted to talk about was when we could go again. After that first trip, stopping was never really on the table.',
    ],
    main: {
      src: '/images/about/story/ch1-main.jpg',
      alt: 'Two of the founders sitting at a camp table below a snow-capped peak in the Georgian Caucasus, October 2018',
      ratio: '4 / 3',
    },
    inset: {
      src: '/images/about/story/ch1-inset.jpg',
      alt: 'The brightly painted old weather station high on Mount Kazbek, July 2019',
    },
    caption: 'October 2018 — a camp table, a chess set, and a peak that kept pulling us back.',
    reverse: false,
  },
  {
    id: 'kept-going',
    year: 'The years after',
    kicker: 'How we kept going',
    title: 'From enthusiasts to experts',
    body: [
      'One weekend became every weekend. We went looking for longer routes, wilder rivers and deeper caves — and the mountains kept handing us reasons to take it all more seriously.',
      'So we did. Course after course, certificate after certificate: rope work, cave technique, alpine skills, wilderness first aid. We learned to read weather, rock and water the way you learn a language you know you will speak for the rest of your life. Somewhere in those years we stopped being three friends who hike a lot, and became guides.',
    ],
    main: {
      src: '/images/about/story/ch2-main.jpg',
      alt: 'A roped team in helmets moving along a steep rocky ridge high in the Georgian Caucasus, June 2025',
      ratio: '4 / 5',
    },
    inset: {
      src: '/images/about/story/ch2-inset.jpg',
      alt: 'Two climbers on a rock face with ropes, ice axes and technical gear',
    },
    caption: 'June 2025 — ground like this only opens up to you after years of courses.',
    reverse: true,
  },
  {
    id: 'our-life',
    year: 'Today',
    kicker: 'When it became our life',
    title: 'Then we decided to do it our own way',
    body: [
      'For years we guided for other companies, under other people’s names. We learned a lot that way — including what we would do differently if the trip were ours.',
      'Eventually the obvious thing became unavoidable: everything the three of us had learned belonged together, under one roof. So we put it there. Adventure Experts Georgia is what came out of that — not the end of a long story, but the beginning of a new one, built on every kilometre that came before.',
    ],
    main: {
      src: '/images/about/story/ch3-main.jpg',
      alt: 'Two Adventure Experts Georgia founders talking on a ridge in front of a glaciated peak at sunset, August 2024',
      ratio: '4 / 5',
    },
    inset: {
      src: '/images/about/story/ch3-inset.jpg',
      alt: 'An Adventure Experts Georgia guide leading a small group of travellers below the Chaukhi peaks',
    },
    caption: 'August 2024 — same two people, a lot more certificates, still arguing about the route.',
    reverse: false,
  },
]

const BELIEFS = [
  {
    title: 'Local and real',
    text: 'We grew up on these trails. You are not getting a script — you are getting the Caucasus through the eyes of people who never left it.',
  },
  {
    title: 'Safety before summits',
    text: 'Weather, water levels and how the group is actually doing decide the day — never the schedule. Turning back is always allowed.',
  },
  {
    title: 'Small and personal',
    text: 'Private departures only. No mixed groups, no strangers — your guide knows your name, your pace and when you need a coffee break.',
  },
  {
    title: 'Beyond the postcard',
    text: 'We will take you past the viewpoints everyone photographs, to the Georgia we actually love.',
  },
]

export default function AboutPage() {
  return (
    <>
      <div style={{ background: '#FAF8F3', color: '#1E1C19', fontFamily: 'var(--font-hanken), system-ui, sans-serif' }}>

        <style>{`
          .about-collage { grid-template-columns: repeat(8, 1fr); }
          @media (max-width: 900px) { .about-collage { grid-template-columns: repeat(6, 1fr); } }
          @media (max-width: 540px) { .about-collage { grid-template-columns: repeat(4, 1fr); } }

          .story-row {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: clamp(28px, 5vw, 72px);
            align-items: center;
          }
          .story-row + .story-row { margin-top: clamp(56px, 9vh, 108px); }
          .story-row.reverse .story-media { order: 2; }
          @media (max-width: 880px) {
            .story-row { grid-template-columns: minmax(0, 1fr); gap: 28px; }
            .story-row.reverse .story-media { order: 0; }
            .story-media { max-width: 520px; }
          }
        `}</style>

        {/* ── Hero collage ── */}
        <section style={{ position: 'relative', width: '100%', minHeight: 'clamp(460px,66vh,640px)', overflow: 'hidden', background: '#14110E', display: 'flex', alignItems: 'flex-end' }}>
          <div className="about-collage" aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'grid', gridAutoRows: '1fr' }}>
            {Array.from({ length: 32 }, (_, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={`/images/about/collage/tile-${String(i + 1).padStart(2, '0')}.jpg`} alt=""
                style={{ width: '100%', height: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block' }} />
            ))}
          </div>
          {/* readability overlay: dark at top (nav) and bottom (title), photos visible in the middle */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,17,14,.82) 0%, rgba(20,17,14,.30) 20%, rgba(20,17,14,.20) 52%, rgba(20,17,14,.72) 84%, rgba(20,17,14,.90) 100%)' }} />
          <div style={{ position: 'relative', width: '100%', maxWidth: 1180, margin: '0 auto', padding: 'clamp(40px,7vh,72px) clamp(20px,5vw,48px)' }}>
            <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#F0A57F', fontWeight: 600, marginBottom: 16 }}>Our Story</div>
            <h1 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, color: '#fff', fontSize: 'clamp(34px,5.2vw,58px)', lineHeight: 1.06, letterSpacing: '-.5px', margin: 0, maxWidth: '16ch', textShadow: '0 2px 30px rgba(0,0,0,.35)' }}>
              One Trail Became a Way of Life
            </h1>
            <p style={{ fontSize: 'clamp(16px,2vw,19px)', lineHeight: 1.6, color: 'rgba(255,255,255,.86)', margin: '18px 0 0', maxWidth: '46ch', textShadow: '0 1px 16px rgba(0,0,0,.45)' }}>
              We met on a student hike in 2017 — and never really came back down.
            </p>
          </div>
        </section>

        {/* ── Intro ── */}
        <section style={{ padding: 'clamp(52px,9vh,96px) clamp(20px,5vw,48px) clamp(44px,7vh,72px)' }}>
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-spectral), serif', fontSize: 'clamp(21px,2.7vw,27px)', lineHeight: 1.6, color: '#3A352F', margin: 0, maxWidth: '30ch' }}>
              Adventure Experts Georgia is not a brand somebody invented in an office.
            </p>
            <p style={{ fontSize: 17.5, lineHeight: 1.8, color: '#5C564E', margin: '22px 0 0', maxWidth: '62ch' }}>
              It is three friends who met on a student hike, kept walking, and never found a good
              enough reason to stop. Everything below actually happened — the mountains, the courses,
              the years of guiding for other people before we finally did it under our own name.
            </p>
          </div>
        </section>

        {/* ── Story chapters ── */}
        <section style={{ padding: '0 clamp(20px,5vw,48px) clamp(56px,9vh,104px)' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            {CHAPTERS.map((c, i) => (
              <div key={c.id} className={`story-row${c.reverse ? ' reverse' : ''}`}>

                {/* photo cluster */}
                <div className="story-media" style={{ position: 'relative', paddingBottom: 'clamp(44px,6vw,68px)', paddingRight: c.reverse ? 0 : 'clamp(34px,4.5vw,58px)', paddingLeft: c.reverse ? 'clamp(34px,4.5vw,58px)' : 0 }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: c.main.ratio, borderRadius: 18, overflow: 'hidden', background: '#EBE6DB', boxShadow: '0 18px 44px rgba(30,28,25,.14)' }}>
                    <Image
                      src={c.main.src}
                      alt={c.main.alt}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 880px) 92vw, 46vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, right: c.reverse ? 'auto' : 0, left: c.reverse ? 0 : 'auto', width: 'clamp(120px,26%,190px)', aspectRatio: '1 / 1', borderRadius: 14, overflow: 'hidden', border: '5px solid #FAF8F3', background: '#EBE6DB', boxShadow: '0 12px 30px rgba(30,28,25,.18)' }}>
                    <Image
                      src={c.inset.src}
                      alt={c.inset.alt}
                      fill
                      sizes="200px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>

                {/* text */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <span style={{ fontSize: 12.5, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C75A37', fontWeight: 700 }}>{c.year}</span>
                    <span aria-hidden="true" style={{ flex: '0 0 34px', height: 1, background: 'rgba(199,90,55,.35)' }} />
                    <span style={{ fontSize: 12.5, letterSpacing: '.12em', textTransform: 'uppercase', color: '#8A8378', fontWeight: 600 }}>{c.kicker}</span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(26px,3.6vw,40px)', lineHeight: 1.1, letterSpacing: '-.4px', margin: '0 0 18px' }}>
                    {c.title}
                  </h2>
                  {c.body.map((p, n) => (
                    <p key={n} style={{ fontSize: 16.5, lineHeight: 1.8, color: '#5C564E', margin: n === 0 ? 0 : '16px 0 0', maxWidth: '54ch' }}>{p}</p>
                  ))}
                  <p style={{ fontSize: 13.5, lineHeight: 1.6, color: '#8A8378', fontStyle: 'italic', margin: '22px 0 0', paddingLeft: 14, borderLeft: '2px solid rgba(199,90,55,.3)', maxWidth: '46ch' }}>
                    {c.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Photo interlude ── */}
        <section style={{ position: 'relative', width: '100%', minHeight: 'clamp(320px,46vh,460px)', overflow: 'hidden', background: '#14110E', display: 'flex', alignItems: 'center' }}>
          <Image
            src="/images/about/story/interlude.jpg"
            alt="First light over a sea of clouds from a high camp in the Georgian Caucasus"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: '50% 62%' }}
          />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(20,17,14,.82) 0%, rgba(20,17,14,.55) 55%, rgba(20,17,14,.35) 100%)' }} />
          <div style={{ position: 'relative', width: '100%', maxWidth: 1180, margin: '0 auto', padding: 'clamp(48px,8vh,80px) clamp(20px,5vw,48px)' }}>
            <p style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(23px,3.4vw,38px)', lineHeight: 1.35, color: '#fff', margin: 0, maxWidth: '22ch', textShadow: '0 2px 24px rgba(0,0,0,.4)' }}>
              Nine years later, we still plan our lives around the next trip.
            </p>
            <p style={{ fontSize: 'clamp(15px,1.8vw,18px)', lineHeight: 1.7, color: 'rgba(255,255,255,.82)', margin: '18px 0 0', maxWidth: '38ch' }}>
              The only difference is that now you can come with us.
            </p>
          </div>
        </section>

        {/* ── What we believe ── */}
        <section style={{ padding: 'clamp(56px,9vh,96px) clamp(20px,5vw,48px)' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(28px,4vw,42px)', lineHeight: 1.06, letterSpacing: '-.4px', margin: '0 0 clamp(26px,4vw,40px)' }}>
              What We Believe
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
              {BELIEFS.map(v => (
                <div key={v.title} style={{ background: '#FFFFFF', border: '1px solid #ECE8DE', borderRadius: 16, padding: '26px 26px 28px', boxShadow: '0 1px 3px rgba(30,28,25,.05)' }}>
                  <h3 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 21, lineHeight: 1.25, margin: '0 0 10px' }}>{v.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: '#6F6A60', margin: 0 }}>{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section style={{ background: '#F5F0E8', padding: 'clamp(56px,8vh,88px) clamp(20px,5vw,48px)' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 'clamp(28px,4vw,44px)' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(28px,4vw,42px)', lineHeight: 1.06, letterSpacing: '-.4px', margin: 0 }}>
                  The Three of Us
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: '#6F6A60', margin: '12px 0 0', maxWidth: '52ch' }}>
                  The three who met on that trail in 2017 are the same three who will meet you at the trailhead.
                </p>
              </div>
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

        {/* ── Where we take you ── */}
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

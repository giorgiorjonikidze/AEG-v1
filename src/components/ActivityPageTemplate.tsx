import Image from 'next/image'
import Link from 'next/link'
import type { ActivityData } from '@/data/activities'
import type { TourData } from '@/data/tours'
import TailorMadeCTA from '@/components/TailorMadeCTA'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import ActivityJumpNav from '@/components/ActivityJumpNav'
import ActivityGallery from '@/components/ActivityGallery'

const css = `
  .act-hero{position:relative;height:clamp(480px,70vh,780px);overflow:hidden;}
  .act-hero-img{object-fit:cover;object-position:center 40%;}
  .act-hero-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,22,12,.22) 0%,rgba(14,22,12,0) 28%,rgba(14,22,12,.62) 100%);pointer-events:none;}
  .act-hero-content{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:clamp(28px,5vw,72px);}
  .act-breadcrumb{display:flex;align-items:center;gap:8px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.65);margin-bottom:20px;flex-wrap:wrap;}
  .act-breadcrumb a{color:rgba(255,255,255,.55);text-decoration:none;}
  .act-breadcrumb a:hover{color:#fff;}
  .act-chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px;}
  .act-chip{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);border-radius:100px;padding:8px 16px;font-size:13px;color:rgba(255,255,255,.92);backdrop-filter:blur(4px);}

  .act-body{max-width:1240px;margin:0 auto;padding:0 clamp(20px,5vw,48px);}

  .act-intro-grid{display:grid;grid-template-columns:1fr 340px;gap:64px;padding:72px 0 64px;align-items:start;}
  .act-intro-prose{font-size:17px;line-height:1.75;color:#4a463f;}
  .act-intro-prose p{margin:0;}
  .act-why-card{background:#23332A;color:#fff;border-radius:8px;padding:36px 32px;}
  .act-why-card h3{font-family:var(--font-spectral),serif;font-size:20px;font-weight:500;color:#fff;margin:0 0 20px;}
  .act-why-item{display:flex;gap:14px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.1);}
  .act-why-item:last-child{border-bottom:none;padding-bottom:0;}
  .act-why-dot{width:6px;height:6px;background:#C75A37;border-radius:50%;flex:none;margin-top:8px;}

  .act-section{padding:56px 0;border-top:1px solid rgba(30,28,25,.08);}
  .act-eyebrow{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#A8A296;margin-bottom:12px;}
  .act-h2{font-family:var(--font-spectral),serif;font-size:clamp(26px,3vw,36px);font-weight:500;color:#1E1C19;margin:0 0 8px;}
  .act-sub{font-size:15px;color:#7a7469;margin:0 0 36px;line-height:1.6;}

  .act-facts-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;}
  .act-fact-card{background:#FAF8F3;border:1px solid rgba(30,28,25,.08);border-radius:8px;padding:24px 20px;}
  .act-fact-icon{width:36px;height:36px;background:#2E4034;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;}
  .act-fact-label{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#A8A296;margin-bottom:6px;}
  .act-fact-value{font-size:14.5px;color:#1E1C19;line-height:1.5;font-weight:500;}

  .act-regions-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;}
  .act-region-card{position:relative;border-radius:8px;overflow:hidden;height:220px;text-decoration:none;display:block;}
  .act-region-card:hover .act-region-img{transform:scale(1.04);}
  .act-region-img{transition:transform .5s ease;object-fit:cover;}
  .act-region-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,22,12,0) 30%,rgba(14,22,12,.72) 100%);}
  .act-region-info{position:absolute;bottom:0;left:0;right:0;padding:20px 18px;}
  .act-region-name{font-family:var(--font-spectral),serif;font-size:18px;font-weight:500;color:#fff;display:block;margin-bottom:4px;}
  .act-region-desc{font-size:12.5px;color:rgba(255,255,255,.75);line-height:1.5;}

  .act-tours-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px;}
  .act-tour-card{border-radius:8px;overflow:hidden;border:1px solid rgba(30,28,25,.09);background:#fff;text-decoration:none;display:flex;flex-direction:column;transition:box-shadow .25s;}
  .act-tour-card:hover{box-shadow:0 16px 40px -16px rgba(30,28,25,.22);}
  .act-tour-img-wrap{position:relative;height:200px;overflow:hidden;flex:none;}
  .act-tour-img-wrap img{object-fit:cover;transition:transform .5s ease;}
  .act-tour-card:hover .act-tour-img-wrap img{transform:scale(1.04);}
  .act-tour-body{padding:20px 22px 24px;display:flex;flex-direction:column;gap:10px;flex:1;}
  .act-tour-tag{display:inline-block;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#C75A37;margin-bottom:2px;}
  .act-tour-name{font-family:var(--font-spectral),serif;font-size:19px;font-weight:500;color:#1E1C19;line-height:1.3;}
  .act-tour-meta{display:flex;gap:14px;flex-wrap:wrap;}
  .act-tour-pill{font-size:12px;color:#7a7469;display:flex;align-items:center;gap:5px;}
  .act-tour-cta{margin-top:auto;display:inline-flex;align-items:center;gap:6px;font-size:13.5px;color:#C75A37;font-weight:500;}

.act-diff-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
  .act-diff-card{border-radius:8px;padding:28px 24px;border:1px solid rgba(30,28,25,.09);}
  .act-diff-easy{background:#f0f7f2;border-color:#b5d9be;}
  .act-diff-moderate{background:#fdf6ee;border-color:#f0d3a8;}
  .act-diff-challenging{background:#fdf0ed;border-color:#f0bdb0;}
  .act-diff-badge{display:inline-block;font-size:10.5px;letter-spacing:2px;text-transform:uppercase;font-weight:600;padding:5px 12px;border-radius:100px;margin-bottom:14px;}
  .act-diff-easy .act-diff-badge{background:#d4edda;color:#1a5c30;}
  .act-diff-moderate .act-diff-badge{background:#fde9c3;color:#7a4a00;}
  .act-diff-challenging .act-diff-badge{background:#fad4cd;color:#7a2010;}
  .act-diff-desc{font-size:14.5px;color:#4a463f;line-height:1.55;margin-bottom:14px;}
  .act-diff-meta{display:flex;flex-direction:column;gap:5px;}
  .act-diff-row{font-size:12.5px;color:#7a7469;display:flex;gap:8px;}
  .act-diff-row strong{color:#1E1C19;font-weight:500;min-width:90px;}

  .act-season-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
  .act-season-card{border-radius:8px;padding:24px 20px;border:1px solid rgba(30,28,25,.08);}
  .act-season-prime{background:#EBF4EE;border-color:#a8cfb0;}
  .act-season-good{background:#FEF9EC;border-color:#e8d58a;}
  .act-season-limited{background:#F5F5F4;border-color:#d4d0ca;}
  .act-season-period{font-size:15px;font-weight:600;color:#1E1C19;margin-bottom:8px;}
  .act-season-prime .act-season-period{color:#1a5c30;}
  .act-season-good .act-season-period{color:#6b4a00;}
  .act-season-limited .act-season-period{color:#6b6459;}
  .act-season-note{font-size:13.5px;color:#4a463f;line-height:1.6;}

  .act-practical-item{padding:24px 0;border-bottom:1px solid rgba(30,28,25,.07);display:flex;gap:20px;align-items:start;}
  .act-practical-num{font-family:var(--font-spectral),serif;font-size:28px;font-weight:400;color:rgba(199,90,55,.3);flex:none;width:36px;line-height:1;}
  .act-practical-heading{font-size:14px;font-weight:600;color:#1E1C19;margin-bottom:5px;letter-spacing:.3px;}
  .act-practical-body{font-size:14px;color:#6b6459;line-height:1.65;}

  .act-faq{display:flex;flex-direction:column;}
  .act-faq-item{border-bottom:1px solid rgba(30,28,25,.08);padding:22px 0;}
  .act-faq-q{font-size:16px;font-weight:500;color:#1E1C19;margin-bottom:10px;}
  .act-faq-a{font-size:14.5px;color:#6b6459;line-height:1.7;}

  .act-nudge{background:#1E1C19;border-radius:10px;padding:48px 40px;display:flex;align-items:center;justify-content:space-between;gap:32px;margin:56px 0;}
  .act-nudge-text h3{font-family:var(--font-spectral),serif;font-size:26px;font-weight:500;color:#fff;margin:0 0 10px;}
  .act-nudge-text p{font-size:15px;color:rgba(255,255,255,.65);margin:0;line-height:1.6;max-width:480px;}
  .act-nudge-btn{display:inline-flex;align-items:center;gap:10px;background:#C75A37;color:#fff;text-decoration:none;padding:15px 28px;border-radius:6px;font-size:15px;font-weight:500;white-space:nowrap;flex:none;}

  @media(max-width:900px){
    .act-intro-grid{grid-template-columns:1fr;gap:36px;padding:48px 0 40px;}
.act-diff-grid,.act-season-grid{grid-template-columns:1fr;}
    .act-nudge{flex-direction:column;align-items:flex-start;padding:32px 24px;}
  }
  @media(max-width:640px){
    .act-regions-grid{grid-template-columns:1fr 1fr;}
    .act-tours-grid{grid-template-columns:1fr;}
  }
`

function IconArrow() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
}

const ICONS: Record<string, () => JSX.Element> = {
  difficulty: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m2 20 5-10 4 6 3-4 5 8"/></svg>,
  clock:      () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  calendar:   () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  fitness:    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><path d="M6 1v3M10 1v3M14 1v3"/></svg>,
  check:      () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
}

const DIFF_BG: Record<string, string> = { Easy: 'act-diff-easy', Moderate: 'act-diff-moderate', Challenging: 'act-diff-challenging' }

interface Props {
  activity: ActivityData
  tours: TourData[]
}

export default function ActivityPageTemplate({ activity, tours }: Props) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <main>
        {/* ── Hero ── */}
        <section className="act-hero">
          <Image src={activity.heroImage} alt={activity.name} fill priority className="act-hero-img" sizes="100vw" />
          <div className="act-hero-overlay" />
          <div className="act-hero-content">
            <nav className="act-breadcrumb" aria-label="Breadcrumb">
              <Link href="/en">Home</Link>
              <span style={{ opacity: .5 }}>/</span>
              <Link href="/en/tours">Tours</Link>
              <span style={{ opacity: .5 }}>/</span>
              <span style={{ color: 'rgba(255,255,255,.9)' }}>{activity.name}</span>
            </nav>
            <div style={{ maxWidth: 680 }}>
              <p style={{ fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,.7)', margin: '0 0 14px' }}>Adventure Experts Georgia</p>
              <h1 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(36px,5.5vw,68px)', color: '#fff', margin: 0, lineHeight: 1.06, letterSpacing: '-1px', textShadow: '0 2px 32px rgba(0,0,0,.4)' }}>
                {activity.name}<br /><span style={{ color: 'rgba(255,255,255,.78)' }}>in Georgia</span>
              </h1>
              <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,.88)', margin: '18px 0 0', lineHeight: 1.6, textShadow: '0 1px 12px rgba(0,0,0,.35)' }}>
                {activity.tagline}
              </p>
              <div className="act-chips">
                {activity.quickFacts.slice(0, 3).map(f => {
                  const Icon = ICONS[f.icon] ?? ICONS.check
                  return (
                    <span key={f.label} className="act-chip">
                      <Icon />
                      {f.value}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <ActivityJumpNav />

        <div className="act-body">

          {/* ── Intro + Why Us ── */}
          <div id="act-intro" className="act-intro-grid">
            <div>
              <p className="act-eyebrow">Why {activity.name.toLowerCase()} in Georgia</p>
              <h2 className="act-h2" style={{ marginBottom: 24 }}>A hidden gem for {activity.name.toLowerCase()} enthusiasts</h2>
              <p className="act-intro-prose">{activity.intro}</p>
            </div>
            <div className="act-why-card">
              <h3>Why adventure with us</h3>
              {activity.whyUs.map((item, i) => (
                <div key={i} className="act-why-item">
                  <div className="act-why-dot" />
                  <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,.8)', lineHeight: 1.65 }}>{item}</p>
                </div>
              ))}
              <Link href="/en/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 24, color: '#C75A37', fontSize: 13.5, fontWeight: 500, textDecoration: 'none' }}>
                About our team <IconArrow />
              </Link>
            </div>
          </div>

          {/* ── Quick Facts ── */}
          <section id="act-facts" className="act-section">
            <p className="act-eyebrow">What to expect</p>
            <h2 className="act-h2">Quick facts</h2>
            <p className="act-sub">Everything you need to know at a glance before choosing a tour.</p>
            <div className="act-facts-grid">
              {activity.quickFacts.map(f => {
                const Icon = ICONS[f.icon] ?? ICONS.check
                return (
                  <div key={f.label} className="act-fact-card">
                    <div className="act-fact-icon"><Icon /></div>
                    <div className="act-fact-label">{f.label}</div>
                    <div className="act-fact-value">{f.value}</div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ── Best regions ── */}
          <section id="act-regions" className="act-section">
            <p className="act-eyebrow">Best regions</p>
            <h2 className="act-h2">Where to go</h2>
            <p className="act-sub">Each region offers a different character — click to explore.</p>
            <div className="act-regions-grid">
              {activity.regions.map(r => (
                <Link key={r.slug} href={`/en/regions/${r.slug}`} className="act-region-card">
                  <Image src={r.image} alt={r.name} fill className="act-region-img" sizes="(max-width:640px) 50vw, (max-width:900px) 50vw, 25vw" />
                  <div className="act-region-overlay" />
                  <div className="act-region-info">
                    <span className="act-region-name">{r.name}</span>
                    <span className="act-region-desc">{r.description}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Tours ── */}
          <section id="act-tours" className="act-section">
            <p className="act-eyebrow">Our tours</p>
            <h2 className="act-h2">Handpicked, led by locals</h2>
            <p className="act-sub">Real routes, honest difficulty ratings, small groups.</p>
            {tours.length > 0 ? (
              <>
                <div className="act-tours-grid">
                  {tours.map(t => (
                    <Link key={t.slug} href={`/en/tours/${t.slug}`} className="act-tour-card">
                      <div className="act-tour-img-wrap">
                        <Image src={t.heroImage} alt={t.name} fill sizes="(max-width:640px) 100vw, (max-width:900px) 50vw, 33vw" />
                      </div>
                      <div className="act-tour-body">
                        <span className="act-tour-tag">{t.region}</span>
                        <span className="act-tour-name">{t.name}</span>
                        <div className="act-tour-meta">
                          <span className="act-tour-pill">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                            {t.quickFacts.duration}
                          </span>
                          <span className="act-tour-pill">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 20 5-10 4 6 3-4 5 8"/></svg>
                            {t.quickFacts.difficulty}
                          </span>
                          <span className="act-tour-pill">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            From {t.currency}{t.price.toLocaleString()}
                          </span>
                        </div>
                        <span className="act-tour-cta">Enquire <IconArrow /></span>
                      </div>
                    </Link>
                  ))}
                </div>
                <div style={{ marginTop: 32, textAlign: 'center' }}>
                  <Link href="/en/tours" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#1E1C19', fontSize: 14, border: '1px solid rgba(30,28,25,.2)', borderRadius: 6, padding: '12px 24px', textDecoration: 'none' }}>
                    View all tours <IconArrow />
                  </Link>
                </div>
              </>
            ) : (
              <div style={{ background: '#FAF8F3', border: '1px solid rgba(30,28,25,.08)', borderRadius: 8, padding: '40px 32px', textAlign: 'center' }}>
                <p style={{ color: '#7a7469', fontSize: 15, margin: '0 0 16px' }}>Tours coming soon — we are building our catalogue for this activity.</p>
                <Link href="/en/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#C75A37', color: '#fff', textDecoration: 'none', padding: '12px 24px', borderRadius: 6, fontSize: 14, fontWeight: 500 }}>
                  Enquire about a custom trip <IconArrow />
                </Link>
              </div>
            )}
          </section>

          {/* ── Gallery ── */}
          {activity.gallery.length > 0 && (
            <section id="act-gallery" className="act-section">
              <p className="act-eyebrow">In the field</p>
              <h2 className="act-h2">Our photos</h2>
              <p className="act-sub">Every photo taken by our team and guides on location in Georgia — no stock images.</p>
              <ActivityGallery images={activity.gallery} activityName={activity.name} />
            </section>
          )}

          {/* ── Difficulty ── */}
          <section id="act-difficulty" className="act-section">
            <p className="act-eyebrow">Difficulty explained</p>
            <h2 className="act-h2">Which level is right for you?</h2>
            <p className="act-sub">Every tour page shows a difficulty rating — here is exactly what each one means.</p>
            <div className="act-diff-grid">
              {activity.difficultyLevels.map(d => (
                <div key={d.level} className={`act-diff-card ${DIFF_BG[d.level]}`}>
                  <span className="act-diff-badge">{d.level}</span>
                  <p className="act-diff-desc">{d.description}</p>
                  <div className="act-diff-meta">
                    {d.distance   && <div className="act-diff-row"><strong>Distance</strong>{d.distance}</div>}
                    {d.elevation  && <div className="act-diff-row"><strong>Elevation</strong>{d.elevation}</div>}
                    <div className="act-diff-row"><strong>Experience</strong>{d.experience}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Season ── */}
          <section id="act-season" className="act-section">
            <p className="act-eyebrow">Planning your trip</p>
            <h2 className="act-h2">Best time to go</h2>
            <p className="act-sub">Conditions change significantly by season — here is a clear breakdown.</p>
            <div className="act-season-grid">
              {activity.seasons.map(s => (
                <div key={s.period} className={`act-season-card act-season-${s.type}`}>
                  <div className="act-season-period">{s.period}</div>
                  <div className="act-season-note">{s.note}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Practical ── */}
          <section id="act-practical" className="act-section">
            <p className="act-eyebrow">Good to know</p>
            <h2 className="act-h2">Practical information</h2>
            <p className="act-sub">Everything you need to prepare well and arrive confident.</p>
            <div>
              {activity.practical.map((item, i) => (
                <div key={item.heading} className="act-practical-item">
                  <span className="act-practical-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="act-practical-heading">{item.heading}</div>
                    <div className="act-practical-body">{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ── */}
          <section id="act-faq" className="act-section">
            <p className="act-eyebrow">FAQ</p>
            <h2 className="act-h2">Common questions</h2>
            <div className="act-faq" style={{ marginTop: 32 }}>
              {activity.faq.map(item => (
                <div key={item.q} className="act-faq-item">
                  <div className="act-faq-q">{item.q}</div>
                  <div className="act-faq-a">{item.a}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Custom nudge ── */}
          <div className="act-nudge">
            <div className="act-nudge-text">
              <h3>Want to do it your way?</h3>
              <p>Every activity can be shaped around your group, your dates, and your level. Tell us what you have in mind.</p>
            </div>
            <Link href="/en/tailor-made" className="act-nudge-btn">
              Plan a Custom Trip <IconArrow />
            </Link>
          </div>

        </div>
      </main>

      <TailorMadeCTA />
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}

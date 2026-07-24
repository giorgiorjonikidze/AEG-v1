import Image from 'next/image'
import Link from 'next/link'
import type { ActivityData } from '@/data/activities'
import type { TourData } from '@/data/tours'
import TailorMadeCTA from '@/components/TailorMadeCTA'
import Footer from '@/components/Footer'
import ActivityJumpNav from '@/components/ActivityJumpNav'
import ActivityGallery from '@/components/ActivityGallery'

const css = `
  .act-hero{position:relative;height:clamp(480px,70vh,780px);overflow:hidden;}
  .act-hero-img{object-fit:cover;object-position:center 40%;}
  .act-hero-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,22,12,.22) 0%,rgba(14,22,12,0) 28%,rgba(14,22,12,.62) 100%);pointer-events:none;}
  .act-hero-content{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:clamp(28px,5vw,72px);}
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


  .act-tours-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px;}
  .act-tour-card{border-radius:16px;overflow:hidden;border:1px solid #ECE8DE;background:#fff;text-decoration:none;color:#1E1C19;display:flex;flex-direction:column;height:100%;box-shadow:0 1px 3px rgba(30,28,25,.05);transition:transform .35s cubic-bezier(.2,.7,.2,1),box-shadow .35s ease,border-color .35s ease;}
  .act-tour-card:hover{transform:translateY(-6px);box-shadow:0 22px 46px -16px rgba(30,28,25,.28);border-color:#E2DCCF;}
  .act-tour-img-wrap{position:relative;width:100%;aspect-ratio:4/3;overflow:hidden;flex:none;background:#EBE6DB;}
  .act-tour-img-wrap img{object-fit:cover;transition:transform .6s cubic-bezier(.2,.7,.2,1);}
  .act-tour-card:hover .act-tour-img-wrap img{transform:scale(1.06);}
  .act-tour-daypill{position:absolute;top:12px;left:12px;display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,.92);backdrop-filter:blur(4px);color:#1E1C19;font-size:12px;font-weight:600;padding:7px 10px;border-radius:99px;box-shadow:0 2px 8px rgba(30,28,25,.12);}
  .act-tour-newbadge{position:absolute;top:12px;right:12px;background:#C75A37;color:#fff;font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;padding:6px 9px;border-radius:99px;box-shadow:0 2px 8px rgba(199,90,55,.4);}
  .act-tour-body{padding:18px 19px 20px;display:flex;flex-direction:column;gap:9px;flex:1;}
  .act-tour-name{font-family:var(--font-spectral),serif;font-size:21px;font-weight:500;color:#1E1C19;line-height:1.2;margin:0;}
  .act-tour-hook{margin:0;font-size:14.5px;line-height:1.45;color:#79736A;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  .act-tour-place{display:flex;align-items:center;gap:6px;font-size:13.5px;color:#8C8576;}
  .act-tour-meta{display:flex;align-items:center;gap:16px;padding:12px 0 2px;border-top:1px solid #F1EDE3;font-size:13.5px;color:#5C564E;}
  .act-tour-pill{display:inline-flex;align-items:center;gap:5px;}
  .act-tour-foot{display:flex;align-items:flex-end;justify-content:space-between;gap:10px;margin-top:auto;padding-top:14px;}
  .act-tour-price{font-size:13px;color:#A8A296;}
  .act-tour-price strong{font-family:var(--font-spectral),serif;font-size:19px;color:#1E1C19;font-weight:600;}
  .act-tour-cta{display:inline-flex;align-items:center;gap:6px;flex-shrink:0;background:#C75A37;color:#fff;padding:9px 13px;border-radius:10px;font-size:13px;font-weight:600;transition:box-shadow .3s ease;}
  .act-tour-card:hover .act-tour-cta{box-shadow:0 10px 20px -8px rgba(199,90,55,.6);}
  .act-tour-cta svg{transition:transform .3s ease;}
  .act-tour-card:hover .act-tour-cta svg{transform:translateX(3px);}

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


  @media(max-width:900px){
    .act-intro-grid{grid-template-columns:1fr;gap:36px;padding:48px 0 40px;}
.act-diff-grid,.act-season-grid{grid-template-columns:1fr;}
  }
  @media(max-width:640px){
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
  wheel:      () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="2.2"/><path d="M12 3.6v6.2M6.5 17l4.1-3.6M17.5 17l-4.1-3.6"/></svg>,
  car:        () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>,
  home:       () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  pin:        () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
}

const DIFF_BG: Record<string, string> = { Easy: 'act-diff-easy', Moderate: 'act-diff-moderate', Challenging: 'act-diff-challenging' }

interface Props {
  activity: ActivityData
  tours: TourData[]
}

export default function ActivityPageTemplate({ activity, tours }: Props) {
  const quickFactsSection = (
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
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <main>
        {/* ── Hero ── */}
        <section className="act-hero">
          <Image src={activity.heroImage} alt={activity.name} fill priority className="act-hero-img" sizes="100vw" />
          <div className="act-hero-overlay" />
          <div className="act-hero-content">
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

          {/* ── Quick Facts (after Overview — only when factsAfterIntro) ── */}
          {activity.factsAfterIntro && quickFactsSection}

          {/* ── Tours ── */}
          <section id="act-tours" className="act-section">
            <p className="act-eyebrow">Our tours</p>
            <h2 className="act-h2">Handpicked, led by locals</h2>
            <p className="act-sub">Real routes, honest difficulty ratings, always private.</p>
            {tours.length > 0 ? (
              <>
                <div className="act-tours-grid">
                  {tours.map(t => (
                    <Link key={t.slug} href={`/en/tours/${t.slug}`} className="act-tour-card">
                      <div className="act-tour-img-wrap">
                        <Image src={t.heroImage} alt={t.name} fill sizes="(max-width:640px) 100vw, (max-width:900px) 50vw, 33vw" />
                        <span className="act-tour-daypill">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          {t.quickFacts.duration}
                        </span>
                        <span className="act-tour-newbadge">New</span>
                      </div>
                      <div className="act-tour-body">
                        <h3 className="act-tour-name">{t.name}</h3>
                        <p className="act-tour-hook">{t.emotionalLine}</p>
                        <div className="act-tour-place">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C75A37" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                          {t.region} · {t.category}
                        </div>
                        <div className="act-tour-meta">
                          <span className="act-tour-pill">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A8A296" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            {t.quickFacts.duration}
                          </span>
                          <span className="act-tour-pill">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A8A296" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 6v4"/><path d="M12 14h.01"/></svg>
                            {t.quickFacts.difficulty}
                          </span>
                        </div>
                        <div className="act-tour-foot">
                          <span className="act-tour-price">From <strong>{t.currency}{t.price.toLocaleString()}</strong> / person</span>
                          <span className="act-tour-cta">
                            View Tour
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                          </span>
                        </div>
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

          {/* ── Quick Facts (default position — after Gallery) ── */}
          {!activity.factsAfterIntro && quickFactsSection}

          {/* ── Difficulty ── */}
          {activity.difficultyLevels.length > 0 && (
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
          )}

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

        </div>
      </main>

      <TailorMadeCTA />
      <Footer />
    </>
  )
}

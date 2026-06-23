import React from 'react'

const STEPS = [
  {
    n: '01',
    title: 'Send an Enquiry',
    body: 'Fill in a short form — destination, dates, group size. Takes two minutes.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'We Call You Back',
    body: 'A guide calls within 24 hours to tailor the itinerary around your pace and goals.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Secure Your Spot',
    body: 'Confirm with a small deposit. The rest is paid on arrival — no surprises.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section style={{ background: '#2E4034', padding: '80px 28px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', fontFamily: 'var(--font-hanken), sans-serif', marginBottom: 14 }}>
            Simple process
          </div>
          <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 'clamp(28px,4vw,42px)', lineHeight: 1.1, color: '#fff', margin: 0 }}>
            How it works
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
          {STEPS.map((step, i) => (
            <div key={step.n} style={{ position: 'relative', padding: '36px 32px', borderLeft: i > 0 ? '1px solid rgba(255,255,255,.1)' : 'none' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.9)', marginBottom: 20 }}>
                {step.icon}
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(199,90,55,.75)', fontFamily: 'var(--font-hanken), sans-serif', marginBottom: 10 }}>
                Step {step.n}
              </div>
              <h3 style={{ fontFamily: 'var(--font-spectral), serif', fontWeight: 500, fontSize: 22, color: '#fff', margin: '0 0 10px', lineHeight: 1.2 }}>
                {step.title}
              </h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,.6)', fontFamily: 'var(--font-hanken), sans-serif' }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

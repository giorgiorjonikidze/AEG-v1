'use client'
import { useState } from 'react'
import type { TourData } from '@/data/tours'

export default function TourFAQ({ tour }: { tour: TourData }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="tp-faq" style={{ padding: '52px 0 0' }}>
      <style>{`
        .faq-body { overflow:hidden; transition:max-height .3s cubic-bezier(.4,0,.2,1), opacity .25s ease; }
        @media(prefers-reduced-motion:reduce){ .faq-body { transition:none!important; } }
      `}</style>

      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#C75A37', marginBottom: 10, fontFamily: 'var(--font-hanken), sans-serif' }}>FAQ</div>
      <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontSize: 'clamp(26px,3vw,36px)', fontWeight: 500, color: '#1E1C19', margin: '0 0 24px', lineHeight: 1.15 }}>Common questions</h2>

      <div style={{ border: '1px solid rgba(30,28,25,.08)', borderRadius: 16, overflow: 'hidden' }}>
        {tour.faq.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={i} style={{ borderBottom: i === tour.faq.length - 1 ? 'none' : '1px solid rgba(30,28,25,.08)' }}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                style={{ width: '100%', background: isOpen ? 'rgba(199,90,55,.03)' : '#fff', border: 'none', cursor: 'pointer', padding: '20px 24px', textAlign: 'left' as const, display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'var(--font-hanken), sans-serif', transition: 'background .2s' }}
              >
                <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: '#1E1C19', lineHeight: 1.35 }}>{item.q}</span>
                <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: isOpen ? '#C75A37' : 'rgba(30,28,25,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isOpen ? '#fff' : '#6F6A60'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform .25s ease' }}>
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
              </button>
              <div className="faq-body" style={{ maxHeight: isOpen ? 400 : 0, opacity: isOpen ? 1 : 0, background: '#fff' }}>
                <p style={{ margin: '0 0 0', padding: '4px 24px 24px', fontSize: 15, lineHeight: 1.65, color: '#6F6A60', fontFamily: 'var(--font-hanken), sans-serif' }}>{item.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

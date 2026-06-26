'use client'
import { useRef, useReducer, useEffect, useCallback } from 'react'
import type { TourData } from '@/data/tours'

interface InquiryCardProps {
  tourName: string
  tourMeta: string
  whatsappNumber?: string
  compact?: boolean
  hideTravelers?: boolean
  defaultTravelers?: number
}

type FormState = {
  name: string; email: string; whatsapp: string; dateStart: string
  flexible: boolean; travelers: number; country: string; tourType: string
  experience: string; notes: string; errors: Record<string, string | undefined>; submitted: boolean
}

type FormAction =
  | { type: 'set'; k: keyof FormState; v: string | boolean | number }
  | { type: 'setErrors'; e: Record<string, string | undefined> }
  | { type: 'submit' }
  | { type: 'step'; d: number }
  | { type: 'toggleFlexible' }
  | { type: 'reset' }

function formReducer(s: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'set': return { ...s, [action.k]: action.v, errors: { ...s.errors, [action.k]: undefined, contact: undefined } }
    case 'setErrors': return { ...s, errors: action.e }
    case 'submit': return { ...s, errors: {}, submitted: true }
    case 'step': return { ...s, travelers: Math.max(1, Math.min(16, s.travelers + action.d)) }
    case 'toggleFlexible': return { ...s, flexible: !s.flexible, errors: { ...s.errors, dates: undefined } }
    case 'reset': return { ...initialForm }
    default: return s
  }
}

const initialForm: FormState = {
  name: '', email: '', whatsapp: '', dateStart: '', flexible: false,
  travelers: 2, country: '', tourType: '', experience: '', notes: '',
  errors: {}, submitted: false,
}

export function InquiryCard({ tourName, tourMeta, whatsappNumber = '995555123456', compact = false, hideTravelers = false, defaultTravelers }: InquiryCardProps) {
  const [s, dispatch] = useReducer(formReducer, { ...initialForm, travelers: defaultTravelers ?? initialForm.travelers })
  const refPrivate = useRef<HTMLButtonElement>(null)
  const refGroup = useRef<HTMLButtonElement>(null)
  const refExpNone = useRef<HTMLButtonElement>(null)
  const refExpSome = useRef<HTMLButtonElement>(null)
  const refExpExp = useRef<HTMLButtonElement>(null)
  const refFlex = useRef<HTMLButtonElement>(null)

  const applyDynamic = useCallback(() => {
    const seg = (ref: React.RefObject<HTMLButtonElement | null>, on: boolean) => {
      const el = ref.current; if (!el) return
      el.style.background = on ? '#2E4034' : 'transparent'
      el.style.color = on ? '#FFFFFF' : '#6F6A60'
      el.style.boxShadow = on ? '0 1px 2px rgba(30,28,25,.18)' : 'none'
    }
    seg(refPrivate, s.tourType === 'private')
    seg(refGroup, s.tourType === 'group')
    seg(refExpNone, s.experience === 'none')
    seg(refExpSome, s.experience === 'some')
    seg(refExpExp, s.experience === 'experienced')
    const fp = refFlex.current
    if (fp) {
      fp.style.borderColor = s.flexible ? '#2E4034' : 'rgba(30,28,25,.16)'
      fp.style.background = s.flexible ? 'rgba(46,64,52,.07)' : '#FFFFFF'
      fp.style.color = s.flexible ? '#2E4034' : '#6F6A60'
    }
  }, [s.tourType, s.experience, s.flexible])

  useEffect(() => { applyDynamic() })

  function validate() {
    const e: Record<string, string> = {}
    if (!s.name.trim()) e.name = 'Please tell us your name.'
    const em = s.email.trim(), wa = s.whatsapp.trim()
    if (!em && !wa) e.contact = 'Add an email or phone number so we can reach you.'
    else if (em && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) e.email = "That email doesn't look right."
    if (!s.flexible && !s.dateStart) e.dates = 'Pick a date, or choose "Flexible".'
    return e
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).some(k => e[k])) { dispatch({ type: 'setErrors', e }); return }
    dispatch({ type: 'submit' })
  }

  const waNum = whatsappNumber.replace(/\D/g, '')
  const waHref = `https://wa.me/${waNum}?text=${encodeURIComponent(`Hi Adventure Experts — I'd like to enquire about ${tourName}.`)}`
  const E = s.errors

  const inputBase: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box', padding: '12px 14px',
    borderRadius: 11, border: '1.5px solid rgba(30,28,25,.14)',
    background: '#FFFFFF', fontSize: 14.5, fontFamily: 'inherit',
    color: '#1E1C19', outline: 'none',
  }

  return (
    <div className="aeg-motion" style={{ width: '100%', maxWidth: 548, background: '#FFFFFF', border: '1px solid rgba(30,28,25,.08)', borderRadius: 20, boxShadow: '0 28px 80px -36px rgba(30,28,25,.34),0 2px 4px rgba(30,28,25,.03)', overflow: 'hidden', fontFamily: "'Hanken Grotesk',system-ui,sans-serif", color: '#1E1C19', boxSizing: 'border-box' }}>
      <style>{`
        @media (prefers-reduced-motion: reduce){ .aeg-motion *{transition:none!important;animation:none!important} }
        ::placeholder{color:#B7B1A6;opacity:1}
        .aeg-input:focus{border-color:#C75A37!important;box-shadow:0 0 0 3px rgba(199,90,55,.14)!important;}
        .aeg-submit:hover{transform:translateY(-2px);box-shadow:0 18px 30px -12px rgba(199,90,55,.75)!important;background:#B84F2F!important;}
        .aeg-submit:active{transform:translateY(0)!important;}
        .aeg-wa:hover{transform:translateY(-2px);box-shadow:0 14px 26px -12px rgba(37,211,102,.7)!important;}
        .aeg-seg{flex:1;padding:10px 8px;border-radius:9px;border:none;background:transparent;color:#6F6A60;cursor:pointer;font-size:13.5px;font-weight:600;font-family:inherit;transition:background .16s ease,color .16s ease;}
        .aeg-flex-btn{display:inline-flex;align-items:center;gap:7px;padding:8px 13px;border-radius:10px;border:1.5px solid rgba(30,28,25,.16);background:#FFFFFF;color:#6F6A60;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;transition:border-color .16s ease,background .16s ease,color .16s ease;}
      `}</style>

      {s.submitted ? (
        <div style={{ padding: '46px 36px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 66, height: 66, borderRadius: '50%', background: 'rgba(46,64,52,.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <span style={{ width: 46, height: 46, borderRadius: '50%', background: '#2E4034', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#FAF8F3" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </span>
          </div>
          <h2 style={{ fontFamily: "'Spectral',Georgia,serif", fontWeight: 600, fontSize: 26, lineHeight: 1.15, margin: '0 0 10px' }}>Thanks! Your inquiry&apos;s on its way</h2>
          <p style={{ margin: '0 0 6px', fontSize: 14.5, lineHeight: 1.55, color: '#6F6A60', maxWidth: '38ch' }}>
            Check <strong style={{ color: '#1E1C19', fontWeight: 600 }}>{s.email || 'your inbox'}</strong> for a confirmation. We&apos;ll reply within 24 hours to plan it together.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FAF8F3', border: '1px solid rgba(30,28,25,.09)', borderRadius: 11, padding: '10px 15px', margin: '20px 0 0' }}>
            <span style={{ display: 'inline-flex', width: 26, height: 26, borderRadius: 7, background: '#2E4034', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#FAF8F3" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>
            </span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.25 }}>{tourName}</div>
              <div style={{ fontSize: 11.5, color: '#A8A296' }}>{tourMeta}</div>
            </div>
          </div>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="aeg-wa" style={{ marginTop: 22, display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 12, background: '#25D366', color: '#0B3A1E', textDecoration: 'none', fontSize: 14, fontWeight: 700, padding: '12px 22px', transition: 'transform .15s ease' }}>
            <svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.05c-.24.68-1.42 1.31-1.96 1.36-.5.05-.96.24-3.23-.67-2.72-1.07-4.45-3.84-4.58-4.02-.13-.18-1.1-1.46-1.1-2.79 0-1.33.7-1.98.94-2.25.25-.27.54-.34.72-.34.18 0 .36 0 .52.01.17.01.39-.06.61.47.24.56.79 1.94.86 2.08.07.14.12.31.02.49-.09.18-.14.29-.27.45-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.22.61-.13.25.09 1.6.75 1.87.89.27.14.45.2.52.31.07.12.07.68-.17 1.36Z"/></svg>
            Chat with us on WhatsApp
          </a>
          <p style={{ margin: '18px 0 0', fontSize: 12, color: '#A8A296', lineHeight: 1.45, maxWidth: '34ch' }}>No payment now — once we&apos;ve planned the details, you&apos;ll secure your spot via a secure link.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate style={{ display: 'block', margin: 0 }}>
          {!compact && (
            <div style={{ padding: '30px 32px 8px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, fontWeight: 600, letterSpacing: '1.4px', textTransform: 'uppercase', color: '#C75A37', marginBottom: 13 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C75A37', display: 'inline-block' }} />Enquire
              </div>
              <h2 style={{ fontFamily: "'Spectral',Georgia,serif", fontWeight: 600, fontSize: 29, lineHeight: 1.12, letterSpacing: '-.2px', margin: '0 0 10px' }}>Enquire About This Trip</h2>
              <p style={{ margin: '0 0 18px', fontSize: 14.5, lineHeight: 1.5, color: '#6F6A60', maxWidth: '42ch' }}>No payment, no obligation — tell us what you&apos;re thinking and we&apos;ll reply within 24 hours.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#FAF8F3', border: '1px solid rgba(30,28,25,.09)', borderRadius: 12, padding: '11px 14px' }}>
                <span style={{ display: 'inline-flex', flex: 'none', width: 30, height: 30, borderRadius: 8, background: '#2E4034', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#FAF8F3" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tourName}</div>
                  <div style={{ fontSize: 12.5, color: '#A8A296', lineHeight: 1.3, marginTop: 1 }}>{tourMeta}</div>
                </div>
                <span style={{ marginLeft: 'auto', flex: 'none', color: '#A8A296' }} title="Locked to this trip">
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
              </div>
            </div>
          )}

          <div style={{ padding: '18px 32px 0', display: 'flex', flexDirection: 'column', gap: 17 }}>
            {/* Name */}
            <div>
              <label htmlFor="aeg-name" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600, letterSpacing: '.1px', color: '#1E1C19', marginBottom: 7 }}>
                Name<span style={{ color: '#C75A37' }}>*</span>
              </label>
              <input id="aeg-name" type="text" placeholder="Your full name" value={s.name}
                onChange={e => dispatch({ type: 'set', k: 'name', v: e.target.value })}
                className="aeg-input"
                style={{ ...inputBase, border: E.name ? '1.5px solid #C75A37' : '1.5px solid rgba(30,28,25,.14)' }} />
              {E.name && <ErrMsg msg={E.name} />}
            </div>

            {/* Contact */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px 9px', marginBottom: 7 }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, fontWeight: 600, letterSpacing: '.1px', color: '#1E1C19', whiteSpace: 'nowrap' }}>How can we reach you?<span style={{ color: '#C75A37' }}>*</span></label>
                <span style={{ fontSize: 11.5, color: '#A8A296', fontWeight: 500, whiteSpace: 'nowrap' }}>&mdash; email or phone</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <span style={{ position: 'absolute', left: 13, color: '#A8A296', pointerEvents: 'none', display: 'inline-flex' }}>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
                  </span>
                  <input type="email" placeholder="Email" value={s.email}
                    onChange={e => dispatch({ type: 'set', k: 'email', v: e.target.value })}
                    className="aeg-input"
                    style={{ ...inputBase, paddingLeft: 38, border: (E.email || E.contact) ? '1.5px solid #C75A37' : '1.5px solid rgba(30,28,25,.14)' }} />
                </div>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <span style={{ position: 'absolute', left: 13, color: '#A8A296', pointerEvents: 'none', display: 'inline-flex' }}>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
                  </span>
                  <input type="tel" placeholder="Phone (e.g. +995 555 12 34 56)" value={s.whatsapp}
                    onChange={e => dispatch({ type: 'set', k: 'whatsapp', v: e.target.value })}
                    className="aeg-input"
                    style={{ ...inputBase, paddingLeft: 38, border: E.contact ? '1.5px solid #C75A37' : '1.5px solid rgba(30,28,25,.14)' }} />
                </div>
              </div>
              {E.contact && <ErrMsg msg={E.contact} />}
              {E.email && <ErrMsg msg={E.email} />}
            </div>

            {/* Dates */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600, letterSpacing: '.1px', color: '#1E1C19', marginBottom: 7 }}>
                Preferred travel dates<span style={{ color: '#C75A37' }}>*</span>
              </label>
              <div style={{ display: 'flex', alignItems: 'stretch', gap: 10 }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                  <input type="date" value={s.dateStart} disabled={s.flexible}
                    onChange={e => dispatch({ type: 'set', k: 'dateStart', v: e.target.value })}
                    className="aeg-input"
                    style={{ ...inputBase, border: E.dates ? '1.5px solid #C75A37' : '1.5px solid rgba(30,28,25,.14)', opacity: s.flexible ? 0.45 : 1 }} />
                </div>
                <button type="button" ref={refFlex} onClick={() => dispatch({ type: 'toggleFlexible' })} className="aeg-flex-btn">
                  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/></svg>Flexible / not sure
                </button>
              </div>
              {E.dates && <ErrMsg msg={E.dates} />}
            </div>

            {/* Travelers */}
            {!hideTravelers && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600, letterSpacing: '.1px', color: '#1E1C19' }}>
                  Travelers<span style={{ color: '#C75A37' }}>*</span>
                </label>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
                  <StepBtn label="Remove a traveler" onClick={() => dispatch({ type: 'step', d: -1 })} disabled={s.travelers <= 1}>&minus;</StepBtn>
                  <span style={{ minWidth: 22, textAlign: 'center', fontSize: 17, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{s.travelers}</span>
                  <StepBtn label="Add a traveler" onClick={() => dispatch({ type: 'step', d: 1 })} disabled={s.travelers >= 16}>+</StepBtn>
                </div>
              </div>
            )}

            <div style={{ height: 1, background: 'rgba(30,28,25,.08)', margin: '3px 0' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '-4px 0 -2px' }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#A8A296' }}>A few optional details</span>
              <span style={{ flex: 1, height: 1, background: 'rgba(30,28,25,.06)' }} />
            </div>

            {/* Country */}
            <div>
              <label htmlFor="aeg-country" style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#6F6A60', marginBottom: 7 }}>
                Country <span style={{ color: '#A8A296', fontWeight: 500 }}>(optional)</span>
              </label>
              <input id="aeg-country" type="text" placeholder="Where are you travelling from?" value={s.country}
                onChange={e => dispatch({ type: 'set', k: 'country', v: e.target.value })}
                className="aeg-input" style={inputBase} />
            </div>

            {/* Tour type */}
            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#6F6A60', marginBottom: 7 }}>
                Private or group tour? <span style={{ color: '#A8A296', fontWeight: 500 }}>(optional)</span>
              </label>
              <div style={{ display: 'flex', gap: 4, padding: 4, background: '#FAF8F3', border: '1px solid rgba(30,28,25,.1)', borderRadius: 12 }}>
                <button type="button" ref={refPrivate} className="aeg-seg" onClick={() => dispatch({ type: 'set', k: 'tourType', v: s.tourType === 'private' ? '' : 'private' })}>Private</button>
                <button type="button" ref={refGroup} className="aeg-seg" onClick={() => dispatch({ type: 'set', k: 'tourType', v: s.tourType === 'group' ? '' : 'group' })}>Group</button>
              </div>
            </div>

            {/* Experience */}
            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#6F6A60', marginBottom: 7 }}>
                Experience level <span style={{ color: '#A8A296', fontWeight: 500 }}>(optional)</span>
              </label>
              <div style={{ display: 'flex', gap: 4, padding: 4, background: '#FAF8F3', border: '1px solid rgba(30,28,25,.1)', borderRadius: 12 }}>
                <button type="button" ref={refExpNone} className="aeg-seg" onClick={() => dispatch({ type: 'set', k: 'experience', v: s.experience === 'none' ? '' : 'none' })}>None</button>
                <button type="button" ref={refExpSome} className="aeg-seg" onClick={() => dispatch({ type: 'set', k: 'experience', v: s.experience === 'some' ? '' : 'some' })}>Some</button>
                <button type="button" ref={refExpExp} className="aeg-seg" onClick={() => dispatch({ type: 'set', k: 'experience', v: s.experience === 'experienced' ? '' : 'experienced' })}>Experienced</button>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="aeg-notes" style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#6F6A60', marginBottom: 7 }}>
                Questions or special requests <span style={{ color: '#A8A296', fontWeight: 500 }}>(optional)</span>
              </label>
              <textarea id="aeg-notes" rows={3}
                placeholder="Tell us what you're hoping for — group size, pace, must-see spots, or any questions…"
                value={s.notes} onChange={e => dispatch({ type: 'set', k: 'notes', v: e.target.value })}
                className="aeg-input"
                style={{ ...inputBase, lineHeight: 1.5, resize: 'vertical', minHeight: 78 }} />
            </div>
          </div>

          {/* 3-step strip */}
          <div style={{ padding: '22px 32px 0' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, background: '#FAF8F3', border: '1px solid rgba(30,28,25,.09)', borderRadius: 13, padding: '15px 16px' }}>
              {[
                { n: '1', color: '#C75A37', text: 'Send your inquiry' },
                { n: '2', color: '#2E4034', text: "We reply within 24h & plan it on a quick call" },
                { n: '3', color: '#A8A296', text: 'Secure your spot with a payment link' },
              ].map((step, i) => (
                <div key={step.n} style={{ display: 'contents' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 7, padding: '0 4px' }}>
                    <span style={{ width: 25, height: 25, borderRadius: '50%', background: step.color, color: '#fff', fontSize: 12.5, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{step.n}</span>
                    <span style={{ fontSize: 11.5, lineHeight: 1.3, color: '#1E1C19', fontWeight: 600 }}>{step.text}</span>
                  </div>
                  {i < 2 && (
                    <span style={{ alignSelf: 'center', color: '#CFC9BD', flex: 'none', marginTop: -12 }}>
                      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ padding: '18px 32px 0', display: 'flex', flexDirection: 'column', gap: 11 }}>
            <button type="submit" className="aeg-submit"
              style={{ width: '100%', border: 'none', borderRadius: 13, background: '#C75A37', color: '#fff', fontFamily: "'Hanken Grotesk',sans-serif", fontSize: 16, fontWeight: 700, padding: 15, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, boxShadow: '0 12px 24px -12px rgba(199,90,55,.7)', transition: 'transform .15s ease,box-shadow .15s ease,background .15s ease' }}>
              Send Inquiry
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </button>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="aeg-wa"
              style={{ width: '100%', boxSizing: 'border-box', borderRadius: 13, background: '#25D366', color: '#0B3A1E', textDecoration: 'none', fontSize: 15, fontWeight: 700, padding: 13, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, transition: 'transform .15s ease,box-shadow .15s ease' }}>
              <svg width={19} height={19} viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.05c-.24.68-1.42 1.31-1.96 1.36-.5.05-.96.24-3.23-.67-2.72-1.07-4.45-3.84-4.58-4.02-.13-.18-1.1-1.46-1.1-2.79 0-1.33.7-1.98.94-2.25.25-.27.54-.34.72-.34.18 0 .36 0 .52.01.17.01.39-.06.61.47.24.56.79 1.94.86 2.08.07.14.12.31.02.49-.09.18-.14.29-.27.45-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.22.61-.13.25.09 1.6.75 1.87.89.27.14.45.2.52.31.07.12.07.68-.17 1.36Z"/></svg>
              Contact on WhatsApp
            </a>
            <div style={{ textAlign: 'center', paddingTop: 1 }}>
              <a href="#enquire" style={{ fontSize: 13.5, color: '#2E4034', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid rgba(46,64,52,.3)', paddingBottom: 1 }}>Request a Custom Version</a>
            </div>
          </div>

          {/* Trust badges */}
          <div style={{ padding: '18px 32px 28px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px 18px', paddingTop: 16, borderTop: '1px solid rgba(30,28,25,.07)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#4F4A42', fontWeight: 500 }}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#2E4034" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                We reply within 24 hours
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#4F4A42', fontWeight: 500 }}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#2E4034" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                No payment now &mdash; pay later via secure link
              </span>
            </div>
            <p style={{ margin: '11px 0 0', fontSize: 11.5, lineHeight: 1.45, color: '#A8A296', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', marginTop: 1 }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              We&apos;ll only use your details to plan your trip.
            </p>
          </div>
        </form>
      )}
    </div>
  )
}

function ErrMsg({ msg }: { msg: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6, fontSize: 12, color: '#C75A37', fontWeight: 500 }}>
      <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
      {msg}
    </div>
  )
}

function StepBtn({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled: boolean; children: React.ReactNode }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} disabled={disabled}
      style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 10, border: '1.5px solid rgba(30,28,25,.14)', background: '#FFFFFF', cursor: disabled ? 'not-allowed' : 'pointer', color: '#1E1C19', fontSize: 20, lineHeight: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', opacity: disabled ? 0.4 : 1 }}>
      {children}
    </button>
  )
}

export default function TourInquirySection({ tour, priceStr }: { tour: TourData; priceStr: string }) {
  return (
    <section id="enquire" className="tp-enquire" style={{ padding: '52px 0 0', display: 'flex', justifyContent: 'flex-start' }}>
      <InquiryCard
        tourName={tour.name}
        tourMeta={`${tour.quickFacts.duration} · from ${priceStr}`}
        whatsappNumber="995555123456"
      />
    </section>
  )
}

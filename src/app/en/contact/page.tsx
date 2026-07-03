'use client'
import { useEffect, useReducer, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { waLink, mailtoLink } from '@/lib/contact'
import { submitEnquiry, type EnquiryPayload } from '@/lib/enquiry'

// ── Icons ─────────────────────────────────────────────────────────────────────
const PATHS: Record<string, string> = {
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  phone: '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>',
  pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  instagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  chevR: '<path d="m9 18 6-6-6-6"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  minus: '<path d="M5 12h14"/>',
  alert: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
  call: '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>',
  secure: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
}
const WA_PATH = '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.358.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.582 0 11.943-5.359 11.945-11.893a11.821 11.821 0 0 0-3.502-8.453"/>'

function Ico({ n, size = 22, color }: { n: string; size?: number; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: PATHS[n] || '' }} />
}
function WaIco({ size = 22 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" dangerouslySetInnerHTML={{ __html: WA_PATH }} />
}

// ── Data ──────────────────────────────────────────────────────────────────────
const NEXT_STEPS = [
  { n: '1', icon: 'send', title: 'Send your message', desc: 'Share your dates, group, and what you have in mind. Takes two minutes.' },
  { n: '2', icon: 'call', title: 'We reply and plan together', desc: 'A real person gets back within 24 hours, then we fine-tune it on a quick call.' },
  { n: '3', icon: 'secure', title: 'Secure your spot', desc: "Happy with the plan? Confirm and pay later through a secure link." },
]
const FAQS = [
  'How do I book a trip?',
  'Do you offer custom trips?',
  'What areas of Georgia do you cover?',
  'When and how do I pay?',
]

// ── Form state ────────────────────────────────────────────────────────────────
type FormState = {
  name: string; email: string; phone: string; message: string
  country: string; interest: string; dates: string; heard: string
  flexible: boolean; travelers: number
  errors: Record<string, string>; touched: Record<string, boolean>
  submitted: boolean
}
type Action =
  | { type: 'set'; field: string; value: string }
  | { type: 'blur'; field: string }
  | { type: 'flexible'; value: boolean }
  | { type: 'travelers'; delta: number }
  | { type: 'submit' }
  | { type: 'reset' }

function validate(form: FormState, touched: Record<string, boolean>) {
  const e: Record<string, string> = {}
  if (touched.name && !form.name.trim()) e.name = 'Please tell us your name.'
  if (touched.email) {
    if (!form.email.trim()) e.email = 'We need an email to reply.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "That email doesn't look right."
  }
  if (touched.phone && !form.phone.trim()) e.phone = 'Add a WhatsApp or phone number.'
  if (touched.dates && !form.flexible && !form.dates.trim()) e.dates = 'Add your dates, or tick “Flexible”.'
  if (touched.message && form.message.trim().length < 4) e.message = 'Tell us a little about your trip.'
  return e
}

const INIT: FormState = {
  name: '', email: '', phone: '', message: '',
  country: '', interest: '', dates: '', heard: '',
  flexible: false, travelers: 2,
  errors: {}, touched: {}, submitted: false,
}

function composeMessage(f: FormState) {
  const lines = [
    'New enquiry — Contact page',
    '',
    `Name: ${f.name.trim()}`,
    `Email: ${f.email.trim()}`,
    `Phone: ${f.phone.trim()}`,
  ]
  if (f.country.trim()) lines.push(`Country: ${f.country.trim()}`)
  if (f.interest) lines.push(`Interested in: ${f.interest}`)
  lines.push(`Dates: ${f.flexible ? 'Flexible / not sure yet' : (f.dates || 'Not specified')}`)
  lines.push(`Travelers: ${f.travelers}`)
  if (f.heard) lines.push(`Heard about us: ${f.heard}`)
  lines.push('', `Message: ${f.message.trim()}`)
  return lines.join('\n')
}

function formReducer(s: FormState, a: Action): FormState {
  switch (a.type) {
    case 'set': {
      const errors = { ...s.errors }; delete errors[a.field]
      return { ...s, [a.field]: a.value, errors }
    }
    case 'blur': {
      const touched = { ...s.touched, [a.field]: true }
      return { ...s, touched, errors: validate(s, touched) }
    }
    case 'flexible': return { ...s, flexible: a.value, dates: a.value ? '' : s.dates }
    case 'travelers': return { ...s, travelers: Math.min(20, Math.max(1, s.travelers + a.delta)) }
    case 'submit': {
      const touched = { ...s.touched, name: true, email: true, phone: true, dates: true, message: true }
      const errors = validate(s, touched)
      if (Object.keys(errors).length) return { ...s, touched, errors }
      return { ...s, submitted: true }
    }
    case 'reset': return INIT
    default: return s
  }
}

// ── Field helpers ─────────────────────────────────────────────────────────────
const fieldBase: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box', background: '#FFFFFF',
  border: '1.5px solid #E2DCCE', borderRadius: 11,
  padding: '13px 15px', fontFamily: 'inherit', fontSize: 15,
  color: '#1E1C19', outline: 'none',
}
const fieldOpt: React.CSSProperties = { ...fieldBase, background: '#FCFBF7', border: '1.5px solid #EAE4D7', padding: '12px 15px' }

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, dispatch] = useReducer(formReducer, INIT)
  const [reduced, setReduced] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const mountedAt = useRef(Date.now())
  const hpRef = useRef<HTMLInputElement>(null)
  const revRefs = {
    banner: useRef<HTMLDivElement>(null),
    body: useRef<HTMLDivElement>(null),
    next: useRef<HTMLDivElement>(null),
    faq: useRef<HTMLDivElement>(null),
  }
  const [vis, setVis] = useState<Record<string, boolean>>({})

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
    Object.entries(revRefs).forEach(([k, r]) => {
      if (r.current) { r.current.dataset.revKey = k; io.observe(r.current) }
    })
    return () => io.disconnect()
  }, [])

  function rev(key: string, delay = 0): React.CSSProperties {
    if (reduced) return {}
    return {
      opacity: vis[key] ? 1 : 0,
      transform: vis[key] ? 'none' : 'translateY(18px)',
      transition: `opacity .6s cubic-bezier(.22,.61,.36,1) ${delay}s, transform .6s cubic-bezier(.22,.61,.36,1) ${delay}s`,
    }
  }

  // input focus styles via state
  const [focused, setFocused] = useState<string | null>(null)
  function focusStyle(name: string, invalid?: boolean): React.CSSProperties {
    const base = name.startsWith('opt') ? { ...fieldOpt } : { ...fieldBase }
    if (invalid) base.borderColor = '#C0492B'
    if (focused === name) { base.borderColor = '#C75A37'; (base as Record<string, string>).boxShadow = '0 0 0 3px rgba(199,90,55,.16)' }
    return base
  }

  return (
    <>
      <style>{`
        @keyframes aegPop{0%{opacity:0;transform:scale(.82);}60%{transform:scale(1.05);}100%{opacity:1;transform:scale(1);}}
        .cx-grid{display:grid;grid-template-columns:1fr;gap:clamp(26px,3vw,46px);align-items:start;}
        @media(min-width:920px){.cx-grid{grid-template-columns:0.92fr 1.22fr;}}
        .cx-row2{display:grid;grid-template-columns:1fr;gap:16px;}
        @media(min-width:560px){.cx-row2{grid-template-columns:1fr 1fr;}}
        .cx-steps{display:flex;flex-direction:column;gap:16px;}
        @media(min-width:840px){.cx-steps{flex-direction:row;align-items:stretch;gap:12px;}}
        .cx-arrow{display:none;}
        @media(min-width:840px){.cx-arrow{display:flex;align-items:center;flex:none;}}
        .cx-faq{display:grid;grid-template-columns:1fr;gap:14px;}
        @media(min-width:740px){.cx-faq{grid-template-columns:1fr 1fr;}}
        .cx-btns{display:flex;flex-direction:column;gap:13px;}
        @media(min-width:480px){.cx-btns{flex-direction:row;align-items:center;}}
        .cx-wa:hover{transform:translateY(-2px);box-shadow:0 22px 46px -30px rgba(30,28,25,.5);border-color:#CDE9D6 !important;}
        .cx-contact-row:hover{background:#FAF8F3;}
        .cx-social:hover{background:#2E4034;color:#FAF8F3;border-color:#2E4034;}
        .cx-send:hover{filter:brightness(1.07);transform:translateY(-2px);}
        .cx-reset:hover{border-color:#C75A37;color:#C75A37;}
        .cx-faq-item:hover{transform:translateY(-3px);box-shadow:0 20px 40px -30px rgba(30,28,25,.5);border-color:#D8D0C0;}
        .cx-view-faq:hover{color:#C75A37;}
        .cx-dec:hover,.cx-inc:hover{background:#F1ECE1;}
      `}</style>

      <main style={{ background: '#FAF8F3' }}>

        {/* ── Hero ── */}
        <section style={{ position: 'relative', overflow: 'hidden', background: '#1E1C19', color: '#FAF8F3', fontFamily: "'Hanken Grotesk',system-ui,sans-serif", padding: 'clamp(118px,15vh,162px) clamp(20px,5vw,56px) clamp(54px,7vh,78px)' }}>
          <Image src="/images/hero.avif" alt="Georgia adventure" fill priority style={{ objectFit: 'cover', objectPosition: 'center 35%', opacity: 0.35 }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(118deg,#27362C 0%,#1E1C19 60%)' }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(135deg,rgba(250,248,243,.045) 0 2px,transparent 2px 13px)' }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(20,18,15,.30) 0%,rgba(20,18,15,.66) 100%)' }} />
          <div ref={revRefs.banner} style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', ...rev('banner') }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 12.5, letterSpacing: '.03em', color: 'rgba(250,248,243,.6)', marginBottom: 22 }}>
              <Link href="/en" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              <span style={{ opacity: .5 }}>/</span>
              <span style={{ color: '#FAF8F3' }}>Contact</span>
            </div>
            <div style={{ fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#E59A6E', fontWeight: 600, marginBottom: 16 }}>Contact</div>
            <h1 style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 'clamp(38px,6vw,62px)', lineHeight: 1.02, letterSpacing: '-.5px', margin: '0 0 18px' }}>Let&rsquo;s Plan Your Adventure</h1>
            <p style={{ maxWidth: '60ch', fontSize: 'clamp(16px,2vw,19px)', lineHeight: 1.62, color: 'rgba(250,248,243,.82)', margin: 0 }}>
              Tell us what you have in mind and we&rsquo;ll get back to you within 24 hours. No payment, no obligation — just a conversation about your trip.
            </p>
          </div>
        </section>

        {/* ── Contact Body ── */}
        <section style={{ background: '#FAF8F3', color: '#1E1C19', fontFamily: "'Hanken Grotesk',system-ui,sans-serif", padding: 'clamp(56px,8vh,92px) clamp(20px,5vw,56px)' }}>
          <div ref={revRefs.body} className="cx-grid" style={{ maxWidth: 1180, margin: '0 auto', ...rev('body') }}>

            {/* ── Left: Contact info ── */}
            <aside>
              <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C75A37', fontWeight: 600, marginBottom: 13 }}>Reach us directly</div>
              <h2 style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 'clamp(25px,3.2vw,33px)', lineHeight: 1.1, letterSpacing: '-.3px', margin: '0 0 10px' }}>Talk to a real person</h2>
              <p style={{ fontSize: 15, lineHeight: 1.62, color: '#4A463E', margin: '0 0 26px', maxWidth: '42ch' }}>Prefer to message us straight away? We&rsquo;re quickest on WhatsApp.</p>

              {/* WhatsApp card */}
              <a href="https://wa.me/995595360083" target="_blank" rel="noopener noreferrer" className="cx-wa"
                style={{ display: 'flex', alignItems: 'center', gap: 13, background: '#FFFFFF', border: '1px solid #ECE7DC', borderRadius: 16, boxShadow: '0 16px 40px -30px rgba(30,28,25,.45)', padding: '18px 22px', marginBottom: 18, textDecoration: 'none', transition: 'transform .25s ease,box-shadow .25s ease,border-color .25s ease' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 46, borderRadius: 13, background: 'rgba(37,211,102,.12)', color: '#1FAE55', flexShrink: 0 }}>
                  <WaIco size={22} />
                </span>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: '#A8A296', fontWeight: 600 }}>WhatsApp</span>
                  <span style={{ fontSize: 17, fontWeight: 600, color: '#1E1C19', letterSpacing: '-.1px' }}>+995 595 36 00 83</span>
                </span>
              </a>

              {/* Info rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#FFFFFF', border: '1px solid #ECE7DC', borderRadius: 16, overflow: 'hidden' }}>
                {[
                  { icon: 'mail', label: 'Email', value: 'info@adventure-experts-georgia.com', href: 'mailto:info@adventure-experts-georgia.com' },
                  { icon: 'phone', label: 'Phone / office', value: '+995 595 36 00 83', href: 'tel:+995595360083' },
                ].map((row, i) => (
                  <a key={row.label} href={row.href} className="cx-contact-row"
                    style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', textDecoration: 'none', color: '#1E1C19', borderBottom: '1px solid #F1ECE1', transition: 'background .2s ease' }}>
                    <span style={{ display: 'inline-flex', color: '#2E4034', flexShrink: 0 }}><Ico n={row.icon} size={21} color="#2E4034" /></span>
                    <span style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: '#A8A296', fontWeight: 600 }}>{row.label}</span>
                      <span style={{ fontSize: 15, fontWeight: 500 }}>{row.value}</span>
                    </span>
                  </a>
                ))}
                {[
                  { icon: 'pin', label: 'Based in', value: 'Tbilisi, Georgia' },
                  { icon: 'clock', label: 'Response time', value: 'We usually reply within 24 hours.' },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderBottom: '1px solid #F1ECE1' }}>
                    <span style={{ display: 'inline-flex', color: '#2E4034', flexShrink: 0 }}><Ico n={row.icon} size={21} color="#2E4034" /></span>
                    <span style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: '#A8A296', fontWeight: 600 }}>{row.label}</span>
                      <span style={{ fontSize: 15, fontWeight: 500 }}>{row.value}</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginTop: 20 }}>
                <span style={{ fontSize: 12.5, color: '#A8A296', marginRight: 3 }}>Follow along</span>
                {[{ label: 'Instagram', icon: 'instagram' }, { label: 'Facebook', icon: 'facebook' }].map(s => (
                  <a key={s.label} href="#" aria-label={s.label} className="cx-social"
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: 11, border: '1px solid #E2DCCE', color: '#2E4034', textDecoration: 'none', transition: 'all .22s ease' }}>
                    <Ico n={s.icon} size={19} />
                  </a>
                ))}
              </div>
            </aside>

            {/* ── Right: Form / Success ── */}
            <div style={{ background: '#FFFFFF', border: '1px solid #ECE7DC', borderRadius: 22, boxShadow: '0 26px 60px -36px rgba(30,28,25,.5)', padding: 'clamp(26px,3.4vw,42px)' }}>

              {!form.submitted ? (
                <form onSubmit={async e => {
                  e.preventDefault()
                  const touched = { ...form.touched, name: true, email: true, phone: true, dates: true, message: true }
                  if (Object.keys(validate(form, touched)).length > 0) { dispatch({ type: 'submit' }); return }
                  setSendError(null)
                  setSending(true)
                  const payload: EnquiryPayload = {
                    source: 'contact',
                    name: form.name.trim(),
                    email: form.email.trim() || undefined,
                    phone: form.phone.trim() || undefined,
                    dates: form.flexible ? 'Flexible / not sure yet' : (form.dates || undefined),
                    travelers: form.travelers,
                    country: form.country.trim() || undefined,
                    interest: form.interest || undefined,
                    heard: form.heard || undefined,
                    message: form.message.trim() || undefined,
                    elapsedMs: Date.now() - mountedAt.current,
                    company: hpRef.current?.checked ? 'bot' : undefined,
                  }
                  const res = await submitEnquiry(payload)
                  setSending(false)
                  if (res.ok) dispatch({ type: 'submit' })
                  else setSendError(res.error || 'Something went wrong.')
                }} noValidate>
                  <h2 style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 'clamp(24px,3vw,31px)', lineHeight: 1.1, letterSpacing: '-.3px', margin: '0 0 7px' }}>Send Us a Message</h2>
                  <p style={{ fontSize: 14.5, lineHeight: 1.6, color: '#6E685D', margin: '0 0 26px' }}>A few details is all we need to start planning. Fields marked <span style={{ color: '#C75A37' }}>*</span> are required.</p>

                  {/* Name */}
                  <div style={{ marginBottom: 18 }}>
                    <label htmlFor="cf-name" style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: '#1E1C19', marginBottom: 7 }}>Full name <span style={{ color: '#C75A37' }}>*</span></label>
                    <input id="cf-name" type="text" value={form.name} autoComplete="name" placeholder="Your name"
                      aria-invalid={!!form.errors.name}
                      onChange={e => dispatch({ type: 'set', field: 'name', value: e.target.value })}
                      onBlur={() => dispatch({ type: 'blur', field: 'name' })}
                      onFocus={() => setFocused('name')} onBlurCapture={() => setFocused(null)}
                      style={focusStyle('name', !!form.errors.name)} />
                    {form.errors.name && <span style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 7, fontSize: 12.5, color: '#C0492B' }}><Ico n="alert" size={14} color="#C0492B" />{form.errors.name}</span>}
                  </div>

                  {/* Email + Phone */}
                  <div className="cx-row2" style={{ marginBottom: 18 }}>
                    <div>
                      <label htmlFor="cf-email" style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: '#1E1C19', marginBottom: 7 }}>Email <span style={{ color: '#C75A37' }}>*</span></label>
                      <input id="cf-email" type="email" value={form.email} autoComplete="email" placeholder="you@email.com"
                        aria-invalid={!!form.errors.email}
                        onChange={e => dispatch({ type: 'set', field: 'email', value: e.target.value })}
                        onBlur={() => dispatch({ type: 'blur', field: 'email' })}
                        onFocus={() => setFocused('email')} onBlurCapture={() => setFocused(null)}
                        style={focusStyle('email', !!form.errors.email)} />
                      {form.errors.email && <span style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 7, fontSize: 12.5, color: '#C0492B' }}><Ico n="alert" size={14} color="#C0492B" />{form.errors.email}</span>}
                    </div>
                    <div>
                      <label htmlFor="cf-phone" style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: '#1E1C19', marginBottom: 7 }}>WhatsApp / phone <span style={{ color: '#C75A37' }}>*</span></label>
                      <input id="cf-phone" type="tel" value={form.phone} autoComplete="tel" placeholder="+995 ..."
                        aria-invalid={!!form.errors.phone}
                        onChange={e => dispatch({ type: 'set', field: 'phone', value: e.target.value })}
                        onBlur={() => dispatch({ type: 'blur', field: 'phone' })}
                        onFocus={() => setFocused('phone')} onBlurCapture={() => setFocused(null)}
                        style={focusStyle('phone', !!form.errors.phone)} />
                      {form.errors.phone && <span style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 7, fontSize: 12.5, color: '#C0492B' }}><Ico n="alert" size={14} color="#C0492B" />{form.errors.phone}</span>}
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: 30 }}>
                    <label htmlFor="cf-message" style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: '#1E1C19', marginBottom: 7 }}>Message <span style={{ color: '#C75A37' }}>*</span></label>
                    <textarea id="cf-message" rows={4} value={form.message}
                      placeholder="Tell us roughly what you're dreaming up — regions, activities, who's coming, anything."
                      aria-invalid={!!form.errors.message}
                      onChange={e => dispatch({ type: 'set', field: 'message', value: e.target.value })}
                      onBlur={() => dispatch({ type: 'blur', field: 'message' })}
                      onFocus={() => setFocused('message')} onBlurCapture={() => setFocused(null)}
                      style={{ ...focusStyle('message', !!form.errors.message), resize: 'vertical', lineHeight: 1.55 }} />
                    {form.errors.message && <span style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 7, fontSize: 12.5, color: '#C0492B' }}><Ico n="alert" size={14} color="#C0492B" />{form.errors.message}</span>}
                  </div>

                  {/* Optional divider */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 22 }}>
                    <span style={{ fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: '#A8A296', fontWeight: 600, whiteSpace: 'nowrap' }}>Optional — helps us plan</span>
                    <span style={{ flex: 1, height: 1, background: '#ECE7DC' }} />
                  </div>

                  {/* Country + Interest */}
                  <div className="cx-row2" style={{ marginBottom: 18 }}>
                    <div>
                      <label htmlFor="cf-country" style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#6E685D', marginBottom: 7 }}>Country</label>
                      <input id="cf-country" type="text" value={form.country} autoComplete="country-name" placeholder="Where you're travelling from"
                        onChange={e => dispatch({ type: 'set', field: 'country', value: e.target.value })}
                        onFocus={() => setFocused('opt-country')} onBlur={() => setFocused(null)}
                        style={focusStyle('opt-country')} />
                    </div>
                    <div>
                      <label htmlFor="cf-interest" style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#6E685D', marginBottom: 7 }}>What are you interested in?</label>
                      <select id="cf-interest" value={form.interest}
                        onChange={e => dispatch({ type: 'set', field: 'interest', value: e.target.value })}
                        onFocus={() => setFocused('opt-interest')} onBlur={() => setFocused(null)}
                        style={{ ...focusStyle('opt-interest'), appearance: 'none', backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23A8A296' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: 38, cursor: 'pointer' }}>
                        <option value="">Select one…</option>
                        <option>A specific tour</option>
                        <option>Custom trip</option>
                        <option>Day tour</option>
                        <option>Transfers &amp; logistics</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Dates + Travelers */}
                  <div className="cx-row2" style={{ marginBottom: 18 }}>
                    <div>
                      <label htmlFor="cf-dates" style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#6E685D', marginBottom: 7 }}>Preferred travel dates<span style={{ color: '#C75A37' }}> *</span></label>
                      <input id="cf-dates" type="text" value={form.dates} disabled={form.flexible} placeholder="e.g. Mid-July 2026"
                        onChange={e => dispatch({ type: 'set', field: 'dates', value: e.target.value })}
                        onFocus={() => setFocused('opt-dates')} onBlur={() => { setFocused(null); dispatch({ type: 'blur', field: 'dates' }) }}
                        aria-invalid={!!form.errors.dates}
                        style={{ ...focusStyle('opt-dates', !!form.errors.dates), background: form.flexible ? '#F1ECE1' : '#FCFBF7' }} />
                      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 9, fontSize: 13, color: '#6E685D', cursor: 'pointer' }}>
                        <input type="checkbox" checked={form.flexible} onChange={e => dispatch({ type: 'flexible', value: e.target.checked })} style={{ width: 16, height: 16, accentColor: '#C75A37', cursor: 'pointer' }} />
                        Flexible / not sure
                      </label>
                      {form.errors.dates && <span style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 7, fontSize: 12.5, color: '#C0492B' }}><Ico n="alert" size={14} color="#C0492B" />{form.errors.dates}</span>}
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#6E685D', marginBottom: 7 }}>Number of travelers</label>
                      <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid #EAE4D7', borderRadius: 11, overflow: 'hidden', background: '#FCFBF7' }}>
                        <button type="button" className="cx-dec" aria-label="Fewer travelers" onClick={() => dispatch({ type: 'travelers', delta: -1 })}
                          style={{ width: 46, height: 48, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: '#2E4034', transition: 'background .18s' }}>
                          <Ico n="minus" size={18} color="#2E4034" />
                        </button>
                        <span aria-live="polite" style={{ minWidth: 54, textAlign: 'center', fontSize: 16, fontWeight: 600, color: '#1E1C19' }}>{form.travelers}</span>
                        <button type="button" className="cx-inc" aria-label="More travelers" onClick={() => dispatch({ type: 'travelers', delta: 1 })}
                          style={{ width: 46, height: 48, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: '#2E4034', transition: 'background .18s' }}>
                          <Ico n="plus" size={18} color="#2E4034" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Honeypot — hidden CHECKBOX (never autofilled). Bots ticking
                      everything get silently dropped server-side. */}
                  <input ref={hpRef} type="checkbox" name="confirm" tabIndex={-1} aria-hidden="true"
                    autoComplete="off" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />

                  {/* How did you hear */}
                  <div style={{ marginBottom: 28 }}>
                    <label htmlFor="cf-heard" style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#6E685D', marginBottom: 7 }}>How did you hear about us?</label>
                    <input id="cf-heard" type="text" value={form.heard} placeholder="Instagram, a friend, search…"
                      onChange={e => dispatch({ type: 'set', field: 'heard', value: e.target.value })}
                      onFocus={() => setFocused('opt-heard')} onBlur={() => setFocused(null)}
                      style={focusStyle('opt-heard')} />
                  </div>

                  {sendError && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: '#FDF0ED', border: '1px solid #F0BDB0', borderRadius: 11, padding: '11px 14px', margin: '0 0 14px', fontSize: 13.5, color: '#8A2A15', lineHeight: 1.5 }}>
                      <Ico n="alert" size={16} color="#8A2A15" />
                      <span>{sendError} You can still reach us on WhatsApp, or <a href={mailtoLink('Enquiry — Adventure Experts Georgia', composeMessage(form))} style={{ color: '#8A2A15', fontWeight: 700 }}>by email</a>.</span>
                    </div>
                  )}

                  {/* Submit */}
                  <div className="cx-btns">
                    <button type="submit" className="cx-send" disabled={sending} aria-busy={sending}
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, background: '#C75A37', color: '#FFFFFF', border: 'none', cursor: sending ? 'wait' : 'pointer', opacity: sending ? 0.75 : 1, fontFamily: 'inherit', fontWeight: 600, fontSize: 15.5, padding: '15px 28px', borderRadius: 12, transition: 'transform .25s ease,filter .25s ease', flexShrink: 0 }}>
                      {sending ? 'Sending…' : <>Send Message <Ico n="send" size={17} color="#fff" /></>}
                    </button>
                  </div>

                  {/* Reassurance */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px 18px', marginTop: 20 }}>
                    {['We reply within 24 hours', 'No payment now', "We'll only use your details to plan your trip"].map(t => (
                      <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#6E685D' }}>
                        <Ico n="check" size={15} color="#2E4034" /> {t}
                      </span>
                    ))}
                  </div>
                </form>
              ) : (
                /* Success state */
                <div style={{ textAlign: 'center', padding: 'clamp(14px,3vw,34px) 6px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 78, height: 78, borderRadius: '50%', background: 'rgba(46,64,52,.10)', color: '#2E4034', margin: '0 auto 22px', animation: 'aegPop .55s cubic-bezier(.22,.61,.36,1) both' }}>
                    <Ico n="check" size={36} color="#2E4034" />
                  </span>
                  <h2 style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 'clamp(26px,3.4vw,36px)', lineHeight: 1.08, letterSpacing: '-.3px', margin: '0 0 14px' }}>One tap to go!</h2>
                  <p style={{ fontSize: 16, lineHeight: 1.62, color: '#4A463E', margin: '0 auto 14px', maxWidth: '46ch' }}>
                    WhatsApp should have opened with your message ready — just press <strong>Send</strong> there and we&rsquo;ll be in touch within 24 hours.
                  </p>
                  <p style={{ fontSize: 13.5, lineHeight: 1.55, color: '#8C8576', margin: '0 auto 28px', maxWidth: '46ch' }}>
                    Didn&rsquo;t open?{' '}
                    <a href={waLink(composeMessage(form))} target="_blank" rel="noopener noreferrer" style={{ color: '#C75A37', fontWeight: 600, textDecoration: 'none' }}>Tap here to send it</a>
                    {' '}or{' '}
                    <a href={mailtoLink('Enquiry — Adventure Experts Georgia', composeMessage(form))} style={{ color: '#C75A37', fontWeight: 600, textDecoration: 'none' }}>email us instead</a>.
                  </p>
                  <button type="button" className="cx-reset" onClick={() => dispatch({ type: 'reset' })}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', border: '1.5px solid #E2DCCE', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: 15, color: '#1E1C19', padding: '14px 22px', borderRadius: 12, transition: 'all .22s ease' }}>
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── What Happens Next ── */}
        <section style={{ background: '#2E4034', color: '#FAF8F3', fontFamily: "'Hanken Grotesk',system-ui,sans-serif", padding: 'clamp(54px,8vh,88px) clamp(20px,5vw,56px)' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div ref={revRefs.next} style={{ textAlign: 'center', marginBottom: 'clamp(34px,5vw,48px)', ...rev('next') }}>
              <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#E59A6E', fontWeight: 600, marginBottom: 13 }}>What happens next</div>
              <h2 style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 'clamp(26px,3.6vw,40px)', lineHeight: 1.06, letterSpacing: '-.4px', margin: 0 }}>Three simple steps, no pressure</h2>
            </div>
            <div className="cx-steps">
              {NEXT_STEPS.map((s, i) => (
                <>
                  <div key={s.n} style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'rgba(250,248,243,.06)', border: '1px solid rgba(250,248,243,.14)', borderRadius: 16, padding: '26px 24px', ...rev('next', 0.1 + i * 0.09) }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 16 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', background: 'rgba(250,248,243,.13)', color: '#FAF8F3', fontFamily: "'Spectral',serif", fontSize: 17, fontWeight: 600, flexShrink: 0 }}>{s.n}</span>
                      <span style={{ display: 'inline-flex', color: 'rgba(250,248,243,.6)' }}><Ico n={s.icon} size={22} color="rgba(250,248,243,.6)" /></span>
                    </div>
                    <h3 style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 20, lineHeight: 1.16, letterSpacing: '-.1px', margin: '0 0 8px' }}>{s.title}</h3>
                    <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'rgba(250,248,243,.74)', margin: 0 }}>{s.desc}</p>
                  </div>
                  {i < NEXT_STEPS.length - 1 && (
                    <span key={`arrow-${i}`} className="cx-arrow" style={{ color: 'rgba(250,248,243,.4)' }}>
                      <Ico n="arrow" size={20} color="rgba(250,248,243,.4)" />
                    </span>
                  )}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ Teaser ── */}
        <section style={{ background: '#FFFFFF', color: '#1E1C19', fontFamily: "'Hanken Grotesk',system-ui,sans-serif", padding: 'clamp(56px,8vh,96px) clamp(20px,5vw,56px)', borderTop: '1px solid #F1ECE1' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div ref={revRefs.faq} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 'clamp(26px,4vw,38px)', ...rev('faq') }}>
              <div>
                <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C75A37', fontWeight: 600, marginBottom: 12 }}>Good to know</div>
                <h2 style={{ fontFamily: "'Spectral',serif", fontWeight: 500, fontSize: 'clamp(26px,3.4vw,38px)', lineHeight: 1.08, letterSpacing: '-.3px', margin: 0 }}>Questions, answered</h2>
              </div>
              <a href="#" className="cx-view-faq" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 14.5, color: '#2E4034', textDecoration: 'none', transition: 'color .2s' }}>
                View all FAQs <Ico n="arrow" size={16} color="currentColor" />
              </a>
            </div>
            <div className="cx-faq">
              {FAQS.map((q, i) => (
                <a key={q} href="#" className="cx-faq-item"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, background: '#FAF8F3', border: '1px solid #ECE7DC', borderRadius: 14, padding: '19px 20px', textDecoration: 'none', color: '#1E1C19', transition: 'transform .25s ease,box-shadow .25s ease,border-color .25s ease', ...rev('faq', 0.06 + i * 0.07) }}>
                  <span style={{ fontFamily: "'Spectral',serif", fontSize: 18, fontWeight: 500, lineHeight: 1.25, letterSpacing: '-.1px' }}>{q}</span>
                  <span style={{ display: 'inline-flex', color: '#A8A296', flexShrink: 0 }}><Ico n="chevR" size={18} color="#A8A296" /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}

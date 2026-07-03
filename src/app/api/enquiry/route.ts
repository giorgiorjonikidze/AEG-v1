import { Resend } from 'resend'
import type { EnquiryPayload } from '@/lib/enquiry'

// This route sends email — it must run on the server, never statically exported.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ── Addresses (config, not secrets) ───────────────────────────────────────────
// The API key is the ONLY value read from the environment (see below).
// Sending domain adventureexpertsgeorgia.com is verified in Resend.
const BUSINESS_INBOX = 'info@adventureexpertsgeorgia.com'           // inquiries are delivered here
const FROM_ADDRESS = 'Adventure Experts Georgia <inquiries@adventureexpertsgeorgia.com>' // Resend "from"

function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const LABELS: Record<string, string> = {
  tourType: 'Private / group',
  experience: 'Experience',
  interest: 'Interested in',
  heard: 'Heard about us',
}

function buildRows(p: EnquiryPayload): Array<[string, string]> {
  const rows: Array<[string, string]> = []
  const push = (label: string, value?: string | number) => {
    const v = value === undefined || value === null ? '' : String(value).trim()
    if (v) rows.push([label, v])
  }
  push('Name', p.name)
  push('Email', p.email)
  push('Phone / WhatsApp', p.phone)
  push('Preferred dates', p.dates)
  push('Travelers', p.travelers)
  push('Country', p.country)
  push(LABELS.interest, p.interest)
  push(LABELS.tourType, p.tourType)
  push(LABELS.experience, p.experience)
  push(LABELS.heard, p.heard)
  return rows
}

function tbilisiTimestamp(): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Tbilisi',
    }).format(new Date()) + ' (Tbilisi time)'
  } catch {
    return new Date().toISOString()
  }
}

// ── Inquiry email (to the business) ───────────────────────────────────────────
function buildInquiryHtml(p: EnquiryPayload, meta: { source: string; page: string; locale: string; when: string }): string {
  const heading = p.tourName ? `New inquiry — ${esc(p.tourName)}` : 'New website inquiry'
  const sub = p.tourMeta ? `<div style="color:#79736A;font-size:14px;margin:2px 0 20px">${esc(p.tourMeta)}</div>` : '<div style="height:12px"></div>'
  const rows = buildRows(p)
    .map(([k, v]) => `<tr><td style="padding:7px 16px 7px 0;color:#8C8576;font-size:13px;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:7px 0;color:#1E1C19;font-size:14px;font-weight:600">${esc(v)}</td></tr>`)
    .join('')
  const message = p.message?.trim()
    ? `<div style="margin-top:22px"><div style="color:#8C8576;font-size:13px;margin-bottom:6px">Message</div><div style="background:#FAF8F3;border:1px solid #ECE8DE;border-radius:10px;padding:14px 16px;color:#2a2620;font-size:14.5px;line-height:1.6;white-space:pre-wrap">${esc(p.message)}</div></div>`
    : ''
  const replyLine = p.email
    ? `<p style="margin:24px 0 0;font-size:13px;color:#79736A">Reply directly to this email to answer ${esc(p.name)} — it goes straight to their inbox.</p>`
    : ''
  const metaRows = [
    ['Came from', p.tourName ? `Tour page — ${esc(p.tourName)}` : `${esc(meta.source)} form`],
    ['Page', esc(meta.page || '—')],
    ['Language', esc(meta.locale)],
    ['Received', esc(meta.when)],
  ].map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#B0AA9E;font-size:12px;white-space:nowrap">${k}</td><td style="padding:4px 0;color:#8C8576;font-size:12px">${v}</td></tr>`).join('')

  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:28px 8px">
    <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C75A37;font-weight:700;margin-bottom:8px">Adventure Experts Georgia</div>
    <h1 style="font-size:22px;line-height:1.25;margin:0 0 2px;color:#1E1C19">${heading}</h1>
    ${sub}
    <table style="border-collapse:collapse;width:100%">${rows}</table>
    ${message}
    ${replyLine}
    <div style="margin-top:26px;padding-top:16px;border-top:1px solid #ECE8DE">
      <table style="border-collapse:collapse;width:100%">${metaRows}</table>
    </div>
  </div>`
}

function buildInquiryText(p: EnquiryPayload, meta: { source: string; page: string; locale: string; when: string }): string {
  const lines = [p.tourName ? `New inquiry — ${p.tourName}` : 'New website inquiry']
  if (p.tourMeta) lines.push(`(${p.tourMeta})`)
  lines.push('')
  for (const [k, v] of buildRows(p)) lines.push(`${k}: ${v}`)
  if (p.message?.trim()) lines.push('', `Message: ${p.message.trim()}`)
  lines.push('', '---',
    `Came from: ${p.tourName ? `Tour page — ${p.tourName}` : `${meta.source} form`}`,
    `Page: ${meta.page || '—'}`,
    `Language: ${meta.locale}`,
    `Received: ${meta.when}`)
  return lines.join('\n')
}

// ── Auto-reply (to the customer) ──────────────────────────────────────────────
function buildAutoReplyHtml(p: EnquiryPayload): string {
  const about = p.tourName ? esc(p.tourName) : 'your Georgian adventure'
  // NOTE: placeholder copy — swap for the final wording when provided.
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:540px;margin:0 auto;padding:32px 8px;color:#1E1C19">
    <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C75A37;font-weight:700;margin-bottom:14px">Adventure Experts Georgia</div>
    <h1 style="font-size:23px;line-height:1.3;margin:0 0 16px">Thanks for reaching out, ${esc(p.name.split(' ')[0] || p.name)}!</h1>
    <p style="font-size:15.5px;line-height:1.65;color:#3f3b34;margin:0 0 16px">
      We've received your inquiry about <strong>${about}</strong> and we'll get back to you within 24 hours.
    </p>
    <p style="font-size:15.5px;line-height:1.65;color:#3f3b34;margin:0 0 16px">
      In the meantime, if anything's urgent you can reach us any time on WhatsApp at
      <a href="https://wa.me/995595360083" style="color:#C75A37;font-weight:600;text-decoration:none">+995 595 36 00 83</a>.
    </p>
    <p style="font-size:15.5px;line-height:1.65;color:#3f3b34;margin:0 0 24px">
      Talk soon,<br/>The Adventure Experts Georgia team
    </p>
    <div style="padding-top:16px;border-top:1px solid #ECE8DE;font-size:12px;color:#A8A296;line-height:1.6">
      Adventure Experts Georgia · Tbilisi, Georgia<br/>
      <a href="mailto:info@adventureexpertsgeorgia.com" style="color:#A8A296">info@adventureexpertsgeorgia.com</a>
    </div>
  </div>`
}

function buildAutoReplyText(p: EnquiryPayload): string {
  const about = p.tourName || 'your Georgian adventure'
  const first = p.name.split(' ')[0] || p.name
  return [
    `Thanks for reaching out, ${first}!`,
    '',
    `We've received your inquiry about ${about} and we'll get back to you within 24 hours.`,
    '',
    'If anything is urgent, reach us any time on WhatsApp at +995 595 36 00 83.',
    '',
    'Talk soon,',
    'The Adventure Experts Georgia team',
    '',
    'Adventure Experts Georgia · Tbilisi, Georgia · info@adventureexpertsgeorgia.com',
  ].join('\n')
}

export async function POST(req: Request) {
  let body: EnquiryPayload
  try {
    body = (await req.json()) as EnquiryPayload
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // ── Spam checks — silently "succeed" (so bots move on) without sending. ──
  // 1. Honeypot field present (bots POSTing the API directly). No form input
  //    maps to this — a hidden input was being browser-autofilled and dropped
  //    real submissions, so do NOT reintroduce a hidden input.
  if (body.company && body.company.trim()) {
    console.log('[enquiry] dropped: honeypot field present | source:', body.source)
    return Response.json({ ok: true }, { status: 200 })
  }
  // 2. Humans need seconds to fill the form; bots submit instantly.
  if (typeof body.elapsedMs === 'number' && body.elapsedMs >= 0 && body.elapsedMs < 2000) {
    console.log('[enquiry] dropped: submitted in', body.elapsedMs, 'ms | source:', body.source)
    return Response.json({ ok: true }, { status: 200 })
  }

  // ── Server-side validation (never trust the client). ──
  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  const phone = (body.phone || '').trim()
  if (!name) return Response.json({ error: 'Please provide your name.' }, { status: 400 })
  if (!email && !phone) return Response.json({ error: 'Please provide an email or WhatsApp/phone number.' }, { status: 400 })
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ error: "That email address doesn't look right." }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[enquiry] RESEND_API_KEY is not set — cannot send email.')
    return Response.json({ error: 'Email is not configured yet. Please use WhatsApp or email us directly.' }, { status: 503 })
  }

  const meta = {
    source: body.source || 'website',
    page: body.pagePath || '',
    locale: body.locale || 'en',
    when: tbilisiTimestamp(),
  }
  const subject = `New inquiry: ${body.tourName || 'General'} — ${name}`

  const resend = new Resend(apiKey)

  // 1) Inquiry email to the business — this one MUST succeed.
  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: BUSINESS_INBOX,
      subject,
      html: buildInquiryHtml(body, meta),
      text: buildInquiryText(body, meta),
      ...(email ? { replyTo: email } : {}),
    })
    if (error) {
      console.error('[enquiry] Resend error (inquiry):', error)
      return Response.json({ error: 'We could not send your inquiry just now. Please try WhatsApp or email.' }, { status: 502 })
    }
  } catch (err) {
    console.error('[enquiry] Unexpected error (inquiry):', err)
    return Response.json({ error: 'Something went wrong sending your inquiry.' }, { status: 500 })
  }

  // 2) Auto-reply to the customer — best-effort; never fail the request over it.
  if (email) {
    try {
      const { error } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: email,
        replyTo: BUSINESS_INBOX,
        subject: "We've received your inquiry — Adventure Experts Georgia",
        html: buildAutoReplyHtml(body),
        text: buildAutoReplyText(body),
      })
      if (error) console.error('[enquiry] auto-reply failed (non-fatal):', error)
    } catch (err) {
      console.error('[enquiry] auto-reply threw (non-fatal):', err)
    }
  }

  return Response.json({ ok: true })
}

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
const WA_URL = 'https://wa.me/995511502289'
const WA_LABEL = '+995 511 50 22 89'

function firstNameOf(name: string): string {
  return (name.trim().split(/\s+/)[0] || name).trim()
}

function autoReplySubject(p: EnquiryPayload): string {
  return p.tourName
    ? `We've received your inquiry — ${p.tourName}`
    : `We've received your inquiry, ${firstNameOf(p.name)}!`
}

// Table-based, web-safe-font, cream/terracotta layout — renders reliably in
// Gmail / Outlook / Apple Mail. Keep it simple; no flexbox/grid/web fonts.
function buildAutoReplyHtml(p: EnquiryPayload): string {
  const first = esc(firstNameOf(p.name))
  const line2 = p.tourName
    ? `Thank you for reaching out to Adventure Experts Georgia! We've received your inquiry about <strong>${esc(p.tourName)}</strong> and we're excited to help you plan it.`
    : `Thank you for reaching out to Adventure Experts Georgia! We've received your message and we're excited to help you plan your adventure.`
  const p_ = 'margin:0 0 16px;font-size:16px;line-height:1.65;color:#3f3b34;font-family:Arial,Helvetica,sans-serif'
  const steps = [
    'Our team is reviewing your details right now.',
    "We'll get back to you within 3 hours to answer your questions and, if you're ready, set up a quick call to plan the details together.",
    "Once everything's confirmed, we'll send you a secure payment link to lock in your spot.",
  ].map((s, i) => `<tr>
      <td valign="top" style="padding:0 12px 12px 0;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;color:#C75A37;line-height:1.5">${i + 1}.</td>
      <td valign="top" style="padding:0 0 12px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#3f3b34">${s}</td>
    </tr>`).join('')

  return `<!--[if mso]><style>body,table,td{font-family:Arial,Helvetica,sans-serif !important}</style><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3EEE4;margin:0;padding:0">
  <tr><td align="center" style="padding:28px 14px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FAF8F3;border:1px solid #ECE8DE;border-radius:14px">
      <tr><td style="padding:34px 34px 30px">
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C75A37;font-weight:700;margin-bottom:18px">Adventure Experts Georgia</div>
        <p style="${p_}">Hi ${first},</p>
        <p style="${p_}">${line2}</p>
        <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#1E1C19;font-family:Arial,Helvetica,sans-serif">Here's what happens next:</p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 18px">${steps}</table>
        <p style="${p_}">No payment is needed now — this is just the start of the conversation.</p>
        <p style="${p_}">In the meantime, if you'd like to chat sooner, message us directly on WhatsApp: <a href="${WA_URL}" style="color:#C75A37;font-weight:700;text-decoration:none">${WA_LABEL}</a></p>
        <p style="${p_}">We can't wait to help you explore Georgia.</p>
        <p style="margin:22px 0 0;font-size:16px;line-height:1.6;color:#1E1C19;font-family:Arial,Helvetica,sans-serif">
          Warmly,<br/>The Adventure Experts Georgia Team<br/>
          <a href="https://adventureexpertsgeorgia.com" style="color:#C75A37;text-decoration:none">adventureexpertsgeorgia.com</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>`
}

function buildAutoReplyText(p: EnquiryPayload): string {
  const first = firstNameOf(p.name)
  const line2 = p.tourName
    ? `Thank you for reaching out to Adventure Experts Georgia! We've received your inquiry about ${p.tourName} and we're excited to help you plan it.`
    : `Thank you for reaching out to Adventure Experts Georgia! We've received your message and we're excited to help you plan your adventure.`
  return [
    `Hi ${first},`,
    '',
    line2,
    '',
    "Here's what happens next:",
    '1. Our team is reviewing your details right now.',
    "2. We'll get back to you within 3 hours to answer your questions and, if you're ready, set up a quick call to plan the details together.",
    "3. Once everything's confirmed, we'll send you a secure payment link to lock in your spot.",
    '',
    'No payment is needed now — this is just the start of the conversation.',
    '',
    `In the meantime, if you'd like to chat sooner, message us directly on WhatsApp: ${WA_LABEL} (${WA_URL})`,
    '',
    "We can't wait to help you explore Georgia.",
    '',
    'Warmly,',
    'The Adventure Experts Georgia Team',
    'adventureexpertsgeorgia.com',
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
  const dates = (body.dates || '').trim()
  if (!name) return Response.json({ error: 'Please provide your name.' }, { status: 400 })
  if (!email && !phone) return Response.json({ error: 'Please provide an email or WhatsApp/phone number.' }, { status: 400 })
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ error: "That email address doesn't look right." }, { status: 400 })
  }
  if (!dates) return Response.json({ error: 'Please tell us your preferred dates, or choose “Flexible”.' }, { status: 400 })
  if (typeof body.travelers !== 'number' || body.travelers < 1) {
    return Response.json({ error: 'Please tell us how many travelers.' }, { status: 400 })
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
        subject: autoReplySubject(body),
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

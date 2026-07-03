import { Resend } from 'resend'
import type { EnquiryPayload } from '@/lib/enquiry'

// This route sends email — it must run on the server, never statically exported.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const TO_EMAIL = process.env.ENQUIRY_TO_EMAIL || 'gioorjo123@gmail.com'
// In Resend test mode (no verified domain) the "from" MUST be onboarding@resend.dev,
// and email can only be delivered to the address that owns the Resend account.
const FROM_EMAIL = process.env.ENQUIRY_FROM_EMAIL || 'Adventure Experts Georgia <onboarding@resend.dev>'

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

function buildHtml(p: EnquiryPayload): string {
  const heading = p.tourName ? `New enquiry — ${esc(p.tourName)}` : 'New website enquiry'
  const sub = p.tourMeta ? `<div style="color:#79736A;font-size:14px;margin:2px 0 20px">${esc(p.tourMeta)}</div>` : '<div style="height:12px"></div>'
  const rows = buildRows(p)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:7px 16px 7px 0;color:#8C8576;font-size:13px;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:7px 0;color:#1E1C19;font-size:14px;font-weight:600">${esc(v)}</td></tr>`
    )
    .join('')
  const message = p.message?.trim()
    ? `<div style="margin-top:22px"><div style="color:#8C8576;font-size:13px;margin-bottom:6px">Message</div><div style="background:#FAF8F3;border:1px solid #ECE8DE;border-radius:10px;padding:14px 16px;color:#2a2620;font-size:14.5px;line-height:1.6;white-space:pre-wrap">${esc(p.message)}</div></div>`
    : ''
  const replyLine = p.email
    ? `<p style="margin:26px 0 0;font-size:13px;color:#79736A">Reply directly to this email to answer ${esc(p.name)} — it goes straight to their inbox.</p>`
    : ''
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:28px 8px">
    <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C75A37;font-weight:700;margin-bottom:8px">Adventure Experts Georgia</div>
    <h1 style="font-size:22px;line-height:1.25;margin:0 0 2px;color:#1E1C19">${heading}</h1>
    ${sub}
    <table style="border-collapse:collapse;width:100%">${rows}</table>
    ${message}
    ${replyLine}
    <p style="margin:24px 0 0;font-size:11.5px;color:#B7B1A6">Sent from the ${esc(p.source)} enquiry form on your website.</p>
  </div>`
}

function buildText(p: EnquiryPayload): string {
  const lines = [p.tourName ? `New enquiry — ${p.tourName}` : 'New website enquiry']
  if (p.tourMeta) lines.push(`(${p.tourMeta})`)
  lines.push('')
  for (const [k, v] of buildRows(p)) lines.push(`${k}: ${v}`)
  if (p.message?.trim()) lines.push('', `Message: ${p.message.trim()}`)
  return lines.join('\n')
}

export async function POST(req: Request) {
  let body: EnquiryPayload
  try {
    body = (await req.json()) as EnquiryPayload
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: silently accept (so bots think they succeeded) without sending.
  if (body.company && body.company.trim()) {
    return Response.json({ ok: true }, { status: 200 })
  }

  // Server-side validation (never trust the client).
  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  const phone = (body.phone || '').trim()
  if (!name) return Response.json({ error: 'Please provide your name.' }, { status: 400 })
  if (!email && !phone) return Response.json({ error: 'Please provide an email or phone number.' }, { status: 400 })
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ error: "That email address doesn't look right." }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[enquiry] RESEND_API_KEY is not set — cannot send email.')
    return Response.json({ error: 'Email is not configured yet. Please use WhatsApp or email us directly.' }, { status: 503 })
  }

  const subject = body.tourName
    ? `Enquiry: ${body.tourName} — ${name}`
    : `Website enquiry — ${name}`

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject,
      html: buildHtml(body),
      text: buildText(body),
      ...(email ? { replyTo: email } : {}),
    })
    if (error) {
      console.error('[enquiry] Resend error:', error)
      return Response.json({ error: 'We could not send your enquiry just now. Please try WhatsApp or email.' }, { status: 502 })
    }
    return Response.json({ ok: true })
  } catch (err) {
    console.error('[enquiry] Unexpected error:', err)
    return Response.json({ error: 'Something went wrong sending your enquiry.' }, { status: 500 })
  }
}

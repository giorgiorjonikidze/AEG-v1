import { Resend } from 'resend'

// Sends email / calls the Resend API — must run server-side, never static.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const FROM_ADDRESS = 'Adventure Experts Georgia <inquiries@adventureexpertsgeorgia.com>'

type SubscribeBody = { email?: string; company?: string; elapsedMs?: number }

function welcomeHtml(): string {
  const p = 'margin:0 0 16px;font-size:16px;line-height:1.65;color:#3f3b34;font-family:Arial,Helvetica,sans-serif'
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3EEE4;margin:0;padding:0">
    <tr><td align="center" style="padding:28px 14px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FAF8F3;border:1px solid #ECE8DE;border-radius:14px">
        <tr><td style="padding:34px 34px 30px">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C75A37;font-weight:700;margin-bottom:18px">Adventure Experts Georgia</div>
          <p style="${p}">You're in! 🏔️</p>
          <p style="${p}">Thanks for subscribing. From time to time we'll send you adventure inspiration, new tours, and honest tips for exploring Georgia — never spam.</p>
          <p style="${p}">If you're already dreaming of a trip, just reply to this email or message us on WhatsApp at <a href="https://wa.me/995595360083" style="color:#C75A37;font-weight:700;text-decoration:none">+995 595 36 00 83</a>.</p>
          <p style="margin:22px 0 0;font-size:16px;line-height:1.6;color:#1E1C19;font-family:Arial,Helvetica,sans-serif">Warmly,<br/>The Adventure Experts Georgia Team</p>
          <p style="margin:20px 0 0;font-size:12px;color:#A8A296;font-family:Arial,Helvetica,sans-serif">You received this because you subscribed at adventureexpertsgeorgia.com. You can unsubscribe from any newsletter we send.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>`
}

export async function POST(req: Request) {
  let body: SubscribeBody
  try {
    body = (await req.json()) as SubscribeBody
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Spam: silently "succeed" so bots move on.
  if (body.company && body.company.trim()) return Response.json({ ok: true }, { status: 200 })
  if (typeof body.elapsedMs === 'number' && body.elapsedMs >= 0 && body.elapsedMs < 1500) {
    return Response.json({ ok: true }, { status: 200 })
  }

  const email = (body.email || '').trim().toLowerCase()
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!apiKey || !audienceId) {
    console.error('[subscribe] Missing RESEND_API_KEY or RESEND_AUDIENCE_ID.')
    return Response.json({ error: 'Newsletter is not configured yet.' }, { status: 503 })
  }

  const resend = new Resend(apiKey)

  // Add to the audience. Re-subscribing the same email is treated as success.
  try {
    const { error } = await resend.contacts.create({ audienceId, email, unsubscribed: false })
    if (error) {
      // Duplicate contact isn't a real failure — welcome them anyway.
      const msg = String((error as { message?: string }).message || '')
      if (!/already exists|duplicate/i.test(msg)) {
        console.error('[subscribe] Resend contacts error:', error)
        return Response.json({ error: 'Could not subscribe just now. Please try again.' }, { status: 502 })
      }
    }
  } catch (err) {
    console.error('[subscribe] Unexpected error:', err)
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }

  // Welcome email — best-effort, never fails the request.
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: "You're subscribed — Adventure Experts Georgia",
      html: welcomeHtml(),
      text: "You're in! Thanks for subscribing to Adventure Experts Georgia. We'll send occasional adventure inspiration and tips for exploring Georgia — never spam. Reply any time, or message us on WhatsApp at +995 595 36 00 83.",
    })
  } catch (err) {
    console.error('[subscribe] welcome email failed (non-fatal):', err)
  }

  return Response.json({ ok: true })
}

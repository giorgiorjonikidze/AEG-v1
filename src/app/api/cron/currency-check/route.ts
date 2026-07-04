import { Resend } from 'resend'
import { CURRENCY_BASELINE, CURRENCY_ALERT_THRESHOLD_PCT, NBG_CURRENCIES_URL } from '@/data/currency'

// Runs on a schedule (Vercel Cron) — must be a dynamic server route.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ALERT_TO = 'info@adventureexpertsgeorgia.com'
const ALERT_FROM = 'Adventure Experts Georgia <inquiries@adventureexpertsgeorgia.com>'

type NbgCurrency = { code: string; quantity: number; rate: number; name: string }

async function fetchGelPerEur(): Promise<number | null> {
  try {
    const res = await fetch(NBG_CURRENCIES_URL, { cache: 'no-store' })
    if (!res.ok) return null
    const data = (await res.json()) as Array<{ currencies?: NbgCurrency[] }>
    const eur = data?.[0]?.currencies?.find(c => c.code === 'EUR')
    if (!eur || !eur.rate || !eur.quantity) return null
    return eur.rate / eur.quantity // GEL per 1 EUR
  } catch {
    return null
  }
}

function alertHtml(o: { dir: string; absPct: string; baseline: string; current: string; reviewedOn: string }): string {
  const p = 'margin:0 0 14px;font-size:15.5px;line-height:1.6;color:#3f3b34;font-family:Arial,Helvetica,sans-serif'
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3EEE4;margin:0;padding:0"><tr><td align="center" style="padding:28px 14px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FAF8F3;border:1px solid #ECE8DE;border-radius:14px"><tr><td style="padding:32px 32px 28px">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C75A37;font-weight:700;margin-bottom:16px">Currency watch · Adventure Experts Georgia</div>
      <h1 style="font-size:21px;line-height:1.3;margin:0 0 14px;color:#1E1C19;font-family:Arial,Helvetica,sans-serif">The GEL/EUR rate has ${o.dir} ${o.absPct}%</h1>
      <p style="${p}">Since your last price update, the exchange rate has moved more than ${CURRENCY_ALERT_THRESHOLD_PCT}% — you may want to review your tour prices.</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 18px">
        <tr><td style="padding:5px 16px 5px 0;color:#8C8576;font-size:13px;font-family:Arial,Helvetica,sans-serif">Your baseline (${o.reviewedOn})</td><td style="padding:5px 0;color:#1E1C19;font-size:14px;font-weight:700;font-family:Arial,Helvetica,sans-serif">1 EUR = ${o.baseline} GEL</td></tr>
        <tr><td style="padding:5px 16px 5px 0;color:#8C8576;font-size:13px;font-family:Arial,Helvetica,sans-serif">Current NBG rate</td><td style="padding:5px 0;color:#1E1C19;font-size:14px;font-weight:700;font-family:Arial,Helvetica,sans-serif">1 EUR = ${o.current} GEL</td></tr>
      </table>
      <p style="${p}"><strong>No prices have been changed automatically.</strong> When you're done reviewing, update <code style="background:#F1ECE1;padding:1px 5px;border-radius:4px">gelPerEurAtLastUpdate</code> in <code style="background:#F1ECE1;padding:1px 5px;border-radius:4px">src/data/currency.ts</code> to ${o.current} to reset this alert.</p>
    </td></tr></table>
  </td></tr></table>`
}

export async function GET(req: Request) {
  // Only Vercel Cron (or someone with the secret) may trigger this.
  // Vercel automatically sends `Authorization: Bearer <CRON_SECRET>` when the
  // CRON_SECRET env var is set. Locally (no secret) it's open for testing.
  const secret = process.env.CRON_SECRET
  if (secret && req.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const current = await fetchGelPerEur()
  if (current == null) {
    console.error('[currency-check] could not fetch NBG rate')
    return Response.json({ ok: false, error: 'Could not fetch NBG rate.' }, { status: 502 })
  }

  const baseline = CURRENCY_BASELINE.gelPerEurAtLastUpdate
  const pct = ((current - baseline) / baseline) * 100
  const absPct = Math.abs(pct)
  const alerted = absPct > CURRENCY_ALERT_THRESHOLD_PCT

  if (alerted) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('[currency-check] threshold crossed but RESEND_API_KEY not set — no email sent')
    } else {
      const dir = pct > 0 ? 'risen' : 'fallen'
      try {
        const resend = new Resend(apiKey)
        await resend.emails.send({
          from: ALERT_FROM,
          to: ALERT_TO,
          subject: `GEL/EUR ${dir} ${absPct.toFixed(1)}% — review tour prices?`,
          text:
            `The GEL/EUR exchange rate has ${dir} ${absPct.toFixed(1)}% since your last price update — ` +
            `you may want to review your tour prices.\n\n` +
            `Baseline (set ${CURRENCY_BASELINE.lastPriceReview}): 1 EUR = ${baseline.toFixed(4)} GEL\n` +
            `Current NBG rate:                    1 EUR = ${current.toFixed(4)} GEL\n\n` +
            `No prices have been changed automatically. After reviewing, set ` +
            `gelPerEurAtLastUpdate in src/data/currency.ts to ${current.toFixed(4)} to reset this alert.`,
          html: alertHtml({
            dir,
            absPct: absPct.toFixed(1),
            baseline: baseline.toFixed(4),
            current: current.toFixed(4),
            reviewedOn: CURRENCY_BASELINE.lastPriceReview,
          }),
        })
        console.log(`[currency-check] alert sent: ${dir} ${absPct.toFixed(1)}%`)
      } catch (err) {
        console.error('[currency-check] alert email failed:', err)
      }
    }
  }

  return Response.json({
    ok: true,
    baselineGelPerEur: baseline,
    currentGelPerEur: Number(current.toFixed(4)),
    changePct: Number(pct.toFixed(2)),
    thresholdPct: CURRENCY_ALERT_THRESHOLD_PCT,
    alerted,
  })
}

// Shared enquiry payload + client submit helper.
// The API route (src/app/api/enquiry/route.ts) imports only the type;
// submitEnquiry() runs in the browser and POSTs to that route.

import { trackInquirySubmitted } from '@/lib/gtag'

export interface EnquiryPayload {
  source: 'tour' | 'contact'
  tourName?: string
  tourMeta?: string
  name: string
  email?: string
  phone?: string
  dates?: string
  travelers?: number
  country?: string
  tourType?: string
  experience?: string
  interest?: string
  heard?: string
  message?: string
  /** Honeypot — must stay empty. Bots that fill it are silently dropped.
      NOTE: no visible or hidden input maps to this — browser autofill was
      filling a hidden input and dropping real submissions. It only catches
      bots that POST the API directly with a generic "company" field. */
  company?: string
  /** Milliseconds between form mount and submit. Instant submits are bots. */
  elapsedMs?: number
  /** Auto-filled by submitEnquiry() — UI language, e.g. "en". */
  locale?: string
  /** Auto-filled by submitEnquiry() — the page the form was on. */
  pagePath?: string
}

export type EnquiryResult = { ok: boolean; error?: string }

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  try {
    // Enrich with locale + page path from the browser (all forms get this for free).
    const enriched: EnquiryPayload = { ...payload }
    if (typeof window !== 'undefined') {
      const seg = window.location.pathname.split('/').filter(Boolean)[0]
      enriched.locale = payload.locale || (seg && seg.length === 2 ? seg : 'en')
      enriched.pagePath = payload.pagePath || window.location.pathname
    }
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enriched),
    })
    const data = (await res.json().catch(() => ({}))) as { error?: string }
    if (!res.ok) return { ok: false, error: data.error || 'Something went wrong sending your enquiry.' }
    // Fire the GA4 conversion (no-op unless analytics consent loaded gtag).
    trackInquirySubmitted({ tour_name: enriched.tourName, locale: enriched.locale })
    return { ok: true }
  } catch {
    return { ok: false, error: 'Could not reach the server. Please check your connection.' }
  }
}

// Shared enquiry payload + client submit helper.
// The API route (src/app/api/enquiry/route.ts) imports only the type;
// submitEnquiry() runs in the browser and POSTs to that route.

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
}

export type EnquiryResult = { ok: boolean; error?: string }

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  try {
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = (await res.json().catch(() => ({}))) as { error?: string }
    if (!res.ok) return { ok: false, error: data.error || 'Something went wrong sending your enquiry.' }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Could not reach the server. Please check your connection.' }
  }
}

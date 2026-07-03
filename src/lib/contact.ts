// ── Central contact details ──────────────────────────────────────────────────
// Change the number/email HERE and it updates everywhere on the site.

export const WHATSAPP_NUMBER = '995595360083' // digits only, for wa.me links
export const PHONE_DISPLAY = '+995 595 36 00 83'
export const PHONE_TEL = 'tel:+995595360083'
export const CONTACT_EMAIL = 'info@adventure-experts-georgia.com'

/** wa.me link, optionally with a prefilled message */
export function waLink(text?: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}

/** mailto: link with optional subject/body */
export function mailtoLink(subject?: string, body?: string): string {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const q = params.toString().replace(/\+/g, '%20')
  return `mailto:${CONTACT_EMAIL}${q ? `?${q}` : ''}`
}

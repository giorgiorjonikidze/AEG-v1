// ── Central contact details ──────────────────────────────────────────────────
// Change the number/email HERE and it updates everywhere on the site.

export const WHATSAPP_NUMBER = '995511502289' // digits only, for wa.me links
export const PHONE_DISPLAY = '+995 511 50 22 89'
export const PHONE_TEL = 'tel:+995511502289'
export const CONTACT_EMAIL = 'info@adventureexpertsgeorgia.com'

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

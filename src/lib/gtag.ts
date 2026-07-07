// Central GA4 helpers. Every call is a no-op unless GA_ID is configured AND
// gtag.js has actually been loaded (which only happens after analytics consent —
// see src/components/Analytics.tsx). Safe to import from any client module.

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID

function gtag(): ((...args: unknown[]) => void) | null {
  if (typeof window === 'undefined') return null
  return window.gtag ?? null
}

/** Send a manual GA4 page_view (config uses send_page_view:false). */
export function pageview(url: string, title?: string): void {
  const g = gtag()
  if (!GA_ID || !g) return
  g('event', 'page_view', {
    page_path: url,
    page_location: window.location.origin + url,
    page_title: title ?? document.title,
  })
}

/** Generic GA4 event. */
export function gaEvent(name: string, params: Record<string, unknown> = {}): void {
  const g = gtag()
  if (!GA_ID || !g) return
  g('event', name, params)
}

/** Conversion event fired when any inquiry form submits successfully. */
export function trackInquirySubmitted(p: { tour_name?: string; locale?: string }): void {
  gaEvent('inquiry_submitted', {
    tour_name: p.tour_name && p.tour_name.trim() ? p.tour_name : 'general',
    locale: p.locale || 'en',
  })
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

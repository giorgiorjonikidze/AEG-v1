'use client'

import Script from 'next/script'
import { Suspense, useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { readConsent, CONSENT_CHANGED_EVENT, type ConsentRecord } from '@/lib/consent'
import { GA_ID, pageview } from '@/lib/gtag'

/**
 * Loads Google Analytics 4 — but only after the visitor has granted analytics
 * consent (hard-block, not Consent Mode v2). The gtag.js script is never
 * injected until `analytics` is true, so no GA request fires and no GA cookies
 * are set beforehand. If a previous session already consented, `readConsent()`
 * returns analytics=true on mount and GA loads immediately without any banner
 * interaction. Reacts live to consent changes: granting loads GA; withdrawing
 * disables it and clears its cookies.
 */
export default function Analytics() {
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    setAnalytics(readConsent()?.analytics ?? false)
    const onChange = (e: Event) => {
      const granted = (e as CustomEvent<ConsentRecord>).detail?.analytics ?? false
      setAnalytics(granted)
      if (!granted) disableGa()
    }
    window.addEventListener(CONSENT_CHANGED_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange)
  }, [])

  if (!GA_ID || !analytics) return null

  return (
    <>
      <Script
        id="ga-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          window['ga-disable-${GA_ID}'] = false;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true, send_page_view: false });
        `}
      </Script>
      {/* Manual page_view on every route change (SPA nav doesn't auto-fire it).
          useSearchParams requires a Suspense boundary. */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  )
}

/** Fires a GA4 page_view for the initial load and every client-side navigation,
 *  so /en/* (and future locale) URLs are each recorded with their real path. */
function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    if (!pathname) return
    const qs = searchParams?.toString()
    pageview(qs ? `${pathname}?${qs}` : pathname)
  }, [pathname, searchParams])
  return null
}

/** Turn GA off in-page and remove its first-party cookies without a reload. */
function disableGa() {
  if (!GA_ID || typeof window === 'undefined') return
  ;(window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { analytics_storage: 'denied' })
  }
  const host = location.hostname
  document.cookie.split('; ').forEach(row => {
    const name = row.split('=')[0]
    if (/^_ga/.test(name) || name === '_gid' || name === '_gat') {
      for (const domain of ['', `; Domain=${host}`, `; Domain=.${host}`]) {
        document.cookie = `${name}=; Max-Age=0; Path=/${domain}`
      }
    }
  })
}

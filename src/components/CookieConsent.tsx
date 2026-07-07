'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  readConsent,
  writeConsent,
  OPEN_PREFERENCES_EVENT,
} from '@/lib/consent'

type Mode = 'closed' | 'initial' | 'settings'

export default function CookieConsent() {
  const [mode, setMode] = useState<Mode>('closed')
  const [showDetails, setShowDetails] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const firstFocusRef = useRef<HTMLButtonElement>(null)

  const pathname = usePathname()
  const locale = pathname?.split('/').filter(Boolean)[0] || 'en'
  const policyHref = `/${locale}/cookie-policy`

  // Decide initial visibility once, on the client, after mount.
  useEffect(() => {
    if (readConsent() === null) setMode('initial')
  }, [])

  // Footer "Cookie settings" (and anywhere else) can reopen the banner.
  useEffect(() => {
    const open = () => {
      const existing = readConsent()
      setAnalytics(existing?.analytics ?? false)
      setShowDetails(true)
      setMode('settings')
    }
    window.addEventListener(OPEN_PREFERENCES_EVENT, open)
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, open)
  }, [])

  const close = useCallback(() => {
    setMode('closed')
    setShowDetails(false)
  }, [])

  const save = useCallback((value: boolean) => {
    writeConsent({ analytics: value })
    close()
  }, [close])

  // Focus management + focus trap while open.
  useEffect(() => {
    if (mode === 'closed') return
    firstFocusRef.current?.focus()

    // Not a modal: focus moves into the bar for keyboard users, but Tab is free
    // to leave it into the page (no focus trap). Escape only cancels when a
    // prior choice already exists (reopened settings mode).
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mode === 'settings') close()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mode, close])

  if (mode === 'closed') return null

  const dismissible = mode === 'settings'

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .cc-root { --cc-cream:#FAF8F3; --cc-ink:#1E1C19; --cc-body:#4A463E; --cc-muted:#6B655C; --cc-terra:#C75A37; --cc-forest:#2E4034; --cc-border:rgba(30,28,25,.14); }
        .cc-panel { position:fixed; z-index:9999; left:50%; bottom:clamp(12px,3vw,28px); transform:translateX(-50%); width:min(680px, calc(100vw - 24px)); background:var(--cc-cream); color:var(--cc-ink); border:1px solid var(--cc-border); border-radius:16px; box-shadow:0 30px 70px -30px rgba(20,18,15,.55); font-family:var(--font-hanken,system-ui),sans-serif; animation:cc-rise .32s cubic-bezier(.22,.61,.36,1); overflow:hidden; }
        .cc-inner { padding:clamp(20px,3.4vw,28px); }
        .cc-eyebrow { font-size:11px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--cc-terra); margin:0 0 10px; }
        .cc-title { font-family:var(--font-spectral,Georgia),serif; font-weight:500; font-size:clamp(19px,2.6vw,23px); line-height:1.15; letter-spacing:-.2px; margin:0 0 10px; }
        .cc-text { font-size:14px; line-height:1.65; color:var(--cc-body); margin:0 0 4px; }
        .cc-text a { color:var(--cc-terra); text-decoration:underline; text-decoration-color:rgba(199,90,55,.4); text-underline-offset:2px; }
        .cc-actions { display:flex; flex-wrap:wrap; gap:10px; margin-top:20px; }
        .cc-btn { flex:1 1 150px; appearance:none; cursor:pointer; font-family:inherit; font-size:14.5px; font-weight:600; padding:13px 18px; border-radius:10px; border:1px solid transparent; transition:transform .18s ease, box-shadow .18s ease, background .18s, color .18s, border-color .18s; }
        .cc-btn:active { transform:translateY(1px); }
        .cc-btn-primary { background:var(--cc-terra); color:#FFF; }
        .cc-btn-primary:hover { background:#B44D2D; box-shadow:0 14px 30px -16px rgba(199,90,55,.8); }
        .cc-btn-secondary { background:#FFF; color:var(--cc-ink); border-color:var(--cc-border); }
        .cc-btn-secondary:hover { border-color:var(--cc-forest); color:var(--cc-forest); }
        .cc-btn-ghost { background:transparent; color:var(--cc-forest); border-color:var(--cc-border); }
        .cc-btn-ghost:hover { background:rgba(46,64,52,.06); border-color:var(--cc-forest); }
        .cc-details { margin-top:22px; border-top:1px solid var(--cc-border); padding-top:6px; }
        .cc-row { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; padding:16px 0; border-bottom:1px solid var(--cc-border); }
        .cc-row:last-child { border-bottom:none; }
        .cc-row-name { font-size:14.5px; font-weight:600; color:var(--cc-ink); margin:0 0 3px; }
        .cc-row-desc { font-size:12.5px; line-height:1.55; color:var(--cc-muted); margin:0; max-width:44ch; }
        .cc-switch { position:relative; flex-shrink:0; width:46px; height:26px; border-radius:999px; border:none; cursor:pointer; padding:0; background:#CFC8BB; transition:background .2s; margin-top:2px; }
        .cc-switch[aria-checked="true"] { background:var(--cc-forest); }
        .cc-switch[aria-disabled="true"] { cursor:not-allowed; background:var(--cc-terra); opacity:.85; }
        .cc-switch::after { content:''; position:absolute; top:3px; left:3px; width:20px; height:20px; border-radius:50%; background:#FFF; box-shadow:0 1px 3px rgba(0,0,0,.3); transition:transform .2s; }
        .cc-switch[aria-checked="true"]::after { transform:translateX(20px); }
        .cc-close { position:absolute; top:14px; right:14px; width:34px; height:34px; display:inline-flex; align-items:center; justify-content:center; border:none; background:transparent; border-radius:8px; cursor:pointer; color:var(--cc-muted); }
        .cc-close:hover { background:rgba(30,28,25,.06); color:var(--cc-ink); }
        .cc-root :focus-visible { outline:2px solid var(--cc-terra); outline-offset:2px; }
        .cc-switch:focus-visible { outline-offset:3px; }
        @keyframes cc-rise { from{opacity:0; transform:translate(-50%,14px)} to{opacity:1; transform:translate(-50%,0)} }
        @media (prefers-reduced-motion: reduce) { .cc-panel{animation:none} .cc-btn,.cc-switch::after,.cc-switch{transition:none} }
        @media (max-width:520px) { .cc-btn{flex-basis:100%} }
      ` }} />

      <div className="cc-root">
        <div
          ref={dialogRef}
          className="cc-panel"
          role="dialog"
          aria-label="Cookie consent"
          aria-describedby="cc-desc"
        >
          {dismissible && (
            <button className="cc-close" onClick={close} aria-label="Close cookie preferences">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          )}
          <div className="cc-inner">
            <p className="cc-eyebrow">Your privacy</p>
            <h2 className="cc-title" id="cc-title">We value your privacy</h2>
            <p className="cc-text" id="cc-desc">
              We use essential cookies to make this site work. With your permission,
              we&rsquo;d also use analytics cookies to understand how the site is used
              and improve it. You can accept all, reject non-essential cookies, or
              choose what to allow. Read our{' '}
              <Link href={policyHref}>Cookie Policy</Link>.
            </p>

            {showDetails && (
              <div className="cc-details">
                <div className="cc-row">
                  <div>
                    <p className="cc-row-name">Strictly necessary</p>
                    <p className="cc-row-desc">
                      Required for the site to function — remembers your cookie choice
                      and language preference. Always on.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="cc-switch"
                    role="switch"
                    aria-checked="true"
                    aria-disabled="true"
                    aria-label="Strictly necessary cookies (always on)"
                    tabIndex={0}
                  />
                </div>
                <div className="cc-row">
                  <div>
                    <p className="cc-row-name">Analytics</p>
                    <p className="cc-row-desc">
                      Google Analytics (GA4), set only if enabled. Helps us measure
                      visits and improve the site. Loads only after you allow it.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="cc-switch"
                    role="switch"
                    aria-checked={analytics}
                    aria-label="Analytics cookies"
                    onClick={() => setAnalytics(v => !v)}
                  />
                </div>
              </div>
            )}

            <div className="cc-actions">
              {showDetails ? (
                <>
                  <button className="cc-btn cc-btn-primary" ref={firstFocusRef} onClick={() => save(analytics)}>
                    Save preferences
                  </button>
                  <button className="cc-btn cc-btn-secondary" onClick={() => save(true)}>
                    Accept all
                  </button>
                  <button className="cc-btn cc-btn-ghost" onClick={() => save(false)}>
                    Reject all
                  </button>
                </>
              ) : (
                <>
                  <button className="cc-btn cc-btn-primary" ref={firstFocusRef} onClick={() => save(true)}>
                    Accept all
                  </button>
                  <button className="cc-btn cc-btn-secondary" onClick={() => save(false)}>
                    Reject all
                  </button>
                  <button className="cc-btn cc-btn-ghost" onClick={() => setShowDetails(true)}>
                    Customize
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

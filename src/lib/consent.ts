// First-party cookie-consent state. No third-party dependencies; safe to import
// from client components only (touches document/window behind guards).

export type ConsentCategories = {
  /** Strictly necessary — always true, cannot be switched off. */
  essential: true
  /** Google Analytics (GA4) and related measurement cookies. */
  analytics: boolean
}

export type ConsentRecord = ConsentCategories & {
  /** Schema version — bump to re-prompt everyone if categories change. */
  v: number
  /** Epoch ms the choice was last saved. */
  ts: number
}

export const COOKIE_NAME = 'aeg_consent'
export const CONSENT_VERSION = 1
/** ~6 months. */
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 182

/** Fired on window whenever the stored consent changes. detail = ConsentRecord. */
export const CONSENT_CHANGED_EVENT = 'aeg:consent-changed'
/** Fired on window to (re)open the preferences banner from anywhere (e.g. footer). */
export const OPEN_PREFERENCES_EVENT = 'aeg:open-cookie-preferences'

export const DEFAULT_CONSENT: ConsentRecord = {
  essential: true,
  analytics: false,
  v: CONSENT_VERSION,
  ts: 0,
}

/** Read + validate the stored consent. Returns null if absent or unreadable. */
export function readConsent(): ConsentRecord | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie
    .split('; ')
    .find(row => row.startsWith(COOKIE_NAME + '='))
  if (!match) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(match.split('=').slice(1).join('=')))
    if (parsed && typeof parsed === 'object' && parsed.v === CONSENT_VERSION) {
      return {
        essential: true,
        analytics: Boolean(parsed.analytics),
        v: CONSENT_VERSION,
        ts: typeof parsed.ts === 'number' ? parsed.ts : 0,
      }
    }
  } catch {
    /* fall through — treat as no consent */
  }
  return null
}

/** True once the visitor has made any explicit choice. */
export function hasConsent(): boolean {
  return readConsent() !== null
}

/** Persist a choice to a first-party cookie and broadcast the change. */
export function writeConsent(categories: { analytics: boolean }): ConsentRecord {
  const record: ConsentRecord = {
    essential: true,
    analytics: categories.analytics,
    v: CONSENT_VERSION,
    ts: Date.now(),
  }
  if (typeof document !== 'undefined') {
    const value = encodeURIComponent(JSON.stringify(record))
    const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `${COOKIE_NAME}=${value}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`
    window.dispatchEvent(new CustomEvent<ConsentRecord>(CONSENT_CHANGED_EVENT, { detail: record }))
  }
  return record
}

/** Ask the banner to open so the visitor can review/change their choice. */
export function openCookiePreferences(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))
  }
}

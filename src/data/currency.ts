// ── Currency alert baseline ───────────────────────────────────────────────────
// All tour prices are set MANUALLY (in tours.ts). Nothing here changes prices.
//
// This file records the GEL/EUR rate that was true the LAST TIME you reviewed or
// updated those prices. A daily Vercel Cron (/api/cron/currency-check) fetches the
// live rate from the National Bank of Georgia and emails you if it has drifted
// past the threshold below — so you know when it's worth reviewing prices.
//
// ▶ WHENEVER YOU UPDATE TOUR PRICES: update the two values below to "now".
//   Look up the current GEL-per-EUR rate at https://nbg.gov.ge (or the JSON API
//   URL below), put it in `gelPerEurAtLastUpdate`, and set today's date. That
//   resets the alert so it measures drift from your newest prices.

export const CURRENCY_BASELINE = {
  /** NBG rate on the day you last set prices: how many GEL = 1 EUR. */
  gelPerEurAtLastUpdate: 3.0237,
  /** For your reference — when you last reviewed/updated prices (YYYY-MM-DD). */
  lastPriceReview: '2026-07-05',
}

/** Email an alert if the live GEL/EUR rate moves more than this % from baseline. */
export const CURRENCY_ALERT_THRESHOLD_PCT = 4

/** National Bank of Georgia public currencies API (EUR, USD, … — business days). */
export const NBG_CURRENCIES_URL = 'https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json'

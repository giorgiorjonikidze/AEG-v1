import type { GroupDeparture } from '@/data/tours'

/** Formats a departure's date range, e.g. "6 – 12 Sep 2026" or
 *  "27 Sep – 3 Oct 2026" (month repeated only when it changes). */
export function formatDepartureRange(dep: GroupDeparture): string {
  const start = new Date(dep.startDate + 'T00:00:00Z')
  const end = new Date(dep.endDate + 'T00:00:00Z')
  const day = (d: Date) => d.getUTCDate()
  const mon = (d: Date) => d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
  const year = (d: Date) => d.getUTCFullYear()

  const sameMonth = start.getUTCMonth() === end.getUTCMonth() && year(start) === year(end)
  if (sameMonth) {
    return `${day(start)} – ${day(end)} ${mon(end)} ${year(end)}`
  }
  const sameYear = year(start) === year(end)
  return sameYear
    ? `${day(start)} ${mon(start)} – ${day(end)} ${mon(end)} ${year(end)}`
    : `${day(start)} ${mon(start)} ${year(start)} – ${day(end)} ${mon(end)} ${year(end)}`
}

export type DepartureStatus =
  | { kind: 'soldout'; label: string }
  | { kind: 'last'; label: string }      // 1–2 left — urgency
  | { kind: 'limited'; label: string }   // 3–4 left
  | { kind: 'available'; label: string } // plenty left

/** Derives a spots-left status + human label from a departure. */
export function departureStatus(dep: GroupDeparture): DepartureStatus {
  if (dep.spotsLeft <= 0) return { kind: 'soldout', label: 'Sold out' }
  if (dep.spotsLeft <= 2) return { kind: 'last', label: dep.spotsLeft === 1 ? 'Last spot' : `${dep.spotsLeft} spots left` }
  if (dep.spotsLeft <= 4) return { kind: 'limited', label: `${dep.spotsLeft} spots left` }
  return { kind: 'available', label: `${dep.spotsLeft} spots left` }
}

/** Lowest per-person price across bookable (not sold-out) departures,
 *  falling back to the lowest of all departures if every one is sold out. */
export function departureFromPrice(departures: GroupDeparture[]): number | null {
  if (!departures.length) return null
  const bookable = departures.filter(d => d.spotsLeft > 0)
  const pool = bookable.length ? bookable : departures
  return Math.min(...pool.map(d => d.price))
}

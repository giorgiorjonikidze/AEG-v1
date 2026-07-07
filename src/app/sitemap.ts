import type { MetadataRoute } from 'next'
import { TOURS } from '@/data/tours'
import { ACTIVITIES_DATA } from '@/data/activities'
import { REGIONS_DATA } from '@/data/regions'

const BASE = 'https://adventure-experts-georgia.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/tours',
    '/guides',
    '/services',
    '/contact',
    '/about',
    '/privacy-policy',
    '/cookie-policy',
    '/terms',
  ].map(p => ({
    url: `${BASE}/en${p}`,
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.7,
  }))

  const tourPages = TOURS.map(t => ({
    url: `${BASE}/en/tours/${t.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const activityPages = ACTIVITIES_DATA.map(a => ({
    url: `${BASE}/en/tours/${a.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const regionPages = REGIONS_DATA.map(r => ({
    url: `${BASE}/en/regions/${r.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...tourPages, ...activityPages, ...regionPages]
}

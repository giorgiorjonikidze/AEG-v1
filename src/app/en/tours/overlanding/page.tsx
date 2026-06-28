import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getActivityBySlug } from '@/data/activities'
import { TOURS } from '@/data/tours'
import ActivityPageTemplate from '@/components/ActivityPageTemplate'

const activity = getActivityBySlug('overlanding')

export const metadata: Metadata = {
  title: activity?.metaTitle ?? 'Overlanding Tours in Georgia',
  description: activity?.metaDescription,
  openGraph: { images: [{ url: activity?.heroImage ?? '' }] },
}

export default function OverlandingPage() {
  if (!activity) notFound()
  const tours = TOURS.filter(t => t.category === activity.categoryTag)
  return <ActivityPageTemplate activity={activity} tours={tours} />
}

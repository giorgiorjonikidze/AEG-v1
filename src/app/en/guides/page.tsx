import type { Metadata } from 'next'
import GuidesContent from './GuidesContent'

export const metadata: Metadata = {
  title: 'Meet Our Certified Mountain Guides',
  description:
    'The certified local guides behind Adventure Experts Georgia — qualified, experienced mountain professionals born and raised in the Caucasus, leading every private tour.',
}

export default function GuidesPage() {
  return <GuidesContent />
}

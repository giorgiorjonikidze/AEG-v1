import type { Metadata } from 'next'
import ServicesContent from './ServicesContent'

export const metadata: Metadata = {
  title: 'Our Services — Custom Adventure Trip Planning',
  description:
    'Private guiding, tailor-made itineraries, 4x4 transfers and full trip planning for adventures across Georgia and the Caucasus, handled by certified local experts.',
}

export default function ServicesPage() {
  return <ServicesContent />
}

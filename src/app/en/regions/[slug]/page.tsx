import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { REGIONS_DATA, getRegionBySlug } from '@/data/regions'
import TailorMadeCTA from '@/components/TailorMadeCTA'
import Footer from '@/components/Footer'
import RegionPageContent from '@/components/region/RegionPageContent'

export async function generateStaticParams() {
  return REGIONS_DATA.map(r => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const region = getRegionBySlug(params.slug)
  if (!region) return {}
  return {
    title: region.metaTitle,
    description: region.metaDescription,
    openGraph: {
      title: `${region.adminName} — Adventure Experts Georgia`,
      description: region.metaDescription,
      images: [{ url: region.heroImage }],
    },
  }
}

export default function RegionPage({ params }: { params: { slug: string } }) {
  const region = getRegionBySlug(params.slug)
  if (!region) notFound()

  return (
    <>
      <RegionPageContent region={region} />
      <TailorMadeCTA />
      <Footer />
    </>
  )
}

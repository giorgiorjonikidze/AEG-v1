import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTourBySlug, TOURS } from '@/data/tours'
import Footer from '@/components/Footer'
import TailorMadeCTA from '@/components/TailorMadeCTA'
import TourHero from '@/components/tour/TourHero'
import TourJumpNav from '@/components/tour/TourJumpNav'
import TourOverview from '@/components/tour/TourOverview'
import TourItinerary from '@/components/tour/TourItinerary'
import TourInclusions from '@/components/tour/TourInclusions'
import TourGallery from '@/components/tour/TourGallery'
import TourFAQ from '@/components/tour/TourFAQ'
import TourRelated from '@/components/tour/TourRelated'
import Reviews from '@/components/Reviews'
import TourMobileBar from '@/components/tour/TourMobileBar'
import TourBookingCard from '@/components/tour/TourBookingCard'
import DayTourItinerary from '@/components/tour/DayTourItinerary'
import DayTourBookingCard from '@/components/tour/DayTourBookingCard'
import DayTourMobileBar from '@/components/tour/DayTourMobileBar'

export async function generateStaticParams() {
  return TOURS.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tour = getTourBySlug(params.slug)
  if (!tour) return {}
  return {
    title: tour.name,
    description: `${tour.emotionalLine} ${tour.quickFacts.duration} guided tour from ${tour.quickFacts.start}. From ${tour.currency}${tour.price.toLocaleString()} per person.`,
    openGraph: {
      title: tour.name,
      description: tour.emotionalLine,
      images: [{ url: tour.heroImage }],
    },
  }
}

export default function TourPage({ params }: { params: { slug: string } }) {
  const tour = getTourBySlug(params.slug)
  if (!tour) notFound()

  const priceStr = `${tour.currency}${tour.price.toLocaleString()}`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TouristTrip',
            name: tour.name,
            description: tour.overview,
            touristType: tour.category,
            itinerary: { '@type': 'ItemList', numberOfItems: tour.itinerary.length },
            offers: { '@type': 'Offer', price: tour.price, priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
          }),
        }}
      />

      <main>
        <TourHero tour={tour} priceStr={priceStr} />
        <TourJumpNav />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: '1fr 384px', gap: 56, alignItems: 'start' }}
          className="tour-layout">
          <style>{`
            .tour-layout > * { min-width: 0; }
            @media (max-width: 1024px) {
              .tour-layout { grid-template-columns: 1fr !important; }
              .tour-sidebar { display: none !important; }
            }
          `}</style>

          {/* Main content column */}
          <div>
            <TourOverview tour={tour} />
            {tour.isDayTour
              ? <DayTourItinerary tour={tour} />
              : <TourItinerary tour={tour} />
            }
            <TourInclusions tour={tour} />
            <TourGallery tour={tour} />
            <TourFAQ tour={tour} />
            <Reviews rows />
          </div>

          {/* Sticky sidebar — desktop only */}
          <div className="tour-sidebar" style={{ position: 'sticky', top: 100, paddingTop: 40 }}>
            {tour.isDayTour
              ? <DayTourBookingCard tour={tour} />
              : <TourBookingCard tour={tour} priceStr={priceStr} />
            }
          </div>
        </div>

        <TourRelated tour={tour} />
        <TailorMadeCTA />
      </main>

      <Footer />
      {tour.isDayTour
        ? <DayTourMobileBar tour={tour} />
        : <TourMobileBar tour={tour} priceStr={priceStr} />
      }
    </>
  )
}

import Hero from '@/components/Hero'
import LocalTeamSection from '@/components/LocalTeamSection'
import ActivitiesSection from '@/components/ActivitiesSection'
import FeaturedAdventures from '@/components/FeaturedAdventures'
import DayToursSection from '@/components/DayToursSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import RegionMap from '@/components/RegionMap'
import Reviews from '@/components/Reviews'
import TailorMadeCTA from '@/components/TailorMadeCTA'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Hero />
      <LocalTeamSection />
      <ActivitiesSection />
      <FeaturedAdventures />
      <DayToursSection />
      <WhyChooseUs />
      <RegionMap />
      <Reviews />
      <TailorMadeCTA />
      <Footer />
    </>
  )
}

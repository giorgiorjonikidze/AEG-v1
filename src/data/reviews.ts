// Real customer reviews, manually curated from our Google Business Profile.
// We only publish genuine reviews from our own travelers — see Reviews.tsx.
// When review volume grows, this can be replaced by a live Google Places API feed.

export interface Review {
  author: string
  rating: number      // 1–5
  text: string
  /** Human-readable month/year the review was posted. */
  date: string
  source: 'Google'
  /** Optional: feature this review first on a specific tour page. */
  tourSlug?: string
}

// Aggregate shown next to the heading — reflects the public Google Business Profile.
export const GOOGLE_RATING = 5.0
export const GOOGLE_REVIEW_COUNT = 3
export const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=Adventure+Experts+Georgia+reviews'

export const REVIEWS: Review[] = [
  {
    author: 'Klāvs Linde',
    rating: 5,
    text: 'Went caving with George. Very nice experience. He even prolonged the adventure by guiding us to additional chamber deeper in the cave which turned out to be enormous. It was our highlight.',
    date: 'August 2026',
    source: 'Google',
    tourSlug: 'melouri-cave-caving',
  },
]

export interface TourDay {
  day: number
  title: string
  narrative: string
  stats: { distance?: string; elevation?: string; drive?: string; overnight: string; optional?: string }
}

export interface DayStop {
  name: string
  time: string
  description: string
  tags: string[]
}

export interface TourData {
  slug: string
  name: string
  region: string
  category: string
  emotionalLine: string
  price: number
  currency: string
  heroImage: string
  isDayTour?: boolean
  perPersonRate?: number
  maxTravelers?: number
  quickFacts: { duration: string; start: string; end: string; activity: string; difficulty: string; accommodation: string }
  summaryCards: { icon: string; label: string; value: string }[]
  overview: string
  highlights: string[]
  routeFlow: string
  routePins: string[]
  itinerary: TourDay[]
  stops?: DayStop[]
  difficultyByDay: string[]
  difficultyMessage: string
  accommodation: string[]
  foodCulture: string[]
  included: string[]
  notIncluded: string[]
  whatToBring: string[]
  season: { month: string; rating: 'excellent' | 'good' | 'off' }[]
  gallery: { src: string; alt: string }[]
  faq: { q: string; a: string }[]
  relatedTours: { slug: string; name: string; region: string; duration: string; difficulty: string; image: string }[]
}

export const TOURS: TourData[] = [
  {
    slug: 'ice-and-towers-svaneti',
    name: 'Ice and Towers, Svaneti',
    region: 'Svaneti, Georgia',
    category: 'Trekking',
    emotionalLine: 'No need for knees of steel. Explore all the gems of Svaneti without back-breaking climbs.',
    price: 2490,
    currency: '€',
    heroImage: '/images/tours/ice-towers-hero.avif',
    quickFacts: {
      duration: '9 days',
      start: 'Tbilisi',
      end: 'Tbilisi',
      activity: 'Hiking & Culture',
      difficulty: 'Easy – Moderate',
      accommodation: 'Hotel + Guesthouses',
    },
    summaryCards: [
      { icon: 'clock', label: 'Duration', value: '9 days' },
      { icon: 'map-pin', label: 'Starting point', value: 'Tbilisi Airport' },
      { icon: 'map-pin', label: 'Ending point', value: 'Tbilisi / departure' },
      { icon: 'mountain', label: 'Main region', value: 'Svaneti' },
      { icon: 'users', label: 'Group size', value: 'Max 8 people' },
      { icon: 'activity', label: 'Activity', value: 'Hiking, culture, glaciers' },
      { icon: 'footprints', label: 'Hiking style', value: 'Day hikes, scenic routes' },
      { icon: 'home', label: 'Overnight places', value: 'Tbilisi, Mazeri, Mestia, Ushguli' },
      { icon: 'compass', label: 'Tour type', value: 'Guided adventure' },
      { icon: 'star', label: 'Best for', value: 'Highlights without extreme trekking' },
    ],
    overview: `Discover the wild heart of Georgia on this unforgettable hiking adventure through the legendary Svaneti region. Hidden among the soaring peaks of the Greater Caucasus, Svaneti is a land of ancient stone towers, heroic Svans, and untouched alpine beauty. From the vibrant streets of Tbilisi to the remote villages of Ushguli, you'll hike breathtaking trails to powerful waterfalls, shimmering glaciers, and high mountain lakes — all framed by iconic giants like Ushba, Shkhara, and Tetnuldi. Immerse yourself in Svan culture, taste traditional food, enjoy panoramic views from Zuruldi Ridge and Koruldi Lakes, and walk on the ancient ice of Adishi Glacier. This is Georgia at its most dramatic and authentic — a journey you'll never forget.`,
    highlights: [
      'Explore the legendary Svaneti region',
      'Travel through the Inguri Gorge',
      'Visit Mazeri, Mestia, and Ushguli',
      'Hike beneath Mount Ushba',
      'See Shdugra Waterfall',
      'Visit Chalaadi Glacier',
      'Panoramic views from Zuruldi Ridge',
      'Visit Koruldi Lakes',
      'Walk near Adishi Glacier',
      'Discover Ushguli and Lamaria Church',
      'See the source of the Enguri River below Mount Shkhara',
      'Experience Svan culture, towers, villages, and traditional food',
    ],
    routeFlow: 'Tbilisi → Mazeri → Mestia → Ushba Valley / Shdugra Waterfall → Chalaadi Glacier → Zuruldi Ridge → Koruldi Lakes → Adishi Glacier → Ushguli → Shkhara Glacier → Tbilisi',
    routePins: ['Tbilisi', 'Inguri Gorge', 'Mazeri', 'Ushba Valley', 'Shdugra Waterfall', 'Mestia', 'Chalaadi Glacier', 'Zuruldi Ridge', 'Koruldi Lakes', 'Adishi Glacier', 'Ushguli', 'Lamaria Church', 'Shkhara Glacier'],
    itinerary: [
      { day: 1, title: 'Arrival in Tbilisi', narrative: 'Arrive in Tbilisi, meet your driver, and transfer to your hotel for the night.', stats: { overnight: 'Tbilisi (hotel)' } },
      { day: 2, title: 'Tbilisi → Mazeri, Svaneti', narrative: 'Drive to the mysterious Svaneti region through the Inguri Gorge. Svaneti is home to the Svans, a proud highland people whose culture, traditions, and customs set them apart from the rest of Georgia. The region is famous for its distinctive architecture and is known as "the Land of a Thousand Towers" — medieval stone tower-houses (10th–14th c.) that served both defensive and residential roles, many still standing in Mestia.', stats: { drive: '450 km, ~8 hours', overnight: 'Mazeri (guesthouse)', optional: 'Enguri Dam' } },
      { day: 3, title: 'Ushba Valley & Shdugra Waterfall', narrative: 'Take in sweeping views of Mount Ushba — the region\'s most iconic peak — and one of Georgia\'s most powerful waterfalls. Today\'s hike begins in the valley beneath Ushba and leads to the Shdugra Waterfall. Afterwards, drive to Mestia.', stats: { distance: '6 km', elevation: '1,600 m → 2,000 m', drive: '24 km (~40 min)', overnight: 'Mestia (guesthouse)', optional: 'Traditional Svan tower (koshki)' } },
      { day: 4, title: 'Chalaadi Glacier', narrative: 'Chalaadi is one of Georgia\'s largest glaciers, and its tongue reaches one of the lowest elevations in the country. The hike is easy to moderate, with wonderful views over the valley and mountains.', stats: { distance: '12 km (round trip)', elevation: '1,670 m → 1,970 m', drive: '24 km', overnight: 'Mestia (guesthouse)', optional: 'Mestia History & Ethnography Museum' } },
      { day: 5, title: 'Zuruldi Ridge & Koruldi Lakes', narrative: 'Ride the cable car up and walk the Zuruldi ridgeline, with views of Ushba, Shkhara, Tetnuldi, and almost the entire Caucasus range. Continue on to the Koruldi Lakes.', stats: { distance: '2 km', elevation: 'Max 2,745 m', overnight: 'Mestia (guesthouse)' } },
      { day: 6, title: 'Mestia → Adishi Glacier', narrative: 'Hidden deep in Svaneti lies one of the most dramatic glacier valleys in the Caucasus. This full-day alpine adventure combines scenic off-road access, panoramic mountain views, and a guided approach to the Adishi Glacier — with the chance to walk on the ice itself.', stats: { distance: '12 km', elevation: '2,000–2,500 m', drive: '~2 hours total', overnight: 'Ushguli (guesthouse)' } },
      { day: 7, title: 'Ushguli & Shkhara Glacier', narrative: 'Reach the source of the Enguri — Svaneti\'s lifeline river — below Mount Shkhara, with scenic views of the highest part of the Caucasus. Visit Lamaria Church, a medieval hilltop church overlooking Ushguli at 2,200 m. Highly recommended this evening: watch the acclaimed film "Dede," set in Ushguli, in mixed Georgian and Svan with English subtitles.', stats: { distance: '6 km', elevation: 'Max 2,745 m', overnight: 'Ushguli (guesthouse)', optional: 'Film "Dede" (1h 37min)' } },
      { day: 8, title: 'Ushguli → Tbilisi', narrative: 'A scenic seven-hour drive back to Tbilisi, tracing the length of Svaneti as the mountains give way to foothills and then city.', stats: { drive: '~7 hours', overnight: 'Tbilisi (hotel)' } },
      { day: 9, title: 'Departure', narrative: 'Transfer to the airport for your departure. End of tour.', stats: { overnight: '—' } },
    ],
    difficultyByDay: [
      'Easy — Arrival transfer',
      'Long driving day — no hiking',
      'Moderate — 6 km hike to waterfall',
      'Easy–Moderate — 12 km glacier hike',
      'Light — Cable car + short ridge walk',
      'Moderate — Full-day glacier approach',
      'Moderate — Scenic hike to glacier source',
      'Long driving day — no hiking',
      'Easy — Departure transfer',
    ],
    difficultyMessage: 'Designed for travelers who want Svaneti\'s major natural and cultural highlights without committing to a difficult hut-to-hut trek.',
    accommodation: [
      'Night 1 & 8 — Hotel in Tbilisi',
      'Night 2 — Guesthouse in Mazeri',
      'Nights 3, 4 & 5 — Guesthouse / small hotel in Mestia',
      'Nights 6 & 7 — Guesthouse in Ushguli',
    ],
    foodCulture: [
      'Traditional Svan cuisine at guesthouses',
      'Breakfasts and selected dinners included',
      'Svan towers (koshki) — medieval stone defensive houses',
      'Lamaria Church — medieval hilltop church above Ushguli',
      'Optional: Mestia History & Ethnography Museum',
      'Optional: film "Dede" set in Ushguli (with English subtitles)',
      'Stories and traditions from your local Svan guide',
    ],
    included: [
      'Airport transfer on arrival',
      'All transportation throughout the tour',
      'Professional English-speaking guide',
      'All accommodation (hotel + guesthouses)',
      'Breakfasts daily',
      'Selected meals (noted in itinerary)',
      'Cable car ticket (Zuruldi)',
      'Listed museum entrance fees',
      '4×4 transfers where specified',
      'Route planning and full organization',
    ],
    notIncluded: [
      'International flights',
      'Travel insurance',
      'Personal expenses',
      'Alcoholic drinks',
      'Extra meals not listed in itinerary',
      'Optional activities',
      'Museum entry fees not listed',
      'Film "Dede" ticket',
      'Tips (discretionary)',
    ],
    whatToBring: [
      'Comfortable, broken-in hiking shoes or boots',
      'Waterproof jacket and rain cover',
      'Warm layers (fleece / down jacket)',
      'Day backpack (20–30 L)',
      'Reusable water bottle',
      'Sunglasses and sun hat',
      'Sunscreen (SPF 30+)',
      'Personal medication',
      'Camera or phone with extra storage',
      'Power bank',
      'Travel insurance documents',
    ],
    season: [
      { month: 'Jun', rating: 'good' },
      { month: 'Jul', rating: 'excellent' },
      { month: 'Aug', rating: 'excellent' },
      { month: 'Sep', rating: 'excellent' },
      { month: 'Oct', rating: 'good' },
    ],
    gallery: [
      { src: '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg', alt: 'Medieval Svan towers in the village' },
      { src: '/images/tours/vasily-ledovsky-7Nl6vSXdDhE-unsplash.jpg', alt: 'Mount Ushba rising above the valley' },
      { src: '/images/tours/wander-creative-6i3O_w7wOyE-unsplash.jpg', alt: 'Shdugra Waterfall cascading through forest' },
      { src: '/images/tours/andrew-rusinas-aFFKmsFoldc-unsplash.jpg', alt: 'Chalaadi Glacier approach trail' },
      { src: '/images/tours/jason-gardner-LU-o3CbeZhU-unsplash.jpg', alt: 'Panoramic view from Zuruldi Ridge' },
      { src: '/images/tours/johannes-andersson-pmtllkyavOk-unsplash.jpg', alt: 'Koruldi Lakes at high altitude' },
      { src: '/images/tours/kim-cordenete-3hB68obZnHI-unsplash.jpg', alt: 'Adishi Glacier ice field' },
      { src: '/images/tours/darya-tryfanava-rY1P25plAYg-unsplash.jpg', alt: 'Ushguli village with Shkhara behind' },
      { src: '/images/tours/k-t-xVLdFIxcDCc-unsplash.jpg', alt: 'Shkhara mountain — highest peak in Georgia' },
      { src: '/images/tours/tomas-malik-EtvlvO4cF5I-unsplash.jpg', alt: 'Traditional Svan guesthouse meal' },
    ],
    faq: [
      { q: 'Is this tour difficult?', a: 'No — it\'s designed for active travellers who enjoy walking but don\'t need expedition fitness. Hikes are 6–12 km on well-marked trails, with the most strenuous days rated easy-to-moderate. Days 2 and 8 are mostly driving.' },
      { q: 'Do I need previous hiking experience?', a: 'Basic fitness is enough. You should be comfortable walking for 4–6 hours with a light daypack, including some uphill sections. No technical skills, ropes, or prior mountaineering experience are required.' },
      { q: 'Is it suitable for families?', a: 'Yes, for families with teenagers or older children who enjoy being outdoors. Some hiking days involve rocky terrain. We\'re happy to adapt the pace for families — mention this in your enquiry.' },
      { q: 'What accommodation is used?', a: 'A comfortable hotel in Tbilisi, family-run guesthouses in Mazeri and Ushguli, and a guesthouse or small hotel in Mestia. All are clean, welcoming, and chosen for their location. Rooms are twin/double with private or shared bathroom depending on the property.' },
      { q: 'Are the hikes optional?', a: 'Yes. If the weather turns or you\'d rather spend a day exploring the village, your guide will help you adjust the plan. The driving days (Days 2 and 8) offer natural rest breaks built into the itinerary.' },
      { q: 'Can this tour be private?', a: 'Absolutely — all our tours can run as private departures for couples, families, or groups. A private trip gives you full flexibility on dates, pace, and any customisations. Use the "Request a Custom Version" option in the enquiry form.' },
      { q: 'What happens if the weather is bad?', a: 'Mountain weather is unpredictable and we always have a backup plan. Your guide will adjust the route, suggest alternative activities, or reschedule a hike to a better weather window where possible. Safety is always our first priority.' },
      { q: 'Do I need travel insurance?', a: 'Yes, travel insurance including emergency evacuation cover is strongly recommended for all mountain travel. We can suggest providers if needed — mention it in your enquiry.' },
      { q: 'Can the itinerary change?', a: 'The published itinerary is our tried-and-tested plan. Occasionally road conditions, weather, or local events may require minor adjustments. Your guide will always choose the best alternative and keep you informed.' },
      { q: 'Is airport pickup included?', a: 'Yes — airport transfer on arrival (Day 1) is included. If your flight lands late, we\'ll arrange accordingly. Departure transfer on Day 9 is also included.' },
    ],
    relatedTours: [
      { slug: 'svaneti-trekking', name: 'Svaneti Trekking Tour', region: 'Svaneti', duration: '7 days', difficulty: 'Moderate–Hard', image: '/images/tours/iman-gozal-5iQWgow3_S0-unsplash.jpg' },
      { slug: 'kazbegi-hiking', name: 'Kazbegi Hiking Adventure', region: 'Kazbegi', duration: '3 days', difficulty: 'Moderate', image: '/images/tours/nadav-fima-ULn5jbPuHx8-unsplash.jpg' },
      { slug: 'tusheti-overlanding', name: 'Tusheti Overlanding Expedition', region: 'Tusheti', duration: '5 days', difficulty: 'Easy', image: '/images/tours/jairph-Edx0NpJ29fQ-unsplash.jpg' },
      { slug: 'cave-canyon-adventure', name: 'Cave & Canyon Adventure', region: 'Imereti', duration: '4 days', difficulty: 'Easy–Moderate', image: '/images/tours/zviad-pharsenadze--cIcGJX4Gxk-unsplash.jpg' },
    ],
  },
  {
    slug: 'kazbegi-day-trip',
    name: 'Kazbegi Day Trip — Ananuri, Gudauri & Gergeti',
    region: 'Kazbegi / Georgian Military Highway',
    category: 'Day Tour',
    emotionalLine: 'One unforgettable day from Tbilisi to the foot of Mount Kazbek — fortresses, alpine passes, and a hilltop church above the clouds.',
    price: 95,
    currency: '€',
    isDayTour: true,
    perPersonRate: 95,
    maxTravelers: 12,
    heroImage: '/images/tours/andrew-rusinas-aFFKmsFoldc-unsplash.jpg',
    quickFacts: {
      duration: '~10.5 hours',
      start: 'Tbilisi',
      end: 'Tbilisi',
      activity: 'Sightseeing & Culture',
      difficulty: 'Easy',
      accommodation: '',
    },
    summaryCards: [
      { icon: 'clock',     label: 'Duration',       value: '~10.5 hours' },
      { icon: 'map-pin',   label: 'Start / End',    value: 'Tbilisi' },
      { icon: 'users',     label: 'Group size',      value: 'Up to 12 people' },
      { icon: 'activity',  label: 'Activity',        value: 'Sightseeing, culture, mountains' },
      { icon: 'compass',   label: 'Tour type',       value: 'Guided day tour' },
      { icon: 'star',      label: 'Best for',        value: 'All ages, families, first-timers' },
    ],
    overview: `Trade the city for the high Caucasus on this full-day journey north along the historic Georgian Military Highway. You'll stand above the turquoise Zhinvali Reservoir at the Ananuri fortress, pause for Georgian wine and alpine honey, watch two rivers of different colours meet at the Aragvi confluence, and take in sweeping mountain views from the Gudauri viewpoint and Friendship Monument. The finale: a rugged 4×4 ride up to the Gergeti Trinity Church, perched at 2,170 m beneath the snow-capped Mount Kazbek — one of Georgia's most iconic sights. You'll be back in Tbilisi by evening, full of mountain air and photographs.`,
    highlights: [
      'Turquoise Zhinvali Reservoir and the 17th-century Ananuri fortress',
      'Georgian wine and alpine honey tasting',
      'The "Black & White" Aragvi river confluence',
      'Panoramic Caucasus views from the Gudauri viewpoint and Friendship Monument',
      'A 4×4 ride to the iconic Gergeti Trinity Church beneath Mount Kazbek',
    ],
    routeFlow: 'Tbilisi → Zhinvali Reservoir → Ananuri → (wine & honey tasting) → Aragvi confluence → Gudauri Viewpoint → Stepantsminda → Gergeti Trinity Church → Tbilisi',
    routePins: ['Tbilisi', 'Zhinvali Reservoir', 'Ananuri', 'Aragvi confluence', 'Gudauri Viewpoint', 'Stepantsminda', 'Gergeti Trinity Church'],
    stops: [
      { name: 'Zhinvali Reservoir', time: '~15 min', description: 'First stop above the bright turquoise lake — one of the most photogenic spots on the Military Highway.', tags: ['Photo stop'] },
      { name: 'Ananuri Fortress', time: '~45 min', description: 'Explore the striking 17th-century fortress and church complex perched on the water\'s edge.', tags: ['Visit', 'Guided', 'Walk'] },
      { name: 'Wine & Honey Tasting', time: '~20 min', description: 'Sample Georgian wine and alpine honey at a local roadside stop — a sweet pause between sights.', tags: ['Tasting', 'Local'] },
      { name: 'Black & White Aragvi Confluence', time: '~10 min', description: 'Where two tributaries of the Aragvi River meet but keep their different colours — a striking natural phenomenon.', tags: ['Photo stop'] },
      { name: 'Gudauri Viewpoint & Friendship Monument', time: '~30 min', description: 'Panoramic views over the Devil\'s Valley at 2,200 m, and the famous Soviet-era mosaic monument.', tags: ['Sightseeing', 'Walk'] },
      { name: 'Stepantsminda (Kazbegi)', time: '~30 min', description: 'The mountain town at the foot of Mount Kazbek. Free time to wander and grab lunch.', tags: ['Free time', 'Lunch'] },
      { name: 'Gergeti Trinity Church', time: '~40 min', description: 'A 4×4 ride up to the iconic hilltop church at 2,170 m, framed by the glaciers of Mount Kazbek above.', tags: ['Visit', '4×4', 'Sightseeing'] },
    ],
    itinerary: [],
    difficultyByDay: [],
    difficultyMessage: 'Easy. Mostly driving with short, gentle walks at each stop — suitable for most ages and fitness levels. The day is long (~10.5 h) with significant time on the road.',
    accommodation: [],
    foodCulture: [
      'Wine and alpine honey tasting included',
      'Lunch at your own expense in Stepantsminda',
      'Local roadside market stops en route',
    ],
    included: [
      'Professional English-speaking guide',
      'Air-conditioned transport from and to Tbilisi',
      'Wine & honey tasting',
    ],
    notIncluded: [
      'Lunch and drinks',
      '4×4 jeep Stepantsminda → Gergeti Trinity Church (≈ 20 GEL, paid locally)',
      'Optional entry fees and extra tastings',
      'Tips (discretionary)',
    ],
    whatToBring: [
      'Warm jacket and layers (cold at Gergeti even in summer)',
      'Comfortable walking shoes',
      'Sun protection and sunglasses',
      'Camera or phone',
      'Some cash for lunch and the 4×4',
    ],
    season: [
      { month: 'Mar', rating: 'good' },
      { month: 'Apr', rating: 'good' },
      { month: 'May', rating: 'excellent' },
      { month: 'Jun', rating: 'excellent' },
      { month: 'Jul', rating: 'excellent' },
      { month: 'Aug', rating: 'excellent' },
      { month: 'Sep', rating: 'excellent' },
      { month: 'Oct', rating: 'good' },
      { month: 'Nov', rating: 'good' },
    ],
    gallery: [
      { src: '/images/tours/andrew-rusinas-aFFKmsFoldc-unsplash.jpg', alt: 'Mount Kazbek and Gergeti Trinity Church' },
      { src: '/images/tours/vasily-ledovsky-7Nl6vSXdDhE-unsplash.jpg', alt: 'Zhinvali Reservoir turquoise waters' },
      { src: '/images/tours/nadav-fima-ULn5jbPuHx8-unsplash.jpg', alt: 'Ananuri Fortress on the reservoir' },
      { src: '/images/tours/gio-chanturia-2aGoA1zcWfI-unsplash.jpg', alt: 'Georgian wine and honey tasting' },
      { src: '/images/tours/jason-gardner-LU-o3CbeZhU-unsplash.jpg', alt: 'Gudauri viewpoint panorama' },
      { src: '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg', alt: 'Stepantsminda village and mountain views' },
    ],
    faq: [
      { q: 'Is this tour suitable for families and kids?', a: 'Yes — the walks at each stop are short and gentle, making this a great day out for families with children of most ages.' },
      { q: 'How much walking is there?', a: 'Very little. Most of the day is spent driving. The walks at each stop are 10–45 minutes on easy terrain — no hiking boots needed.' },
      { q: 'Is the 4×4 to Gergeti included?', a: 'The 4×4 ride from Stepantsminda up to Gergeti Trinity Church is not included in the tour price. It costs approximately 20 GEL per person and is paid directly to the driver in cash on the day.' },
      { q: 'What happens if the weather is bad?', a: 'Mountain weather in Kazbegi can change fast — Gergeti may be cloudy when Tbilisi is sunny. We monitor conditions daily. If access to the church is unsafe, your guide will adapt the plan and suggest the best alternative.' },
      { q: 'Is lunch included?', a: 'No. Lunch is at your own expense in Stepantsminda. There are several good local restaurants near the town centre.' },
      { q: 'Is hotel pickup available?', a: 'Currently we use a central meeting point in Tbilisi. Let us know your hotel in the enquiry and we\'ll do our best to accommodate you.' },
      { q: 'Can this be a private tour?', a: 'Yes — all our tours run as private departures. A private day trip gives you total flexibility on timing and pace. Mention it in your enquiry.' },
      { q: 'How cold does it get at Gergeti?', a: 'Even in summer, temperatures at 2,170 m can be noticeably cooler than Tbilisi. Bring a warm jacket and layers — you\'ll be glad you did at the top.' },
    ],
    relatedTours: [
      { slug: 'ice-and-towers-svaneti', name: 'Ice and Towers, Svaneti', region: 'Svaneti', duration: '9 days', difficulty: 'Easy–Moderate', image: '/images/tours/ice-towers-hero.avif' },
      { slug: 'kazbegi-summit', name: 'Kazbegi Summit Adventure', region: 'Kazbegi', duration: '6 days', difficulty: 'Challenging', image: '/images/tours/andrew-rusinas-aFFKmsFoldc-unsplash.jpg' },
      { slug: 'mestia-ushguli', name: 'Mestia to Ushguli Trek', region: 'Svaneti', duration: '4 days', difficulty: 'Moderate', image: '/images/tours/johannes-andersson-pmtllkyavOk-unsplash.jpg' },
      { slug: 'kakheti-wine-bike', name: 'Kakheti Wine & Bike Tour', region: 'Kakheti', duration: '2 days', difficulty: 'Easy', image: '/images/tours/gio-chanturia-2aGoA1zcWfI-unsplash.jpg' },
    ],
  },
]

export function getTourBySlug(slug: string): TourData | undefined {
  return TOURS.find(t => t.slug === slug)
}

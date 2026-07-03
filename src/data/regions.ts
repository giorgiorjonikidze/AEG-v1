export interface HeroFact { icon: string; text: string }
export interface QuickFact { icon: string; label: string; value: string }
export interface RegionHighlight { icon: string; tag: string; title: string; desc: string; image?: string; href: string }
export interface RegionTourCard { name: string; hook: string; duration: string; regionActivity: string; difficulty: string; isNew: boolean; badge?: string; image?: string; href: string }
export interface RegionActivity { icon: string; label: string; href: string }
export interface MapPin { name: string; left: string; top: string; accent?: boolean }
export interface Season { icon: string; months: string; title: string; desc: string; accent: 'warm' | 'cool' | 'neutral' }
export interface PracticalNote { icon: string; title: string; desc: string }

export interface RegionData {
  slug: string
  name: string
  adminName: string
  tagline: string
  heroImage: string
  eyebrow: string
  metaTitle: string
  metaDescription: string
  intro: { heading: string; body: string }
  heroFacts: HeroFact[]
  quickFacts: QuickFact[]
  highlights: RegionHighlight[]
  tours: RegionTourCard[]
  toursViewAllHref: string
  activities: RegionActivity[]
  mapPins: MapPin[]
  seasons: Season[]
  practical: PracticalNote[]
  customTripHeading: string
  customTripBody: string
}

export const REGIONS_DATA: RegionData[] = [
  {
    slug: 'mtskheta-mtianeti',
    name: 'Kazbegi',
    adminName: 'Mtskheta-Mtianeti',
    tagline: 'Ancient capitals and the road to Mount Kazbek.',
    heroImage: '/images/tours/andrew-rusinas-aFFKmsFoldc-unsplash.jpg',
    eyebrow: 'Region · Northern Caucasus',
    metaTitle: 'Mtskheta-Mtianeti Region — Kazbegi, Gudauri & Mtskheta Tours | Adventure Experts Georgia',
    metaDescription: 'Explore Mtskheta-Mtianeti: from UNESCO monasteries in ancient Mtskheta to Mount Kazbek glaciers. Guided trekking, summits, skiing and day trips from Tbilisi.',
    intro: {
      heading: 'The Gateway to the High Caucasus',
      body: 'Mtskheta-Mtianeti reaches from the ancient royal capital of Mtskheta, just north of Tbilisi, all the way up the historic Georgian Military Highway to the glaciers of Mount Kazbek on the northern frontier. In one dramatic corridor it packs UNESCO-listed monasteries, a turquoise reservoir crowned by the Ananuri fortress, the slopes of Gudauri, and remote highland valleys like Khevsureti and Juta. Stand before a 1,500-year-old monastery in the morning and walk a glacier-fed valley by afternoon.',
    },
    heroFacts: [
      { icon: 'calendar', text: 'Best season: Jun–Sep' },
      { icon: 'mountain', text: 'Trekking · Summit · Overlanding · Winter' },
      { icon: 'mappin', text: 'Just north of Tbilisi' },
    ],
    quickFacts: [
      { icon: 'mappin',      label: 'Location',        value: 'Central-eastern Georgia, north of Tbilisi' },
      { icon: 'plane',       label: 'Nearest airport', value: 'Tbilisi (TBS)' },
      { icon: 'route',       label: 'Getting there',   value: 'Kazbegi ~3 h via the Georgian Military Highway' },
      { icon: 'calendar',    label: 'Best season',     value: 'Jun–Sep trekking · Dec–Mar skiing' },
      { icon: 'mountain',    label: 'Main activities', value: 'Trekking, Summit, Overlanding, Winter' },
      { icon: 'gauge',       label: 'Difficulty',      value: 'Easy day trips → Challenging summits' },
      { icon: 'clock',       label: 'Ideal length',    value: 'Day trips to multi-day treks & expeditions' },
      { icon: 'compass',     label: 'Highlights',      value: 'Mtskheta · Ananuri · Gudauri · Kazbek' },
    ],
    highlights: [
      {
        icon: 'mountainSnow', tag: 'Iconic',
        title: 'Gergeti Trinity Church & Mount Kazbek',
        desc: 'The hilltop church at 2,170 m beneath the 5,054 m peak — the defining image of Georgia.',
        image: '/images/tours/andrew-rusinas-aFFKmsFoldc-unsplash.jpg',
        href: '/en/tours?region=Kazbegi',
      },
      {
        icon: 'landmark', tag: 'UNESCO',
        title: 'Mtskheta',
        desc: "Georgia's ancient royal capital — Svetitskhoveli Cathedral and the hilltop Jvari Monastery.",
        image: '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg',
        href: '/en/tours?region=Kazbegi',
      },
      {
        icon: 'castle', tag: 'Fortress',
        title: 'Ananuri',
        desc: 'A 17th-century fortress and church above the turquoise Zhinvali Reservoir.',
        image: '/images/tours/nika-tchokhonelidze-Ms_p0I5DQSM-unsplash.jpg',
        href: '/en/tours?region=Kazbegi',
      },
      {
        icon: 'snowflake', tag: 'Alpine',
        title: 'Gudauri',
        desc: "Alpine viewpoints, the Friendship Monument, and Georgia's premier ski resort.",
        image: '/images/tours/kim-cordenete-3hB68obZnHI-unsplash.jpg',
        href: '/en/tours?region=Kazbegi',
      },
      {
        icon: 'mountain', tag: 'Trekking',
        title: 'Truso Valley & Juta / Chaukhi',
        desc: 'Dramatic glacier-fed valleys and jagged granite spires — serious alpine trekking territory.',
        image: '/images/tours/k-t-xVLdFIxcDCc-unsplash.jpg',
        href: '/en/tours?region=Kazbegi',
      },
      {
        icon: 'tower', tag: 'Remote',
        title: 'Khevsureti',
        desc: 'The remote medieval stone villages of Shatili and Mutso — overlanding country.',
        image: '/images/tours/iman-gozal-5iQWgow3_S0-unsplash.jpg',
        href: '/en/tours?region=Kazbegi',
      },
    ],
    tours: [
      {
        name: 'Kazbegi Day Trip — Ananuri, Gudauri & Gergeti',
        hook: 'Three Caucasus icons in one unforgettable day from Tbilisi.',
        duration: 'Day trip',
        regionActivity: 'Mtskheta-Mtianeti · Mixed Tours',
        difficulty: 'Easy',
        isNew: true,
        badge: 'Live',
        image: '/images/tours/andrew-rusinas-aFFKmsFoldc-unsplash.jpg',
        href: '/en/tours/kazbegi-day-trip',
      },
      {
        name: 'Chaukhi Massif Mountaineering Camp',
        hook: 'Learn the ropes and stand on three summits in the "Georgian Dolomites".',
        duration: '8 days',
        regionActivity: 'Mtskheta-Mtianeti · Summit Experience',
        difficulty: 'Challenging',
        isNew: true,
        badge: 'New',
        image: '/images/tours/summit/chaukhi-ridge-team.jpg',
        href: '/en/tours/chaukhi-mountaineering-camp',
      },
    ],
    toursViewAllHref: '/en/tours?region=Kazbegi',
    activities: [
      { icon: 'mountain',     label: 'Trekking & Hiking',  href: '/en/tours?activity=trekking' },
      { icon: 'mountainSnow', label: 'Summit Experience',  href: '/en/tours?activity=summit' },
      { icon: 'car',          label: 'Overlanding',        href: '/en/tours?activity=overlanding' },
      { icon: 'snowflake',    label: 'Winter',             href: '/en/tours?activity=winter' },
      { icon: 'compass',      label: 'Mixed Tours',        href: '/en/tours?activity=mixed' },
    ],
    mapPins: [
      { name: 'Mtskheta',      left: '45.5%', top: '85.5%' },
      { name: 'Ananuri',       left: '51%',   top: '66.1%' },
      { name: 'Gudauri',       left: '49.5%', top: '48.4%' },
      { name: 'Stepantsminda', left: '54%',   top: '28.2%' },
      { name: 'Gergeti',       left: '47%',   top: '24.2%' },
      { name: 'Mount Kazbek',  left: '40.5%', top: '19.4%', accent: true },
      { name: 'Juta',          left: '66%',   top: '32.3%' },
      { name: 'Khevsureti',    left: '78%',   top: '46.8%' },
    ],
    seasons: [
      {
        icon: 'sun', months: 'Jun–Sep', accent: 'warm',
        title: 'Trekking & Summits',
        desc: 'High-mountain trekking, summit attempts, and overlanding — the Khevsureti and Truso roads are open and the valleys are at their best.',
      },
      {
        icon: 'snowflake', months: 'Dec–Mar', accent: 'cool',
        title: 'Gudauri Skiing',
        desc: 'Skiing and snowboarding above Gudauri, with wide bowls, reliable Caucasus snow, and uncrowded slopes by European standards.',
      },
      {
        icon: 'calendar', months: 'Year-round', accent: 'neutral',
        title: 'Mtskheta & Day Trips',
        desc: 'Mtskheta, Ananuri, and Georgian Military Highway day trips run all year, weather permitting — a perfect add-on to any Georgia itinerary.',
      },
    ],
    practical: [
      {
        icon: 'mountainSnow', title: 'High altitude',
        desc: 'Stepantsminda sits ~1,740 m, Gergeti ~2,170 m, and Mount Kazbek 5,054 m. Acclimatize properly before any summit attempt.',
      },
      {
        icon: 'thermometer', title: 'Weather changes fast',
        desc: 'Bring warm layers even in summer — Gergeti can be cold and cloudy when Tbilisi is hot. Conditions shift quickly above 2,000 m.',
      },
      {
        icon: 'alert', title: 'Military Highway closures',
        desc: 'The Georgian Military Highway can close temporarily during heavy winter snow. Always check conditions before setting out.',
      },
      {
        icon: 'car', title: 'Seasonal 4×4 valleys',
        desc: 'Khevsureti and the high valleys are reached only by 4×4 and are open in summer. Abano Pass and similar routes need a capable vehicle.',
      },
    ],
    customTripHeading: 'Want to explore Mtskheta-Mtianeti your way?',
    customTripBody: "Tell us what you'd love to see and we'll shape a private itinerary — monasteries, summits, or remote valleys, at your pace.",
  },
  {
    slug: 'imereti',
    name: 'Imereti',
    adminName: 'Imereti',
    tagline: 'Caves, canyons, and the heart of ancient Colchis.',
    heroImage: '/images/martvili.jpg',
    eyebrow: 'Region · Western Georgia',
    metaTitle: 'Imereti Tours & Caving in Georgia | Adventure Experts Georgia',
    metaDescription: 'Explore Imereti — Georgia\'s caving country. Prometheus & Sataplia caves, Okatse Canyon, Tskaltubo and Colchis heritage from Kutaisi. Plan a custom Imereti trip.',
    intro: {
      heading: "Georgia's Caving Country",
      body: "Imereti is western Georgia's green, low-lying heartland, wrapped around Kutaisi — once the capital of the legendary kingdom of Colchis, and today the country's western gateway with its own international airport. Where the high Caucasus pulls travellers north, Imereti's drama runs underground and along the canyon's edge. This is Georgia's caving country: the vast illuminated chambers of Prometheus, the dinosaur footprints and glass-floored forest platform at Sataplia, and the steel walkway that clings to the cliffs above Okatse Canyon. Lower and milder than the mountain regions, Imereti stays green and walkable across far more of the year — and its caves hold a steady 14°C whatever the weather does above ground.",
    },
    heroFacts: [
      { icon: 'mappin',   text: 'Hub: Kutaisi + western gateway airport' },
      { icon: 'compass',  text: 'Prometheus & Sataplia show caves' },
      { icon: 'sun',      text: 'Green & accessible year-round' },
    ],
    quickFacts: [
      { icon: 'landmark',  label: 'Base town',     value: 'Kutaisi (~200 m)' },
      { icon: 'plane',     label: 'Getting there', value: "Kutaisi Int'l Airport; ~3.5–4 h from Tbilisi" },
      { icon: 'mountain',  label: 'Terrain',       value: 'Karst limestone, lowland valleys, subtropical forest' },
      { icon: 'calendar',  label: 'Best season',   value: 'Spring & Autumn · Caves run year-round' },
      { icon: 'gauge',     label: 'Difficulty',    value: 'Easy–moderate; family-friendly' },
      { icon: 'compass',   label: 'Main activities', value: 'Caving, Canyoning, Trekking & Hiking' },
      { icon: 'clock',     label: 'Ideal length',  value: 'Day trips to 3–4 day multi-stop tours' },
      { icon: 'route',     label: 'Pairs with',    value: 'Samegrelo, Svaneti, Racha' },
    ],
    highlights: [
      {
        icon: 'compass', tag: 'Show Cave',
        title: 'Prometheus Cave (Kumistavi)',
        desc: 'A kilometre-plus of illuminated limestone halls, stalactites and underground rivers — with an optional boat ride out through a flooded gallery.',
        image: '/images/tours/jairph-Edx0NpJ29fQ-unsplash.jpg',
        href: '/en/tours?region=Imereti',
      },
      {
        icon: 'mountain', tag: 'Nature Reserve',
        title: 'Sataplia Nature Reserve',
        desc: 'Real preserved dinosaur footprints, a compact show cave, and a glass viewing platform jutting over the subtropical forest canopy.',
        image: '/images/tours/nadav-fima-ULn5jbPuHx8-unsplash.jpg',
        href: '/en/tours?region=Imereti',
      },
      {
        icon: 'route', tag: 'Canyon Walk',
        title: 'Okatse Canyon & Kinchkha Falls',
        desc: 'A 700 m steel walkway pinned to a sheer cliff above the Dadiani gorge, with the multi-tier Kinchkha Waterfall nearby.',
        image: '/images/tours/wander-creative-6i3O_w7wOyE-unsplash.jpg',
        href: '/en/tours?region=Imereti',
      },
      {
        icon: 'castle', tag: 'Photography',
        title: 'Tskaltubo',
        desc: 'A faded Soviet spa town of grand, half-abandoned sanatoriums — a magnet for photographers and urban explorers.',
        image: '/images/tours/nika-tchokhonelidze-Ms_p0I5DQSM-unsplash.jpg',
        href: '/en/tours?region=Imereti',
      },
      {
        icon: 'landmark', tag: 'Landmark',
        title: 'Katskhi Pillar',
        desc: 'A 40 m limestone monolith topped by a tiny working monastery, near the cable-car mining town of Chiatura.',
        image: '/images/tours/k-t-xVLdFIxcDCc-unsplash.jpg',
        href: '/en/tours?region=Imereti',
      },
      {
        icon: 'landmark', tag: 'UNESCO',
        title: 'Gelati Monastery (UNESCO)',
        desc: 'A 12th-century monastery and medieval academy on the hills above Kutaisi, with luminous gold mosaics.',
        image: '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg',
        href: '/en/tours?region=Imereti',
      },
    ],
    tours: [
      {
        name: 'Wild Caving Experience in Melouri Cave',
        hook: 'Wade an underground river by headlamp into a genuine wild cave near Kutaisi.',
        duration: 'Day trip',
        regionActivity: 'Imereti · Caving',
        difficulty: 'Moderate',
        isNew: true,
        badge: 'New',
        image: '/images/tours/caving/melouri-river-passage.jpg',
        href: '/en/tours/melouri-cave-caving',
      },
      {
        name: 'Canyoning Day Adventure in Imereti',
        hook: 'Rappel live waterfalls, slide natural chutes and jump into cold green pools.',
        duration: 'Day trip',
        regionActivity: 'Imereti · Canyoning',
        difficulty: 'Moderate',
        isNew: true,
        badge: 'New',
        image: '/images/tours/canyoning/canyoning-waterfall-rappel.jpg',
        href: '/en/tours/canyoning-day-adventure',
      },
    ],
    toursViewAllHref: '/en/tours?region=Imereti',
    activities: [
      { icon: 'compass',  label: 'Caving',           href: '/en/tours?activity=caving' },
      { icon: 'mountain', label: 'Trekking & Hiking', href: '/en/tours?activity=trekking' },
      { icon: 'route',    label: 'Canyoning',         href: '/en/tours?activity=canyoning' },
      { icon: 'gauge',    label: 'Biking',            href: '/en/tours?activity=biking' },
      { icon: 'mappin',   label: 'Mixed Tours',       href: '/en/tours?activity=mixed' },
    ],
    mapPins: [
      { name: 'Kutaisi',         left: '52%', top: '64%', accent: true },
      { name: 'Prometheus Cave', left: '39%', top: '30%' },
      { name: 'Sataplia',        left: '47%', top: '42%' },
      { name: 'Okatse Canyon',   left: '27%', top: '26%' },
      { name: 'Katskhi Pillar',  left: '75%', top: '38%' },
    ],
    seasons: [
      {
        icon: 'sun', months: 'Apr–Jun & Sep–Oct', accent: 'warm',
        title: 'Best Overall',
        desc: 'Green, mild and walkable — waterfalls are full, the canyons are at their most photogenic, and the light is golden in autumn.',
      },
      {
        icon: 'calendar', months: 'Jul–Aug', accent: 'neutral',
        title: 'Warm & Lush',
        desc: 'Warmest and greenest, but west Georgia is properly rainy — expect heavy downpours alongside the greenery. Still great cave weather.',
      },
      {
        icon: 'compass', months: 'Year-round', accent: 'cool',
        title: 'Cave Season',
        desc: 'Prometheus and Sataplia hold a constant ~14°C and run as genuine all-season products — ideal when the weather above ground is grey.',
      },
    ],
    practical: [
      {
        icon: 'thermometer', title: 'Pack a waterproof',
        desc: "West Georgia is properly rainy — bring a shell jacket even in summer. The greenness comes at a price.",
      },
      {
        icon: 'mountainSnow', title: 'Cave-ready layers',
        desc: 'Caves sit at ~14°C year-round and can be slippery. Bring a warm layer and grippy footwear regardless of season.',
      },
      {
        icon: 'clock', title: 'Beat the tour buses',
        desc: 'Prometheus and Sataplia fill with coach groups around midday. Go first thing or late afternoon for a far quieter experience.',
      },
      {
        icon: 'car', title: 'Road conditions vary',
        desc: 'Main roads around Kutaisi are smooth; the run out to Katskhi Pillar and Chiatura is rougher and benefits from a capable vehicle.',
      },
    ],
    customTripHeading: 'Want to explore Imereti your way?',
    customTripBody: "Tell us what pulls you — caves, canyons, Soviet ruins, or UNESCO heritage — and we'll design a private Imereti itinerary that fits your pace.",
  },

  // ── SVANETI ─────────────────────────────────────────────────────────────────
  {
    slug: 'samegrelo',
    name: 'Svaneti',
    adminName: 'Svaneti',
    tagline: 'Glaciers, medieval towers and the roof of the Caucasus.',
    heroImage: '/images/svaneti.jpg',
    eyebrow: 'Region · Upper Svaneti',
    metaTitle: 'Svaneti Trekking & Climbing Tours | Adventure Experts Georgia',
    metaDescription: 'Explore Svaneti — Georgia\'s alpine crown. Glacier treks, Mestia to Ushguli, Tetnuldi summit and medieval tower villages in the high Caucasus. Plan your Svaneti trip.',
    intro: {
      heading: 'The Alpine Crown of Georgia',
      body: "Svaneti sits at the top of western Georgia, a high glaciated world of medieval tower villages, ancient churches and Caucasus peaks above 4,000 m. The region is famous for the Mestia–Ushguli trail — one of the greatest multi-day treks in Europe — but rewards every type of visitor: day-hikers with panoramic ridge walks, climbers with virgin granite walls, and photographers with villages that look unchanged since the 12th century. Summer brings wildflower meadows and open high passes; winter turns the valley into a serious backcountry skiing destination under the Ushba massif.",
    },
    heroFacts: [
      { icon: 'mountain',     text: 'Peaks above 4,000 m' },
      { icon: 'mappin',       text: 'Mestia — gateway town' },
      { icon: 'calendar',     text: 'Best: Jun–Sep & Dec–Mar skiing' },
    ],
    quickFacts: [
      { icon: 'mappin',      label: 'Base town',     value: 'Mestia (~1,500 m)' },
      { icon: 'plane',       label: 'Getting there', value: 'Fly Tbilisi→Mestia (50 min) or 6–7 h minibus' },
      { icon: 'mountain',    label: 'Terrain',       value: 'Glaciated alpine: peaks, moraines, high passes' },
      { icon: 'calendar',    label: 'Best season',   value: 'Jun–Sep trekking · Dec–Mar skiing' },
      { icon: 'mountainSnow',label: 'Main activities', value: 'Trekking, Summit Experience, Climbing, Winter' },
      { icon: 'gauge',       label: 'Difficulty',    value: 'Moderate to Challenging' },
      { icon: 'clock',       label: 'Ideal length',  value: '4–10 days' },
      { icon: 'route',       label: 'Highlight trek', value: 'Mestia → Ushguli (4 days)' },
    ],
    highlights: [
      {
        icon: 'mountain', tag: 'Iconic Trek',
        title: 'Mestia to Ushguli',
        desc: 'Four days of glaciers, high passes and tower villages — arguably the finest multi-day walk in the Caucasus.',
        image: '/images/tours/johannes-andersson-pmtllkyavOk-unsplash.jpg',
        href: '/en/tours?region=Svaneti',
      },
      {
        icon: 'mountainSnow', tag: 'Summit',
        title: 'Mount Tetnuldi (4,858 m)',
        desc: 'A guided high-altitude ascent above the Svan glaciers — technical but achievable for experienced alpinists.',
        image: '/images/tours/tomas-malik-EtvlvO4cF5I-unsplash.jpg',
        href: '/en/tours?region=Svaneti',
      },
      {
        icon: 'snowflake', tag: 'Winter',
        title: 'Ushba Splitboard & Freeride',
        desc: 'Ski touring and freeride lines beneath Ushba — one of the most dramatic winter backdrops in Europe.',
        image: '/images/tours/darya-tryfanava-rY1P25plAYg-unsplash.jpg',
        href: '/en/tours?region=Svaneti',
      },
      {
        icon: 'tower', tag: 'Medieval',
        title: 'Svan Tower Villages',
        desc: 'Ushguli, Chazhashi, Mestia — clusters of 12th-century defensive towers still inhabited by Svan families.',
        image: '/images/tours/vasily-ledovsky-7Nl6vSXdDhE-unsplash.jpg',
        href: '/en/tours?region=Svaneti',
      },
      {
        icon: 'mountain', tag: 'Glacier Trek',
        title: 'Svaneti Glacier Crossing',
        desc: 'Cross active glaciers between the Enguri basin and the Rioni headwaters, sleeping in high-altitude meadow camps.',
        image: '/images/tours/vasily-ledovsky-7Nl6vSXdDhE-unsplash.jpg',
        href: '/en/tours?region=Svaneti',
      },
      {
        icon: 'mountainSnow', tag: 'Climbing',
        title: 'Chaukhi Towers',
        desc: 'Multi-pitch granite climbing on the dolomite-like spires of the Chaukhi massif, on the Svaneti–Kazbegi border.',
        image: '/images/tours/k-t-xVLdFIxcDCc-unsplash.jpg',
        href: '/en/tours?region=Svaneti',
      },
    ],
    tours: [
      {
        name: 'Ice and Towers, Svaneti',
        hook: 'Nine days of glaciers, medieval towers and high-altitude passes in the Caucasus crown.',
        duration: '9 days',
        regionActivity: 'Svaneti · Trekking & Hiking',
        difficulty: 'Moderate',
        isNew: true,
        badge: 'New',
        image: '/images/tours/ice-towers-hero.avif',
        href: '/en/tours/ice-and-towers-svaneti',
      },
      {
        name: 'Discover Georgia as a Local',
        hook: 'Ten days, one 4x4, six regions — cave cities, glacier valleys and villages the road forgot.',
        duration: '10 days',
        regionActivity: 'Multi-Region · Overlanding',
        difficulty: 'Moderate',
        isNew: true,
        badge: 'New',
        image: '/images/tours/overlanding/dg-04.jpg',
        href: '/en/tours/discover-georgia-as-a-local',
      },
    ],
    toursViewAllHref: '/en/tours?region=Svaneti',
    activities: [
      { icon: 'mountain',     label: 'Trekking & Hiking',  href: '/en/tours?activity=trekking' },
      { icon: 'mountainSnow', label: 'Summit Experience',  href: '/en/tours?activity=summit' },
      { icon: 'tower',        label: 'Climbing',           href: '/en/tours?activity=climbing' },
      { icon: 'snowflake',    label: 'Winter',             href: '/en/tours?activity=winter' },
    ],
    mapPins: [
      { name: 'Mestia',       left: '52%', top: '28%', accent: true },
      { name: 'Ushguli',      left: '34%', top: '22%' },
      { name: 'Tetnuldi',     left: '44%', top: '18%' },
      { name: 'Ushba',        left: '38%', top: '25%' },
      { name: 'Chaukhi',      left: '68%', top: '32%' },
    ],
    seasons: [
      {
        icon: 'sun', months: 'Jun–Sep', accent: 'warm',
        title: 'Trekking Season',
        desc: 'High passes open, glacier crossings are safe and wildflowers carpet the meadows. The classic window for Mestia–Ushguli and summit attempts.',
      },
      {
        icon: 'snowflake', months: 'Dec–Mar', accent: 'cool',
        title: 'Freeride & Ski Touring',
        desc: "Deep Caucasus snowpack and dramatic scenery make Svaneti one of Europe's most exciting winter backcountry destinations.",
      },
      {
        icon: 'calendar', months: 'Apr–May & Oct–Nov', accent: 'neutral',
        title: 'Shoulder Season',
        desc: 'Quieter and beautiful, but high passes may hold snow into May and close in late October — check conditions before committing to high routes.',
      },
    ],
    practical: [
      {
        icon: 'plane', title: 'Fly to Mestia',
        desc: "Van Air runs scheduled flights from Tbilisi to Mestia in ~50 minutes — a much better option than the 6–7 hour road if seats are available.",
      },
      {
        icon: 'mountainSnow', title: 'Altitude awareness',
        desc: 'Mestia sits at ~1,500 m; high passes and summits go above 3,500 m. Allow a day to acclimatise before attempting high routes.',
      },
      {
        icon: 'thermometer', title: 'Pack for cold nights',
        desc: 'Even in July, temperatures drop sharply after sunset at altitude. A warm layer and waterproof shell are essential on any multi-day route.',
      },
      {
        icon: 'car', title: 'Road to Ushguli',
        desc: 'The final stretch to Ushguli is 4×4 territory — remote and rough. Guided tours handle logistics; independent travellers need a capable vehicle.',
      },
    ],
    customTripHeading: 'Want to explore Svaneti your way?',
    customTripBody: "Tell us your pace — leisurely village-to-village or a full summit push — and we'll build a Svaneti itinerary exactly right for you.",
  },

  // ── SAMEGRELO ────────────────────────────────────────────────────────────────
  {
    slug: 'samegrelo-low',
    name: 'Samegrelo',
    adminName: 'Samegrelo',
    tagline: 'Ancient Colchis, emerald canyons and the Mingrelian lowlands.',
    heroImage: '/images/martvili.jpg',
    eyebrow: 'Region · Western Georgia',
    metaTitle: 'Samegrelo Tours — Martvili Canyon & Colchis Heritage | Adventure Experts Georgia',
    metaDescription: 'Discover Samegrelo — ancient Colchis and the Mingrelian heartland. Martvili Canyon boat trips, Enguri Dam, Nokalakevi fortress and the gateway to Svaneti.',
    intro: {
      heading: 'The Land of Ancient Colchis',
      body: "Samegrelo occupies the lowlands between the Colchis wetlands and the southern foothills of the Caucasus, historically the kingdom the Greeks called Colchis — land of the Golden Fleece. Today it's best known to visitors for the boat tours of Martvili Canyon, where a turquoise river has carved a cathedral-like gorge through the limestone, but the region runs much deeper: the ruins of Nokalakevi, the enormous Enguri Dam at the foot of the Svaneti range, and a rich Mingrelian food culture that many Georgians consider the country's finest.",
    },
    heroFacts: [
      { icon: 'mappin',   text: 'Hub: Zugdidi & Kutaisi gateway' },
      { icon: 'route',    text: 'Martvili Canyon boat tours' },
      { icon: 'calendar', text: 'Best: Apr–Oct' },
    ],
    quickFacts: [
      { icon: 'mappin',   label: 'Base town',     value: 'Zugdidi (~100 m)' },
      { icon: 'plane',    label: 'Getting there', value: '~4 h from Tbilisi; gateway to Svaneti' },
      { icon: 'mountain', label: 'Terrain',       value: 'Lowland river valleys, limestone gorges, wetlands' },
      { icon: 'calendar', label: 'Best season',   value: 'Apr–Oct; canyon at its best May–Jun' },
      { icon: 'gauge',    label: 'Difficulty',    value: 'Easy; family-friendly' },
      { icon: 'compass',  label: 'Main draw',     value: 'Martvili Canyon, Nokalakevi, Enguri' },
      { icon: 'clock',    label: 'Ideal length',  value: 'Day trip or overnight from Kutaisi / Mestia' },
      { icon: 'route',    label: 'Pairs with',    value: 'Imereti, Svaneti, Racha' },
    ],
    highlights: [
      {
        icon: 'route', tag: 'Canyon Boat',
        title: 'Martvili Canyon',
        desc: 'Glide a flat-bottomed boat through an emerald cathedral gorge — one of the most beautiful short excursions in all of Georgia.',
        image: '/images/tours/wander-creative-6i3O_w7wOyE-unsplash.jpg',
        href: '/en/tours?region=Imereti',
      },
      {
        icon: 'castle', tag: 'Ruins',
        title: 'Nokalakevi',
        desc: 'The sprawling ruins of the ancient Mingrelian capital Archaeopolis, with walls dating back to the 2nd century BC.',
        image: '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg',
        href: '/en/tours?region=Samegrelo',
      },
      {
        icon: 'mountain', tag: 'Dam & Gorge',
        title: 'Enguri Dam & Jvari Reservoir',
        desc: 'One of the tallest arch dams in the world, set at the dramatic entrance to the Enguri gorge with Svaneti peaks rising behind.',
        image: '/images/tours/vasily-ledovsky-7Nl6vSXdDhE-unsplash.jpg',
        href: '/en/tours?region=Samegrelo',
      },
      {
        icon: 'landmark', tag: 'History',
        title: 'Zugdidi & Dadiani Palace',
        desc: 'The former palace of the Mingrelian princes, housing a museum with one of only three death masks of Napoleon Bonaparte.',
        image: '/images/tours/nika-tchokhonelidze-Ms_p0I5DQSM-unsplash.jpg',
        href: '/en/tours?region=Samegrelo',
      },
      {
        icon: 'compass', tag: 'Wildlife',
        title: 'Kolkheti National Park',
        desc: 'The Ramsar-listed Colchis wetlands — migratory bird habitat and remnant of the ancient Colchic forest, on the Black Sea littoral.',
        image: '/images/tours/jason-gardner-LU-o3CbeZhU-unsplash.jpg',
        href: '/en/tours?region=Samegrelo',
      },
      {
        icon: 'route', tag: 'Gateway',
        title: 'Road to Svaneti',
        desc: 'The Enguri gorge road is itself a journey — cliffs, tunnels and waterfalls lead up to the Svan villages above the reservoir.',
        image: '/images/tours/johannes-andersson-pmtllkyavOk-unsplash.jpg',
        href: '/en/tours?region=Samegrelo',
      },
    ],
    tours: [],
    toursViewAllHref: '/en/tours?region=Samegrelo',
    activities: [
      { icon: 'route',    label: 'Canyoning',         href: '/en/tours?activity=canyoning' },
      { icon: 'mountain', label: 'Trekking & Hiking', href: '/en/tours?activity=trekking' },
      { icon: 'compass',  label: 'Mixed Tours',       href: '/en/tours?activity=mixed' },
    ],
    mapPins: [
      { name: 'Zugdidi',          left: '48%', top: '42%', accent: true },
      { name: 'Martvili Canyon',  left: '60%', top: '56%' },
      { name: 'Nokalakevi',       left: '38%', top: '50%' },
      { name: 'Enguri Dam',       left: '52%', top: '28%' },
      { name: 'Kolkheti Park',    left: '26%', top: '66%' },
    ],
    seasons: [
      {
        icon: 'sun', months: 'Apr–Jun', accent: 'warm',
        title: 'Peak Canyon Season',
        desc: "The canyon water is highest and most dramatic in spring — brilliant emerald colour, full waterfalls, and the gorge at its most photogenic.",
      },
      {
        icon: 'calendar', months: 'Jul–Oct', accent: 'neutral',
        title: 'Summer & Autumn',
        desc: 'Warm and green throughout summer. Water levels drop slightly in late summer but the canyon remains beautiful. Autumn brings golden forest.',
      },
      {
        icon: 'mountain', months: 'Nov–Mar', accent: 'cool',
        title: 'Quiet Season',
        desc: 'Mild and quiet; most canyon tours run year-round. A good time to visit Zugdidi and Nokalakevi without the summer crowds.',
      },
    ],
    practical: [
      {
        icon: 'route', title: 'Canyon boat safety',
        desc: 'Life jackets are provided. The canyon walk sections involve steps and uneven rock — grippy footwear is more useful than sandals.',
      },
      {
        icon: 'car', title: 'Easy to combine',
        desc: 'Martvili is 90 minutes from Kutaisi and 45 from Zugdidi — straightforward to bundle with Imereti caves or a Svaneti trip.',
      },
      {
        icon: 'thermometer', title: 'Mingrelian food',
        desc: "Don't leave without eating in a local home. Samegrelo has its own distinct cuisine — spicier than the rest of Georgia, with dishes unique to the region.",
      },
      {
        icon: 'mappin', title: 'Martvili vs Okatse',
        desc: 'Martvili (Samegrelo) = boat canyon. Okatse (Imereti) = cliff walkway. Both are day-trip accessible from Kutaisi and pair well together.',
      },
    ],
    customTripHeading: 'Want to explore Samegrelo your way?',
    customTripBody: "Canyon boat trips, ancient ruins, Colchis wetlands or the road north into Svaneti — tell us what draws you and we'll plan it.",
  },

  // ── KAKHETI ──────────────────────────────────────────────────────────────────
  {
    slug: 'kakheti',
    name: 'Kakheti',
    adminName: 'Kakheti',
    tagline: 'Wine, ancient monasteries and the wide Alazani plain.',
    heroImage: '/images/tours/gio-chanturia-2aGoA1zcWfI-unsplash.jpg',
    eyebrow: 'Region · Eastern Georgia',
    metaTitle: "Kakheti Wine & Adventure Tours | Adventure Experts Georgia",
    metaDescription: "Explore Kakheti — Georgia's wine country. Biking through vineyards, overlanding to Vashlovani's canyons, Sighnaghi and David Gareja. Plan your Kakheti trip.",
    intro: {
      heading: "Georgia's Wine Country",
      body: "Kakheti stretches across eastern Georgia, cupped between the Greater Caucasus to the north and the Gombori Range to the south, opening onto the wide, vine-carpeted Alazani plain. It is the cradle of Georgian wine — qvevri winemaking here predates any other tradition by 8,000 years and is a UNESCO Intangible Cultural Heritage. But Kakheti is far more than wine: the canyon labyrinths of Vashlovani in the far south-east push deep into semi-desert on the Azerbaijani border, and David Gareja's cave monastery complex spills across a mesa above the Iori steppe. Compact enough to explore in a few days, rich enough to spend a week.",
    },
    heroFacts: [
      { icon: 'mappin',   text: 'Hub: Telavi & Sighnaghi' },
      { icon: 'compass',  text: '8,000-year winemaking tradition' },
      { icon: 'calendar', text: 'Best: Apr–Jun & Sep–Nov (harvest)' },
    ],
    quickFacts: [
      { icon: 'mappin',   label: 'Base towns',    value: 'Telavi (~550 m) · Sighnaghi (~800 m)' },
      { icon: 'plane',    label: 'Getting there', value: '~2 h from Tbilisi by road' },
      { icon: 'mountain', label: 'Terrain',       value: 'Vine plains, river valleys, semi-desert canyons' },
      { icon: 'calendar', label: 'Best season',   value: 'Apr–Jun & Sep–Nov (Rtveli harvest)' },
      { icon: 'gauge',    label: 'Difficulty',    value: 'Easy to Moderate' },
      { icon: 'compass',  label: 'Main activities', value: 'Biking, Mixed Tours, Overlanding' },
      { icon: 'clock',    label: 'Ideal length',  value: '2–5 days' },
      { icon: 'route',    label: 'Pairs with',    value: 'Tbilisi, Shida Kartli, Mtskheta' },
    ],
    highlights: [
      {
        icon: 'compass', tag: 'Wine Heritage',
        title: 'Alazani Valley Vineyards',
        desc: 'The heartland of Georgian wine: Tsinandali, Kindzmarauli, Mukuzani — qvevri cellars and family wineries along a vine-carpeted plain.',
        image: '/images/tours/gio-chanturia-2aGoA1zcWfI-unsplash.jpg',
        href: '/en/tours?region=Kakheti',
      },
      {
        icon: 'landmark', tag: 'UNESCO',
        title: 'David Gareja Cave Monastery',
        desc: 'A 6th-century monastery complex carved into a remote mesa on the border with Azerbaijan — extraordinary frescoes, vast steppe views.',
        image: '/images/tours/jason-gardner-LU-o3CbeZhU-unsplash.jpg',
        href: '/en/tours?region=Kakheti',
      },
      {
        icon: 'castle', tag: 'Old Town',
        title: 'Sighnaghi',
        desc: "The walled 'city of love' above the Alazani plain, with the longest fortress wall in Georgia and sweeping views to the Greater Caucasus.",
        image: '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg',
        href: '/en/tours?region=Kakheti',
      },
      {
        icon: 'route', tag: 'Overlanding',
        title: 'Vashlovani Protected Areas',
        desc: 'Lunar canyons, mud volcanoes and semi-desert steppe on the Azeri border — 4×4 overlanding through one of Georgia\'s wildest landscapes.',
        image: '/images/tours/jason-gardner-LU-o3CbeZhU-unsplash.jpg',
        href: '/en/tours?region=Kakheti',
      },
      {
        icon: 'mountain', tag: 'Hiking',
        title: 'Tusheti via Abano Pass',
        desc: 'The mountain road over 2,926 m Abano Pass into Tusheti is one of the most dramatic drives in the Caucasus — summer 4×4 only.',
        image: '/images/tours/iman-gozal-5iQWgow3_S0-unsplash.jpg',
        href: '/en/tours?region=Kakheti',
      },
      {
        icon: 'landmark', tag: 'Monastery',
        title: 'Alaverdi & Telavi',
        desc: 'The 11th-century Alaverdi Cathedral — one of the tallest medieval buildings in Georgia — and the plane-tree-shaded streets of Telavi.',
        image: '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg',
        href: '/en/tours?region=Kakheti',
      },
    ],
    tours: [
      {
        name: 'Vashlovani Semi-Desert Overland Expedition',
        hook: 'Canyons, mud volcanoes and big skies on the Azeri border.',
        duration: '7 days',
        regionActivity: 'Kakheti · Overlanding',
        difficulty: 'Moderate',
        isNew: true,
        badge: 'New',
        image: '/images/tours/overlanding/dg-05.jpg',
        href: '/en/tours/vashlovani-overland-expedition',
      },
      {
        name: 'Enduro MTB Expedition in Tusheti',
        hook: 'Big-mountain enduro beyond the Abano Pass — remote villages and endless descents.',
        duration: '4 days',
        regionActivity: 'Tusheti (via Kakheti) · Biking',
        difficulty: 'Challenging',
        isNew: true,
        badge: 'New',
        image: '/images/tours/biking/mtb-group.jpg',
        href: '/en/tours/enduro-mtb-tusheti',
      },
      {
        name: 'Cycling Expedition in Tusheti',
        hook: '6-day gravel endurance expedition — big climbs, remote villages, full board.',
        duration: '6 days',
        regionActivity: 'Tusheti (via Kakheti) · Biking',
        difficulty: 'Challenging',
        isNew: true,
        badge: 'New',
        image: '/images/tours/biking/mtb-open-road.jpg',
        href: '/en/tours/cycling-expedition-tusheti',
      },
    ],
    toursViewAllHref: '/en/tours?region=Kakheti',
    activities: [
      { icon: 'gauge',    label: 'Biking',           href: '/en/tours?activity=biking' },
      { icon: 'compass',  label: 'Mixed Tours',      href: '/en/tours?activity=mixed' },
      { icon: 'car',      label: 'Overlanding',      href: '/en/tours?activity=overlanding' },
      { icon: 'mountain', label: 'Trekking & Hiking', href: '/en/tours?activity=trekking' },
    ],
    mapPins: [
      { name: 'Telavi',           left: '46%', top: '34%', accent: true },
      { name: 'Sighnaghi',        left: '66%', top: '52%' },
      { name: 'Alaverdi',         left: '40%', top: '26%' },
      { name: 'David Gareja',     left: '72%', top: '74%' },
      { name: 'Vashlovani',       left: '82%', top: '82%' },
    ],
    seasons: [
      {
        icon: 'sun', months: 'Sep–Nov', accent: 'warm',
        title: 'Harvest Season (Rtveli)',
        desc: "The Rtveli grape harvest in September–October is the most atmospheric time in Kakheti — families, feasting and wine pressing everywhere.",
      },
      {
        icon: 'calendar', months: 'Apr–Jun', accent: 'neutral',
        title: 'Spring',
        desc: 'Green, mild and blooming. A perfect time for vineyard cycling, Sighnaghi walks and the Alazani plain at its freshest.',
      },
      {
        icon: 'thermometer', months: 'Jul–Aug', accent: 'cool',
        title: 'Hot Summer',
        desc: 'Kakheti can hit 38°C in midsummer. Vashlovani overlanding and early-morning bike rides are the best options. Vineyards are lush.',
      },
    ],
    practical: [
      {
        icon: 'car', title: 'Vashlovani is 4×4 only',
        desc: 'The protected areas in the far south-east require a high-clearance 4×4. Our tours handle transport — independent travellers need a capable vehicle.',
      },
      {
        icon: 'thermometer', title: 'Summer heat',
        desc: 'July–August gets very hot on the Alazani plain. Start outdoor activities early; afternoons are best spent in a cellar tasting qvevri wine.',
      },
      {
        icon: 'calendar', title: 'Book harvest season early',
        desc: "Rtveli (September–October) is the most popular time in Kakheti. Accommodation and tours book out weeks in advance — plan early.",
      },
      {
        icon: 'compass', title: 'David Gareja border note',
        desc: 'Parts of the David Gareja complex lie on the contested Georgia–Azerbaijan border. Access can change; verify current conditions before visiting.',
      },
    ],
    customTripHeading: 'Want to explore Kakheti your way?',
    customTripBody: "Vineyard cycling, canyon overlanding, monastery hikes or harvest feasting — tell us what draws you and we'll build a Kakheti itinerary around it.",
  },

  // ── RACHA-LECHKHUMI ──────────────────────────────────────────────────────────
  {
    slug: 'racha-lechkhumi',
    name: 'Racha-Lechkhumi',
    adminName: 'Racha-Lechkhumi',
    tagline: "Georgia's quiet alpine heartland.",
    heroImage: '/images/tours/nadav-fima-ULn5jbPuHx8-unsplash.jpg',
    eyebrow: 'Region · Central Caucasus',
    metaTitle: 'Racha-Lechkhumi Trekking & Overlanding | Adventure Experts Georgia',
    metaDescription: 'Explore Racha-Lechkhumi — Georgia\'s quietest alpine region. Trekking to Black Rock Lake, the Racha wine villages and the Caucasus ridge. Plan a custom trip.',
    intro: {
      heading: 'The Quiet Alpine Heartland',
      body: "Racha-Lechkhumi is Georgia's least-visited mountain region and arguably its most rewarding for those who seek it out. Tucked between Svaneti and Imereti, it rises from the Rioni gorge into high alpine meadows and Caucasus ridgelines that few outsiders ever reach. The villages here make their own wine from the rare Alexandrouli and Mujuretuli grapes — the source of semi-sweet Khvanchkara, a wine so prized Stalin is said to have drunk it exclusively. Trails lead to mirror-calm alpine lakes, the peaks of the Racha range, and remote villages where guesthouses feel like staying with family.",
    },
    heroFacts: [
      { icon: 'mountain', text: 'Remote alpine trails & lakes' },
      { icon: 'mappin',   text: 'Ambrolauri — gateway town' },
      { icon: 'calendar', text: 'Best: May–Oct' },
    ],
    quickFacts: [
      { icon: 'mappin',   label: 'Base town',     value: 'Ambrolauri (~500 m)' },
      { icon: 'plane',    label: 'Getting there', value: '~4 h from Tbilisi; ~2 h from Kutaisi' },
      { icon: 'mountain', label: 'Terrain',       value: 'River gorges rising to alpine ridges and peaks' },
      { icon: 'calendar', label: 'Best season',   value: 'May–Oct; high trails clear from Jun' },
      { icon: 'gauge',    label: 'Difficulty',    value: 'Easy (day hikes) to Moderate (multi-day)' },
      { icon: 'compass',  label: 'Main activities', value: 'Trekking & Hiking, Overlanding' },
      { icon: 'clock',    label: 'Ideal length',  value: '2–4 days' },
      { icon: 'route',    label: 'Pairs with',    value: 'Svaneti, Imereti, Mtskheta-Mtianeti' },
    ],
    highlights: [
      {
        icon: 'mountain', tag: 'Alpine Lake',
        title: 'Black Rock Lake (Shaori)',
        desc: 'A mirror-calm alpine lake at ~2,000 m, reached by an easy forest loop through ancient beech woodland.',
        image: '/images/tours/nadav-fima-ULn5jbPuHx8-unsplash.jpg',
        href: '/en/tours?region=Racha',
      },
      {
        icon: 'compass', tag: 'Wine Villages',
        title: 'Khvanchkara & Ambrolauri',
        desc: "The village of Khvanchkara produces one of Georgia's most coveted semi-sweet wines from high-altitude Alexandrouli grapes.",
        image: '/images/tours/gio-chanturia-2aGoA1zcWfI-unsplash.jpg',
        href: '/en/tours?region=Racha',
      },
      {
        icon: 'mountain', tag: 'Ridge Trek',
        title: 'Racha Caucasus Ridge',
        desc: 'Long-distance trails traverse the southern Caucasus ridgeline, with wide views into both Racha and the Rioni valley below.',
        image: '/images/tours/vasily-ledovsky-7Nl6vSXdDhE-unsplash.jpg',
        href: '/en/tours?region=Racha',
      },
      {
        icon: 'castle', tag: 'Historic',
        title: 'Nikortsminda Cathedral',
        desc: 'A perfectly preserved 11th-century cathedral in a quiet village, with some of the most intricate stone carving in all of Georgia.',
        image: '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg',
        href: '/en/tours?region=Racha',
      },
      {
        icon: 'car', tag: 'Overlanding',
        title: 'Shaori Reservoir & Gorges',
        desc: 'The Rioni gorge and Shaori Reservoir make for spectacular 4×4 driving through a landscape of cliffs and ancient villages.',
        image: '/images/tours/jason-gardner-LU-o3CbeZhU-unsplash.jpg',
        href: '/en/tours?region=Racha',
      },
      {
        icon: 'landmark', tag: 'Hidden Gem',
        title: 'Ghebi & Utsera',
        desc: 'Remote Racha villages where the valley narrows and the peaks close in — the true edge of the accessible Caucasus.',
        image: '/images/tours/iman-gozal-5iQWgow3_S0-unsplash.jpg',
        href: '/en/tours?region=Racha',
      },
    ],
    tours: [],
    toursViewAllHref: '/en/tours?region=Racha',
    activities: [
      { icon: 'mountain', label: 'Trekking & Hiking', href: '/en/tours?activity=trekking' },
      { icon: 'car',      label: 'Overlanding',       href: '/en/tours?activity=overlanding' },
      { icon: 'compass',  label: 'Mixed Tours',       href: '/en/tours?activity=mixed' },
    ],
    mapPins: [
      { name: 'Ambrolauri',      left: '50%', top: '50%', accent: true },
      { name: 'Black Rock Lake', left: '36%', top: '28%' },
      { name: 'Khvanchkara',     left: '42%', top: '44%' },
      { name: 'Nikortsminda',    left: '58%', top: '58%' },
      { name: 'Ghebi',           left: '32%', top: '36%' },
    ],
    seasons: [
      {
        icon: 'sun', months: 'Jun–Sep', accent: 'warm',
        title: 'Alpine Season',
        desc: 'High trails open in June. The best months for ridge walks, lake hikes and overnight camping in the high meadows.',
      },
      {
        icon: 'calendar', months: 'Apr–May & Oct', accent: 'neutral',
        title: 'Shoulder Season',
        desc: 'Green and mild at valley level. High trails may still hold snow in May; October brings golden beech forest and a quieter atmosphere.',
      },
      {
        icon: 'snowflake', months: 'Nov–Mar', accent: 'cool',
        title: 'Winter',
        desc: 'High roads close with snow. Valley villages remain accessible and peaceful — a rare chance to see the region without any visitors.',
      },
    ],
    practical: [
      {
        icon: 'car', title: 'Roads improve as you rise',
        desc: 'Lower Racha roads are paved; the tracks to high lakes and remote villages benefit from a 4×4 or high-clearance vehicle.',
      },
      {
        icon: 'mountain', title: 'Trail marking is sparse',
        desc: 'Racha trails are less waymarked than Svaneti or Kazbegi. A local guide or experienced navigation are strongly recommended for multi-day routes.',
      },
      {
        icon: 'thermometer', title: 'Cool nights',
        desc: 'Even in August, nights at altitude in Racha get cold quickly. Sleeping bags rated to 0°C are advisable for high-camp nights.',
      },
      {
        icon: 'compass', title: 'Try the local wine',
        desc: "Khvanchkara semi-sweet is the flagship, but village families produce their own qvevri wine that rarely makes it beyond the valley — ask to try it.",
      },
    ],
    customTripHeading: 'Want to explore Racha your way?',
    customTripBody: "Alpine hikes, quiet wine villages or a 4×4 journey through the gorges — tell us what calls you and we'll design the perfect Racha itinerary.",
  },

  // ── ADJARA ───────────────────────────────────────────────────────────────────
  {
    slug: 'adjara',
    name: 'Adjara',
    adminName: 'Adjara',
    tagline: 'Black Sea coast to alpine ridges in a single afternoon.',
    heroImage: '/images/tours/zviad-pharsenadze--cIcGJX4Gxk-unsplash.jpg',
    eyebrow: 'Region · Black Sea Coast',
    metaTitle: 'Adjara Tours — Batumi, Hiking & Coast Adventures | Adventure Experts Georgia',
    metaDescription: "Explore Adjara — from Batumi's Black Sea promenade to the alpine highlands of Goderdzi Pass. Canyoning, trekking and coastal biking in Georgia's subtropical southwest.",
    intro: {
      heading: 'Coast and Mountains in One Region',
      body: "Adjara packs a remarkable range into a small area: Batumi, Georgia's subtropical coastal city, sits at sea level on the Black Sea with a famous boulevard, botanical garden and vibrant restaurant scene, while just 60 km inland the road climbs through tea plantations and hazelnut groves into the alpine highlands around Goderdzi Pass. Shuakhevi, Beshumi and the Adjara highlands are virtually unknown to international visitors — offering some of the most rewarding trekking and canyoning in western Georgia, all within striking distance of a beach.",
    },
    heroFacts: [
      { icon: 'mappin',   text: 'Hub: Batumi — Black Sea city' },
      { icon: 'mountain', text: 'Coast + alpine highlands' },
      { icon: 'calendar', text: 'Best: May–Oct' },
    ],
    quickFacts: [
      { icon: 'mappin',   label: 'Base town',     value: 'Batumi (sea level)' },
      { icon: 'plane',    label: 'Getting there', value: 'Batumi Airport (BUS) — direct international flights' },
      { icon: 'mountain', label: 'Terrain',       value: 'Subtropical coast + tea hills + alpine passes' },
      { icon: 'calendar', label: 'Best season',   value: 'May–Oct; coast year-round' },
      { icon: 'gauge',    label: 'Difficulty',    value: 'Easy (coast) to Moderate (highlands)' },
      { icon: 'compass',  label: 'Main activities', value: 'Trekking & Hiking, Canyoning, Biking' },
      { icon: 'clock',    label: 'Ideal length',  value: '2–5 days' },
      { icon: 'route',    label: 'Pairs with',    value: 'Guria, Imereti, Samtskhe-Javakheti' },
    ],
    highlights: [
      {
        icon: 'mappin', tag: 'City & Coast',
        title: 'Batumi & the Black Sea',
        desc: "Georgia's subtropical city — a seaside boulevard, Art Nouveau old town, botanical garden and some of the country's best restaurants.",
        image: '/images/tours/zviad-pharsenadze--cIcGJX4Gxk-unsplash.jpg',
        href: '/en/tours?region=Adjara',
      },
      {
        icon: 'route', tag: 'Canyoning',
        title: 'Makhuntseti & Kintrishi',
        desc: "The Makhuntseti waterfall and Kintrishi Protected Area — Adjara's most beautiful canyon country, a short drive from the coast.",
        image: '/images/tours/wander-creative-6i3O_w7wOyE-unsplash.jpg',
        href: '/en/tours?region=Adjara',
      },
      {
        icon: 'mountain', tag: 'Alpine Pass',
        title: 'Goderdzi Pass & Highlands',
        desc: 'The road over Goderdzi Pass (2,025 m) opens the Adjara highlands — subalpine meadows, village guesthouses and views across to Turkey.',
        image: '/images/tours/kim-cordenete-3hB68obZnHI-unsplash.jpg',
        href: '/en/tours?region=Adjara',
      },
      {
        icon: 'compass', tag: 'Culture',
        title: 'Tea Plantations & Villages',
        desc: "Adjara grows some of Georgia's last remaining tea. Terraced hillside plantations lead up to traditional Muslim-influenced highland villages.",
        image: '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg',
        href: '/en/tours?region=Adjara',
      },
      {
        icon: 'castle', tag: 'History',
        title: 'Gonio Fortress',
        desc: 'A Roman-era fortress on the Black Sea coast, believed to be the burial place of the Apostle Matthias — one of the oldest in the Caucasus.',
        image: '/images/tours/nika-tchokhonelidze-Ms_p0I5DQSM-unsplash.jpg',
        href: '/en/tours?region=Adjara',
      },
      {
        icon: 'mountain', tag: 'Trekking',
        title: 'Shuakhevi & Beshumi Trails',
        desc: 'Remote highland villages with trail networks into the Adjara range — some of the least-visited and most rewarding walking in western Georgia.',
        image: '/images/tours/vasily-ledovsky-7Nl6vSXdDhE-unsplash.jpg',
        href: '/en/tours?region=Adjara',
      },
    ],
    tours: [
      {
        name: 'Overland Adventure: Mystical Mountains of Guria & Adjara',
        hook: 'Misty cloud-kingdoms, hidden alpine lakes and a fortress above the clouds — off-road through Upper Adjara.',
        duration: '7 days',
        regionActivity: 'Adjara · Overlanding',
        difficulty: 'Moderate',
        isNew: true,
        badge: 'New',
        image: '/images/tours/overlanding/dg-06.jpg',
        href: '/en/tours/overland-guria-adjara',
      },
    ],
    toursViewAllHref: '/en/tours?region=Adjara',
    activities: [
      { icon: 'route',    label: 'Canyoning',         href: '/en/tours?activity=canyoning' },
      { icon: 'mountain', label: 'Trekking & Hiking', href: '/en/tours?activity=trekking' },
      { icon: 'gauge',    label: 'Biking',            href: '/en/tours?activity=biking' },
      { icon: 'compass',  label: 'Mixed Tours',       href: '/en/tours?activity=mixed' },
    ],
    mapPins: [
      { name: 'Batumi',          left: '24%', top: '70%', accent: true },
      { name: 'Makhuntseti',     left: '34%', top: '52%' },
      { name: 'Goderdzi Pass',   left: '54%', top: '40%' },
      { name: 'Shuakhevi',       left: '46%', top: '46%' },
      { name: 'Gonio',           left: '18%', top: '78%' },
    ],
    seasons: [
      {
        icon: 'sun', months: 'May–Sep', accent: 'warm',
        title: 'Coast & Highlands',
        desc: 'The coast is warm and swimmable; highland trails are open and the landscape is brilliantly green. Adjara is busiest and best in summer.',
      },
      {
        icon: 'calendar', months: 'Apr & Oct', accent: 'neutral',
        title: 'Shoulder Season',
        desc: "Quieter, with beautiful light. The coast is mild but not beach weather; the highlands are at their most dramatic in autumn colour.",
      },
      {
        icon: 'thermometer', months: 'Nov–Mar', accent: 'cool',
        title: 'Winter on the Coast',
        desc: 'Batumi stays mild and green — subtropical winter by Caucasus standards. Highland passes close with snow. Good for city breaks.',
      },
    ],
    practical: [
      {
        icon: 'plane', title: 'Own international airport',
        desc: 'Batumi Airport (BUS) has direct connections to several European and Middle Eastern cities — a useful alternative arrival point to Tbilisi.',
      },
      {
        icon: 'thermometer', title: 'Subtropical rain',
        desc: 'Adjara is the wettest part of Georgia — Batumi averages over 2,400 mm of rain a year. A waterproof is essential even in summer.',
      },
      {
        icon: 'mountain', title: 'Highland roads',
        desc: 'The road to Goderdzi and highland villages is paved but steep and winding. Some sections beyond Shuakhevi benefit from a 4×4 in wet conditions.',
      },
      {
        icon: 'mappin', title: 'Cultural blend',
        desc: "Adjara has a distinctive Muslim cultural heritage from Ottoman-era influence — different in feel from the rest of Georgia, and fascinating for it.",
      },
    ],
    customTripHeading: 'Want to explore Adjara your way?',
    customTripBody: "Beach and city, canyons and highlands, tea plantations and fortress ruins — tell us your mix and we'll design the perfect Adjara itinerary.",
  },

  // ── SAMTSKHE-JAVAKHETI ───────────────────────────────────────────────────────
  {
    slug: 'samtskhe-javakheti',
    name: 'Samtskhe-Javakheti',
    adminName: 'Samtskhe-Javakheti',
    tagline: 'Cave cities, sulfur springs and the fortress of Rabati.',
    heroImage: '/images/tours/jason-gardner-LU-o3CbeZhU-unsplash.jpg',
    eyebrow: 'Region · Southern Georgia',
    metaTitle: 'Samtskhe-Javakheti Tours — Vardzia & Borjomi | Adventure Experts Georgia',
    metaDescription: "Explore Samtskhe-Javakheti — Vardzia cave city, Borjomi mineral springs, Rabati Castle and the Javakheti plateau. Georgia's most dramatic southern landscapes.",
    intro: {
      heading: 'Cave Cities and the Southern Plateau',
      body: "Samtskhe-Javakheti spans the high southern plateau from the Turkish border to the Armenian highlands, encompassing some of Georgia's most dramatic and under-visited landscapes. Vardzia, the 12th-century cave city carved into a volcanic cliff face by Queen Tamar, is the headline attraction — a working monastery with hundreds of rooms cut into the rock. Nearby Borjomi is the source of Georgia's most famous mineral water and the starting point for the Borjomi–Kharagauli National Park, while the fortified Old Town of Akhaltsikhe and the Ottoman-era Rabati Castle add layers of history that stretch from medieval Georgia to the Russian Empire.",
    },
    heroFacts: [
      { icon: 'castle',   text: 'Vardzia — 12th-century cave city' },
      { icon: 'mappin',   text: 'Hub: Akhaltsikhe & Borjomi' },
      { icon: 'calendar', text: 'Best: May–Oct' },
    ],
    quickFacts: [
      { icon: 'mappin',   label: 'Base towns',    value: 'Akhaltsikhe & Borjomi (~700–1,000 m)' },
      { icon: 'plane',    label: 'Getting there', value: '~3–4 h from Tbilisi by road' },
      { icon: 'mountain', label: 'Terrain',       value: 'Volcanic plateau, river gorges, pine forest' },
      { icon: 'calendar', label: 'Best season',   value: 'May–Oct; Vardzia runs year-round' },
      { icon: 'gauge',    label: 'Difficulty',    value: 'Easy to Moderate' },
      { icon: 'compass',  label: 'Main draw',     value: 'Vardzia, Borjomi, Rabati, Javakheti' },
      { icon: 'clock',    label: 'Ideal length',  value: '2–4 days' },
      { icon: 'route',    label: 'Pairs with',    value: 'Adjara, Kvemo Kartli, Tbilisi' },
    ],
    highlights: [
      {
        icon: 'castle', tag: 'Cave City',
        title: 'Vardzia',
        desc: 'A 12th-century cave monastery complex carved into a volcanic cliff — hundreds of rooms, frescoes, a wine cellar and a working church still in use.',
        image: '/images/tours/nika-tchokhonelidze-Ms_p0I5DQSM-unsplash.jpg',
        href: '/en/tours?region=Samtskhe',
      },
      {
        icon: 'landmark', tag: 'Fortress',
        title: 'Rabati Castle & Akhaltsikhe',
        desc: 'A vast Ottoman-era fortress complex in the heart of Akhaltsikhe — mosque, synagogue, church and castle walls from centuries of layered rule.',
        image: '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg',
        href: '/en/tours?region=Samtskhe',
      },
      {
        icon: 'mountain', tag: 'National Park',
        title: 'Borjomi–Kharagauli NP',
        desc: "One of Europe's largest national parks — dense Caucasus forest with trail networks starting from the spa town of Borjomi.",
        image: '/images/tours/nadav-fima-ULn5jbPuHx8-unsplash.jpg',
        href: '/en/tours?region=Samtskhe',
      },
      {
        icon: 'compass', tag: 'Mineral Springs',
        title: 'Borjomi',
        desc: "The source of Georgia's most famous mineral water, a 19th-century spa town with a beautiful park and a Romanov-era summer palace.",
        image: '/images/tours/vasily-ledovsky-7Nl6vSXdDhE-unsplash.jpg',
        href: '/en/tours?region=Samtskhe',
      },
      {
        icon: 'mountain', tag: 'Plateau',
        title: 'Javakheti Highland Lakes',
        desc: 'The volcanic Javakheti plateau at 2,000 m+ holds a string of crater lakes — Paravani, Tabatskuri, Khanchali — and dramatic open skies.',
        image: '/images/tours/jason-gardner-LU-o3CbeZhU-unsplash.jpg',
        href: '/en/tours?region=Samtskhe',
      },
      {
        icon: 'landmark', tag: 'Cave Monastery',
        title: 'Khertvisi & Tmogvi',
        desc: 'Two fortress ruins in the Mtkvari gorge near Vardzia — dramatic cliff-top sites overlooking the river that shaped medieval southern Georgia.',
        image: '/images/tours/iman-gozal-5iQWgow3_S0-unsplash.jpg',
        href: '/en/tours?region=Samtskhe',
      },
    ],
    tours: [],
    toursViewAllHref: '/en/tours?region=Samtskhe',
    activities: [
      { icon: 'castle',   label: 'Mixed Tours',       href: '/en/tours?activity=mixed' },
      { icon: 'mountain', label: 'Trekking & Hiking', href: '/en/tours?activity=trekking' },
      { icon: 'car',      label: 'Overlanding',       href: '/en/tours?activity=overlanding' },
    ],
    mapPins: [
      { name: 'Akhaltsikhe',   left: '48%', top: '44%', accent: true },
      { name: 'Vardzia',       left: '36%', top: '62%' },
      { name: 'Borjomi',       left: '60%', top: '36%' },
      { name: 'Rabati Castle', left: '48%', top: '42%' },
      { name: 'Javakheti',     left: '68%', top: '64%' },
    ],
    seasons: [
      {
        icon: 'sun', months: 'May–Sep', accent: 'warm',
        title: 'Best Overall',
        desc: 'Warm and accessible throughout the region. The Javakheti plateau is green and open; national park trails are at their best.',
      },
      {
        icon: 'calendar', months: 'Apr & Oct', accent: 'neutral',
        title: 'Shoulder Season',
        desc: 'Vardzia and Rabati run year-round. Spring brings wildflowers to the Javakheti plateau; October is brilliant for forest colour in Borjomi.',
      },
      {
        icon: 'snowflake', months: 'Nov–Mar', accent: 'cool',
        title: 'Winter',
        desc: 'The plateau can be harsh and roads may close. Vardzia, Borjomi spa and Rabati Castle are reachable year-round from the main road.',
      },
    ],
    practical: [
      {
        icon: 'mountain', title: 'Altitude on the plateau',
        desc: "Javakheti sits above 2,000 m — cold even in July. Pack warm layers for plateau drives and lake visits even in mid-summer.",
      },
      {
        icon: 'car', title: 'Vardzia access',
        desc: 'The final approach to Vardzia is on a good road but narrow. Tours park below and walk up; comfortable shoes are important for the cave steps.',
      },
      {
        icon: 'compass', title: 'Minority communities',
        desc: "Javakheti has a large Armenian-speaking community and a distinctive culture. It's one of the most ethnically diverse corners of Georgia.",
      },
      {
        icon: 'route', title: 'Border proximity',
        desc: 'Samtskhe-Javakheti borders both Turkey and Armenia. Some areas near the borders have restricted access — a guide will know current rules.',
      },
    ],
    customTripHeading: 'Want to explore Samtskhe-Javakheti your way?',
    customTripBody: "Cave cities, spa towns, plateau lakes or fortress ruins — tell us what draws you south and we'll design your perfect itinerary.",
  },

  // ── GURIA ────────────────────────────────────────────────────────────────────
  {
    slug: 'guria',
    name: 'Guria',
    adminName: 'Guria',
    tagline: 'Green hills, ancient churches and the spirit of Mingrelian Georgia.',
    heroImage: '/images/tours/zviad-pharsenadze--cIcGJX4Gxk-unsplash.jpg',
    eyebrow: 'Region · Western Georgia',
    metaTitle: 'Guria Region — West Georgia | Adventure Experts Georgia',
    metaDescription: "Explore Guria — western Georgia's hidden green heartland. Rolling hills, ancient churches, hazelnut groves and local village life between the Black Sea and the highlands.",
    intro: {
      heading: 'The Green Hills of Western Georgia',
      body: "Guria is one of Georgia's smallest and least-visited regions, a compact green world of rolling hills and ancient churches tucked between Adjara and Samegrelo on the Black Sea coast. The Gurians are known across Georgia for their sharp wit and the highest voices in polyphonic chant — visitors who arrive expecting just a transit route discover instead a warm, genuine corner of the country where village guesthouses, dense hazelnut groves and hidden medieval churches reward those who stop and look.",
    },
    heroFacts: [
      { icon: 'mappin',   text: 'Hub: Ozurgeti' },
      { icon: 'mountain', text: 'Ancient churches & green hills' },
      { icon: 'calendar', text: 'Best: Apr–Oct' },
    ],
    quickFacts: [
      { icon: 'mappin',   label: 'Base town',     value: 'Ozurgeti (~80 m)' },
      { icon: 'plane',    label: 'Getting there', value: '~3.5 h from Tbilisi; between Kutaisi and Batumi' },
      { icon: 'mountain', label: 'Terrain',       value: 'Rolling foothills, hazelnut groves, coastal lowlands' },
      { icon: 'calendar', label: 'Best season',   value: 'Apr–Oct' },
      { icon: 'gauge',    label: 'Difficulty',    value: 'Easy' },
      { icon: 'compass',  label: 'Known for',     value: 'Polyphonic chant, warm hospitality, hidden churches' },
      { icon: 'clock',    label: 'Ideal length',  value: '1–2 days en route to Adjara or Imereti' },
      { icon: 'route',    label: 'Pairs with',    value: 'Adjara, Samegrelo, Imereti' },
    ],
    highlights: [
      {
        icon: 'landmark', tag: 'Medieval',
        title: 'Shemokmedi Monastery',
        desc: "A 12th-century monastery on a hilltop above the Supsa valley — one of Guria's oldest surviving churches, with fine stone carving.",
        image: '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg',
        href: '/en/tours?region=Guria',
      },
      {
        icon: 'compass', tag: 'Village Life',
        title: 'Ozurgeti & the Hazelnut Villages',
        desc: 'The market town of Ozurgeti and surrounding villages where hazelnut groves define the landscape and every family keeps a khinkali pot.',
        image: '/images/tours/gio-chanturia-2aGoA1zcWfI-unsplash.jpg',
        href: '/en/tours?region=Guria',
      },
      {
        icon: 'mountain', tag: 'Nature',
        title: 'Likhauri & Guria Highlands',
        desc: "The upper Guria valleys rise into genuine alpine country — far fewer visitors than Adjara or Imereti, with trails that feel truly discovered.",
        image: '/images/tours/vasily-ledovsky-7Nl6vSXdDhE-unsplash.jpg',
        href: '/en/tours?region=Guria',
      },
      {
        icon: 'mappin', tag: 'Coast',
        title: 'Ureki & the Black Sea Beaches',
        desc: "Guria's coast at Ureki has magnetic-sand beaches with a local spa tradition — gentler and less crowded than Batumi.",
        image: '/images/tours/zviad-pharsenadze--cIcGJX4Gxk-unsplash.jpg',
        href: '/en/tours?region=Guria',
      },
      {
        icon: 'castle', tag: 'History',
        title: 'Jumati Monastery',
        desc: 'An 11th-century fortress-monastery with views across the Rioni lowlands — less visited than the headline sites but beautifully preserved.',
        image: '/images/tours/nika-tchokhonelidze-Ms_p0I5DQSM-unsplash.jpg',
        href: '/en/tours?region=Guria',
      },
      {
        icon: 'compass', tag: 'Culture',
        title: 'Gurian Polyphony',
        desc: 'Guria has a distinctive choral tradition — the yodel-like Gurian song is a UNESCO-listed style unlike anything else in the Caucasus.',
        image: '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg',
        href: '/en/tours?region=Guria',
      },
    ],
    tours: [
      {
        name: 'Overland Adventure: Mystical Mountains of Guria & Adjara',
        hook: 'Misty cloud-kingdoms, hidden alpine lakes and a fortress above the clouds — off-road from Guria into Upper Adjara.',
        duration: '7 days',
        regionActivity: 'Guria · Overlanding',
        difficulty: 'Moderate',
        isNew: true,
        badge: 'New',
        image: '/images/tours/overlanding/dg-06.jpg',
        href: '/en/tours/overland-guria-adjara',
      },
    ],
    toursViewAllHref: '/en/tours?region=Guria',
    activities: [
      { icon: 'compass',  label: 'Mixed Tours',       href: '/en/tours?activity=mixed' },
      { icon: 'mountain', label: 'Trekking & Hiking', href: '/en/tours?activity=trekking' },
    ],
    mapPins: [
      { name: 'Ozurgeti',     left: '50%', top: '52%', accent: true },
      { name: 'Shemokmedi',   left: '44%', top: '38%' },
      { name: 'Ureki',        left: '28%', top: '62%' },
      { name: 'Jumati',       left: '60%', top: '44%' },
    ],
    seasons: [
      {
        icon: 'sun', months: 'May–Sep', accent: 'warm',
        title: 'Best for Exploring',
        desc: 'Warm, green and accessible throughout. Village life is most active in summer; the coast at Ureki is swimmable from June.',
      },
      {
        icon: 'calendar', months: 'Apr & Oct', accent: 'neutral',
        title: 'Shoulder Season',
        desc: 'Quieter and beautiful — spring wildflowers and autumn gold in the hazelnut groves. Perfect for unhurried cultural visits.',
      },
      {
        icon: 'thermometer', months: 'Nov–Mar', accent: 'cool',
        title: 'Winter',
        desc: 'Mild and quiet. Guria is easily combined with Kutaisi or Batumi in winter. Monasteries and the market town of Ozurgeti remain open.',
      },
    ],
    practical: [
      {
        icon: 'compass', title: 'Off the tourist trail',
        desc: 'Very few international visitors come specifically to Guria — it rewards those who do with genuine, uncommercialized Georgian hospitality.',
      },
      {
        icon: 'route', title: 'Easy transit positioning',
        desc: 'Guria sits directly on the Tbilisi–Batumi route. It is effortless to include as an overnight stop rather than passing straight through.',
      },
      {
        icon: 'thermometer', title: 'Rainy but mild',
        desc: 'Like all of western Georgia, Guria gets significant rainfall. Pack a waterproof; the green landscape is the direct result.',
      },
      {
        icon: 'mappin', title: 'Food is the highlight',
        desc: "Gurian cuisine is distinct — try gebzhalia (cheese and mint rolls in whey sauce) and the spiced Gurian khinkali. Eat where locals eat.",
      },
    ],
    customTripHeading: 'Want to include Guria in your Georgia trip?',
    customTripBody: "We can weave Guria into any western Georgia itinerary — tell us your starting point and interests and we'll make it work.",
  },

  // ── SHIDA KARTLI ─────────────────────────────────────────────────────────────
  {
    slug: 'shida-kartli',
    name: 'Shida Kartli',
    adminName: 'Shida Kartli',
    tagline: 'Ancient cave cities at the crossroads of Georgia.',
    heroImage: '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg',
    eyebrow: 'Region · Central Georgia',
    metaTitle: 'Shida Kartli — Uplistsikhe & Central Georgia | Adventure Experts Georgia',
    metaDescription: "Explore Shida Kartli — the ancient cave city of Uplistsikhe, Stalin's Gori, and the Liakhvi valley. Central Georgia's historic heartland on the way to the Caucasus.",
    intro: {
      heading: 'The Historic Heart of Georgia',
      body: "Shida Kartli — Inner Kartli — is the ancient core of Georgian statehood, the fertile valley of the Mtkvari River that connects Tbilisi to the western and northern highlands. The region's headline site is Uplistsikhe, one of the oldest urban settlements in the Caucasus — a cave city hewn from a sandstone ridge above the Mtkvari that was inhabited from the Iron Age through the medieval period. Nearby Gori, birthplace of Stalin, offers a fascinatingly complex museum; Surami and the Likhi Range mark the watershed between eastern and western Georgia. The region is most often transited rather than explored, which means its remarkable sites remain genuinely uncrowded.",
    },
    heroFacts: [
      { icon: 'castle',   text: 'Uplistsikhe — Iron Age cave city' },
      { icon: 'mappin',   text: 'Hub: Gori & Surami' },
      { icon: 'calendar', text: 'Best: Mar–Nov; day trips year-round' },
    ],
    quickFacts: [
      { icon: 'mappin',   label: 'Base town',     value: 'Gori (~600 m)' },
      { icon: 'plane',    label: 'Getting there', value: '~1.5 h from Tbilisi by road' },
      { icon: 'mountain', label: 'Terrain',       value: 'River valley, sandstone ridges, Likhi foothills' },
      { icon: 'calendar', label: 'Best season',   value: 'Year-round for day trips; spring best for walks' },
      { icon: 'gauge',    label: 'Difficulty',    value: 'Easy' },
      { icon: 'compass',  label: 'Main draw',     value: 'Uplistsikhe, Gori, Ateni Sioni' },
      { icon: 'clock',    label: 'Ideal length',  value: 'Day trip from Tbilisi or en-route stop' },
      { icon: 'route',    label: 'Pairs with',    value: 'Mtskheta, Tbilisi, Racha, Imereti' },
    ],
    highlights: [
      {
        icon: 'castle', tag: 'Cave City',
        title: 'Uplistsikhe',
        desc: 'An Iron-Age to medieval cave city cut into a sandstone cliff above the Mtkvari — theatres, palaces, churches and a tunnel to the river.',
        image: '/images/tours/nika-tchokhonelidze-Ms_p0I5DQSM-unsplash.jpg',
        href: '/en/tours?region=ShidaKartli',
      },
      {
        icon: 'landmark', tag: 'History',
        title: "Stalin's Gori & Museum",
        desc: "The birthplace of Josef Stalin — a surprisingly nuanced museum and the dictator's original childhood home, preserved under a pavilion.",
        image: '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg',
        href: '/en/tours?region=ShidaKartli',
      },
      {
        icon: 'landmark', tag: 'Church',
        title: 'Ateni Sioni',
        desc: 'A 7th-century cross-dome church in a quiet valley outside Gori — one of the finest early medieval buildings in the Caucasus, all but unknown.',
        image: '/images/tours/nadav-fima-ULn5jbPuHx8-unsplash.jpg',
        href: '/en/tours?region=ShidaKartli',
      },
      {
        icon: 'mountain', tag: 'Nature',
        title: 'Borjomi–Surami Watershed',
        desc: 'The Likhi Range marking the great east–west divide of the Caucasus — a quiet walking country between two very different Georgias.',
        image: '/images/tours/vasily-ledovsky-7Nl6vSXdDhE-unsplash.jpg',
        href: '/en/tours?region=ShidaKartli',
      },
    ],
    tours: [],
    toursViewAllHref: '/en/tours?region=ShidaKartli',
    activities: [
      { icon: 'compass',  label: 'Mixed Tours',       href: '/en/tours?activity=mixed' },
      { icon: 'mountain', label: 'Trekking & Hiking', href: '/en/tours?activity=trekking' },
    ],
    mapPins: [
      { name: 'Gori',         left: '50%', top: '46%', accent: true },
      { name: 'Uplistsikhe',  left: '44%', top: '52%' },
      { name: 'Ateni Sioni',  left: '46%', top: '60%' },
      { name: 'Surami',       left: '36%', top: '54%' },
    ],
    seasons: [
      {
        icon: 'sun', months: 'Apr–Jun & Sep–Oct', accent: 'warm',
        title: 'Best for Visits',
        desc: 'Pleasant temperatures for walking Uplistsikhe — not too hot, not grey. The cave city at golden hour in autumn is remarkable.',
      },
      {
        icon: 'calendar', months: 'Jul–Aug', accent: 'neutral',
        title: 'Hot Summer',
        desc: 'The Mtkvari valley gets hot in midsummer. Start early at Uplistsikhe; the cave interiors stay naturally cool.',
      },
      {
        icon: 'thermometer', months: 'Nov–Mar', accent: 'cool',
        title: 'Year-round',
        desc: 'Uplistsikhe and Gori are accessible all year. Winter light on the sandstone caves can be beautiful; crowds are minimal.',
      },
    ],
    practical: [
      {
        icon: 'compass', title: 'Easy day trip from Tbilisi',
        desc: "Uplistsikhe and Gori are 1.5 h from Tbilisi — one of the most rewarding day trips from the capital, usually combined with Mtskheta.",
      },
      {
        icon: 'castle', title: 'Uplistsikhe safety',
        desc: 'The cave city has uneven rock surfaces and no railings in places. Comfortable, grippy shoes matter more than a guide for navigating the site.',
      },
      {
        icon: 'landmark', title: 'The Stalin museum',
        desc: "The Gori museum is deliberately thought-provoking — it neither glorifies nor condemns. It's one of the most interesting museums in the Caucasus.",
      },
      {
        icon: 'route', title: 'Combine with Mtskheta',
        desc: 'Uplistsikhe and Mtskheta (UNESCO) are on the same highway — combine both into one day for a deep dive into ancient Georgian history.',
      },
    ],
    customTripHeading: 'Want to include Shida Kartli in your Georgia trip?',
    customTripBody: "Cave cities, medieval churches and Georgian history from the Iron Age to the Soviet era — tell us your interests and we'll build the itinerary.",
  },

  // ── KVEMO KARTLI ─────────────────────────────────────────────────────────────
  {
    slug: 'kvemo-kartli',
    name: 'Kvemo Kartli',
    adminName: 'Kvemo Kartli',
    tagline: 'Cave monasteries and the volcanic southern frontier.',
    heroImage: '/images/tours/jason-gardner-LU-o3CbeZhU-unsplash.jpg',
    eyebrow: 'Region · Southern Georgia',
    metaTitle: 'Kvemo Kartli — David Gareja & South Georgia | Adventure Experts Georgia',
    metaDescription: 'Explore Kvemo Kartli — the dramatic David Gareja cave monastery, Bolnisi Sioni and the Azeri border landscapes of southern Georgia.',
    intro: {
      heading: 'The Southern Frontier',
      body: "Kvemo Kartli — Lower Kartli — is the least typical of Georgia's regions: a dry, volcanic plateau and semi-steppe bordering Azerbaijan and Armenia, with a population that includes significant Armenian and Azerbaijani communities alongside Georgians. The region is dominated in popular imagination by David Gareja, the extraordinary cave monastery complex where hundreds of cells, churches and frescoes cover a mesa above the Iori steppe — but the region has more: Bolnisi Sioni, the oldest surviving datable building in Georgia (5th century), and the Algeti national park's pine forests offer a different face of the south.",
    },
    heroFacts: [
      { icon: 'castle',   text: 'David Gareja cave monastery' },
      { icon: 'mappin',   text: 'Hub: Rustavi & Marneuli' },
      { icon: 'calendar', text: 'Best: Apr–Jun & Sep–Oct' },
    ],
    quickFacts: [
      { icon: 'mappin',   label: 'Base town',     value: 'Rustavi or Tbilisi (~480 m)' },
      { icon: 'plane',    label: 'Getting there', value: '~1.5–2 h from Tbilisi' },
      { icon: 'mountain', label: 'Terrain',       value: 'Dry plateau, semi-steppe, volcanic basalt' },
      { icon: 'calendar', label: 'Best season',   value: 'Apr–Jun & Sep–Oct (hot in summer)' },
      { icon: 'gauge',    label: 'Difficulty',    value: 'Easy to Moderate' },
      { icon: 'compass',  label: 'Main draw',     value: 'David Gareja, Bolnisi Sioni, Algeti Park' },
      { icon: 'clock',    label: 'Ideal length',  value: 'Day trip or overnight' },
      { icon: 'route',    label: 'Pairs with',    value: 'Tbilisi, Kakheti, Samtskhe-Javakheti' },
    ],
    highlights: [
      {
        icon: 'castle', tag: 'Cave Monastery',
        title: 'David Gareja',
        desc: 'A 6th-century cave monastery complex across a desert mesa — hundreds of monk cells, remarkable frescoes and views to the Azeri steppe.',
        image: '/images/tours/jason-gardner-LU-o3CbeZhU-unsplash.jpg',
        href: '/en/tours?region=KvemoKartli',
      },
      {
        icon: 'landmark', tag: 'Oldest Building',
        title: 'Bolnisi Sioni',
        desc: "Georgia's oldest datable building (478–493 AD) — a 5th-century basilica with the original Bolnisi cross still carved above the south door.",
        image: '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg',
        href: '/en/tours?region=KvemoKartli',
      },
      {
        icon: 'mountain', tag: 'National Park',
        title: 'Algeti National Park',
        desc: 'Pine and beech forest above the Algeti River — the green counterpoint to the dry steppe landscape of the lowlands.',
        image: '/images/tours/nadav-fima-ULn5jbPuHx8-unsplash.jpg',
        href: '/en/tours?region=KvemoKartli',
      },
      {
        icon: 'compass', tag: 'Culture',
        title: "Marneuli & Azerbaijan Border",
        desc: "Georgia's most ethnically diverse lowland — a fascinating blend of Georgian, Armenian and Azerbaijani village culture.",
        image: '/images/tours/iman-gozal-5iQWgow3_S0-unsplash.jpg',
        href: '/en/tours?region=KvemoKartli',
      },
    ],
    tours: [],
    toursViewAllHref: '/en/tours?region=KvemoKartli',
    activities: [
      { icon: 'compass',  label: 'Mixed Tours',       href: '/en/tours?activity=mixed' },
      { icon: 'mountain', label: 'Trekking & Hiking', href: '/en/tours?activity=trekking' },
    ],
    mapPins: [
      { name: 'Rustavi',        left: '52%', top: '42%', accent: true },
      { name: 'David Gareja',   left: '72%', top: '70%' },
      { name: 'Bolnisi',        left: '42%', top: '62%' },
      { name: 'Algeti Park',    left: '34%', top: '52%' },
    ],
    seasons: [
      {
        icon: 'sun', months: 'Apr–Jun', accent: 'warm',
        title: 'Best Season',
        desc: 'The steppe is briefly green in spring — wildflowers cover the plateau around David Gareja and temperatures are pleasant for walking.',
      },
      {
        icon: 'calendar', months: 'Sep–Oct', accent: 'neutral',
        title: 'Autumn',
        desc: 'Clear skies and lower temperatures after the summer heat. The best light for photographing the cave frescoes at David Gareja.',
      },
      {
        icon: 'thermometer', months: 'Jul–Aug', accent: 'cool',
        title: 'Hot Summer',
        desc: 'The plateau can reach 40°C in midsummer. Early morning visits are essential; carry plenty of water for any walking at David Gareja.',
      },
    ],
    practical: [
      {
        icon: 'compass', title: 'David Gareja border',
        desc: 'Parts of the Gareja complex lie on the disputed Georgia–Azerbaijan border. Access to the Udabno cave frescoes can be restricted — verify before visiting.',
      },
      {
        icon: 'thermometer', title: 'Summer heat',
        desc: "The Kvemo Kartli plateau gets very hot. David Gareja visits in July–August require early starts, sun protection and serious water supply.",
      },
      {
        icon: 'car', title: 'Road to Gareja',
        desc: "The road to David Gareja ends on good tarmac but the final approach is rough. Standard cars manage in dry conditions; 4×4 is better.",
      },
      {
        icon: 'landmark', title: 'Bolnisi is easy to miss',
        desc: "Bolnisi Sioni is off the main tourist route but takes under an hour from Tbilisi — combine with David Gareja for a full southern day.",
      },
    ],
    customTripHeading: 'Want to explore the southern frontier?',
    customTripBody: "Cave monasteries, ancient basilicas and border landscapes few visitors reach — tell us your interests and we'll plan a southern Georgia itinerary.",
  },

  // ── TBILISI ──────────────────────────────────────────────────────────────────
  {
    slug: 'tbilisi',
    name: 'Tbilisi',
    adminName: 'Tbilisi',
    tagline: 'The warm heart of the South Caucasus.',
    heroImage: '/images/georgia-hero.avif',
    eyebrow: 'Capital City · Eastern Georgia',
    metaTitle: 'Tbilisi Tours & Day Trips | Adventure Experts Georgia',
    metaDescription: "Explore Tbilisi — Georgia's capital and your adventure base. Old Town walks, sulfur bath district, Narikala Fortress and day trips to Mtskheta and beyond.",
    intro: {
      heading: 'Your Georgian Adventure Begins Here',
      body: "Tbilisi has been the capital of Georgia since the 5th century, when King Vakhtang Gorgasali is said to have followed a wounded deer to its warm sulfur springs and built his palace here. Today the city earns its reputation as one of the most welcoming and creative capitals in the former Soviet space — a tight-knit Old Town of carved wooden balconies, domed sulfur baths, the cliff-top Narikala Fortress, and a restaurant and wine bar scene that has made Tbilisi a serious food destination. For Adventure Experts Georgia, it's the starting point for every journey — a city worth spending a day or two in before heading for the mountains.",
    },
    heroFacts: [
      { icon: 'mappin',   text: 'Starting point for all Georgia trips' },
      { icon: 'landmark', text: 'Old Town · Narikala · Sulfur Baths' },
      { icon: 'calendar', text: 'Excellent year-round' },
    ],
    quickFacts: [
      { icon: 'mappin',   label: 'Location',      value: 'Mtkvari River valley (~490 m)' },
      { icon: 'plane',    label: 'Airport',        value: 'Tbilisi International (TBS) — main gateway' },
      { icon: 'mountain', label: 'Day trips',      value: 'Mtskheta 20 min · Kazbegi 3 h · Kakheti 2 h' },
      { icon: 'calendar', label: 'Best season',   value: 'Spring & Autumn best; good year-round' },
      { icon: 'gauge',    label: 'City size',      value: '~1.2 million — walkable historic core' },
      { icon: 'compass',  label: 'Known for',      value: 'Wine, architecture, food, nightlife, museums' },
      { icon: 'clock',    label: 'Recommended',   value: '2–3 days minimum before heading to the regions' },
      { icon: 'route',    label: 'Gateway to',    value: 'Every region in Georgia' },
    ],
    highlights: [
      {
        icon: 'landmark', tag: 'Old Town',
        title: "Kala & the Old Town",
        desc: 'Carved wooden balconies, winding lanes, Armenian churches and Georgian cathedrals layer 1,500 years of history into a single walkable district.',
        image: '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg',
        href: '/en/tours?region=Tbilisi',
      },
      {
        icon: 'castle', tag: 'Fortress',
        title: 'Narikala Fortress',
        desc: 'A 4th-century cliff-top fortress with panoramic views over the city and the Mtkvari valley — best at golden hour.',
        image: '/images/tours/nika-tchokhonelidze-Ms_p0I5DQSM-unsplash.jpg',
        href: '/en/tours?region=Tbilisi',
      },
      {
        icon: 'compass', tag: 'Culture',
        title: 'Abanotubani Sulfur Baths',
        desc: "Tbilisi is named for its warm springs (tbili = warm). The 19th-century domed bath-houses in Abanotubani are still in daily use.",
        image: '/images/tours/nadav-fima-ULn5jbPuHx8-unsplash.jpg',
        href: '/en/tours?region=Tbilisi',
      },
      {
        icon: 'route', tag: 'Day Trip',
        title: 'Mtskheta (UNESCO)',
        desc: '20 minutes north — the ancient royal capital with Svetitskhoveli Cathedral and Jvari Monastery above the river confluence.',
        image: '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg',
        href: '/en/tours/kazbegi-day-trip',
      },
      {
        icon: 'mountain', tag: 'Wine',
        title: 'Tbilisi Wine Scene',
        desc: "Georgia invented wine 8,000 years ago and the capital's bars and restaurants offer the deepest selection of natural and qvevri wines anywhere.",
        image: '/images/tours/gio-chanturia-2aGoA1zcWfI-unsplash.jpg',
        href: '/en/tours?region=Tbilisi',
      },
      {
        icon: 'landmark', tag: 'Art & Museums',
        title: 'Georgian National Museum',
        desc: "The country's finest museum: Gold Fund treasures, prehistoric finds from Dmanisi and a moving documentary record of Soviet occupation.",
        image: '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg',
        href: '/en/tours?region=Tbilisi',
      },
    ],
    tours: [
      {
        name: 'Kazbegi Day Trip',
        hook: 'Ananuri, Gudauri and Gergeti Trinity Church in one perfect day from Tbilisi.',
        duration: 'Day trip',
        regionActivity: 'Tbilisi · Mixed Tours',
        difficulty: 'Easy',
        isNew: true,
        badge: 'Live',
        image: '/images/tours/andrew-rusinas-aFFKmsFoldc-unsplash.jpg',
        href: '/en/tours/kazbegi-day-trip',
      },
      {
        name: 'Discover Georgia as a Local',
        hook: 'Ten days, one 4x4, six regions — cave cities, glacier valleys and villages the road forgot, starting from Tbilisi.',
        duration: '10 days',
        regionActivity: 'Tbilisi · Overlanding',
        difficulty: 'Moderate',
        isNew: true,
        badge: 'New',
        image: '/images/tours/overlanding/dg-04.jpg',
        href: '/en/tours/discover-georgia-as-a-local',
      },
    ],
    toursViewAllHref: '/en/tours',
    activities: [
      { icon: 'compass',  label: 'Mixed Tours',    href: '/en/tours?activity=mixed' },
      { icon: 'landmark', label: 'Cultural Tours', href: '/en/tours?activity=mixed' },
      { icon: 'mountain', label: 'Day Hikes',      href: '/en/tours?activity=trekking' },
    ],
    mapPins: [
      { name: 'Old Town',       left: '48%', top: '50%', accent: true },
      { name: 'Narikala',       left: '44%', top: '44%' },
      { name: 'Abanotubani',    left: '50%', top: '54%' },
      { name: 'Mtskheta',       left: '36%', top: '32%' },
      { name: 'Airport (TBS)',   left: '58%', top: '68%' },
    ],
    seasons: [
      {
        icon: 'sun', months: 'Apr–Jun & Sep–Oct', accent: 'warm',
        title: 'Best Time to Visit',
        desc: 'Warm, clear days and cool evenings — ideal for walking the Old Town and day trips to the regions. Spring and autumn are Tbilisi at its best.',
      },
      {
        icon: 'thermometer', months: 'Jul–Aug', accent: 'neutral',
        title: 'Hot Summer',
        desc: "Tbilisi gets hot (35°C+) in midsummer. The city is busy and vibrant; start sightseeing early and retreat to a wine bar in the afternoon.",
      },
      {
        icon: 'snowflake', months: 'Nov–Mar', accent: 'cool',
        title: 'Winter',
        desc: 'Mild and sometimes snowy. A festive atmosphere around New Year; quieter museums and restaurants. Day trips to Mtskheta run year-round.',
      },
    ],
    practical: [
      {
        icon: 'plane', title: 'Main international gateway',
        desc: "Tbilisi International Airport (TBS) is Georgia's main hub — good connections from Europe, the Middle East and Asia. Most tours start here.",
      },
      {
        icon: 'car', title: 'Getting around',
        desc: 'The Old Town and Rustaveli Avenue are walkable. Metro and marshrutka cover the wider city. For day trips, private transfer is the most flexible option.',
      },
      {
        icon: 'mappin', title: 'Where to stay',
        desc: 'Old Town (Kala) and Vera are the best neighbourhoods for first-time visitors — close to the sights, restaurants and the sulfur bath district.',
      },
      {
        icon: 'compass', title: 'Currency & cash',
        desc: "Georgia uses the Lari (GEL). ATMs are plentiful in Tbilisi; card payments are widely accepted. Many restaurants still prefer cash.",
      },
    ],
    customTripHeading: 'Planning a Georgia trip from Tbilisi?',
    customTripBody: "Tell us how many days you have and what you want to feel — mountains, wine, culture or all three — and we'll build your full Georgia itinerary.",
  },
]

export function getRegionBySlug(slug: string): RegionData | undefined {
  return REGIONS_DATA.find(r => r.slug === slug)
}

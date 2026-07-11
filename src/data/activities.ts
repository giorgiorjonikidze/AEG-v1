export interface ActivityQuickFact {
  icon: string
  label: string
  value: string
}

export interface ActivityRegion {
  slug: string
  name: string
  description: string
  image: string
}

export interface ActivityDifficultyLevel {
  level: 'Easy' | 'Moderate' | 'Challenging'
  description: string
  distance?: string
  elevation?: string
  experience: string
}

export interface ActivitySeason {
  period: string
  note: string
  type: 'prime' | 'good' | 'limited'
}

export interface ActivityData {
  slug: string
  name: string
  tagline: string
  heroImage: string
  metaTitle: string
  metaDescription: string
  intro: string
  whyUs: string[]
  quickFacts: ActivityQuickFact[]
  regions: ActivityRegion[]
  difficultyLevels: ActivityDifficultyLevel[]
  seasons: ActivitySeason[]
  practical: { heading: string; body: string }[]
  faq: { q: string; a: string }[]
  categoryTag: string
  gallery: string[]
}

export const ACTIVITIES_DATA: ActivityData[] = [
  {
    slug: 'trekking',
    name: 'Trekking & Hiking',
    tagline: 'Walk the wild ridges of the Caucasus — from gentle day trails to glacier passes.',
    heroImage: '/images/svaneti.jpg',
    metaTitle: 'Trekking & Hiking Tours in Georgia',
    metaDescription: 'Guided trekking tours in Georgia: Svaneti, Kazbegi, Tusheti & beyond. Easy day hikes to multi-day high-mountain routes. Private tours, certified local guides.',
    categoryTag: 'Trekking',
    gallery: [
      '/images/activities/trekking.jpg',
      '/images/activities/hiking.jpg',
      '/images/svaneti.jpg',
      '/images/kazbegi.jpg',
      '/images/tours/iman-gozal-5iQWgow3_S0-unsplash.jpg',
      '/images/tours/nadav-fima-ULn5jbPuHx8-unsplash.jpg',
    ],
    intro: `For a country its size, Georgia is one of the most rewarding trekking destinations on earth. The Greater Caucasus throws up some of the highest peaks in Europe, and the trails that thread between them lead through alpine meadows, glacier valleys, turquoise high-mountain lakes, and remote villages where medieval stone towers still stand. You can walk an easy half-day to a waterfall or cross a high pass on a multi-day route — and almost everywhere, the trails are still blissfully uncrowded compared with the Alps. What makes trekking here special isn't just the scenery: it's the culture you meet along the way — shepherds, family guesthouses, and a mountain hospitality that turns a hike into something you remember for life.`,
    whyUs: [
      'Certified local guides who grew up in these mountains, trained in wilderness safety and first aid.',
      'Private tours for 1–8 people — your group only, your pace, no rush.',
      'Local knowledge that takes you beyond the well-trodden trails, safely.',
    ],
    quickFacts: [
      { icon: 'difficulty', label: 'Difficulty range', value: 'Easy day walks → Challenging multi-day routes' },
      { icon: 'clock',      label: 'Typical length',   value: 'Half-day hikes to week-long treks' },
      { icon: 'calendar',   label: 'Best season',       value: 'Jun–Sep (high routes); May & Oct (lower trails)' },
      { icon: 'fitness',    label: 'Fitness needed',    value: 'Comfortable walking to good hill fitness' },
      { icon: 'check',      label: 'Usually included',  value: 'Guide, transport, route planning; meals & accom on multi-day' },
    ],
    regions: [
      { slug: 'samegrelo',           name: 'Svaneti',                    description: 'Tower villages, glaciers, and the classic Mestia–Ushguli route.',          image: '/images/svaneti.jpg' },
      { slug: 'mtskheta-mtianeti',           name: 'Kazbegi / Mtskheta-Mtianeti', description: 'Gergeti Trinity Church, the Juta–Chaukhi loop, and the wild Truso Valley.', image: '/images/kazbegi.jpg' },
      { slug: 'racha-lechkhumi',   name: 'Racha',                      description: 'Quieter forests, alpine lakes, and unspoiled high-mountain scenery.',         image: '/images/tours/nadav-fima-ULn5jbPuHx8-unsplash.jpg' },
      { slug: 'kakheti',           name: 'Kakheti (Lagodekhi)',         description: 'Beech forest trails, waterfalls, and the Lagodekhi Protected Areas.',        image: '/images/tours/gio-chanturia-2aGoA1zcWfI-unsplash.jpg' },
    ],
    difficultyLevels: [
      {
        level: 'Easy',
        description: 'Short distances, modest elevation, gentle terrain.',
        distance: 'Up to ~10 km / day',
        elevation: 'Under 400 m gain',
        experience: 'No hiking experience needed. Families and first-timers welcome.',
      },
      {
        level: 'Moderate',
        description: 'Longer days, real elevation gain, uneven trails.',
        distance: '10–18 km / day',
        elevation: '400–900 m gain',
        experience: 'Good general fitness helps. Some prior hiking is useful but not required.',
      },
      {
        level: 'Challenging',
        description: 'Long days, high passes, significant ascent and altitude. Multi-day effort.',
        distance: '18+ km / day',
        elevation: '900 m+ gain, passes above 3,000 m',
        experience: 'Prior multi-day hiking fitness recommended. Comfortable on rough terrain.',
      },
    ],
    seasons: [
      { period: 'Jun – Sep', note: 'Prime season. High passes and glacier trails are open and snow-free. Wildflowers in July; best visibility in August.', type: 'prime' },
      { period: 'May & Oct', note: 'Shoulder season colour and fewer crowds. Lower-altitude trails are excellent; high routes may still hold snow or close early.', type: 'good' },
      { period: 'Nov – Apr', note: 'High mountain routes are closed. Some lower forest walks remain possible, but weather is unpredictable.', type: 'limited' },
    ],
    practical: [
      { heading: 'Altitude',        body: 'Many routes sit between 2,000–2,700 m — some passes go higher. Allow time to acclimatize on harder treks and tell your guide if you feel any symptoms.' },
      { heading: 'Weather',         body: 'Mountain weather in the Caucasus changes fast. Even in summer, carry warm and waterproof layers. Afternoon thunderstorms are common in July and August.' },
      { heading: 'Fitness',         body: "Match the trek to your current level — we'll advise honestly and can adjust the pace. If in doubt, start with an easier option and build up." },
      { heading: 'Accommodation',   body: 'Family guesthouses on most routes — a real highlight of trekking in Georgia. Camping available on select wilderness routes.' },
      { heading: 'What to bring',   body: 'Broken-in hiking boots, moisture-wicking base layers, fleece or down mid-layer, rain jacket, daypack, 2 l water capacity, sunscreen, poles (optional), and travel insurance that covers mountain activities.' },
    ],
    faq: [
      { q: 'How fit do I need to be?',                   a: "It depends on the trek. Our easy routes suit anyone who can walk comfortably for a few hours. Moderate routes need good general fitness; challenging ones need real hiking fitness. We'll always advise which level suits you." },
      { q: 'Do I need previous hiking experience?',       a: "Not for our easier treks. For moderate and challenging routes, some prior hill-walking experience helps, but certified guides are with you every step. We brief you fully before departure." },
      { q: 'Are treks suitable for families with kids?',  a: "Yes — many of our shorter, easier trails work well for families with children aged 8+. Tell us the ages and fitness of your group and we'll suggest the best options." },
      { q: 'What happens if the weather turns bad?',      a: "Your guide monitors conditions and will adapt the route if needed. Safety always comes first. In rare cases of dangerous weather, we reschedule or reroute — we've been running these mountains long enough to know when to turn back." },
      { q: 'Are treks private, and can they be customised?', a: 'Every trek we run is private — just you and your companions. And yes, the itinerary can be adjusted to your interests, pace, and fitness level. Use the "Plan a Custom Trip" button to start.' },
      { q: 'What should I pack?',                        a: 'Broken-in hiking boots, moisture-wicking layers, a warm fleece or down mid-layer, a waterproof jacket, a daypack, 2 l water capacity, sun protection, and travel insurance that covers trekking and altitude. We send a full kit list after booking.' },
      { q: 'How high do the trails go?',                  a: 'Day hikes can range from 600 m to above 2,500 m. Multi-day routes in Svaneti and Kazbegi cross passes between 2,700 and 3,200 m. We note the maximum altitude in every itinerary.' },
    ],
  },

  // ── BIKING ─────────────────────────────────────────────────────────────────
  {
    slug: 'biking',
    name: 'Biking',
    tagline: 'Ride mountain tracks and valley roads through some of Europe\'s wildest scenery.',
    heroImage: '/images/tours/darya-tryfanava-rY1P25plAYg-unsplash.jpg',
    metaTitle: 'Mountain Biking Tours in Georgia',
    metaDescription: 'Guided mountain biking tours in Georgia: Svaneti, Kazbegi, cross-country routes. Gravel rides to technical singletrack. Private tours, local guides.',
    categoryTag: 'Biking',
    gallery: [
      '/images/activities/biking.jpg',
      '/images/tours/darya-tryfanava-rY1P25plAYg-unsplash.jpg',
      '/images/tours/k-t-xVLdFIxcDCc-unsplash.jpg',
      '/images/svaneti.jpg',
      '/images/tours/wander-creative-6i3O_w7wOyE-unsplash.jpg',
      '/images/kazbegi.jpg',
    ],
    intro: `Georgia is an undiscovered gem for mountain bikers. The roads and tracks that wind through the Greater Caucasus offer everything from gentle gravel rides along river valleys to technical singletrack across high-altitude passes. Ride through medieval tower villages in Svaneti, bomb down dirt roads above the Truso Valley, or pedal through the vine-covered landscapes of Kakheti. The infrastructure is still raw — which means the routes are empty and the experiences are genuinely off the beaten path. A local guide who knows the tracks makes all the difference here.`,
    whyUs: [
      'Experienced local guides who know which tracks are rideable and which are not — no nasty surprises.',
      'Quality bikes available or bring your own. All safety gear provided.',
      'Private tours, flexible pace, no one left behind.',
    ],
    quickFacts: [
      { icon: 'difficulty', label: 'Difficulty range', value: 'Easy valley rides → Challenging mountain passes' },
      { icon: 'clock',      label: 'Typical length',   value: 'Half-day rides to week-long tours' },
      { icon: 'calendar',   label: 'Best season',       value: 'May–Oct (mountain routes Jun–Sep)' },
      { icon: 'fitness',    label: 'Fitness needed',    value: 'Moderate cycling fitness for most routes' },
      { icon: 'check',      label: 'Usually included',  value: 'Guide, transport, bike hire option; meals on multi-day' },
    ],
    regions: [
      { slug: 'samegrelo',         name: 'Svaneti',    description: 'Epic mountain roads and forest tracks in the shadow of 5,000 m peaks.',        image: '/images/svaneti.jpg' },
      { slug: 'mtskheta-mtianeti',         name: 'Kazbegi',    description: 'The Military Highway and stunning high-altitude gravel tracks to Juta and Truso.', image: '/images/kazbegi.jpg' },
      { slug: 'kakheti',         name: 'Kakheti',    description: 'Rolling vineyard roads, ancient monasteries, and golden autumn light.',            image: '/images/tours/gio-chanturia-2aGoA1zcWfI-unsplash.jpg' },
      { slug: 'adjara',          name: 'Adjara',     description: 'Coastal forest tracks and sub-alpine roads above Batumi.',                         image: '/images/tours/zviad-pharsenadze--cIcGJX4Gxk-unsplash.jpg' },
    ],
    difficultyLevels: [
      { level: 'Easy',        description: 'Flat or gently rolling valley roads and gravel tracks. No technical skill required.',            distance: '20–40 km / day', elevation: 'Under 400 m', experience: 'Comfortable cycling a few hours. No MTB experience needed.' },
      { level: 'Moderate',    description: 'Longer climbs, unpaved roads, some loose terrain. Basic bike handling confidence helpful.',      distance: '40–70 km / day', elevation: '400–1,000 m', experience: 'Regular cycling fitness. Some off-road riding an advantage.' },
      { level: 'Challenging', description: 'Technical singletrack, steep climbs, high-altitude passes, multi-day effort.',                  distance: '60–90 km / day', elevation: '1,000 m+',     experience: 'Strong cycling fitness and off-road handling skills required.' },
    ],
    seasons: [
      { period: 'Jun – Sep', note: 'Best for mountain and high-altitude routes. Tracks are dry and passes are clear.', type: 'prime' },
      { period: 'May & Oct', note: 'Shoulder season — lower valley and vineyard routes are excellent. Mountain tracks may be muddy.', type: 'good' },
      { period: 'Nov – Apr', note: 'Mountain routes are largely inaccessible. Some lower-elevation routes remain possible in mild weather.', type: 'limited' },
    ],
    practical: [
      { heading: 'Bike hire',      body: 'Quality hardtail and full-suspension MTBs available. Bring your own if you prefer — we can arrange bike transport.' },
      { heading: 'Road conditions', body: 'Many Georgian mountain roads are unpaved or cobbled. Expect loose gravel, mud, and rough surfaces on mountain routes.' },
      { heading: 'Altitude',       body: 'Several routes climb above 2,000 m. Pace yourself on the ascents and tell your guide if you feel unwell.' },
      { heading: 'Safety',         body: 'Helmets mandatory. Gloves, pads, and eyewear recommended. A support vehicle accompanies most multi-day routes.' },
      { heading: 'What to bring',  body: 'Cycling kit, warm layer, rain jacket, gloves, sunglasses, hydration pack, trail snacks, and travel insurance covering biking.' },
    ],
    faq: [
      { q: 'Do you provide bikes?',                a: 'Yes — we offer quality MTB hire. Let us know your height and riding preference when you enquire.' },
      { q: 'Can I bring my own bike?',             a: 'Absolutely. We can arrange bike transport in a support vehicle on multi-day tours.' },
      { q: 'How fit do I need to be?',             a: 'It depends on the route. Valley rides need regular cycling fitness; mountain passes need strong legs and some MTB confidence. We\'ll match you to the right route.' },
      { q: 'Are the roads paved?',                 a: 'Many of the best routes use unpaved mountain roads and tracks — that\'s part of the appeal. We note road type in every itinerary.' },
      { q: 'Can we mix biking with other activities?', a: 'Yes — many clients combine a day of biking with trekking, culture, or wine tasting. Ask about mixed itineraries.' },
      { q: 'Is there a support vehicle?',          a: 'Yes on multi-day tours. The vehicle carries bags, spare parts, and tired riders when needed.' },
    ],
  },

  // ── CAVING ─────────────────────────────────────────────────────────────────
  {
    slug: 'caving',
    name: 'Caving',
    tagline: 'Descend into Georgia\'s extraordinary underground world — from show caves to wild passages.',
    heroImage: '/images/tours/vasily-ledovsky-7Nl6vSXdDhE-unsplash.jpg',
    metaTitle: 'Wild Caving in Georgia',
    metaDescription: 'Guided wild caving in Georgia — off the tourist trail into untouched caves: vast chambers, dramatic rock formations, narrow passages and real underground adventure.',
    categoryTag: 'Caving',
    gallery: [
      '/images/activities/caving.jpg',
      '/images/tours/vasily-ledovsky-7Nl6vSXdDhE-unsplash.jpg',
      '/images/tours/kim-cordenete-3hB68obZnHI-unsplash.jpg',
      '/images/martvili.jpg',
      '/images/tours/wander-creative-6i3O_w7wOyE-unsplash.jpg',
      '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg',
    ],
    intro: `Georgia sits on limestone karst that hides one of the most spectacular cave systems on earth. The Arabika Massif in Abkhazia contains Veryovkina — the deepest known cave in the world — and the broader Caucasus region is riddled with passages, caverns, and underground rivers. For visitors, the range of experiences is remarkable: walk through the otherworldly formations of Prometheus Cave, explore the Sataplia dinosaur-footprint site, or gear up for a genuine adventure caving session in wild passages that most tourists never see. Georgia's underground is as dramatic as its mountains.`,
    whyUs: [
      'Certified caving guides with deep knowledge of Georgia\'s underground systems, from tourist caves to technical passages.',
      'All equipment provided and safety-checked for adventure caving sessions.',
      'We tailor the experience to your group — gentle exploration or genuine challenge.',
    ],
    quickFacts: [
      { icon: 'difficulty', label: 'Difficulty range',  value: 'Easy show caves → Challenging wild caving' },
      { icon: 'clock',      label: 'Typical length',    value: 'Half-day to full-day sessions' },
      { icon: 'calendar',   label: 'Best season',       value: 'Year-round (caves stay at ~12 °C inside)' },
      { icon: 'fitness',    label: 'Fitness needed',    value: 'Low for show caves; good fitness for wild caving' },
      { icon: 'check',      label: 'Usually included',  value: 'Guide, all caving equipment, headlamps, helmets' },
    ],
    regions: [
      { slug: 'imereti',         name: 'Imereti',         description: 'Prometheus Cave and Sataplia — Georgia\'s most spectacular show caves.',           image: '/images/tours/wander-creative-6i3O_w7wOyE-unsplash.jpg' },
      { slug: 'samegrelo-low',   name: 'Samegrelo',       description: 'Kumistavi Cave and access to the western Caucasus limestone systems.',             image: '/images/martvili.jpg' },
      { slug: 'racha-lechkhumi', name: 'Racha',           description: 'Lesser-visited cave systems in a remote mountain setting.',                         image: '/images/tours/nadav-fima-ULn5jbPuHx8-unsplash.jpg' },
      { slug: 'adjara',          name: 'Adjara',          description: 'Coastal karst and sea caves with easy access from Batumi.',                         image: '/images/tours/zviad-pharsenadze--cIcGJX4Gxk-unsplash.jpg' },
    ],
    difficultyLevels: [
      { level: 'Easy',        description: 'Lit show caves with paved paths. Suitable for all ages and abilities.',                                        experience: 'No experience or fitness needed. Families and children very welcome.' },
      { level: 'Moderate',    description: 'Partially lit or unlit sections, some crawling and scrambling on natural surfaces.',                           experience: 'Good mobility. No claustrophobia. Basic physical fitness.' },
      { level: 'Challenging', description: 'Wild cave passages, rope work, tight squeezes, total darkness. Full equipment required.',                      experience: 'Good fitness, no claustrophobia, and willingness to get muddy and wet.' },
    ],
    seasons: [
      { period: 'Year-round', note: 'Caves maintain a constant temperature around 12–14 °C year-round — always bring a warm layer regardless of outside temperature.', type: 'prime' },
      { period: 'Spring & Autumn', note: 'Ideal for combining caving with outdoor sightseeing. Avoid cave visits immediately after heavy rain (flooding risk in wild caves).', type: 'good' },
      { period: 'After heavy rain', note: 'Wild cave passages can flood quickly. Your guide will check conditions before entry.', type: 'limited' },
    ],
    practical: [
      { heading: 'Temperature',    body: 'Caves stay at ~12–14 °C year-round. Always bring a warm mid-layer, even in summer.' },
      { heading: 'Equipment',      body: 'All helmets, headlamps, and protective suits are provided for adventure sessions. Wear old clothes and sturdy shoes you don\'t mind getting muddy.' },
      { heading: 'Claustrophobia', body: 'Some wild passages are tight. Tell us if you have any concerns — we can always adapt the route or choose a more open system.' },
      { heading: 'Photography',    body: 'Caves offer spectacular photo opportunities. Bring a camera with good low-light capability or ask us about photography tours.' },
    ],
    faq: [
      { q: 'Do I need experience to go caving?',     a: 'Not for show caves or introductory sessions. Wild caving requires some fitness and comfort in confined spaces, but no prior caving experience.' },
      { q: 'Is caving suitable for children?',       a: 'Show caves are great for children of any age. Adventure caving is suitable for children 10+ with appropriate fitness.' },
      { q: 'What if I\'m claustrophobic?',           a: 'Prometheus Cave and Sataplia have wide, open passages — no tight spaces at all. For wild caving, tell us beforehand and we\'ll choose a system that suits you.' },
      { q: 'What should I wear?',                    a: 'Old clothes and sturdy closed-toe shoes for all sessions. We provide protective suits and helmets for adventure caving.' },
      { q: 'Can caving be combined with other activities?', a: 'Yes — many clients combine a cave visit with Martvili Canyon, Kutaisi sightseeing, or a Racha hiking day.' },
    ],
  },

  // ── CANYONING ──────────────────────────────────────────────────────────────
  {
    slug: 'canyoning',
    name: 'Canyoning',
    tagline: 'Swim, abseil, and jump through Georgia\'s spectacular river gorges.',
    heroImage: '/images/martvili.jpg',
    metaTitle: 'Canyoning Tours in Georgia',
    metaDescription: 'Guided canyoning tours in Georgia: Martvili Canyon, Okatse Canyon, Kinchkha waterfall. Abseiling, swimming, cliff jumps. Private tours, expert guides.',
    categoryTag: 'Canyoning',
    gallery: [
      '/images/activities/canyoning.jpg',
      '/images/martvili.jpg',
      '/images/tours/zviad-pharsenadze--cIcGJX4Gxk-unsplash.jpg',
      '/images/tours/wander-creative-6i3O_w7wOyE-unsplash.jpg',
      '/images/tours/tomas-malik-EtvlvO4cF5I-unsplash.jpg',
      '/images/tours/nika-tchokhonelidze-Ms_p0I5DQSM-unsplash.jpg',
    ],
    intro: `Georgia's river gorges are among the most beautiful in the Caucasus, and exploring them from the inside — wading, swimming, abseiling, and jumping — is one of the most exhilarating things you can do in the country. Martvili Canyon in Samegrelo is the classic: turquoise pools beneath vertical limestone walls, with sections only reachable by swimming through narrow passages. The Okatse Canyon adds a dramatic cliff-side walkway and vertical drops. Further east, hidden gorges in Racha and Kakheti offer more remote, wilder options. Canyoning in Georgia is still a local secret — which means no crowds and unspoiled scenery.`,
    whyUs: [
      'Certified canyoning guides with safety qualifications and deep route knowledge.',
      'All technical equipment provided — wetsuits, harnesses, helmets, ropes.',
      'Routes chosen to match your group\'s experience — discovery sessions to full technical descents.',
    ],
    quickFacts: [
      { icon: 'difficulty', label: 'Difficulty range',  value: 'Easy canyon walks → Technical abseiling & jumps' },
      { icon: 'clock',      label: 'Typical length',    value: 'Half-day to full-day' },
      { icon: 'calendar',   label: 'Best season',       value: 'May–Oct (water levels best Jun–Sep)' },
      { icon: 'fitness',    label: 'Fitness needed',    value: 'Basic fitness; ability to swim' },
      { icon: 'check',      label: 'Usually included',  value: 'Guide, wetsuit, harness, helmet, ropes, transport' },
    ],
    regions: [
      { slug: 'samegrelo-low',   name: 'Samegrelo',       description: 'Martvili and Okatse — Georgia\'s most iconic canyon experiences.',                image: '/images/martvili.jpg' },
      { slug: 'imereti',         name: 'Imereti',         description: 'Kinchkha waterfall and the wild gorges of the Rioni headwaters.',                  image: '/images/tours/wander-creative-6i3O_w7wOyE-unsplash.jpg' },
      { slug: 'racha-lechkhumi', name: 'Racha',           description: 'Remote gorges with few visitors and dramatic vertical limestone.',                  image: '/images/tours/nadav-fima-ULn5jbPuHx8-unsplash.jpg' },
      { slug: 'adjara',          name: 'Adjara',          description: 'Fast-flowing gorges in the lush sub-tropical foothills above Batumi.',              image: '/images/tours/zviad-pharsenadze--cIcGJX4Gxk-unsplash.jpg' },
    ],
    difficultyLevels: [
      { level: 'Easy',        description: 'Canyon walks and gentle swims. No abseiling or jumps required.',                                              experience: 'Basic swimming ability. No technical experience needed.' },
      { level: 'Moderate',    description: 'Wading, swimming sections, optional small jumps (1–3 m), and one or two abseils.',                           experience: 'Comfortable swimmer. Willingness to get in cold water.' },
      { level: 'Challenging', description: 'Technical abseils (up to 30 m), cliff jumps, underwater passages, sustained water immersion.',               experience: 'Confident swimmer. Good fitness. No fear of heights or confined spaces.' },
    ],
    seasons: [
      { period: 'Jun – Sep', note: 'Ideal water levels and warmest temperatures. The most enjoyable season for full immersion canyoning.', type: 'prime' },
      { period: 'May & Oct', note: 'Cooler but spectacular. Wetsuits essential. Martvili and Okatse remain accessible.', type: 'good' },
      { period: 'Nov – Apr', note: 'High water and cold temperatures make most routes unsafe. Some canyon walks remain possible.', type: 'limited' },
    ],
    practical: [
      { heading: 'Swimming',       body: 'You must be a comfortable swimmer for any canyoning beyond easy canyon walks. Inform us if you are not confident in water.' },
      { heading: 'Water temperature', body: 'Georgian gorge water stays cold even in summer (14–18 °C). We provide wetsuits for all sessions except easy canyon walks.' },
      { heading: 'What to wear',   body: 'Swimwear under a wetsuit. Bring a dry change of clothes for after. Secure shoes (provided or wear your own watersport shoes).' },
      { heading: 'Safety',         body: 'Helmets and buoyancy aids worn at all times in water. Guides hold rope rescue qualifications.' },
    ],
    faq: [
      { q: 'Do I need to be able to swim?',          a: 'Yes — a basic ability to swim is required for any route with water sections. Inform us if you are not a confident swimmer and we will find a suitable option.' },
      { q: 'Will I get cold?',                       a: 'Wetsuits are provided for all immersion sessions. You will get wet but should stay comfortable. Expect it to feel refreshing rather than freezing.' },
      { q: 'Is canyoning suitable for kids?',        a: 'Easy canyon walks are great for children 6+. Active canyoning with jumps and abseils suits children 12+ with a sense of adventure.' },
      { q: 'Can I choose not to jump?',              a: 'Always. Jumps are optional. Your guide will never pressure anyone to do anything they are not comfortable with.' },
      { q: 'What is the Martvili Canyon experience?', a: 'Martvili offers boat rides through emerald pools in a limestone gorge, with wading and swimming sections in the inner canyon. It\'s the most accessible and visually stunning option we offer.' },
    ],
  },

  // ── OVERLANDING ────────────────────────────────────────────────────────────
  {
    slug: 'overlanding',
    name: 'Overlanding',
    tagline: 'Off-road into Georgia\'s remotest highlands — places the road ends and the real adventure begins.',
    heroImage: '/images/tours/jairph-Edx0NpJ29fQ-unsplash.jpg',
    metaTitle: 'Overlanding Tours in Georgia',
    metaDescription: 'Guided 4x4 overlanding tours in Georgia: Tusheti, Svaneti Military Road, Khevsureti. Remote highland access in expert hands. Private tours.',
    categoryTag: 'Overlanding',
    gallery: [
      '/images/activities/overlanding.jpg',
      '/images/tours/jairph-Edx0NpJ29fQ-unsplash.jpg',
      '/images/tours/jason-gardner-LU-o3CbeZhU-unsplash.jpg',
      '/images/tours/nino-gakhokia-24d9N5UsVYs-unsplash.jpg',
      '/images/svaneti.jpg',
      '/images/tours/andrew-rusinas-aFFKmsFoldc-unsplash.jpg',
    ],
    intro: `Some of Georgia's most spectacular landscapes are only reachable by 4x4 — and that's precisely why they feel like the end of the world in the best possible way. The Abano Pass road to Tusheti is one of the most dramatic mountain drives in Europe: steep, unpaved, and unforgettable. The Svaneti Military Road climbs through empty valleys to hamlets that time forgot. Khevsureti's stone-built fortresses sit at the end of tracks that most cars can't handle. Overlanding in Georgia means getting to places the hiking crowds haven't reached yet — and doing it with a guide who knows every turn, every mud patch, and every shortcut.`,
    whyUs: [
      'Experienced 4x4 drivers who know these routes in all conditions, including early-season mud and late-season snow.',
      'Well-maintained expedition vehicles with recovery gear on every trip.',
      'Flexible itineraries — push further or turn back based on real conditions, not a fixed schedule.',
    ],
    quickFacts: [
      { icon: 'difficulty', label: 'Difficulty range',  value: 'Scenic drives → Full expedition-style routes' },
      { icon: 'clock',      label: 'Typical length',    value: 'Day trips to week-long expeditions' },
      { icon: 'calendar',   label: 'Best season',       value: 'Jun–Sep for high routes; May & Oct for lower passes' },
      { icon: 'fitness',    label: 'Fitness needed',    value: 'No physical exertion required — just the appetite for adventure' },
      { icon: 'check',      label: 'Usually included',  value: 'Vehicle, experienced driver-guide, fuel, recovery equipment' },
    ],
    regions: [
      { slug: 'kakheti',         name: 'Tusheti (Kakheti)',  description: 'The legendary Abano Pass and the remote tower villages of the Tush highlands.',  image: '/images/tours/gio-chanturia-2aGoA1zcWfI-unsplash.jpg' },
      { slug: 'samegrelo',         name: 'Upper Svaneti',      description: 'The Svaneti Military Road and remote valley tracks above Mestia.',                 image: '/images/svaneti.jpg' },
      { slug: 'shida-kartli',    name: 'Khevsureti',         description: 'Medieval fortresses and stone villages at the end of mountain dirt tracks.',        image: '/images/tours/jason-gardner-LU-o3CbeZhU-unsplash.jpg' },
      { slug: 'racha-lechkhumi', name: 'Racha',              description: 'Wild river valleys and empty highland roads far from the tourist trail.',           image: '/images/tours/nadav-fima-ULn5jbPuHx8-unsplash.jpg' },
    ],
    difficultyLevels: [
      { level: 'Easy',        description: 'Paved or well-graded mountain roads. Scenic and accessible, no serious off-roading.',                           experience: 'No requirements. Suitable for all including families.' },
      { level: 'Moderate',    description: 'Unpaved mountain roads, river crossings, loose surfaces — manageable in dry conditions.',                       experience: 'Comfortable with rough terrain. No prior experience needed.' },
      { level: 'Challenging', description: 'Technical passes, serious off-roading, possible snow crossings. Expedition-style.',                             experience: 'Adventurous mindset. Early/late season routes add real challenge.' },
    ],
    seasons: [
      { period: 'Jun – Sep', note: 'All high passes open. Best window for Tusheti, Khevsureti, and Upper Svaneti routes.', type: 'prime' },
      { period: 'May & Oct', note: 'Many routes accessible but conditions vary. Mud and late/early snow possible on high passes.', type: 'good' },
      { period: 'Nov – Apr', note: 'Most highland passes closed by snow. Winter overlanding in lower elevations possible for experienced operators.', type: 'limited' },
    ],
    practical: [
      { heading: 'Vehicles',       body: 'We use high-clearance 4x4 vehicles (Land Cruiser, Delica) with all-terrain tyres, recovery gear, and communication equipment.' },
      { heading: 'Road conditions', body: 'High mountain roads in Georgia are often unpaved, narrow, and have steep drop-offs. Your driver is experienced — trust the process.' },
      { heading: 'Fuel & supplies', body: 'Remote routes have no petrol stations. We plan fuel stops carefully and carry reserves on longer expeditions.' },
      { heading: 'Accommodation',  body: 'Family guesthouses in highland villages are a real highlight — simple, warm, and often extraordinary food.' },
      { heading: 'What to pack',   body: 'Warm and waterproof layers, comfortable clothes for long vehicle days, camera, and an adventurous mindset.' },
    ],
    faq: [
      { q: 'Do I need to be fit for overlanding?',       a: 'No — overlanding is primarily vehicle-based. You should be comfortable with long hours of rough driving, but no physical exertion is required.' },
      { q: 'Is the Abano Pass road really that dramatic?', a: 'Yes. It\'s one of the most dramatic mountain roads in Europe — steep, narrow, and with sheer drops. Your driver knows every metre of it, but it\'s genuinely not for the faint-hearted.' },
      { q: 'Can we combine overlanding with hiking?',     a: 'Absolutely — many of our best itineraries mix 4x4 access with short treks to viewpoints, villages, or waterfalls you can\'t reach by road.' },
      { q: 'How many people per vehicle?',               a: 'Typically 4–6 passengers per vehicle. Larger groups use multiple vehicles, which adds to the expedition feel.' },
      { q: 'What if the pass is blocked?',               a: 'We always have contingency routes planned. Mountain conditions are checked the morning of departure, and we\'ll adjust the itinerary rather than take unnecessary risks.' },
    ],
  },

  // ── MIXED TOURS ────────────────────────────────────────────────────────────
  {
    slug: 'mixed-tours',
    name: 'Mixed Tours',
    tagline: 'Trekking, culture, wine, history — the full Georgia experience in one journey.',
    heroImage: '/images/georgia-hero.avif',
    metaTitle: 'Mixed Adventure Tours in Georgia',
    metaDescription: 'Multi-activity tours in Georgia combining trekking, culture, wine, history and adventure. The best of Georgia on private tours with local guides.',
    categoryTag: 'Mixed Tours',
    gallery: [
      '/images/activities/mixed-tours.jpg',
      '/images/georgia-hero.avif',
      '/images/tours/gio-chanturia-2aGoA1zcWfI-unsplash.jpg',
      '/images/tours/tomas-malik-EtvlvO4cF5I-unsplash.jpg',
      '/images/tours/andrew-rusinas-aFFKmsFoldc-unsplash.jpg',
      '/images/tours/jason-gardner-LU-o3CbeZhU-unsplash.jpg',
    ],
    intro: `Georgia rewards the curious. A single journey can take you from high-mountain glaciers to sun-drenched vineyards, from ancient cave monasteries carved into cliffsides to rooftop bars in Tbilisi's Old Town. Mixed tours are designed for travellers who don't want to choose — they want the mountains AND the culture, the adventure AND the food, the wild landscapes AND the ancient history. We combine the activities we know best into itineraries that show you what makes Georgia genuinely extraordinary, led by guides who love every part of it.`,
    whyUs: [
      'Deep knowledge of both adventure and cultural Georgia — we design itineraries that do justice to both.',
      'Private tours mean flexibility: if something sparks your interest, we can spend more time there.',
      'One guide, one team, one seamless journey — no handoffs, no coordination headaches.',
    ],
    quickFacts: [
      { icon: 'difficulty', label: 'Difficulty range',  value: 'Gentle cultural walks → Active multi-day adventures' },
      { icon: 'clock',      label: 'Typical length',    value: '4–14 days' },
      { icon: 'calendar',   label: 'Best season',       value: 'Apr–Oct (year-round for city-focused tours)' },
      { icon: 'fitness',    label: 'Fitness needed',    value: 'Varies — we match the active days to your group' },
      { icon: 'check',      label: 'Usually included',  value: 'Guide, transport, accommodation, most meals, all activities' },
    ],
    regions: [
      { slug: 'samegrelo',             name: 'Svaneti',        description: 'Tower villages, glaciers, and trekking combined with mountain culture.',           image: '/images/svaneti.jpg' },
      { slug: 'kakheti',             name: 'Kakheti',        description: 'Wine country, monasteries, and vineyard landscapes of east Georgia.',              image: '/images/tours/gio-chanturia-2aGoA1zcWfI-unsplash.jpg' },
      { slug: 'tbilisi',             name: 'Tbilisi',        description: 'The beating heart of Georgia — Old Town, Narikala, sulphur baths, and incredible food.', image: '/images/georgia-hero.avif' },
      { slug: 'samtskhe-javakheti',  name: 'Samtskhe-Javakheti', description: 'Vardzia cave monastery, Akhaltsikhe fortress, and dramatic volcanic plateaus.', image: '/images/tours/jason-gardner-LU-o3CbeZhU-unsplash.jpg' },
    ],
    difficultyLevels: [
      { level: 'Easy',        description: 'Cultural days, scenic drives, short walks. Active elements optional.',                                          experience: 'Anyone. Ideal for parties with varied fitness levels.' },
      { level: 'Moderate',    description: 'Half-day hikes, full active days, some elevation gain mixed with cultural visits.',                            experience: 'Comfortable walking for several hours. General fitness.' },
      { level: 'Challenging', description: 'Full trekking days combined with cultural immersion — genuinely active journeys.',                             experience: 'Good hiking fitness for the active components.' },
    ],
    seasons: [
      { period: 'May – Oct', note: 'The widest range of activities possible. Mountain regions open, weather reliable for outdoor activities.', type: 'prime' },
      { period: 'Nov – Apr', note: 'City, wine region, and monastery tours work beautifully. Mountain and trekking elements are limited.', type: 'good' },
      { period: 'Dec – Feb', note: 'Excellent for cultural tours with fewer crowds. Snow adds drama to monastery and fortress visits.', type: 'good' },
    ],
    practical: [
      { heading: 'Pacing',          body: 'Mixed tours are designed with recovery days and flexibility built in. We don\'t rush from site to site — every stop gets the time it deserves.' },
      { heading: 'Accommodation',   body: 'A mix of boutique guesthouses, family homes, and comfortable hotels depending on the region. We brief you on each before departure.' },
      { heading: 'Food & wine',     body: 'Georgian hospitality is extraordinary. Expect long, generous meals, natural wine (especially in Kakheti), and more khinkali than you think you can eat.' },
      { heading: 'Group size',      body: 'Mixed tours work best with 2–8 travelers. Every departure is private — your group only — so we stay flexible and genuinely local.' },
    ],
    faq: [
      { q: 'What does "mixed" mean exactly?',          a: 'It means we combine different types of activity and experience in one itinerary — trekking, cultural sightseeing, food experiences, wine tasting, village stays, and more — rather than focusing on one activity type.' },
      { q: 'Can you design a custom mixed itinerary?', a: 'Yes — this is one of our specialities. Tell us your dates, group size, interests, and fitness levels and we\'ll design something around you.' },
      { q: 'Is wine always included?',                 a: 'Not always, but we can always add wine tasting and vineyard visits if that\'s important to your group — especially in Kakheti, home of the world\'s oldest winemaking tradition.' },
      { q: 'Are mixed tours suitable for families?',   a: 'Yes — mixed tours are often the best option for families because the activity level can be adjusted each day to suit everyone.' },
    ],
  },

  // ── SUMMIT EXPERIENCE ──────────────────────────────────────────────────────
  {
    slug: 'summit-experience',
    name: 'Summit Experience',
    tagline: 'Stand on the roof of the Caucasus — guided ascents of Georgia\'s greatest peaks.',
    heroImage: '/images/kazbegi.jpg',
    metaTitle: 'Summit & Mountaineering Tours in Georgia',
    metaDescription: 'Guided summit ascents in Georgia: Mount Kazbek (5,047 m), Tetnuldi, Ushba. Experienced high-altitude guides. From acclimatisation treks to full mountaineering.',
    categoryTag: 'Summit Experience',
    gallery: [
      '/images/activities/summit.jpg',
      '/images/kazbegi.jpg',
      '/images/svaneti.jpg',
      '/images/tours/johannes-andersson-pmtllkyavOk-unsplash.jpg',
      '/images/tours/nika-tchokhonelidze-Ms_p0I5DQSM-unsplash.jpg',
      '/images/tours/nadav-fima-ULn5jbPuHx8-unsplash.jpg',
    ],
    intro: `The Greater Caucasus is home to some of the highest and most beautiful mountains in Europe — and Georgia gives you access to several of them. Mount Kazbek at 5,047 m is the classic objective: a long but non-technical glacier ascent that rewards fit, acclimatised alpinists with one of the most extraordinary views on the continent. Tetnuldi in Svaneti offers a more technical challenge above the tower villages. And the entire Caucasus ridge is dotted with objectives for those who want to go higher, further, and wilder. A summit here means something — the approaches are remote, the altitude is real, and the achievement is genuine.`,
    whyUs: [
      'Certified high-altitude guides with extensive Caucasus experience and mountain rescue qualifications.',
      'Thorough acclimatisation planning — we don\'t rush summit attempts.',
      'Complete high-mountain equipment available for hire or included depending on the package.',
    ],
    quickFacts: [
      { icon: 'difficulty', label: 'Difficulty range',  value: 'Acclimatisation treks → Technical alpine ascents' },
      { icon: 'clock',      label: 'Typical length',    value: '5–12 days including acclimatisation' },
      { icon: 'calendar',   label: 'Best season',       value: 'Jul–Aug (optimal); Jun & Sep (possible)' },
      { icon: 'fitness',    label: 'Fitness needed',    value: 'Excellent fitness and prior high-altitude experience recommended' },
      { icon: 'check',      label: 'Usually included',  value: 'Guide, permits, base camp support, technical equipment guidance' },
    ],
    regions: [
      { slug: 'mtskheta-mtianeti',   name: 'Kazbegi',  description: 'Mount Kazbek (5,047 m) — the iconic Caucasus summit and Georgia\'s most sought-after high peak.',   image: '/images/kazbegi.jpg' },
      { slug: 'samegrelo',   name: 'Svaneti',  description: 'Tetnuldi, Ushba, Shkhara — world-class alpine objectives above the tower villages of Mestia.',      image: '/images/svaneti.jpg' },
      { slug: 'racha-lechkhumi', name: 'Racha', description: 'Lesser-known high summits with dramatic approaches through remote mountain terrain.',             image: '/images/tours/nadav-fima-ULn5jbPuHx8-unsplash.jpg' },
    ],
    difficultyLevels: [
      { level: 'Easy',        description: 'High-altitude acclimatisation treks to base camps and viewpoints. No summit attempt.',                             experience: 'Good general fitness. Previous trekking experience helpful.' },
      { level: 'Moderate',    description: 'Non-technical summit routes (e.g. Kazbek) with glacier crossing. Crampons and ice axe required.',                 experience: 'Excellent fitness. Basic crampon/ice axe experience required or provided in pre-summit training.' },
      { level: 'Challenging', description: 'Technical alpine routes (Tetnuldi, Ushba ridges). Mixed terrain, rope work, significant commitment.',              experience: 'Alpine mountaineering experience required. Rope skills, crevasse awareness, prior high-altitude success.' },
    ],
    seasons: [
      { period: 'Jul – Aug',  note: 'Optimal summit windows. Highest chance of stable weather and good snow conditions on glacier routes.', type: 'prime' },
      { period: 'Jun & Sep',  note: 'Possible but variable. Early-season snow may persist; September can bring early autumn storms. Experienced teams only.', type: 'good' },
      { period: 'Oct – May',  note: 'High summits not recommended. Winter mountaineering is a specialist undertaking — not offered in our standard programme.', type: 'limited' },
    ],
    practical: [
      { heading: 'Acclimatisation', body: 'All summit programmes include dedicated acclimatisation days. We will not rush a summit attempt. Your guide will assess readiness at every stage.' },
      { heading: 'Altitude',        body: 'Kazbek reaches 5,047 m. Altitude sickness is a real risk above 3,500 m. Prior high-altitude experience is strongly recommended and must be declared.' },
      { heading: 'Equipment',       body: 'Technical mountaineering equipment (crampons, ice axes, harnesses, ropes, helmets) is required and can be hired. Quality boots are essential — do not compromise on footwear.' },
      { heading: 'Permits',         body: 'Some areas require border zone permits. We arrange all necessary paperwork as part of the package.' },
      { heading: 'Fitness',         body: 'Pre-trip preparation is critical. We recommend a structured training programme in the months before departure and will share guidelines on request.' },
    ],
    faq: [
      { q: 'Can a beginner climb Kazbek?',            a: 'Kazbek is non-technical but serious. A fit beginner with good preparation, a strong guide, and proper acclimatisation can succeed — but it should not be underestimated. Prior trekking at altitude (3,000 m+) is strongly recommended.' },
      { q: 'What is the success rate for Kazbek?',   a: 'With proper preparation and good conditions, most well-prepared clients reach the summit. Weather and altitude sickness are the main reasons for turnaround. We never push beyond safe limits.' },
      { q: 'What equipment do I need?',               a: 'Mountaineering boots, crampons, ice axe, harness, helmet, warm sleeping bag, and layered clothing system. We provide a full kit list and can hire most equipment in Tbilisi or Kazbegi.' },
      { q: 'How long does a Kazbek ascent take?',    a: 'A standard programme is 6–8 days including travel, acclimatisation, and one or two summit attempts depending on conditions.' },
      { q: 'Are there easier summit options?',        a: 'Yes — we run acclimatisation treks to Kazbek base camp (Meteo Station, ~3,650 m) that give the high-mountain experience without the full summit commitment.' },
    ],
  },

  // ── CLIMBING ───────────────────────────────────────────────────────────────
  {
    slug: 'climbing',
    name: 'Climbing',
    tagline: 'Georgia\'s limestone walls and mountain crags — a climber\'s secret waiting to be discovered.',
    heroImage: '/images/tours/johannes-andersson-pmtllkyavOk-unsplash.jpg',
    metaTitle: 'Rock Climbing Tours in Georgia',
    metaDescription: 'Guided rock climbing in Georgia: sport climbing, trad, and big wall near Tbilisi and across the Caucasus. All levels from beginner to advanced.',
    categoryTag: 'Climbing',
    gallery: [
      '/images/activities/climbing.jpg',
      '/images/tours/johannes-andersson-pmtllkyavOk-unsplash.jpg',
      '/images/tours/kim-cordenete-3hB68obZnHI-unsplash.jpg',
      '/images/kazbegi.jpg',
      '/images/tours/andrew-rusinas-aFFKmsFoldc-unsplash.jpg',
      '/images/svaneti.jpg',
    ],
    intro: `Georgia is a sleeping giant for rock climbers. The country's limestone and granite walls have hosted climbers for decades, but the rest of the world is only just catching up. Tbilisi's immediate surroundings offer accessible sport climbing crags with routes from 4 to 8a. Further afield, the Caucasus throws up serious objectives — multi-pitch routes on granite towers, traditional climbing in remote gorges, and big walls that have seen only a handful of ascents. Whether you're a beginner wanting your first time on rock or an experienced climber looking for new terrain, Georgia has something that will surprise you.`,
    whyUs: [
      'Certified climbing guides with first-ascent knowledge of local crags and the Caucasus big walls.',
      'All equipment provided — ropes, harnesses, helmets, quick draws.',
      'Teaching sessions for beginners through to multi-pitch guidance for experienced climbers.',
    ],
    quickFacts: [
      { icon: 'difficulty', label: 'Difficulty range',  value: 'Beginner intro sessions → Advanced multi-pitch routes' },
      { icon: 'clock',      label: 'Typical length',    value: 'Half-day intro to multi-day climbing trips' },
      { icon: 'calendar',   label: 'Best season',       value: 'Mar–Jun & Sep–Nov (spring/autumn); high crags Jul–Aug' },
      { icon: 'fitness',    label: 'Fitness needed',    value: 'Upper body strength helpful; technique taught from scratch' },
      { icon: 'check',      label: 'Usually included',  value: 'Guide, all hardware, instruction, transport to crag' },
    ],
    regions: [
      { slug: 'tbilisi',   name: 'Tbilisi area',     description: 'Accessible sport climbing crags within an hour of the city. Great for day sessions.',    image: '/images/georgia-hero.avif' },
      { slug: 'mtskheta-mtianeti',   name: 'Kazbegi',          description: 'Granite walls and multi-pitch routes beneath the shadow of Kazbek.',                     image: '/images/kazbegi.jpg' },
      { slug: 'samegrelo',   name: 'Svaneti',          description: 'Big walls and virgin granite in one of the world\'s most spectacular mountain settings.', image: '/images/svaneti.jpg' },
      { slug: 'adjara',    name: 'Adjara',           description: 'Coastal limestone crags and gorge walls with a backdrop of the Black Sea.',              image: '/images/tours/zviad-pharsenadze--cIcGJX4Gxk-unsplash.jpg' },
    ],
    difficultyLevels: [
      { level: 'Easy',        description: 'Intro sessions on low-angle sport routes. Learning to clip, belay, and move on rock.',                            experience: 'No experience needed. Anyone 8+ in reasonable health.' },
      { level: 'Moderate',    description: 'Leading sport routes (5–6c), multi-pitch on well-bolted lines, anchor building.',                               experience: 'Some prior climbing or bouldering experience. Good general fitness.' },
      { level: 'Challenging', description: 'Hard sport and trad routes (7a+), multi-pitch wilderness climbing, exposed ridges.',                             experience: 'Strong climbing fitness, leading ability, prior multi-pitch experience.' },
    ],
    seasons: [
      { period: 'Mar – Jun & Sep – Nov', note: 'Ideal for lower crags and Tbilisi-area sport climbing. Mild temperatures, good rock friction.', type: 'prime' },
      { period: 'Jul – Aug',             note: 'Hot at lower crags — better for high-altitude routes in Kazbegi and Svaneti where temperatures are pleasant.', type: 'good' },
      { period: 'Dec – Feb',             note: 'Possible on south-facing crags in good weather, but cold and short days limit the experience.', type: 'limited' },
    ],
    practical: [
      { heading: 'Equipment',       body: 'All hardware provided — ropes, harnesses, helmets, shoes (sizes available), quick draws, and cams for trad routes. Bring your own shoes if you have them.' },
      { heading: 'Footwear',        body: 'Climbing shoes make a significant difference. We have a hire fleet, but if you own shoes, bring them.' },
      { heading: 'Sun & heat',      body: 'Many Georgian crags face south. Bring sun protection, plenty of water, and plan rest breaks in shade on hot days.' },
      { heading: 'Multi-pitch',     body: 'Multi-pitch routes in the Caucasus are genuinely remote — guides carry emergency gear and communication equipment.' },
    ],
    faq: [
      { q: 'I\'ve never climbed before — can I try?',    a: 'Yes — our intro sessions are designed specifically for first-timers. You\'ll be on rock within the first hour, with full instruction on movement, safety, and equipment.' },
      { q: 'Do I need my own gear?',                     a: 'No — all equipment is provided. If you have your own climbing shoes or harness, bring them; otherwise we have everything you need.' },
      { q: 'Are there routes for experienced climbers?', a: 'Yes — Georgia has everything from well-bolted sport climbing to challenging trad and big wall objectives that will interest even experienced alpinists.' },
      { q: 'Is climbing safe?',                          a: 'All sessions are guided by certified instructors. Risk is managed through equipment checks, route selection, and continuous supervision. Like all adventure activities, it carries inherent risk that we manage professionally.' },
      { q: 'Can I combine climbing with other activities?', a: 'Yes — climbing pairs especially well with trekking and summit experiences. Ask about combined itineraries in Kazbegi or Svaneti.' },
    ],
  },
]

export function getActivityBySlug(slug: string): ActivityData | undefined {
  return ACTIVITIES_DATA.find(a => a.slug === slug)
}

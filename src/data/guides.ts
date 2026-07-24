export interface GuideSocial {
  type: 'instagram' | 'facebook'
  url: string
}

export interface Guide {
  key: string
  img: string
  name: string
  role: string
  disciplines: string[]
  /** Full bio for the dedicated Guides page. May contain multiple paragraphs separated by blank lines. */
  bio: string
  /** Shortened bio for the home team cards. Falls back to the first paragraph of `bio` when absent. */
  shortBio?: string
  quote?: string
  cert?: string
  langs: string
  exp?: string
  socials: GuideSocial[]
}

export const GUIDES: Guide[] = [
  {
    key: 'cotne',
    img: '/images/guides/cotne.png',
    name: 'Cotne',
    role: 'Founder & Lead Guide',
    disciplines: ['Trekking', 'Overlanding', 'Mountaineering', 'Climbing'],
    bio: "Our Schumacher of the mud and an ibex of the mountains. Cotne has spent half his life on the trail — and knows every path, tree, and stone in Georgia by heart.",
    cert: 'IFMGA Trekking Guide · Overland Guide · Alpine Guide · Ski Guide',
    langs: 'Georgian · English',
    socials: [
      { type: 'instagram', url: 'https://www.instagram.com/ts.mountain_/' },
    ],
  },
  {
    key: 'rezi',
    img: '/images/guides/rezi.jpg',
    name: 'Rezi',
    role: 'Founder & Cycling Guide',
    disciplines: ['Trekking', 'Cycling', 'Overlanding', 'Ski & Snowboard Instructor'],
    bio: "Rezi pedalled from Portugal to Sri Lanka in a pair of Crocs. Over those 14,000 kilometres he was robbed and beaten more than once — yet here he still is, ready to lead you through the adventures of our own country.",
    cert: 'Ski & Snowboard Instructor',
    langs: 'Georgian · English · Russian',
    socials: [
      { type: 'instagram', url: 'https://www.instagram.com/rezichkhaidze/' },
    ],
  },
  {
    key: 'tamo',
    img: '/images/guides/tamo.jpg',
    name: 'Tamo',
    role: 'Mountain & Cultural Guide',
    disciplines: ['Trekking', 'Cultural'],
    bio: `Hello, I'm Tamo, a mountain and adventure guide working across Georgia. I guide travelers through the mountains and unique landscapes of Georgia, sharing the places that continue to inspire me every single day.

My work is driven by a simple passion — helping people feel the beauty, freedom, and authenticity of this country. Whether we're hiking a wild trail, exploring remote villages, or discovering cultural treasures, I aim to create moments that stay with you long after the journey is over.

I speak English and Italian in addition to Georgian, and I enjoy meeting people from different parts of the world, connecting through nature, adventure, and shared stories.

If you're ready to experience Georgia through the eyes of someone who truly loves it, I'll be happy to guide your adventure.`,
    shortBio: "A mountain and adventure guide sharing Georgia's wild trails, remote villages, and cultural treasures — creating moments that stay with you long after the journey ends.",
    cert: 'Trekking Guide',
    langs: 'Georgian · English · Italian',
    socials: [
      { type: 'instagram', url: 'https://www.instagram.com/chichi_girl_/' },
    ],
  },
]

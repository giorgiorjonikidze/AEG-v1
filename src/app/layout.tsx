import type { Metadata } from 'next'
import {
  Cormorant_Garamond,
  DM_Sans,
  Hanken_Grotesk,
  Spectral,
} from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
})

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-spectral',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://adventure-experts-georgia.com'),
  title: {
    default: 'Adventure Experts Georgia — Guided Tours in the Caucasus',
    template: '%s | Adventure Experts Georgia',
  },
  description:
    'Private adventure tours and day trips across Georgia, led by certified local guides. Trekking, caving, canyoning, overlanding and more.',
  openGraph: {
    type: 'website',
    siteName: 'Adventure Experts Georgia',
    title: 'Adventure Experts Georgia — Guided Tours in the Caucasus',
    description:
      'Private adventure tours and day trips across Georgia, led by certified local guides.',
    images: ['/images/georgia-hero.avif'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${hanken.variable} ${spectral.variable}`}
      >
        {children}
      </body>
    </html>
  )
}

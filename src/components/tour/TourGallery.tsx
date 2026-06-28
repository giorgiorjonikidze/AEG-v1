'use client'
import { useState } from 'react'
import Image from 'next/image'
import type { TourData } from '@/data/tours'
import Lightbox from '@/components/Lightbox'

export default function TourGallery({ tour }: { tour: TourData }) {
  const [index, setIndex] = useState<number | null>(null)

  return (
    <section id="gallery" className="tp-gallery" style={{ padding: '52px 0 0' }}>
      <style>{`
        .gallery-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
        @media(min-width:600px){ .gallery-grid { grid-template-columns:repeat(3,1fr); } }
        .gallery-item { cursor:pointer; overflow:hidden; border-radius:12px; aspect-ratio:4/3; position:relative; }
        .gallery-item:first-child { grid-column:span 2; aspect-ratio:16/9; }
        .gallery-item img { transition:transform .4s ease; }
        .gallery-item:hover img { transform:scale(1.04); }
      `}</style>

      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#C75A37', marginBottom: 10, fontFamily: 'var(--font-hanken), sans-serif' }}>Gallery</div>
      <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontSize: 'clamp(26px,3vw,36px)', fontWeight: 500, color: '#1E1C19', margin: '0 0 24px', lineHeight: 1.15 }}>Scenes from the trail</h2>

      <div className="gallery-grid">
        {tour.gallery.map((img, i) => (
          <div key={img.src} className="gallery-item" onClick={() => setIndex(i)}>
            <Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover' }} sizes="(min-width:1200px) 380px, (min-width:600px) 33vw, 50vw" />
          </div>
        ))}
      </div>

      {index !== null && (
        <Lightbox
          images={tour.gallery}
          index={index}
          onClose={() => setIndex(null)}
          onPrev={() => setIndex(i => Math.max(0, (i ?? 0) - 1))}
          onNext={() => setIndex(i => Math.min(tour.gallery.length - 1, (i ?? 0) + 1))}
        />
      )}
    </section>
  )
}

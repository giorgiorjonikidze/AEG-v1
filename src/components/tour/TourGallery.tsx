'use client'
import { useState } from 'react'
import Image from 'next/image'
import type { TourData } from '@/data/tours'

export default function TourGallery({ tour }: { tour: TourData }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <section id="gallery" className="tp-gallery" style={{ padding: '52px 0 0' }}>
      <style>{`
        .gallery-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
        @media(min-width:600px){ .gallery-grid { grid-template-columns:repeat(3,1fr); } }
        .gallery-item { cursor:pointer; overflow:hidden; border-radius:12px; aspect-ratio:4/3; position:relative; }
        .gallery-item:first-child { grid-column:span 2; aspect-ratio:16/9; }
        .gallery-item img { transition:transform .4s ease; }
        .gallery-item:hover img { transform:scale(1.04); }
        .lb-bg { position:fixed; inset:0; z-index:100; background:rgba(0,0,0,.9); display:flex; align-items:center; justify-content:center; }
        .lb-img-wrap { position:relative; max-width:90vw; max-height:90vh; width:1000px; height:660px; }
      `}</style>

      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#C75A37', marginBottom: 10, fontFamily: 'var(--font-hanken), sans-serif' }}>Gallery</div>
      <h2 style={{ fontFamily: 'var(--font-spectral), serif', fontSize: 'clamp(26px,3vw,36px)', fontWeight: 500, color: '#1E1C19', margin: '0 0 24px', lineHeight: 1.15 }}>Scenes from the trail</h2>

      <div className="gallery-grid">
        {tour.gallery.map((img, i) => (
          <div key={img.src} className="gallery-item" onClick={() => setLightbox(i)}>
            <Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover' }} sizes="(min-width:1200px) 380px, (min-width:600px) 33vw, 50vw" />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', transition: 'background .2s' }} className="gallery-overlay" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lb-bg" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(l => l !== null && l > 0 ? l - 1 : l)} style={{ position: 'absolute', left: 16, background: 'rgba(255,255,255,.12)', border: 'none', borderRadius: '50%', width: 44, height: 44, color: '#fff', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
          <div className="lb-img-wrap" onClick={e => e.stopPropagation()}>
            <Image src={tour.gallery[lightbox].src} alt={tour.gallery[lightbox].alt} fill style={{ objectFit: 'contain' }} sizes="90vw" />
          </div>
          <button onClick={() => setLightbox(l => l !== null && l < tour.gallery.length - 1 ? l + 1 : l)} style={{ position: 'absolute', right: 16, background: 'rgba(255,255,255,.12)', border: 'none', borderRadius: '50%', width: 44, height: 44, color: '#fff', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
          <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,.12)', border: 'none', borderRadius: '50%', width: 36, height: 36, color: '#fff', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,.6)', fontSize: 13, fontFamily: 'var(--font-hanken), sans-serif' }}>{lightbox + 1} / {tour.gallery.length}</div>
        </div>
      )}
    </section>
  )
}

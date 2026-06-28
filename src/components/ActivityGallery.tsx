'use client'
import { useState } from 'react'
import Image from 'next/image'
import Lightbox from '@/components/Lightbox'

interface Props {
  images: string[]
  activityName: string
}

export default function ActivityGallery({ images, activityName }: Props) {
  const [index, setIndex] = useState<number | null>(null)

  const lightboxImages = images.map((src, i) => ({
    src,
    alt: `${activityName} in Georgia — photo ${i + 1}`,
  }))

  return (
    <>
      <style>{`
        .act-gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
        .act-gallery-main{grid-column:1/2;grid-row:1/3;aspect-ratio:3/4;}
        .act-gallery-img{position:relative;overflow:hidden;border-radius:6px;aspect-ratio:4/3;cursor:pointer;}
        .act-gallery-img img{object-fit:cover;transition:transform .5s ease;}
        .act-gallery-img:hover img{transform:scale(1.04);}
        .act-gallery-note{margin-top:14px;font-size:12.5px;color:#A8A296;display:flex;align-items:center;gap:7px;}
        @media(max-width:900px){
          .act-gallery-grid{grid-template-columns:1fr 1fr;}
          .act-gallery-main{grid-column:1/3;grid-row:auto;aspect-ratio:16/9;}
          .act-gallery-img{aspect-ratio:4/3;}
        }
        @media(max-width:480px){
          .act-gallery-grid{grid-template-columns:1fr;}
          .act-gallery-main{grid-column:auto;aspect-ratio:4/3;}
        }
      `}</style>

      <div className="act-gallery-grid">
        {images.slice(0, 6).map((src, i) => (
          <div
            key={src}
            className={`act-gallery-img${i === 0 ? ' act-gallery-main' : ''}`}
            onClick={() => setIndex(i)}
            role="button"
            tabIndex={0}
            aria-label={`Open photo ${i + 1}`}
            onKeyDown={e => e.key === 'Enter' && setIndex(i)}
          >
            <Image
              src={src}
              alt={`${activityName} in Georgia — photo ${i + 1}`}
              fill
              sizes="(max-width:480px) 100vw, (max-width:900px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      <p className="act-gallery-note">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
        All photos shot by Adventure Experts Georgia guides on location
      </p>

      {index !== null && (
        <Lightbox
          images={lightboxImages}
          index={index}
          onClose={() => setIndex(null)}
          onPrev={() => setIndex(i => Math.max(0, (i ?? 0) - 1))}
          onNext={() => setIndex(i => Math.min(images.length - 1, (i ?? 0) + 1))}
        />
      )}
    </>
  )
}

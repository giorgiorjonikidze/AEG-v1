'use client'
import { useEffect, useCallback } from 'react'
import Image from 'next/image'

interface Props {
  images: { src: string; alt: string }[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ images, index, onClose, onPrev, onNext }: Props) {
  const total = images.length

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape')     onClose()
    if (e.key === 'ArrowLeft')  onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(10,8,6,.94)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Image */}
      <div
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', width: 'min(92vw, 1080px)', height: 'min(82vh, 720px)' }}
      >
        <Image
          key={images[index].src}
          src={images[index].src}
          alt={images[index].alt}
          fill
          style={{ objectFit: 'contain' }}
          sizes="92vw"
          priority
        />
      </div>

      {/* Prev */}
      {index > 0 && (
        <button
          onClick={e => { e.stopPropagation(); onPrev() }}
          aria-label="Previous image"
          style={{ position: 'fixed', left: 'clamp(8px,3vw,28px)', top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, border: '1px solid rgba(255,255,255,.22)', borderRadius: '50%', background: 'rgba(255,255,255,.1)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
      )}

      {/* Next */}
      {index < total - 1 && (
        <button
          onClick={e => { e.stopPropagation(); onNext() }}
          aria-label="Next image"
          style={{ position: 'fixed', right: 'clamp(8px,3vw,28px)', top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, border: '1px solid rgba(255,255,255,.22)', borderRadius: '50%', background: 'rgba(255,255,255,.1)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      )}

      {/* Close */}
      <button
        onClick={e => { e.stopPropagation(); onClose() }}
        aria-label="Close"
        style={{ position: 'fixed', top: 16, right: 16, width: 40, height: 40, border: '1px solid rgba(255,255,255,.22)', borderRadius: '50%', background: 'rgba(255,255,255,.1)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>

      {/* Counter */}
      <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', fontSize: 13, color: 'rgba(255,255,255,.55)', fontFamily: 'var(--font-hanken), sans-serif', letterSpacing: '.05em', pointerEvents: 'none' }}>
        {index + 1} / {total}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import NextImage from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import type { RenderSlideProps, SlideImage } from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Image from '@/components/Image'

const basePath = process.env.BASE_PATH

type GalleryImage = {
  src: string
  alt?: string
}

type GalleryProps = {
  images: GalleryImage[]
}

function LightboxSlide({ slide, rect }: RenderSlideProps) {
  const s = slide as SlideImage
  return (
    <div style={{ position: 'relative', width: rect.width, height: rect.height }}>
      <NextImage
        fill
        alt={s.alt ?? ''}
        src={s.src}
        sizes={`${rect.width}px`}
        style={{ objectFit: 'contain' }}
      />
    </div>
  )
}

export default function Gallery({ images }: GalleryProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const slides: SlideImage[] = images.map(({ src, alt }) => ({
    src: `${basePath || ''}${src}`,
    alt: alt ?? '',
  }))

  return (
    <>
      <div className="my-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setIndex(i)
              setOpen(true)
            }}
            className="border-border-line hover:border-accent-green focus-visible:ring-accent-green relative aspect-square overflow-hidden rounded-sm border transition-colors focus:outline-none focus-visible:ring-2"
          >
            <Image
              src={img.src}
              alt={img.alt ?? ''}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        render={{ slide: LightboxSlide }}
      />
    </>
  )
}

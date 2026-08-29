import { useEffect, useState } from 'react'
import { RevealOnScroll } from './RevealOnScroll'

const photos = [
  {
    src: '/gallery/gallery-08.jpg',
    href: 'https://maps.app.goo.gl/q4SUyYb5UrjFBoyk7',
    alt: 'Power Green Global Logistics Courier Service Premises',
  },
  {
    src: '/gallery/gallery-07.jpg',
    href: 'https://maps.app.goo.gl/ZucoATkwZNm3BrRD7',
    alt: 'Power Green Colombo 06 Courier Service Shopfront',
  },
  {
    src: '/gallery/gallery-02.jpg',
    href: 'https://maps.app.goo.gl/CrEfh7yWpkgRk3Xx8',
    alt: 'Power Green Courier Service',
  },
  {
    src: '/gallery/gallery-03.jpg',
    href: 'https://maps.app.goo.gl/Eu57tuCKuP7LxqvD7',
    alt: 'Power Green Courier Service',
  },
  {
    src: '/gallery/gallery-04.jpg',
    href: 'https://maps.app.goo.gl/smJUhkLz8W3891899',
    alt: 'Power Green Courier Service Lorry',
  },
  {
    src: '/gallery/gallery-05.jpg',
    href: 'https://maps.app.goo.gl/2tMjPCTaQSRKzXfJ9',
    alt: 'Power Green Courier Service Office Interior',
  },
  {
    src: '/gallery/gallery-06.jpg',
    href: 'https://maps.app.goo.gl/Lxo2KKYQrQzHr5hr5',
    alt: 'Power Green Chavakachcheri Courier Service Shopfront',
  },
  {
    src: '/gallery/gallery-09.jpg',
    href: 'https://maps.app.goo.gl/Vu69yqfkWtYg1pUf6',
    alt: 'Power Green Courier Service Packing',
  },
]

export function Gallery() {
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    if (active === null) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null)
      if (event.key === 'ArrowRight') {
        setActive((current) =>
          current === null ? current : (current + 1) % photos.length,
        )
      }
      if (event.key === 'ArrowLeft') {
        setActive((current) =>
          current === null
            ? current
            : (current - 1 + photos.length) % photos.length,
        )
      }
    }

    window.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [active])

  return (
    <section
      className="bg-gradient-to-b from-white to-brand-green-50 py-14 md:py-section-padding"
      id="gallery"
    >
      <RevealOnScroll className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mx-auto mb-stack-lg max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-brand-gold-100 px-4 py-1.5 font-label-bold text-xs uppercase tracking-[0.18em] text-brand-gold-600">
            Our spaces
          </span>
          <h2 className="mb-4 font-headline-lg text-headline-lg text-brand-green-900">
            Gallery
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setActive(index)}
              className={`group relative overflow-hidden rounded-2xl bg-brand-green-100 ${
                photo.featured
                  ? 'col-span-2 row-span-2 min-h-[16rem] md:min-h-[28rem]'
                  : 'aspect-square'
              }`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span className="pointer-events-none absolute inset-0 bg-brand-green-950/0 transition-colors group-hover:bg-brand-green-950/20" />
            </button>
          ))}
        </div>
      </RevealOnScroll>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-green-950/90 p-4 md:p-10"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image"
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setActive(null)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <button
            type="button"
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:flex"
            onClick={(event) => {
              event.stopPropagation()
              setActive((current) =>
                current === null
                  ? current
                  : (current - 1 + photos.length) % photos.length,
              )
            }}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <figure
            className="max-h-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={photos[active].src}
              alt={photos[active].alt}
              className="max-h-[80vh] w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-brand-green-100">
              <span>{photos[active].alt}</span>
              <a
                href={photos[active].href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-label-bold text-brand-gold-300 hover:text-brand-gold-200"
              >
                View on Google Maps
                <span className="material-symbols-outlined text-base">
                  open_in_new
                </span>
              </a>
            </figcaption>
          </figure>
          <button
            type="button"
            aria-label="Next photo"
            className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:flex"
            onClick={(event) => {
              event.stopPropagation()
              setActive((current) =>
                current === null ? current : (current + 1) % photos.length,
              )
            }}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      )}
    </section>
  )
}

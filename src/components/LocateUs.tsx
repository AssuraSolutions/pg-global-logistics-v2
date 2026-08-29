import { RevealOnScroll } from './RevealOnScroll'

const locations = [
  {
    name: 'Wellawatta',
    addressLines: ['49, ST Lawrence Road, Colombo - 06, Sri Lanka.'],
    mapQuery: '49 ST Lawrence Road, Colombo 06, Sri Lanka',
    phone: '+94 117 207 236',
    phoneHref: 'tel:+94117207236',
    email: 'info@pglanka.com',
  },
  {
    name: 'Chavakachcheri',
    addressLines: ['No 41, Kachchai Road, Chavakachcheri, Sri Lanka.'],
    mapQuery: 'No 41, Kachchai Road, Chavakachcheri, Sri Lanka',
    phone: '021 720 0616',
    phoneHref: 'tel:+94217200616',
    email: 'info@pglanka.com',
  },
]

function mapEmbedUrl(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`
}

function mapOpenUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function LocateUs() {
  return (
    <section
      className="py-14 md:py-section-padding bg-gradient-to-b from-brand-gold-50 to-white"
      id="locate"
    >
      <RevealOnScroll className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <span className="inline-block rounded-full bg-brand-green-100 px-4 py-1.5 font-label-bold text-xs uppercase tracking-[0.18em] text-brand-green-700 mb-4">
          Branches
        </span>
        <h2 className="font-headline-lg text-headline-lg text-brand-green-900 mb-stack-lg">
          Locate Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-5xl mx-auto text-left">
          {locations.map((location) => (
            <div
              key={location.name}
              className="bg-white rounded-2xl border-2 border-brand-green-100 shadow-sm hover:shadow-lg hover:border-brand-gold-300 transition-all overflow-hidden flex flex-col"
            >
              <div className="relative h-44 w-full bg-surface-container sm:h-52">
                <iframe
                  title={`Map of ${location.name}`}
                  src={mapEmbedUrl(location.mapQuery)}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                {/* On touch devices the iframe would capture vertical swipes, so
                    cover it with a link that opens the Maps app instead. */}
                <a
                  href={mapOpenUrl(location.mapQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-end justify-end p-3 md:hidden"
                  aria-label={`Open ${location.name} in Google Maps`}
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-label-bold text-primary shadow-sm">
                    <span className="material-symbols-outlined text-base">
                      open_in_new
                    </span>
                    Open in Maps
                  </span>
                </a>
              </div>

              <div className="flex flex-grow flex-col p-5 sm:p-6">
                <h3 className="font-headline-md text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-container">
                    location_on
                  </span>
                  {location.name}
                </h3>

                <p className="font-body-md text-on-surface-variant mb-2">
                  {location.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>

                <p className="font-body-md text-on-surface-variant mb-2">
                  <strong>Phone:</strong>{' '}
                  <a
                    href={location.phoneHref}
                    className="hover:text-secondary transition-colors"
                  >
                    {location.phone}
                  </a>
                </p>

                <p className="font-body-md text-on-surface-variant mb-4">
                  <strong>Email:</strong>{' '}
                  <a
                    href={`mailto:${location.email}`}
                    className="hover:text-secondary transition-colors"
                  >
                    {location.email}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  )
}

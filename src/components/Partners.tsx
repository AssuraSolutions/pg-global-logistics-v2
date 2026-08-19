import { RevealOnScroll } from './RevealOnScroll'

const partners = [
  {
    name: 'DHL',
    logo: '/partners/dhl.svg',
    href: 'https://www.dhl.com',
  },
  {
    name: 'Aramex',
    logo: '/partners/aramex.svg',
    href: 'https://www.aramex.com',
  },
  {
    name: 'UPS',
    logo: '/partners/ups.svg',
    // Sourced from ups.com
    href: 'https://www.ups.com',
  },
  {
    name: 'SKY NET',
    logo: '/partners/skynet.png',
    // Sourced from skynet.net
    href: 'https://www.skynet.net',
  },
]

export function Partners() {
  return (
    <section
      className="py-14 md:py-section-padding bg-gradient-to-b from-white to-brand-gold-50"
      id="partners"
    >
      <RevealOnScroll className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <span className="inline-block rounded-full bg-brand-gold-100 px-4 py-1.5 font-label-bold text-xs uppercase tracking-[0.18em] text-brand-gold-600 mb-4">
          Carrier network
        </span>
        <h2 className="font-headline-lg text-headline-lg text-brand-green-900 mb-stack-lg">
          Our Partners
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-10">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <div className="flex h-24 w-full items-center justify-center rounded-2xl border-2 border-brand-green-100 bg-white px-4 py-4 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-brand-gold-300 group-hover:shadow-lg sm:h-32 sm:px-6 sm:py-5 lg:h-36">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-h-16 w-auto max-w-full object-contain sm:max-h-24 lg:max-h-28"
                />
              </div>
            </a>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  )
}

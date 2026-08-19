import { RevealOnScroll } from './RevealOnScroll'

type Service = {
  title: string
  shortDescription: string
  image: string
  hoverBorder: string
}

const services: Service[] = [
  {
    title: 'International Courier Services',
    shortDescription:
      'Deliver packages worldwide with trusted partners like DHL and Sky Net. Reliable, fast, and hassle-free courier solutions',
    image: '/services/Service1.png',
    hoverBorder: 'hover:border-brand-gold-300',
  },
  {
    title: 'Island-wide Transportation Services',
    shortDescription:
      'Ensure smooth transportation of goods across Sri Lanka with secure and timely delivery.',
    image: '/services/Service2.png',
    hoverBorder: 'hover:border-brand-green-500',
  },
  {
    title: 'Vacuum Packing',
    shortDescription:
      'Protect your shipments with professional vacuum packing services, ideal for fragile or delicate items.',
    image: '/services/Service3.png',
    hoverBorder: 'hover:border-brand-green-300',
  },
  {
    title: 'Wedding Logistics',
    shortDescription:
      'Specialized wedding transport services, ensuring smooth delivery of decorations and essentials.',
    image: '/services/Service4.png',
    hoverBorder: 'hover:border-brand-green-800',
  },
  {
    title: 'Export Solutions: Spices, Essential Oils & Garments',
    shortDescription:
      'Export premium Sri Lankan products, including spices like cinnamon and cardamom, high-quality essential oils, and various garments tailored to meet global standards.',
    image: '/services/Service5.png',
    hoverBorder: 'hover:border-brand-gold-300',
  },
  {
    title: 'Air Cargo / Sea Cargo',
    shortDescription:
      'Trusted expertise in property development, offering end-to-end support for your projects.',
    image: '/services/Service6.png',
    hoverBorder: 'hover:border-brand-green-500',
  },
]

export function Services() {
  return (
    <section
      className="bg-gradient-to-b from-white via-brand-green-50 to-white py-14 md:py-section-padding"
      id="services"
    >
      <RevealOnScroll className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mx-auto mb-stack-lg max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-brand-green-100 px-4 py-1.5 font-label-bold text-xs uppercase tracking-[0.18em] text-brand-green-700">
            What we move
          </span>
          <h2 className="mb-4 font-headline-lg text-headline-lg text-brand-green-900">
            International courier services made simple
          </h2>
          <p className="font-body-lg text-on-surface-variant">
            Tailored logistics solutions designed to meet the demands of modern
            global commerce.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className={`group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-transparent bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${service.hoverBorder}`}
            >
              <div className="relative h-48 w-full overflow-hidden bg-brand-green-100">
                <img
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={service.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green-950/60 to-transparent" />
              </div>
              <div className="flex flex-grow flex-col p-6">
                <h3 className="mb-2 font-headline-md text-lg font-semibold text-brand-green-900 transition-colors group-hover:text-brand-green-600">
                  {service.title}
                </h3>
                <p className="flex-grow font-body-md text-sm text-on-surface-variant">
                  {service.shortDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  )
}

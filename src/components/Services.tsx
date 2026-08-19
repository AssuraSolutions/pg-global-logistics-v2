import { RevealOnScroll } from './RevealOnScroll'

type Service = {
  title: string
  description: string
  icon: string
  image: string
  alt: string
  iconTone: string
  hoverBorder: string
}

const services: Service[] = [
  {
    title: 'International Courier',
    description:
      'Fast, reliable global shipping for packages of all sizes. Door-to-door service across our extensive network.',
    icon: 'flight_takeoff',
    alt: 'International Courier',
    iconTone: 'bg-brand-gold-300 text-brand-gold-700',
    hoverBorder: 'hover:border-brand-gold-300',
    image:
      'https://lh3.googleusercontent.com/aida/AP1WRLtNnsHhmoxB3K9cm5mtCFxOfByrwF_XvkV4l0uDjrI6jMiomQZugZNSlAnUIUqyi2qcCOAjNg9cVTBlA9x-cf2tP2PDuGLfoI6Z01dGaXunZgn1SJWO4cxci5x7X0UtwiSsp-hrg-56asikt-yTZ4JiQ3Km95s6MxliAjUmQM42dUNS-Jzj2hOcqYEom12b9aYYz4PGTeQqPMqJ26UcPlA94e7fwL6CEqz4G08W9Ihi4Yf037U6QdL0ZLcY',
  },
  {
    title: 'Document Delivery',
    description:
      'Secure and expedited handling for sensitive contracts, legal documents, and vital paperwork.',
    icon: 'description',
    alt: 'Document Delivery',
    iconTone: 'bg-brand-green-600 text-white',
    hoverBorder: 'hover:border-brand-green-500',
    image:
      'https://lh3.googleusercontent.com/aida/AP1WRLsZSWy3W4Wus9HsS55niTZg83nFKztao0FLIThvAwaImnT_03xVf2wHy-9_OVULgqy0LLTUqW22rHAU7ZsXX5cg5zKuxBGHd72TXbQ31gQf38ZQDeETMyj34pjMl1Vu_-wWOI5Sh4QJYUr9hkbNVE2jC_8wDpB_J-e_SvCyN53uSD1wsUMl3t8-kVPR8YDDAmKJqjETUQy9j-rBFdg0orf8qOyIHgVQNEFArCccuQuKgCBpASPVDgi3BWWZ',
  },
  {
    title: 'Parcel Delivery',
    description:
      'Cost-effective routing for standard parcels with full end-to-end visibility and tracking.',
    icon: 'inventory_2',
    alt: 'Parcel Delivery',
    iconTone: 'bg-brand-green-200 text-brand-green-800',
    hoverBorder: 'hover:border-brand-green-300',
    image:
      'https://lh3.googleusercontent.com/aida/AP1WRLuaVwbJjfzHw661eIW1uzk5hcnoaII6WkdpY25trOOeDjZDdj8owyhhE_9-5wuC1bw1-KHndseIR5jnzN4WpKIoxjnXNVWgjy9b27MN4RdxcR4EGS4ttWKmWOVeZvhDuZdmdO0QdzB_4nR894EeJc2AERaMeh5QSILIJU5DTXr5hHzToRcoGh5EyJ2j04Jz59Tw-eNNYSBj37se1cqXPlUMTtZxU8FkKpLmDMsovmtdT3Ap7LT8_Ib_pNY',
  },
  {
    title: 'Express Delivery',
    description:
      'When time is critical. Priority routing and next-flight-out services for urgent shipments.',
    icon: 'bolt',
    alt: 'Express Delivery',
    iconTone: 'bg-brand-green-900 text-brand-gold-300',
    hoverBorder: 'hover:border-brand-green-800',
    image:
      'https://lh3.googleusercontent.com/aida/AP1WRLvftgEDcIrF2ycb13Z5vpE7QT5MSWP1PqiqXqoM_ERMIYcJww388mzCS5G0_h-7tWbKRlPa6LIJISfCzJmEPUUKbuz2f5MGOwVapvza6XvA49OV5ANN-_JQtI5ZRm4yDe7HXL1a8pDvFwOJmOw8bC2iYbrE3NPMCcBsfue52PYdh4lBybF8jdssEEl3Qa9QLqJECxZxlAcmru_Z-HieH8GI-5lTDPLHt_k1I0Oad4RFgSHro1pYnl2nhmU',
  },
]

export function Services() {
  return (
    <section
      className="py-14 md:py-section-padding bg-gradient-to-b from-white via-brand-green-50 to-white"
      id="services"
    >
      <RevealOnScroll className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center max-w-3xl mx-auto mb-stack-lg">
          <span className="inline-block rounded-full bg-brand-green-100 px-4 py-1.5 font-label-bold text-xs uppercase tracking-[0.18em] text-brand-green-700 mb-4">
            What we move
          </span>
          <h2 className="font-headline-lg text-headline-lg text-brand-green-900 mb-4">
            International courier services made simple
          </h2>
          <p className="font-body-lg text-on-surface-variant">
            Tailored logistics solutions designed to meet the demands of modern
            global commerce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {services.map((service) => (
            <div
              key={service.title}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent ${service.hoverBorder} flex flex-col h-full group`}
            >
              <div className="h-48 w-full overflow-hidden relative">
                <img
                  alt={service.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={service.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green-950/60 to-transparent" />
                <div
                  className={`absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${service.iconTone}`}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {service.icon}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-headline-md text-lg font-semibold text-brand-green-900 mb-2 transition-colors group-hover:text-brand-green-600">
                  {service.title}
                </h3>
                <p className="font-body-md text-on-surface-variant text-sm mb-6 flex-grow">
                  {service.description}
                </p>
                <a
                  className="text-brand-green-700 font-label-bold hover:text-brand-gold-500 transition-colors inline-flex items-center gap-1 mt-auto"
                  href="#quote"
                >
                  Learn More{' '}
                  <span className="material-symbols-outlined text-sm">
                    arrow_right_alt
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  )
}

import { RevealOnScroll } from './RevealOnScroll'

const highlights = [
  {
    icon: 'inventory',
    title: 'Merchant exporter',
    copy: 'Spices, essential oils, tea and garments sourced across Sri Lanka.',
    tone: 'bg-brand-gold-50 text-brand-gold-600 border-brand-gold-200',
  },
  {
    icon: 'agriculture',
    title: 'Direct partnerships',
    copy: 'Tie-ups with farmers and millers keep the supply chain dependable.',
    tone: 'bg-brand-green-50 text-brand-green-700 border-brand-green-200',
  },
  {
    icon: 'swap_horiz',
    title: 'No middlemen',
    copy: 'A seamless export-import process from pickup through delivery.',
    tone: 'bg-brand-green-100 text-brand-green-800 border-brand-green-300',
  },
]

export function About() {
  return (
    <section className="py-14 md:py-section-padding bg-white" id="about">
      <RevealOnScroll className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-green-900 via-brand-green-800 to-brand-green-700 px-6 py-12 md:px-12 md:py-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-gold-300/20 blur-3xl" />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block rounded-full bg-brand-gold-300/15 px-4 py-1.5 font-label-bold text-xs uppercase tracking-[0.18em] text-brand-gold-200 mb-4">
                About us
              </span>
              <h2 className="font-headline-lg text-headline-lg text-white mb-5">
                Built on trust, grown through delivery
              </h2>
              <p className="font-body-md text-brand-green-200 leading-relaxed">
                Power Green is a leading and reputed organization specializing as
                an established merchant trader and exporter of Sri Lankan spices,
                essential oils, tea, and garments. Over time, Power Green has
                carved a niche as a leading merchant exporter. The driving force
                behind its success is a vision to deliver the best, setting high
                goals and standards.
              </p>
            </div>

            <div className="grid gap-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className={`flex items-start gap-4 rounded-2xl border p-5 ${item.tone}`}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-headline-md text-base mb-1">
                      {item.title}
                    </p>
                    <p className="font-body-md text-sm opacity-80">
                      {item.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}

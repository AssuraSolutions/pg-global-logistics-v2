import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from 'react'
import MainDeliveryType from '../data/TrackOrder.json'
import { RevealOnScroll } from './RevealOnScroll'

type SubType = {
  partner: string
  url: string
  Suffix: string
}

type DeliveryType = {
  Text: string
  Value: number
  subTypes: SubType[]
}

const deliveryTypes = MainDeliveryType as DeliveryType[]
const deliveryOptions = deliveryTypes.filter((type) => type.Value !== 0)

const partnerLogos: Record<string, string> = {
  DHL: '/partners/dhl.svg',
  Aramex: '/partners/aramex.svg',
  UPS: '/partners/ups.svg',
  SkyNet: '/partners/skynet.png',
}

export function TrackOrder() {
  const [deliveryType, setDeliveryType] = useState('International Delivery')
  const [subType, setSubType] = useState('')
  const [trackingId, setTrackingId] = useState('')
  const trackingInputRef = useRef<HTMLInputElement>(null)

  const selectedType = useMemo(
    () => deliveryTypes.find((type) => type.Text === deliveryType),
    [deliveryType],
  )

  const partners = useMemo(
    () =>
      (selectedType?.subTypes ?? []).filter(
        (sub) => sub.partner !== 'Select Partner' && Boolean(sub.url),
      ),
    [selectedType],
  )

  const selectedPartner = useMemo(
    () => partners.find((sub) => sub.partner === subType),
    [partners, subType],
  )

  const isLocal = deliveryType === 'Local Delivery'
  const canTrack = Boolean(selectedPartner?.url && trackingId.trim())

  const step = isLocal ? 1 : selectedPartner ? 3 : subType ? 3 : 2

  useEffect(() => {
    if (selectedPartner) {
      trackingInputRef.current?.focus()
    }
  }, [selectedPartner])

  const chooseDelivery = (nextType: string) => {
    setDeliveryType(nextType)
    setSubType('')
    setTrackingId('')
  }

  const choosePartner = (partner: string) => {
    setSubType(partner)
    setTrackingId('')
  }

  const handleTrack = (event: FormEvent) => {
    event.preventDefault()
    if (!canTrack || !selectedPartner?.url) return

    window.open(
      `${selectedPartner.url}${trackingId.trim()}${selectedPartner.Suffix}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <section
      className="py-14 md:py-section-padding bg-gradient-to-br from-brand-green-950 via-brand-green-900 to-brand-green-800"
      id="track"
    >
      <RevealOnScroll className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-8">
          <span className="inline-block rounded-full bg-brand-gold-300/15 px-4 py-1.5 font-label-bold text-xs uppercase tracking-[0.18em] text-brand-gold-200 mb-4">
            Tracking
          </span>
          <h2 className="font-headline-lg text-headline-lg text-white mb-2">
            Track Your Shipment
          </h2>
          <p className="font-body-md text-brand-green-200">
            Three quick taps — scope, carrier, then your tracking number.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[
            { n: 1, label: 'Scope' },
            { n: 2, label: 'Carrier' },
            { n: 3, label: 'Track' },
          ].map((item, index) => {
            const done = step > item.n || (item.n === 1 && Boolean(deliveryType))
            const current = step === item.n
            return (
              <div key={item.n} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-label-bold transition-colors duration-300 ${
                      done || current
                        ? 'bg-brand-gold-300 text-brand-gold-700'
                        : 'bg-white/10 text-brand-green-300'
                    }`}
                  >
                    {done && !current ? (
                      <span className="material-symbols-outlined text-base">
                        check
                      </span>
                    ) : (
                      item.n
                    )}
                  </span>
                  <span
                    className={`text-sm font-label-bold hidden sm:inline transition-colors ${
                      current ? 'text-white' : 'text-brand-green-300'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {index < 2 && (
                  <div
                    className={`h-0.5 w-8 sm:w-12 rounded-full transition-colors duration-300 ${
                      step > item.n ? 'bg-brand-gold-300' : 'bg-white/20'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>

        <form
          onSubmit={handleTrack}
          className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-md overflow-hidden"
        >
          {/* Step 1 — segmented scope */}
          <div className="p-5 md:p-6 border-b border-outline-variant/20">
            <p className="font-label-bold text-xs tracking-[0.12em] uppercase text-outline mb-3">
              Shipping scope
            </p>
            <div
              className="relative grid grid-cols-2 p-1 rounded-xl bg-surface-container gap-1"
              role="tablist"
              aria-label="Shipping scope"
            >
              {deliveryOptions.map((type) => {
                const selected = deliveryType === type.Text
                return (
                  <button
                    key={type.Text}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => chooseDelivery(type.Text)}
                    className={`relative z-10 rounded-lg px-3 py-3 text-sm font-label-bold transition-all duration-200 ${
                      selected
                        ? 'bg-surface-container-lowest text-primary shadow-sm'
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg align-middle mr-1.5">
                      {type.Text === 'Local Delivery' ? 'home_pin' : 'public'}
                    </span>
                    {type.Text === 'Local Delivery' ? 'Local' : 'International'}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 2 / notice — animated panel */}
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              isLocal || !isLocal ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="overflow-hidden">
              {isLocal ? (
                <div className="px-5 md:px-6 py-5 animate-[fadeSlide_0.3s_ease-out]">
                  <div className="rounded-xl bg-surface-container px-4 py-4 flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-xl mt-0.5">
                      schedule
                    </span>
                    <div>
                      <p className="font-label-bold text-primary text-sm mb-1">
                        Local tracking coming soon
                      </p>
                      <p className="text-sm text-on-surface-variant">
                        Switch to International to track DHL, Aramex, UPS, or
                        SkyNet shipments right away.
                      </p>
                      <button
                        type="button"
                        onClick={() => chooseDelivery('International Delivery')}
                        className="mt-3 text-sm font-label-bold text-secondary hover:text-secondary-container transition-colors"
                      >
                        Use International tracking →
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="px-5 md:px-6 py-5 border-b border-outline-variant/20 animate-[fadeSlide_0.3s_ease-out]">
                  <p className="font-label-bold text-xs tracking-[0.12em] uppercase text-outline mb-3">
                    Carrier
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {partners.map((partner) => {
                      const selected = subType === partner.partner
                      const logo = partnerLogos[partner.partner]

                      return (
                        <button
                          key={partner.partner}
                          type="button"
                          onClick={() => choosePartner(partner.partner)}
                          className={`inline-flex items-center gap-2 rounded-full border pl-2 pr-4 py-2 transition-all duration-200 ${
                            selected
                              ? 'border-secondary-container bg-secondary-container/20 shadow-sm scale-[1.02]'
                              : 'border-outline-variant/50 bg-surface hover:border-surface-tint/50 hover:bg-surface-subtle'
                          }`}
                        >
                          {logo ? (
                            <span className="h-8 w-8 rounded-full bg-white border border-outline-variant/30 flex items-center justify-center overflow-hidden">
                              <img
                                src={logo}
                                alt=""
                                className="h-5 w-auto max-w-[22px] object-contain"
                              />
                            </span>
                          ) : null}
                          <span className="font-label-bold text-sm text-primary">
                            {partner.partner}
                          </span>
                          {selected && (
                            <span className="material-symbols-outlined text-secondary text-base">
                              check_circle
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Step 3 — tracking input */}
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              selectedPartner ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-5 md:px-6 py-5 bg-surface/60">
                <label
                  className="block font-label-bold text-xs tracking-[0.12em] uppercase text-outline mb-3"
                  htmlFor="trackingId"
                >
                  {selectedPartner?.partner} tracking number
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <span className="material-symbols-outlined text-outline absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      confirmation_number
                    </span>
                    <input
                      ref={trackingInputRef}
                      id="trackingId"
                      type="text"
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-secondary-container focus:border-transparent transition-all text-primary font-body-md"
                      placeholder="e.g. 1234567890"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!canTrack}
                    className="inline-flex items-center justify-center gap-2 bg-secondary-container text-on-secondary-container font-label-bold px-7 py-3.5 rounded-xl hover:bg-secondary hover:text-on-secondary transition-all shadow-sm active:scale-95 disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap"
                  >
                    Track
                    <span className="material-symbols-outlined text-lg">
                      arrow_forward
                    </span>
                  </button>
                </div>
                <p className="mt-3 text-xs text-outline">
                  Opens {selectedPartner?.partner} tracking in a new tab.
                </p>
              </div>
            </div>
          </div>
        </form>
      </RevealOnScroll>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { RevealOnScroll } from './RevealOnScroll'

type RequestTypeValue = '' | 'deliveryRequest' | 'complaint' | 'inquiry'

type QuoteFormState = {
  email: string
  name: string
  phoneNumber: string
  requestType: RequestTypeValue
  purpose: string
  deliveryType: string
  partner: string
  trackingNumber: string
  message: string
}

type QuoteErrors = Partial<Record<keyof QuoteFormState, string>>

const initialState: QuoteFormState = {
  email: '',
  name: '',
  phoneNumber: '',
  requestType: '',
  purpose: '',
  deliveryType: '',
  partner: '',
  trackingNumber: '',
  message: '',
}

const requestTypes = [
  { value: '', label: 'Select Request Type' },
  { value: 'deliveryRequest', label: 'Delivery Request' },
  { value: 'complaint', label: 'Complaint' },
  { value: 'inquiry', label: 'General Inquiry' },
] as const

const purposes = [
  { value: '', label: 'Select Purpose' },
  { value: 'personal', label: 'Personal' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'gift', label: 'Gift' },
  { value: 'sample', label: 'Sample' },
]

const deliveryTypes = [
  { value: '', label: 'Select Delivery Type', deliveryTime: '' },
  { value: 'local', label: 'Local Delivery', deliveryTime: '(1–2 Days)' },
  {
    value: 'international',
    label: 'International Delivery',
    deliveryTime: '(3–7 Days)',
  },
  { value: 'express', label: 'Express', deliveryTime: '(1–3 Days)' },
]

const partners = [
  { value: 'DHL', logoName: 'DHL' },
  { value: 'Aramex', logoName: 'Aramex' },
  { value: 'UPS', logoName: 'UPS' },
  { value: 'SkyNet', logoName: 'SkyNet' },
]

const inputClass =
  'w-full bg-white border border-brand-green-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold-300 focus:border-transparent transition-all'
const selectClass = `${inputClass} appearance-none cursor-pointer bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`
const selectChevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23424843' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")"
const errorClass = 'border-red-400 focus:ring-red-300'

const QUOTE_EMAIL = 'info@pglanka.com'

function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function labelFor(options: readonly { value: string; label: string }[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value
}

function buildMailto(form: QuoteFormState, agreeToPromotions: boolean) {
  const requestLabel = labelFor(requestTypes, form.requestType)
  const lines = [
    `Name: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    `WhatsApp: ${form.phoneNumber}`,
    `Request Type: ${requestLabel}`,
  ]

  if (form.requestType === 'deliveryRequest') {
    const delivery = deliveryTypes.find((option) => option.value === form.deliveryType)
    lines.push(`Purpose: ${labelFor(purposes, form.purpose)}`)
    lines.push(
      `Delivery Type: ${delivery ? `${delivery.label} ${delivery.deliveryTime}`.trim() : form.deliveryType}`,
    )
    lines.push(`Promotional offers: ${agreeToPromotions ? 'Yes' : 'No'}`)
  }

  if (form.requestType === 'complaint') {
    lines.push(`Partner: ${form.partner}`)
    lines.push(`Tracking Number: ${form.trackingNumber.trim()}`)
  }

  lines.push('', 'Message:', form.message.trim())

  const subject = `Quote request — ${requestLabel} — ${form.name.trim()}`
  const body = lines.join('\n')

  return `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1.5 text-sm text-red-600">{message}</p>
}

export function QuoteForm() {
  const [form, setForm] = useState<QuoteFormState>(initialState)
  const [errors, setErrors] = useState<QuoteErrors>({})
  const [agreeToPromotions, setAgreeToPromotions] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const applyRequestType = (type: string) => {
      if (type !== 'complaint' && type !== 'deliveryRequest' && type !== 'inquiry') {
        return
      }
      setSubmitted(false)
      setForm((prev) => ({
        ...prev,
        requestType: type,
        purpose: '',
        deliveryType: '',
        partner: '',
        trackingNumber: '',
      }))
    }

    const onQuoteType = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail
      applyRequestType(detail)
    }

    window.addEventListener('quote:request-type', onQuoteType)
    return () => window.removeEventListener('quote:request-type', onQuoteType)
  }, [])

  const update =
    (field: keyof QuoteFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = event.target.value
      setSubmitted(false)
      setForm((prev) => {
        if (field === 'requestType') {
          return {
            ...prev,
            requestType: value as RequestTypeValue,
            purpose: '',
            deliveryType: '',
            partner: '',
            trackingNumber: '',
          }
        }
        return { ...prev, [field]: value }
      })
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

  const validate = () => {
    const next: QuoteErrors = {}

    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!isEmailValid(form.email)) next.email = 'Enter a valid email address.'

    if (!form.name.trim()) next.name = 'Name is required.'

    if (!form.phoneNumber) next.phoneNumber = 'WhatsApp number is required.'
    else if (!isValidPhoneNumber(form.phoneNumber)) {
      next.phoneNumber = 'Enter a valid WhatsApp number.'
    }

    if (!form.requestType) next.requestType = 'Select a request type.'

    if (form.requestType === 'deliveryRequest') {
      if (!form.purpose) next.purpose = 'Select a purpose.'
      if (!form.deliveryType) next.deliveryType = 'Select a delivery type.'
    }

    if (form.requestType === 'complaint') {
      if (!form.partner) next.partner = 'Select a partner.'
      if (!form.trackingNumber.trim()) {
        next.trackingNumber = 'Tracking number is required.'
      }
    }

    if (!form.message.trim()) next.message = 'Message is required.'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!validate()) return

    window.location.href = buildMailto(form, agreeToPromotions)
    setSubmitted(true)
    setForm(initialState)
    setAgreeToPromotions(false)
  }

  return (
    <section
      className="bg-gradient-to-b from-white via-brand-green-50 to-brand-green-100 py-14 md:py-section-padding"
      id="quote"
    >
      <RevealOnScroll className="mx-auto max-w-3xl px-margin-mobile md:px-margin-desktop">
        <div className="mb-stack-lg text-center">
          <span className="mb-4 inline-block rounded-full bg-brand-gold-100 px-4 py-1.5 font-label-bold text-xs uppercase tracking-[0.18em] text-brand-gold-600">
            Get started
          </span>
          <h2 className="mb-4 font-headline-lg text-headline-lg text-brand-green-900">
            Get a Quote
          </h2>
          <p className="font-body-lg text-on-surface-variant">
            Tell us what you need and our team will get back to you with a
            customized logistics solution.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid grid-cols-1 gap-5 rounded-3xl border-2 border-brand-green-100 bg-white p-5 shadow-xl sm:p-8"
        >
          <div>
            <label className="mb-2 block font-label-bold text-sm text-on-surface" htmlFor="email">
              Email
            </label>
            <input
              className={`${inputClass} ${errors.email ? errorClass : ''}`}
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={update('email')}
              required
            />
            <FieldError message={errors.email} />
          </div>

          <div>
            <label className="mb-2 block font-label-bold text-sm text-on-surface" htmlFor="name">
              Name
            </label>
            <input
              className={`${inputClass} ${errors.name ? errorClass : ''}`}
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={update('name')}
              required
            />
            <FieldError message={errors.name} />
          </div>

          <div>
            <label className="mb-2 block font-label-bold text-sm text-on-surface" htmlFor="phoneNumber">
              WhatsApp Number
            </label>
            <div
              className={`quote-phone ${errors.phoneNumber ? 'quote-phone-invalid' : ''}`}
            >
              <PhoneInput
                international
                defaultCountry="LK"
                placeholder="WhatsApp Number"
                value={form.phoneNumber}
                onChange={(value) => {
                  setSubmitted(false)
                  setForm((prev) => ({ ...prev, phoneNumber: value ?? '' }))
                  setErrors((prev) => ({ ...prev, phoneNumber: undefined }))
                }}
              />
            </div>
            <FieldError message={errors.phoneNumber} />
          </div>

          <div>
            <label className="mb-2 block font-label-bold text-sm text-on-surface" htmlFor="requestType">
              Request Type
            </label>
            <select
              className={`${selectClass} ${errors.requestType ? errorClass : ''}`}
              id="requestType"
              name="requestType"
              value={form.requestType}
              onChange={update('requestType')}
              style={{ backgroundImage: selectChevron }}
              required
            >
              {requestTypes.map((option) => (
                <option key={option.value || 'empty'} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FieldError message={errors.requestType} />
          </div>

          {form.requestType === 'deliveryRequest' && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block font-label-bold text-sm text-on-surface" htmlFor="purpose">
                  Purpose
                </label>
                <select
                  className={`${selectClass} ${errors.purpose ? errorClass : ''}`}
                  id="purpose"
                  name="purpose"
                  value={form.purpose}
                  onChange={update('purpose')}
                  style={{ backgroundImage: selectChevron }}
                  required
                >
                  {purposes.map((option) => (
                    <option key={option.value || 'empty'} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.purpose} />
              </div>
              <div>
                <label className="mb-2 block font-label-bold text-sm text-on-surface" htmlFor="deliveryType">
                  Delivery Type
                </label>
                <select
                  className={`${selectClass} ${errors.deliveryType ? errorClass : ''}`}
                  id="deliveryType"
                  name="deliveryType"
                  value={form.deliveryType}
                  onChange={update('deliveryType')}
                  style={{ backgroundImage: selectChevron }}
                  required
                >
                  {deliveryTypes.map((option) => (
                    <option key={option.value || 'empty'} value={option.value}>
                      {option.label}
                      {option.deliveryTime ? ` ${option.deliveryTime}` : ''}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.deliveryType} />
              </div>
            </div>
          )}

          {form.requestType === 'complaint' && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block font-label-bold text-sm text-on-surface" htmlFor="partner">
                  Partner
                </label>
                <select
                  className={`${selectClass} ${errors.partner ? errorClass : ''}`}
                  id="partner"
                  name="partner"
                  value={form.partner}
                  onChange={update('partner')}
                  style={{ backgroundImage: selectChevron }}
                  required
                >
                  <option value="">Select Partner</option>
                  {partners.map((partner) => (
                    <option key={partner.value} value={partner.value}>
                      {partner.logoName}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.partner} />
              </div>
              <div>
                <label
                  className="mb-2 block font-label-bold text-sm text-on-surface"
                  htmlFor="trackingNumber"
                >
                  Tracking Number
                </label>
                <input
                  className={`${inputClass} ${errors.trackingNumber ? errorClass : ''}`}
                  id="trackingNumber"
                  name="trackingNumber"
                  type="text"
                  placeholder="Tracking Number"
                  value={form.trackingNumber}
                  onChange={update('trackingNumber')}
                  required
                />
                <FieldError message={errors.trackingNumber} />
              </div>
            </div>
          )}

          <div>
            <label className="mb-2 block font-label-bold text-sm text-on-surface" htmlFor="message">
              Message
            </label>
            <textarea
              className={`${inputClass} h-32 resize-none ${errors.message ? errorClass : ''}`}
              id="message"
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={update('message')}
              required
            />
            <FieldError message={errors.message} />
          </div>

          {isEmailValid(form.email) && form.requestType === 'deliveryRequest' && (
            <label className="flex items-start gap-3 text-sm text-on-surface-variant">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-brand-green-200 text-brand-gold-300 focus:ring-brand-gold-300"
                checked={agreeToPromotions}
                onChange={(event) => setAgreeToPromotions(event.target.checked)}
              />
              I agree to receive promotional offers and updates.
            </label>
          )}

          {submitted && (
            <p className="rounded-xl bg-brand-green-50 px-4 py-3 text-sm text-brand-green-800">
              Thank you. Your email app should open with the quote details for
              info@pglanka.com. Send that message to complete your request.
            </p>
          )}

          <div className="flex justify-end">
            <button
              className="w-full rounded-xl bg-brand-gold-300 px-8 py-4 font-label-bold text-brand-gold-700 shadow-lg shadow-brand-gold-300/20 transition-colors hover:bg-brand-green-700 hover:text-white active:scale-95 md:w-auto"
              type="submit"
            >
              Send Message
            </button>
          </div>
        </form>
      </RevealOnScroll>
    </section>
  )
}

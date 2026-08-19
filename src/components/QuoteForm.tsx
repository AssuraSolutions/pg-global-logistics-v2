import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import { RevealOnScroll } from './RevealOnScroll'

type QuoteFormState = {
  fullName: string
  email: string
  phone: string
  pickup: string
  delivery: string
  shipmentType: string
  weight: string
  message: string
}

type FormFieldEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>

const initialState: QuoteFormState = {
  fullName: '',
  email: '',
  phone: '',
  pickup: '',
  delivery: '',
  shipmentType: '',
  weight: '',
  message: '',
}

const inputClass =
  'w-full bg-white border border-brand-green-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold-300 focus:border-transparent transition-all'

export function QuoteForm() {
  const [form, setForm] = useState<QuoteFormState>(initialState)

  const update = (field: keyof QuoteFormState) => (e: FormFieldEvent) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.fullName || !form.email || !form.phone) {
      alert('Please fill in your name, email, and phone number.')
      return
    }
    alert('Thank you! Your quote request has been submitted. We will contact you shortly.')
    setForm(initialState)
  }

  return (
    <section
      className="py-14 md:py-section-padding bg-gradient-to-b from-white via-brand-green-50 to-brand-green-100"
      id="quote"
    >
      <RevealOnScroll className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-stack-lg">
          <span className="inline-block rounded-full bg-brand-gold-100 px-4 py-1.5 font-label-bold text-xs uppercase tracking-[0.18em] text-brand-gold-600 mb-4">
            Get started
          </span>
          <h2 className="font-headline-lg text-headline-lg text-brand-green-900 mb-4">
            Request a Quote
          </h2>
          <p className="font-body-lg text-on-surface-variant">
            Fill out the form below and our team will get back to you with a
            customized logistics solution.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-5 rounded-3xl border-2 border-brand-green-100 bg-white p-5 shadow-xl sm:p-8 md:grid-cols-2 md:gap-6"
        >
          <div className="col-span-1 md:col-span-2">
            <label
              className="block text-sm font-label-bold text-on-surface mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              className={inputClass}
              id="fullName"
              placeholder="John Doe"
              type="text"
              value={form.fullName}
              onChange={update('fullName')}
            />
          </div>

          <div>
            <label
              className="block text-sm font-label-bold text-on-surface mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className={inputClass}
              id="email"
              placeholder="john@example.com"
              type="email"
              value={form.email}
              onChange={update('email')}
            />
          </div>

          <div>
            <label
              className="block text-sm font-label-bold text-on-surface mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              className={inputClass}
              id="phone"
              placeholder="+1 (555) 000-0000"
              type="tel"
              value={form.phone}
              onChange={update('phone')}
            />
          </div>

          <div>
            <label
              className="block text-sm font-label-bold text-on-surface mb-2"
              htmlFor="pickup"
            >
              Pickup Location
            </label>
            <input
              className={inputClass}
              id="pickup"
              placeholder="City, Country"
              type="text"
              value={form.pickup}
              onChange={update('pickup')}
            />
          </div>

          <div>
            <label
              className="block text-sm font-label-bold text-on-surface mb-2"
              htmlFor="delivery"
            >
              Delivery Country
            </label>
            <input
              className={inputClass}
              id="delivery"
              placeholder="Country"
              type="text"
              value={form.delivery}
              onChange={update('delivery')}
            />
          </div>

          <div>
            <label
              className="block text-sm font-label-bold text-on-surface mb-2"
              htmlFor="shipmentType"
            >
              Shipment Type
            </label>
            <select
              className={`${inputClass} appearance-none cursor-pointer`}
              id="shipmentType"
              value={form.shipmentType}
              onChange={update('shipmentType')}
            >
              <option value="">Select Type</option>
              <option value="document">Document</option>
              <option value="parcel">Parcel</option>
              <option value="express">Express</option>
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-label-bold text-on-surface mb-2"
              htmlFor="weight"
            >
              Approximate Weight (kg)
            </label>
            <input
              className={inputClass}
              id="weight"
              placeholder="e.g. 5.5"
              step="0.1"
              type="number"
              value={form.weight}
              onChange={update('weight')}
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label
              className="block text-sm font-label-bold text-on-surface mb-2"
              htmlFor="message"
            >
              Additional Details
            </label>
            <textarea
              className={`${inputClass} h-32 resize-none`}
              id="message"
              placeholder="Please provide any specific requirements or details about your shipment..."
              value={form.message}
              onChange={update('message')}
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
            <button
              className="bg-brand-gold-300 text-brand-gold-700 font-label-bold px-8 py-4 rounded-xl hover:bg-brand-green-700 hover:text-white transition-colors shadow-lg shadow-brand-gold-300/20 w-full md:w-auto active:scale-95"
              type="submit"
            >
              Submit Request
            </button>
          </div>
        </form>
      </RevealOnScroll>
    </section>
  )
}

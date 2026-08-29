const quickLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#locate', label: 'Locate Us' },
  { href: '#about', label: 'About Us' },
  { href: '#gallery', label: 'Gallery' },
]

const headingClass = 'mb-5 font-semibold text-white'
const linkClass = 'transition-colors hover:text-white'
const muted = 'text-sm leading-relaxed text-white/80'

export function Footer() {
  const openComplaint = () => {
    window.dispatchEvent(
      new CustomEvent('quote:request-type', { detail: 'complaint' }),
    )
  }

  return (
    <footer className="bg-brand-green-950 text-white">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col gap-6 border-b border-white/15 py-10 sm:flex-row sm:items-center sm:justify-between">
          <a href="#home" className="inline-flex shrink-0 items-center gap-3">
            <img
              alt="PGGL — passing globally"
              className="h-14 w-auto mix-blend-screen md:h-16"
              src="/logo.png"
            />
            <span className="font-display-lg text-base font-bold text-white md:text-lg">
              PG Global Logistics Pvt Ltd
            </span>
          </a>
          <div className="flex flex-col gap-1 text-sm text-white sm:items-end">
            <a className={linkClass} href="tel:+94117207236">
              +94 117 207 236
            </a>
            <a className={linkClass} href="mailto:info@pglanka.com">
              info@pglanka.com
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 border-b border-white/15 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className={headingClass}>About us</h3>
            <p className={muted}>
              We Power Green, an international courier service provider since
              2010, offer door-to-door courier solutions with world-renowned
              couriers such as{' '}
              <span className="font-semibold text-white">
                DHL, Aramex, UPS and SkyNet.
              </span>
            </p>
          </div>

          <div>
            <h3 className={headingClass}>Quick links</h3>
            <ul className={`flex flex-col gap-2 ${muted}`}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a className={linkClass} href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={headingClass}>Address</h3>
            <div className={`flex flex-col gap-5 ${muted}`}>
              <p>
                Wellawatta
                <br />
                49, ST Lawrence Road,
                <br />
                Colombo - 06, Sri Lanka.
              </p>
              <p>
                Chavakachcheri
                <br />
                No 41, Kachchai Road,
                <br />
                Chavakachcheri, Sri Lanka.
              </p>
            </div>
          </div>

          <div>
            <h3 className={headingClass}>Contact</h3>
            <ul className={`flex flex-col gap-2 ${muted}`}>
              <li>
                <a className={linkClass} href="tel:+94117207236">
                  Wellawatta · +94 117 207 236
                </a>
              </li>
              <li>
                <a className={linkClass} href="tel:+94217200616">
                  Chavakachcheri · 021 720 0616
                </a>
              </li>
              <li>
                <a className={linkClass} href="#track">
                  Track Order
                </a>
              </li>
              <li>
                <a className={linkClass} href="#quote" onClick={openComplaint}>
                  Lodge Complaint
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © 2026 All Rights Reserved | Web Design By{' '}
            <a
              href="mailto:thishanthan03@gmail.com?cc=ahamedrizlan2002@gmail.com,geeviniyvasu@gmail.com&subject=New%20Project%20Inquiry&body=Hello%20Assura%20Solutions,"
              className="text-white underline underline-offset-2 hover:text-brand-gold-300"
            >
              Assura Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

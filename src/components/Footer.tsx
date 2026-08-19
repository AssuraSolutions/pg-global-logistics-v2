export function Footer() {
  return (
    <footer className="w-full border-t-4 border-brand-gold-300 bg-brand-green-950 py-14 font-body-md text-body-md text-white md:py-section-padding">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile sm:grid-cols-2 md:grid-cols-4 md:px-margin-desktop">
        <div className="flex flex-col gap-4 sm:col-span-2 md:col-span-1">
          <span className="font-display-lg text-headline-md font-bold text-secondary-fixed dark:text-secondary">
            PG Global Logistics
          </span>
          <p className="text-surface-variant dark:text-on-surface-variant text-sm mt-4">
            Delivering precision worldwide. Your trusted partner for seamless
            international courier and logistics solutions.
          </p>
        </div>

        <div>
          <h4 className="font-label-bold text-white dark:text-primary mb-4 uppercase tracking-wider text-sm">
            Company
          </h4>
          <ul className="flex flex-col gap-2">
            <li>
              <a
                className="text-surface-variant dark:text-on-surface-variant hover:text-secondary-fixed transition-colors"
                href="#about"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                className="text-surface-variant dark:text-on-surface-variant hover:text-secondary-fixed transition-colors"
                href="#partners"
              >
                Global Network
              </a>
            </li>
            <li>
              <a
                className="text-surface-variant dark:text-on-surface-variant hover:text-secondary-fixed transition-colors"
                href="#quote"
              >
                Careers
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-label-bold text-white dark:text-primary mb-4 uppercase tracking-wider text-sm">
            Legal
          </h4>
          <ul className="flex flex-col gap-2">
            <li>
              <a
                className="text-surface-variant dark:text-on-surface-variant hover:text-secondary-fixed transition-colors"
                href="#"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                className="text-surface-variant dark:text-on-surface-variant hover:text-secondary-fixed transition-colors"
                href="#"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                className="text-surface-variant dark:text-on-surface-variant hover:text-secondary-fixed transition-colors"
                href="#"
              >
                Sitemap
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-label-bold text-white dark:text-primary mb-4 uppercase tracking-wider text-sm">
            Contact
          </h4>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-2 text-surface-variant dark:text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-[18px] text-secondary-fixed">
                location_on
              </span>
              <span>
                123 Logistics Blvd, Suite 400
                <br />
                Global Hub City, 90210
              </span>
            </li>
            <li className="flex items-center gap-2 text-surface-variant dark:text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-[18px] text-secondary-fixed">
                call
              </span>
              <span>+1 (800) 555-0199</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-container-max border-t border-outline/20 px-margin-mobile pt-8 text-center md:mt-section-padding md:px-margin-desktop">
        <p className="text-surface-variant/70 dark:text-on-surface-variant/70 text-sm">
          © 2024 PG Global Logistics. All rights reserved. Delivering precision
          worldwide.
        </p>
      </div>
    </footer>
  )
}

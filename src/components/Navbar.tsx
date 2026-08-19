import { useEffect, useState } from 'react'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About Us' },
  { href: '#locate', label: 'Locate Us' },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.slice(1))

    const updateActiveSection = () => {
      const marker = window.scrollY + 120
      let current = sectionIds[0]
      let bestTop = -Infinity

      for (const id of sectionIds) {
        const section = document.getElementById(id)
        if (!section) continue
        const top = section.getBoundingClientRect().top + window.scrollY
        if (top <= marker && top >= bestTop) {
          bestTop = top
          current = id
        }
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40
      if (atBottom) current = sectionIds[sectionIds.length - 1]

      setActiveSection(current)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  // Close the drawer if the viewport grows into the desktop layout, otherwise it
  // would stay mounted behind the inline nav.
  useEffect(() => {
    if (!menuOpen) return

    const mql = window.matchMedia('(min-width: 768px)')
    const onDesktop = () => {
      if (mql.matches) setMenuOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    mql.addEventListener('change', onDesktop)
    window.addEventListener('keydown', onKey)
    return () => {
      mql.removeEventListener('change', onDesktop)
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-brand-green-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-container-max items-center justify-between gap-3 px-margin-mobile md:h-20 md:px-margin-desktop">
        <a href="#home" className="flex shrink-0 items-center">
          <img
            alt="PGGL — passing globally"
            className="h-12 w-auto mix-blend-screen md:h-14"
            src="/logo.png"
          />
          <span className="hidden font-display-lg text-headline-md font-bold text-white lg:block">
            PG <span className="text-brand-gold-300">Global</span> Logistics
          </span>
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => {
            const active = activeSection === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-lg px-3 py-1.5 font-body-md transition-colors ${
                  active
                    ? 'bg-white/10 text-brand-gold-300'
                    : 'text-brand-green-100/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <a
            className="hidden items-center gap-1.5 rounded-xl border border-brand-green-400/50 px-4 py-2.5 font-label-bold text-brand-green-100 transition-all hover:border-brand-gold-300/60 hover:bg-white/10 active:scale-95 md:inline-flex"
            href="#track"
          >
            <span className="material-symbols-outlined text-lg">
              local_shipping
            </span>
            Track Order
          </a>
          <a
            className="rounded-xl bg-brand-gold-300 px-4 py-2.5 font-label-bold text-brand-gold-700 shadow-lg shadow-brand-gold-300/20 transition-all hover:bg-brand-gold-200 active:scale-95 md:px-5 md:py-3"
            href="#quote"
          >
            Get a Quote
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white transition-colors hover:bg-white/10 active:scale-95 md:hidden"
          >
            <span className="material-symbols-outlined">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          aria-hidden
          tabIndex={-1}
          onClick={() => setMenuOpen(false)}
          className="fixed inset-x-0 bottom-0 top-16 -z-10 w-full cursor-default bg-brand-green-950/50 md:hidden"
        />
      )}

      <div
        id="mobile-menu"
        className={`overflow-hidden border-white/10 bg-brand-green-950/95 backdrop-blur-md transition-all duration-300 ease-out md:hidden ${
          menuOpen ? 'max-h-96 border-t opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-margin-mobile py-4">
          {navLinks.map((link) => {
            const active = activeSection === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={`rounded-xl px-4 py-3.5 font-body-md transition-colors ${
                  active
                    ? 'bg-white/10 text-brand-gold-300'
                    : 'text-brand-green-100/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            )
          })}
          <a
            href="#track"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-brand-green-400/50 px-4 py-3.5 font-label-bold text-brand-green-100 transition-colors hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-lg">
              local_shipping
            </span>
            Track Order
          </a>
        </div>
      </div>
    </nav>
  )
}

import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Partners } from './components/Partners'
import { Services } from './components/Services'
import { LocateUs } from './components/LocateUs'
import { Gallery } from './components/Gallery'
import { TrackOrder } from './components/TrackOrder'
import { QuoteForm } from './components/QuoteForm'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20">
        <Hero />
        <Services />
        <About />
        <Partners />
        <LocateUs />
        <Gallery />
        <TrackOrder />
        <QuoteForm />
      </main>
      <Footer />
    </>
  )
}

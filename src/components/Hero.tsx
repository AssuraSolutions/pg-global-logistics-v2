import { useEffect, useRef, useState } from 'react'
import { RevealOnScroll } from './RevealOnScroll'

const stats = [
  { value: '220+', label: 'Destinations served', icon: 'public' },
  { value: '4', label: 'Global carrier partners', icon: 'handshake' },
  { value: '2', label: 'Sri Lanka branches', icon: 'store' },
  { value: '24/7', label: 'Shipment support', icon: 'schedule' },
]

const SPOTLIGHT_SIZE = 800
const SPOTLIGHT_SCALE = 6
const GLOW_SIZE = 520
const REST_X = 0.62
const REST_Y = 0.5
// courier-hero-scrub.mp4 is encoded all-keyframe at 24fps so every seek
// decodes a single frame instead of rewinding to the previous keyframe.
const VIDEO_FPS = 24
const FRAME_STEP = 1 / VIDEO_FPS

// Cursor scrubbing needs a real pointer, and the all-keyframe file is 3.9MB.
// Touch devices get a 176KB version that simply loops.
const hasFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const [interactive] = useState(hasFinePointer)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    const wrap = videoWrapRef.current
    if (!section || !video || !wrap) return

    video.muted = true
    video.playsInline = true
    video.loop = true

    const playLoop = () => {
      video.playbackRate = 1
      const attempt = video.play()
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {})
    }

    playLoop()

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduceMotion || !interactive) return

    // Normalised pointer position: target is where the cursor is,
    // value trails it with frame-rate independent smoothing.
    const target = { x: REST_X, y: REST_Y }
    const value = { x: REST_X, y: REST_Y }
    let scrubbing = false
    let interacted = false
    let raf = 0
    let last = performance.now()
    let lastFrame = -1

    const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

    // Cached so the animation loop never reads layout, which would force a
    // synchronous reflow right after it wrote transforms.
    let rect = section.getBoundingClientRect()
    const measure = () => {
      rect = section.getBoundingClientRect()
    }

    const onMove = (event: PointerEvent) => {
      target.x = clamp01((event.clientX - rect.left) / rect.width)
      target.y = clamp01((event.clientY - rect.top) / rect.height)

      if (!interacted) {
        interacted = true
        hintRef.current?.classList.add('opacity-0')
      }

      if (!scrubbing) {
        scrubbing = true
        video.pause()
        lastFrame = -1
        // Start scrubbing from the frame currently on screen so there is no jump.
        const duration = video.duration
        if (Number.isFinite(duration) && duration > 0) {
          value.x = clamp01(video.currentTime / duration)
        }
      }
    }

    const onLeave = () => {
      scrubbing = false
      target.x = REST_X
      target.y = REST_Y
      playLoop()
    }

    const tick = (now: number) => {
      // dt in 60fps-equivalent frames keeps the easing identical on 120Hz screens.
      const dt = Math.min(4, Math.max(0.2, (now - last) / (1000 / 60)))
      last = now

      const ease = 1 - Math.pow(1 - 0.16, dt)
      value.x += (target.x - value.x) * ease
      value.y += (target.y - value.y) * ease

      const dx = (value.x - 0.5) * 2
      const dy = (value.y - 0.5) * 2
      const px = value.x * rect.width
      const py = value.y * rect.height

      if (scrubbing) {
        const duration = video.duration
        if (Number.isFinite(duration) && duration > 0) {
          const frameCount = Math.max(1, Math.round(duration * VIDEO_FPS))
          const frame = Math.round(clamp01(value.x) * (frameCount - 1))
          if (frame !== lastFrame && !video.seeking) {
            lastFrame = frame
            video.currentTime = (frame + 0.5) * FRAME_STEP
          }
        }
      }

      wrap.style.transform = `translate3d(${dx * 10}px, ${dy * 6}px, 0) scale(1.04)`

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${px - SPOTLIGHT_SIZE / 2}px, ${py - SPOTLIGHT_SIZE / 2}px, 0) scale(${SPOTLIGHT_SCALE})`
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${px - GLOW_SIZE / 2}px, ${py - GLOW_SIZE / 2}px, 0)`
      }

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1200px) rotateY(${dx * 2.5}deg) rotateX(${dy * -2}deg)`
      }

      raf = requestAnimationFrame(tick)
    }

    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure)
    }
  }, [interactive])

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[calc(100svh_-_4rem)] w-full overflow-hidden bg-brand-green-950 md:min-h-[calc(100svh_-_5rem)]"
      id="home"
    >
      <div
        ref={videoWrapRef}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden md:-inset-y-[2%] md:will-change-transform"
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-center md:absolute md:right-[-12%] md:top-0 md:w-auto md:max-w-none"
          src={
            interactive
              ? '/videos/courier-hero-scrub.mp4'
              : '/videos/courier-hero-mobile.mp4'
          }
          poster="/videos/courier-hero-poster.jpg"
          muted
          playsInline
          preload="auto"
          aria-hidden
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-brand-green-950/30 via-brand-green-950/60 via-45% to-brand-green-950/95 md:bg-gradient-to-r md:from-brand-green-950 md:from-20% md:via-brand-green-950/45 md:via-50% md:to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-brand-green-950/80 to-transparent" />

      {/* Cursor spotlight: fixed-size layers moved with transforms only, so the
          browser composites them instead of repainting each frame. */}
      {interactive && (
        <>
          <div
            ref={spotlightRef}
            className="pointer-events-none absolute left-0 top-0 z-[2] h-[800px] w-[800px] will-change-transform"
            style={{
              transform: `translate3d(calc(62vw - ${SPOTLIGHT_SIZE / 2}px), calc(50vh - ${SPOTLIGHT_SIZE / 2}px), 0) scale(${SPOTLIGHT_SCALE})`,
              background:
                'radial-gradient(circle closest-side, rgba(2,23,13,0) 0%, rgba(2,23,13,0) 12%, rgba(2,23,13,0.5) 30%, rgba(2,23,13,0.78) 46%, rgba(2,23,13,0.86) 100%)',
            }}
          />
          <div
            ref={glowRef}
            className="pointer-events-none absolute left-0 top-0 z-[3] h-[520px] w-[520px] will-change-transform"
            style={{
              transform: `translate3d(calc(62vw - ${GLOW_SIZE / 2}px), calc(50vh - ${GLOW_SIZE / 2}px), 0)`,
              background:
                'radial-gradient(circle closest-side, rgba(254,191,14,0.22) 0%, rgba(254,191,14,0.08) 45%, rgba(254,191,14,0) 70%)',
            }}
          />
        </>
      )}

      <RevealOnScroll className="relative z-10 mx-auto flex w-full max-w-container-max flex-col justify-end px-margin-mobile pb-12 pt-12 md:justify-center md:px-margin-desktop md:pb-20 md:pt-24">
        <div
          ref={cardRef}
          className="max-w-xl origin-left md:will-change-transform"
        >
          <span className="inline-flex items-center gap-2 self-start rounded-full border border-brand-gold-300/40 bg-brand-green-950/55 px-3 py-1.5 font-label-bold text-[11px] uppercase tracking-[0.16em] text-brand-gold-200 backdrop-blur-md sm:px-4 sm:text-xs sm:tracking-[0.18em]">
            <span className="h-2 w-2 rounded-full bg-brand-gold-300 animate-glow-pulse" />
            Global reach · Local care
          </span>

          <h1 className="mt-5 font-display-lg-mobile text-[1.9rem]/[1.15] text-white drop-shadow-[0_12px_30px_rgba(2,23,13,0.55)] sm:text-display-lg-mobile md:mt-6 md:font-display-lg md:text-display-lg">
            Send anywhere.
            <br />
            <span className="bg-gradient-to-r from-brand-gold-300 via-brand-gold-200 to-brand-green-300 bg-clip-text text-transparent">
              Delivered with confidence.
            </span>
          </h1>

          <p className="mt-4 max-w-xl font-body-lg text-base text-brand-green-100 md:mt-5 md:text-body-lg">
            Documents, parcels and express shipments moving out of Sri Lanka on
            DHL, Aramex, UPS and SkyNet — with one team watching every handover.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-8">
            <a
              href="#quote"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold-300 px-6 py-3.5 font-label-bold text-brand-gold-700 shadow-lg shadow-brand-gold-300/25 transition-all hover:-translate-y-0.5 hover:bg-brand-gold-200 active:scale-95 md:px-8 md:py-4"
            >
              Get a Quote
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </a>
            <a
              href="#track"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/25 bg-brand-green-950/40 px-6 py-3.5 font-label-bold text-white backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-brand-gold-300/70 hover:bg-white/10 active:scale-95 md:px-8 md:py-4"
            >
              <span className="material-symbols-outlined">local_shipping</span>
              Track Your Order
            </a>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/10 pt-6 md:mt-14 md:grid-cols-4 md:gap-6 md:pt-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2.5 md:gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold-300/15 text-brand-gold-200 backdrop-blur-sm md:h-11 md:w-11">
                <span className="material-symbols-outlined text-xl md:text-2xl">
                  {stat.icon}
                </span>
              </span>
              <div className="min-w-0">
                <p className="font-display-lg text-lg font-bold text-white md:text-xl">
                  {stat.value}
                </p>
                <p className="text-xs text-brand-green-200 md:text-sm">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>

      {interactive && (
        <div
          ref={hintRef}
          className="pointer-events-none absolute bottom-6 right-6 z-10 hidden items-center gap-2 rounded-full border border-white/15 bg-brand-green-950/60 px-4 py-2 text-xs font-label-bold text-brand-green-100 backdrop-blur-md transition-opacity duration-500 md:inline-flex"
        >
          <span className="material-symbols-outlined text-base text-brand-gold-300">
            mouse
          </span>
          Move your cursor to guide the courier
        </div>
      )}
    </section>
  )
}

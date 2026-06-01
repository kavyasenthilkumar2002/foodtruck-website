import { useRef, useCallback, useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  ChefHat,
  Heart,
  Leaf,
  Star,
  UtensilsCrossed,
  Users,
} from 'lucide-react'
import { testimonials } from '../data/menuData'

const M = motion

const EASE_SMOOTH = [0.22, 1, 0.36, 1]
const AUTO_SCROLL_MS = 5500

const FEATURES = [
  { icon: Leaf, title: 'Fresh Ingredients', sub: 'Always fresh, always tasty' },
  { icon: ChefHat, title: 'Expert Chefs', sub: 'Crafted with passion' },
  { icon: UtensilsCrossed, title: 'On-the-Go', sub: 'Quality meals, anywhere' },
  { icon: Heart, title: 'Customer Love', sub: 'Trusted by many' },
]

function SectionIcon() {
  return (
    <div className="testimonial-section__title-icon" aria-hidden>
      <span className="testimonial-section__title-icon-line" />
      <UtensilsCrossed className="h-4 w-4 text-icity-gold" strokeWidth={1.75} />
      <Heart className="testimonial-section__title-heart h-3 w-3 text-icity-gold" fill="currentColor" />
      <span className="testimonial-section__title-icon-line" />
    </div>
  )
}

function FloatingParticles() {
  const particles = [
    { left: '8%', top: '18%', size: 6, delay: 0 },
    { left: '82%', top: '12%', size: 4, delay: 1.2 },
    { left: '15%', top: '72%', size: 5, delay: 0.6 },
    { left: '88%', top: '68%', size: 7, delay: 2 },
    { left: '45%', top: '8%', size: 3, delay: 1.8 },
    { left: '62%', top: '85%', size: 4, delay: 0.9 },
  ]

  return (
    <div className="testimonial-floating__particles" aria-hidden>
      {particles.map((p, i) => (
        <M.span
          key={i}
          className="testimonial-floating__particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: 7 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}

function ReviewCardContent({ item }) {
  return (
    <>
      <div className="testimonial-section__card-image-wrap">
        <img src={item.image} alt={item.name} className="testimonial-section__card-image" />
      </div>
      <div className="testimonial-section__card-body">
        <div className="testimonial-section__stars" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 text-icity-gold"
              fill="currentColor"
              strokeWidth={0}
              aria-hidden
            />
          ))}
        </div>
        <h3 className="testimonial-section__card-name">{item.name}</h3>
        <p className="testimonial-section__card-text">{item.text}</p>
        <p className="testimonial-section__card-tag">
          <Heart className="h-3.5 w-3.5 text-icity-gold" fill="currentColor" aria-hidden />
          Food Lover
        </p>
      </div>
    </>
  )
}

function FloatingScrollCard({ item, index }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [4, -4]), {
    stiffness: 160,
    damping: 24,
  })
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 160,
    damping: 24,
  })

  const floatDuration = 5 + (index % 3) * 0.6
  const floatDelay = index * 0.45

  const handleMove = (e) => {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <M.article
      ref={ref}
      className="testimonial-scroll__slide"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        reduceMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1200,
              transformStyle: 'preserve-3d',
            }
      }
      animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
      transition={
        reduceMotion
          ? undefined
          : {
              y: {
                duration: floatDuration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: floatDelay,
              },
            }
      }
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -12,
              scale: 1.015,
              transition: { duration: 0.4, ease: EASE_SMOOTH },
            }
      }
    >
      <div className="testimonial-floating__card-glow" aria-hidden />
      <div className="testimonial-section__card testimonial-section__card--floating">
        <ReviewCardContent item={item} />
      </div>
    </M.article>
  )
}

function FloatingNavButton({ onClick, ariaLabel, children, floatDelay = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <M.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="testimonial-section__nav-btn testimonial-floating__nav-btn"
      animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
      transition={
        reduceMotion
          ? undefined
          : {
              y: {
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: floatDelay,
              },
            }
      }
      whileHover={
        reduceMotion
          ? { scale: 1.06 }
          : {
              scale: 1.1,
              boxShadow:
                '0 0 28px rgba(255, 193, 7, 0.55), 0 12px 28px rgba(255, 193, 7, 0.35)',
            }
      }
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </M.button>
  )
}

function HorizontalFloatingReviews() {
  const trackRef = useRef(null)

  const scrollByCard = useCallback((direction) => {
    const track = trackRef.current
    if (!track) return

    const slide = track.querySelector('.testimonial-scroll__slide')
    const gap = parseFloat(getComputedStyle(track).gap) || 24
    const amount = (slide?.offsetWidth ?? 320) + gap

    track.scrollBy({
      left: direction * amount,
      behavior: 'smooth',
    })
  }, [])

  return (
    <div className="testimonial-scroll">
      <p className="testimonial-scroll__trust">
        <Users className="h-4 w-4 shrink-0 text-icity-gold" strokeWidth={1.75} aria-hidden />
        Loved by hundreds of happy customers — swipe to explore
      </p>

      <div className="testimonial-scroll__viewport">
        <div
          ref={trackRef}
          className="testimonial-scroll__track"
          role="region"
          aria-label="Customer reviews"
          tabIndex={0}
        >
          {testimonials.map((item, i) => (
            <FloatingScrollCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      <div className="testimonial-scroll__nav">
        <FloatingNavButton
          onClick={() => scrollByCard(-1)}
          ariaLabel="Scroll reviews left"
          floatDelay={0}
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2} />
        </FloatingNavButton>
        <FloatingNavButton
          onClick={() => scrollByCard(1)}
          ariaLabel="Scroll reviews right"
          floatDelay={0.35}
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2} />
        </FloatingNavButton>
      </div>
    </div>
  )
}

function ClassicNavButton({ onClick, ariaLabel, children, float = false }) {
  const reduceMotion = useReducedMotion()

  if (!float) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className="testimonial-section__nav-btn"
      >
        {children}
      </button>
    )
  }

  return (
    <M.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="testimonial-section__nav-btn testimonial-floating__nav-btn"
      animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
      transition={
        reduceMotion
          ? undefined
          : {
              y: {
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }
      }
      whileHover={reduceMotion ? { scale: 1.06 } : { scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </M.button>
  )
}

/** Classic single-card layout (Our Story, etc.) */
function ClassicTestimonialMain({ autoScroll = false }) {
  const mainRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const current = testimonials[index]

  const goTo = useCallback((nextIndex) => {
    setDirection(nextIndex >= index ? 1 : -1)
    setIndex(nextIndex)
  }, [index])

  const prev = useCallback(() => {
    setDirection(-1)
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))
  }, [])

  const next = useCallback(() => {
    setDirection(1)
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))
  }, [])

  useEffect(() => {
    if (!autoScroll || reduceMotion || paused) return undefined

    const id = window.setInterval(next, AUTO_SCROLL_MS)
    return () => window.clearInterval(id)
  }, [autoScroll, reduceMotion, paused, next])

  const slideOffset = 56

  return (
    <div
      ref={mainRef}
      className={`testimonial-section__main ${autoScroll ? 'testimonial-section__main--auto' : ''}`}
      onMouseEnter={autoScroll ? () => setPaused(true) : undefined}
      onMouseLeave={autoScroll ? () => setPaused(false) : undefined}
      onFocus={autoScroll ? () => setPaused(true) : undefined}
      onBlur={
        autoScroll
          ? (e) => {
              if (!mainRef.current?.contains(e.relatedTarget)) setPaused(false)
            }
          : undefined
      }
    >
      <M.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: EASE_SMOOTH }}
        className="testimonial-section__aside"
      >
        <div className="testimonial-section__avatars" role="list" aria-label="Customer previews">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="listitem"
              onClick={() => goTo(i)}
              aria-label={`Show review from ${t.name}`}
              aria-current={i === index ? 'true' : undefined}
              className="testimonial-section__avatar-btn"
            >
              <img
                src={t.image}
                alt=""
                className={`testimonial-section__avatar ${
                  i === index ? 'testimonial-section__avatar--active' : ''
                }`}
              />
            </button>
          ))}
        </div>
        <p className="testimonial-section__trust">
          <Users className="h-4 w-4 shrink-0 text-icity-gold" strokeWidth={1.75} aria-hidden />
          Loved by hundreds of happy customers
        </p>
      </M.div>

      <div
        className={`testimonial-section__card-wrap ${
          autoScroll ? 'testimonial-section__card-wrap--auto' : ''
        }`}
        aria-live={autoScroll ? 'polite' : undefined}
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <M.div
            key={current.id}
            custom={direction}
            className="testimonial-section__card-slide"
            initial={{ opacity: 0, x: direction * slideOffset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -slideOffset }}
            transition={{ duration: 0.55, ease: EASE_SMOOTH }}
          >
            <M.article
              className="testimonial-section__card"
              animate={autoScroll && !reduceMotion ? { y: [0, -10, 0] } : undefined}
              transition={
                autoScroll && !reduceMotion
                  ? {
                      y: {
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }
                  : undefined
              }
            >
              <ReviewCardContent item={current} />
            </M.article>
          </M.div>
        </AnimatePresence>
      </div>

      <div className="testimonial-section__nav">
        <ClassicNavButton onClick={prev} ariaLabel="Previous testimonial" float={autoScroll}>
          <ChevronLeft className="h-5 w-5" strokeWidth={2} />
        </ClassicNavButton>
        <ClassicNavButton onClick={next} ariaLabel="Next testimonial" float={autoScroll}>
          <ChevronRight className="h-5 w-5" strokeWidth={2} />
        </ClassicNavButton>
      </div>
    </div>
  )
}

export default function Testimonial({
  variant = 'default',
  autoScroll = false,
  hideTitle = false,
  hideFeatures = false,
}) {
  const isFloating = variant === 'floating'

  return (
    <section
      className={`testimonial-section ${isFloating ? 'testimonial-section--floating' : ''}`}
    >
      {isFloating && (
        <>
          <div className="testimonial-floating__glow testimonial-floating__glow--left" aria-hidden />
          <div className="testimonial-floating__glow testimonial-floating__glow--right" aria-hidden />
          <FloatingParticles />
        </>
      )}

      <div className="testimonial-section__bg-decor testimonial-section__bg-decor--quote" aria-hidden>
        &ldquo;
      </div>
      <div className="testimonial-section__bg-decor testimonial-section__bg-decor--veg" aria-hidden />

      <div className="section-container testimonial-section__inner">
        <header className="testimonial-section__header">
          <SectionIcon />
          {!hideTitle && (
            <h2 className="testimonial-section__title">
              <span className="text-icity-brown">Our client </span>
              <span className="text-icity-gold">stays</span>
            </h2>
          )}
          <p className="testimonial-section__subtitle">
            Your experience matters. Here&apos;s what people are saying about our food,
            service, and the moments we help create.
          </p>
        </header>

        {isFloating ? (
          <HorizontalFloatingReviews />
        ) : (
          <ClassicTestimonialMain autoScroll={autoScroll} />
        )}

        {!hideFeatures && (
          <ul className="testimonial-section__features">
            {FEATURES.map(({ icon: Icon, title, sub }) => (
              <li key={title} className="testimonial-section__feature">
                <div className="testimonial-section__feature-icon">
                  <Icon className="h-5 w-5 text-icity-gold" strokeWidth={1.75} aria-hidden />
                </div>
                <div>
                  <p className="testimonial-section__feature-title">{title}</p>
                  <p className="testimonial-section__feature-sub">{sub}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

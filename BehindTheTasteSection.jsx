import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import heroFoodImg from '../assets/gravy.png'

const M = motion

function LeafAccent() {
  return (
    <svg
      className="behind-taste__leaf"
      width="36"
      height="32"
      viewBox="0 0 36 32"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 26C4 20 2 12 8 6c4-4 10-2 12 2-2-6 2-12 10-10 6 2 8 10 6 16-4 10-14 14-20 12-2 4-6 6-10 4-2 2-6 2-8 0z"
        fill="#2d6b3f"
        fillOpacity="0.85"
      />
      <path
        d="M22 8c3 2 5 6 4 10M14 10c-2 3-2 7 0 10"
        stroke="#1e4d2e"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function WavyUnderline() {
  return (
    <svg
      className="behind-taste__underline"
      viewBox="0 0 120 12"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M2 8C18 2 34 14 50 6s32-4 48 2 16-2 18 4"
        stroke="#e86b1a"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

function DotGrid({ className }) {
  return (
    <div className={`behind-taste__dots ${className}`} aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  )
}

export default function BehindTheTasteSection() {
  return (
    <section className="behind-taste" aria-labelledby="behind-taste-heading">
      <div className="behind-taste__blob behind-taste__blob--tr" aria-hidden />
      <div className="behind-taste__blob behind-taste__blob--ml" aria-hidden />
      <DotGrid className="behind-taste__dots--tr" />
      <DotGrid className="behind-taste__dots--bl" />

      <div className="section-container behind-taste__grid">
        <M.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="behind-taste__copy"
        >
          <h2 id="behind-taste-heading" className="behind-taste__headline">
            <span className="behind-taste__headline-row">
              <span className="behind-taste__behind">Behind</span>
              <LeafAccent />
            </span>
            <span className="behind-taste__taste-wrap">
              <span className="behind-taste__the">the </span>
              <span className="behind-taste__taste">Taste</span>
              <WavyUnderline />
            </span>
          </h2>

          <p className="behind-taste__body">
            At Foodtruck, we believe that great food brings people together.
            Founded with a passion for flavor and freshness, we are dedicated to
            serving delicious, high-quality meals that satisfy every craving.
          </p>

          <div className="behind-taste__actions">
            <Link to="/menu" className="behind-taste__btn behind-taste__btn--primary">
              Explore Menu
              <ArrowRight className="behind-taste__btn-icon" strokeWidth={2.5} aria-hidden />
            </Link>
            <a href="#how-it-works" className="behind-taste__btn behind-taste__btn--glass">
              Learn More
            </a>
          </div>
        </M.div>

        <M.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="behind-taste__visual"
        >
          <div className="behind-taste__visual-glow" aria-hidden />
          <img
            src={heroFoodImg}
            alt="Chicken gravy with fresh basil, chilies, and peas"
            className="behind-taste__wok-img"
            loading="lazy"
            decoding="async"
          />
        </M.div>
      </div>
    </section>
  )
}

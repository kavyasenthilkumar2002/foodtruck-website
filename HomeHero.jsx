import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const M = motion

/**
 * Home hero — full banner artwork at 8:3 proportions on all screens;
 * copy sits in the center white band with the same offset as desktop.
 */
export default function HomeHero({ imageSrc }) {
  return (
    <section
      id="page-banner"
      className="banner home-hero relative overflow-hidden bg-white scroll-mt-[4.5rem]"
    >
      <div className="banner__frame home-hero__frame w-full max-w-none">
        <img
          src={imageSrc}
          alt=""
          className="banner__img home-hero__img absolute inset-0 h-full w-full"
          aria-hidden
        />

        <M.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="home-hero__overlay absolute inset-0 z-10 flex items-center justify-center"
        >
          <div className="home-hero__copy flex w-full min-w-0 flex-col items-center text-center">
            <h1 className="home-hero__title font-sans font-extrabold leading-[1.12] tracking-tight">
              <span className="block text-icity-gold">Your Best</span>
              <span className="block text-black">Flavours on Wheels</span>
            </h1>

            <Link to="/menu" className="btn-pill-primary home-hero__cta">
              Discover Flavours
            </Link>

            <div className="home-hero__taglines w-full text-center">
              <p className="home-hero__tagline m-0 font-sans font-bold leading-snug tracking-tight">
                <span className="text-icity-gold">We Serve </span>
                <span className="text-black">Freshness and Taste</span>
              </p>
              <p className="home-hero__tagline m-0 mt-1 font-sans font-bold text-icity-gold">
                Every Bite
              </p>
            </div>
          </div>
        </M.div>
      </div>
    </section>
  )
}

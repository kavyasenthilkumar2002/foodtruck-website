import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { images } from '../data/images'

export default function Hero({ image = images.heroFruit, imageAlt = 'Fresh food bowl' }) {
  return (
    <section className="bg-icity-bg py-12 md:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-icity-gold">Your Best Flavours</span>
            <br />
            <span className="text-icity-brown">on Wheels</span>
          </h1>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="tel:+918086431431"
              className="rounded-full bg-icity-gold px-8 py-3 text-sm font-semibold text-icity-brown transition-all hover:scale-105 hover:bg-icity-gold-hover"
            >
              call us
            </a>
            <Link
              to="/menu"
              className="rounded-full bg-icity-brown px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-icity-brown-dark"
            >
              Menu
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative h-64 w-64 overflow-hidden rounded-full shadow-xl sm:h-80 sm:w-80 lg:h-96 lg:w-96">
            <img
              src={image}
              alt={imageAlt}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

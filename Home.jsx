import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HomeHero from '../components/HomeHero'
import AboutBrandSection from '../components/AboutBrandSection'
import { Soup, UtensilsCrossed, CupSoda } from 'lucide-react'
import CategoryCard from '../components/CategoryCard'
import { serveCategories } from '../data/menuData'
import { images } from '../data/images'
import homeBannerImg from '../assets/homebanner.jpg'
import truckImg from '../assets/truck.png'

const M = motion

export default function Home() {
  return (
    <div className="home-page">
      <HomeHero imageSrc={homeBannerImg} />

      <AboutBrandSection />

      <section
        className="relative overflow-hidden py-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${images.categoryBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="section-container flex max-w-4xl flex-wrap justify-center gap-8 sm:gap-12 md:gap-20">
          {[
            { icon: Soup, label: 'Main Course' },
            { icon: UtensilsCrossed, label: 'Starters' },
            { icon: CupSoda, label: 'Beverages' },
          ].map(({ icon: Icon, label }, i) => (
            <M.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-3"
            >
              <Icon className="h-10 w-10 text-icity-gold" strokeWidth={1.5} />
              <span className="font-sans text-sm font-semibold tracking-wide text-icity-gold">
                {label}
              </span>
            </M.div>
          ))}
        </div>
      </section>

      <section className="bg-icity-bg py-12 sm:py-16 md:py-20">
        <div className="section-container text-center">
          <h2 className="font-serif text-2xl font-bold text-icity-brown sm:text-3xl md:text-4xl">
            <span className="text-icity-gold">What </span>
            we serve...
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-icity-brown/80 sm:text-base">
            From hearty rice bowls to crispy tacos, fresh salads, and refreshing
            drinks — explore our diverse menu crafted for every craving and every
            occasion on wheels.
          </p>
          <div className="serve-menu-grid mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-4 min-[400px]:grid-cols-2 min-[400px]:gap-5 sm:mt-12 lg:grid-cols-3 lg:gap-7">
            {serveCategories.map((cat, i) => (
              <CategoryCard key={cat.name} {...cat} index={i} />
            ))}
          </div>
          <Link
            to="/menu"
            className="mt-12 inline-block rounded-full bg-icity-gold px-10 py-3.5 text-sm font-semibold text-icity-brown shadow-lg transition-all hover:scale-105 hover:bg-icity-gold-hover"
          >
            Explore menu
          </Link>
        </div>
      </section>

      <section className="overflow-x-hidden bg-icity-bg px-4 pb-16 pt-4 sm:px-6 sm:pb-20">
        <M.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-[1060px] sm:min-h-[280px] md:min-h-[300px]"
        >
          <div className="relative min-h-0 overflow-hidden rounded-[20px] rounded-br-[2.5rem] rounded-tr-[4rem] bg-icity-gold py-8 pl-5 pr-5 sm:min-h-[220px] sm:rounded-[28px] sm:rounded-br-[3.5rem] sm:rounded-tr-[6rem] sm:py-12 sm:pl-10 sm:pr-8 md:pr-[46%] lg:overflow-visible lg:pl-14 lg:pr-[44%]">
            <div className="relative z-10 max-w-xl">
              <h2 className="font-sans text-xl font-extrabold leading-tight text-icity-brown min-[400px]:text-2xl sm:text-4xl">
                Stay Updated{' '}
                <span className="font-[family-name:var(--font-script)] text-xl font-semibold text-black min-[400px]:text-2xl sm:text-4xl">
                  with
                </span>{' '}
                Us
              </h2>
              <form
                className="mt-5 sm:mt-6"
                onSubmit={(e) => {
                  e.preventDefault()
                  alert('Subscribed! Thank you for joining us.')
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="w-full rounded-full border-0 bg-white/90 px-6 py-3.5 font-sans text-sm text-icity-brown placeholder:text-icity-brown/50 focus:outline-none focus:ring-2 focus:ring-icity-brown/20 sm:py-4 sm:text-base"
                />
              </form>
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-[min(100%,520px)] items-center justify-end sm:flex sm:right-2 md:right-4 lg:right-6"
            aria-hidden
          >
            <img
              src={truckImg}
              alt=""
              className="h-full max-h-[min(100%,320px)] w-auto max-w-full object-contain object-right drop-shadow-[0_12px_28px_rgba(26,20,8,0.12)]"
            />
          </div>

          <div className="mt-6 flex justify-center sm:hidden" aria-hidden>
            <img
              src={truckImg}
              alt=""
              className="max-h-[220px] w-auto max-w-full object-contain"
            />
          </div>
        </M.div>
      </section>
    </div>
  )
}

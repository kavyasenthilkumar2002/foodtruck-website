import { motion } from 'framer-motion'
import { Leaf, ChefHat, Truck, Heart, UtensilsCrossed } from 'lucide-react'
import chefImg from '../assets/chef5star.png'

const M = motion

const features = [
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    description: 'Fresh ingredients from trusted local partners',
  },
  {
    icon: ChefHat,
    title: 'Crafted with Passion',
    description: 'Every dish made with care and creativity',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Bringing delicious meals to your doorstep',
  },
  {
    icon: Heart,
    title: 'Made to Share',
    description: 'Food that brings people together',
  },
]

export default function AboutBrandSection() {
  return (
    <section className="bg-icity-bg py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="section-container">
        <M.article
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55 }}
          className="about-brand-card relative overflow-hidden rounded-[1.75rem] bg-white shadow-[0_12px_48px_rgba(26,20,8,0.08)] sm:rounded-[2rem] md:rounded-[2.25rem]"
        >
          <div className="about-brand-card__waves" aria-hidden />

          <div className="relative z-10 px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-14 lg:py-14">
            {/* Top: chef + brand story */}
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-12 lg:gap-14 xl:gap-16">
              <M.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative mx-auto flex w-full max-w-md items-end justify-center lg:max-w-none"
              >
                <img
                  src={chefImg}
                  alt="Chef smiling and presenting fresh plated dishes"
                  className="relative z-10 w-full max-w-[300px] object-contain drop-shadow-[0_20px_40px_rgba(26,20,8,0.12)] sm:max-w-[340px] lg:max-w-[380px]"
                />
              </M.div>

              <M.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="px-1 sm:px-3 lg:px-4"
              >
                <blockquote className="m-0 flex flex-col">
                  <span
                    className="about-brand-quote-mark mb-1 block font-serif text-5xl font-bold leading-none text-icity-gold sm:mb-2 sm:text-6xl md:text-7xl"
                    aria-hidden
                  >
                    &ldquo;
                  </span>
                  <p className="font-sans text-sm font-medium leading-[1.75] text-icity-brown/85 sm:text-[0.95rem] md:text-base lg:leading-[1.8]">
                    We believe that{' '}
                    <span className="font-semibold text-[#c9a020]">great food</span> brings
                    people together. At Foodtruck, every dish is crafted with{' '}
                    <span className="font-semibold text-[#c9a020]">passion</span>, using the{' '}
                    <span className="font-semibold text-[#c9a020]">freshest ingredients</span>{' '}
                    sourced locally. From our{' '}
                    <span className="font-semibold text-[#c9a020]">mobile kitchen</span> to your
                    table, we deliver{' '}
                    <span className="font-semibold text-[#c9a020]">flavours</span> that celebrate
                    culinary creativity and the joy of sharing a meal. Taste the difference{' '}
                    <span className="font-semibold text-[#c9a020]">freshness</span> makes — every
                    single bite.
                  </p>
                  <span
                    className="about-brand-quote-mark mt-2 block self-end font-serif text-5xl font-bold leading-none text-icity-gold sm:mt-3 sm:text-6xl md:text-7xl"
                    aria-hidden
                  >
                    &rdquo;
                  </span>
                </blockquote>
              </M.div>
            </div>

            {/* Divider */}
            <div
              className="my-8 flex items-center gap-4 sm:my-10 md:my-12"
              aria-hidden
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-icity-gold/25 to-icity-gold/40" />
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-icity-cream shadow-sm">
                <UtensilsCrossed
                  className="h-5 w-5 text-icity-gold"
                  strokeWidth={1.75}
                />
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-icity-gold/25 to-icity-gold/40" />
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {features.map(({ icon: Icon, title, description }, i) => (
                <M.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.08 * i }}
                  className="rounded-2xl border border-icity-gold/10 bg-[#faf8f4] px-5 py-5 shadow-[0_4px_20px_rgba(26,20,8,0.04)] transition-shadow hover:shadow-[0_8px_28px_rgba(26,20,8,0.07)] sm:px-6 sm:py-6"
                >
                  <Icon
                    className="mb-3 h-8 w-8 text-icity-gold"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-sans text-sm font-bold text-icity-brown sm:text-base">
                    {title}
                  </h3>
                  <p className="mt-1.5 font-sans text-xs leading-relaxed text-icity-brown/65 sm:text-[0.8125rem]">
                    {description}
                  </p>
                </M.div>
              ))}
            </div>
          </div>
        </M.article>
      </div>
    </section>
  )
}

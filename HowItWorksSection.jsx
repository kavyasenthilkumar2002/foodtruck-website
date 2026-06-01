import { motion } from 'framer-motion'
import { Clock, Headphones, Heart, Shield } from 'lucide-react'
import chefPoseImg from '../assets/smiling-chef-posing-with-arms-crossed 1.png'
import menuImg from '../assets/menu.jpg'
import chineseImg from '../assets/chinese.png'
import deliveryImg from '../assets/delivery.png'
import maggieImg from '../assets/maggie.png'

const M = motion

const steps = [
  {
    num: '01',
    title: 'Explore the Menu',
    description: 'Browse a variety of delicious dishes and choose your favorites.',
    image: menuImg,
    alt: 'Menu book icon',
    placement: 'tl',
  },
  {
    num: '02',
    title: 'We Prepare with Care',
    description: 'Our chefs prepare your order with fresh ingredients and love.',
    image: chineseImg,
    alt: 'Prepared meal icon',
    placement: 'tr',
  },
  {
    num: '03',
    title: 'Place Your Order',
    description: "Confirm your order and we'll take care of the rest.",
    image: deliveryImg,
    alt: 'Delivery icon',
    placement: 'bl',
  },
  {
    num: '04',
    title: 'Enjoy Your Bite!',
    description: 'Sit back, relax and enjoy your delicious meal.',
    image: maggieImg,
    alt: 'Enjoy your meal icon',
    placement: 'br',
  },
]

const features = [
  { icon: Clock, title: 'Fast Delivery', subtitle: 'Quick & on time' },
  { icon: Shield, title: 'Fresh & Quality', subtitle: 'Best ingredients' },
  { icon: Headphones, title: '24/7 Support', subtitle: "We're here for you" },
  { icon: Heart, title: 'Made with Love', subtitle: 'Every single order' },
]

function StepBadge({ num }) {
  return (
    <span className="how-it-works__badge" aria-hidden>
      {num}
    </span>
  )
}

function StepCard({ step, index }) {
  return (
    <M.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={`how-it-works__card how-it-works__card--${step.placement}`}
    >
      <StepBadge num={step.num} />
      <div className="how-it-works__card-body">
        <div className="how-it-works__card-icon-wrap">
          <div className="how-it-works__card-icon-glow" aria-hidden />
          <img src={step.image} alt={step.alt} className="how-it-works__card-icon" />
        </div>
        <div className="how-it-works__card-copy">
          <h3 className="how-it-works__card-title">{step.title}</h3>
          <p className="how-it-works__card-desc">{step.description}</p>
        </div>
      </div>
    </M.article>
  )
}

function FlowArrows() {
  return (
    <svg
      className="how-it-works__arrows pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      viewBox="0 0 1200 520"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M380 130 H520"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeDasharray="8 8"
        strokeLinecap="round"
      />
      <path
        d="M680 130 H820"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeDasharray="8 8"
        strokeLinecap="round"
      />
      <path
        d="M820 155 V280"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeDasharray="8 8"
        strokeLinecap="round"
      />
      <path
        d="M380 390 H520"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeDasharray="8 8"
        strokeLinecap="round"
      />
      <path
        d="M680 390 H820"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeDasharray="8 8"
        strokeLinecap="round"
      />
      <polygon points="518,130 528,125 528,135" fill="#f59e0b" />
      <polygon points="818,130 828,125 828,135" fill="#f59e0b" />
      <polygon points="818,278 823,268 813,268" fill="#f59e0b" />
      <polygon points="518,390 528,385 528,395" fill="#f59e0b" />
      <polygon points="818,390 828,385 828,395" fill="#f59e0b" />
    </svg>
  )
}

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="how-it-works" aria-labelledby="how-it-works-title">
      <div className="section-container how-it-works__inner">
        <M.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="how-it-works__header"
        >
          <span className="how-it-works__eyebrow">How It Works</span>
          <h2 id="how-it-works-title" className="how-it-works__title">
            <span className="text-icity-gold">Ordering</span>{' '}
            <span className="text-[#1a1817]">Made Simple</span>
          </h2>
          <p className="how-it-works__subtitle">
            Delicious food, delivered in just a few easy steps
          </p>
          <span className="how-it-works__accent" aria-hidden />
        </M.header>

        <div className="how-it-works__stage">
          <FlowArrows />

          <div className="how-it-works__grid">
            {steps.map((step, index) => (
              <StepCard key={step.num} step={step} index={index} />
            ))}

            <M.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="how-it-works__chef"
            >
              <div className="how-it-works__chef-glow" aria-hidden />
              <img
                src={chefPoseImg}
                alt="Professional chef with arms crossed"
                className="how-it-works__chef-img"
                loading="lazy"
                decoding="async"
              />
            </M.div>
          </div>
        </div>

        <M.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="how-it-works__features"
        >
          {features.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} className="how-it-works__feature">
              <span className="how-it-works__feature-icon">
                <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
              </span>
              <div>
                <p className="how-it-works__feature-title">{title}</p>
                <p className="how-it-works__feature-sub">{subtitle}</p>
              </div>
            </div>
          ))}
        </M.div>
      </div>
    </section>
  )
}

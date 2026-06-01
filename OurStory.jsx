import { Link } from 'react-router-dom'
import Testimonial from '../components/Testimonial'
import ourStoryBannerImg from '../assets/ourstory.png'
import BehindTheTasteSection from '../components/BehindTheTasteSection'
import HowItWorksSection from '../components/HowItWorksSection'
import PageBanner from '../components/PageBanner'

export default function OurStory() {
  return (
    <>
      <PageBanner
        imageSrc={ourStoryBannerImg}
        align="left"
        imageFocus="right"
        imageFit="cover"
        animateFrom="left"
        bannerClassName="page-banner__frame--our-story"
      >
        <h1 className="hero-title">
          <span className="hero-title-line text-icity-gold">Where Every Meal</span>
          <span className="hero-title-line text-black">Tells a Story</span>
        </h1>
        <div className="flex w-full flex-wrap items-center gap-[clamp(0.5rem,1.5vw,0.75rem)]">
          <Link to="/menu" className="btn-pill-primary">
          Discover Flavours
          </Link>
          <Link to="/contact" className="btn-pill-secondary">
            Contact Us
          </Link>
        </div>
        <h2 className="hero-tagline">
          <span className="text-icity-gold">Where Passion for Food </span>
          <span className="text-black">Meets Exceptional </span>
          <span className="text-icity-gold">Taste</span>
        </h2>
      </PageBanner>

      <BehindTheTasteSection />

      <HowItWorksSection />

      <Testimonial autoScroll />
    </>
  )
}

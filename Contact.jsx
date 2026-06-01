import { Link } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import contactUsBannerImg from '../assets/contactusbanner.png'
import PageBanner from '../components/PageBanner'

export default function Contact() {
  return (
    <>
      <PageBanner
        imageSrc={contactUsBannerImg}
        fullWidth
        imageFit="cover"
        bannerClassName="contact-banner"
        align="right"
        imageFocus="left"
        animateFrom="right"
        contentClassName="contact-banner__copy"
      >
        <h1 className="hero-title">
          <span className="text-icity-gold">Contact </span>
          <span className="text-black">Us</span>
        </h1>
        <div className="flex w-full flex-wrap items-center justify-end gap-[clamp(0.5rem,1.5vw,0.75rem)]">
          <a
            href="tel:+918086431431"
            className="btn-pill-primary"
          >
            Call us
          </a>
          <Link to="/menu" className="btn-pill-secondary">
            Menu
          </Link>
        </div>
      </PageBanner>

      <ContactForm />
    </>
  )
}

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronRight, Mail } from 'lucide-react'
import Logo from './Logo'
import { BRAND_NAME, BRAND_TAGLINE, COPYRIGHT_YEAR } from '../constants/brand'
import { PAGE_BANNER_HASH, scrollToPageBanner } from '../lib/scrollToPageBanner'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/menu', label: 'Menu' },
  { to: '/contact', label: 'Contact' },
]

function LinkedInIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-3.795-.735-.405-1.035-1.005-1.305-1.005-1.305-.82-.555.06-.555.06-.825.405 1.23 1.005 1.605 1.005 1.605.72.615 1.23.45 1.53-.345.465-1.23.18-1.905-.9-.675-.015-1.395-.27-1.395-1.125 0-.255.075-.525.225-.75-.975-.405-1.995-1.485-1.995-3.315 0-.825.285-1.515.75-2.04-.075-.195-.33-.99.075-2.055 0 0 .615-.195 2.025.78.6-.165 1.23-.255 1.875-.255.645 0 1.275.09 1.875.255 1.41-.975 2.025-.78 2.025-.78.405 1.065.15 1.86.075 2.055.465.525.75 1.215.75 2.04 0 1.845-1.02 2.91-2.025 3.315.18.165.345.48.345.99 0 .72-.015 1.305-.015 1.485 0 .315.225.69.84.57A8.203 8.203 0 0016 12.015C16 5.37 12.63 0 12 0z" />
    </svg>
  )
}

const connectLinks = [
  {
    label: 'Gmail',
    href: 'mailto:skavyasenthil2002@gmail.com',
    display: 'skavyasenthil2002@gmail.com',
    Icon: Mail,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kavyaa2002/',
    display: 'linkedin.com/in/kavyaa2002',
    Icon: LinkedInIcon,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/kavyasenthilkumar2002',
    display: 'github.com/kavyasenthilkumar2002',
    Icon: GitHubIcon,
  },
]

function FooterQuickLink({ to, label }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()

    if (location.pathname === to) {
      scrollToPageBanner()
      return
    }

    navigate(`${to}${PAGE_BANNER_HASH}`)
  }

  return (
    <Link to={to} onClick={handleClick} className="icity-footer__link">
      <ChevronRight className="icity-footer__link-chevron" strokeWidth={2.5} aria-hidden />
      {label}
    </Link>
  )
}

function FooterLeafBadge() {
  return (
    <span className="icity-footer__leaf" aria-hidden>
      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
        <path d="M12 3c-4 6-4 10 0 14 4-4 4-8 0-14z" fill="currentColor" />
        <path
          d="M8 8c-3 2-3 5 0 8M16 8c3 2 3 5 0 8"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>
    </span>
  )
}

export default function Footer() {
  return (
    <footer className="icity-footer mt-auto">
      <div className="icity-footer__main section-container">
        <div className="icity-footer__grid">
          <div className="icity-footer__brand icity-footer__col">
            <div className="icity-footer__logo">
              <Logo />
            </div>
            <p className="icity-footer__tagline">
              {BRAND_TAGLINE} — fresh flavours on wheels, served with care every day.
            </p>
          </div>

          <div className="icity-footer__col icity-footer__col--links">
            <h3 className="icity-footer__heading">Quick Links</h3>
            <ul className="icity-footer__links">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <FooterQuickLink to={link.to} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div className="icity-footer__col icity-footer__col--connect">
            <h3 className="icity-footer__heading">Connect With Us</h3>
            <ul className="icity-footer__connect-list">
              {connectLinks.map(({ label, href, display, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="icity-footer__connect-row"
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={`${label}: ${display}`}
                  >
                    <span className="icity-footer__connect-icon">
                      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="icity-footer__connect-text">{display}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="icity-footer__bottom section-container">
        <div className="icity-footer__bottom-rule">
          <FooterLeafBadge />
        </div>
        <p className="icity-footer__copyright">
          &copy; {BRAND_NAME} {COPYRIGHT_YEAR}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

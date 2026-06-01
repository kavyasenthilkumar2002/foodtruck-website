import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { BRAND_NAME, BRAND_PAGE_TITLE } from '../constants/brand'
import { PAGE_BANNER_HASH, scrollToPageBanner } from '../lib/scrollToPageBanner'

const PAGE_TITLES = {
  '/': BRAND_PAGE_TITLE,
  '/our-story': `Our Story | ${BRAND_NAME}`,
  '/menu': `Menu | ${BRAND_NAME}`,
  '/contact': `Contact | ${BRAND_NAME}`,
}

export default function MainLayout() {
  const location = useLocation()

  useEffect(() => {
    document.title = PAGE_TITLES[location.pathname] ?? BRAND_PAGE_TITLE
  }, [location.pathname])

  useEffect(() => {
    if (location.hash !== PAGE_BANNER_HASH) return

    const timer = window.setTimeout(() => {
      scrollToPageBanner()
    }, 80)

    return () => window.clearTimeout(timer)
  }, [location.pathname, location.hash])

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-icity-bg">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export const PAGE_BANNER_ID = 'page-banner'
export const PAGE_BANNER_HASH = `#${PAGE_BANNER_ID}`

export function scrollToPageBanner() {
  const banner = document.getElementById(PAGE_BANNER_ID)
  if (banner) {
    banner.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

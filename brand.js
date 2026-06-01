export const BRAND_NAME = 'Foodtruck'
export const BRAND_TAGLINE = 'Good Food • Good Mood'
export const BRAND_PAGE_TITLE = `${BRAND_NAME} | ${BRAND_TAGLINE}`
export const BRAND_HERO_HEADLINE = 'Your Best Flavours on Wheels'
export const COPYRIGHT_YEAR = new Date().getFullYear()

export function brandEmailSubject(suffix) {
  return `${BRAND_NAME} — ${suffix}`
}

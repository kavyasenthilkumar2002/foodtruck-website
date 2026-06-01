import { BRAND_NAME } from './brand'

export const CONTACT_EMAIL = 'icityindia@gmail.com'

/** @deprecated Use CONTACT_EMAIL */
export const ICITY_EMAIL = CONTACT_EMAIL

export const ICITY_GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Icity+Co-working+Space+,+Private+Offices+%26+Meeting+Rooms/@11.023447,76.907513,16z/data=!4m6!3m5!1s0x3ba85f1d25389f75:0x9d93fcc49fcc15c6!8m2!3d11.0234471!4d76.9075129!16s%2Fg%2F11h3v6lpps?hl=en-US&entry=ttu'

export const CONTACT_EMAIL_WEB_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`

/** @deprecated Use CONTACT_EMAIL_WEB_COMPOSE */
export const ICITY_EMAIL_WEB_COMPOSE = CONTACT_EMAIL_WEB_COMPOSE

/** Shown as the sender name in inbox (EmailJS template → From Name: {{from_name}}) */
export const CONTACT_FORM_SENDER_NAME = BRAND_NAME

export function openBrowserEmailCompose() {
  window.open(CONTACT_EMAIL_WEB_COMPOSE, '_blank', 'noopener,noreferrer')
}

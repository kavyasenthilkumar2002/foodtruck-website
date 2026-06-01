import emailjs from '@emailjs/browser'
import { CONTACT_EMAIL, CONTACT_FORM_SENDER_NAME } from '../constants/contact'
import { brandEmailSubject } from '../constants/brand'
import { buildContactTemplateParams } from './emailTemplateParams'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
const useContactApi = import.meta.env.VITE_USE_CONTACT_API === 'true'

const emailJsConfigured = Boolean(
  serviceId?.trim() && templateId?.trim() && publicKey?.trim(),
)

const web3FormsConfigured = Boolean(web3FormsKey?.trim())

function wrapNetworkError(error) {
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return new Error(
      `Could not reach the email service. Please try again or write to ${CONTACT_EMAIL} directly.`,
    )
  }
  return error instanceof Error ? error : new Error('Unable to send your message.')
}

async function sendViaApiRoute(payload) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })

  let data = {}
  try {
    data = await response.json()
  } catch {
    /* empty body */
  }

  if (response.status === 404 || response.status === 503) {
    return null
  }

  if (!response.ok) {
    throw new Error(
      typeof data.error === 'string'
        ? data.error
        : 'Unable to send your message. Please try again.',
    )
  }

  return data
}

async function sendViaEmailJS({ name, email, phone, message }) {
  const templateParams = buildContactTemplateParams({ name, email, phone, message })

  const result = await emailjs.send(serviceId, templateId, templateParams, {
    publicKey,
  })

  if (result.status !== 200) {
    throw new Error('Unable to send your message. Please try again.')
  }

  return result
}

async function sendViaWeb3Forms({ name, email, phone, message }) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: web3FormsKey,
      subject: brandEmailSubject(`contact from ${name}`),
      from_name: CONTACT_FORM_SENDER_NAME,
      name,
      email,
      phone,
      message,
    }),
  })

  let data = {}
  try {
    data = await response.json()
  } catch {
    /* non-JSON */
  }

  if (!response.ok || !data.success) {
    throw new Error(
      typeof data.message === 'string'
        ? data.message
        : 'Unable to send your message. Please try again.',
    )
  }

  return data
}

/**
 * Sends the contact form via EmailJS (primary when configured).
 * Optional /api/contact route can use private key on Vercel.
 */
export async function sendContactEmail({ name, email, phone, message }) {
  const payload = { name, email, phone, message }

  try {
    if (useContactApi) {
      const apiResult = await sendViaApiRoute(payload)
      if (apiResult) return apiResult
    }

    if (emailJsConfigured) {
      return await sendViaEmailJS(payload)
    }

    if (web3FormsConfigured) {
      return await sendViaWeb3Forms(payload)
    }

    throw new Error(
      `Contact form is not set up yet. Please email us at ${CONTACT_EMAIL}.`,
    )
  } catch (error) {
    throw wrapNetworkError(error)
  }
}

export function isContactEmailConfigured() {
  return emailJsConfigured || web3FormsConfigured || useContactApi
}

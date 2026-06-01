import { CONTACT_EMAIL, CONTACT_FORM_SENDER_NAME } from '../constants/contact'
import { brandEmailSubject } from '../constants/brand'

/**
 * Maps contact form fields to every common EmailJS template variable name
 * so name/email appear regardless of which placeholders the template uses.
 */
export function buildContactTemplateParams({ name, email, phone, message }) {
  const trimmedName = name.trim()
  const trimmedEmail = email.trim()
  const trimmedPhone = phone?.trim() || ''
  const trimmedMessage = message.trim()

  return {
    from_name: CONTACT_FORM_SENDER_NAME,
    name: trimmedName,
    customer_name: trimmedName,
    user_name: trimmedName,
    email: trimmedEmail,
    user_email: trimmedEmail,
    from_email: trimmedEmail,
    reply_to: trimmedEmail,
    message: trimmedMessage,
    phone: trimmedPhone,
    title: brandEmailSubject(`message from ${trimmedName}`),
    to_email: CONTACT_EMAIL,
    subject: brandEmailSubject(`contact from ${trimmedName}`),
  }
}

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Mail, Phone, Truck } from 'lucide-react'
import contactSupportIllustration from '../assets/contact-support-illustration.png'
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_WEB_COMPOSE,
  openBrowserEmailCompose,
} from '../constants/contact'
import CountrySelectDropdown from './CountrySelectDropdown'
import { formatCountryLabel, getCountryByCode } from '../data/countries'
import { BRAND_NAME } from '../constants/brand'
import { sendContactEmail } from '../lib/sendContactEmail'

const M = motion

const LOCAL_LENGTH_RULES = {
  in: 10,
  us: 10,
  gb: 10,
  ae: 9,
  sg: 8,
}

const PLACEHOLDERS = {
  in: 'Enter phone number',
  us: 'Enter US phone number',
  gb: 'Enter UK phone number',
  ae: 'Enter UAE phone number',
  sg: 'Enter Singapore phone number',
}

const DEFAULT_LOCAL_LENGTH = 15
const DEFAULT_MIN_PHONE_LENGTH = 6

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NAME_REGEX = /^[\p{L}\s.'-]+$/u
const MAX_MESSAGE_WORDS = 300

const EMPTY_ERRORS = { name: '', email: '', phone: '', message: '' }

function sanitizeName(value) {
  return value.replace(/[^\p{L}\s.'-]/gu, '')
}

function countWords(text) {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}

function limitToMaxWords(text, maxWords) {
  if (!text.trim()) return text
  const words = text.trim().split(/\s+/)
  if (words.length <= maxWords) return text
  return words.slice(0, maxWords).join(' ')
}

function stripDialCode(digits, dialCode) {
  if (!dialCode || !digits) return digits
  if (digits.startsWith(dialCode)) {
    return digits.slice(dialCode.length)
  }
  return digits
}

function getPhonePlaceholder(countryCode) {
  if (!countryCode) return 'Phone number'
  if (PLACEHOLDERS[countryCode]) return PLACEHOLDERS[countryCode]
  const country = getCountryByCode(countryCode)
  return country ? `Enter ${country.name} phone number` : 'Phone number'
}

function validateForm(form, selectedCountry, phoneLocal) {
  const errors = { ...EMPTY_ERRORS }

  if (!form.name.trim()) {
    errors.name = 'Please provide a name'
  } else if (!NAME_REGEX.test(form.name.trim())) {
    errors.name = 'Name should not contain symbols or special characters'
  }

  if (!form.email.trim()) {
    errors.email = 'Please provide an email'
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = 'Please provide a valid email address'
  }

  if (!selectedCountry) {
    errors.phone = 'Please select a country'
  } else if (!phoneLocal.trim()) {
    errors.phone = 'Please provide a phone number'
  } else {
    const exactLength = LOCAL_LENGTH_RULES[selectedCountry]
    if (exactLength && phoneLocal.length !== exactLength) {
      errors.phone = `Please enter a valid ${exactLength}-digit phone number`
    } else if (!exactLength && phoneLocal.length < DEFAULT_MIN_PHONE_LENGTH) {
      errors.phone = 'Please provide a valid phone number'
    }
  }

  if (!form.message.trim()) {
    errors.message = 'Please provide a message'
  } else if (countWords(form.message) > MAX_MESSAGE_WORDS) {
    errors.message = 'Message must not exceed 300 words'
  }

  return errors
}

function FieldError({ message }) {
  if (!message) return null
  return <p className="px-3 text-xs text-red-600">{message}</p>
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedLabel, setSelectedLabel] = useState('Select Country')
  const [phoneLocal, setPhoneLocal] = useState('')
  const [errors, setErrors] = useState(EMPTY_ERRORS)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const dialCodeRef = useRef('')

  const clearError = (field) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: '' } : prev))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    clearError(name)
  }

  const handleNameChange = (e) => {
    const name = sanitizeName(e.target.value)
    setForm((prev) => ({ ...prev, name }))
    clearError('name')
  }

  const handleMessageChange = (e) => {
    const message = limitToMaxWords(e.target.value, MAX_MESSAGE_WORDS)
    setForm((prev) => ({ ...prev, message }))
    clearError('message')
  }

  const handleSelectCountry = (country) => {
    setSelectedCountry(country.code)
    setSelectedLabel(formatCountryLabel(country))
    dialCodeRef.current = country.dial
    setPhoneLocal('')
    clearError('phone')
  }

  const handlePhoneChange = (e) => {
    if (!selectedCountry) return

    let digits = e.target.value.replace(/\D/g, '')
    const dialCode = dialCodeRef.current

    digits = stripDialCode(digits, dialCode)

    const maxLength = LOCAL_LENGTH_RULES[selectedCountry] ?? DEFAULT_LOCAL_LENGTH
    if (digits.length > maxLength) {
      digits = digits.slice(0, maxLength)
    }

    setPhoneLocal(digits)
    clearError('phone')
  }

  const phonePlaceholder = getPhonePlaceholder(selectedCountry)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setShowSuccess(false)
    setSubmitError('')

    const nextErrors = validateForm(form, selectedCountry, phoneLocal)
    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) return

    const country = getCountryByCode(selectedCountry)
    const dialCode = dialCodeRef.current
    const phone =
      country && dialCode ? `+${dialCode} ${phoneLocal}` : phoneLocal

    setIsSubmitting(true)

    try {
      await sendContactEmail({
        name: form.name.trim(),
        email: form.email.trim(),
        phone,
        message: form.message.trim(),
      })

      setForm({ name: '', email: '', message: '' })
      setSelectedCountry('')
      setSelectedLabel('Select Country')
      setPhoneLocal('')
      setErrors(EMPTY_ERRORS)
      dialCodeRef.current = ''
      setShowSuccess(true)
    } catch (err) {
      const fallback = `Could not send your message. Please email us at ${CONTACT_EMAIL}.`
      setSubmitError(err instanceof Error ? err.message || fallback : fallback)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDone = () => {
    setShowSuccess(false)
  }

  const pillInputClass =
    'w-full rounded-full border-0 bg-[#f0f0f0] px-5 py-3.5 text-sm text-[#1a1817] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffc107]/50'

  const pillInputErrorClass = 'ring-2 ring-red-500 focus:ring-red-500'

  return (
    <section className="contact-section">
      <div className="contact-section__inner section-container">
        <M.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="contact-section__left"
        >
          <h2 className="contact-section__heading">
            Let Us Know How We Can Help?
          </h2>
          <p className="contact-section__description">
            If you need anything, just contact us. It&apos;s our pleasure to work
            with like-minded people like you.
          </p>

          <div className="contact-section__illustration" aria-hidden>
            <img
              src={contactSupportIllustration}
              alt=""
              className="contact-section__illustration-img"
            />
          </div>

          <div className="contact-section__info-card">
            <div className="contact-section__info-item">
              <div className="contact-section__info-icon">
                <Phone className="h-4 w-4 text-white" strokeWidth={2} aria-hidden />
              </div>
              <p className="contact-section__info-label">Call Us</p>
              <a href="tel:+918098431431" className="contact-section__info-value">
                8098431431
              </a>
            </div>
            <a
              href={CONTACT_EMAIL_WEB_COMPOSE}
              onClick={(e) => {
                e.preventDefault()
                openBrowserEmailCompose()
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-section__info-item contact-section__info-item--mailto"
              aria-label={`Email ${BRAND_NAME} at ${CONTACT_EMAIL} (opens in browser)`}
            >
              <div className="contact-section__info-icon">
                <Mail className="h-4 w-4 text-white" strokeWidth={2} aria-hidden />
              </div>
              <p className="contact-section__info-label">Email Us</p>
              <p className="contact-section__info-value">{CONTACT_EMAIL}</p>
            </a>
            <div className="contact-section__info-item contact-section__info-item--hours">
              <div className="contact-section__info-icon">
                <Clock className="h-4 w-4 text-white" strokeWidth={2} aria-hidden />
              </div>
              <p className="contact-section__info-label">Working Hours</p>
              <p className="contact-section__info-value">
                Mon - Sat: 9AM - 6PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </M.div>

        <M.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="contact-section__form-wrap"
        >
          <div className="contact-section__form-badge">
            <div className="contact-section__form-badge-inner">
              <Truck className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </div>
          </div>

          <form
            noValidate
            onSubmit={handleSubmit}
            className="contact-section__form"
          >
            <div className="space-y-1">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleNameChange}
                aria-invalid={Boolean(errors.name)}
                className={`${pillInputClass} ${errors.name ? pillInputErrorClass : ''}`}
              />
              <FieldError message={errors.name} />
            </div>

            <div className="space-y-1">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                className={`${pillInputClass} ${errors.email ? pillInputErrorClass : ''}`}
              />
              <FieldError message={errors.email} />
            </div>

            <div className="relative space-y-1">
              <div
                className={`contact-section__phone-row overflow-hidden rounded-full border bg-white ${
                  errors.phone ? 'border-red-500' : 'border-[#1a1817]/35'
                }`}
              >
                <CountrySelectDropdown
                  value={selectedCountry}
                  onChange={handleSelectCountry}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder={phonePlaceholder}
                  value={phoneLocal}
                  onChange={handlePhoneChange}
                  disabled={!selectedCountry}
                  inputMode="numeric"
                  autoComplete="tel-national"
                  aria-invalid={Boolean(errors.phone)}
                  className={`min-w-0 flex-1 border-0 bg-white px-4 py-3.5 text-sm text-[#1a1817] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset sm:px-5 ${
                    errors.phone
                      ? 'focus:ring-red-500'
                      : 'focus:ring-[#ffc107]/50'
                  }`}
                />
              </div>
              <FieldError message={errors.phone} />
            </div>

            <div className="space-y-1">
              <textarea
                name="message"
                placeholder="Type here..."
                value={form.message}
                onChange={handleMessageChange}
                rows={4}
                aria-invalid={Boolean(errors.message)}
                className={`w-full resize-y rounded-2xl border-0 bg-[#f0f0f0] px-5 py-3.5 text-sm text-[#1a1817] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffc107]/50 ${
                  errors.message ? pillInputErrorClass : ''
                }`}
              />
              <FieldError message={errors.message} />
            </div>

            {submitError && (
              <p className="px-3 text-sm text-red-600" role="alert">
                {submitError}
              </p>
            )}

            <div className="contact-section__submit-wrap">
              <button
                type="submit"
                className="contact-section__submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? 'Sending…' : 'Send'}
              </button>
            </div>

            {showSuccess && (
              <M.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-6 space-y-3 border-t border-[#1a1817]/10 pt-6 text-left"
                role="status"
                aria-live="polite"
              >
                <h3 className="text-lg font-bold text-[#1a1817] sm:text-xl">
                  Message sent successfully
                </h3>
                <p className="text-sm leading-relaxed text-[#1a1817]/70">
                  Thank you for reaching out to {BRAND_NAME}. We&apos;ll get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={handleDone}
                  className="rounded-lg bg-[#ffc107] px-8 py-2.5 text-sm font-bold text-[#1a1817] shadow-md shadow-[#ffc107]/35 transition-all hover:bg-[#e5b410]"
                >
                  Done
                </button>
              </M.div>
            )}
          </form>
        </M.div>
      </div>
    </section>
  )
}

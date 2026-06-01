import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'

const M = motion

export default function CallUsModal({ phoneTel, phoneDisplay, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  const handleCall = () => {
    window.location.href = `tel:${phoneTel}`
    onClose()
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phoneDisplay)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div
      className="call-us-modal__overlay fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="call-us-modal-title"
      onClick={onClose}
    >
      <M.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="call-us-modal__panel w-full max-w-[min(100%,22rem)] rounded-2xl bg-white px-6 py-6 shadow-[0_20px_56px_rgba(0,0,0,0.22)] sm:max-w-sm sm:px-7 sm:py-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff8e1]"
            aria-hidden
          >
            <Phone className="h-7 w-7 text-[#f59e0b]" strokeWidth={2} />
          </span>
          <h2
            id="call-us-modal-title"
            className="mt-4 text-lg font-bold text-[#1a1817] sm:text-xl"
          >
            Call Foodtruck
          </h2>
          <p className="mt-2 text-sm text-[#5c564c]">
            Would you like to call us now?
          </p>
          <p className="mt-3 text-xl font-bold tracking-wide text-[#1a1817]">
            {phoneDisplay}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={handleCall}
            className="w-full rounded-full bg-[#ffc107] px-6 py-3 text-sm font-bold text-[#1a1817] transition-all hover:bg-[#e5b410] sm:min-w-[8.5rem]"
          >
            Call now
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full border border-[#1a1817]/15 bg-white px-6 py-3 text-sm font-bold text-[#1a1817] transition-colors hover:bg-[#fafafa] sm:min-w-[8.5rem]"
          >
            Cancel
          </button>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="mt-4 w-full text-center text-xs font-medium text-[#6b6560] underline-offset-2 hover:text-[#1a1817] hover:underline"
        >
          Copy phone number
        </button>
      </M.div>
    </div>
  )
}

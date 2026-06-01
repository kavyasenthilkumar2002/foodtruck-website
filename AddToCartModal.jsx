import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const M = motion

export default function AddToCartModal({ itemName, onClose }) {
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

  if (!itemName) return null

  return (
    <div
      className="cart-add-modal__overlay fixed inset-0 z-50 flex items-start justify-center px-4 pt-8 sm:pt-10 md:pt-12"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-add-modal-title"
    >
      <M.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.28 }}
        className="cart-add-modal__panel w-full max-w-[min(100%,36rem)] rounded-2xl bg-white px-6 py-5 shadow-[0_16px_48px_rgba(0,0,0,0.18)] sm:px-7 sm:py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e8f5e9] sm:h-[3.25rem] sm:w-[3.25rem]"
            aria-hidden
          >
            <Check className="h-6 w-6 text-[#2e7d32] sm:h-7 sm:w-7" strokeWidth={2.5} />
          </span>
          <p
            id="cart-add-modal-title"
            className="min-w-0 flex-1 pt-1.5 text-base font-medium leading-snug text-[#4a4a4a] sm:text-lg"
          >
            Added {itemName} to cart!
          </p>
        </div>
        <div className="mt-5 flex justify-end sm:mt-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#43a047] px-10 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#388e3c]"
          >
            OK
          </button>
        </div>
      </M.div>
    </div>
  )
}

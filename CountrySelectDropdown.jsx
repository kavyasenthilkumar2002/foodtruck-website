import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Search } from 'lucide-react'
import { filterCountries, getCountryByCode, getFlagEmojiSrc } from '../data/countries'

export default function CountrySelectDropdown({ value, onChange, placeholder = 'Select Country' }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [menuStyle, setMenuStyle] = useState(null)
  const triggerRef = useRef(null)
  const panelRef = useRef(null)
  const searchRef = useRef(null)

  const selected = useMemo(() => getCountryByCode(value), [value])
  const filtered = useMemo(() => filterCountries(search), [search])

  const updateMenuPosition = () => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const width = Math.min(Math.max(rect.width, 280), 320)
    let left = rect.left
    if (left + width > window.innerWidth - 16) {
      left = window.innerWidth - width - 16
    }
    setMenuStyle({
      position: 'fixed',
      top: rect.bottom + 6,
      left: Math.max(16, left),
      width,
      zIndex: 9999,
    })
  }

  useEffect(() => {
    if (!open) return

    updateMenuPosition()

    const handlePointerDown = (e) => {
      const inTrigger = triggerRef.current?.contains(e.target)
      const inPanel = panelRef.current?.contains(e.target)
      if (!inTrigger && !inPanel) {
        setOpen(false)
        setSearch('')
      }
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setSearch('')
      }
    }

    const handleReposition = () => updateMenuPosition()

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)
    window.addEventListener('resize', handleReposition)
    window.addEventListener('scroll', handleReposition, true)
    searchRef.current?.focus()

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
      window.removeEventListener('resize', handleReposition)
      window.removeEventListener('scroll', handleReposition, true)
    }
  }, [open])

  const handleSelect = (country) => {
    onChange(country)
    setOpen(false)
    setSearch('')
  }

  const triggerLabel = selected ? selected.name : placeholder

  const dropdownPanel = open && menuStyle && (
    <div
      ref={panelRef}
      role="listbox"
      style={menuStyle}
      className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
    >
      <div className="border-b border-gray-100 p-3">
        <div className="flex items-center gap-2 rounded-xl bg-[#f5f5f5] px-3 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-gray-400" strokeWidth={2} />
          <input
            ref={searchRef}
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search countries"
            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-[#1a1817] placeholder:text-gray-400 focus:outline-none"
            autoComplete="off"
          />
        </div>
      </div>

      <ul className="max-h-64 overflow-y-auto overscroll-contain py-1">
        {filtered.length === 0 ? (
          <li className="px-4 py-6 text-center text-sm text-gray-400">No countries found</li>
        ) : (
          filtered.map((country) => {
            const isSelected = value === country.code
            return (
              <li key={country.code} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => handleSelect(country)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[#fff8e1] ${
                    isSelected ? 'bg-[#fff8e1]' : ''
                  }`}
                >
                  <img
                    src={getFlagEmojiSrc(country.code)}
                    alt=""
                    aria-hidden
                    draggable={false}
                    className="h-5 w-[1.35rem] shrink-0 object-contain"
                  />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-[#1a1817]">
                    {country.name}
                  </span>
                  <span className="shrink-0 text-sm text-gray-500">+{country.dial}</span>
                </button>
              </li>
            )
          })
        )}
      </ul>
    </div>
  )

  return (
    <>
      <div className="relative w-[42%] min-w-[7.5rem] max-w-[48%] shrink-0 sm:min-w-[8.5rem]">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label="Select country"
          className="relative flex w-full min-w-[7.5rem] items-center gap-1.5 border-0 border-r border-[#1a1817]/20 bg-white py-3.5 pl-3 pr-7 text-left text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#ffc107]/50"
        >
          {selected ? (
            <img
              src={getFlagEmojiSrc(selected.code)}
              alt=""
              aria-hidden
              draggable={false}
              className="h-[1.125rem] w-5 shrink-0 object-contain"
            />
          ) : null}
          <span className="min-w-0 flex-1 truncate">{triggerLabel}</span>
          <ChevronDown
            className={`pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
            strokeWidth={2}
          />
        </button>
      </div>
      {dropdownPanel && createPortal(dropdownPanel, document.body)}
    </>
  )
}

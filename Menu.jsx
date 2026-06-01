import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import FoodCard from '../components/FoodCard'
import AddToCartModal from '../components/AddToCartModal'
import { menuCategories } from '../data/menuData'
import menuBannerImg from '../assets/menubanner.png'
import PageBanner from '../components/PageBanner'

const M = motion

function FilterToggle({ active, onClick, dotClass, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-all hover:scale-[1.02] sm:gap-2.5 sm:px-5 sm:py-2.5 sm:text-sm ${
        active
          ? 'border-[#ffc107] bg-[#ffc107]/15 text-[#1a1817]'
          : 'border-gray-200 bg-white text-[#1a1817] shadow-sm'
      }`}
    >
      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotClass}`} />
      {label}
    </button>
  )
}

function CategoryHeading({ category }) {
  if (category.titleDark) {
    return (
      <h2 className="mb-8 text-center font-serif text-2xl font-bold tracking-tight sm:mb-10 sm:text-3xl md:text-4xl">
        <span className="text-[#c9a020]">{category.titleGold} </span>
        <span className="text-[#1a1817]">{category.titleDark}</span>
      </h2>
    )
  }
  return (
    <h2 className="mb-8 text-center font-serif text-2xl font-bold tracking-tight text-[#c9a020] sm:mb-10 sm:text-3xl md:text-4xl">
      {category.titleGold}
    </h2>
  )
}

export default function Menu() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(() => searchParams.get('q') ?? '')
  const [filters, setFilters] = useState({
    veg: false,
    nonVeg: false,
    topSeller: false,
  })
  const [addedItemName, setAddedItemName] = useState(null)

  useEffect(() => {
    const q = searchParams.get('q')
    if (q !== null) setSearch(q)
  }, [searchParams])

  const handleFilterChange = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const filteredCategories = useMemo(() => {
    return menuCategories.map((category) => ({
      ...category,
      items: category.items.filter((item) => {
        const matchesSearch =
          !search ||
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
        const matchesVeg = !filters.veg || item.veg
        const matchesNonVeg = !filters.nonVeg || !item.veg
        const matchesTop = !filters.topSeller || item.topSeller
        return matchesSearch && matchesVeg && matchesNonVeg && matchesTop
      }),
    }))
  }, [search, filters])

  const handleAdd = (item) => {
    setAddedItemName(item.name)
  }

  return (
    <>
      {addedItemName && (
        <AddToCartModal
          itemName={addedItemName}
          onClose={() => setAddedItemName(null)}
        />
      )}

      <PageBanner
        imageSrc={menuBannerImg}
        align="left"
        imageFocus="right"
        animateFrom="left"
      >
        <h1 className="hero-title">
          <span className="hero-title-line text-icity-gold">Where Great Food</span>
          <span className="hero-title-line text-black">Meets Great Moments</span>
        </h1>
        <div className="flex w-full max-w-full flex-wrap items-center gap-[clamp(0.5rem,1.5vw,0.75rem)]">
          <a
            href="#menu-search"
            className="btn-pill-primary"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('menu-search')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }}
          >
            Explore menu
          </a>
          <Link to="/menu" className="btn-pill-secondary">
            Order now
          </Link>
        </div>
        <h2 className="hero-tagline">
          <span className="text-icity-gold">Fresh Ingredients, </span>
          <span className="text-black">Delicious </span>
          <span className="text-icity-gold">Experiences</span>
        </h2>
      </PageBanner>

      {/* Search & filters */}
      <section
        id="menu-search"
        className="scroll-mt-[4.5rem] bg-white px-4 pb-12 pt-8 sm:px-6 sm:pt-10 lg:pb-16 lg:pt-12"
      >
        <div className="mx-auto max-w-3xl">
          <M.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative"
          >
            <input
              type="search"
              placeholder="Search for foods"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-white py-4 pl-6 pr-14 text-sm text-[#1a1817] shadow-sm focus:border-[#ffc107] focus:outline-none focus:ring-2 focus:ring-[#ffc107]/30"
            />
            <Search className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </M.div>

          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
            <FilterToggle
              label="Veg"
              active={filters.veg}
              onClick={() => handleFilterChange('veg')}
              dotClass="bg-green-500"
            />
            <FilterToggle
              label="Non-Veg"
              active={filters.nonVeg}
              onClick={() => handleFilterChange('nonVeg')}
              dotClass="bg-red-500"
            />
            <FilterToggle
              label="Top Seller"
              active={filters.topSeller}
              onClick={() => handleFilterChange('topSeller')}
              dotClass="bg-[#ffc107]"
            />
          </div>
        </div>
      </section>

      {/* Menu categories */}
      {filteredCategories.map((category, index) => {
        if (category.items.length === 0) return null
        return (
          <section
            key={category.id}
            className={`px-4 py-12 sm:px-6 lg:py-14 ${index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}`}
          >
            <div className="section-container">
              <CategoryHeading category={category} />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {category.items.map((item) => (
                  <FoodCard key={item.id} item={item} onAdd={handleAdd} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

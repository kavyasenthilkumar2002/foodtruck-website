import { Search, Leaf, Triangle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SearchBar({
  search,
  onSearchChange,
  filters,
  onFilterChange,
}) {
  return (
    <section className="bg-icity-bg px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <input
            type="search"
            placeholder="Search for foods"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-white py-4 pl-6 pr-14 text-sm text-icity-brown shadow-sm focus:border-icity-gold focus:outline-none focus:ring-2 focus:ring-icity-gold/30"
          />
          <Search className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </motion.div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <FilterChip
            label="Veg"
            active={filters.veg}
            onClick={() => onFilterChange('veg')}
            icon={<Leaf className="h-4 w-4 text-green-600" />}
          />
          <FilterChip
            label="Non-Veg"
            active={filters.nonVeg}
            onClick={() => onFilterChange('nonVeg')}
            icon={<Triangle className="h-3 w-3 fill-red-500 text-red-500" />}
          />
          <FilterChip
            label="Top Seller"
            active={filters.topSeller}
            onClick={() => onFilterChange('topSeller')}
          />
        </div>
      </div>
    </section>
  )
}

function FilterChip({ label, active, onClick, icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition-all hover:scale-105 ${
        active
          ? 'border-icity-gold bg-icity-gold/20 text-icity-brown'
          : 'border-gray-200 bg-white text-icity-brown'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

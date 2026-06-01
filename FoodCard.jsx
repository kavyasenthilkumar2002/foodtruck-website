import { motion } from 'framer-motion'

export default function FoodCard({ item, onAdd }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md"
    >
      <div className="relative overflow-hidden px-5 pt-5">
        <span className="absolute right-5 top-5 z-10 h-3 w-3 rounded-full bg-icity-gold" />
        <img
          src={item.image}
          alt={item.name}
          className="mx-auto h-40 w-full border-0 object-contain outline-none mix-blend-multiply"
        />
      </div>
      <div className="px-5 pb-5 pt-2">
        <h3 className="text-base font-bold text-icity-brown">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
          {item.description}
        </p>
        <div className="mt-4 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between sm:gap-2">
          <span className="text-base font-bold text-icity-brown sm:text-lg">
            ₹{item.price}
            {item.serving && (
              <span className="ml-1 text-sm font-semibold text-gray-500">{item.serving}</span>
            )}
          </span>
          <button
            type="button"
            onClick={() => onAdd?.(item)}
            className="rounded-md bg-icity-gold px-5 py-1.5 text-xs font-bold uppercase tracking-wide text-icity-brown transition-transform hover:scale-105"
          >
            ADD
          </button>
        </div>
      </div>
    </motion.article>
  )
}

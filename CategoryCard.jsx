import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CategoryCard({ name, image, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center"
    >
      <Link to="/menu" className="group flex flex-col items-center">
        <div className="category-card__image-ring overflow-hidden rounded-full border-[5px] border-white shadow-lg">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
        </div>
        <p className="mt-3 text-sm font-bold text-icity-brown sm:text-base">{name}</p>
      </Link>
    </motion.div>
  )
}

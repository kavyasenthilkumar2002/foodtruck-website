import { motion } from 'framer-motion'

export default function SectionTitle({
  goldText,
  darkText,
  centered = false,
  className = '',
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${
        centered ? 'text-center' : ''
      } ${className}`}
    >
      {goldText && <span className="text-icity-gold">{goldText} </span>}
      {darkText && <span className="text-icity-brown">{darkText}</span>}
    </motion.h2>
  )
}

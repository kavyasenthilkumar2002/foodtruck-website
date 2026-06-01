import { Link } from 'react-router-dom'
import logoImg from '../assets/foodtruck.png'

export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`inline-flex items-center ${className}`}>
      <img
        src={logoImg}
        alt="Foodtruck — Good Food, Good Mood"
        className="h-12 w-auto object-contain sm:h-[3.25rem] md:h-14"
      />
    </Link>
  )
}

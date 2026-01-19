import Link from 'next/link'
import { siteConfig } from '@/data/config'

interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center space-x-3 group ${className}`}>
      {/* Icono del logo - plato/olla elegante */}
      <div className="relative flex-shrink-0">
        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-peru-red via-red-600 to-red-700 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
          {/* Icono de plato/olla estilizado */}
          <svg
            className="w-7 h-7 md:w-8 md:h-8 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            {/* Plato/olla */}
            <path d="M6 8h12M6 8a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
            {/* Vapor/calor */}
            <path d="M9 12h6M9 15h6" strokeWidth="1.5" opacity="0.6"/>
          </svg>
        </div>
        {/* Decoración dorada */}
        <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-peru-gold rounded-full border-2 border-white shadow-md"></div>
      </div>
      
      {/* Texto del logo */}
      <div className="flex flex-col">
        <span className="text-xl md:text-2xl font-bold text-gray-900 leading-tight tracking-tight">
          <span className="text-peru-red">PERU</span>
          <span className="text-gray-700">FLAVOR</span>
        </span>
        <span className="text-[9px] md:text-[10px] text-gray-500 font-semibold tracking-[0.15em] uppercase mt-0.5">
          Comida Casera
        </span>
      </div>
    </Link>
  )
}

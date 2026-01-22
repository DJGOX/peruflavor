'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/data/config'
import { getWhatsAppUrl, getMenuWhatsAppMessage } from '@/lib/utils'
import Logo from './Logo'

export default function Header() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/menu', label: 'Menú' },
    { href: '/contacto', label: 'Contacto' },
    { href: '/como-funciona', label: 'Cómo funciona' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium relative transition-all duration-300 ${
                  pathname === item.href
                    ? 'text-peru-red'
                    : 'text-gray-700 hover:text-peru-red'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-peru-red transform transition-all duration-300 ${
                  pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            ))}
          </nav>

          <a
            href={getWhatsAppUrl(getMenuWhatsAppMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-4 py-2"
            aria-label="Ordenar por WhatsApp"
          >
            <span className="hidden sm:inline">Ordenar</span>
            <span className="sm:hidden">📱</span>
          </a>
        </div>
      </div>

      {/* Mobile menu */}
      <nav className="md:hidden border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around h-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-peru-red'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

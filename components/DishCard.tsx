'use client'

import Link from 'next/link'
import { Dish } from '@/types'
import { formatPrice, getDishWhatsAppMessage, getWhatsAppUrl } from '@/lib/utils'
import ImageWithFallback from './ImageWithFallback'

interface DishCardProps {
  dish: Dish
  priority?: boolean
}

export default function DishCard({ dish, priority = false }: DishCardProps) {
  const tagClassMap: Record<string, string> = {
    'Picante': 'tag-picante',
    'Nuevo': 'tag-nuevo',
    'Clásico': 'tag-clasico',
    'Popular': 'tag-popular',
    'Vegetariano': 'tag-vegetariano',
    'Disponible hoy': 'tag-disponible',
    'Consultar': 'tag-consultar',
  }

  return (
    <div className="card-hover h-full flex flex-col group animate-fade-in-up">
      <Link href={`/menu/${dish.id}`} className="block relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <ImageWithFallback
          src={dish.images[0] || '/placeholder.jpg'}
          alt={dish.name}
          fill
          className="object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
        {dish.peruRegion && (
          <div className={`absolute top-2 left-2 px-3 py-1.5 rounded-full text-xs font-semibold z-20 backdrop-blur-sm shadow-lg transition-all duration-300 group-hover:scale-110 ${
            dish.peruRegion === 'Costa' ? 'bg-blue-500/90 text-white' :
            dish.peruRegion === 'Sierra' ? 'bg-green-600/90 text-white' :
            dish.peruRegion === 'Selva' ? 'bg-emerald-600/90 text-white' :
            dish.peruRegion === 'Costa y Sierra' ? 'bg-purple-500/90 text-white' :
            'bg-gray-600/90 text-white'
          }`}>
            {dish.peruRegion}
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <Link href={`/menu/${dish.id}`} className="text-lg font-bold text-gray-900 hover:text-peru-red transition-colors cursor-pointer flex-grow">
            {dish.name}
          </Link>
          {dish.id === 'picarones' ? (
            <div className="text-right ml-2 whitespace-nowrap">
              <span className="text-lg font-bold text-peru-red">{formatPrice(dish.price!, dish.currency)}</span>
              <div className="text-xs text-gray-500">6 piezas</div>
            </div>
          ) : dish.id === 'tallarines-rojos-huancaina' ? (
            <div className="text-right ml-2 whitespace-nowrap">
              <div className="text-xs text-gray-600">+ cevichito: <span className="font-bold text-peru-red">{formatPrice(20, dish.currency)}</span></div>
              <div className="text-xs text-gray-600">+ chanfainita: <span className="font-bold text-peru-red">{formatPrice(25, dish.currency)}</span></div>
            </div>
          ) : dish.price ? (
            <span className="text-lg font-bold text-peru-red ml-2 whitespace-nowrap">
              {formatPrice(dish.price, dish.currency)}
            </span>
          ) : (
            <span className="text-sm font-semibold text-amber-600 ml-2 whitespace-nowrap">Consultar</span>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
          {dish.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {dish.tags.filter(tag => tag !== 'Disponible hoy').slice(0, 3).map((tag) => (
            <span key={tag} className={tagClassMap[tag] || 'tag bg-gray-100 text-gray-800'}>
              {tag}
            </span>
          ))}
        </div>

        <a
          href={getWhatsAppUrl(getDishWhatsAppMessage(dish))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full text-center text-sm py-2.5 mt-auto relative overflow-hidden group"
        >
          <span className="relative z-10">{dish.tags?.includes('Consultar') ? 'Consultar por WhatsApp' : 'Pedir por WhatsApp'}</span>
          <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </a>
      </div>
    </div>
  )
}

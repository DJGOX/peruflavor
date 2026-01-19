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
  }

  return (
    <div className="card h-full flex flex-col">
      <Link href={`/menu/${dish.id}`} className="block relative h-48 overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={dish.images[0] || '/placeholder.jpg'}
          alt={dish.name}
          fill
          className="object-contain hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
        {dish.isDishOfTheDay && (
          <div className="absolute top-2 right-2 bg-peru-red text-white px-3 py-1 rounded-full text-xs font-bold">
            Plato del Día
          </div>
        )}
        {dish.peruRegion && (
          <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold ${
            dish.peruRegion === 'Costa' ? 'bg-blue-500 text-white' :
            dish.peruRegion === 'Sierra' ? 'bg-green-600 text-white' :
            dish.peruRegion === 'Selva' ? 'bg-emerald-600 text-white' :
            dish.peruRegion === 'Costa y Sierra' ? 'bg-purple-500 text-white' :
            'bg-gray-600 text-white'
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
              <div className="text-sm font-semibold text-peru-red">Desde {formatPrice(12, dish.currency)}</div>
              <div className="text-xs text-gray-500">6 o 8 piezas</div>
            </div>
          ) : dish.price ? (
            <span className="text-lg font-bold text-peru-red ml-2 whitespace-nowrap">
              {formatPrice(dish.price, dish.currency)}
            </span>
          ) : null}
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
          {dish.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {dish.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={tagClassMap[tag] || 'tag bg-gray-100 text-gray-800'}>
              {tag}
            </span>
          ))}
        </div>

        <a
          href={getWhatsAppUrl(getDishWhatsAppMessage(dish))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full text-center text-sm py-2 mt-auto"
        >
          Pedir por WhatsApp
        </a>
      </div>
    </div>
  )
}

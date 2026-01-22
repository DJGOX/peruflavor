'use client'

import Link from 'next/link'
import { Dish } from '@/types'
import { formatPrice, getDishWhatsAppMessage, getWhatsAppUrl } from '@/lib/utils'

interface DishListItemProps {
  dish: Dish
}

export default function DishListItem({ dish }: DishListItemProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
      <div className="flex-1 min-w-0">
        <Link 
          href={`/menu/${dish.id}`}
          className="text-lg font-semibold text-gray-900 hover:text-peru-red transition-colors"
        >
          {dish.name}
        </Link>
        {dish.peruRegion && (
          <span className={`ml-3 px-2 py-0.5 rounded-full text-xs font-semibold ${
            dish.peruRegion === 'Costa' ? 'bg-blue-500 text-white' :
            dish.peruRegion === 'Sierra' ? 'bg-green-600 text-white' :
            dish.peruRegion === 'Selva' ? 'bg-emerald-600 text-white' :
            dish.peruRegion === 'Costa y Sierra' ? 'bg-purple-500 text-white' :
            'bg-gray-600 text-white'
          }`}>
            {dish.peruRegion}
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 flex-shrink-0">
        {dish.id === 'picarones' ? (
          <div className="text-right">
            <span className="text-xl font-bold text-peru-red">{formatPrice(dish.price!, dish.currency)}</span>
            <div className="text-xs text-gray-500">6 piezas</div>
          </div>
        ) : dish.id === 'tallarines-rojos-huancaina' ? (
          <div className="text-right">
            <div className="text-lg font-bold text-peru-red">{formatPrice(20, dish.currency)} / {formatPrice(25, dish.currency)}</div>
            <div className="text-xs text-gray-500">+ cevichito / + chanfainita</div>
          </div>
        ) : dish.price ? (
          <span className="text-xl font-bold text-peru-red whitespace-nowrap">
            {formatPrice(dish.price, dish.currency)}
          </span>
        ) : (
          <span className="text-amber-600 text-sm font-semibold">Consultar</span>
        )}
        
        <a
          href={getWhatsAppUrl(getDishWhatsAppMessage(dish))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm px-4 py-2 whitespace-nowrap"
        >
          {dish.tags?.includes('Consultar') ? 'Consultar' : 'Pedir'}
        </a>
      </div>
    </div>
  )
}

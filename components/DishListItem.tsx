'use client'

import Link from 'next/link'
import { Dish } from '@/types'
import { formatPrice, getDishWhatsAppMessage, getWhatsAppUrl } from '@/lib/utils'

interface DishListItemProps {
  dish: Dish
}

export default function DishListItem({ dish }: DishListItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="flex-1">
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
        {dish.isDishOfTheDay && (
          <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-peru-red text-white">
            Plato del Día
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        {dish.id === 'picarones' ? (
          <div className="text-right">
            <div className="text-lg font-bold text-peru-red">6: {formatPrice(12, dish.currency)}</div>
            <div className="text-lg font-bold text-peru-red">8: {formatPrice(18, dish.currency)}</div>
          </div>
        ) : dish.price ? (
          <span className="text-xl font-bold text-peru-red whitespace-nowrap">
            {formatPrice(dish.price, dish.currency)}
          </span>
        ) : (
          <span className="text-gray-400 text-sm">Consultar precio</span>
        )}
        
        <a
          href={getWhatsAppUrl(getDishWhatsAppMessage(dish))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm px-4 py-2 whitespace-nowrap"
        >
          Pedir
        </a>
      </div>
    </div>
  )
}

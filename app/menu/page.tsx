'use client'

import { useState } from 'react'
import { dishes } from '@/data/dishes'
import { getAvailableDishes, getWhatsAppUrl } from '@/lib/utils'
import DishCard from '@/components/DishCard'
import DishListItem from '@/components/DishListItem'
import { siteConfig } from '@/data/config'

export default function MenuPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const availableDishes = getAvailableDishes(dishes)

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestro Menú
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Descubre nuestros platos tradicionales peruanos, hechos con amor y los mejores ingredientes.
          </p>
          
          {/* Botón de cambio de vista */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                viewMode === 'grid'
                  ? 'bg-peru-red text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label="Vista de cuadrícula"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Cuadrícula
              </span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                viewMode === 'list'
                  ? 'bg-peru-red text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label="Vista de lista"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Lista
              </span>
            </button>
          </div>
        </div>

        {availableDishes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No hay platos disponibles en este momento.
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableDishes.map((dish, index) => (
              <DishCard key={dish.id} dish={dish} priority={index < 6} />
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              {availableDishes.map((dish) => (
                <DishListItem key={dish.id} dish={dish} />
              ))}
            </div>
          </div>
        )}

        {/* Advertencias en la página del menú */}
        <div className="mt-12 max-w-4xl mx-auto space-y-3">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
            <p className="text-yellow-800 mb-2">
              <strong>⚠️ Advertencia:</strong> Algunas de las imágenes mostradas son referenciales y pueden variar en la presentación final del plato.
            </p>
            <p className="text-yellow-800">
              <strong>⚠️ Important Notice:</strong> If you have any food allergies or dietary restrictions, please inform us via WhatsApp at <a href={getWhatsAppUrl('Hola, tengo alergias alimentarias y necesito informarles antes de hacer mi pedido.')} target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-yellow-900">{siteConfig.contact.whatsappFormatted}</a> before placing your order. <strong>This is very important for your safety.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

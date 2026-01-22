'use client'

import { useEffect } from 'react'
import { Dish } from '@/types'
import { formatPrice, getDishWhatsAppMessage, getWhatsAppUrl } from '@/lib/utils'
import ImageWithFallback from './ImageWithFallback'

interface DishModalProps {
  dish: Dish | null
  isOpen: boolean
  onClose: () => void
}

export default function DishModal({ dish, isOpen, onClose }: DishModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !dish) return null

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
    >
      <div
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Cerrar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="relative h-64 md:h-96 bg-gray-100">
            <ImageWithFallback
              src={dish.images[0] || '/placeholder.jpg'}
              alt={dish.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <h2 id="dish-modal-title" className="text-2xl md:text-3xl font-bold text-gray-900">
              {dish.name}
            </h2>
            {dish.id === 'picarones' ? (
              <div className="text-right ml-4 whitespace-nowrap">
                <div className="text-xl md:text-2xl font-bold text-peru-red">6 piezas: {formatPrice(dish.price!, dish.currency)}</div>
              </div>
            ) : dish.id === 'tallarines-rojos-huancaina' ? (
              <div className="text-right ml-4 whitespace-nowrap space-y-1">
                <div className="text-lg md:text-xl font-bold text-peru-red">Con cevichito (1 persona): {formatPrice(20, dish.currency)}</div>
                <div className="text-lg md:text-xl font-bold text-peru-red">Con cevichito + chanfainita: {formatPrice(25, dish.currency)}</div>
              </div>
            ) : dish.price ? (
              <span className="text-2xl font-bold text-peru-red ml-4 whitespace-nowrap">
                {formatPrice(dish.price, dish.currency)}
              </span>
            ) : (
              <span className="text-lg font-semibold text-amber-600 ml-4 whitespace-nowrap">Consultar</span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4 items-center">
            {dish.peruRegion && (
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                dish.peruRegion === 'Costa' ? 'bg-blue-500 text-white' :
                dish.peruRegion === 'Sierra' ? 'bg-green-600 text-white' :
                dish.peruRegion === 'Selva' ? 'bg-emerald-600 text-white' :
                dish.peruRegion === 'Costa y Sierra' ? 'bg-purple-500 text-white' :
                'bg-gray-600 text-white'
              }`}>
                🗺️ {dish.peruRegion}
              </span>
            )}
            {dish.tags.filter(tag => tag !== 'Disponible hoy').map((tag) => (
              <span key={tag} className={tagClassMap[tag] || 'tag bg-gray-100 text-gray-800'}>
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed text-base">{dish.description}</p>

          {(dish.origin || dish.region) && (
            <div className="mb-6 space-y-4">
              {dish.origin && (
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <span className="mr-2">📍</span>
                    Origen
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{dish.origin}</p>
                </div>
              )}
              {dish.region && (
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <span className="mr-2">🗺️</span>
                    Región de Consumo
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{dish.region}</p>
                </div>
              )}
            </div>
          )}

          {dish.ingredients && dish.ingredients.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Ingredientes:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {dish.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}

          {dish.notes && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">{dish.notes}</p>
            </div>
          )}

          {dish.videoUrl && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Video:</h3>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={dish.videoUrl}
                  title={`Video de ${dish.name}`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {dish.images.length > 1 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Más fotos:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dish.images.slice(1).map((image, index) => (
                  <div key={index} className="relative h-32 rounded-lg overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={image}
                      alt={`${dish.name} - Foto ${index + 2}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <a
            href={getWhatsAppUrl(getDishWhatsAppMessage(dish))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full text-center text-lg py-4 block"
          >
            {dish.tags?.includes('Consultar') ? 'Consultar por WhatsApp' : 'Pedir por WhatsApp'}
          </a>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Dish } from '@/types'
import { formatPrice, getDishWhatsAppMessage, getWhatsAppUrl } from '@/lib/utils'
import { getDishTranslations } from '@/lib/translations'
import ImageWithFallback from './ImageWithFallback'
import ImageLightbox from './ImageLightbox'

interface DishDetailContentProps {
  dish: Dish
}

export default function DishDetailContent({ dish }: DishDetailContentProps) {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const translations = getDishTranslations(dish)
  const isEnglish = language === 'en'

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const tagClassMap: Record<string, string> = {
    'Picante': 'tag-picante',
    'Nuevo': 'tag-nuevo',
    'Clásico': 'tag-clasico',
    'Popular': 'tag-popular',
    'Vegetariano': 'tag-vegetariano',
    'Disponible hoy': 'tag-disponible',
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Language Toggle */}
        <div className="flex justify-end mb-6 animate-fade-in-up">
          <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200 flex gap-1">
            <button
              onClick={() => setLanguage('es')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                language === 'es'
                  ? 'bg-gradient-to-r from-peru-red to-red-700 text-white shadow-md'
                  : 'text-gray-600 hover:text-peru-red'
              }`}
            >
              🇵🇪 Español
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                language === 'en'
                  ? 'bg-gradient-to-r from-peru-red to-red-700 text-white shadow-md'
                  : 'text-gray-600 hover:text-peru-red'
              }`}
            >
              🇺🇸 English
            </button>
          </div>
        </div>

        <div className="card-hover overflow-hidden bg-white shadow-2xl border-0 animate-fade-in-up">
          {/* Hero Image with Peruvian Pattern Overlay */}
          <div 
            className="relative h-64 md:h-96 bg-gradient-to-br from-peru-red/10 via-red-50 to-peru-gold/10 overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(0)}
          >
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(220,20,60,0.1) 10px, rgba(220,20,60,0.1) 20px)`
              }}></div>
            </div>
            <ImageWithFallback
              src={dish.images[0] || '/placeholder.jpg'}
              alt={dish.name}
              fill
              className="object-contain relative z-10 group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-20"></div>
            {/* Click Indicator */}
            <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 lg:p-10">
            {/* Title Section with Peruvian Accent */}
            <div className="relative mb-6">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-peru-red via-red-600 to-peru-gold rounded-full"></div>
              <div className="flex items-start justify-between flex-wrap gap-4 pl-4">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                    <span className="bg-gradient-to-r from-peru-red to-red-600 bg-clip-text text-transparent">
                      {dish.name}
                    </span>
                  </h1>
                  {isEnglish && dish.nameEn && (
                    <p className="text-lg text-gray-500 italic">{dish.nameEn}</p>
                  )}
                </div>
                {/* Price */}
                {dish.id === 'picarones' ? (
                  <div className="text-right whitespace-nowrap">
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-peru-red to-red-600 bg-clip-text text-transparent">
                      6 {isEnglish ? 'pieces' : 'piezas'}: {formatPrice(dish.price!, dish.currency)}
                    </div>
                  </div>
                ) : dish.id === 'tallarines-rojos-huancaina' ? (
                  <div className="text-right whitespace-nowrap space-y-1">
                    <div className="text-xl md:text-2xl font-bold text-peru-red">
                      {isEnglish ? 'With ceviche (1 person)' : 'Con cevichito (1 persona)'}: {formatPrice(20, dish.currency)}
                    </div>
                    <div className="text-xl md:text-2xl font-bold text-peru-red">
                      {isEnglish ? 'With ceviche + chanfainita' : 'Con cevichito + chanfainita'}: {formatPrice(25, dish.currency)}
                    </div>
                  </div>
                ) : dish.price ? (
                  <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-peru-red to-red-600 bg-clip-text text-transparent whitespace-nowrap">
                    {formatPrice(dish.price, dish.currency)}
                  </span>
                ) : null}
              </div>
            </div>

            {/* Tags and Region */}
            <div className="flex flex-wrap gap-2 mb-8 items-center">
              {dish.peruRegion && (
                <span className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm shadow-md transition-all duration-300 hover:scale-110 ${
                  dish.peruRegion === 'Costa' ? 'bg-blue-500/90 text-white' :
                  dish.peruRegion === 'Sierra' ? 'bg-green-600/90 text-white' :
                  dish.peruRegion === 'Selva' ? 'bg-emerald-600/90 text-white' :
                  dish.peruRegion === 'Costa y Sierra' ? 'bg-purple-500/90 text-white' :
                  'bg-gray-600/90 text-white'
                }`}>
                  🗺️ {isEnglish ? 
                    (dish.peruRegion === 'Costa' ? 'Coast' :
                     dish.peruRegion === 'Sierra' ? 'Highlands' :
                     dish.peruRegion === 'Selva' ? 'Jungle' :
                     dish.peruRegion === 'Costa y Sierra' ? 'Coast & Highlands' :
                     'All Peru') : dish.peruRegion}
                </span>
              )}
              {dish.tags.filter(tag => tag !== 'Disponible hoy').map((tag) => (
                <span key={tag} className={tagClassMap[tag] || 'tag bg-gray-100 text-gray-800'}>
                  {isEnglish ? 
                    (tag === 'Picante' ? 'Spicy' :
                     tag === 'Clásico' ? 'Classic' :
                     tag === 'Popular' ? 'Popular' :
                     tag === 'Vegetariano' ? 'Vegetarian' :
                     tag === 'Consultar' ? 'Ask' : tag) : tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8 p-6 bg-gradient-to-r from-red-50 via-white to-red-50 rounded-2xl border-l-4 border-peru-red shadow-sm hover:shadow-md transition-shadow duration-300">
              <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                {isEnglish ? translations.description : dish.description}
              </p>
            </div>

            {/* Cultural Information */}
            {(dish.origin || dish.region) && (
              <div className="mb-8 grid md:grid-cols-2 gap-4">
                {dish.origin && (
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                      <span className="mr-3 text-3xl">📍</span>
                      <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        {isEnglish ? 'Origin' : 'Origen'}
                      </span>
                    </h2>
                    <p className="text-base text-gray-700 leading-relaxed">
                      {isEnglish ? translations.origin : dish.origin}
                    </p>
                  </div>
                )}
                {dish.region && (
                  <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                      <span className="mr-3 text-3xl">🗺️</span>
                      <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                        {isEnglish ? 'Consumption Region' : 'Región de Consumo'}
                      </span>
                    </h2>
                    <p className="text-base text-gray-700 leading-relaxed">
                      {isEnglish ? translations.region : dish.region}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Ingredients */}
            {dish.ingredients && dish.ingredients.length > 0 && (
              <div className="mb-8 p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-3 text-3xl">🍽️</span>
                  <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                    {isEnglish ? 'Ingredients' : 'Ingredientes'}
                  </span>
                </h2>
                <div className="grid md:grid-cols-2 gap-2">
                  {(isEnglish ? translations.ingredients : dish.ingredients)?.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-peru-red text-lg">•</span>
                      <span className="text-base text-gray-700">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {dish.notes && (
              <div className="mb-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">ℹ️</span>
                  <p className="text-base text-gray-700 leading-relaxed flex-1">
                    {isEnglish ? translations.notes : dish.notes}
                  </p>
                </div>
              </div>
            )}

            {/* More Photos Gallery */}
            {dish.images.length > 1 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-3 text-3xl">📸</span>
                  <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                    {isEnglish ? 'More Photos' : 'Más Fotos'}
                  </span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {dish.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative h-48 rounded-xl overflow-hidden bg-gray-100 cursor-pointer group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      onClick={() => openLightbox(index)}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${dish.name} - Foto ${index + 1}`}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="mt-8 pt-6 border-t-2 border-gray-200">
              <a
                href={getWhatsAppUrl(getDishWhatsAppMessage(dish))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center text-lg md:text-xl py-4 md:py-5 block relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>📱</span>
                  <span>{isEnglish ? 'Order via WhatsApp' : 'Pedir por WhatsApp'}</span>
                </span>
                <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        images={dish.images}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        alt={dish.name}
      />
    </section>
  )
}

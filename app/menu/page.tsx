'use client'

import { useState, useMemo, useRef } from 'react'
import { dishes } from '@/data/dishes'
import {
  getAvailableDishes,
  getWhatsAppUrl,
  type DishCategory,
  type RegionFilter,
  dishMatchesRegion,
  dishMatchesCategories,
} from '@/lib/utils'
import DishCard from '@/components/DishCard'
import DishListItem from '@/components/DishListItem'
import { siteConfig } from '@/data/config'

const REGION_OPTIONS: { value: RegionFilter; label: string }[] = [
  { value: 'Costa', label: 'Costa' },
  { value: 'Sierra', label: 'Sierra' },
  { value: 'Selva', label: 'Selva' },
]

const CATEGORY_OPTIONS: { value: DishCategory; label: string }[] = [
  { value: 'Dulce', label: 'Dulce' },
  { value: 'Salado', label: 'Salado' },
  { value: 'Sopas', label: 'Sopas' },
  { value: 'Picante', label: 'Picantes' },
  { value: 'Postres', label: 'Postres' },
]

export default function MenuPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [regionFilters, setRegionFilters] = useState<RegionFilter[]>([])
  const [categoryFilters, setCategoryFilters] = useState<DishCategory[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const availableDishes = getAvailableDishes(dishes)

  const toggleRegion = (r: RegionFilter) => {
    setRegionFilters((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    )
  }
  const toggleCategory = (c: DishCategory) => {
    setCategoryFilters((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    )
  }
  const clearAllFilters = () => {
    setSearchQuery('')
    setRegionFilters([])
    setCategoryFilters([])
    searchInputRef.current?.focus()
  }
  const hasActiveFilters = searchQuery.trim() || regionFilters.length > 0 || categoryFilters.length > 0

  const filteredDishes = useMemo(() => {
    let list = availableDishes
    const q = searchQuery.trim().toLowerCase()
    if (q) {
      list = list.filter((d) => d.name.toLowerCase().includes(q))
    }
    list = list.filter((d) => dishMatchesRegion(d.peruRegion, regionFilters))
    list = list.filter((d) => dishMatchesCategories(d, categoryFilters))
    return list
  }, [availableDishes, searchQuery, regionFilters, categoryFilters])

  // Categorizar platos
  const categorizedDishes = useMemo(() => {
    const categorizeDish = (dish: typeof availableDishes[0]) => {
      const id = dish.id.toLowerCase()
      const name = dish.name.toLowerCase()
      
      // Postres
      if (id.includes('picarones') || 
          id.includes('mazamorra') || 
          name.includes('mazamorra') ||
          (id.includes('arroz') && name.includes('leche')) ||
          id.includes('combinado')) {
        return 'postres'
      }
      
      // Sopas
      if (id.includes('sopa') || 
          id.includes('caldo') || 
          id.includes('crema') || 
          id.includes('patasca') || 
          id.includes('parihuela') || 
          name.includes('sopa') || 
          name.includes('caldo') || 
          name.includes('crema') ||
          name.includes('patasca') ||
          name.includes('parihuela')) {
        return 'sopas'
      }
      
      // Platos de fondo (todo lo demás)
      return 'platos-fondo'
    }

    const categories = {
      sopas: filteredDishes.filter(d => categorizeDish(d) === 'sopas'),
      'platos-fondo': filteredDishes.filter(d => categorizeDish(d) === 'platos-fondo'),
      postres: filteredDishes.filter(d => categorizeDish(d) === 'postres'),
    }
    return categories
  }, [filteredDishes])

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
          {/* Información sobre Platos del Día */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 md:p-5 max-w-3xl mx-auto shadow-md mb-8">
            <p className="text-sm md:text-base text-gray-700 mb-2">
              <strong className="text-green-700">📱 ¿Quieres saber cuáles son los Platos del Día?</strong>
            </p>
            <ul className="text-sm md:text-base text-gray-700 space-y-1">
              <li className="flex items-center justify-center">
                <span className="mr-2">✓</span>
                <span>Revisa los <strong className="text-green-700">estados de WhatsApp</strong> del número <strong className="text-peru-red">{siteConfig.contact.whatsappFormatted}</strong></span>
              </li>
              <li className="flex items-center justify-center">
                <span className="mr-2">✓</span>
                <span>O <a href={getWhatsAppUrl('Hola, ¿cuáles son los platos del día de hoy?')} target="_blank" rel="noopener noreferrer" className="text-peru-red font-semibold hover:underline">consulta directamente por WhatsApp</a></span>
              </li>
            </ul>
          </div>

          {/* Buscador */}
          <div className="max-w-xl mx-auto mb-6 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Escape' && setSearchQuery('')}
                placeholder="Buscar platos por nombre..."
                className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-peru-red focus:border-peru-red outline-none transition-shadow"
                aria-label="Buscar platos por nombre"
              />
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex gap-2 justify-center sm:justify-start">
              <button type="button" onClick={() => searchInputRef.current?.focus()} className="px-5 py-3 rounded-lg font-semibold bg-peru-red text-white hover:bg-red-700 transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                Buscar
              </button>
              <button type="button" onClick={() => { setSearchQuery(''); searchInputRef.current?.focus() }} className="px-4 py-3 rounded-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                Limpiar
              </button>
            </div>
          </div>
        </div>

        {/* Layout: Filtros lateral (desktop) / superior (mobile) */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filtros: región, tipo, vista */}
          <div className="lg:w-80 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-4 rounded-xl bg-gray-50 border border-gray-200 overflow-hidden">
              {/* Header del panel de filtros - siempre visible */}
              <button
                type="button"
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors lg:pointer-events-none"
                aria-expanded={filtersOpen}
                aria-controls="filters-content"
              >
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-gray-900">Filtros</h2>
                  {hasActiveFilters && (
                    <span className="bg-peru-red text-white text-xs font-bold px-2 py-1 rounded-full">
                      {regionFilters.length + categoryFilters.length + (searchQuery.trim() ? 1 : 0)}
                    </span>
                  )}
                </div>
                <svg
                  className={`w-5 h-5 text-gray-600 transition-transform duration-200 lg:hidden ${filtersOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Contenido de filtros - desplegable en mobile, siempre visible en desktop */}
              <div
                id="filters-content"
                className={`lg:block transition-all duration-300 ease-in-out ${
                  filtersOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden lg:max-h-none lg:opacity-100'
                }`}
              >
                <div className="px-6 pb-6 space-y-5">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Región</p>
                    <div className="flex flex-wrap lg:flex-col gap-2">
                      {REGION_OPTIONS.map(({ value, label }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => toggleRegion(value)}
                          className={`px-4 py-2 rounded-full lg:rounded-lg text-sm font-medium transition-colors cursor-pointer w-full lg:w-full text-center ${
                            regionFilters.includes(value) ? 'bg-peru-red text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Tipo</p>
                    <div className="flex flex-wrap lg:flex-col gap-2">
                      {CATEGORY_OPTIONS.map(({ value, label }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => toggleCategory(value)}
                          className={`px-4 py-2 rounded-full lg:rounded-lg text-sm font-medium transition-colors cursor-pointer w-full lg:w-full text-center ${
                            categoryFilters.includes(value) ? 'bg-peru-red text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="text-sm font-semibold text-peru-red hover:underline"
                    >
                      Limpiar todos los filtros
                    </button>
                  )}
                </div>
              </div>

              {/* Vista (grid/list) - siempre visible */}
              <div className="px-6 py-4 border-t border-gray-200 flex flex-wrap items-center gap-4 bg-white">
                <p className="text-sm font-semibold text-gray-700">Vista:</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
                      viewMode === 'grid' ? 'bg-peru-red text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-label="Vista de cuadrícula"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Cuadrícula
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
                      viewMode === 'list' ? 'bg-peru-red text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-label="Vista de lista"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Lista
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal: platos */}
          <div className="flex-1 min-w-0">
            {availableDishes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No hay platos disponibles en este momento.
            </p>
          </div>
        ) : filteredDishes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              {searchQuery.trim()
                ? `No se encontraron platos con "${searchQuery.trim()}".`
                : 'No hay platos que coincidan con los filtros seleccionados.'}
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-peru-red font-semibold hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Sopas */}
            {categorizedDishes.sopas.length > 0 && (
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-peru-red">
                  Sopas
                </h2>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorizedDishes.sopas.map((dish, index) => (
                      <DishCard key={dish.id} dish={dish} priority={index < 3} />
                    ))}
                  </div>
                ) : (
                  <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-visible">
                    <div className="divide-y divide-gray-200">
                      {categorizedDishes.sopas.map((dish) => (
                        <DishListItem key={dish.id} dish={dish} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Platos de Fondo */}
            {categorizedDishes['platos-fondo'].length > 0 && (
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-peru-red">
                  Platos de Fondo
                </h2>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorizedDishes['platos-fondo'].map((dish, index) => (
                      <DishCard key={dish.id} dish={dish} priority={index < 3} />
                    ))}
                  </div>
                ) : (
                  <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-visible">
                    <div className="divide-y divide-gray-200">
                      {categorizedDishes['platos-fondo'].map((dish) => (
                        <DishListItem key={dish.id} dish={dish} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Postres */}
            {categorizedDishes.postres.length > 0 && (
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-peru-red">
                  Postres
                </h2>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorizedDishes.postres.map((dish, index) => (
                      <DishCard key={dish.id} dish={dish} priority={index < 3} />
                    ))}
                  </div>
                ) : (
                  <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-visible">
                    <div className="divide-y divide-gray-200">
                      {categorizedDishes.postres.map((dish) => (
                        <DishListItem key={dish.id} dish={dish} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
          </div>
        </div>

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

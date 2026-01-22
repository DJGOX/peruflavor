'use client'

import { useState } from 'react'
import { dishes } from '@/data/dishes'
import ImageLightbox from '@/components/ImageLightbox'
import ImageWithFallback from '@/components/ImageWithFallback'

export default function GaleriaPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Obtener todas las imágenes de todos los platos, omitiendo duplicados
  const allImages = dishes
    .flatMap((dish) => 
      dish.images.map((image, index) => ({
        src: image,
        dishName: dish.name,
        dishId: dish.id,
        index: index,
      }))
    )
    .filter((item) => item.src && !item.src.includes('placeholder'))
    // Eliminar duplicados basándose en la ruta de la imagen
    .filter((item, index, self) => 
      index === self.findIndex((t) => t.src === item.src)
    )

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <section className="py-12 md:py-16 relative min-h-screen overflow-hidden">
      {/* Fondo peruano con patrones decorativos */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-yellow-50">
        {/* Patrón de líneas diagonales peruanas */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(220, 20, 60, 0.1) 20px,
            rgba(220, 20, 60, 0.1) 40px
          )`
        }}></div>
        
        {/* Patrón de cuadrícula peruana */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(rgba(220, 20, 60, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220, 20, 60, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Círculos decorativos peruanos */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-100/10 rounded-full blur-3xl"></div>
        
        {/* Motivos geométricos andinos */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="peru-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M0,10 L10,0 L20,10 L10,20 Z" fill="none" stroke="rgba(220,20,60,0.3)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#peru-pattern)"/>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-block mb-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 border-2 border-peru-red/30 shadow-lg">
              <span className="text-2xl">🇵🇪</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-peru-red via-red-600 to-red-700 bg-clip-text text-transparent drop-shadow-lg">
              Galería de Platos
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-peru-red"></div>
            <div className="h-1 w-2 bg-peru-red rounded-full"></div>
            <div className="h-1 w-12 bg-gradient-to-l from-transparent to-peru-red"></div>
          </div>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Descubre la variedad y calidad de nuestros platos peruanos. Cada imagen representa el amor y dedicación que ponemos en cada preparación.
          </p>
          <p className="text-base text-gray-600 mt-4 max-w-2xl mx-auto">
            Haz clic en cualquier imagen para verla en grande
          </p>
        </div>

        {/* Gallery Grid */}
        {allImages.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {allImages.map((item, index) => (
                <div
                  key={`${item.dishId}-${item.index}`}
                  className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-white via-red-50/30 to-yellow-50/30 cursor-pointer group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up border-2 border-white/50 shadow-lg"
                  style={{ animationDelay: `${(index % 20) * 0.05}s` }}
                  onClick={() => openLightbox(index)}
                >
                  {/* Borde decorativo peruano */}
                  <div className="absolute inset-0 border-2 border-peru-red/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <ImageWithFallback
                    src={item.src}
                    alt={`${item.dishName} - Foto ${item.index + 1}`}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  {/* Overlay con nombre del plato */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-sm font-semibold text-center line-clamp-2">
                        {item.dishName}
                      </p>
                    </div>
                  </div>
                  {/* Icono de zoom */}
                  <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Image Counter */}
            <div className="text-center mt-8 text-gray-600">
              <p className="text-sm md:text-base">
                Mostrando <strong className="text-peru-red">{allImages.length}</strong> {allImages.length === 1 ? 'imagen' : 'imágenes'} de nuestros platos
              </p>
            </div>
          </>
        )}
      </div>

      {/* Image Lightbox */}
      {allImages.length > 0 && lightboxOpen && (
        <ImageLightbox
          images={allImages.map(item => item.src)}
          currentIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          alt={allImages[lightboxIndex]?.dishName || 'Plato'}
        />
      )}
    </section>
  )
}

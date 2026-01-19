import { notFound } from 'next/navigation'
import { dishes } from '@/data/dishes'
import { formatPrice, getDishWhatsAppMessage, getWhatsAppUrl } from '@/lib/utils'
import ImageWithFallback from '@/components/ImageWithFallback'

interface PageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  return dishes.map((dish) => ({
    id: dish.id,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const dish = dishes.find((d) => d.id === params.id)
  
  if (!dish) {
    return {
      title: 'Plato no encontrado',
    }
  }

  return {
    title: dish.name,
    description: dish.description,
    openGraph: {
      title: `${dish.name} - Peruflavor`,
      description: dish.description,
      images: dish.images.length > 0 ? [dish.images[0]] : [],
    },
  }
}

export default function DishDetailPage({ params }: PageProps) {
  const dish = dishes.find((d) => d.id === params.id)

  if (!dish) {
    notFound()
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
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="card overflow-hidden">
          <div className="relative h-64 md:h-96 bg-gray-100">
            <ImageWithFallback
              src={dish.images[0] || '/placeholder.jpg'}
              alt={dish.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
            {dish.isDishOfTheDay && (
              <div className="absolute top-4 left-4 bg-peru-red text-white px-4 py-2 rounded-full text-sm font-bold">
                Plato del Día
              </div>
            )}
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {dish.name}
              </h1>
              {dish.id === 'picarones' ? (
                <div className="text-right whitespace-nowrap">
                  <div className="text-2xl md:text-3xl font-bold text-peru-red">6 piezas: {formatPrice(12, dish.currency)}</div>
                  <div className="text-2xl md:text-3xl font-bold text-peru-red">8 piezas: {formatPrice(18, dish.currency)}</div>
                </div>
              ) : dish.price ? (
                <span className="text-3xl font-bold text-peru-red whitespace-nowrap">
                  {formatPrice(dish.price, dish.currency)}
                </span>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2 mb-6 items-center">
              {dish.peruRegion && (
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  dish.peruRegion === 'Costa' ? 'bg-blue-500 text-white' :
                  dish.peruRegion === 'Sierra' ? 'bg-green-600 text-white' :
                  dish.peruRegion === 'Selva' ? 'bg-emerald-600 text-white' :
                  dish.peruRegion === 'Costa y Sierra' ? 'bg-purple-500 text-white' :
                  'bg-gray-600 text-white'
                }`}>
                  🗺️ {dish.peruRegion}
                </span>
              )}
              {dish.tags.map((tag) => (
                <span key={tag} className={tagClassMap[tag] || 'tag bg-gray-100 text-gray-800'}>
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              {dish.description}
            </p>

            {(dish.origin || dish.region) && (
              <div className="mb-6 space-y-4">
                {dish.origin && (
                  <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="mr-2 text-2xl">📍</span>
                      Origen
                    </h2>
                    <p className="text-base text-gray-700 leading-relaxed">{dish.origin}</p>
                  </div>
                )}
                {dish.region && (
                  <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="mr-2 text-2xl">🗺️</span>
                      Región de Consumo
                    </h2>
                    <p className="text-base text-gray-700 leading-relaxed">{dish.region}</p>
                  </div>
                )}
              </div>
            )}

            {dish.ingredients && dish.ingredients.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Ingredientes:</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {dish.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-base">{ingredient}</li>
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
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Video:</h2>
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
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Más fotos:</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {dish.images.slice(1).map((image, index) => (
                    <div key={index} className="relative h-48 rounded-lg overflow-hidden bg-gray-100">
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
              Pedir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

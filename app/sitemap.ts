import { MetadataRoute } from 'next'
import { dishes } from '@/data/dishes'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://peruflavor.com'

  const routes = [
    '',
    '/menu',
    '/galeria',
    '/contacto',
    '/como-funciona',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const dishRoutes = dishes.map((dish) => ({
    url: `${baseUrl}/menu/${dish.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: dish.isDishOfTheDay ? 0.9 : 0.7,
  }))

  return [...routes, ...dishRoutes]
}

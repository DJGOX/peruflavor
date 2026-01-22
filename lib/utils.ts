import { Dish } from '@/types'
import { siteConfig } from '@/data/config'

export type DishCategory = 'Dulce' | 'Salado' | 'Sopas' | 'Picante' | 'Postres'
export type RegionFilter = 'Costa' | 'Sierra' | 'Selva'

const SOUP_IDS = new Set([
  'sopa-semola', 'sopa-trigo', 'crema-arveja', 'patasca', 'sopa-minuta',
  'sopa-criolla-sustancia', 'sopa-dieta', 'caldo-gallina', 'parihuela-mixta',
])
const DESSERT_IDS = new Set(['picarones', 'combinado-mazamorra-arroz'])

export function getDishCategories(dish: Dish): DishCategory[] {
  const cats: DishCategory[] = []
  if (DESSERT_IDS.has(dish.id)) {
    cats.push('Postres', 'Dulce')
  } else {
    cats.push('Salado')
  }
  if (SOUP_IDS.has(dish.id)) cats.push('Sopas')
  if (dish.tags?.includes('Picante')) cats.push('Picante')
  return cats
}

export function dishMatchesRegion(
  peruRegion: Dish['peruRegion'],
  selected: RegionFilter[]
): boolean {
  if (!selected.length) return true
  if (!peruRegion) return false
  const r = peruRegion
  return selected.some((s) => {
    if (s === 'Costa') return r === 'Costa' || r === 'Costa y Sierra' || r === 'Todo el Perú'
    if (s === 'Sierra') return r === 'Sierra' || r === 'Costa y Sierra' || r === 'Todo el Perú'
    if (s === 'Selva') return r === 'Selva' || r === 'Todo el Perú'
    return false
  })
}

export function dishMatchesCategories(
  dish: Dish,
  selected: DishCategory[]
): boolean {
  if (!selected.length) return true
  const cats = getDishCategories(dish)
  return selected.some((s) => cats.includes(s))
}

export function getWhatsAppUrl(message?: string): string {
  const phone = siteConfig.contact.whatsapp
  const encodedMessage = message ? encodeURIComponent(message) : ''
  return `https://wa.me/1${phone}${encodedMessage ? `?text=${encodedMessage}` : ''}`
}

export function getDishWhatsAppMessage(dish: Dish): string {
  if (!dish.price && dish.tags?.includes('Consultar')) {
    return `Hola, quiero consultar por ${dish.name}. ¿Cuál es el precio?`
  }
  return `Hola, quiero pedir ${dish.name}. ¿Está disponible hoy?`
}

export function getMenuWhatsAppMessage(): string {
  return 'Hola, quiero ver el menú de hoy. ¿Qué platos tienen disponibles?'
}

export function getEventsWhatsAppMessage(): string {
  return 'Hola, estoy interesado en hacer una orden grande para un evento (boda, cumpleaños, evento social). ¿Podrían ayudarme con más información?'
}

export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price)
}

export function getDishesOfTheDay(dishes: Dish[]): Dish[] {
  return dishes.filter(dish => dish.isDishOfTheDay)
}

export function getAvailableDishes(dishes: Dish[]): Dish[] {
  return dishes.filter(dish => dish.isAvailableToday !== false)
}

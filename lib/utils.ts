import { Dish } from '@/types'
import { siteConfig } from '@/data/config'

export function getWhatsAppUrl(message?: string): string {
  const phone = siteConfig.contact.whatsapp
  const encodedMessage = message ? encodeURIComponent(message) : ''
  return `https://wa.me/1${phone}${encodedMessage ? `?text=${encodedMessage}` : ''}`
}

export function getDishWhatsAppMessage(dish: Dish): string {
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

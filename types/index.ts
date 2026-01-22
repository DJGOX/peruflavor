export interface Dish {
  id: string
  name: string
  nameEn?: string
  description: string
  price?: number
  currency?: string
  images: string[]
  videoUrl?: string
  tags: DishTag[]
  ingredients?: string[]
  notes?: string
  origin?: string
  region?: string
  peruRegion?: 'Costa' | 'Sierra' | 'Selva' | 'Costa y Sierra' | 'Todo el Perú'
  isAvailableToday?: boolean
  isDishOfTheDay?: boolean
}

export type DishTag = 'Picante' | 'Nuevo' | 'Clásico' | 'Disponible hoy' | 'Popular' | 'Vegetariano' | 'Consultar'

export interface ContactInfo {
  whatsapp: string
  whatsappFormatted: string
  hours: string
  zones: string[]
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  contact: ContactInfo
}

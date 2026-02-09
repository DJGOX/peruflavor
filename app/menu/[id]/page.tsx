import { notFound } from 'next/navigation'
import { dishes } from '@/data/dishes'
import { siteConfig } from '@/data/config'
import DishDetailContent from '@/components/DishDetailContent'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return dishes.map((dish) => ({
    id: dish.id,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const dish = dishes.find((d) => d.id === id)
  
  if (!dish) {
    return {
      title: 'Plato no encontrado',
    }
  }

  return {
    title: dish.name,
    description: dish.description,
    openGraph: {
      title: `${dish.name} - ${siteConfig.name}`,
      description: dish.description,
      images: dish.images.length > 0 ? [dish.images[0]] : [],
    },
  }
}

export default async function DishDetailPage({ params }: PageProps) {
  const { id } = await params
  const dish = dishes.find((d) => d.id === id)

  if (!dish) {
    notFound()
  }

  return <DishDetailContent dish={dish} />
}

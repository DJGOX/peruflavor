import { notFound } from 'next/navigation'
import { dishes } from '@/data/dishes'
import DishDetailContent from '@/components/DishDetailContent'

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

  return <DishDetailContent dish={dish} />
}

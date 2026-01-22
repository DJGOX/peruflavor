import { Dish } from '@/types'

export interface DishTranslations {
  description: string
  origin?: string
  region?: string
  ingredients?: string[]
  notes?: string
}

// Helper function to translate common Spanish terms
function translateCommonTerms(text: string): string {
  const translations: Record<string, string> = {
    'Plato': 'Dish',
    'tradicional': 'traditional',
    'peruano': 'Peruvian',
    'preparado': 'prepared',
    'con': 'with',
    'y': 'and',
    'o': 'or',
    'se sirve': 'served',
    'acompañado': 'accompanied',
    'muy popular': 'very popular',
    'especialmente': 'especially',
    'consumido': 'consumed',
    'desde': 'since',
    'siglo': 'century',
    'Patrimonio Cultural': 'Cultural Heritage',
    'Nación': 'Nation',
    'Origen': 'Origin',
    'Región de Consumo': 'Consumption Region',
    'Ingredientes': 'Ingredients',
    'Notas': 'Notes',
  }
  
  // Simple word-by-word translation (basic implementation)
  let translated = text
  Object.entries(translations).forEach(([es, en]) => {
    const regex = new RegExp(es, 'gi')
    translated = translated.replace(regex, en)
  })
  return translated
}

export function getDishTranslations(dish: Dish): DishTranslations {
  // Traducciones específicas para platos importantes
  const translations: Record<string, DishTranslations> = {
    'ceviche': {
      description: 'Peru\'s flagship dish and Cultural Heritage of the Nation. Fresh fish from the Peruvian Pacific cut into cubes and "cooked" in acidic lemon juice, mixed with limo chili, red onion in julienne, fresh cilantro, and salt. The "cooking" process in citric acid transforms the fish texture without using heat. Served with sweet potato (camote), large corn (choclo), and toasted corn (cancha). Tiger\'s milk, the resulting broth, is considered energizing. A fresh, acidic, spicy, and delicious dish that represents the essence of Peruvian cuisine.',
      origin: 'Pre-Hispanic Peruvian dish, consumed since the Moche culture era (200-700 AD). Modern ceviche evolved with the arrival of citrus fruits in the 16th century. Declared Cultural Heritage of the Nation in 2004.',
      region: 'Consumed throughout Peru, but especially on the coast. Very popular in Lima, Callao, Trujillo, Chiclayo, Piura, Tumbes, and all coastal cities. It is the most representative dish of Peruvian gastronomy.',
      ingredients: ['Fresh fish (sea bass, sole, grouper)', 'Acidic lemon', 'Limo chili', 'Red onion', 'Cilantro', 'Salt', 'Sweet potato', 'Large corn', 'Toasted corn']
    },
    'lomo-saltado': {
      description: 'One of the most emblematic dishes of Peruvian cuisine, a result of the fusion between Creole and Chinese (chifa) cuisine. Tender beef strips are stir-fried at very high heat (wok technique) with onion, tomato, yellow chili, and soy sauce. Served over crispy fried potatoes and white rice. The secret lies in the quick high-heat stir-fry that seals the meat juices while vegetables maintain their texture. A dish that perfectly represents Peruvian culinary fusion.',
      origin: 'Dish from chifa cuisine (Peruvian-Chinese), created by Chinese immigrants in Peru in the late 19th century. Combines Chinese stir-fry techniques with Peruvian ingredients. One of the most representative dishes of Peruvian culinary fusion.',
      region: 'Extremely popular throughout Peru, especially in Lima where there are thousands of chifas. Also very consumed in large cities like Trujillo, Arequipa, Cusco, and Chiclayo. Considered one of the most beloved national dishes.',
      ingredients: ['Beef tenderloin', 'Onion', 'Tomato', 'Yellow chili', 'Soy sauce', 'Vinegar', 'French fries', 'White rice', 'Cilantro', 'Garlic']
    }
  }

  // Si hay traducción específica, la devolvemos
  if (translations[dish.id]) {
    return translations[dish.id]
  }

  // Para otros platos, proporcionamos traducciones básicas
  // En producción, deberías tener traducciones completas para todos los platos
  return {
    description: dish.description || 'Traditional Peruvian homemade dish prepared with fresh ingredients and authentic flavors.',
    origin: dish.origin || 'Traditional Peruvian dish, part of the rich culinary heritage of Peru.',
    region: dish.region || 'Consumed throughout Peru, representing the diversity of Peruvian cuisine.',
    ingredients: dish.ingredients?.map(ing => {
      // Traducciones básicas de ingredientes comunes
      const ingTranslations: Record<string, string> = {
        'Pescado': 'Fish',
        'Pollo': 'Chicken',
        'Carne': 'Meat',
        'Arroz': 'Rice',
        'Papas': 'Potatoes',
        'Cebolla': 'Onion',
        'Ajo': 'Garlic',
        'Cilantro': 'Cilantro',
        'Limón': 'Lemon',
        'Ají': 'Chili',
        'Sal': 'Salt',
        'Aceite': 'Oil',
      }
      let translated = ing
      Object.entries(ingTranslations).forEach(([es, en]) => {
        if (ing.includes(es)) {
          translated = ing.replace(es, en)
        }
      })
      return translated
    }),
    notes: dish.notes
  }
}

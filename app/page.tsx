import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/data/config'
import { dishes } from '@/data/dishes'
import { getDishesOfTheDay, getWhatsAppUrl, getMenuWhatsAppMessage, getEventsWhatsAppMessage } from '@/lib/utils'
import DishCard from '@/components/DishCard'
import Logo from '@/components/Logo'

export const metadata = {
  title: 'Inicio',
  description: siteConfig.description,
}

export default function Home() {
  const dishesOfTheDay = getDishesOfTheDay(dishes)

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/machu-picchu.jpg"
            alt="Machu Picchu"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Overlay con gradiente para mejor legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
        </div>
        
        {/* Contenido */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Logo grande y elegante */}
          <div className="mb-8 flex justify-center">
            <div className="flex flex-col items-center space-y-4">
              {/* Versión grande del logo */}
              <div className="flex items-center space-x-4">
                {/* Icono del logo grande */}
                <div className="relative">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-peru-red via-red-600 to-red-700 flex items-center justify-center shadow-2xl">
                    <svg
                      className="w-12 h-12 md:w-14 md:h-14 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 8h12M6 8a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
                      <path d="M9 12h6M9 15h6" strokeWidth="1.5" opacity="0.6"/>
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-peru-gold rounded-full border-3 border-white shadow-lg"></div>
                </div>
                
                {/* Texto del logo grande */}
                <div className="flex flex-col text-left">
                  <span className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-2xl">
                    <span className="text-white">PERU</span>
                    <span className="text-peru-gold">FLAVOR</span>
                  </span>
                  <span className="text-sm md:text-base text-white/90 font-semibold tracking-[0.2em] uppercase mt-1 drop-shadow-lg">
                    Comida Casera
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-4 text-white font-semibold drop-shadow-lg">
            {siteConfig.tagline}
          </p>
          <p className="text-base md:text-lg lg:text-xl mb-10 text-white/90 drop-shadow-md max-w-2xl mx-auto">
            Pickup o Delivery · Hecho en casa con la mejor sazón peruana
          </p>
          
          {/* CTA Button */}
          <a
            href={getWhatsAppUrl(getMenuWhatsAppMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary bg-white text-peru-red hover:bg-gray-100 text-lg md:text-xl px-10 py-4 md:px-12 md:py-5 inline-block shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-bold"
          >
            Ordenar por WhatsApp
          </a>
        </div>
      </section>

      {/* Platos del Día */}
      {dishesOfTheDay.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Platos del Día
              </h2>
              <p className="text-gray-600">
                Especialidades disponibles hoy
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dishesOfTheDay.map((dish, index) => (
                <DishCard key={dish.id} dish={dish} priority={index < 3} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/menu"
                className="btn-secondary inline-block"
              >
                Ver todo el menú
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Cómo funciona */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Cómo funciona
            </h2>
            <p className="text-gray-600">
              Ordenar es muy fácil
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-peru-red rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Elige
              </h3>
              <p className="text-gray-600">
                Explora nuestro menú y selecciona tus platos favoritos
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-peru-red rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Escribe por WhatsApp
              </h3>
              <p className="text-gray-600">
                Contáctanos directamente por WhatsApp para hacer tu pedido
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-peru-red rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Coordinamos
              </h3>
              <p className="text-gray-600">
                Acordamos el delivery o el horario de pickup
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Eventos y Órdenes Grandes */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="card p-8 md:p-12 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-peru-red rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                🎉
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Órdenes Grandes para Eventos
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                ¿Planeando una celebración especial? Aceptamos órdenes grandes para:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-3xl mb-2">💒</div>
                <h3 className="font-semibold text-gray-900 mb-2">Bodas</h3>
                <p className="text-sm text-gray-600">Menús especiales para tu día especial</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-3xl mb-2">🎂</div>
                <h3 className="font-semibold text-gray-900 mb-2">Cumpleaños</h3>
                <p className="text-sm text-gray-600">Celebra con la mejor comida peruana</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-3xl mb-2">🎊</div>
                <h3 className="font-semibold text-gray-900 mb-2">Eventos Sociales</h3>
                <p className="text-sm text-gray-600">Y mucho más para tus celebraciones</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Contáctanos por WhatsApp para cotizaciones personalizadas y coordinación de tu evento.
            </p>
            
            <a
              href={getWhatsAppUrl(getEventsWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4 inline-block"
            >
              Consultar para Eventos
            </a>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 md:py-16 bg-peru-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para probar la mejor comida peruana?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Contáctanos ahora por WhatsApp
          </p>
          <a
            href={getWhatsAppUrl(getMenuWhatsAppMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary bg-white text-peru-red hover:bg-gray-100 text-lg px-8 py-4 inline-block"
          >
            Ordenar por WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}

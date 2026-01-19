import { getWhatsAppUrl, getMenuWhatsAppMessage } from '@/lib/utils'

export const metadata = {
  title: 'Cómo funciona',
  description: 'Aprende cómo ordenar comida peruana casera en Peruflavor. Proceso simple en 3 pasos.',
}

export default function HowItWorksPage() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cómo funciona
          </h1>
          <p className="text-lg text-gray-600">
            Ordenar es muy fácil, solo sigue estos 3 pasos
          </p>
        </div>

        <div className="space-y-12 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-peru-red rounded-full flex items-center justify-center text-white text-4xl font-bold">
                1
              </div>
            </div>
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Elige
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Explora nuestro menú completo y selecciona tus platos favoritos. Puedes ver fotos, 
                descripciones, ingredientes y precios de cada plato. También puedes revisar nuestros 
                &ldquo;Platos del Día&rdquo; que son especialidades disponibles hoy.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-peru-red rounded-full flex items-center justify-center text-white text-4xl font-bold">
                2
              </div>
            </div>
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Escribe por WhatsApp
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Contáctanos directamente por WhatsApp usando el botón de cualquier plato o el botón 
                flotante. El mensaje ya viene prellenado con el plato que elegiste. Si prefieres, 
                también puedes escribirnos para ver el menú completo del día.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-peru-red rounded-full flex items-center justify-center text-white text-4xl font-bold">
                3
              </div>
            </div>
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Coordinamos
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Te confirmamos la disponibilidad y coordinamos el método de entrega. Puedes elegir 
                entre delivery (si estás en nuestra zona de cobertura) o pickup. Acordamos el 
                horario y listo, tu comida peruana casera estará lista.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            ¿Listo para ordenar?
          </h2>
          <p className="text-gray-600 mb-6">
            Contáctanos ahora por WhatsApp y disfruta de la mejor comida peruana casera.
          </p>
          <a
            href={getWhatsAppUrl(getMenuWhatsAppMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-8 py-4 inline-block"
          >
            Ordenar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

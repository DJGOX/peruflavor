import { siteConfig } from '@/data/config'
import { getWhatsAppUrl, getMenuWhatsAppMessage, getEventsWhatsAppMessage } from '@/lib/utils'

export const metadata = {
  title: 'Contacto',
  description: `Contáctanos por WhatsApp al ${siteConfig.contact.whatsappFormatted}. Horarios y zonas de entrega.`,
}

export default function ContactPage() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contacto
          </h1>
          <p className="text-lg text-gray-600">
            Estamos aquí para ayudarte con tu pedido
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              WhatsApp
            </h2>
            <p className="text-gray-600 mb-4">
              Contáctanos directamente por WhatsApp para hacer tu pedido o consultar disponibilidad.
            </p>
            <a
              href={getWhatsAppUrl(getMenuWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-center"
            >
              Abrir WhatsApp
            </a>
            <p className="text-sm text-gray-500 mt-4">
              {siteConfig.contact.whatsappFormatted}
            </p>
          </div>

          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Horarios
            </h2>
            <p className="text-gray-700 text-lg mb-2">
              {siteConfig.contact.hours}
            </p>
            <p className="text-gray-600 text-sm">
              Los horarios pueden variar en días festivos
            </p>
          </div>
        </div>

        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Zonas de Entrega
          </h2>
          <ul className="space-y-3">
            {siteConfig.contact.zones.map((zone, index) => (
              <li key={index} className="flex items-start">
                <span className="text-peru-red mr-2">•</span>
                <span className="text-gray-700">{zone}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-600 text-sm mt-4">
            ¿No estás en una de estas zonas? Contáctanos por WhatsApp y coordinamos.
          </p>
        </div>

        <div className="card p-6 bg-gradient-to-br from-red-50 to-white border-2 border-peru-red">
          <div className="text-center mb-4">
            <div className="text-4xl mb-3">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Órdenes Grandes para Eventos
            </h2>
            <p className="text-gray-700 mb-4">
              Aceptamos órdenes grandes para bodas, cumpleaños, eventos sociales y más.
            </p>
            <p className="text-gray-600 text-sm mb-6">
              Contáctanos para cotizaciones personalizadas y coordinación de tu evento especial.
            </p>
            <a
              href={getWhatsAppUrl(getEventsWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              Consultar para Eventos
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
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

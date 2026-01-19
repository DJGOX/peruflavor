import Link from 'next/link'
import { siteConfig } from '@/data/config'
import { getWhatsAppUrl } from '@/lib/utils'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <Logo className="justify-start" />
            </div>
            <p className="text-gray-400 text-sm">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-peru-red transition-colors"
                >
                  WhatsApp: {siteConfig.contact.whatsappFormatted}
                </a>
              </li>
              <li className="text-gray-400">
                {siteConfig.contact.hours}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Zonas de entrega</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              {siteConfig.contact.zones.map((zone, index) => (
                <li key={index}>{zone}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Advertencias */}
        <div className="border-t border-gray-800 mt-8 pt-6 space-y-3">
          <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-3 text-sm">
            <p className="text-yellow-200 mb-2">
              <strong>⚠️ Advertencia:</strong> Algunas de las imágenes mostradas son referenciales y pueden variar en la presentación final del plato.
            </p>
            <p className="text-yellow-200/90">
              <strong>⚠️ Important Notice:</strong> If you have any food allergies or dietary restrictions, please inform us via WhatsApp at <a href={getWhatsAppUrl('Hola, tengo alergias alimentarias y necesito informarles antes de hacer mi pedido.')} target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-yellow-100">{siteConfig.contact.whatsappFormatted}</a> before placing your order. This is very important for your safety.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

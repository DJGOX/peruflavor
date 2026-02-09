'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { getOrderWhatsAppMessage, getWhatsAppUrl, formatPrice } from '@/lib/utils'
import ImageWithFallback from './ImageWithFallback'

export default function CartButton() {
  const [open, setOpen] = useState(false)
  const { items, removeItem, updateQuantity, clearCart, totalCount, totalAmount } = useCart()

  const orderMessage = getOrderWhatsAppMessage(items)
  const whatsappUrl = getWhatsAppUrl(orderMessage)

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-white border-2 border-peru-red text-peru-red rounded-full px-5 py-3 shadow-xl hover:shadow-peru-red/30 hover:bg-peru-red hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-peru-red/50"
        aria-label={`Ver mi orden (${totalCount} platos)`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span className="font-bold hidden sm:inline">Mi Orden</span>
        {totalCount > 0 && (
          <span className="bg-peru-red text-white text-sm font-bold min-w-[1.5rem] h-6 flex items-center justify-center rounded-full px-1.5">
            {totalCount}
          </span>
        )}
      </button>

      {/* Cart Drawer Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Cart Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[61] h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-modal="true"
        aria-label="Tu orden"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-peru-red to-red-700 text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Mi Orden
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Note about portion size */}
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            <p className="font-semibold mb-1">📌 Importante</p>
            <p>Un plato por lo general es para una sola persona. Si necesita porciones adicionales, puede agregar más unidades.</p>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-lg font-medium">Tu orden está vacía</p>
              <p className="text-sm mt-1">Agrega platos desde el menú para armar tu pedido</p>
            </div>
          ) : (
            <>
              <ul className="space-y-4">
                {items.map(({ dish, quantity }) => (
                  <li
                    key={dish.id}
                    className="flex gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                      <ImageWithFallback
                        src={dish.images[0]}
                        alt={dish.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{dish.name}</p>
                      <p className="text-sm text-gray-600">
                        {dish.price
                          ? formatPrice(dish.price * quantity, dish.currency ?? 'USD')
                          : 'Consultar precio'}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateQuantity(dish.id, quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-lg font-bold"
                          aria-label="Reducir cantidad"
                        >
                          −
                        </button>
                        <span className="font-bold min-w-[1.5rem] text-center">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(dish.id, quantity + 1)}
                          className="w-8 h-8 rounded-full bg-peru-red text-white hover:bg-red-700 flex items-center justify-center text-lg font-bold"
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(dish.id)}
                          className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Order summary and message preview */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">Resumen de tu orden</h3>
                {totalAmount !== null ? (
                  <p className="text-2xl font-bold text-peru-red mb-4">
                    Total: {formatPrice(totalAmount, items[0]?.dish.currency ?? 'USD')}
                  </p>
                ) : (
                  <p className="text-amber-700 font-medium mb-4">* Algunos platos requieren consultar precio</p>
                )}

                <h4 className="font-semibold text-gray-800 mb-2">Mensaje que enviarás por WhatsApp:</h4>
                <div className="p-3 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 whitespace-pre-wrap max-h-48 overflow-y-auto font-mono">
                  {orderMessage}
                </div>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-white space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold rounded-xl transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Enviar pedido por WhatsApp
            </a>
            <button
              onClick={() => {
                clearCart()
                setOpen(false)
              }}
              className="w-full py-2 text-gray-500 hover:text-gray-700 text-sm font-medium"
            >
              Vaciar orden
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

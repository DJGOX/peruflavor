'use client'

import { createContext, useContext, useMemo, useState, useCallback } from 'react'
import { Dish } from '@/types'

export interface CartItem {
  dish: Dish
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  addItem: (dish: Dish, quantity?: number) => void
  removeItem: (dishId: string) => void
  updateQuantity: (dishId: string, quantity: number) => void
  clearCart: () => void
  totalCount: number
  totalAmount: number | null
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((dish: Dish, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.dish.id === dish.id)
      if (existing) {
        return prev.map((i) =>
          i.dish.id === dish.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...prev, { dish, quantity }]
    })
  }, [])

  const removeItem = useCallback((dishId: string) => {
    setItems((prev) => prev.filter((i) => i.dish.id !== dishId))
  }, [])

  const updateQuantity = useCallback((dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(dishId)
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        i.dish.id === dishId ? { ...i, quantity } : i
      )
    )
  }, [removeItem])

  const clearCart = useCallback(() => setItems([]), [])

  const totalCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  )

  const totalAmount = useMemo(() => {
    const hasConsultar = items.some((i) => !i.dish.price && i.dish.tags?.includes('Consultar'))
    if (hasConsultar) return null
    const total = items.reduce((sum, i) => {
      const price = i.dish.price ?? 0
      return sum + price * i.quantity
    }, 0)
    return total
  }, [items])

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalCount,
      totalAmount,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, totalCount, totalAmount]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider')
  }
  return ctx
}

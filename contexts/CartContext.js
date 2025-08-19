'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on component mount
  useEffect(() => {
    const loadCart = () => {
      try {
        if (typeof window !== 'undefined') {
          const savedCart = localStorage.getItem('cleanCowCoCart')
          if (savedCart) {
            const parsedCart = JSON.parse(savedCart)
            // Validate the cart data
            if (Array.isArray(parsedCart)) {
              setCartItems(parsedCart)
            }
          }
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
        // Clear corrupted data
        if (typeof window !== 'undefined') {
          localStorage.removeItem('cleanCowCoCart')
        }
      } finally {
        setIsLoaded(true)
      }
    }

    loadCart()
  }, [])

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    const saveCart = () => {
      if (isLoaded && typeof window !== 'undefined') {
        try {
          localStorage.setItem('cleanCowCoCart', JSON.stringify(cartItems))
        } catch (error) {
          console.error('Error saving cart to localStorage:', error)
        }
      }
    }

    saveCart()
  }, [cartItems, isLoaded])

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prevItems, { ...product, quantity }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      isLoaded
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
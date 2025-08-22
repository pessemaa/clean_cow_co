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
          console.log('Loading cart from localStorage:', savedCart)
          if (savedCart) {
            const parsedCart = JSON.parse(savedCart)
            console.log('Parsed cart data:', parsedCart)
            // Validate the cart data
            if (Array.isArray(parsedCart)) {
              setCartItems(parsedCart)
              console.log('Cart loaded successfully:', parsedCart)
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
        console.log('Cart loading completed, isLoaded set to true')
      }
    }

    loadCart()
  }, [])

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    const saveCart = () => {
      if (isLoaded && typeof window !== 'undefined') {
        try {
          console.log('Saving cart to localStorage:', cartItems)
          localStorage.setItem('cleanCowCoCart', JSON.stringify(cartItems))
        } catch (error) {
          console.error('Error saving cart to localStorage:', error)
        }
      }
    }

    saveCart()
  }, [cartItems, isLoaded])

  const addToCart = (product, quantity = 1) => {
    console.log('addToCart called:', { product, quantity })
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
        console.log('Updated existing item, new cart:', updatedItems)
        return updatedItems
      } else {
        const newItems = [...prevItems, { ...product, quantity }]
        console.log('Added new item, new cart:', newItems)
        return newItems
      }
    })
  }

  const removeFromCart = (productId) => {
    console.log('removeFromCart called:', productId)
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== productId)
      console.log('Item removed, new cart:', newItems)
      return newItems
    })
  }

  const updateQuantity = (productId, quantity) => {
    console.log('updateQuantity called:', { productId, quantity })
    if (quantity <= 0) {
      console.log('Quantity <= 0, removing item')
      removeFromCart(productId)
      return
    }
    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
      console.log('Quantity updated, new cart:', newItems)
      return newItems
    })
  }

  const clearCart = () => {
    console.log('clearCart called')
    setCartItems([])
  }

  const getTotalItems = () => {
    const total = cartItems.reduce((total, item) => total + item.quantity, 0)
    console.log('getTotalItems called, result:', total)
    return total
  }

  const getTotalPrice = () => {
    const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    console.log('getTotalPrice called, result:', total)
    return total
  }

  console.log('CartProvider render:', { cartItems, isLoaded })

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
  console.log('useCart called, context:', context)
  return context
}
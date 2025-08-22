'use client'

import Link from 'next/link'
import { useCart } from '../../contexts/CartContext'
import styles from './page.module.css'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart()

  const handleDecrease = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Decrease button clicked for:', item.name)
    const newQuantity = item.quantity - 1
    if (newQuantity <= 0) {
      console.log('Removing item due to quantity <= 0')
      removeFromCart(item.id)
    } else {
      console.log('Updating quantity to:', newQuantity)
      updateQuantity(item.id, newQuantity)
    }
  }

  const handleIncrease = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Increase button clicked for:', item.name)
    const newQuantity = item.quantity + 1
    console.log('Updating quantity to:', newQuantity)
    updateQuantity(item.id, newQuantity)
  }

  const handleRemoveItem = (e, productId) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Remove button clicked for product:', productId)
    removeFromCart(productId)
  }

  const handleClearCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Clear cart button clicked')
    clearCart()
  }

  if (cartItems.length === 0) {
    return (
      <div className={styles.cart}>
        <div className="container">
          <div className={styles.emptyCart}>
            <h1>Your Cart is Empty</h1>
            <p>Browse our products and add some beautiful soaps to your cart!</p>
            <Link href="/inventory" className="btn btn-primary btn-large">
              Shop Our Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.cart}>
      <div className="container">
        <h1>Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</h1>

        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <img 
                    src={item.images?.[0] || '/placeholder-soap.jpg'} 
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjIwIiBmaWxsPSIjOEI0NTEzIi8+Cjwvc3ZnPg=='
                    }}
                  />
                </div>
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <p className={styles.itemSize}>{item.size}</p>
                  <p className={styles.itemPrice}>${item.price}</p>
                </div>
                
                <div className={styles.quantityControls}>
                  <button
                    onClick={(e) => handleDecrease(e, item)}
                    className={styles.quantityButton}
                    aria-label="Decrease quantity"
                    type="button"
                  >
                    −
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={(e) => handleIncrease(e, item)}
                    className={styles.quantityButton}
                    aria-label="Increase quantity"
                    type="button"
                  >
                    +
                  </button>
                </div>
                
                <div className={styles.itemTotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
                <button
                  onClick={(e) => handleRemoveItem(e, item.id)}
                  className={styles.removeButton}
                  aria-label={`Remove ${item.name} from cart`}
                  type="button"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <h2>Cart Summary</h2>
            <div className={styles.summaryRow}>
              <span>Total: ${getTotalPrice().toFixed(2)}</span>
            </div>
            
            <div className={styles.cartActions}>
              <button
                onClick={handleClearCart}
                className="btn btn-secondary"
                type="button"
              >
                Clear Cart
              </button>
              <Link href="/inventory" className="btn btn-secondary">
                Continue Shopping
              </Link>
              <Link href="/checkout" className="btn btn-primary">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
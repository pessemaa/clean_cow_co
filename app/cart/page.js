'use client'

import Link from 'next/link'
import { useCart } from '../../contexts/CartContext'
import styles from './page.module.css'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart()

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
                  />
                </div>
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <p className={styles.itemSize}>{item.size}</p>
                  <p className={styles.itemPrice}>${item.price}</p>
                </div>
                
                <div className={styles.quantityControls}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className={styles.quantityButton}
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className={styles.quantityButton}
                  >
                    +
                  </button>
                </div>
                
                <div className={styles.itemTotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className={styles.removeButton}
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
                onClick={clearCart}
                className="btn btn-secondary"
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
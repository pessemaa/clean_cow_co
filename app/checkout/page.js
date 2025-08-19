'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../../contexts/CartContext'
import Notification from '../../components/Notification'
import { submitInquiry } from '../../lib/supabase'
import styles from './page.module.css'

export default function Checkout() {
  const router = useRouter()
  const { cartItems, getTotalPrice, clearCart } = useCart()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState(null)

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    router.push('/cart')
    return null
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (formData.phone && !/^[\d\s\-\(\)\+\.]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Create cart summary for the inquiry
      const cartSummary = cartItems.map(item => 
        `${item.name} (${item.size}) - Qty: ${item.quantity} - ${(item.price * item.quantity).toFixed(2)}`
      ).join('\n')
      
      const message = `Cart Items:\n${cartSummary}\n\nTotal: ${getTotalPrice().toFixed(2)}\n\nAdditional Message:\n${formData.message}`

      const inquiryData = {
        product_id: null, // Cart inquiry, not for specific product
        customer_name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        message: message
      }

      await submitInquiry(inquiryData)

      // Clear cart and show success
      clearCart()
      
      setNotification({
        type: 'success',
        message: `Thank you for your inquiry! We'll get back to you about your cart items soon.`
      })

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      })

      // Redirect to cart after a delay
      setTimeout(() => {
        router.push('/cart')
      }, 3000)

    } catch (error) {
      console.error('Error submitting inquiry:', error)
      setNotification({
        type: 'error',
        message: 'There was an error submitting your inquiry. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      
      <div className={styles.checkout}>
        <div className="container">
          <h1>Checkout</h1>

          {/* Order Summary */}
          <div className={styles.orderSummary}>
            <h2>Order Summary</h2>
            
            {cartItems.map((item) => (
              <div key={item.id} className={styles.summaryItem}>
                <div className={styles.summaryItemInfo}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemMeta}>({item.size}) × {item.quantity}</span>
                </div>
                <div className={styles.itemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            
            <div className={styles.summaryTotal}>
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className={styles.checkoutForm}>
            <h3>Complete Your Inquiry</h3>
            <p>We&apos;ll contact you about your selected items and arrange the details.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Your full name"
                  disabled={isSubmitting}
                  required
                />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                  required
                />
                {errors.email && <div className="form-error">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone (optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="(555) 123-4567"
                  disabled={isSubmitting}
                />
                {errors.phone && <div className="form-error">{errors.phone}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Additional Message (optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Any special requests or questions about your order..."
                  disabled={isSubmitting}
                />
              </div>

              <button 
                type="submit"
                className="btn btn-primary btn-large"
                disabled={isSubmitting}
                style={{ width: '100%' }}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner" style={{ width: '16px', height: '16px', marginRight: '0.5rem' }}></span>
                    Submitting...
                  </>
                ) : (
                  `Submit Inquiry for ${getTotalPrice().toFixed(2)} Order`
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
'use client'

import { useState } from 'react'
import { submitInquiry } from '../lib/supabase'
import Notification from './Notification'
import styles from './InquiryForm.module.css'

export default function InquiryForm({ productId, productName }) {
  const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...')
    const { data, error } = await supabase
      .from('products')
      .select('id, name')
      .limit(1)
    
    if (error) {
      console.error('Supabase error:', error)
    } else {
      console.log('Supabase connected successfully:', data)
    }
  } catch (err) {
    console.error('Connection failed:', err)
  }
}
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState(null)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    if (!phone) return true // Phone is optional
    const phoneRegex = /^[\d\s\-\(\)\+\.]+$/
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
  }

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation (optional)
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters long'
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be no more than 1000 characters'
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

    // Clear error when user starts typing
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
    console.log('Form validation failed')
    return
  }

  console.log('Form data:', formData)
  console.log('Product ID:', productId)
  
  setIsSubmitting(true)

  try {
    const inquiryData = {
      product_id: productId,
      customer_name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || null,
      message: formData.message.trim()
    }

    console.log('Submitting inquiry data:', inquiryData)
    
    const result = await submitInquiry(inquiryData)
    console.log('Submission result:', result)

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    })

    setNotification({
      type: 'success',
      message: `Thank you for your inquiry about ${productName}! We'll get back to you soon.`
    })

  } catch (error) {
    console.error('Detailed error:', error)
    console.error('Error message:', error.message)
    console.error('Error details:', error.details)
    
    setNotification({
      type: 'error',
      message: `Error: ${error.message || 'There was an error submitting your inquiry. Please try again.'}`
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
      
      <div className={styles.inquiryForm}>
        <h3>Interested in this product?</h3>
        <p>Send us a message and we&apos;ll get back to you with more information.</p>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Your full name"
              disabled={isSubmitting}
            />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="your.email@example.com"
              disabled={isSubmitting}
            />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone (optional)
            </label>
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
            <label htmlFor="message" className="form-label">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`form-textarea ${errors.message ? 'error' : ''}`}
              placeholder="Tell us about your interest in this product, any questions you have, or special requests..."
              rows="5"
              disabled={isSubmitting}
            />
            <div className={styles.characterCount}>
              {formData.message.length}/1000 characters
              {formData.message.length < 20 && formData.message.length > 0 && (
                <span className={styles.countWarning}> (minimum 20 characters)</span>
              )}
            </div>
            {errors.message && <div className="form-error">{errors.message}</div>}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-large"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner" style={{ width: '16px', height: '16px', marginRight: '0.5rem' }}></span>
                Sending...
              </>
            ) : (
              'Send Inquiry'
            )}
          </button>
        </form>
      </div>
    </>
  )
}